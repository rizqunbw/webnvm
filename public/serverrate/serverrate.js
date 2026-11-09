(function () {
  "use strict";

  if (typeof window.nvmChipWarDestroy === "function") {
    window.nvmChipWarDestroy();
  }

  var WAR_HOURS = [5, 13, 21];
  var OFFSET = 7 * 60 * 60 * 1000;
  var root = document.getElementById("nvm-serverrate");
  var timerId = null;

  if (!root) return;

  function two(value) {
    return String(value).padStart(2, "0");
  }

  function tick() {
    if (!document.documentElement.contains(root)) {
      window.nvmChipWarDestroy();
      return;
    }

    var now = Date.now();
    var jakarta = new Date(now + OFFSET);
    var seconds = jakarta.getUTCHours() * 3600 + jakarta.getUTCMinutes() * 60 + jakarta.getUTCSeconds();
    var index = WAR_HOURS.findIndex(function (hour) { return hour * 3600 > seconds; });
    var tomorrow = index < 0;
    if (tomorrow) index = 0;
    var remaining = WAR_HOURS[index] * 3600 - seconds + (tomorrow ? 86400 : 0);
    var serverClock = root.querySelector("[data-nvm-server-clock]");
    var countdown = root.querySelector("[data-nvm-war-countdown]");
    var label = root.querySelector("[data-nvm-war-next-label]");
    var zone = root.querySelector("[data-nvm-war-zone]");

    if (serverClock) serverClock.textContent = two(jakarta.getUTCHours()) + ":" + two(jakarta.getUTCMinutes()) + ":" + two(jakarta.getUTCSeconds());
    if (countdown) countdown.textContent = two(Math.floor(remaining / 3600)) + ":" + two(Math.floor(remaining % 3600 / 60)) + ":" + two(remaining % 60);
    if (label) label.textContent = "CW " + (index + 1) + " starts in" + (tomorrow ? " (tomorrow)" : "");

    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Device local time";
    var localFormat = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
    if (zone) zone.textContent = timeZone;

    var jakartaMidnight = Math.floor((now + OFFSET) / 86400000) * 86400000 - OFFSET;
    WAR_HOURS.forEach(function (hour, i) {
      var slot = root.querySelector('[data-nvm-war-slot="' + i + '"]');
      var local = root.querySelector('[data-nvm-war-local="' + i + '"]');
      if (slot) slot.classList.toggle("is-next", i === index);
      if (local) local.textContent = localFormat.format(new Date(jakartaMidnight + hour * 3600000)) + " local";
    });
  }

  window.nvmChipWarDestroy = function () {
    if (timerId !== null) clearInterval(timerId);
    timerId = null;
  };

  tick();
  timerId = setInterval(tick, 1000);
})();
