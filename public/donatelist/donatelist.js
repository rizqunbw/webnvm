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
  // transfer fees and FX spreads. The USD divisor is 15,000 (owner
  // decision 2026-11-19, back from 5,000). Because 15,000 collapses
  // neighbouring IDR prices into the same whole-dollar amount, the
  // USD price is then bumped up within each tier list so no two rows
  // in one section share the same $ price — see renderFixedPrices.
  var COIN_PER_IDR = Number(root.dataset.coinPerIdr) || 10;
  var PHP_RATE = Number(root.dataset.phpRate) || 250;
  var USD_RATE = Number(root.dataset.usdRate) || 15000;
  var METER_MAX = 100000000;

  var input = root.querySelector("#nvm-donate-coin-amount");
  var chips = Array.prototype.slice.call(root.querySelectorAll("[data-nvm-donate-coins]"));
  var meterFill = root.querySelector("[data-nvm-donate-meter-fill]");
  var meterLabel = root.querySelector("[data-nvm-donate-meter-label]");

  function formatWhole(value) {
    // Whole numbers only, no decimals. Thousands use "," like the
    // reference table (Rp 50,000), never a decimal comma.
    return new Intl.NumberFormat("en-US").format(value);
  }

  // Single source of truth: the IDR price.
  // PHP and USD are always derived from IDR, never written in the HTML.
  // Both are rounded UP to whole pesos / whole dollars, so the fee buffer
  // is paid by the buyer: $0.67 -> $1, $3.33 -> $4, $6.67 -> $7.
  // usdOverride (optional) replaces the derived USD value — used by
  // renderFixedPrices to bump a row's $ price up so no two rows in one
  // section share the same whole-dollar amount.
  function fillPrices(cell, idr, usdOverride) {
    if (!cell) return;
    var idrEl = cell.querySelector("[data-nvm-donate-price-idr]");
    var phpEl = cell.querySelector("[data-nvm-donate-price-php]");
    var usdEl = cell.querySelector("[data-nvm-donate-price-usd]");
    var php = idr > 0 ? Math.ceil(idr / PHP_RATE) : 0;
    var usd = typeof usdOverride === "number" ? usdOverride : (idr > 0 ? Math.ceil(idr / USD_RATE) : 0);
    if (idrEl) { idrEl.setAttribute("data-nvm-value", String(idr)); idrEl.textContent = formatWhole(idr); }
    if (phpEl) { phpEl.setAttribute("data-nvm-value", String(php)); phpEl.textContent = formatWhole(php); }
    if (usdEl) { usdEl.setAttribute("data-nvm-value", String(usd)); usdEl.textContent = formatWhole(usd); }
  }

  function renderFixedPrices() {
    // Every fixed plan only carries data-nvm-donate-idr="...".
    // To change a price, change that one IDR number in donatelist.html.
    // USD is derived as ceil(IDR / USD_RATE), then bumped up within
    // each tier list (Premium, Cash Coin, Weapon, Armor, Shield) so no
    // two rows in one section share the same whole-dollar price: rows
    // are sorted cheapest-first and each row's $ price is raised to at
    // least $1 above the previous row's. That way a player can always
    // see that a higher-tier item costs more dollars than the one
    // below it. PHP is NOT bumped — only USD gets the no-duplicates
    // treatment, per the owner's rule (2026-11-19).
    var lists = root.querySelectorAll(".nvm-donate__tiers");
    Array.prototype.forEach.call(lists, function (list) {
      var cells = list.querySelectorAll("[data-nvm-donate-price-cell][data-nvm-donate-idr]");
      var rows = Array.prototype.map.call(cells, function (cell) {
        var idr = Number(cell.dataset.nvmDonateIdr) || 0;
        return { cell: cell, idr: idr, usd: idr > 0 ? Math.ceil(idr / USD_RATE) : 0 };
      });
      rows.sort(function (a, b) { return a.idr - b.idr; });
      var prevUsd = 0;
      rows.forEach(function (row) {
        if (row.usd <= prevUsd) row.usd = prevUsd + 1;
        prevUsd = row.usd;
      });
      rows.forEach(function (row) {
        fillPrices(row.cell, row.idr, row.usd);
      });
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
    fillPrices(cell, idr);
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

  // Package rows are divs now (links cannot live inside a <button>),
  // so keyboard users get the same fill via Enter / Space.
  function onChipKey(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  window.nvmDonateDestroy = function () {
    if (input) input.removeEventListener("input", onCoinInput);
    chips.forEach(function (chip) {
      chip.removeEventListener("click", onChipClick);
      chip.removeEventListener("keydown", onChipKey);
    });
  };

  if (input) input.addEventListener("input", onCoinInput);
  chips.forEach(function (chip) {
    chip.addEventListener("click", onChipClick);
    chip.addEventListener("keydown", onChipKey);
  });
  // Section dropdowns behave like an accordion: opening one closes the others.
  var groups = root.querySelectorAll(".nvm-donate__group");
  Array.prototype.forEach.call(groups, function (group) {
    group.addEventListener("toggle", function () {
      if (!group.open) return;
      Array.prototype.forEach.call(groups, function (other) {
        if (other !== group && other.open) other.open = false;
      });
    });
  });
  // Clicking a buy link must not also fill the calculator.
  Array.prototype.forEach.call(root.querySelectorAll(".nvm-donate__row-buy-btn"), function (btn) {
    btn.addEventListener("click", function (event) { event.stopPropagation(); });
  });
  renderFixedPrices();
  updateCoinPrices();
})();
