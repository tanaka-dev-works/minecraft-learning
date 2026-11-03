/* 子ども向けの部品（フェーズ2）
   ・文字タイル        <div class="tiles" data-cmd="/tp @s ~ ~5 ~" data-track></div>
   ・キーボード配列図  <div class="kbd" data-cmd="/time set day"></div>
   ・あんないキャラ    <div class="guide" data-mood="happy">ひとことの HTML</div>
   ・1ステップ1画面    <div class="stepper" data-key="works/diamond"><section class="step">…</section>…</div>
   ・スタンプ          <button class="btn" data-stamp="1">できた！</button>
   どの部品も、データが足りなくても こわれない（なにもしないで おわる）。 */
(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var root = document.body.getAttribute("data-root") || ".";
  var icon = window.PixelIcon || function () { return ""; };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ====== 記号の名前と色 ====== */
  var SYMBOLS = {
    "/": { name: "スラッシュ", cls: "sym-slash" },
    "@": { name: "アットマーク", cls: "sym-at" },
    "~": { name: "にょろ", cls: "sym-tilde" },
    "^": { name: "やま", cls: "sym-caret" },
    " ": { name: "スペース", cls: "sym-space" },
    "=": { name: "イコール", cls: "sym-other" },
    "[": { name: "かっこ", cls: "sym-bracket" },
    "]": { name: "かっこ とじ", cls: "sym-bracket" },
    "{": { name: "なみかっこ", cls: "sym-bracket" },
    "}": { name: "なみかっこ とじ", cls: "sym-bracket" },
    '"': { name: "ダブル クォート", cls: "sym-other" },
    "-": { name: "マイナス", cls: "sym-other" },
    ".": { name: "てん", cls: "sym-other" },
    ",": { name: "カンマ", cls: "sym-other" },
    "_": { name: "アンダーバー", cls: "sym-other" },
    ":": { name: "コロン", cls: "sym-other" },
    "!": { name: "びっくり", cls: "sym-other" },
    "?": { name: "はてな", cls: "sym-other" }
  };
  window.SiteSymbols = SYMBOLS;

  function charKind(ch) {
    if (/[a-z]/.test(ch)) return "letter";
    if (/[A-Z]/.test(ch)) return "upper";
    if (/[0-9]/.test(ch)) return "digit";
    if (SYMBOLS[ch]) return "symbol";
    return "other";
  }

  /* ====== 文字タイル ====== */
  function renderTiles(box) {
    var cmd = box.getAttribute("data-cmd");
    if (cmd === null) return;
    var track = box.hasAttribute("data-track");
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "うつ もじ: " + cmd);
    var html = '<div class="tile-row">';
    for (var i = 0; i < cmd.length; i++) {
      var ch = cmd.charAt(i);
      var kind = charKind(ch);
      var sym = SYMBOLS[ch];
      var cls = "tile tile-" + kind + (sym ? " " + sym.cls : "");
      var face = ch === " " ? "&nbsp;" : esc(ch);
      var label = sym ? sym.name : kind === "upper" ? "おおもじ" : "";
      html +=
        '<span class="' + cls + '" data-i="' + i + '"' + (track ? ' role="button" tabindex="0"' : "") + ">" +
        '<span class="tile-face">' + face + "</span>" +
        (label ? '<span class="tile-name">' + label + "</span>" : "") +
        "</span>";
    }
    html += "</div>";
    if (track) {
      html +=
        '<div class="tile-tools">' +
        '<button type="button" class="btn btn-grass" data-act="next">' + icon("check") + "<span>1もじ うった</span></button>" +
        '<button type="button" class="btn btn-small" data-act="reset">' + icon("reload") + "<span>さいしょから</span></button>" +
        '<span class="tile-count" aria-live="polite"></span>' +
        "</div>";
    }
    box.innerHTML = html;
    if (!track) return;

    var done = 0;
    var tiles = box.querySelectorAll(".tile");
    var count = box.querySelector(".tile-count");
    function paint() {
      for (var j = 0; j < tiles.length; j++) {
        tiles[j].classList.toggle("is-done", j < done);
        tiles[j].classList.toggle("is-now", j === done);
      }
      count.textContent = done >= tiles.length ? "ぜんぶ うてたね！" : "あと " + (tiles.length - done) + " もじ";
      var now = tiles[done];
      if (now && now.scrollIntoView && box.scrollWidth > box.clientWidth) {
        now.scrollIntoView({ block: "nearest", inline: "center" });
      }
    }
    box.addEventListener("click", function (e) {
      var t = e.target.closest(".tile");
      var b = e.target.closest("[data-act]");
      if (t) done = Number(t.getAttribute("data-i")) + 1;
      else if (b && b.getAttribute("data-act") === "next") done = Math.min(done + 1, tiles.length);
      else if (b && b.getAttribute("data-act") === "reset") done = 0;
      else return;
      paint();
    });
    box.addEventListener("keydown", function (e) {
      var t = e.target.closest(".tile");
      if (t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); t.click(); }
    });
    paint();
  }

  /* ====== キーボード配列図 ======
     Switch の画面キーボード（英字）のならびを かんたんに えがく。
     記号の ばしょは 機種や言語の設定で ちがうので【要実機確認】。記号は 下に 名前で ならべる。 */
  var KBD_ROWS = ["1234567890", "qwertyuiop", "asdfghjkl", "zxcvbnm"];

  function renderKeyboard(box) {
    var cmd = box.getAttribute("data-cmd") || "";
    var used = {};
    for (var i = 0; i < cmd.length; i++) used[cmd.charAt(i).toLowerCase()] = true;
    var html = '<div class="kbd-board" aria-hidden="true">';
    KBD_ROWS.forEach(function (row, r) {
      html += '<div class="kbd-row kbd-row-' + r + '">';
      for (var k = 0; k < row.length; k++) {
        var ch = row.charAt(k);
        var kind = charKind(ch);
        html += '<span class="kbd-key' + (used[ch] ? " is-used tile-" + kind : "") + '">' + ch + "</span>";
      }
      html += "</div>";
    });
    html += '<div class="kbd-row"><span class="kbd-key kbd-wide' + (used[" "] ? " is-used sym-space" : "") + '">スペース</span></div>';
    html += "</div>";
    var syms = [];
    Object.keys(used).forEach(function (ch) {
      if (SYMBOLS[ch] && ch !== " ") syms.push(ch);
    });
    var letters = Object.keys(used).filter(function (ch) { return /[a-z0-9]/.test(ch); }).sort();
    html +=
      '<p class="kbd-note">いろの ついた キーを つかうよ' +
      (letters.length ? "（" + letters.join(" ") + "）" : "") + "。</p>";
    if (syms.length) {
      html += '<p class="kbd-note">きごうは きごうの ボタンで きりかえて さがそう：</p><div class="kbd-syms">';
      syms.forEach(function (ch) {
        html += '<span class="tile tile-symbol ' + SYMBOLS[ch].cls + '"><span class="tile-face">' + esc(ch) +
          '</span><span class="tile-name">' + SYMBOLS[ch].name + "</span></span>";
      });
      html += "</div>";
    }
    box.innerHTML = html;
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", "キーボードの ず");
  }

  /* ====== あんないキャラ ====== */
  function guideImg(mood) {
    var g = data.guide || {};
    var src = (g.images && g.images[mood]) || g.image || "images/guide.svg";
    return '<img class="guide-face" src="' + root + "/" + src + '" alt="" width="72" height="72">';
  }
  function renderGuide(box) {
    if (box.querySelector(".guide-face")) return;
    var g = data.guide || {};
    var mood = box.getAttribute("data-mood") || "normal";
    var said = box.innerHTML;
    box.innerHTML =
      guideImg(mood) +
      '<div class="bubble card"><span class="guide-name">' + esc(g.name || "") + "</span>" + said + "</div>";
  }
  window.SiteGuide = { img: guideImg };

  /* ====== 画面を けさない（Screen Wake Lock API） ====== */
  var wakeLock = null;
  var wantWake = false;
  function requestWake() {
    if (!wantWake || !("wakeLock" in navigator) || document.visibilityState !== "visible") return;
    navigator.wakeLock.request("screen").then(function (l) {
      wakeLock = l;
      document.body.setAttribute("data-wake", "on");
      l.addEventListener("release", function () { document.body.setAttribute("data-wake", "off"); });
    }).catch(function () {
      document.body.setAttribute("data-wake", "unavailable");
    });
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && (!wakeLock || wakeLock.released)) requestWake();
  });
  window.SiteWake = {
    keepOn: function () {
      wantWake = true;
      if (!("wakeLock" in navigator)) document.body.setAttribute("data-wake", "unsupported");
      requestWake();
    }
  };

  /* ====== 1ステップ1画面 ====== */
  function renderStepper(box) {
    var steps = box.querySelectorAll(":scope > .step");
    if (!steps.length) return;
    var key = box.getAttribute("data-key") || location.pathname;
    var total = steps.length;
    var cur = window.Progress ? window.Progress.getStep(key) : 0;
    if (cur < 0 || cur >= total) cur = 0;

    var bar = document.createElement("div");
    bar.className = "step-progress";
    bar.innerHTML =
      '<span class="step-count" aria-live="polite"></span>' +
      '<span class="step-bar" aria-hidden="true"><span class="step-fill"></span></span>';
    box.insertBefore(bar, box.firstChild);

    var nav = document.createElement("div");
    nav.className = "step-nav";
    nav.innerHTML =
      '<button type="button" class="btn btn-small step-prev">' + icon("arrow-left") + "<span>もどる</span></button>" +
      '<button type="button" class="btn btn-grass step-next"><span>つぎへ</span>' + icon("arrow-right") + "</button>";
    box.appendChild(nav);
    document.body.classList.add("has-step-nav");

    var prev = nav.querySelector(".step-prev");
    var next = nav.querySelector(".step-next");

    function show(n, focus) {
      cur = n;
      for (var i = 0; i < total; i++) {
        steps[i].hidden = i !== cur;
      }
      bar.querySelector(".step-count").textContent = (cur + 1) + " / " + total;
      bar.querySelector(".step-fill").style.width = ((cur + 1) / total) * 100 + "%";
      prev.disabled = cur === 0;
      var last = cur === total - 1;
      next.hidden = last;
      if (window.Progress) window.Progress.setStep(key, cur);
      if (focus) {
        var h = steps[cur].querySelector("h2, h3") || steps[cur];
        if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
        window.scrollTo({ top: box.getBoundingClientRect().top + window.pageYOffset - 8 });
      }
    }
    prev.addEventListener("click", function () { if (cur > 0) show(cur - 1, true); });
    next.addEventListener("click", function () { if (cur < total - 1) show(cur + 1, true); });
    box.addEventListener("click", function (e) {
      if (e.target.closest("[data-step-restart]")) show(0, true);
    });
    show(cur, false);
    window.SiteWake.keepOn();
  }

  /* ====== スタンプ ====== */
  function celebrate(levelId) {
    var lv = (data.levels || []).filter(function (l) { return String(l.id) === String(levelId); })[0];
    var dlg = document.createElement("div");
    dlg.className = "celebrate";
    dlg.setAttribute("role", "dialog");
    dlg.setAttribute("aria-modal", "true");
    dlg.setAttribute("aria-label", "スタンプ ゲット");
    dlg.innerHTML =
      '<div class="celebrate-box card">' +
      '<div class="celebrate-stamp" aria-hidden="true">' + icon("star", "icon stamp-icon") + "</div>" +
      "<p class=\"celebrate-title\">レベル" + esc(levelId) + " クリア！</p>" +
      (lv ? "<p>" + lv.title + "</p>" : "") +
      '<div class="celebrate-guide">' + guideImg("happy") + "<p>やったね！ スタンプを ゲットしたよ。</p></div>" +
      '<div class="celebrate-actions">' +
      '<a class="btn btn-dirt" href="' + root + '/pages/stamps.html">' + icon("trophy") + "<span>スタンプちょう</span></a>" +
      '<a class="btn btn-grass" href="' + root + '/index.html">' + icon("home") + "<span>すごろくへ</span></a>" +
      '<button type="button" class="btn btn-small" data-close>' + icon("close") + "<span>とじる</span></button>" +
      "</div></div>";
    document.body.appendChild(dlg);
    var closeBtn = dlg.querySelector("[data-close]");
    function close() { dlg.parentNode && dlg.parentNode.removeChild(dlg); }
    closeBtn.addEventListener("click", close);
    dlg.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    dlg.querySelector(".btn").focus();
  }

  function bindStamp(btn) {
    var id = btn.getAttribute("data-stamp");
    function paint() {
      var has = window.Progress && window.Progress.hasStamp(id);
      btn.classList.toggle("is-stamped", Boolean(has));
    }
    btn.addEventListener("click", function () {
      if (window.Progress) window.Progress.addStamp(id);
      paint();
      celebrate(id);
    });
    paint();
  }
  window.SiteStamp = { celebrate: celebrate };

  /* ====== えがく ====== */
  function init(scope) {
    scope = scope || document;
    scope.querySelectorAll(".tiles[data-cmd]").forEach(renderTiles);
    scope.querySelectorAll(".kbd[data-cmd]").forEach(renderKeyboard);
    scope.querySelectorAll(".guide").forEach(renderGuide);
    scope.querySelectorAll(".stepper").forEach(renderStepper);
    scope.querySelectorAll("[data-stamp]").forEach(bindStamp);
    decorate(scope);
  }

  /* はこの アイコン（文字と いっしょに 出す。色だけで 区別しない） */
  function decorate(scope) {
    var map = [
      [".with-adult", "users"],
      [".box-alert > .box-title", "warning-diamond"],
      [".box-hint > .box-title", "zap"],
      [".box-why > .box-title", "circle-question"]
    ];
    map.forEach(function (m) {
      scope.querySelectorAll(m[0]).forEach(function (el) {
        if (el.querySelector(":scope > svg.icon")) return;
        el.insertAdjacentHTML("afterbegin", icon(m[1]));
      });
    });
  }
  window.SiteParts = { init: init, renderTiles: renderTiles, renderKeyboard: renderKeyboard };
  init(document);
})();
