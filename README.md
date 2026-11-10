# SAIDA AFLY | BUSINESS GATEWAY — website

Static bilingual website (English / Arabic), hosted on Netlify.

## Editing content
All texts, images, services, articles and contact details live in `content/`:
- `content/text.json` — every website text, in English and Arabic
- `content/images.json` — image paths (uploads go to `img/uploads/`)
- `content/services.json` — the three service lists
- `content/insights.json` — Insights articles
- `content/settings.json` — WhatsApp, email, LinkedIn

Edit them from the dashboard at https://app.pagescms.org (sign in with GitHub, open this repository).
The dashboard layout is defined in `.pages.yml`.

## Forms
The consultation form uses Netlify Forms (form name: `inquiry`). Enable email notifications in
Netlify → Site → Forms → Form notifications.
