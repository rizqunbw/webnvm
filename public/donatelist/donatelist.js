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
  var METER_MAX = 1000000;

  var input = root.querySelector("#nvm-donate-coin-amount");
  var chips = Array.prototype.slice.call(root.querySelectorAll("[data-nvm-donate-coins]"));
  var meterFill = root.querySelector("[data-nvm-donate-meter-fill]");
  var meterLabel = root.querySelector("[data-nvm-donate-meter-label]");
  var rafIds = [];

  function formatWhole(value) {
    // Whole numbers only, no decimals. Thousands use "," like the
    // reference table (Rp 50,000), never a decimal comma.
    return new Intl.NumberFormat("en-US").format(value);
  }

  function cancelAnims() {
    rafIds.forEach(function (id) { cancelAnimationFrame(id); });
    rafIds = [];
  }

  // Animated count between values so prices tick instead of jumping.
  function animateNumber(el, target) {
    if (!el) return;
    var from = Number(el.getAttribute("data-nvm-value") || 0) || 0;
    el.setAttribute("data-nvm-value", String(target));
    if (from === target) {
      el.textContent = formatWhole(target);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatWhole(target);
      return;
    }
    var start = null;
    var duration = 380;
    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatWhole(Math.round(from + (target - from) * eased));
      if (progress < 1) rafIds.push(requestAnimationFrame(step));
    }
    rafIds.push(requestAnimationFrame(step));
  }

  // Single source of truth: the IDR price.
  // PHP and USD are always derived from IDR, never written in the HTML.
  // Both are rounded UP to whole pesos / whole dollars, so the fee buffer
  // is paid by the buyer: $0.67 -> $1, $3.33 -> $4, $6.67 -> $7.
  function fillPrices(cell, idr, animate) {
    if (!cell) return;
    var idrEl = cell.querySelector("[data-nvm-donate-price-idr]");
    var phpEl = cell.querySelector("[data-nvm-donate-price-php]");
    var usdEl = cell.querySelector("[data-nvm-donate-price-usd]");
    var php = idr > 0 ? Math.ceil(idr / PHP_RATE) : 0;
    var usd = idr > 0 ? Math.ceil(idr / USD_RATE) : 0;
    if (animate) {
      animateNumber(idrEl, idr);
      animateNumber(phpEl, php);
      animateNumber(usdEl, usd);
    } else {
      if (idrEl) { idrEl.setAttribute("data-nvm-value", String(idr)); idrEl.textContent = formatWhole(idr); }
      if (phpEl) { phpEl.setAttribute("data-nvm-value", String(php)); phpEl.textContent = formatWhole(php); }
      if (usdEl) { usdEl.setAttribute("data-nvm-value", String(usd)); usdEl.textContent = formatWhole(usd); }
    }
  }

  function renderFixedPrices() {
    // Every fixed plan only carries data-nvm-donate-idr="...".
    // To change a price, change that one IDR number in donatelist.html.
    var cells = root.querySelectorAll("[data-nvm-donate-price-cell][data-nvm-donate-idr]");
    Array.prototype.forEach.call(cells, function (cell) {
      fillPrices(cell, Number(cell.dataset.nvmDonateIdr) || 0, true);
    });
    // Per-day cost, derived from the same IDR price: ceil(IDR / days).
    var perDay = root.querySelectorAll("[data-nvm-donate-per-day]");
    Array.prototype.forEach.call(perDay, function (el) {
      var days = Number(el.dataset.nvmDonateDays) || 0;
      var idr = Number(el.dataset.nvmDonateIdr) || 0;
      if (days > 0 && idr > 0) el.textContent = "Rp" + formatWhole(Math.ceil(idr / days));
    });
  }

  function coinAmount() {
    return input ? Number(input.value.replace(/\D/g, "") || 0) : 0;
  }

  function syncChips(coins) {
    chips.forEach(function (chip) {
      chip.classList.toggle("is-active", Number(chip.dataset.nvmDonateCoins) === coins && coins > 0);
    });
  }

  function syncMeter(coins) {
    if (meterFill) meterFill.style.width = Math.min(coins / METER_MAX * 100, 100) + "%";
    if (meterLabel) meterLabel.textContent = formatWhole(coins);
  }

  // Live thousand separators while typing: 1000 -> 1,000, 10000 -> 10,000.
  // The input is type="text" (a number input cannot hold commas);
  // only digits are kept, the rest is stripped as the player types.
  function formatCoinInput() {
    if (!input) return;
    var caret = input.selectionStart || 0;
    var digitsBeforeCaret = (input.value.slice(0, caret).match(/\d/g) || []).length;
    var digits = input.value.replace(/\D/g, "");
    var formatted = digits ? formatWhole(Number(digits)) : "";
    if (formatted === input.value) return;
    input.value = formatted;
    var pos = 0;
    var counted = 0;
    while (pos < formatted.length && counted < digitsBeforeCaret) {
      if (/\d/.test(formatted.charAt(pos))) counted++;
      pos++;
    }
    try { input.setSelectionRange(pos, pos); } catch (e) { /* caret restore is best-effort */ }
  }

  function onCoinInput() {
    formatCoinInput();
    updateCoinPrices();
  }

  function updateCoinPrices() {
    var cell = input ? input.closest(".nvm-donate__coin").querySelector("[data-nvm-donate-price-cell]") : null;
    if (!cell) return;
    var coins = coinAmount();
    // Rate 1:10 — 10 Cash Coin per Rp1, so Rp10,000 = 100,000 Cash Coin.
    var idr = isFinite(coins) && coins > 0 ? Math.ceil(coins / COIN_PER_IDR) : 0;
    fillPrices(cell, idr, true);
    syncChips(coins);
    syncMeter(coins);
  }

  function onChipClick(event) {
    var coins = Number(event.currentTarget.dataset.nvmDonateCoins) || 0;
    if (!input) return;
    input.value = formatWhole(coins);
    updateCoinPrices();
    input.focus();
  }

  // Entrance stagger. The hidden state only exists when JS adds
  // .nvm-donate--animated, so content never depends on JS to appear.
  function reveal() {
    root.classList.add("nvm-donate--animated");
    var items = root.querySelectorAll(".nvm-donate__reveal");
    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = (i * 110) + "ms";
      requestAnimationFrame(function () { el.classList.add("is-in"); });
    });
  }

  window.nvmDonateDestroy = function () {
    cancelAnims();
    if (input) input.removeEventListener("input", onCoinInput);
    chips.forEach(function (chip) {
      chip.removeEventListener("click", onChipClick);
    });
  };

  if (input) input.addEventListener("input", onCoinInput);
  chips.forEach(function (chip) {
    chip.addEventListener("click", onChipClick);
  });
  reveal();
  renderFixedPrices();
  updateCoinPrices();
})();
