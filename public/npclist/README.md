# RF Nevermind — NPC List

CKEditor right-column content only; follows `public/serverrate` layout and loader pattern. No site header, sidebar, footer, new font, or extra libraries.

- `npclist.html` — NPC directory markup and editable JSON data.
- `npclist.css` — scoped styling matching Server Rate.
- `loader.html` — copy its full contents once into the NPC List CKEditor page. Fetches HTML/CSS from GitHub and checks for updates automatically.

## Adding verified NPCs

Replace the empty JSON array inside `<script type="application/json" id="nvm-npc-data">[]</script>` in `npclist.html` with entries:

```json
[
  {
    "name": "Verified NPC name",
    "race": "Accretia",
    "location": "Verified map / coordinates",
    "service": "Verified function"
  }
]
```

Supported races: Accretia, Bellato, Cora, Neutral. Search matches name, race, location and service. This page intentionally ships with **no fictional NPC data**; add actual server records once known.

The loader is designed for a single CKEditor instance. It preserves user input during refreshes, safely renders data via text nodes, uses the host font, and falls back to branch URLs if the GitHub API is unavailable. The 1-second polling interval matches the existing Server Rate implementation; GitHub API rate limits may require increasing it later.
