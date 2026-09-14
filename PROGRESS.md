# Progress

Read PLAN.md first for design tokens/approach if resuming.

## Status: DONE (v1 shipped)

## Completed
- [x] Reviewed old portfolio (all pages) + memory notes for real project depth.
- [x] Wrote PLAN.md (tokens, layout concept, content plan, assumptions).
- [x] Built index.html + style.css + script.js — full single-page site:
      nav, hero, about, "how I build" (monolith/microservices/stored
      procedures with custom inline SVG diagrams), selected work (6 full
      case-study rows + 5 condensed earlier-work items), skills, education,
      contact, footer, dark mode toggle, mobile nav.
- [x] Verified rendering with Playwright Chromium at desktop (1440) and
      mobile (390) widths, light + dark mode. Fixed:
      - hero headline orphan-word wrap (was breaking "up" onto its own line)
      - mobile nav menu text was center-aligned, changed to left-aligned
- [x] Removed unused copied asset folders (project screenshots/icons weren't
      used in the new text/diagram-driven design — see "assumptions" below)
- [x] Copied resume PDF into assets/, linked from Contact section.
- [x] Shipped to /mnt/user-data/outputs and presented to user.

## If picking this back up later
- Site is plain HTML/CSS/JS, no build step — just edit and refresh.
- All copy in the "About" and architecture panel descriptions is
  Claude-written from the brief + memory notes; Bhimsen should review for
  voice/accuracy, especially the E-Suchana description (pulled from a
  memory file with implementation details he'd mentioned previously).
- Old multi-page site (education.html, skills.html, projects.html, gallery)
  is not carried over structurally — this is single-page now. If Bhimsen
  wants a separate gallery/3D-work page back, that's a new addition, not
  a restore.
- Project screenshots from the old site (Projects/*.png) were intentionally
  left out of the new design (text/diagram-led, not screenshot-led) — they
  still exist in the original upload if he wants thumbnails added back to
  the work rows later.
- Live preview: open index.html directly in a browser, no server needed.

## v2 update — motion pass
Added a restrained, Apple-style animation layer on top of the shipped v1:
- Scroll-reveal system (IntersectionObserver + `.reveal`/`.dN` delay classes)
  used on section heads, about content, architecture panels, work rows,
  skill groups, timeline rows, contact block. Progressive enhancement: with
  JS disabled everything is simply visible (no hidden-by-default states).
- Hero loads with a staggered intro (kicker → heading → lede → status row),
  then gets a subtle one-time parallax/fade tied to scroll position as you
  leave it — the one "orchestrated moment," not scattered per-section motion.
- Architecture diagrams: connector lines draw themselves in (stroke-dashoffset
  animation) when a panel scrolls into view, synced with the panel's reveal.
- Nav gains a subtle background/shadow once the page is scrolled.
- Theme toggle icon crossfades/rotates (sun↔moon) instead of an abrupt swap.
- Small tactile details: tag/chip hover lift, button press scale, status dot
  slow breathing pulse (signals "live/active", not just decoration).
- Full `prefers-reduced-motion: reduce` support — verified the site correctly
  skips all of the above (including in this sandbox's headless browser,
  which reports reduced motion by default) and just shows the final state.

Bug fixed during this pass: the diagram line-draw initially animated
backwards on page load (erasing from fully-drawn to hidden) because the CSS
transition rule was catching the *initial* JS style-priming write, not just
the later draw-in. Fixed by setting the initial dasharray/dashoffset with
`transition: none`, forcing a reflow, then re-enabling the transition before
the real draw-in trigger.

Verified with Playwright (Chromium) at 1440px and 390px, light + dark, with
`prefers-reduced-motion` forced both ways, checking actual computed
`stroke-dashoffset` values over time (not just screenshots) to confirm
animation direction/timing — screenshots alone don't reveal transition
direction bugs like the one above.
