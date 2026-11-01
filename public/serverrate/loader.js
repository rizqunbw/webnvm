/* RF Nevermind Server Rate — load trusted GitHub content into the current post. */
(function () {
  "use strict";

  var BASE = "https://raw.githubusercontent.com/rizqunbw/webnvm/main/public/serverrate/";
  var ROOT_ID = "nvm-serverrate-loader";
  var CSS_ID = "nvm-serverrate-style";

  function getText(file) {
    return fetch(BASE + file + "?v=" + Date.now(), { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error(file + ": HTTP " + response.status);
        return response.text();
      });
  }

  function init() {
    var root = document.getElementById(ROOT_ID);
    if (!root || root.dataset.nvmLoaded === "true") return;
    root.dataset.nvmLoaded = "true";

    Promise.all([getText("serverrate.html"), getText("serverrate.css")])
      .then(function (files) {
        var style = document.getElementById(CSS_ID);
        if (!style) {
          style = document.createElement("style");
          style.id = CSS_ID;
          document.head.appendChild(style);
        }
        style.textContent = files[1];
        root.innerHTML = files[0];
      })
      .catch(function (error) {
        root.dataset.nvmLoaded = "false";
        root.textContent = "Server Rate failed to load: " + error.message;
        console.error("[Server Rate]", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
