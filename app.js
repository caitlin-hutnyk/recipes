/* Recipe rendering, hash routing, scaling, and menu tabs. */

var appEl = document.getElementById("app");
var searchEl = document.getElementById("search");

/* active tab index for menu (multi-dish) recipes; reset when the route changes */
var activeTab = 0;
var lastDetailId = null;

var COMMON_FRACTIONS = [
  { value: 0, label: "" },
  { value: 1 / 4, label: "1/4" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 3 / 4, label: "3/4" },
  { value: 1, label: "" }
];

var METRIC_UNITS = ["g", "ml", "kg", "l"];

/* Turn a scaled number into a cooking-friendly string.
   Metric (g/ml) rounds to whole numbers; everything else snaps to
   common fractions (1/4, 1/3, 1/2, 2/3, 3/4) for spoons, cups, counts. */
function formatQuantity(quantity, unit) {
  if (quantity == null) return "";

  if (METRIC_UNITS.indexOf(unit) !== -1) {
    if (quantity < 10) return String(Math.round(quantity * 10) / 10);
    return String(Math.round(quantity));
  }

  var whole = Math.floor(quantity);
  var remainder = quantity - whole;
  var closest = COMMON_FRACTIONS[0];
  var smallestDiff = Infinity;
  for (var i = 0; i < COMMON_FRACTIONS.length; i++) {
    var diff = Math.abs(remainder - COMMON_FRACTIONS[i].value);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = COMMON_FRACTIONS[i];
    }
  }

  if (closest.value === 1) {
    whole = whole + 1;
    closest = COMMON_FRACTIONS[0];
  }
  if (whole === 0 && closest.label === "") {
    if (quantity > 0) return String(Math.round(quantity * 100) / 100);
    return "0";
  }
  if (closest.label === "") return String(whole);
  if (whole === 0) return closest.label;
  return whole + " " + closest.label;
}

function formatUnit(unit, quantity) {
  if (unit === "cup" && quantity > 1) return "cups";
  return unit;
}

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 10) / 10);
}

/* ---- scaling multiplier, persisted per recipe ----
   localStorage is wrapped because it can throw a SecurityError when the
   page is opened directly from disk (file://) in some browsers. */
function getMultiplier(recipeId) {
  var raw = null;
  try {
    raw = localStorage.getItem("scale:" + recipeId);
  } catch (error) {
    raw = null;
  }
  var value = raw ? parseFloat(raw) : 1;
  if (!value || value <= 0 || isNaN(value)) return 1;
  return value;
}

function setMultiplier(recipeId, value) {
  var safe = value;
  if (!safe || safe <= 0 || isNaN(safe)) safe = 1;
  try {
    localStorage.setItem("scale:" + recipeId, String(safe));
  } catch (error) {
    /* persistence unavailable (e.g. file://) — scaling still works in-session */
  }
}

/* ---- list view ---- */
function groupListsOf(recipe) {
  var lists = [];
  if (recipe.groups) lists.push(recipe.groups);
  if (recipe.dishes) {
    for (var d = 0; d < recipe.dishes.length; d++) {
      lists.push(recipe.dishes[d].groups);
    }
  }
  return lists;
}

function recipeMatchesQuery(recipe, query) {
  if (!query) return true;
  var needle = query.toLowerCase();
  if (recipe.title.toLowerCase().indexOf(needle) !== -1) return true;
  var lists = groupListsOf(recipe);
  for (var l = 0; l < lists.length; l++) {
    for (var g = 0; g < lists[l].length; g++) {
      var items = lists[l][g].items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].name.toLowerCase().indexOf(needle) !== -1) return true;
      }
    }
  }
  return false;
}

function renderList(query) {
  var stapleCards = "";
  var untestedCards = "";
  for (var r = 0; r < RECIPES.length; r++) {
    var recipe = RECIPES[r];
    if (!recipeMatchesQuery(recipe, query)) continue;

    var tagsHtml = "";
    for (var t = 0; t < recipe.tags.length; t++) {
      tagsHtml += '<span class="tag">' + recipe.tags[t] + "</span>";
    }
    var card =
      '<a class="card hue-' + (r % 6) + '" href="#/recipe/' + recipe.id + '">' +
      '<span class="card-emoji">' + (recipe.emoji || "🍽️") + "</span>" +
      "<h2>" + recipe.title + "</h2>" +
      '<div class="card-meta">' + tagsHtml +
      '<span class="meta-bit">Serves ' + recipe.servings + "</span>" +
      '<span class="meta-bit">' + recipe.time + "</span>" +
      "</div></a>";
    if (recipe.untested) untestedCards += card;
    else stapleCards += card;
  }

  if (stapleCards === "" && untestedCards === "") {
    appEl.innerHTML = '<p class="empty">No recipes match “' + query + "”.</p>";
    return;
  }

  var html = "";
  if (stapleCards !== "") {
    /* only label the staples when an untested section follows */
    if (untestedCards !== "") html += '<h3 class="list-heading">Staples</h3>';
    html += '<div class="grid">' + stapleCards + "</div>";
  }
  if (untestedCards !== "") {
    html += '<h3 class="list-heading">🧪 Untested — not cooked yet</h3><div class="grid">' + untestedCards + "</div>";
  }
  appEl.innerHTML = html;
}

/* ---- detail view ---- */
function renderIngredientItem(item, multiplier) {
  var amount = "";
  if (item.qty != null) {
    var quantityText = formatQuantity(item.qty * multiplier, item.unit);
    var unitText = item.unit ? formatUnit(item.unit, item.qty * multiplier) : "";
    amount = [quantityText, unitText].filter(Boolean).join(" ");
  }
  var amountHtml = amount ? '<span class="amt">' + amount + "</span> " : "";
  var noteHtml = item.note ? ' <span class="note">(' + item.note + ")</span>" : "";
  return '<li><label><input type="checkbox" class="tick"><span class="ing">' +
    amountHtml + item.name + noteHtml + "</span></label></li>";
}

function renderGroupsHtml(groups, multiplier) {
  var groupsHtml = "";
  for (var g = 0; g < groups.length; g++) {
    var group = groups[g];
    /* fixed groups are per-bowl assembly amounts — they stay constant
       while the prep batch scales */
    var groupMultiplier = group.fixed ? 1 : multiplier;
    var itemsHtml = "";
    for (var i = 0; i < group.items.length; i++) {
      itemsHtml += renderIngredientItem(group.items[i], groupMultiplier);
    }
    var heading = group.name ? "<h4>" + group.name + "</h4>" : "";
    groupsHtml += '<div class="ing-group">' + heading + "<ul>" + itemsHtml + "</ul></div>";
  }
  return groupsHtml;
}

function renderNotesSection(notes) {
  if (!notes || !notes.length) return "";
  var noteItems = "";
  for (var n = 0; n < notes.length; n++) {
    noteItems += "<li>" + notes[n] + "</li>";
  }
  return '<section class="notes"><h3>Notes</h3><ul>' + noteItems + "</ul></section>";
}

/* ingredients + method side by side (stacks on mobile) for one dish */
function renderCookSection(dish, multiplier) {
  var methodHtml = "";
  for (var m = 0; m < dish.method.length; m++) {
    methodHtml += "<li>" + dish.method[m] + "</li>";
  }
  return '<div class="cook">' +
    '<section class="ingredients"><h3>Ingredients</h3>' + renderGroupsHtml(dish.groups, multiplier) + "</section>" +
    '<div class="method-col">' +
    '<section class="method"><h3>Method</h3><ol>' + methodHtml + "</ol></section>" +
    renderNotesSection(dish.notes) +
    "</div></div>";
}

function renderTimelinePanel(recipe) {
  var items = "";
  for (var t = 0; t < recipe.timeline.length; t++) {
    var step = recipe.timeline[t];
    items += '<li><span class="when">' + step.when + '</span><span class="what">' + step.what + "</span></li>";
  }
  return '<section class="timeline-panel"><h3>The plan — work backward from sit-down (T)</h3>' +
    '<ol class="timeline">' + items + "</ol></section>" +
    renderNotesSection(recipe.notes);
}

/* tab bar + one panel per dish (and the timeline) for menu recipes */
function renderMenuBody(recipe, multiplier) {
  var labels = [];
  if (recipe.timeline) labels.push("📋 Timeline");
  for (var d = 0; d < recipe.dishes.length; d++) {
    var dish = recipe.dishes[d];
    labels.push((dish.emoji ? dish.emoji + " " : "") + dish.name);
  }
  if (activeTab >= labels.length) activeTab = 0;

  var tabsHtml = "";
  for (var i = 0; i < labels.length; i++) {
    tabsHtml += '<button class="tab' + (i === activeTab ? " active" : "") + '" data-tab="' + i + '">' + labels[i] + "</button>";
  }

  var panels = [];
  if (recipe.timeline) panels.push(renderTimelinePanel(recipe));
  for (var d2 = 0; d2 < recipe.dishes.length; d2++) {
    panels.push(renderCookSection(recipe.dishes[d2], multiplier));
  }
  var panelsHtml = "";
  for (var p = 0; p < panels.length; p++) {
    panelsHtml += '<div class="tab-panel' + (p === activeTab ? " active" : "") + '">' + panels[p] + "</div>";
  }
  return '<div class="tabs">' + tabsHtml + "</div>" + panelsHtml;
}

function renderDetail(recipe) {
  var multiplier = getMultiplier(recipe.id);
  var servingsDisplay = formatNumber(recipe.servings * multiplier);

  var tagsHtml = "";
  for (var t = 0; t < recipe.tags.length; t++) {
    tagsHtml += '<span class="tag">' + recipe.tags[t] + "</span>";
  }
  if (recipe.untested) {
    tagsHtml += '<span class="tag tag-untested">🧪 Untested</span>';
  }

  var warningHtml = recipe.warning ? '<div class="warning">⚠️ ' + recipe.warning + "</div>" : "";

  var meatHtml = "";
  if (recipe.scaleKey) {
    var meatDisplay = formatNumber(recipe.scaleKey.baseQty * multiplier);
    var step = recipe.scaleKey.label === "g" ? 10 : 1;
    meatHtml =
      '<div class="scaler-row">' +
      '<span class="scaler-label">Scale by ' + recipe.scaleKey.name + "</span>" +
      '<div class="meat"><input id="meatInput" type="number" min="0" step="' + step +
      '" value="' + meatDisplay + '"><span class="unit">' + recipe.scaleKey.label + "</span></div>" +
      "</div>";
  }

  /* a plain recipe renders as one cook section (its own groups/method/notes);
     a menu recipe renders as tabs */
  var body;
  if (recipe.dishes) {
    body = renderMenuBody(recipe, multiplier);
  } else {
    body = renderCookSection(recipe, multiplier);
  }

  var hueClass = "hue-" + (RECIPES.indexOf(recipe) % 6);

  appEl.innerHTML =
    '<div class="detail ' + hueClass + '">' +
    '<a class="back" href="#/">← All recipes</a>' +
    '<h1><span class="title-emoji">' + (recipe.emoji || "🍽️") + "</span>" + recipe.title + "</h1>" +
    '<div class="detail-meta">' + tagsHtml +
    '<span class="meta-bit">' + recipe.time + "</span></div>" +
    warningHtml +
    '<section class="scaler">' +
      '<div class="scaler-row"><span class="scaler-label">Servings</span>' +
      '<div class="stepper"><button id="servMinus" aria-label="Fewer servings">−</button>' +
      '<input id="servingsInput" type="number" min="1" step="1" value="' + servingsDisplay + '">' +
      '<button id="servPlus" aria-label="More servings">+</button></div></div>' +
      meatHtml +
      '<div class="scaler-row"><span class="mult">×' + (Math.round(multiplier * 100) / 100) +
      '</span><button id="resetScale" class="reset">Reset</button></div>' +
    "</section>" +
    body +
    "</div>";

  wireDetailEvents(recipe, multiplier);
}

function wireDetailEvents(recipe, multiplier) {
  function applyMultiplier(newMultiplier) {
    setMultiplier(recipe.id, newMultiplier);
    renderDetail(recipe);
  }
  var currentServings = recipe.servings * multiplier;

  document.getElementById("servMinus").addEventListener("click", function () {
    var next = Math.max(1, Math.round(currentServings) - 1);
    applyMultiplier(next / recipe.servings);
  });
  document.getElementById("servPlus").addEventListener("click", function () {
    var next = Math.round(currentServings) + 1;
    applyMultiplier(next / recipe.servings);
  });
  document.getElementById("servingsInput").addEventListener("change", function (event) {
    var value = parseFloat(event.target.value);
    if (value > 0) applyMultiplier(value / recipe.servings);
  });

  var meatInput = document.getElementById("meatInput");
  if (meatInput && recipe.scaleKey) {
    meatInput.addEventListener("change", function (event) {
      var value = parseFloat(event.target.value);
      if (value > 0) applyMultiplier(value / recipe.scaleKey.baseQty);
    });
  }

  document.getElementById("resetScale").addEventListener("click", function () {
    applyMultiplier(1);
  });

  /* tab switching toggles classes in place so ingredient ticks survive */
  var tabButtons = appEl.querySelectorAll(".tab");
  var tabPanels = appEl.querySelectorAll(".tab-panel");
  for (var b = 0; b < tabButtons.length; b++) {
    tabButtons[b].addEventListener("click", function (event) {
      var index = parseInt(event.currentTarget.getAttribute("data-tab"), 10);
      activeTab = index;
      for (var i = 0; i < tabButtons.length; i++) {
        if (i === index) tabButtons[i].classList.add("active");
        else tabButtons[i].classList.remove("active");
        if (i === index) tabPanels[i].classList.add("active");
        else tabPanels[i].classList.remove("active");
      }
    });
  }

  var ticks = appEl.querySelectorAll(".tick");
  for (var k = 0; k < ticks.length; k++) {
    ticks[k].addEventListener("change", function (event) {
      var li = event.target.closest("li");
      if (event.target.checked) li.classList.add("done");
      else li.classList.remove("done");
    });
  }
}

/* ---- routing ---- */
function router() {
  var hash = location.hash || "#/";
  if (hash.indexOf("#/recipe/") === 0) {
    var id = decodeURIComponent(hash.slice("#/recipe/".length));
    var match = null;
    for (var i = 0; i < RECIPES.length; i++) {
      if (RECIPES[i].id === id) match = RECIPES[i];
    }
    if (match) {
      if (match.id !== lastDetailId) {
        activeTab = 0;
        lastDetailId = match.id;
      }
      searchEl.style.display = "none";
      renderDetail(match);
      window.scrollTo(0, 0);
      return;
    }
  }
  lastDetailId = null;
  searchEl.style.display = "";
  renderList(searchEl.value);
}

window.addEventListener("hashchange", router);
searchEl.addEventListener("input", function () {
  if ((location.hash || "#/").indexOf("#/recipe/") !== 0) renderList(searchEl.value);
});
router();
