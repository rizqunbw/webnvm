# RF Nevermind — Server Rate

This directory contains the **right-column content only**, with no site header, sidebar, or footer.

- `serverrate.html` — rewritten semantic HTML fragment based on the supplied Server Rate text.
- `serverrate.css` — rewritten, scoped responsive CSS. Uses the host site's font through the existing loader.
- `loader.html` — **existing working CKEditor inline loader; unchanged**. Copy its source into CKEditor once. It checks HTML and CSS for updates automatically.

The previous `serverrate.js` was unused and has been removed. The page requires no separate JS beyond the working loader.

The source text contains Server Rates, Regen Cash Coin, Vote System, and Donation. It does not include a New Character Reward section or image; neither is included here. Existing functional Vote, GameCP donation, and Discord destinations have been retained from the previous page implementation.
