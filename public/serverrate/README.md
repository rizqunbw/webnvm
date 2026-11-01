# RF Nevermind Server Rate

Right-column content fragment for RF Nevermind. No navbar, sidebar, or footer.

| File | Purpose |
| --- | --- |
| `serverrate.html` | Server Rate content |
| `serverrate.css` | Scoped styling |
| `serverrate.js` | Reserved for future interactions; not required by the loader |
| `loader.html` | **Working inline CKEditor Source snippet** |

## CKEditor

Open [loader.html](./loader.html), copy its entire contents and paste them into **CKEditor → Source**. Save and check the public test page. The inline script fetches the HTML and CSS from GitHub and injects the stylesheet into the document.

Do **not** use `<script src="https://raw.githubusercontent.com/.../loader.js"></script>`: the earlier external loader failed in this website. The unsuccessful `loader.js` and `embed.html` were removed.

Use a test post before changing the live Server Rate post, and keep a backup of existing post content.
