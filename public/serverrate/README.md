# RF Nevermind Server Rate

This folder contains only the content displayed in the right column of the RF Nevermind site.

- `serverrate.html`: HTML fragment (no navbar, sidebar, footer)
- `serverrate.css`: scoped CSS for the fragment
- `serverrate.js`: reserved for future interactions
- `loader.js`: loads the fragment and stylesheet from this folder

## CKEditor source snippet

Paste this into the **Source** tab of the test post:

```html
<div id="nvm-serverrate-loader">Loading Server Rate...</div>
<script src="https://raw.githubusercontent.com/rizqunbw/webnvm/main/public/serverrate/loader.js"></script>
```

**Important:** GitHub raw URLs may be refused for JavaScript execution due to their response content-type and browser security policies. The safer deployment is to serve `loader.js` from an approved JavaScript host on your own domain (e.g. `/assets/js/loader.js`) while leaving HTML/CSS on GitHub. If CKEditor strips script tags, add the loader script in the site's trusted template; CKEditor alone cannot override this restriction.

Only use scripts and HTML from a GitHub repository you control. Test on the temporary post before replacing the live Server Rate post.
