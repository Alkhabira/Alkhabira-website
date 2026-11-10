// Private Client Inquiry — server-side handler (Netlify Function).
// Validates the submission, applies spam protection and rate limiting,
// computes the internal lead score, then stores the record in Netlify Forms
// ("private-inquiry"), which also sends the administrator email notification.
// Scores and classifications never leave the server.

// ---------------------------------------------------------------------------
// 1. Configuration — edit here to tune scoring (weights must total 100).
// ---------------------------------------------------------------------------
export const WEIGHTS = { budget: 40, timeline: 25, clarity: 20, fit: 15 };

export const THRESHOLDS = { priority: 70, qualified: 50 }; // score >= threshold
// Priority also needs a near-term timeline, and — for services where
// "priorityNeedsBudget" is true — a disclosed budget aligned at 60%+.

// Budget alignment per service (0–1). "Undisclosed" options score neutrally
// (0.5) so a client is never disqualified for not sharing a budget.
export const SERVICES = {
  realestate: {
    label: "Real Estate Investment",
    fit: 0.9,
    priorityNeedsBudget: true,
    budget: { lt1m: 0.35, "1-3m": 0.65, "3-5m": 0.85, "5-10m": 1, "10m+": 1, undecided: 0.5 },
    questions: {
      budget: { lt1m: "Below AED 1 million", "1-3m": "AED 1–3 million", "3-5m": "AED 3–5 million", "5-10m": "AED 5–10 million", "10m+": "AED 10 million+", undecided: "Not decided yet" },
      property: { residential: "Residential Property", villa: "Luxury Villa", commercial: "Commercial Property", offplan: "Off-Plan Investment", portfolio: "Investment Portfolio", unsure: "Not Sure Yet" },
    },
    required: ["budget", "property"],
    vague: { property: ["unsure"] },
  },
  advisory: {
    label: "Business & Financial Advisory",
    fit: 1,
    priorityNeedsBudget: false,
    // Business size is optional and only lightly informs budget alignment.
    budget: { startup: 0.5, lt5m: 0.65, "5-20m": 0.85, "20-100m": 1, "100m+": 1, undisclosed: 0.5, "": 0.5 },
    budgetField: "size",
    questions: {
      support: { setup: "Business Setup & Structuring", transformation: "Financial Advisory & Business Transformation", tax: "Tax Advisory & Compliance", governance: "Corporate Governance & Risk Management", opportunities: "Investment & Business Opportunities", other: "Other" },
      profile: { owner: "Business Owner / Founder", investor: "Investor", executive: "Corporate Executive", family: "Family Business Representative", entrepreneur: "Entrepreneur / Startup Founder", other: "Other" },
      size: { startup: "Startup / Pre-Revenue", lt5m: "Below AED 5 million annual revenue", "5-20m": "AED 5–20 million", "20-100m": "AED 20–100 million", "100m+": "AED 100 million+", undisclosed: "Prefer not to disclose" },
    },
    required: ["support", "profile"],
    optional: ["size"],
    vague: { support: ["other"] },
  },
  medical: {
    label: "Medical & Aesthetic Concierge",
    fit: 0.85,
    priorityNeedsBudget: true,
    budget: { lt15k: 0.4, "15-30k": 0.7, "30-60k": 0.9, "60k+": 1, private: 0.5 },
    questions: {
      procedure: { cosmetic: "Cosmetic Surgery", dental: "Dental & Smile Design", dermatology: "Dermatology & Skin Treatments", hair: "Hair Restoration", wellness: "Wellness & Aesthetic Treatments", other: "Other / Private Consultation" },
      budget: { lt15k: "Below AED 15,000", "15-30k": "AED 15,000–30,000", "30-60k": "AED 30,000–60,000", "60k+": "AED 60,000+", private: "Prefer to discuss privately" },
    },
    required: ["procedure", "budget"],
    vague: { procedure: ["other"] },
  },
  travel: {
    label: "Luxury Travel & Lifestyle",
    fit: 0.75,
    priorityNeedsBudget: true,
    budget: { lt20k: 0.4, "20-50k": 0.7, "50-100k": 0.9, "100k+": 1, private: 0.5 },
    questions: {
      experience: { accommodation: "Luxury Accommodation", experiences: "Private Dubai Experiences", vip: "VIP Concierge Services", executive: "Executive Business Travel", bespoke: "Bespoke Travel Planning", other: "Other" },
      budget: { lt20k: "Below AED 20,000", "20-50k": "AED 20,000–50,000", "50-100k": "AED 50,000–100,000", "100k+": "AED 100,000+", private: "Prefer to discuss privately" },
    },
    required: ["experience", "budget"],
    vague: { experience: ["other"] },
  },
  other: {
    label: "Other Private Services",
    fit: 0.55,
    priorityNeedsBudget: false,
    budget: {}, // free-text budget → neutral unless provided
    questions: {},
    required: ["requirements"],
    text: { requirements: 600, budget_text: 80 },
  },
};

export const TIMELINE = {
  immediately: { label: "Immediately", score: 1 },
  "3m": { label: "Within 3 months", score: 0.85 },
  "6m": { label: "Within 6 months", score: 0.55 },
  exploring: { label: "Currently exploring options", score: 0.25 },
};

// ---------------------------------------------------------------------------
// 2. Scoring
// ---------------------------------------------------------------------------
export function scoreLead(d) {
  const svc = SERVICES[d.service];
  const answers = d.answers || {};

  // Budget alignment (40)
  let budget = 0.5;
  if (d.service === "other") {
    budget = (answers.budget_text || "").trim().length ? 0.65 : 0.5;
  } else {
    const field = svc.budgetField || "budget";
    const v = answers[field] ?? "";
    if (v in svc.budget) budget = svc.budget[v];
  }

  // Readiness (25)
  const timeline = TIMELINE[d.timeline]?.score ?? 0;

  // Clarity of requirements (20): specific answers + a short description
  let specific = 0, total = 0;
  for (const q of svc.required) {
    total++;
    const v = (answers[q] || "").trim();
    if (!v) continue;
    if (svc.text?.[q]) specific += Math.min(1, v.length / 80);
    else specific += svc.vague?.[q]?.includes(v) ? 0.4 : 1;
  }
  const notes = (d.notes || "").trim().length;
  let clarity = total ? specific / total : 0;
  clarity = Math.min(1, clarity * 0.75 + (notes >= 40 ? 0.25 : notes >= 10 ? 0.12 : 0));

  // Client & service fit (15): service centrality, adjusted for vague choices.
  // Profession is deliberately NOT used as a proxy for wealth.
  let fit = svc.fit;
  for (const [q, vals] of Object.entries(svc.vague || {})) if (vals.includes(answers[q])) fit -= 0.15;
  fit = Math.max(0, Math.min(1, fit));

  const parts = {
    budget: Math.round(budget * WEIGHTS.budget),
    timeline: Math.round(timeline * WEIGHTS.timeline),
    clarity: Math.round(clarity * WEIGHTS.clarity),
    fit: Math.round(fit * WEIGHTS.fit),
  };
  const score = parts.budget + parts.timeline + parts.clarity + parts.fit;

  let classification = "Exploratory Lead";
  const nearTerm = d.timeline === "immediately" || d.timeline === "3m";
  const budgetOk = !svc.priorityNeedsBudget || budget >= 0.6;
  if (score >= THRESHOLDS.priority && nearTerm && budgetOk) classification = "Priority Lead";
  else if (score >= THRESHOLDS.qualified) classification = "Qualified Lead";
  return { score, classification, parts };
}

// ---------------------------------------------------------------------------
// 3. Validation
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

export function validate(body) {
  const errors = [];
  const svc = SERVICES[body.service];
  if (!svc) return { errors: ["service"] };
  const answers = {};
  const src = body.answers && typeof body.answers === "object" ? body.answers : {};
  for (const [q, opts] of Object.entries(svc.questions)) {
    const v = clean(src[q], 40);
    if (v && !(v in opts)) errors.push(q);
    else answers[q] = v;
  }
  for (const [q, max] of Object.entries(svc.text || {})) answers[q] = clean(src[q], max);
  for (const q of svc.required) if (!answers[q]) errors.push(q);

  const d = {
    service: body.service,
    answers,
    timeline: clean(body.timeline, 20),
    notes: clean(body.notes, 800),
    name: clean(body.name, 120),
    profession: clean(body.profession, 120),
    country: clean(body.country, 80),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    contact_method: ["email", "phone", "whatsapp"].includes(body.contact_method) ? body.contact_method : "email",
    language: ["en", "ar", "fr", "nl", "sv"].includes(body.language) ? body.language : "en",
    consent: body.consent === true || body.consent === "yes",
  };
  if (!TIMELINE[d.timeline]) errors.push("timeline");
  if (d.name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(d.email)) errors.push("email");
  if (d.phone.replace(/\D/g, "").length < 7) errors.push("phone");
  if (!d.country) errors.push("country");
  if (!d.consent) errors.push("consent");
  return { errors: [...new Set(errors)], data: d };
}

// ---------------------------------------------------------------------------
// 4. Spam protection & rate limiting
// ---------------------------------------------------------------------------
const RATE = { windowMs: 10 * 60 * 1000, max: 5 }; // per IP, per warm instance
const hits = new Map();
export function rateLimited(ip, now = Date.now()) {
  const list = (hits.get(ip) || []).filter(t => now - t < RATE.windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE.max;
}
export function looksLikeSpam(body) {
  if (body.website) return true;                               // honeypot
  const elapsed = Number(body.elapsed_ms);
  if (!Number.isFinite(elapsed) || elapsed < 4000) return true; // filled too fast
  const text = `${body.notes || ""} ${body.answers?.requirements || ""}`;
  if ((text.match(/https?:\/\//gi) || []).length > 2) return true;
  return false;
}

// ---------------------------------------------------------------------------
// 5. Record for storage / email (English labels for the administrator)
// ---------------------------------------------------------------------------
export function buildRecord(d, s) {
  const svc = SERVICES[d.service];
  const lines = [];
  for (const [q, opts] of Object.entries(svc.questions)) if (d.answers[q]) lines.push(`${q}: ${opts[d.answers[q]]}`);
  if (d.answers.requirements) lines.push(`requirements: ${d.answers.requirements}`);
  if (d.answers.budget_text) lines.push(`budget: ${d.answers.budget_text}`);
  return {
    "form-name": "private-inquiry",
    lead_classification: s.classification,
    lead_score: `${s.score}/100 (budget ${s.parts.budget}/${WEIGHTS.budget}, timeline ${s.parts.timeline}/${WEIGHTS.timeline}, clarity ${s.parts.clarity}/${WEIGHTS.clarity}, fit ${s.parts.fit}/${WEIGHTS.fit})`,
    service: svc.label,
    service_details: lines.join("\n"),
    timeline: TIMELINE[d.timeline].label,
    notes: d.notes,
    name: d.name,
    profession: d.profession,
    country: d.country,
    email: d.email,
    phone: d.phone,
    contact_method: d.contact_method,
    language: d.language,
    consent: "yes",
    submitted_at: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// 6. Handler
// ---------------------------------------------------------------------------
const json = (status, obj) => new Response(JSON.stringify(obj), {
  status, headers: { "content-type": "application/json", "cache-control": "no-store" },
});

export default async (req, context) => {
  if (req.method !== "POST") return json(405, { ok: false });
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(req.url).host) return json(403, { ok: false });

  let body;
  try {
    const raw = await req.text();
    if (raw.length > 20000) return json(413, { ok: false });
    body = JSON.parse(raw);
  } catch { return json(400, { ok: false }); }

  // Silently accept spam so bots get no signal; nothing is stored.
  if (looksLikeSpam(body)) return json(200, { ok: true });

  const ip = context?.ip || req.headers.get("x-nf-client-connection-ip") || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "rate" });

  const { errors, data } = validate(body);
  if (errors.length) return json(422, { ok: false, fields: errors });

  const s = scoreLead(data);
  const record = buildRecord(data, s);

  try {
    const r = await fetch(new URL("/private-consultation.html", req.url), {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(record).toString(),
      redirect: "manual",
    });
    if (r.status >= 400) throw new Error(`forms ${r.status}`);
  } catch (e) {
    console.error("store failed", e);
    return json(502, { ok: false, error: "store" });
  }
  return json(200, { ok: true });
};
