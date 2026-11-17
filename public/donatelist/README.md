# RF NEVERMIND — Donate List

The files in this directory power the right-column Donate List page through CKEditor. They follow the `public/serverrate` format and layout, with the same CKEditor live-loader pattern as Server Rate, NPC List, and Drop List.

- `donatelist.html` — table markup and prices. Cash Coin is a live calculator; Premium prices are fixed rows.
- `donatelist.css` — scoped styles matching the reference table (dark table, gold item names, three-currency prices).
- `donatelist.js` — Cash Coin price calculator and image preview. No timer.
- `loader.html` — CKEditor bootstrap. Install its contents in CKEditor **once**; it automatically retrieves HTML, CSS and JS from GitHub.

For future content, layout or price changes, edit only `donatelist.html`, `donatelist.css` or `donatelist.js`. No need to paste the loader again. The loader only needs changing if the integration architecture itself changes.

The loader uses the latest GitHub commit to refresh assets and falls back to the main branch when GitHub API access fails.

## Prices

| # | Item | IDR | PHP | USD |
|---|---|---|---|---|
| 1 | Cash Coin (Rate 1:10) — Rp10,000 = 100,000 Cash Coin | calculated from coin amount | calculated | calculated |
| 2 | Premium Service 30 Days | Rp50,000 | ₱200 | $3.50 |
| 3 | Premium Service 60 Days | Rp87,500 | ₱350 | $6.00 |

Premium descriptions are copied from the reference table: 30 Days + Bonus PC Cafe +100% EXP Gain Rate, +4% Attack, 3% Defense; 60 Days + Bonus PC Cafe +100% EXP Gain Rate, +5% Attack, 4% Defense.

## Exchange rates (internal, deliberately low)

Rates are stored as `data-coin-per-idr`, `data-php-rate`, and `data-usd-rate` on the `#nvm-donatelist` section in `donatelist.html`:

- Cash Coin: **10 coins per Rp1** (Rate 1:10). IDR price = coins ÷ 10, rounded up.
- **$1 = Rp15,000**
- **₱1 = Rp250**

These are internal rates, not the market rate. On 17 Nov 2026 the market mid-rate was about $1 = Rp18,275 and ₱1 = Rp286, with a 30-day low of about $1 = Rp17,889 and ₱1 = Rp284. The internal rates sit about 18% (USD) and 13% (PHP) below market, and below the 30-day low, so the IDR amount actually received should still cover the IDR price after international transfer fees.

Typical haircut when receiving money from abroad: PayPal international receiving is about 4.4% + $0.30 plus a 3–4% FX conversion markup; Wise is about 0.5–1% plus a small fixed fee; bank wires add a flat $15–45. For small donations the total is usually 5–10%. The 13–18% rate buffer covers that, plus FX spread and rounding.

Foreign prices are always rounded **up** (PHP to the next whole peso, USD to the next cent; Premium USD rounded up to the next $0.50), so the fee buffer is paid by the buyer, never by the seller. Example: 100,000 Cash Coin = Rp10,000 = ₱40 = $0.67.

Change a rate by editing the `data-*` attributes in `donatelist.html`; the calculator and the note under the table use the same values. Change a Premium price by editing its row in `donatelist.html`.

## Images

The repo has no logo/image asset for this page, so the IMAGE column uses a styled icon tile (coins for Cash Coin, crown for Premium) with a click-to-preview lightbox. To use a real logo image, add the file to the repo and replace the `<button class="nvm-donate__thumb">` tile in `donatelist.html` with an `<img>`.
