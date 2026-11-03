/* コマンド大ずかん（応用編）を data-reference.js から えがく
   reference.html … 3つ（＋その他）に わけた 一覧 / reference.html?id=… … くわしい ページ */
(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var refs = data.reference || [];
  var basics = data.commands || [];
  var icon = window.PixelIcon || function () { return ""; };
  var P = window.Progress;

  var CATS = [
    { id: "switch", title: "Switch で つかえる", icon: "gamepad", desc: "くわしい せつめいが あるよ。" },
    { id: "bds", title: "せんよう サーバー（BDS）だけ", icon: "lock", desc: "Switch では つかえない。" },
    { id: "edu", title: "きょういくばん（Education Edition）だけ", icon: "lock", desc: "Switch では つかえない。" },
    { id: "other", title: "アドオンや パソコンが ひつよう", icon: "lock", desc: "Switch の ふつうの あそびかたでは つかえない。" }
  ];
  var KINDS = (data.formKinds || {});
  var STATUS = { doc: "公式ドキュメントで確認済", device: "実機で確認済", unknown: "未確認" };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function find(id) { for (var i = 0; i < refs.length; i++) if (refs[i].id === id) return refs[i]; return null; }
  function basicOf(r) { if (!r.basic) return null; for (var i = 0; i < basics.length; i++) if (basics[i].id === r.basic) return basics[i]; return null; }

  /* ====== 一覧 ====== */
  var list = document.getElementById("reference-list");
  if (list) {
    var html = '<nav class="ref-jump" aria-label="しゅるい">';
    CATS.forEach(function (c) {
      var n = refs.filter(function (r) { return r.cat === c.id; }).length;
      if (n) html += '<a class="btn btn-small btn-diamond" href="#cat-' + c.id + '">' + c.title + "（" + n + "）</a>";
    });
    html += "</nav>";
    CATS.forEach(function (c) {
      var items = refs.filter(function (r) { return r.cat === c.id; });
      if (!items.length) return;
      html += '<section class="ref-cat" id="cat-' + c.id + '"><h2 class="section-title">' + icon(c.icon) + c.title + "</h2><p>" + c.desc + "</p>";
      if (c.id === "switch") {
        html += '<ul class="cmd-cards">';
        items.forEach(function (r) {
          var b = basicOf(r);
          html += '<li><a class="cmd-card" href="reference.html?id=' + r.id + '"><span class="cmd-name">' + esc(r.name) +
            '<span class="cmd-read">' + esc(r.read || "") + '</span></span><span class="cmd-what">' + r.what + "</span>" +
            '<span class="cmd-meta">' + (b ? '<span class="lv-chip">きほん レベル' + b.level + "</span>" : "") +
            (r.status === "unknown" ? '<span class="unverified">【じっきで たしかめる】</span>' : "") + "</span></a></li>";
        });
        html += "</ul>";
      } else {
        html += '<ul class="ref-names">';
        items.forEach(function (r) {
          html += '<li><code class="big">' + esc(r.name) + "</code><span>" + r.reason + "</span>" + (r.status === "unknown" ? '<span class="unverified">【たしかめて いない】</span>' : "") + "</li>";
        });
        html += "</ul>";
      }
      html += "</section>";
    });
    list.innerHTML = html;
  }

  /* ====== くわしい ページ ====== */
  var detail = document.getElementById("reference-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id");
    var r = id && find(id);
    if (!id) { detail.hidden = true; return; }
    if (list) list.hidden = true;
    var top = document.getElementById("ref-top");
    if (top) top.hidden = true;
    if (!r || r.cat !== "switch") {
      detail.innerHTML = '<div class="guide"><p>' + (r ? esc(r.name) + " は Switch では つかえないよ。 " + r.reason : "その コマンドは みつからないよ。") + "</p></div>" +
        '<p><a class="btn btn-diamond" href="reference.html">' + icon("book-open") + "<span>大ずかんの いちらんへ</span></a></p>";
      window.SiteParts && window.SiteParts.init(detail);
      return;
    }
    document.title = r.name + "｜コマンド大ずかん｜" + (data.siteName || "");
    var crumb = document.querySelector('.breadcrumb [aria-current="page"]');
    if (crumb) crumb.textContent = r.name;
    var b = basicOf(r);
    var h = '<h1 class="cmd-title">' + esc(r.name) + ' <span class="cmd-read">' + esc(r.read || "") + "</span></h1>";
    if (r.alias) h += "<p>べつの かきかた：<code>" + esc(r.alias) + "</code></p>";
    h += '<div class="guide"><p>' + r.what + "</p></div>";
    if (b) h += '<p><a class="btn btn-grass" href="command.html?id=' + b.id + '">' + icon("arrow-left") + "<span>かんたんな せつめいに もどる（レベル" + b.level + "）</span></a></p>";

    h += "<h2>かきかたの パターン</h2>";
    (r.patterns || []).forEach(function (p, i) {
      h += '<div class="pattern"><p class="pattern-no">パターン ' + (i + 1) + '</p><p class="pattern-syntax"><code>' + esc(p.syntax) + "</code></p>" +
        (p.kid ? '<p class="pattern-kid">' + p.kid + "</p>" : "") + "</div>";
    });
    if (r.args && r.args.length) {
      h += "<h2>ひきすう（ぜんぶ）</h2><ul class=\"arg-list\">";
      r.args.forEach(function (a) {
        h += "<li><code>" + esc(a.name) + "</code>" + (a.optional ? '<span class="opt-chip">しょうりゃく できる</span>' : "") + "<br>" + a.desc + "</li>";
      });
      h += "</ul>";
    }
    if (r.examples && r.examples.length) {
      h += "<h2>れいぶん</h2>";
      r.examples.forEach(function (ex, i) {
        h += '<div class="example"><p class="example-no">れい ' + (i + 1) + '</p><div class="tiles" data-cmd="' + esc(ex.cmd) + '"></div>' +
          '<p class="example-result">' + icon("arrow-right") + "<span>" + ex.result + "</span></p></div>";
      });
    }
    if (r.careful) h += '<div class="box box-alert"><p class="box-title">きをつけること</p><p>' + r.careful + "</p></div>";
    var rel = (r.related || []).map(find).filter(Boolean);
    if (rel.length) {
      h += '<h2>かんけいする コマンド</h2><p class="rel-links">';
      rel.forEach(function (x) { h += '<a class="btn btn-diamond btn-small" href="reference.html?id=' + x.id + '">' + esc(x.name) + "</a>"; });
      h += "</p>";
    }
    h += '<details class="box parents-box no-yomi"><summary>【保護者向け】正式な構文・確認状況</summary><ul class="syntax-list">';
    (r.patterns || []).forEach(function (p) { h += "<li><code>" + esc(p.syntax) + "</code></li>"; });
    h += "</ul><p><strong>必要な権限</strong>：" + esc(r.permission || "Game Directors") + "。チート：" + (r.cheats ? "必要" : "不要") + "</p>";
    if (r.note) h += "<p><strong>メモ</strong>：" + esc(r.note) + "</p>";
    h += '<p><strong>確認状況</strong>：<span class="status status-' + r.status + '">' + STATUS[r.status] + "</span></p>";
    h += '<p><strong>公式ページ</strong>：<code class="url">' + esc(r.url) + '</code> <button type="button" class="btn btn-small" data-copy="' + esc(r.url) + '">URLをコピー</button></p></details>';
    var idx = refs.filter(function (x) { return x.cat === "switch"; });
    var k = idx.indexOf(r);
    h += '<nav class="pager" aria-label="まえと つぎ">';
    if (k > 0) h += '<a class="btn btn-small" href="reference.html?id=' + idx[k - 1].id + '">' + icon("arrow-left") + "<span>" + esc(idx[k - 1].name) + "</span></a>";
    h += '<a class="btn btn-small" href="reference.html">' + icon("list-box") + "<span>いちらん</span></a>";
    if (k < idx.length - 1) h += '<a class="btn btn-small" href="reference.html?id=' + idx[k + 1].id + '"><span>' + esc(idx[k + 1].name) + "</span>" + icon("arrow-right") + "</a>";
    h += "</nav>";
    detail.innerHTML = h;
    window.SiteParts && window.SiteParts.init(detail);
    detail.addEventListener("click", function (e) {
      var bt = e.target.closest("[data-copy]");
      if (!bt || !navigator.clipboard) return;
      navigator.clipboard.writeText(bt.getAttribute("data-copy")).then(function () { bt.textContent = "コピーしました"; });
    });
  }
})();
