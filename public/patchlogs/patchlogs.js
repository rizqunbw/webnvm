(function () {
  "use strict";

  if (typeof window.nvmPatchDestroy === "function") {
    window.nvmPatchDestroy();
  }

  var root = document.getElementById("nvm-patchlogs");
  if (!root) return;

  // Entrance stagger. The hidden state only exists when JS adds
  // .nvm-patch--animated, so content never depends on JS to appear.
  function reveal() {
    root.classList.add("nvm-patch--animated");
    var items = root.querySelectorAll(".nvm-patch__reveal");
    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = (i * 110) + "ms";
      requestAnimationFrame(function () { el.classList.add("is-in"); });
    });
  }

  window.nvmPatchDestroy = function () {
    var items = root.querySelectorAll(".nvm-patch__reveal");
    Array.prototype.forEach.call(items, function (el) {
      el.style.transitionDelay = "";
      el.classList.remove("is-in");
    });
    root.classList.remove("nvm-patch--animated");
  };

  reveal();
})();
