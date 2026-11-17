# RF NEVERMIND — Donate List

The files in this directory power the right-column Donate List page through CKEditor. They follow the `public/serverrate` format and layout, with the same CKEditor live-loader pattern as Server Rate, NPC List, and Drop List.

- `donatelist.html` — content markup and editable JSON data (currently empty).
- `donatelist.css` — scoped styles, using the same tokens as Server Rate.
- `donatelist.js` — search, category filter, package count, and safe rendering of the JSON data.
- `loader.html` — CKEditor bootstrap. Install its contents in CKEditor **once**; it automatically retrieves HTML, CSS and JS from GitHub.

For future content, layout or rendering changes, edit only `donatelist.html`, `donatelist.css` or `donatelist.js`. No need to paste the loader again. The loader only needs changing if the integration architecture itself changes.

The loader uses the latest GitHub commit to refresh assets and falls back to the main branch when GitHub API access fails.

## Adding verified donation packages

Replace the empty JSON array inside `<script type="application/json" id="nvm-donate-data">[]</script>` in `donatelist.html` with entries:

```json
[
  {
    "name": "Verified package name",
    "category": "Verified category",
    "price": "Verified price",
    "notes": "",
    "rewards": [
      "Verified reward"
    ]
  }
]
```

Use the exact package names, prices, and rewards from the server's verified donation records. Do not guess prices or rewards. This page intentionally starts empty rather than publishing fictional donation data.

Search matches package name, category, price, notes, and rewards. The category filter is generated from the published data. The loader safely renders text, preserves the search/filter selection during refresh, and falls back to the main branch if the GitHub API is unavailable.
