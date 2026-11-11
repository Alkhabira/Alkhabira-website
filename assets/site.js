/* SAIDA AFLY | BUSINESS GATEWAY — shared site script
   Edit CONFIG to update contact details. LinkedIn shows only when a URL is set. */
/* Content (texts, images, services, articles, contact details) is loaded from /content/*.json,
   which the website dashboard (Pages CMS) edits. Values below are fallbacks only. */
let TEXT={};let IMAGES={};let INSIGHTS=[];
const CONFIG = {
  whatsapp: "971547065800",
  whatsappDisplay: "+971 54 706 5800",
  email: "saidaafly1@gmail.com",
  linkedin: "",               // e.g. "https://www.linkedin.com/in/your-profile"
  liveHosts: ["alkhabira.com", "www.alkhabira.com", "saidaafly.com", "www.saidaafly.com", "netlify.app"] // where the form submits online (Netlify Forms)
};

const ICONS = {
  chart:'<path d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6"/>',
  tax:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  doc:'<path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/>',
  cycle:'<path d="M20 11a8 8 0 0 0-14.9-4M4 13a8 8 0 0 0 14.9 4"/><path d="M5 3v4h4M19 21v-4h-4"/>',
  building:'<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  tower:'<path d="M4 21V9l5-3v15M9 21V4l6 3v14M15 21v-9h5v9M3 21h18"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6M11 8v6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.4 0 4 1.6 4.5 4"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  med:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/>',
  plane:'<path d="M2 16l20-6-3-3-6 2-6-5-2 1 4 6-4 1-2-2-2 1z"/><path d="M3 21h18"/>',
  bed:'<path d="M3 18V8M21 18v-5a3 3 0 0 0-3-3H10v8M3 14h18M3 18h18"/><circle cx="6.5" cy="11" r="1.5"/>',
  car:'<path d="M5 16l1.5-5A2 2 0 0 1 8.4 9.5h7.2a2 2 0 0 1 1.9 1.5L19 16"/><rect x="3" y="15" width="18" height="4" rx="1.5"/><circle cx="7" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
  home:'<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',
  star:'<path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.3 9.2l6.1-.6z"/>',
  hand:'<path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9.5a1.5 1.5 0 0 1 3 0V14c0 4-3 7-7 7-3 0-4.5-1.5-6-4l-2-3.5a1.5 1.5 0 0 1 2.6-1.5L7 13"/>'
};
const ico=(k,s=24,w=1.5)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]||""}</svg>`;
const ARR='<svg class="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const WA_SVG='<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>';

/* ---------- services (single source for pillar pages + form) ---------- */
const SERVICES = {
  p1: [
    ["chart","Financial Advisory & Performance Optimization","الاستشارات المالية وتحسين الأداء","Clear financial insight to strengthen profitability, cash flow and decision-making.","رؤية مالية واضحة لتعزيز الربحية والتدفق النقدي وجودة القرار."],
    ["tax","UAE Corporate Tax & VAT","ضريبة الشركات وضريبة القيمة المضافة","Registration, filings and advisory, supervised by an FTA Approved Tax Agent.","التسجيل والإقرارات والاستشارات، بإشراف وكيلة ضرائب معتمدة لدى الهيئة الاتحادية للضرائب."],
    ["shield","Corporate Governance & Risk Management","الحوكمة المؤسسية وإدارة المخاطر","Policies, controls and oversight frameworks that protect and support growth.","سياسات وضوابط وأطر رقابية تحمي أعمالك وتدعم نموها."],
    ["doc","Financial Reporting & Compliance","التقارير المالية والامتثال","Accurate reporting and bookkeeping aligned with UAE requirements and audit readiness.","تقارير ومسك دفاتر دقيق، متوافق مع المتطلبات في الإمارات وجاهز للتدقيق."],
    ["cycle","Business Restructuring & Transformation","إعادة الهيكلة والتحول المؤسسي","Reorganising structures and operations to improve efficiency and resilience.","إعادة تنظيم الهياكل والعمليات لرفع الكفاءة والمرونة."],
    ["building","Business Setup & Corporate Services","تأسيس الشركات والخدمات المؤسسية","Free zone or mainland setup, licensing, residency coordination and banking support.","التأسيس في المناطق الحرة أو البر الرئيسي، والتراخيص، وتنسيق الإقامات، ودعم فتح الحسابات البنكية."],
    ["compass","Strategic Business Consulting","الاستشارات الاستراتيجية للأعمال","An independent perspective on market entry, growth plans and key decisions.","رؤية مستقلة لدخول السوق وخطط النمو والقرارات المحورية."],
    ["gear","Finance Process Improvement & Digital Transformation","تطوير العمليات المالية والتحول الرقمي","Streamlined finance processes, systems and reporting tools.","عمليات مالية أكثر كفاءة، وأنظمة وأدوات تقارير حديثة."]
  ],
  p2: [
    ["tower","Dubai Real Estate Investment Opportunities","فرص الاستثمار العقاري في دبي","Curated access to residential and commercial opportunities through licensed brokers.","وصول منتقى إلى فرص سكنية وتجارية عبر وسطاء مرخّصين."],
    ["key","Property Investment Support","دعم الاستثمار العقاري","Guidance through the purchase journey, from shortlisting to completion with licensed parties.","مرافقة في رحلة الشراء، من المفاضلة حتى إتمام الصفقة مع الجهات المرخّصة."],
    ["search","Investment Opportunity Assessment","تقييم الفرص الاستثمارية","A financial review of opportunities to support informed decisions.","مراجعة مالية للفرص لدعم قرارات مدروسة."],
    ["users","Investor Introductions","التعريف بالمستثمرين","Thoughtful introductions between investors, founders and businesses.","تعريف مدروس بين المستثمرين ورواد الأعمال والشركات."],
    ["briefcase","Business Investment Opportunities","فرص الاستثمار في الأعمال","Exploring acquisitions, partnerships and growing businesses in the UAE.","استكشاف فرص الاستحواذ والشراكات والشركات النامية في الإمارات."],
    ["globe","Market Research & Strategic Insights","أبحاث السوق والرؤى الاستراتيجية","Market context to help you understand sectors, areas and trends.","قراءة للسوق تساعدك على فهم القطاعات والمناطق والاتجاهات."],
    ["link","Coordination with Licensed Professionals","التنسيق مع المختصين المرخّصين","We connect you with appropriately licensed real estate, investment and legal professionals.","نربطك بمختصين مرخّصين في العقار والاستثمار والقانون."]
  ],
  p3: [
    ["med","Medical & Aesthetic Services Coordination","تنسيق الخدمات الطبية والتجميلية","Coordinating appointments with licensed clinics and practitioners in Dubai.","تنسيق المواعيد لدى عيادات وممارسين مرخّصين في دبي."],
    ["plane","Cosmetic Treatment Travel Assistance","المساعدة في رحلات العلاج التجميلي","Travel, scheduling and accompaniment for international visitors.","ترتيب السفر والمواعيد والمرافقة للزوار الدوليين."],
    ["bed","Premium Accommodation Arrangements","ترتيب الإقامة الراقية","Hotels, serviced apartments and private residences suited to your stay.","فنادق وشقق فندقية ومساكن خاصة تناسب إقامتك."],
    ["car","Airport Transfers & Private Transportation","الاستقبال من المطار والتنقل الخاص","Discreet chauffeured transport from arrival to departure.","تنقل خاص بسائق، بخصوصية تامة من الوصول حتى المغادرة."],
    ["home","Relocation & Settling-in Assistance","الانتقال والاستقرار في دبي","Practical support with housing, school search and settling in.","دعم عملي في السكن والبحث عن المدارس والاستقرار."],
    ["star","Luxury Lifestyle Experiences","تجارب أسلوب الحياة الفاخرة","Private dining, yachts, desert and cultural experiences.","عشاء خاص ويخوت وتجارب صحراوية وثقافية."],
    ["hand","Personalized Assistance for International Visitors","مساعدة شخصية للزوار الدوليين","A single point of contact throughout your time in Dubai.","محاور واحد يرافقك طوال وجودك في دبي."]
  ]
};
const PILLAR_NAMES={p1:["Business & Financial Advisory","الاستشارات المالية والأعمال","Affärs- och finansiell rådgivning","Conseil financier et aux entreprises","Zakelijk en financieel advies"],p2:["Investment & Real Estate","الاستثمار والعقارات","Investeringar och fastigheter","Investissement et immobilier","Investeringen en vastgoed"],p3:["Dubai Private Concierge","الكونسيرج الخاص في دبي","Privat concierge i Dubai","Conciergerie privée à Dubaï","Private concierge in Dubai"]};

/* ---------- Arabic dictionary (English is the HTML source text) ---------- */
const AR = {
/* header & footer */
nav_home:"الرئيسية",nav_about:"من نحن",nav_services:"خدمات الأعمال والخدمات المالية",nav_invest:"فرص الاستثمار",nav_concierge:"الكونسيرج الخاص",nav_insights:"رؤى",nav_contact:"تواصل معنا",
dd_p1:"الاستشارات المالية والأعمال",dd_p1d:"الضرائب والحوكمة والتقارير والخدمات المؤسسية",dd_p2:"الاستثمار والعقارات",dd_p2d:"الفرص والتقييم والتواصل مع المختصين المرخّصين",dd_p3:"الكونسيرج الخاص في دبي",dd_p3d:"التنسيق الطبي والانتقال وأسلوب الحياة",
hd_cta:"احجز استشارة خاصة",wa_label:"واتساب",
ft_sig1:"نربط الطموح",ft_sig2:"بالفرص.",ft_desc:"استشارات مالية وأعمال وخدمات خاصة في دبي، بخبرة مهنية واهتمام شخصي.",
ft_nav:"تصفّح",ft_services:"الخدمات",ft_contact:"تواصل",ft_privacy:"سياسة الخصوصية",ft_terms:"الشروط والأحكام",ft_rights:"© 2026 Saida Afly Business Gateway. جميع الحقوق محفوظة.",
ft_disc:"نقدّم الاستشارات والتعريف والتنسيق فقط. الخدمات الخاضعة للتنظيم، كالوساطة العقارية وإدارة الاستثمار والخدمات الطبية، يقدّمها مزوّدون مرخّصون. لا يُعد محتوى الموقع نصيحة استثمارية ولا ضمانًا لأي عائد.",
city:"دبي، الإمارات العربية المتحدة",
/* modal */
m_eyebrow:"خاص وسرّي",m_title:"طلب استشارة خاصة",m_sub:"شاركنا بعض التفاصيل، وسنتواصل معك شخصيًا.",
tab_c:"استشارة",tab_i:"استفسار استثماري",tab_r:"طلب كونسيرج",
f_name:"الاسم الكامل",f_email:"البريد الإلكتروني",f_phone:"الهاتف / واتساب",f_country:"بلد الإقامة",f_service:"الخدمة المطلوبة",f_choose:"اختر خدمة",f_desc:"وصف موجز لاحتياجاتك",f_date:"التاريخ المفضل للاستشارة",f_method:"وسيلة التواصل المفضلة",
m_email:"البريد الإلكتروني",m_phone:"الهاتف",m_wa:"واتساب",
f_privacy:"نستخدم بياناتك للرد على طلبك فقط، ولا نبيعها ولا نشاركها للتسويق، ويمكنك طلب حذفها متى شئت.",
f_consent_a:"أوافق على أن تستخدم Saida Afly Business Gateway المعلومات التي أقدّمها للرد على طلبي، وفق",f_consent_b:"سياسة الخصوصية",
f_submit:"إرسال الطلب",f_err:"يرجى استكمال الحقول المطلوبة وتأكيد الموافقة.",
r_ok_t:"شكرًا لك، استلمنا طلبك.",r_ok_d:"سنتواصل معك عبر وسيلة التواصل التي اخترتها.",
r_fb_t:"طلبك جاهز",r_fb_d:"الإرسال الإلكتروني غير متاح في هذه النسخة التجريبية. أرسل طلبك مباشرة، فقد كتبناه لك:",
r_wa:"إرسال عبر واتساب",r_mail:"إرسال بالبريد",r_close:"إغلاق",req:"مطلوب",
/* common */
pg_home:"الرئيسية",learn:"اعرف المزيد",
/* home */
h_eye:"استشارات أعمال متميزة · دبي",h_t1:"طموحاتك.",h_t2:"خبرتنا.",h_t3:"دبي.",
h_lead:"استشارات مالية وضريبية، وفرص استثمار، وخدمات كونسيرج حصرية: بوابتك الموثوقة إلى الأعمال والحياة في دبي.",
h_cta1:"احجز استشارة خاصة",h_cta2:"استكشف خدماتنا",h_sig:"ثروتك. أولويتنا. راحة بالك.",
p_eye:"خدماتنا",p_t:"ثلاث ركائز، وبوابة واحدة موثوقة.",p_s:"الخبرة المالية أساسنا، ويكمّلها الاستثمار والكونسيرج الخاص في تجربة واحدة متكاملة.",
p1_t:"الاستشارات المالية والأعمال",p1_d:"الأساس المهني لعلامتنا: خبرة مالية وضريبية ورؤية استراتيجية لشركتك.",p1_l1:"ضريبة الشركات وضريبة القيمة المضافة",p1_l2:"الحوكمة المؤسسية وإدارة المخاطر",p1_l3:"التقارير المالية والامتثال",p1_l4:"تأسيس الشركات والخدمات المؤسسية",p1_more:"استكشف الاستشارات",
p2_t:"الاستثمار والعقارات",p2_d:"إرشاد مدروس في مشهد الاستثمار بدبي، وتواصل مع المختصين المناسبين.",p2_l1:"فرص الاستثمار العقاري في دبي",p2_l2:"تقييم الفرص الاستثمارية",p2_l3:"التعريف بالمستثمرين",p2_l4:"التنسيق مع المختصين المرخّصين",p2_more:"استكشف فرص الاستثمار",
p3_t:"الكونسيرج الخاص في دبي",p3_d:"خدمات شخصية بخصوصية واهتمام بالتفاصيل للزوار والتنفيذيين والعملاء الخاصين.",p3_l1:"تنسيق الخدمات الطبية والتجميلية",p3_l2:"ترتيب الإقامة الراقية",p3_l3:"الانتقال والاستقرار في دبي",p3_l4:"تجارب أسلوب الحياة الفاخرة",p3_more:"استكشف الكونسيرج",
t_eye:"فلسفتنا",t_t:"خبرة نبني عليها. نزاهة تقودنا. وأنت محور اهتمامنا.",t_s:"كل قرار تجاري أو استثماري أو شخصي يستحق إرشادًا مدروسًا وخصوصية واهتمامًا فرديًا.",
v1_t:"خبرة مهنية",v1_d:"أكثر من 15 عامًا في الإدارة المالية والضرائب والتدقيق والحوكمة، في خدمة أهدافك.",
v2_t:"رؤية مستقلة",v2_d:"نصيحة صريحة ومتوازنة تضع مصلحتك أولًا، مع وضوح كامل في دورنا وحدوده.",
v3_t:"اهتمام شخصي",v3_d:"محاور واحد يعرف ملفك جيدًا، ويتابع معك كل خطوة بسرّية تامة.",
w_eye:"كيف نعمل",w_t:"رحلة بسيطة وسرّية",
w1_t:"أخبرنا بهدفك",w1_d:"شاركنا أهدافك في الأعمال أو اهتماماتك الاستثمارية أو احتياجاتك الشخصية.",
w2_t:"احصل على إرشاد مخصص",w2_d:"ندرس احتياجاتك ونحدد الحلول والفرص والتواصلات المهنية المناسبة.",
w3_t:"تقدّم بثقة",w3_d:"تنسيق شخصي وإرشاد مهني ومتابعة مستمرة على مقاس احتياجاتك.",
bn:"دبي… حيث تلتقي الأعمال والاستثمار وجودة الحياة.",
a_eye:"من نحن",a_t:"خبرة مهنية. والتزام شخصي.",a_s:"نجمع الخبرة المالية والرؤية الاستراتيجية والنهج الشخصي لنساعدك على اغتنام الفرص في دبي.",
a_c1:"وكيلة ضرائب معتمدة لدى الهيئة الاتحادية للضرائب في الإمارات",a_c2:"أكثر من 15 عامًا في الإدارة المالية والضرائب والتدقيق الخارجي والرقابة المالية والحوكمة والاستشارات",a_c3:"تخدم عملاء في دول الخليج العربي وشمال أفريقيا",a_c4:"مقيمة في دبي، وتخدم عملاء محليين ودوليين",
a_photo:"مكان الصورة الشخصية",a_name:"سعيدة أفلي",a_role:"المؤسِّسة",
i_eye:"رؤى",i_t:"رؤى تدعم قرارات مدروسة",i_s:"مقالات في المالية والضرائب والحوكمة ومشهد الاستثمار في دبي.",i_all:"جميع المقالات",
c_eye:"تواصل معنا",c_t:"ابدأ محادثة سرّية",c_s:"اختر المسار المناسب لاحتياجاتك، أو تواصل معنا مباشرة.",
path1:"استشارة خاصة",path1d:"استشارات الأعمال والمالية والضرائب",path2:"استفسار استثماري",path2d:"فرص العقارات والأعمال",path3:"طلب كونسيرج",path3d:"التنسيق الطبي والانتقال وأسلوب الحياة",
cc_t:"تواصل مباشر",cc_wa:"واتساب",cc_em:"البريد الإلكتروني",cc_loc:"الموقع",
/* pillar pages */
adv_eye:"الركيزة الأولى",adv_t:"الاستشارات المالية والأعمال",adv_s:"خبرة مالية وضريبية واستشارية تساعدك على البناء بثقة والقرار بوضوح.",adv_cta:"احجز استشارة خاصة",
adv_h_eye:"ما نقدّمه",adv_h_t:"خبرة تُترجم إلى قرارات أفضل",adv_h_s:"من التأسيس إلى الحوكمة والتحول، نرافق الشركات ورواد الأعمال بخبرة عملية ورؤية استراتيجية.",
adv_who_t:"لمن نقدّم هذه الخدمات",who1_t:"المؤسسون الجدد",who1_d:"يؤسسون شركتهم الأولى في الإمارات.",who2_t:"الشركات الصغيرة والمتوسطة",who2_d:"تبحث عن انضباط مالي وامتثال ضريبي.",who3_t:"الشركات العائلية",who3_d:"تعزز الحوكمة وتستعد للنمو.",who4_t:"الشركات الدولية",who4_d:"تدخل السوق الإماراتية أو تتوسع فيها.",
adv_band:"لنناقش أهداف شركتك بسرّية تامة.",
inv_eye:"الركيزة الثانية",inv_t:"الاستثمار والعقارات",inv_s:"إرشاد مدروس في سوق الاستثمار بدبي، وتواصل مع المختصين المرخّصين المناسبين.",inv_cta:"أرسل استفسارًا استثماريًا",
inv_h_eye:"كيف نساعدك",inv_h_t:"قرارات استثمارية مبنية على المعرفة",inv_h_s:"للمستثمرين الدوليين والأفراد الذين يستكشفون الفرص في دبي، من العقار إلى الاستثمار في الأعمال.",
inv_disc:"لسنا مدير استثمار ولا وسيطًا عقاريًا مرخّصًا. نقدّم الإرشاد المالي والتعريف والتنسيق، وتُنفَّذ الصفقات عبر جهات مرخّصة. لا نحتفظ بأموال العملاء ولا نضمن أي عائد.",
inv_band:"هل تستكشف فرصة استثمارية في دبي؟",
con_eye:"الركيزة الثالثة",con_t:"الكونسيرج الخاص في دبي",con_s:"خدمات شخصية للزوار الدوليين والتنفيذيين والمستثمرين والعملاء الخاصين، بخصوصية ودقة في التفاصيل.",con_cta:"أرسل طلب كونسيرج",
con_h_eye:"خدماتنا الخاصة",con_h_t:"إقامتك في دبي، منسّقة بعناية",con_h_s:"محاور واحد يتولى التنسيق مع مزوّدين مرخّصين وموثوقين، لتتفرغ لما جئت من أجله.",
con_disc:"لسنا عيادة طبية ولا مزوّدًا مباشرًا لخدمات خاضعة للتنظيم. ننسّق الوصول إلى مزوّدين مرخّصين، وتبقى القرارات الطبية مسؤولية الأطباء المرخّصين.",
con_band:"أخبرنا بما تحتاجه خلال إقامتك في دبي.",
/* insights */
ins_eye:"رؤى",ins_t:"رؤى ومقالات",ins_s:"قراءات مختصرة في المال والضرائب والاستراتيجية والحوكمة والاستثمار في دبي.",
cat_all:"الكل",cat_tax:"المالية والضرائب",cat_strategy:"استراتيجية الأعمال",cat_gov:"الحوكمة المؤسسية",cat_dubai:"مشهد الاستثمار في دبي",cat_re:"رؤى عقارية",cat_trends:"اتجاهات الأعمال والاقتصاد",
soon:"قريبًا",min:"دقائق قراءة",back:"العودة إلى الرؤى",art_note:"هذا المقال للمعلومات العامة فقط، وليس استشارة ضريبية أو قانونية أو استثمارية. لحالتك الخاصة، احجز استشارة.",
/* legal */
priv_t:"سياسة الخصوصية",terms_t:"الشروط والأحكام",updated:"آخر تحديث: نوفمبر 2026"
};

/* ---------- language ---------- */
let LANG="en";
const EXTRA={"nav_health": {"en": "Business Health Check", "ar": "الفحص الشامل للأعمال", "fr": "Bilan de santé d'entreprise", "nl": "Bedrijfsdoorlichting", "sv": "Företagshälsokontroll"}, "hc_eye": {"en": "Signature service", "ar": "خدمة مميزة", "fr": "Service signature", "nl": "Kenmerkende dienst", "sv": "Signaturtjänst"}, "hc_t": {"en": "Business Health Check", "ar": "الفحص الشامل للأعمال", "fr": "Bilan de santé d'entreprise", "nl": "Bedrijfsdoorlichting", "sv": "Företagshälsokontroll"}, "hc_s": {"en": "A focused, independent review of your company's financial performance, tax position, operations and governance.", "ar": "مراجعة مستقلة ومركّزة للأداء المالي لشركتك ووضعها الضريبي وعملياتها وحوكمتها.", "fr": "Un examen indépendant et ciblé de la performance financière, de la situation fiscale, des opérations et de la gouvernance de votre entreprise.", "nl": "Een gerichte, onafhankelijke doorlichting van de financiële prestaties, fiscale positie, werking en governance van uw onderneming.", "sv": "En fokuserad, oberoende genomgång av företagets finansiella resultat, skatteläge, verksamhet och styrning."}, "hc_cta": {"en": "Request a Health Check", "ar": "اطلب الفحص الشامل", "fr": "Demander un bilan", "nl": "Vraag een doorlichting aan", "sv": "Begär en hälsokontroll"}, "hc_r_eye": {"en": "What We Review", "ar": "ما الذي نراجعه", "fr": "Ce que nous examinons", "nl": "Wat we bekijken", "sv": "Vad vi granskar"}, "hc_r_t": {"en": "A complete view of where your business stands", "ar": "صورة كاملة عن وضع شركتك", "fr": "Une vision complète de votre entreprise", "nl": "Een volledig beeld van uw onderneming", "sv": "En helhetsbild av ditt företag"}, "hc_a1_t": {"en": "Financial Performance", "ar": "الأداء المالي", "fr": "Performance financière", "nl": "Financiële prestaties", "sv": "Finansiella resultat"}, "hc_a1_d": {"en": "Profitability, margins, cash flow and reporting quality.", "ar": "الربحية والهوامش والتدفق النقدي وجودة التقارير.", "fr": "Rentabilité, marges, trésorerie et qualité du reporting.", "nl": "Rendabiliteit, marges, kasstromen en kwaliteit van de rapportering.", "sv": "Lönsamhet, marginaler, kassaflöde och rapporteringens kvalitet."}, "hc_a2_t": {"en": "Tax & Compliance", "ar": "الضرائب والامتثال", "fr": "Fiscalité et conformité", "nl": "Fiscaliteit en compliance", "sv": "Skatt och efterlevnad"}, "hc_a2_d": {"en": "UAE Corporate Tax, VAT and Excise Tax obligations, where applicable.", "ar": "التزامات ضريبة الشركات والقيمة المضافة والضريبة الانتقائية، حسب الحالة.", "fr": "Obligations en impôt sur les sociétés, TVA et droits d'accise aux Émirats, le cas échéant.", "nl": "Verplichtingen inzake vennootschapsbelasting, btw en accijnzen in de VAE, indien van toepassing.", "sv": "Skyldigheter för bolagsskatt, moms och punktskatt i Förenade Arabemiraten, där det är tillämpligt."}, "hc_a3_t": {"en": "Operations & Controls", "ar": "العمليات والرقابة", "fr": "Opérations et contrôles", "nl": "Werking en controles", "sv": "Verksamhet och kontroller"}, "hc_a3_d": {"en": "Process gaps, inefficiencies and internal controls.", "ar": "ثغرات العمليات ومواطن الهدر والرقابة الداخلية.", "fr": "Failles de processus, inefficacités et contrôle interne.", "nl": "Hiaten in processen, inefficiënties en interne controle.", "sv": "Brister i processer, ineffektivitet och intern kontroll."}, "hc_a4_t": {"en": "Governance & Risk", "ar": "الحوكمة والمخاطر", "fr": "Gouvernance et risques", "nl": "Governance en risico's", "sv": "Styrning och risk"}, "hc_a4_d": {"en": "Responsibilities, approvals and key business exposures.", "ar": "المسؤوليات والصلاحيات وأبرز المخاطر التي تواجه الأعمال.", "fr": "Responsabilités, validations et principaux risques de l'entreprise.", "nl": "Verantwoordelijkheden, goedkeuringen en de belangrijkste bedrijfsrisico's.", "sv": "Ansvar, attester och de viktigaste affärsriskerna."}, "hc_g_t": {"en": "What You Receive", "ar": "ما الذي تحصل عليه", "fr": "Ce que vous recevez", "nl": "Wat u ontvangt", "sv": "Det här får du"}, "hc_g1_t": {"en": "Concise findings report", "ar": "تقرير موجز بالنتائج", "fr": "Rapport de constats synthétique", "nl": "Beknopt rapport met bevindingen", "sv": "Kortfattad rapport med slutsatser"}, "hc_g1_d": {"en": "A clear, written summary of strengths, gaps and risks.", "ar": "ملخص مكتوب وواضح لنقاط القوة والثغرات والمخاطر.", "fr": "Une synthèse écrite et claire des forces, lacunes et risques.", "nl": "Een heldere schriftelijke samenvatting van sterktes, hiaten en risico's.", "sv": "En tydlig skriftlig sammanfattning av styrkor, brister och risker."}, "hc_g2_t": {"en": "Prioritised action plan", "ar": "خطة عمل حسب الأولوية", "fr": "Plan d'action priorisé", "nl": "Geprioriteerd actieplan", "sv": "Prioriterad handlingsplan"}, "hc_g2_d": {"en": "Practical recommendations, ordered by impact and urgency.", "ar": "توصيات عملية مرتبة حسب الأثر والأولوية.", "fr": "Des recommandations concrètes, classées par impact et urgence.", "nl": "Praktische aanbevelingen, gerangschikt op impact en urgentie.", "sv": "Konkreta rekommendationer, ordnade efter effekt och brådska."}, "hc_g3_t": {"en": "Private review meeting", "ar": "اجتماع خاص لمراجعة النتائج", "fr": "Réunion de restitution privée", "nl": "Persoonlijke bespreking", "sv": "Privat genomgångsmöte"}, "hc_g3_d": {"en": "A private session to walk through the results and next steps.", "ar": "جلسة خاصة لمناقشة النتائج والخطوات التالية.", "fr": "Une séance privée pour présenter les résultats et les prochaines étapes.", "nl": "Een persoonlijk gesprek over de resultaten en volgende stappen.", "sv": "Ett privat möte om resultaten och nästa steg."}, "hc_w_t": {"en": "Ideal For", "ar": "مناسب لـ", "fr": "Idéal pour", "nl": "Ideaal voor", "sv": "Passar för"}, "hc_w1": {"en": "SME owners", "ar": "أصحاب الشركات الصغيرة والمتوسطة", "fr": "Dirigeants de PME", "nl": "Kmo-eigenaars", "sv": "Ägare av små och medelstora företag"}, "hc_w2": {"en": "Trading and distribution businesses", "ar": "شركات التجارة والتوزيع", "fr": "Entreprises de négoce et de distribution", "nl": "Handels- en distributiebedrijven", "sv": "Handels- och distributionsföretag"}, "hc_w3": {"en": "Family businesses", "ar": "الشركات العائلية", "fr": "Entreprises familiales", "nl": "Familiebedrijven", "sv": "Familjeföretag"}, "hc_w4": {"en": "Companies preparing for growth or investment", "ar": "الشركات التي تستعد للنمو أو الاستثمار", "fr": "Entreprises qui préparent une croissance ou une levée de fonds", "nl": "Bedrijven die zich voorbereiden op groei of investering", "sv": "Företag som förbereder tillväxt eller investering"}, "hc_band": {"en": "Know where your business stands — and what to do next.", "ar": "اعرف أين تقف شركتك، وما الخطوة التالية.", "fr": "Sachez où en est votre entreprise, et quoi faire ensuite.", "nl": "Weet waar uw onderneming staat, en wat de volgende stap is.", "sv": "Vet var ditt företag står – och vad nästa steg är."}, "nav_s_services": {"en": "Financial & Tax", "ar": "المالية والضرائب", "fr": "Finance & fiscalité", "nl": "Financiën & fiscaliteit", "sv": "Ekonomi & skatt"}, "nav_s_health": {"en": "Health Check", "ar": "الفحص الشامل", "fr": "Bilan d'entreprise", "nl": "Doorlichting", "sv": "Hälsokontroll"}, "nav_s_invest": {"en": "Investment", "ar": "الاستثمار", "fr": "Investissement", "nl": "Investeringen", "sv": "Investeringar"}, "nav_s_concierge": {"en": "Concierge", "ar": "الكونسيرج", "fr": "Conciergerie", "nl": "Concierge", "sv": "Concierge"}};
function T(k,en){const t=TEXT[k];if(t&&t[LANG])return t[LANG];const x=EXTRA[k];if(x&&x[LANG])return x[LANG];return LANG==="ar"&&AR[k]!==undefined?AR[k]:en}
const LANGS=["en","ar","fr","nl","sv"];
const SVI={sv:5,fr:7,nl:9};
function svcT(x){return LANG==="ar"?x[2]:(SVI[LANG]&&x[SVI[LANG]])||x[1]}
function svcD(x){return LANG==="ar"?x[4]:(SVI[LANG]&&x[SVI[LANG]+1])||x[3]}
function fitNav(){const hd=document.getElementById("hd");if(!hd)return;const n=hd.querySelector(".nav"),r=hd.querySelector(".hd-r"),lg=hd.querySelector(".logo");
  const bad=()=>{if(!n||getComputedStyle(n).display==="none")return false;const box=el=>{const b=el.getBoundingClientRect();let l=b.left,R=b.right;[...el.children].forEach(c=>{if(getComputedStyle(c).display==="none")return;const x=c.getBoundingClientRect();if(x.width){l=Math.min(l,x.left);R=Math.max(R,x.right)}});return{left:l,right:R}};const nr=box(n),rr=box(r),lr=box(lg),ov=(x,y)=>x.left<y.right+12&&y.left<x.right+12;return ov(nr,rr)||ov(nr,lr)||rr.right>innerWidth+1||rr.left<-1||lr.left<-1||lr.right>innerWidth+1||n.scrollWidth>n.clientWidth+2};
  hd.classList.remove("nav-collapse","no-cta","no-logo-t");if(!bad())return;hd.classList.add("no-cta");if(!bad())return;hd.classList.add("no-logo-t");if(!bad())return;hd.classList.add("nav-collapse")}
addEventListener("resize",()=>fitNav());document.addEventListener("sab:ready",()=>{try{hlHeads()}catch(e){}});addEventListener("load",()=>fitNav());
function dashify(){document.querySelectorAll("h1,h2.h2,.cta-band h2,.hero .signature,.eyebrow,.ft .sig,.banner p,.pc-sub").forEach(el=>{if(el.closest(".prose"))return;
  const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];while(w.nextNode())if(w.currentNode.nodeValue.trim())ns.push(w.currentNode);
  ns.forEach((n,i)=>{let t=n.nodeValue;const last=i===ns.length-1;const parts=[];
    t=t.replace(/\s*·\s*/g," \u0001 ").replace(/\.\s+(?=\S)/g," \u0001 ");
    if(/\.\s*$/.test(t)){t=t.replace(/\.\s*$/,last?"":" \u0001")}
    if(t===n.nodeValue)return;
    const f=document.createDocumentFragment();t.split("\u0001").forEach((seg,k,a)=>{if(seg)f.appendChild(document.createTextNode(seg));if(k<a.length-1){const s=document.createElement("span");s.className="tl";s.setAttribute("aria-hidden","true");f.appendChild(s)}});
    n.replaceWith(f)})})}
function hlHeads(){document.querySelectorAll("h2.h2,h1.display,.phero h1,.cta-band h2").forEach(h=>{if(h.closest(".ft"))return;h.querySelectorAll("em.hl").forEach(e=>e.replaceWith(document.createTextNode(e.textContent)));h.normalize();if(h.querySelector("em"))return;
  const w=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);let n=null;while(w.nextNode())if(w.currentNode.nodeValue.trim())n=w.currentNode;if(!n)return;
  const tx=n.nodeValue.replace(/\s+$/,"");const i=tx.lastIndexOf(" ");if(i<1&&n===h.firstChild)return;if(i<1)return;
  const em=document.createElement("em");em.className="hl";em.textContent=tx.slice(i+1);n.nodeValue=tx.slice(0,i+1);n.after(em)});try{dashify()}catch(e){}}
function applyLang(l){
  LANG=l;
  document.documentElement.lang=l==="nl"?"nl-BE":l;
  document.documentElement.dir=l==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i]").forEach(el=>{
    if(el.dataset.en===undefined)el.dataset.en=el.textContent;
    el.textContent=T(el.dataset.i,el.dataset.en);
  });
  document.querySelectorAll(".lang-menu button").forEach(b=>b.setAttribute("aria-checked",b.dataset.lang===l));{const c=document.getElementById("langCur");if(c)c.textContent=l.toUpperCase()}
  {const ds=document.body.dataset;if(!ds.titleEn)ds.titleEn=document.title;document.title=(l!=="en"&&ds["title"+l[0].toUpperCase()+l.slice(1)])||ds.titleEn}
  buildServiceSelect();renderPillar();renderInsights();renderArticle();
  hlHeads();
  if(typeof fitNav==="function")fitNav();
  try{localStorage.setItem("sab_lang",l)}catch(e){}
  document.dispatchEvent(new Event("sab:lang"));
}

/* ---------- shell: header, footer, modal, whatsapp ---------- */
function shell(){if(!document.getElementById("ftBrandCss")){const st=document.createElement("style");st.id="ftBrandCss";st.textContent='.ft-brand{display:inline-flex!important;align-items:center;gap:14px;margin-bottom:10px;text-decoration:none}.ft-brand .mark{height:46px;width:auto;filter:none}.ft .ft-brand .logo-t{display:block!important}';document.head.appendChild(st)}
  const page=document.body.dataset.page||"home";
  const cur=p=>page===p?' aria-current="page"':"";
  const home=page==="home"?"":"index.html";
  const hd=document.createElement("header");hd.className="hd";hd.id="hd";
  hd.innerHTML=`<div class="wrap"><div class="hd-in">
    <a href="index.html" class="logo" aria-label="Saida Afly Business Gateway"><img class="mark" src="img/logo-mark.png" alt="" width="92" height="46" onload="window.fitNav&&fitNav()"><span class="logo-t"><b>SAIDA AFLY</b><span>BUSINESS GATEWAY</span></span></a>
    <nav class="nav" aria-label="Main">
      <a href="index.html"${cur("home")} data-i="nav_home">Home</a>
      <a href="advisory.html"${cur("advisory")} data-i="nav_s_services">Financial & Tax</a>
      <a href="business-health-check.html"${cur("health")} data-i="nav_s_health">Health Check</a>
      <a href="investment.html"${cur("investment")} data-i="nav_s_invest">Investment</a>
      <a href="concierge.html"${cur("concierge")} data-i="nav_s_concierge">Concierge</a>
      <a href="insights.html"${cur("insights")} data-i="nav_insights">Insights</a>
      <a href="${home}#contact" data-i="nav_contact">Contact</a>
    </nav>
    <div class="hd-r">
      <div class="lang" id="lang"><button type="button" class="lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="Language"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg><span id="langCur">EN</span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="lang-menu" role="menu"><button type="button" role="menuitemradio" data-lang="en" lang="en"><b>EN</b>English</button><button type="button" role="menuitemradio" data-lang="ar" lang="ar"><b>AR</b>العربية</button><button type="button" role="menuitemradio" data-lang="fr" lang="fr"><b>FR</b>Français</button><button type="button" role="menuitemradio" data-lang="nl" lang="nl-BE"><b>NL</b>Nederlands (Vlaams)</button><button type="button" role="menuitemradio" data-lang="sv" lang="sv"><b>SV</b>Svenska</button></div></div>
      <button type="button" class="btn btn-blush btn-sm" data-open="consultation" data-i="hd_cta">Book a Private Consultation</button>
      <button type="button" class="burger" id="burger" aria-label="Menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div></div>
    <div class="mnav" id="mnav">
      <a href="index.html" data-i="nav_home">Home</a>
      <a href="advisory.html" data-i="nav_services">Business & Financial Services</a><a href="business-health-check.html" data-i="nav_health">Business Health Check</a><a href="investment.html" data-i="nav_invest">Investment Opportunities</a><a href="concierge.html" data-i="nav_concierge">Private Concierge</a>
      <a href="insights.html" data-i="nav_insights">Insights</a><a href="${home}#contact" data-i="nav_contact">Contact</a>
      <button type="button" class="btn btn-blush" style="margin-top:10px" data-open="consultation" data-i="hd_cta">Book a Private Consultation</button>
    </div></div>`;
  document.body.prepend(hd);
  const sk=document.createElement("a");sk.className="skip";sk.href="#main";sk.textContent="Skip to content";document.body.prepend(sk);

  const li=CONFIG.linkedin?`<a href="${CONFIG.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21H9z"/></svg></a>`:"";
  const ft=document.createElement("footer");ft.className="ft";
  ft.innerHTML=`<div class="wrap">
    <div class="ft-top"><p class="sig"><span data-i="ft_sig1">Connecting Ambition</span> <em data-i="ft_sig2">with Opportunity.</em></p>
      <button type="button" class="btn btn-blush" data-open="consultation" data-i="hd_cta">Book a Private Consultation</button></div>
    <div class="ft-grid">
      <div><a href="index.html" class="logo ft-brand" aria-label="Saida Afly Business Gateway"><img class="mark" src="img/logo-mark.png" alt="" width="92" height="46"><span class="logo-t"><b>SAIDA AFLY</b><span>BUSINESS GATEWAY</span></span></a>
        <p style="margin:20px 0 0;max-width:340px" data-i="ft_desc">Premium business advisory and private client services in Dubai, combining professional expertise with personal attention.</p>
        <div class="social"><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_SVG}</a>${li}<a href="mailto:${CONFIG.email}" aria-label="Email">${ico("doc",18)}</a></div></div>
      <div><h4 data-i="ft_nav">Navigate</h4><ul><li><a href="index.html" data-i="nav_home">Home</a></li><li><a href="insights.html" data-i="nav_insights">Insights</a></li><li><a href="${home}#contact" data-i="nav_contact">Contact</a></li></ul></div>
      <div><h4 data-i="ft_services">Services</h4><ul><li><a href="advisory.html" data-i="dd_p1">Business & Financial Advisory</a></li><li><a href="business-health-check.html" data-i="nav_health">Business Health Check</a></li><li><a href="investment.html" data-i="dd_p2">Investment & Real Estate</a></li><li><a href="concierge.html" data-i="dd_p3">Dubai Private Concierge</a></li></ul></div>
      <div><h4 data-i="ft_contact">Contact</h4><ul><li><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" dir="ltr">${CONFIG.whatsappDisplay}</a></li><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li data-i="city">Dubai, United Arab Emirates</li></ul></div>
    </div>
    <p class="ft-disc" data-i="ft_disc">Saida Afly Business Gateway provides advisory, introduction and coordination services. Regulated activities — including real estate brokerage, investment management and medical services — are carried out by appropriately licensed providers. Nothing on this website constitutes investment advice or a guarantee of any return.</p>
    <div class="ft-bot"><span data-i="ft_rights">© 2026 Saida Afly Business Gateway. All rights reserved.</span><nav><a href="privacy.html" data-i="ft_privacy">Privacy Policy</a><a href="terms.html" data-i="ft_terms">Terms & Conditions</a></nav></div>
  </div>`;
  document.body.append(ft);

  const wa=document.createElement("a");wa.className="wa";wa.href=`https://wa.me/${CONFIG.whatsapp}`;wa.target="_blank";wa.rel="noopener";wa.setAttribute("aria-label","WhatsApp");
  wa.innerHTML=`${WA_SVG}<span data-i="wa_label">WhatsApp</span>`;document.body.append(wa);

  const m=document.createElement("div");m.className="modal";m.id="modal";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-labelledby","mTitle");
  m.innerHTML=`<div class="dialog">
    <div class="dlg-hd"><span class="eyebrow" data-i="m_eyebrow">Private & confidential</span><h2 class="h3" id="mTitle" data-i="m_title">Request a Private Consultation</h2><p data-i="m_sub">Share a few details and we will respond to you personally.</p>
      <button type="button" class="x" id="mClose" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="tabs" role="group"><button type="button" data-type="consultation" aria-pressed="true" data-i="tab_c">Consultation</button><button type="button" data-type="investment" aria-pressed="false" data-i="tab_i">Investment inquiry</button><button type="button" data-type="concierge" aria-pressed="false" data-i="tab_r">Concierge request</button></div>
    </div>
    <form class="inq" id="inq" name="inquiry" novalidate>
      <input type="hidden" name="form-name" value="inquiry"><input type="hidden" name="inquiry_type" id="qType" value="consultation">
      <p class="hp"><label>Leave empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <div class="f"><label for="qName"><span data-i="f_name">Full name</span> *</label><input id="qName" name="name" required autocomplete="name"></div>
      <div class="f"><label for="qEmail"><span data-i="f_email">Email address</span> *</label><input id="qEmail" name="email" type="email" required autocomplete="email" dir="ltr"></div>
      <div class="f"><label for="qPhone"><span data-i="f_phone">Phone / WhatsApp</span> *</label><input id="qPhone" name="phone" type="tel" required autocomplete="tel" dir="ltr"></div>
      <div class="f"><label for="qCountry"><span data-i="f_country">Country of residence</span> *</label><input id="qCountry" name="country" required autocomplete="country-name"></div>
      <div class="f full"><label for="qService"><span data-i="f_service">Service of interest</span> *</label><select id="qService" name="service" required></select></div>
      <div class="f full"><label for="qDesc"><span data-i="f_desc">Brief description of your requirements</span> *</label><textarea id="qDesc" name="message" required></textarea></div>
      <div class="f"><label for="qDate" data-i="f_date">Preferred consultation date</label><input id="qDate" name="preferred_date" type="date"></div>
      <div class="f"><span style="font-size:13.5px;font-weight:600;color:var(--ink2)" data-i="f_method">Preferred contact method</span>
        <div class="radios"><label><input type="radio" name="contact_method" value="Email" checked><span data-i="m_email">Email</span></label><label><input type="radio" name="contact_method" value="Phone"><span data-i="m_phone">Phone</span></label><label><input type="radio" name="contact_method" value="WhatsApp"><span data-i="m_wa">WhatsApp</span></label></div></div>
      <div class="privacy">${ico("shield",18)}<span data-i="f_privacy">Your information is used only to respond to your inquiry. It is never sold or shared for marketing. You may request its deletion at any time.</span></div>
      <label class="consent"><input type="checkbox" id="qConsent" name="consent" value="yes" required><span><span data-i="f_consent_a">I agree that Saida Afly Business Gateway may use the information I provide to respond to my inquiry, as described in the</span> <a href="privacy.html" target="_blank" data-i="f_consent_b">Privacy Policy</a>. *</span></label>
      <p class="err" id="qErr" role="alert" data-i="f_err">Please complete the required fields and confirm your consent.</p>
      <div class="f-actions"><button type="submit" class="btn btn-primary" id="qSubmit"><span data-i="f_submit">Submit request</span>${ARR}</button></div>
    </form>
    <div class="result" id="qOk" role="status"><div class="ok">${ico("shield",28)}</div><h3 class="h3" data-i="r_ok_t">Thank you — your request has been received.</h3><p class="muted" data-i="r_ok_d">We will contact you using your preferred method.</p><div class="row"><button type="button" class="btn btn-line" data-close data-i="r_close">Close</button></div></div>
    <div class="result" id="qFb" role="status"><div class="ok">${ico("doc",28)}</div><h3 class="h3" data-i="r_fb_t">Your request is ready</h3><p class="muted" data-i="r_fb_d">Online submission isn't available in this preview. Send your request directly — it's already written for you:</p>
      <div class="row"><a class="btn btn-primary" id="fbWa" target="_blank" rel="noopener">${WA_SVG}<span data-i="r_wa">Send via WhatsApp</span></a><a class="btn btn-line" id="fbMail"><span data-i="r_mail">Send by email</span></a></div>
      <p class="small" style="margin-top:16px" dir="ltr">${CONFIG.whatsappDisplay} · ${CONFIG.email}</p></div>
  </div>`;
  document.body.append(m);
}

/* ---------- service select ---------- */
let QTYPE="consultation";
function buildServiceSelect(){
  const s=document.getElementById("qService");if(!s)return;
  const keep=s.value;const i={ar:1,sv:2,fr:3,nl:4}[LANG]||0;
  const order=QTYPE==="investment"?["p2","p1","p3"]:QTYPE==="concierge"?["p3","p1","p2"]:["p1","p2","p3"];
  s.innerHTML=`<option value="">${T("f_choose","Select a service")}</option>`+order.map(p=>`<optgroup label="${PILLAR_NAMES[p][i]}">`+SERVICES[p].map(x=>`<option value="${x[1]}">${svcT(x)}</option>`).join("")+`</optgroup>`).join("");
  if(keep)s.value=keep;
}
function setType(t){
  QTYPE=t;document.getElementById("qType").value=t;
  document.querySelectorAll(".tabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.type===t));
  const s=document.getElementById("qService");s.value="";buildServiceSelect();
}
function openModal(t){
  const m=document.getElementById("modal");
  document.getElementById("inq").style.display="";document.getElementById("qOk").classList.remove("show");document.getElementById("qFb").classList.remove("show");
  setType(t||"consultation");m.classList.add("open");document.body.style.overflow="hidden";
  setTimeout(()=>document.getElementById("qName").focus(),60);
}
function closeModal(){document.getElementById("modal").classList.remove("open");document.body.style.overflow=""}

/* ---------- submit ---------- */
window.SAB_isLive=()=>isLive();Object.defineProperty(window,"SAB_CONFIG",{get:()=>CONFIG});
function isLive(){const h=location.hostname;return CONFIG.liveHosts.some(x=>h===x||h.endsWith("."+x))}
async function submitForm(e){
  e.preventDefault();
  const f=e.target,err=document.getElementById("qErr");
  const ok=f.checkValidity();
  if(!ok){err.classList.add("show");const bad=f.querySelector(":invalid");if(bad)bad.focus();return}
  err.classList.remove("show");
  const fd=new FormData(f);
  const lines=[`${T("m_title","Request a Private Consultation")} — ${f.inquiry_type.value}`,`${T("f_name","Name")}: ${fd.get("name")}`,`${T("f_email","Email")}: ${fd.get("email")}`,`${T("f_phone","Phone")}: ${fd.get("phone")}`,`${T("f_country","Country")}: ${fd.get("country")}`,`${T("f_service","Service")}: ${fd.get("service")}`,fd.get("preferred_date")?`${T("f_date","Preferred date")}: ${fd.get("preferred_date")}`:"",`${T("f_method","Contact method")}: ${fd.get("contact_method")}`,"",fd.get("message")].filter(x=>x!=="").join("\n");
  if(isLive()){
    const btn=document.getElementById("qSubmit");btn.disabled=true;
    try{
      const r=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(fd).toString()});
      if(!r.ok)throw new Error(r.status);
      f.reset();f.style.display="none";document.getElementById("qOk").classList.add("show");btn.disabled=false;return;
    }catch(x){btn.disabled=false}
  }
  document.getElementById("fbWa").href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines)}`;
  document.getElementById("fbMail").href=`mailto:${CONFIG.email}?subject=${encodeURIComponent(T("m_title","Private Consultation Request")+" — "+fd.get("name"))}&body=${encodeURIComponent(lines)}`;
  f.style.display="none";document.getElementById("qFb").classList.add("show");
}

/* ---------- pillar pages ---------- */
function renderPillar(){
  const g=document.getElementById("svcGrid");if(!g)return;
  const p=g.dataset.pillar;
  g.innerHTML=SERVICES[p].map(x=>`<div class="svc-item rv in"><span class="ic">${ico(x[0],24)}</span><div><h3>${svcT(x)}</h3><p>${svcD(x)}</p></div></div>`).join("");
}

/* ---------- insights ---------- */
let CAT="all";
const CATS={tax:["Finance & Tax","cat_tax"],strategy:["Business Strategy","cat_strategy"],gov:["Corporate Governance","cat_gov"],dubai:["Dubai Investment Landscape","cat_dubai"],re:["Real Estate Insights","cat_re"],trends:["Business & Economic Trends","cat_trends"]};
function insCard(a){
  const L=a[LANG]||a.en;const c=CATS[a.cat];
  const meta=a.body?`<span>${a.minutes} ${T("min","min read")}</span>`:`<span class="soon">${T("soon","Coming soon")}</span>`;
  const inner=`<span class="cat">${T(c[1],c[0])}</span><h3>${L.title}</h3><p>${L.excerpt}</p><span class="meta">${meta}${a.body?ARR:""}</span>`;
  return a.body?`<a class="ins rv in" href="article.html#${a.id}">${inner}</a>`:`<div class="ins rv in" aria-disabled="true">${inner}</div>`;
}
function renderInsights(){
  if(typeof INSIGHTS==="undefined")return;
  const pv=document.getElementById("insPreview");
  if(pv)pv.innerHTML=INSIGHTS.filter(a=>a.body).slice(0,3).map(insCard).join("");
  const g=document.getElementById("insGrid");if(!g)return;
  const fl=document.getElementById("insFilters");
  fl.innerHTML=`<button type="button" data-cat="all" aria-pressed="${CAT==="all"}">${T("cat_all","All")}</button>`+Object.entries(CATS).map(([k,c])=>`<button type="button" data-cat="${k}" aria-pressed="${CAT===k}">${T(c[1],c[0])}</button>`).join("");
  fl.querySelectorAll("button").forEach(b=>b.onclick=()=>{CAT=b.dataset.cat;renderInsights()});
  g.innerHTML=INSIGHTS.filter(a=>CAT==="all"||a.cat===CAT).map(insCard).join("");
}
function renderArticle(){
  const box=document.getElementById("article");if(!box||typeof INSIGHTS==="undefined")return;
  const id=location.hash.slice(1);const a=INSIGHTS.find(x=>x.id===id&&x.body)||INSIGHTS.find(x=>x.body);if(!a)return;
  const L=a[LANG]||a.en;const c=CATS[a.cat];
  document.title=L.title+" · Saida Afly Business Gateway";
  box.innerHTML=`<a class="link" href="insights.html" style="border:0">${ARR.replace('class="arr"','class="arr" style="transform:scaleX(-1)"')} ${T("back","Back to Insights")}</a>
    <div style="margin-top:34px"><span class="eyebrow">${T(c[1],c[0])}</span><h1>${L.title}</h1><p class="lead">${L.excerpt}</p><p class="small">${a.minutes} ${T("min","min read")}</p></div>
    <div class="prose" style="margin-top:36px">${a.body[LANG]||a.body.en}</div>
    <div class="note-box">${T("art_note","This article provides general information only and does not constitute tax, legal or investment advice. For guidance on your situation, book a private consultation.")}</div>
    <div style="margin-top:34px"><button type="button" class="btn btn-primary" data-open="consultation">${T("hd_cta","Book a Private Consultation")}${ARR}</button></div>`;
}

/* ---------- content loading ---------- */
async function getJSON(p){const r=await fetch(p,{cache:"no-cache"});if(!r.ok)throw new Error(p);return r.json()}
async function loadContent(){
  const [text,settings,images,services,ins]=await Promise.all(["content/text.json","content/settings.json","content/images.json","content/services.json","content/insights.json"].map(p=>getJSON(p).catch(()=>null)));
  if(text)Object.values(text).forEach(sec=>Object.assign(TEXT,sec));
  if(settings)["whatsapp","whatsappDisplay","email","linkedin"].forEach(k=>{if(settings[k]!==undefined)CONFIG[k]=String(settings[k]).trim()});
  CONFIG.whatsapp=CONFIG.whatsapp.replace(/\D/g,"");
  if(images)IMAGES=images;
  if(services){const m={advisory:"p1",investment:"p2",concierge:"p3"};Object.entries(m).forEach(([k,p])=>{if(Array.isArray(services[k])&&services[k].length)SERVICES[p]=services[k].map(x=>[x.icon||"star",x.title_en||"",x.title_ar||x.title_en||"",x.desc_en||"",x.desc_ar||x.desc_en||"",x.title_sv||x.title_en||"",x.desc_sv||x.desc_en||"",x.title_fr||x.title_en||"",x.desc_fr||x.desc_en||"",x.title_nl||x.title_en||"",x.desc_nl||x.desc_en||""])})}
  if(ins&&Array.isArray(ins.articles))INSIGHTS=ins.articles.map(a=>({id:a.slug,cat:a.category,minutes:a.minutes||3,en:{title:a.title_en,excerpt:a.excerpt_en||""},ar:{title:a.title_ar||a.title_en,excerpt:a.excerpt_ar||a.excerpt_en||""},sv:{title:a.title_sv||a.title_en,excerpt:a.excerpt_sv||a.excerpt_en||""},fr:{title:a.title_fr||a.title_en,excerpt:a.excerpt_fr||a.excerpt_en||""},nl:{title:a.title_nl||a.title_en,excerpt:a.excerpt_nl||a.excerpt_en||""},body:a.published&&a.body_en?{en:a.body_en,ar:a.body_ar||a.body_en,sv:a.body_sv||a.body_en,fr:a.body_fr||a.body_en,nl:a.body_nl||a.body_en}:null}));
}
function applyImages(){document.querySelectorAll("[data-ico]").forEach(e=>{e.innerHTML=ico(e.dataset.ico,24)});
  document.querySelectorAll("[data-img]").forEach(el=>{const v=IMAGES[el.dataset.img];if(v)el.src=v});
  if(IMAGES.hero)document.querySelectorAll(".phero").forEach(el=>el.style.setProperty("--phero-img",`url("${new URL(IMAGES.hero,location.href).href}")`));
  const p=document.querySelector(".portrait");
  if(p&&!IMAGES.portrait)IMAGES.portrait="img/portrait.jpg";if(p&&IMAGES.portrait&&!p.querySelector("img")){const i=document.createElement("img");i.src=IMAGES.portrait;i.alt="Saida Afly";i.style.cssText="position:absolute;inset:0;width:100%;height:100%;object-fit:cover";p.prepend(i);p.querySelectorAll(".ini,.note").forEach(x=>x.remove())}
}

/* ---------- init ---------- */
async function init(){
  await loadContent();
  shell();applyImages();
  let saved=null;try{saved=localStorage.getItem("sab_lang")}catch(e){}
  applyLang(LANGS.includes(saved)?saved:"en");
  const lg=document.getElementById("lang"),lgb=lg.querySelector(".lang-btn");
  lgb.addEventListener("click",e=>{e.stopPropagation();const o=lg.classList.toggle("open");lgb.setAttribute("aria-expanded",o)});
  document.addEventListener("click",e=>{if(!e.target.closest("#lang")){lg.classList.remove("open");lgb.setAttribute("aria-expanded",false)}});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){lg.classList.remove("open");lgb.setAttribute("aria-expanded",false)}});
  document.querySelectorAll(".lang-menu button").forEach(b=>b.addEventListener("click",()=>{applyLang(b.dataset.lang);lg.classList.remove("open");lgb.setAttribute("aria-expanded",false)}));
  try{document.fonts.ready.then(()=>fitNav())}catch(e){}
  const hd=document.getElementById("hd");const solid=()=>hd.classList.toggle("solid",scrollY>40);solid();addEventListener("scroll",solid,{passive:true});
  const bg=document.getElementById("burger"),mn=document.getElementById("mnav");
  bg.addEventListener("click",()=>{const o=mn.classList.toggle("open");bg.setAttribute("aria-expanded",o)});
  mn.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mn.classList.remove("open");bg.setAttribute("aria-expanded",false)}));
  document.addEventListener("click",e=>{const o=e.target.closest("[data-open]");if(o){e.preventDefault();mn.classList.remove("open");const pg=document.body.dataset.page,tp=o.dataset.open;const sv=tp==="investment"?"realestate":(tp==="consultation"&&(pg==="advisory"||pg==="health"))?"advisory":"";location.href="private-consultation.html"+(sv?"?s="+sv:"");return}if(e.target.closest("[data-close]"))closeModal()});
  document.getElementById("mClose").addEventListener("click",closeModal);
  document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
  document.querySelectorAll(".tabs button").forEach(b=>b.addEventListener("click",()=>setType(b.dataset.type)));
  document.getElementById("inq").addEventListener("submit",submitForm);
  addEventListener("hashchange",renderArticle);
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});
  document.querySelectorAll(".rv").forEach(el=>io.observe(el));
  const d=document.getElementById("qDate");if(d){const t=new Date();t.setDate(t.getDate()+1);d.min=t.toISOString().slice(0,10)}
  window.SAB_READY=true;document.dispatchEvent(new Event("sab:ready"));
}
document.addEventListener("DOMContentLoaded",init);
