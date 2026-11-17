(function () {
  "use strict";

  if (typeof window.nvmDonateDestroy === "function") {
    window.nvmDonateDestroy();
  }

  var root = document.getElementById("nvm-donatelist");
  if (!root) return;

  // Internal rates, set on the section in donatelist.html.
  // $1 = Rp15,000 and ₱1 = Rp250: deliberately below the market rate
  // (about $1 = Rp18,275 and ₱1 = Rp286 on 17 Nov 2026) so the amount
  // received in IDR still covers the IDR price after international
  // transfer fees and FX spreads.
  var COIN_PER_IDR = Number(root.dataset.coinPerIdr) || 10;
  var PHP_RATE = Number(root.dataset.phpRate) || 250;
  var USD_RATE = Number(root.dataset.usdRate) || 15000;

  var input = root.querySelector("#nvm-donate-coin-amount");
  var idrEl = root.querySelector("[data-nvm-donate-price-idr]");
  var phpEl = root.querySelector("[data-nvm-donate-price-php]");
  var usdEl = root.querySelector("[data-nvm-donate-price-usd]");
  var thumbs = Array.prototype.slice.call(root.querySelectorAll("[data-nvm-donate-preview]"));
  var lightbox = null;

  function formatIdr(value) {
    return new Intl.NumberFormat("id-ID").format(value);
  }

  function updatePrices() {
    if (!input || !idrEl || !phpEl || !usdEl) return;
    var coins = Number(input.value);
    if (!isFinite(coins) || coins <= 0) {
      idrEl.textContent = "0";
      phpEl.textContent = "0";
      usdEl.textContent = "0";
      return;
    }
    // Rate 1:10 — 10 Cash Coin per Rp1, so Rp10,000 = 100,000 Cash Coin.
    var idr = Math.ceil(coins / COIN_PER_IDR);
    // Round foreign prices UP: the buyer covers the fee buffer, never the seller.
    var php = Math.ceil(idr / PHP_RATE);
    var usd = Math.ceil((idr / USD_RATE) * 100) / 100;
    idrEl.textContent = formatIdr(idr);
    phpEl.textContent = formatIdr(php);
    usdEl.textContent = usd.toFixed(2);
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.remove();
      lightbox = null;
    }
    document.removeEventListener("keydown", onKeydown);
  }

  function onKeydown(event) {
    if (event.key === "Escape") closeLightbox();
  }

  function openLightbox(button) {
    closeLightbox();
    var name = button.getAttribute("data-nvm-donate-preview") || "Item";
    var icon = button.getAttribute("data-nvm-donate-icon") || "fa-coins";
    lightbox = document.createElement("div");
    lightbox.className = "nvm-donate__lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Preview " + name);
    var tile = document.createElement("div");
    tile.className = "nvm-donate__thumb";
    var iconEl = document.createElement("i");
    iconEl.className = "fa-solid " + icon;
    iconEl.setAttribute("aria-hidden", "true");
    tile.appendChild(iconEl);
    var title = document.createElement("span");
    title.textContent = name;
    var hint = document.createElement("small");
    hint.textContent = "Click anywhere to close";
    lightbox.append(tile, title, hint);
    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", onKeydown);
    document.body.appendChild(lightbox);
  }

  function onThumbClick(event) {
    openLightbox(event.currentTarget);
  }

  window.nvmDonateDestroy = function () {
    if (input) input.removeEventListener("input", updatePrices);
    thumbs.forEach(function (button) {
      button.removeEventListener("click", onThumbClick);
    });
    closeLightbox();
  };

  if (input) input.addEventListener("input", updatePrices);
  thumbs.forEach(function (button) {
    button.addEventListener("click", onThumbClick);
  });
  updatePrices();
})();
