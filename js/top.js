/* トップページ：レベルのすごろくを data.js と きろく（progress.js）から えがく */
(function () {
  "use strict";

  var data = window.SITE_DATA || { levels: [] };
  var levels = data.levels || [];
  var list = document.getElementById("sugoroku");
  if (!list) return;

  var STAMP =
    '<svg viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges">' +
    '<rect x="3" y="0" width="2" height="2" fill="#f2c230"/><rect x="0" y="2" width="8" height="2" fill="#f2c230"/>' +
    '<rect x="1" y="4" width="6" height="1" fill="#f2c230"/><rect x="1" y="5" width="2" height="2" fill="#f2c230"/>' +
    '<rect x="5" y="5" width="2" height="2" fill="#f2c230"/><rect x="0" y="7" width="2" height="1" fill="#f2c230"/>' +
    '<rect x="6" y="7" width="2" height="1" fill="#f2c230"/><rect x="3" y="2" width="2" height="1" fill="#b8860b"/></svg>';
  var LOCK =
    '<svg viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges">' +
    '<rect x="2" y="0" width="4" height="1" fill="#5f646b"/><rect x="1" y="1" width="1" height="3" fill="#5f646b"/>' +
    '<rect x="6" y="1" width="1" height="3" fill="#5f646b"/><rect x="0" y="4" width="8" height="4" fill="#5f646b"/>' +
    '<rect x="3" y="5" width="2" height="2" fill="#e7e8ea"/></svg>';
  var FLAG =
    '<svg viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges">' +
    '<rect x="1" y="0" width="1" height="8" fill="#553518"/><rect x="2" y="0" width="5" height="4" fill="#b3261e"/>' +
    '<rect x="4" y="1" width="1" height="2" fill="#fff"/></svg>';

  var next = window.Progress ? window.Progress.nextLevel(levels) : (levels[0] && levels[0].id);

  levels.forEach(function (lv) {
    var cleared = window.Progress && window.Progress.hasStamp(lv.id);
    var state = cleared ? "clear" : lv.id === next ? "next" : "todo";
    if (!cleared && !lv.ready) state = lv.id === next ? "next" : "soon";

    var li = document.createElement("li");
    var tag = lv.ready ? "a" : "div";
    var sq = document.createElement(tag);
    sq.className = "square";
    sq.setAttribute("data-state", state);
    if (lv.ready) sq.setAttribute("href", lv.page);
    else sq.setAttribute("aria-disabled", "true");

    var stateHtml;
    if (cleared) stateHtml = STAMP + "<span>クリア！</span>";
    else if (!lv.ready) stateHtml = LOCK + "<span>もうすぐ</span>";
    else if (state === "next") stateHtml = FLAG + "<span>はじめる</span>";
    else stateHtml = FLAG + "<span>あそべる</span>";

    sq.innerHTML =
      '<span class="num"><span><small>レベル</small>' + lv.id + "</span></span>" +
      '<span class="name">' + lv.title + '<span class="goal">' + lv.goal + "</span></span>" +
      '<span class="state">' + stateHtml + "</span>";
    li.appendChild(sq);

    if (state === "next") {
      var flag = document.createElement("span");
      flag.className = "next-flag";
      flag.textContent = "つぎは ここ！";
      li.className = "is-next";
      li.insertBefore(flag, sq);
    }
    list.appendChild(li);
  });

  /* しらべる・おうちの人へ の メニュー */
  ["lookup", "parents"].forEach(function (menu) {
    var box = document.getElementById("menu-" + menu);
    if (!box) return;
    box.innerHTML = (data.pages || []).filter(function (p) { return p.menu === menu; }).map(function (p) {
      var ic = window.PixelIcon ? window.PixelIcon(p.icon) : "";
      var inner = ic + '<span class="menu-text"><span>' + p.title + '</span>' +
        (p.ready ? "" : '<span class="soon-note">' + (menu === "parents" ? "準備中" : "もうすぐ") + "</span>") + "</span>";
      return p.ready
        ? '<a class="btn ' + p.color + '" href="' + p.href + '">' + inner + "</a>"
        : '<span class="btn ' + p.color + '" aria-disabled="true">' + inner + "</span>";
    }).join("");
  });

  var count = document.getElementById("stamp-count");
  if (count && window.Progress) {
    var n = levels.filter(function (lv) { return window.Progress.hasStamp(lv.id); }).length;
    count.textContent = n + " / " + levels.length;
  }
})();
