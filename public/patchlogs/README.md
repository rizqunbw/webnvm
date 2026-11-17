# RF NEVERMIND — Patch Logs

The files in this directory power the Patch Logs page through CKEditor. They follow the `public/serverrate` typography, colors, and CKEditor live-loader pattern as Server Rate, NPC List, Drop List, and Donate List — but the layout here is a simple vertical timeline. **No images:** every visual is CSS (grid backdrop, glow, orbit rings) plus Font Awesome icons.

- `patchlogs.html` — hero, stats, and the timeline. Newest entry first.
- `patchlogs.css` — scoped styles using the Server Rate tokens (`--nvm-bg #101b28`, `--nvm-line #2a3a4c`, `--nvm-text #eaf2f8`, `--nvm-muted #b2c0ce`, `--nvm-cyan #69e4f2`, inner panel `#152434`, gold `#f2c56b` for the LATEST tag only). Base font 13px / 1.45, radius 6px.
- `patchlogs.js` — staggered entrance only. No timer, no calculator.
- `loader.html` — CKEditor bootstrap. Install its contents in CKEditor **once**; it automatically retrieves HTML, CSS and JS from GitHub. Unchanged by content updates.

For future content or layout changes, edit only `patchlogs.html`, `patchlogs.css` or `patchlogs.js`. No need to paste the loader again. The loader only needs changing if the integration architecture itself changes.

The loader uses the latest GitHub commit to refresh assets and falls back to the main branch when GitHub API access fails.

## What the player sees

- **Hero** — big title, live pulse dot, three stat tiles (patch entries, combine recipes, latest patch date), and an animated orbit mark: a floating hammer core, two counter-rotating dashed rings, and a glowing orbiting dot.
- **Timeline** — one vertical line with a glowing dot per entry, entries stacked going down, newest on top. Each entry has a date block (day + month/year), a title, a date line, LATEST / MAINTENANCE tags, and a simple list of changes — one icon + bold headline + one-line detail per change. Hovering an entry lifts it and lights its border.
- **Motion** — staggered entrance, drifting scan beam, pulsing live dot and timeline dots, floating hero mark, and hover lift. All animation is disabled under `prefers-reduced-motion`, and the entrance hidden state is only applied by JS, so the page never depends on JS to appear.

## Current content

### 18 November 2026 — Cash Coin Potion Combine & Donation Open (LATEST, UPDATE)

1. **Combine Cash Coin Potion +250 & +500** — farmed potions combine into bigger ones, up to 5 at a time, commit fee = output × 100. All 10 recipes verified against `potioncombine.tsv` (`cocsa95814`–`95823`, repo rfrizquprojects):

| Material | Result | Commit Fee |
|---|---|---|
| 1x Cash Coin Potion+250 | +62,500 Cash Coin | 6,250,000 |
| 2x Cash Coin Potion+250 | +125,000 Cash Coin | 12,500,000 |
| 1x Cash Coin Potion+500 | +125,000 Cash Coin | 12,500,000 |
| 3x Cash Coin Potion+250 | +187,500 Cash Coin | 18,750,000 |
| 4x Cash Coin Potion+250 | +250,000 Cash Coin | 25,000,000 |
| 2x Cash Coin Potion+500 | +250,000 Cash Coin | 25,000,000 |
| 5x Cash Coin Potion+250 | +312,500 Cash Coin | 31,250,000 |
| 3x Cash Coin Potion+500 | +375,000 Cash Coin | 37,500,000 |
| 4x Cash Coin Potion+500 | +500,000 Cash Coin | 50,000,000 |
| 5x Cash Coin Potion+500 | +625,000 Cash Coin | 62,500,000 |

2. **Donation is now open!** — linked to https://rfnvm.com/donate

### 16 November 2026 — Maintenance Restart Server (MAINTENANCE)

1. Enable drop all Pit Boss — all Pit Boss drops enabled, linked to the Drop List at https://rfnvm.com/drop
2. BP Potion is disabled now — keep BP Potions in the bank, they will be used in the next update
3. Missing Cash Coin items added — Double Buff Potion, Teleport, Call Potion, etc.
4. CW 2 will be ended by the system — tonight is the first Chip War, prepare yourself!
5. More updates are coming soon!

## How to add a new patch

1. In `patchlogs.html`, copy a whole `<li class="nvm-patch__entry ...">...</li>` block.
2. Paste it **above** the current newest entry (newest first).
3. Change the date block, title, date line, tags, and the change items. Move the `LATEST` tag to the new entry and remove it from the old one.
4. Update the hero stats: patch entries count, total changes count, and latest patch date.
5. Push — the loader picks the new version up automatically (raw.githubusercontent.com can serve a stale cached version for a few minutes after a push; the loader refreshes every 30s, so the live page settles shortly after).
