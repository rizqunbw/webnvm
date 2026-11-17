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
  var thumbs = Array.prototype.slice.call(root.querySelectorAll("[data-nvm-donate-preview]"));
  var lightbox = null;

  function formatWhole(value) {
    // Whole numbers only, no decimals. Thousands use "," like the
    // reference table (Rp 50,000), never a decimal comma.
    return new Intl.NumberFormat("en-US").format(value);
  }

  // Single source of truth: the IDR price.
  // PHP and USD are always derived from IDR, never written in the HTML.
  // Both are rounded UP to whole pesos / whole dollars, so the fee buffer
  // is paid by the buyer: $0.67 -> $1, $3.33 -> $4, $6.67 -> $7.
  function fillPrices(cell, idr) {
    if (!cell) return;
    var idrEl = cell.querySelector("[data-nvm-donate-price-idr]");
    var phpEl = cell.querySelector("[data-nvm-donate-price-php]");
    var usdEl = cell.querySelector("[data-nvm-donate-price-usd]");
    if (idrEl) idrEl.textContent = formatWhole(idr);
    if (phpEl) phpEl.textContent = idr > 0 ? formatWhole(Math.ceil(idr / PHP_RATE)) : "0";
    if (usdEl) usdEl.textContent = idr > 0 ? formatWhole(Math.ceil(idr / USD_RATE)) : "0";
  }

  function renderFixedPrices() {
    // Every fixed row only carries data-nvm-donate-idr="...".
    // To change a price, change that one IDR number in donatelist.html.
    var cells = root.querySelectorAll("[data-nvm-donate-price-cell][data-nvm-donate-idr]");
    Array.prototype.forEach.call(cells, function (cell) {
      fillPrices(cell, Number(cell.dataset.nvmDonateIdr) || 0);
    });
  }

  function updateCoinPrices() {
    var cell = input ? input.closest("tr").querySelector("[data-nvm-donate-price-cell]") : null;
    if (!cell) return;
    var coins = input ? Number(input.value) : 0;
    // Rate 1:10 — 10 Cash Coin per Rp1, so Rp10,000 = 100,000 Cash Coin.
    var idr = isFinite(coins) && coins > 0 ? Math.ceil(coins / COIN_PER_IDR) : 0;
    fillPrices(cell, idr);
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
    tile.className = "nvm-donate__thumb" + (button.classList.contains("nvm-donate__thumb--premium") ? " nvm-donate__thumb--premium" : "");
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
    if (input) input.removeEventListener("input", updateCoinPrices);
    thumbs.forEach(function (button) {
      button.removeEventListener("click", onThumbClick);
    });
    closeLightbox();
  };

  if (input) input.addEventListener("input", updateCoinPrices);
  thumbs.forEach(function (button) {
    button.addEventListener("click", onThumbClick);
  });
  renderFixedPrices();
  updateCoinPrices();
})();
