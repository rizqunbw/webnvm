# RF NEVERMIND — Donate List

The files in this directory power the right-column Donate List page through CKEditor. They follow the `public/serverrate` typography, colors, and CKEditor live-loader pattern as Server Rate, NPC List, and Drop List — but the layout here is a full redesign, built with CSS only. **No images:** every visual is CSS (grid backdrop, glow, orbit rings, coin discs, shine sweep) plus Font Awesome icons.

- `donatelist.html` — hero, ticker, Cash Coin calculator, and Premium plans. Only the **IDR price** is written here.
- `donatelist.css` — scoped styles using the Server Rate tokens (`--nvm-bg #101b28`, `--nvm-line #2a3a4c`, `--nvm-text #eaf2f8`, `--nvm-muted #b2c0ce`, `--nvm-cyan #69e4f2`, inner panel `#152434`, gold `#f2c56b` for Premium only). Base font 13px / 1.45, section head h3 16px weight 600, radius 6px.
- `donatelist.js` — derives PHP and USD prices from the IDR price, Cash Coin calculator with quick chips and animated price ticks, per-day cost, and staggered entrance. No timer.
- `loader.html` — CKEditor bootstrap. Install its contents in CKEditor **once**; it automatically retrieves HTML, CSS and JS from GitHub. Unchanged by this redesign.

For future content, layout or price changes, edit only `donatelist.html`, `donatelist.css` or `donatelist.js`. No need to paste the loader again. The loader only needs changing if the integration architecture itself changes.

The loader uses the latest GitHub commit to refresh assets and falls back to the main branch when GitHub API access fails.

## What the player sees

- **Hero** — big title, live pulse dot, three stat tiles (1:10 Cash Coin rate, 11 packages, IDR · PHP · USD), and an animated orbit mark: a floating coin core, two counter-rotating dashed rings, and a glowing orbiting dot.
- **Ticker** — a slow scrolling strip with the rate, the two Premium prices, and the Cash Coin minimum (from Rp25,000).
- **Cash Coin calculator** — a large input that formats itself with thousand separators as the player types (1000 becomes 1,000), quick-amount chips (250,000 / 500,000 / 1,000,000 / 2,500,000), an amount meter scaled to 100,000,000 CC, and a price readout with three equal tiles — IDR, PHP, and USD all the same size. Three CSS coin discs float beside it.
- **Cash Coin Packages** — a simple vertical list, not a card grid (the 9-card grid overflowed: long IDR prices like Rp10,000,000 were cut off inside the narrow price tiles). Each row is one GameCP package (03)–(11), from 250,000 CC (Rp25,000, minimum) to 100,000,000 CC (Rp10,000,000), full-width so the prices never clip: coin amount on the left, IDR / PHP / USD on the right, wrapping instead of overflowing. Tapping a row fills the Cash Coin calculator above with that amount (rows reuse the calculator's quick-chip handler via `data-nvm-donate-coins`, and highlight with `.is-active` when they match). The row shows its GameCP package number so players can match it to the Topup dropdown.
- **Premium Service** — compact cards, 30 Days and 60 Days, with feature checklists, per-day cost, and prices in three equal tiles (IDR, PHP, USD same size). The 60-day card is the featured one: gold accents, a top badge strip, and a slow shine sweep. Hovering a card lifts it and lights its border.
- **Compact by design** — the hero, calculator, and cards use tight spacing so the page stays short even as items are added. The plan grid is `repeat(auto-fill, minmax(230px, 1fr))`: adding a new Premium card in the HTML automatically wraps it into the grid, no CSS change needed. All animation is kept: entrance stagger, ticker, orbit, shine, price ticks, and hover lift.
- **Motion** — staggered entrance, drifting scan beam, pulsing live dot, floating coins, and animated price ticks. All animation is disabled under `prefers-reduced-motion`, and the entrance hidden state is only applied by JS, so the page never depends on JS to appear.

## Prices — IDR is the only price you write

| # | Item | IDR (written in HTML) | PHP (auto) | USD (auto) |
|---|---|---|---|---|
| 1 | Cash Coin calculator (Rate 1:10) — minimum Rp25,000 = 250,000 Cash Coin | calculated from coin amount | calculated | calculated |
| 2 | (03) Cash Coin 250,000 | Rp25,000 | ₱100 | $2 |
| 3 | (04) Cash Coin 500,000 | Rp50,000 | ₱200 | $4 |
| 4 | (05) Cash Coin 1,000,000 | Rp100,000 | ₱400 | $7 |
| 5 | (06) Cash Coin 2,500,000 | Rp250,000 | ₱1,000 | $17 |
| 6 | (07) Cash Coin 5,000,000 | Rp500,000 | ₱2,000 | $34 |
| 7 | (08) Cash Coin 10,000,000 | Rp1,000,000 | ₱4,000 | $67 |
| 8 | (09) Cash Coin 25,000,000 | Rp2,500,000 | ₱10,000 | $167 |
| 9 | (10) Cash Coin 50,000,000 | Rp5,000,000 | ₱20,000 | $334 |
| 10 | (11) Cash Coin 100,000,000 | Rp10,000,000 | ₱40,000 | $667 |
| 11 | (01) Premium Service 30 Days | Rp50,000 | ₱200 | $4 |
| 12 | (02) Premium Service 60 Days | Rp100,000 | ₱400 | $7 |

The (01)–(11) numbers are the GameCP package numbers, in the same order as the Topup > Donation dropdown (Premium first, then Cash Coin ascending). The website shows them on the Cash Coin package cards so players can match a card to the dropdown entry.

Premium descriptions: 30 Days + Bonus PC Cafe +100% EXP Gain Rate, +4% Attack, 3% Defense; 60 Days + Bonus PC Cafe +100% EXP Gain Rate, +5% Attack, 4% Defense. Per-day cost is derived from the same IDR price (Rp1,667 / day for both plans).

## How the JS formula works

Rates are stored as `data-coin-per-idr`, `data-php-rate`, and `data-usd-rate` on the `#nvm-donatelist` section in `donatelist.html`:

- Cash Coin: **10 coins per Rp1** (Rate 1:10). IDR price = coins ÷ 10, rounded up.
- **$1 = Rp15,000**
- **₱1 = Rp250**

For every fixed plan, the HTML only carries `data-nvm-donate-idr="..."` on its price cell, e.g. `data-nvm-donate-idr="50000"`. `donatelist.js` fills the PHP and USD spans from that one number:

- PHP = IDR ÷ 250, rounded **up** to a whole peso.
- USD = IDR ÷ 15,000, rounded **up** to a whole dollar. No decimals, no comma: $0.67 becomes $1, $3.33 becomes $4, $6.67 becomes $7. Above $10 the same rule applies (whole dollars only).

To change a price, change only the IDR number in `donatelist.html` (and the matching `data-nvm-donate-idr` on the per-day span). To add a new plan, copy a Premium card, change its name/features and its `data-nvm-donate-idr`, and leave the PHP/USD spans empty — the JS fills them. Example: 100,000 Cash Coin = Rp10,000 = ₱40 = $1.

These are internal rates, not the market rate. On 17 Nov 2026 the market mid-rate was about $1 = Rp18,275 and ₱1 = Rp286, with a 30-day low of about $1 = Rp17,889 and ₱1 = Rp284. The internal rates sit about 18% (USD) and 13% (PHP) below market, and below the 30-day low, so the IDR amount actually received should still cover the IDR price after international transfer fees.

Typical haircut when receiving money from abroad: PayPal international receiving is about 4.4% + $0.30 plus a 3–4% FX conversion markup; Wise is about 0.5–1% plus a small fixed fee; bank wires add a flat $15–45. For small donations the total is usually 5–10%. The 13–18% rate buffer covers that, plus FX spread and rounding.

Change a rate by editing the `data-*` attributes in `donatelist.html`; the calculator and fixed plans use the same values.
