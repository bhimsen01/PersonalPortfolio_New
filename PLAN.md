# Bhimsen Basnet — Portfolio v2: Plan

## Brief (from Bhimsen)
- Backend developer (Java Spring Boot, PostgreSQL). Also worked with stored
  procedures, monolithic architecture, and microservices architecture —
  needs a natural home in the new site.
- Fully static site. No login/dynamic backend.
- Completely new design — not the old one, not "AI-gradient" generic.
- Premium, minimal, elegant. Real color decisions, not templated defaults.
- University student (B.Sc Hons IT), Nepal-based.

## Concept
Old site was a generic "creative dev" portfolio (spinning gradient blob,
UI/3D/frontend/backend highlight cards, Inter everywhere). Bhimsen is not
that person anymore — he's a backend/systems engineer who thinks in schemas,
services, and data flow. The new site's visual language comes from that
world: **entity/schema tables, service boundaries, ER-diagram linework** —
rendered elegantly, not like a literal admin dashboard.

Single scrolling page (case-study style), anchor nav, fully static
HTML/CSS/JS. No frameworks — keeps it fast and easy for Bhimsen to edit by
hand later.

## Design tokens

**Color** (deliberately not cream+terracotta, not near-black+neon, not blue
SaaS gradients):
- `--ink` #14181C — near-black, slightly blue-green charcoal (base dark / text)
- `--stone` #EEEDE6 — warm-cool paper background (cooler than the typical
  AI cream #F4F1EA — pulled toward grey-stone, not butter)
- `--stone-dim` #E3E1D6 — recessed panels/table rows on light bg
- `--brass` #A9824C — muted aged-brass accent (premium, warm metal — not
  terracotta, not neon). Used sparingly: one accent per view.
- `--pine` #21433B — deep pine/emerald, secondary accent for contrast
  moments (e.g. microservices diagram vs. monolith diagram distinction)
- `--line` rgba(20,24,28,0.14) — hairline rule color on light bg

Dark mode inverts ink/stone (ink becomes bg, stone becomes text) with brass
staying constant as the through-line accent.

**Type**
- Display/headings: "Fraunces" (serif, has real optical weight/personality,
  not a generic geometric sans) — used at large sizes only, set tight.
- Body & UI: "IBM Plex Sans" — clean grotesk, pairs well against Fraunces,
  distinct enough from Inter to not read as default.
- Data/labels/code (field types, stack tags, dates): "IBM Plex Mono" — this
  is a *meaningful* choice, not decoration: Bhimsen's actual content
  (schemas, stacks, endpoints) is literally structured/tabular data, so a
  mono face for those specific bits is functional, not a "tech vibe" tell.

No tracked-out all-caps eyebrows. No middle-dot meta strings. No arrow
suffixes on links. Section headers are plain sentence case.

**Layout**
- Left-aligned content, generous negative space, ~68ch max line length.
- Sections styled as "entity blocks": a thin-rule header bar (like a table
  title row) above content, occasionally with 2-column key:value rows
  (mono labels) — echoes a schema/ER diagram without literally drawing one,
  except where a real diagram earns its place (monolith vs microservices).
- Hero: name in Fraunces at large scale + a single structural device — a
  small "connection" indicator row (status-style, functional: shows role +
  location + current availability) instead of a decorative blob.

ASCII layout sketch (hero + first section):

```
┌───────────────────────────────────────────┐
│  BB          Work  Architecture  Projects  │  <- thin nav, hairline underline
├───────────────────────────────────────────┤
│                                             │
│   Bhimsen Basnet                           │  <- Fraunces, huge
│   Backend engineer building data-heavy     │
│   systems with Spring Boot & PostgreSQL.   │
│                                             │
│   [ role · location · status row, mono ]   │
│                                             │
├───────────────────────────────────────────┤
│  01  Selected work                         │  <- numbered ok here: it's
│  ──────────────────────────────────────    │     genuinely a sequence of
│  entity-style project rows...              │     case studies
└───────────────────────────────────────────┘
```

## New content section: "How I build" (architecture)
Addresses stored procedures / monolith / microservices, which have no home
in the old site. Three compact panels, each styled as a small architecture
card with a minimal inline SVG diagram (boxes + connectors, no gradients):
1. **Monolithic systems** — single deployable, layered (controller → service
   → repository), used for e.g. Elevate/Gunasho-style systems.
2. **Microservices** — bounded services + gateway, independent scaling.
3. **Stored procedures / DB-level logic** — PL/pgSQL procedures for
   transactional integrity/performance-critical paths, alongside the JPA
   layer.
Each panel: what it is (plain terms), when Bhimsen reaches for it, not a
sales pitch.

## Projects (from old site + memory, kept factual)
- Elevate — Spring Boot, PostgreSQL, Next.js — integrated LMS + HR system
- E-Suchana / Gunasho backend — Spring Boot, PostgreSQL — govt complaint/
  incident management system (live), incl. auth hardening, payment
  verification flow, notification system — real depth to draw a case-study
  row from memory notes
- Khadka Baa Exports — Spring Boot, PostgreSQL — ecommerce backend
- DeadDrop — Java/JDBC/Servlet/JSP — credit-based task management
- Hall Booking MS — Java/Swing — desktop app
- Campus attendance (Hive Challenge hackathon) — Spring Boot/Next.js/
  PostgreSQL, WebAuthn biometric check-in
Older HTML/CSS/JS-only projects (Verve, Weather App, Techspire) kept as a
condensed "earlier work" list, not full case studies — keeps focus on
backend depth.

## Build plan (checklist lives in PROGRESS.md)
1. Scaffold index.html structure + CSS token system + fonts.
2. Hero + nav.
3. About / summary.
4. "How I build" architecture section with 3 inline SVG diagrams.
5. Selected work (case-study rows) using real project data.
6. Skills as compact grouped tag list (not icon-grid cards).
7. Education timeline (minimal).
8. Contact/footer.
9. Dark mode toggle (kept, since old site had it — but re-themed, no JS
   framework).
10. Responsive pass + accessibility pass (focus states, contrast, reduced
    motion) + screenshot review + polish pass.

## Assumptions made (flag to Bhimsen)
- Went with a single-page scroll site instead of multi-page — more common
  for premium modern dev portfolios and easier to maintain. Can split back
  into multi-page later if preferred.
- Dropped the 3D/Blender and gallery content from the homepage highlights
  since the brief is "backend developer" positioning; gallery/Blender can
  be re-added as a small "outside of work" note if wanted.
- Wrote original section copy (about text, architecture panel descriptions)
  since old site copy was mostly generic ("Crafting intuitive interfaces...")
  — should be reviewed/edited by Bhimsen for voice/accuracy.
