# RF NEVERMIND — Donate List

The files in this directory power the right-column Donate List page through CKEditor. They follow the `public/serverrate` typography, colors, and CKEditor live-loader pattern as Server Rate, NPC List, and Drop List — but the layout here is a full redesign, built with CSS only. **No images:** every visual is CSS (grid backdrop, glow, orbit rings, coin discs, shine sweep) plus Font Awesome icons.

- `donatelist.html` — hero, ticker, Cash Coin calculator, Premium plans, and NVM Patron Coupons. Only the **IDR price** is written here.
- `donatelist.css` — scoped styles using the Server Rate tokens (`--nvm-bg #101b28`, `--nvm-line #2a3a4c`, `--nvm-text #eaf2f8`, `--nvm-muted #b2c0ce`, `--nvm-cyan #69e4f2`, inner panel `#152434`, gold `#f2c56b` for Premium only). Base font 15px / 1.5, section head h3 18px weight 600, radius 6px. Clean by design: no ticker, no particles, no scan beam, no entrance stagger, no hover lift, no animated price ticks — the only motion left is the small live-dot pulse and the calculator meter.
- `donatelist.js` — derives PHP and USD prices from the IDR price, Cash Coin calculator with quick chips and an amount meter, and per-day cost. Prices are set instantly, no count-up animation. No timer.
- `loader.html` — CKEditor bootstrap. Install its contents in CKEditor **once**; it automatically retrieves HTML, CSS and JS from GitHub. Unchanged by this redesign.

For future content, layout or price changes, edit only `donatelist.html`, `donatelist.css` or `donatelist.js`. No need to paste the loader again. The loader only needs changing if the integration architecture itself changes.

The loader uses the latest GitHub commit to refresh assets and falls back to the main branch when GitHub API access fails.

## What the player sees

- **Hero** — big title, live pulse dot, three stat tiles (1:10 Cash Coin rate, 44 packages, IDR · PHP · USD), and a static orbit mark: a coin core with two dashed rings (no spin, no float).
- **Cash Coin calculator** — a large input that formats itself with thousand separators as the player types (1000 becomes 1,000), quick-amount chips for all 9 package amounts (250,000 up to 100,000,000), an amount meter scaled to 100,000,000 CC, and a price readout with three equal tiles — IDR, PHP, and USD all the same size.
- **Topup Now** — a panel right after the hero with a bilingual note and two buttons: 🇮🇩 Topup Now (Indonesia) links to the GameCP donation page (`gcp.rfnvm.com/index.php?do=user_donations`, donations 24 hours via GameCP), Topup Now (International) links to the owner's Discord profile (`discordapp.com/users/1271431821690802221`, PM for international donations).
- **Premium Service first, no cards** — Premium is the same simple full-width list as Cash Coin, not cards: 2 rows, each with the plan name and its perks (Bonus PC Cafe, +100% EXP Gain Rate, +4%/+5% Attack, 3%/4% Defense, Rp1,667 / day) on the left and the IDR / PHP / USD prices on the right in fixed-width aligned columns, at a larger 15px so the prices read bigger. The 60 Days row keeps a small LONGEST DURATION tag. Dead plan-card CSS was removed. The order on the page is Topup Now → Premium Service → Cash Coin. Every package row ends at the far right with two small icon buttons — 🇮🇩 Beli Sekarang (ID) to the GameCP donation page and a globe icon for Buy Now (International) to the owner's Discord — so a player can buy straight from the row they are looking at. Prices are shown as tight label + amount units (IDR Rp25,000), the amount in one white bold color, right-aligned.
- **Cash Coin Packages** — a simple vertical list, not a card grid (the 9-card grid overflowed: long IDR prices like Rp10,000,000 were cut off inside the narrow price tiles). Each row is one GameCP package, from 250,000 CC (Rp25,000, minimum) to 100,000,000 CC (Rp10,000,000), full-width so the prices never clip: coin amount on the left, IDR / PHP / USD on the right in fixed-width aligned columns (118px / 84px / 64px, narrower on small screens) so every row's prices line up. No (01)–(11) numbers are shown on the website — those only order the GameCP Topup dropdown. Tapping a row fills the Cash Coin calculator above with that amount (rows reuse the calculator's quick-chip handler via `data-nvm-donate-coins`, and highlight with `.is-active` when they match).
- **NVM Patron Coupons** — three groups (Weapon, Armor, Shield), 11 rows each, in the same order as the GameCP Topup dropdown (Lv70 first, routes D > C > B > Ore). Each row is a `<details>` that opens to a "You will get" list: 1x Normal item of the player's choice (weapon family / armor slot + class / shield by race), Flawless Metallic Crystal, Mega Energy Core, ore(s), 1x Recipe Piece on B/C/D routes (or a second ore on Ore routes), and Money Potion 100,000,000 as the combine-fee refund. Quantities come from the combine TSVs: Weapon Lv65 150 Flawless / 14 MEC / 150 ore / 25 Money Potion, Lv67 200 / 21 / 200 / 30, Lv70 250 / 35 / 250 / 35; Armor and Shield are half that (Lv65 75 / 7 / 150 / 13, Lv67 100 / 11 / 200 / 15, Lv70 125 / 18 / 250 / 18). Ore depends on the choice: weapon family (Melee Newtalian, Staff/Grenade Crotalian, Bow/Throwing Knife Setalian, Gatling Motalian, Launcher Tutalian), armor slot (Helmet Motalian + Niotalrous, Upper Teitalrous + Tutalian, Lower Setalian + Dutalrous, Gloves Crotalian + Baytalrous, Shoes Newtalian + Protalrous), shield is fixed (Teitalrous + Tutalian). No combine chance is shown — will-get only.
- **Premium Service** — compact cards, 30 Days and 60 Days, with feature checklists, per-day cost, and prices in three equal tiles (IDR, PHP, USD same size). The 60-day card is the featured one: gold accents, a top badge strip, and a slow shine sweep. Hovering a card lifts it and lights its border.
- **Compact by design** — the hero, calculator, and cards use tight spacing so the page stays short even as items are added. The plan grid is `repeat(auto-fill, minmax(230px, 1fr))`: adding a new Premium card in the HTML automatically wraps it into the grid, no CSS change needed. All animation is kept: entrance stagger, ticker, orbit, shine, price ticks, and hover lift.
- **Motion** — almost none, on purpose: the only motion is the small live-dot pulse and the calculator meter fill. No entrance stagger, no ticker, no scan beam, no floating coins, no hover lift, and prices set instantly instead of ticking up. The page never depends on JS to appear.

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
| 13 | (12) Weapon Lv. 70 (D) | Rp150,000 | ₱600 | $10 |
| 14 | (13) Weapon Lv. 70 (C) | Rp125,000 | ₱500 | $9 |
| 15 | (14) Weapon Lv. 70 (B) | Rp105,000 | ₱420 | $7 |
| 16 | (15) Weapon Lv. 67 (D) | Rp100,000 | ₱400 | $7 |
| 17 | (16) Weapon Lv. 67 (C) | Rp75,000 | ₱300 | $5 |
| 18 | (17) Weapon Lv. 67 (B) | Rp70,000 | ₱280 | $5 |
| 19 | (18) Weapon Lv. 65 (D) | Rp55,000 | ₱220 | $4 |
| 20 | (19) Weapon Lv. 70 (Ore) | Rp50,000 | ₱200 | $4 |
| 21 | (20) Weapon Lv. 65 (B) | Rp40,000 | ₱160 | $3 |
| 22 | (21) Weapon Lv. 67 (Ore) | Rp35,000 | ₱140 | $3 |
| 23 | (22) Weapon Lv. 65 (Ore) | Rp25,000 | ₱100 | $2 |
| 24 | (23) Armor Lv. 70 (D) | Rp75,000 | ₱300 | $5 |
| 25 | (24) Armor Lv. 67 (D) | Rp65,000 | ₱260 | $5 |
| 26 | (25) Armor Lv. 70 (C) | Rp55,000 | ₱220 | $4 |
| 27 | (26) Armor Lv. 65 (D) | Rp50,000 | ₱200 | $4 |
| 28 | (27) Armor Lv. 70 (B) | Rp45,000 | ₱180 | $3 |
| 29 | (28) Armor Lv. 67 (C) | Rp40,000 | ₱160 | $3 |
| 30 | (29) Armor Lv. 67 (B) | Rp35,000 | ₱140 | $3 |
| 31 | (30) Armor Lv. 70 (Ore) | Rp30,000 | ₱120 | $2 |
| 32 | (31) Armor Lv. 65 (B) | Rp25,000 | ₱100 | $2 |
| 33 | (32) Armor Lv. 67 (Ore) | Rp20,000 | ₱80 | $2 |
| 34 | (33) Armor Lv. 65 (Ore) | Rp15,000 | ₱60 | $1 |
| 35 | (34) Shield Lv. 70 (D) | Rp75,000 | ₱300 | $5 |
| 36 | (35) Shield Lv. 67 (D) | Rp65,000 | ₱260 | $5 |
| 37 | (36) Shield Lv. 70 (C) | Rp55,000 | ₱220 | $4 |
| 38 | (37) Shield Lv. 65 (D) | Rp50,000 | ₱200 | $4 |
| 39 | (38) Shield Lv. 70 (B) | Rp45,000 | ₱180 | $3 |
| 40 | (39) Shield Lv. 67 (C) | Rp40,000 | ₱160 | $3 |
| 41 | (40) Shield Lv. 67 (B) | Rp35,000 | ₱140 | $3 |
| 42 | (41) Shield Lv. 70 (Ore) | Rp30,000 | ₱120 | $2 |
| 43 | (42) Shield Lv. 65 (B) | Rp25,000 | ₱100 | $2 |
| 44 | (43) Shield Lv. 67 (Ore) | Rp20,000 | ₱80 | $2 |
| 45 | (44) Shield Lv. 65 (Ore) | Rp15,000 | ₱60 | $1 |

The (01)–(11) numbers are the GameCP package numbers, in the same order as the Topup > Donation dropdown (Premium first, then Cash Coin ascending). The website does not show the numbers — those only order the GameCP Topup dropdown.

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
