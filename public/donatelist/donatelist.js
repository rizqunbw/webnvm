(function () {
  "use strict";

  if (typeof window.nvmDonateDestroy === "function") {
    window.nvmDonateDestroy();
  }

  var root = document.getElementById("nvm-donatelist");
  var searchEl = null;
  var categoryEl = null;
  var searchValue = "";
  var categoryValue = "";

  if (!root) return;

  function onSearch() {
    searchValue = searchEl ? searchEl.value : "";
    render();
  }

  function onCategory() {
    categoryValue = categoryEl ? categoryEl.value : "";
    render();
  }

  function emptyState(container, title, text) {
    container.textContent = "";
    var wrap = document.createElement("div");
    wrap.className = "nvm-donate__empty";
    var icon = document.createElement("i");
    icon.className = "fa-solid fa-circle-info";
    icon.setAttribute("aria-hidden", "true");
    var body = document.createElement("div");
    var heading = document.createElement("strong");
    var p = document.createElement("p");
    heading.textContent = title;
    p.textContent = text;
    body.append(heading, p);
    wrap.append(icon, body);
    container.appendChild(wrap);
  }

  function render() {
    var dataNode = root.querySelector("#nvm-donate-data");
    var results = root.querySelector("#nvm-donate-results");
    if (!dataNode || !results) return;

    var data;
    try {
      data = JSON.parse(dataNode.textContent);
      if (!Array.isArray(data)) throw new Error("Not an array");
    } catch (e) {
      emptyState(results, "Donate list data error", "Check the JSON array in donatelist.html.");
      return;
    }

    var valid = data.filter(function (item) {
      return item && typeof item.name === "string" && item.name.trim();
    });

    var categories = Array.from(new Set(valid.map(function (item) {
      return typeof item.category === "string" ? item.category.trim() : "";
    }).filter(Boolean))).sort();

    if (categoryEl) {
      var selected = categoryValue;
      categoryEl.textContent = "";
      var first = document.createElement("option");
      first.value = "";
      first.textContent = "All Categories";
      categoryEl.appendChild(first);
      categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryEl.appendChild(option);
      });
      categoryEl.value = categories.indexOf(selected) >= 0 ? selected : "";
      categoryValue = categoryEl.value;
    }

    var term = searchValue.trim().toLowerCase();
    var filtered = valid.filter(function (item) {
      if (categoryValue && item.category !== categoryValue) return false;
      if (!term) return true;
      var haystack = [item.name, item.category, item.price, item.notes]
        .concat(Array.isArray(item.rewards) ? item.rewards : [])
        .join(" ").toLowerCase();
      return haystack.indexOf(term) >= 0;
    });

    var count = root.querySelector("#nvm-donate-count");
    if (count) count.textContent = filtered.length + " PACKAGE" + (filtered.length === 1 ? "" : "S");
    var heroCount = root.querySelector("[data-nvm-donate-count]");
    if (heroCount) heroCount.textContent = String(filtered.length);

    results.textContent = "";
    if (!valid.length) {
      emptyState(results, "Donate list is being prepared", "Donation packages, prices, and rewards will be published here once verified.");
      return;
    }
    if (!filtered.length) {
      emptyState(results, "No packages found", "Try a different search or category.");
      return;
    }

    var fragment = document.createDocumentFragment();
    filtered.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "nvm-donate__card";
      var top = document.createElement("div");
      top.className = "nvm-donate__card-top";
      var tag = document.createElement("span");
      tag.className = "nvm-donate__tag";
      tag.textContent = (item.category || "DONATION").toUpperCase();
      top.appendChild(tag);
      card.appendChild(top);
      if (item.price) {
        var price = document.createElement("span");
        price.className = "nvm-donate__price";
        price.textContent = item.price;
        card.appendChild(price);
      }
      var heading = document.createElement("h4");
      heading.textContent = item.name;
      card.appendChild(heading);
      if (item.notes) {
        var notes = document.createElement("p");
        notes.textContent = item.notes;
        card.appendChild(notes);
      }
      if (Array.isArray(item.rewards) && item.rewards.length) {
        var list = document.createElement("ul");
        list.className = "nvm-donate__rewards";
        item.rewards.forEach(function (reward) {
          if (typeof reward !== "string" || !reward.trim()) return;
          var li = document.createElement("li");
          var icon = document.createElement("i");
          icon.className = "fa-solid fa-gift";
          icon.setAttribute("aria-hidden", "true");
          li.append(icon, document.createTextNode(reward));
          list.appendChild(li);
        });
        if (list.childNodes.length) card.appendChild(list);
      }
      fragment.appendChild(card);
    });
    results.appendChild(fragment);
  }

  window.nvmDonateDestroy = function () {
    if (searchEl) searchEl.removeEventListener("input", onSearch);
    if (categoryEl) categoryEl.removeEventListener("change", onCategory);
    searchEl = null;
    categoryEl = null;
  };

  searchEl = root.querySelector("#nvm-donate-search");
  categoryEl = root.querySelector("#nvm-donate-category");
  if (searchEl) {
    searchEl.value = searchValue;
    searchEl.addEventListener("input", onSearch);
  }
  if (categoryEl) categoryEl.addEventListener("change", onCategory);
  render();
})();
