# RF NEVERMIND — Drop List

CKEditor right-column content only. Follows the existing `public/serverrate` and `public/npclist` layout, styling, and live-loader pattern. No site header, sidebar, footer, new font, or extra libraries.

## Files

- `droplist.html` — Drop directory markup and editable JSON data.
- `droplist.css` — Scoped styling matching the Server Rate / NPC List pages.
- `loader.html` — Copy the full contents once into the Drop List CKEditor page. It retrieves the latest HTML and CSS from GitHub automatically.

## Adding verified drop data

Edit the JSON array inside `<script type="application/json" id="nvm-drop-data">[]</script>` in `droplist.html`.

Example structure:

```json
[
  {
    "monster": "Verified monster name",
    "race": "Neutral",
    "map": "Verified map name",
    "level": "65",
    "drops": [
      {
        "item": "Verified item name",
        "category": "Weapon",
        "rate": "Verified rate",
        "notes": ""
      }
    ]
  }
]
```

Supported race values: Accretia, Bellato, Cora, Neutral. Suggested categories: Weapon, Armor, Shield, Accessory, Potion, Upgrade, Material, Currency, Other.

Use the exact drop rates and monster/map names from the server database or verified in-game tests. Do not guess rates. The directory intentionally starts empty rather than publishing fictional drops.

Search matches monster, item, map, race, category, and notes. Race, map, and item category filters are generated from the published data. The loader safely renders text, preserves the search/filter selection during refresh, and falls back to the main branch if the GitHub API is unavailable.
