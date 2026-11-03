/* コマンドずかん（一覧・くわしい ページ）を data-commands.js から えがく */
(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var cmds = data.commands || [];
  var kinds = data.formKinds || {};
  var icon = window.PixelIcon || function () { return ""; };
  var root = document.body.getAttribute("data-root") || ".";
  var P = window.Progress;

  var WHERE = {
    chat: { label: "チャットで つかう", icon: "comment" },
    block: { label: "コマンドブロックで つかう", icon: "blocks" },
    both: { label: "チャットでも コマンドブロックでも", icon: "repeat" }
  };
  var STATUS = {
    doc: "公式ドキュメントで確認済",
    device: "実機で確認済",
    unknown: "未確認"
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function find(id) {
    for (var i = 0; i < cmds.length; i++) if (cmds[i].id === id) return cmds[i];
    return null;
  }

  /* 色分けした かきかた */
  function formHtml(form) {
    var html = '<div class="form-row">';
    form.forEach(function (f) {
      html += '<span class="form-part form-' + f[1] + '"><code>' + esc(f[0]) + '</code><span class="form-label">' + esc(kinds[f[1]] || "") + "</span></span>";
    });
    return html + "</div>";
  }
  window.SiteCommands = { find: find, formHtml: formHtml, esc: esc };

  /* ====== 一覧（レベルごとの カード） ====== */
  var list = document.getElementById("command-list");
  if (list) {
    var levels = data.levels || [];
    var html = "";
    levels.forEach(function (lv) {
      var mine = cmds.filter(function (c) { return c.level === lv.id; });
      if (!mine.length) return;
      html += '<section class="cmd-level"><h2 id="lv' + lv.id + '"><span class="lv-chip">レベル' + lv.id + "</span>" + lv.title + "</h2>";
      html += '<ul class="cmd-cards">';
      mine.forEach(function (c) {
        var learned = P && P.inList("learned", c.id);
        var w = WHERE[c.where] || WHERE.both;
        html +=
          '<li><a class="cmd-card" href="command.html?id=' + c.id + '">' +
          '<span class="cmd-name">' + esc(c.name) + '<span class="cmd-read">' + esc(c.read) + "</span></span>" +
          '<span class="cmd-what">' + c.what + "</span>" +
          '<span class="cmd-ex"><code>' + esc(c.examples[0].cmd) + "</code></span>" +
          '<span class="cmd-meta">' + icon(w.icon) + "<span>" + w.label + "</span>" +
          (learned ? '<span class="cmd-learned">' + icon("check") + "おぼえた</span>" : "") + "</span>" +
          "</a></li>";
      });
      html += "</ul></section>";
    });
    list.innerHTML = html;
  }

  /* ====== くわしい ページ ====== */
  var detail = document.getElementById("command-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id");
    var c = find(id);
    if (!c) {
      detail.innerHTML =
        '<div class="guide"><p>その コマンドは まだ ずかんに ないよ。</p></div>' +
        '<p><a class="btn btn-diamond" href="commands.html">' + icon("book-open") + "<span>コマンドずかんへ</span></a></p>";
      window.SiteParts && window.SiteParts.init(detail);
      return;
    }
    document.title = c.name + "｜コマンドずかん｜" + (data.siteName || "");
    var crumbEl = document.querySelector('.breadcrumb [aria-current="page"]');
    if (crumbEl) crumbEl.textContent = c.name;

    var w = WHERE[c.where] || WHERE.both;
    var h = "";
    h += '<h1 class="cmd-title">' + esc(c.name) + ' <span class="cmd-read">' + esc(c.read) + "</span></h1>";
    h += '<p class="cmd-badges"><span class="lv-chip">レベル' + c.level + '</span><span class="where-chip">' + icon(w.icon) + w.label + "</span></p>";
    h += '<div class="guide"><p>' + c.what + "</p></div>";

    h += "<h2>かきかた</h2>" + formHtml(c.form);

    h += "<h2>ひきすう（コマンドに わたす じょうほう）</h2><ul class=\"arg-list\">";
    c.args.forEach(function (a) { h += "<li><strong>" + a.name + "</strong><br>" + a.desc + "</li>"; });
    h += "</ul>";

    h += "<h2>れいぶん</h2>";
    c.examples.forEach(function (ex, i) {
      h += '<div class="example"><p class="example-no">れい ' + (i + 1) + "</p>" +
        '<div class="tiles" data-cmd="' + esc(ex.cmd) + '"' + (i === 0 ? " data-track" : "") + "></div>" +
        '<p class="example-result">' + icon("arrow-right") + "<span>" + ex.result + "</span></p></div>";
    });
    if (c.examples[0]) {
      h += "<details class=\"box\"><summary>キーボードの ずを <ruby>見<rt>み</rt></ruby>る（れい 1）</summary>" +
        '<div class="kbd" data-cmd="' + esc(c.examples[0].cmd) + '"></div></details>';
    }

    h += "<h2>うつと どうなる？</h2><p>" + c.result + "</p>";
    h += '<div class="box box-alert"><p class="box-title">きをつけること</p><p>' + c.careful + "</p></div>";

    var rel = (c.related || []).map(find).filter(Boolean);
    if (rel.length) {
      h += "<h2>かんけいする コマンド</h2><p class=\"rel-links\">";
      rel.forEach(function (r) { h += '<a class="btn btn-diamond btn-small" href="command.html?id=' + r.id + '">' + esc(r.name) + "</a>"; });
      h += "</p>";
    }
    var refList = (data.reference || []);
    var hasRef = refList.some(function (r) { return r.id === c.id || r.id === c.refId; });
    if (hasRef) {
      h += '<p><a class="btn btn-sky" href="reference.html?id=' + esc(c.refId || c.id) + '">' + icon("book-open") + "<span>もっと くわしく（コマンド大ずかん）</span></a></p>";
    }

    h += '<p class="cmd-actions">' +
      '<button type="button" class="btn btn-grass" id="learned-btn"></button>' +
      '<button type="button" class="btn btn-dirt" id="fav-btn"></button></p>';

    /* 保護者向け */
    h += '<details class="box parents-box no-yomi"><summary>【保護者向け】正式な構文・確認状況</summary>';
    h += "<p><strong>正式な構文</strong>（Microsoft Learn より）</p><ul class=\"syntax-list\">";
    c.parents.syntax.forEach(function (s) { h += "<li><code>" + esc(s) + "</code></li>"; });
    h += "</ul>";
    h += "<p><strong>必要な権限</strong>：オペレーター（公式表記 Game Directors）。チート：" + (c.parents.cheats ? "必要" : "不要") + "</p>";
    if (c.parents.note) h += "<p><strong>メモ</strong>：" + esc(c.parents.note) + "</p>";
    h += '<p><strong>確認状況</strong>：<span class="status status-' + c.status + '">' + STATUS[c.status] +
      (c.checkedVersion ? "（" + esc(c.checkedVersion) + "）" : "") + "</span></p>";
    // 子ども向けページには外部リンクを置かない（リンクは保護者ページにまとめる）。ここは文字とコピーだけ
    h += '<p><strong>公式ページ</strong>：<code class="url">' + esc(c.parents.url) + '</code> <button type="button" class="btn btn-small" data-copy="' + esc(c.parents.url) + '">URLをコピー</button></p>';
    h += "<p><strong>例文のコピー</strong>（PC・スマホでメモする用。Switch には貼り付けできません）</p><ul class=\"copy-list\">";
    c.examples.forEach(function (ex) {
      h += '<li><code>' + esc(ex.cmd) + '</code> <button type="button" class="btn btn-small" data-copy="' + esc(ex.cmd) + '">コピー</button></li>';
    });
    h += "</ul></details>";

    /* まえ・つぎ */
    var idx = cmds.indexOf(c);
    h += '<nav class="pager" aria-label="まえと つぎの コマンド">';
    if (idx > 0) h += '<a class="btn btn-small" href="command.html?id=' + cmds[idx - 1].id + '">' + icon("arrow-left") + "<span>" + esc(cmds[idx - 1].name) + "</span></a>";
    h += '<a class="btn btn-small" href="commands.html#lv' + c.level + '">' + icon("list-box") + "<span>いちらん</span></a>";
    if (idx < cmds.length - 1) h += '<a class="btn btn-small" href="command.html?id=' + cmds[idx + 1].id + '"><span>' + esc(cmds[idx + 1].name) + "</span>" + icon("arrow-right") + "</a>";
    h += "</nav>";

    detail.innerHTML = h;
    window.SiteParts && window.SiteParts.init(detail);

    var lb = document.getElementById("learned-btn");
    var fb = document.getElementById("fav-btn");
    function paint() {
      var l = P && P.inList("learned", c.id);
      var f = P && P.inList("favorites", c.id);
      lb.innerHTML = icon("check") + "<span>" + (l ? "おぼえた！" : "おぼえたら おす") + "</span>";
      lb.setAttribute("aria-pressed", l ? "true" : "false");
      fb.innerHTML = icon("heart") + "<span>" + (f ? "おきにいり" : "おきにいりに する") + "</span>";
      fb.setAttribute("aria-pressed", f ? "true" : "false");
    }
    lb.addEventListener("click", function () { P && P.toggleList("learned", c.id); paint(); });
    fb.addEventListener("click", function () { P && P.toggleList("favorites", c.id); paint(); });
    paint();

    detail.addEventListener("click", function (e) {
      var b = e.target.closest("[data-copy]");
      if (!b) return;
      var text = b.getAttribute("data-copy");
      function done(ok) { b.textContent = ok ? "コピーしました" : "コピーできませんでした"; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else done(false);
    });
  }
})();
