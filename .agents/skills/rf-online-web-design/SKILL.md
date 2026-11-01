---
name: rf-online-web-design
description: Design and implement premium RF Online / RF NEVERMIND gaming website pages with existing default typography, Font Awesome icons, responsive mobile UX, cinematic motion and production-safe integration. Use when creating or redesigning RF Online pages, components, navigation, and interactive features.
---

# RF Online Website Design & Implementation

## Before work
1. Read `AGENTS.md` and `.agents/skills/antislop/SKILL.md`, plus relevant antislop UI, mobile, code, copywriting and accessibility guidance.
2. Inspect actual target page, existing CSS/JS, integration points, assets, and the repository structure before editing.
3. Preserve RF NEVERMIND's visual identity, existing site layout, CKEditor integration and server-side scripts unless explicitly asked to rewrite them. Never break loaders or PHP interpolation. Do not migrate frameworks without an explicit request.
4. Treat this skill as design guidance, not permission to overwrite working code or replace supplied assets.

## Design brief
Act as a senior AAA MMORPG creative director, UI/UX and motion designer, and frontend engineer. Deliver an original RF Online sci-fi fantasy aesthetic: faction warfare, metallic industrial surfaces, cosmic atmosphere, restrained cinematic lighting and deliberate visual depth. Suggested accents: obsidian #080B12, midnight navy #101827, graphite #1C2533, molten gold #E9B75C, cyan #37C8FF, orange #FF7538 and crimson #E94D5B. Match existing branding before applying these suggestions. Avoid generic AI SaaS layouts, excessive neon, repetitive glass cards and needless decoration.

## Typography — critical
- **Use the existing website font family or the browser/system default font.**
- **Never import Google Fonts or install custom typefaces. Never override existing font-family declarations merely for aesthetics.**
- Achieve hierarchy using font size, moderate weights, line-height, letter-spacing, spacing and alignment; use `clamp()` where appropriate.
- Avoid blanket bold styles, overwhelming uppercase headings or artificially oversized hero text.
- Keep the parent site's font styling intact inside embedded or dynamically loaded content.

## Iconography
- Use Font Awesome 6 or the version already installed; do not duplicate-load the library or mix incompatible icon prefixes.
- Use correct semantic icons for Home, News, Patch Notes, Download, Login, Register, Server Status, Battlepass, Ranking, Guide, Donation, Discord and Support.
- Keep icon size, weight and alignment consistent; never use emojis as substitute UI icons.

## Pages and visual hierarchy
For a new full-site build, consider cinematic hero with concise CTA; real server status; Accretia/Bellato/Cora faction presentation; features and rates; news and patch notes; events and battlepass; rankings; downloads/onboarding; community; support; and a coherent footer. Supporting pages may include account, donation/shop, guides and FAQ. Implement only sections requested or justified by available content. Never fabricate live server counts, event dates, links, APIs, rewards, payments or rankings.

## Interactions
- Make real links, tabs, filters, accordions, forms, modals, dropdowns, menus and buttons functional; no inert interactive decoration.
- Provide focus-visible, loading, empty, error, success and disabled states where relevant.
- Use keyboard operability, appropriate labels, form validation and accessible contrast.
- Preserve user scroll position after dismissing overlays unless an explicit navigational action occurs.
- If the data source is unavailable, use clearly identified mock/demo content rather than pretending it is live.

## Motion
Use meaningful hero reveals, staggered section entrances, restrained parallax, ambient lighting, subtle energy effects and deliberate button/card feedback. Prefer transform/opacity; avoid persistent expensive filters and layout-thrashing animation. Respect `prefers-reduced-motion`. Only add 3D tilt and animated counters where they improve clarity. Prioritize responsiveness and performance over maximal effects.

## Responsive
Design mobile-first with content-driven breakpoints; verify at 320, 375, 768, 1024, 1440 and 1920px. No horizontal overflow or clipped content. Use comfortable 44px touch targets, responsive images and art direction. Mobile menus require accessible close controls, backdrop, predictable focus management and safe body-scroll restoration. Convert dense rankings/tables into usable scrollable or adapted layouts. Reduce heavy effects on low-powered devices.

## Implementation and delivery
- Work with the repo's existing HTML/CSS/JS and PHP/CKEditor integration; use semantic markup, tokenized CSS and modular scoped JS.
- Keep global CSS selectors from leaking into existing pages or CKEditor content. Avoid resetting external site typography, body styles or global components.
- Load assets efficiently (responsive WebP/AVIF when possible), lazy-load noncritical imagery and never replace authentic supplied RF assets with unrelated fantasy art.
- Validate navigation, forms, icons, responsive states, accessibility, console errors, performance and reduced-motion. Check for double injection, duplicate content and unwanted scroll jumps.
- Do a final anti-slop review; report actual files changed, what was tested, and any unavailable verification. Deliver finished code rather than only a design description when implementation is requested.

## Reusable agent instruction
> Build or refine this RF Online page to AAA MMORPG quality: original cinematic industrial sci-fi design, authentic faction art, existing/default typography (no new fonts), Font Awesome icon consistency, accessible mobile-first interactions, tasteful performant animations and zero broken integration. Inspect the live repository first, respect AGENTS.md and antislop skills, then implement and verify.
