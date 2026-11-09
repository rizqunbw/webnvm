# RF NEVERMIND — Server Rate

The files in this directory power the right-column Server Rate page through CKEditor.

- `serverrate.html` — content, including Chip War schedule markup.
- `serverrate.css` — scoped styles, including the countdown.
- `serverrate.js` — Chip War countdown, Jakarta server clock, and browser-local time conversion.
- `loader.html` — CKEditor bootstrap. Install its contents in CKEditor **once**; it automatically retrieves HTML, CSS and JS from GitHub.

For future content, layout or countdown changes, edit only `serverrate.html`, `serverrate.css` or `serverrate.js`. No need to paste the loader again. The loader only needs changing if the integration architecture itself changes.

War times: 05:00, 13:00, 21:00 GMT+7 (Asia/Jakarta). Local time is derived from the visitor's device/browser time zone. Countdown accuracy depends on the device clock.

The loader uses the latest GitHub commit to refresh assets and falls back to the main branch when GitHub API access fails.
