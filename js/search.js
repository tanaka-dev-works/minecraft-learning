/* サイト内検索（ライブラリなし）
   ・入力は NFKC で 全角/半角を そろえ、カタカナを ひらがなに、英字を こもじに して 部分一致
   ・コマンド（基本編・応用編）と ページ（SITE_DATA.pages）を さがす */
(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var icon = window.PixelIcon || function () { return ""; };
  var MAX = 8;

  function norm(s) {
    s = String(s || "").normalize ? String(s || "").normalize("NFKC") : String(s || "");
    s = s.replace(/<[^>]*>/g, " ").replace(/<rt>.*?<\/rt>/g, "");
    s = s.toLowerCase();
    // カタカナ → ひらがな
    s = s.replace(/[ァ-ヶ]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); });
    return s.replace(/\s+/g, "");
  }
  function plain(html) {
    // ふりがなは 読みを のこす（「朝(あさ)」→「朝あさ」で どちらでも ヒット）
    return String(html || "").replace(/<rt>(.*?)<\/rt>/g, "$1").replace(/<[^>]*>/g, "");
  }

  function buildIndex() {
    var items = [];
    (data.commands || []).forEach(function (c) {
      items.push({
        title: c.name, sub: plain(c.what), href: "pages/command.html?id=" + c.id, kind: "コマンド", icon: "book-open",
        keys: [c.id, c.name, c.read].concat(c.yomi || []).map(norm),
        body: norm(plain(c.what))
      });
    });
    (data.reference || []).forEach(function (r) {
      if (r.basic) return; // 基本編に あるものは 基本編を さきに 出す
      items.push({
        title: r.name, sub: plain(r.what || r.reason || ""), href: "pages/reference.html?id=" + r.id, kind: "大ずかん", icon: "book-open",
        keys: [r.id, r.name, r.read || ""].concat(r.yomi || []).map(norm),
        body: norm(plain(r.what || ""))
      });
    });
    (data.levels || []).filter(function (l) { return l.ready; }).forEach(function (l) {
      items.push({ title: "レベル" + l.id + "　" + plain(l.title), sub: plain(l.goal), href: l.page, kind: "レベル", icon: "flag",
        keys: ["れべる" + l.id, plain(l.title)].map(norm), body: norm(plain(l.goal)) });
    });
    (data.works || []).forEach(function (w) {
      items.push({ title: plain(w.title), sub: "レベル" + w.level + " の さくひん", href: w.href, kind: "さくひん", icon: "star",
        keys: [plain(w.title)].concat(w.yomi || []).map(norm), body: "" });
    });
    (data.pages || []).filter(function (p) { return p.ready; }).forEach(function (p) {
      items.push({
        title: plain(p.title), sub: plain(p.sub || ""), href: p.href, kind: "ページ", icon: p.icon || "article",
        keys: [p.title].concat(p.yomi || []).map(function (k) { return norm(plain(k)); }),
        body: norm(plain(p.sub || ""))
      });
    });
    return items;
  }
  var INDEX = buildIndex();

  function search(q) {
    var nq = norm(q).replace(/^\//, "");
    if (!nq) return [];
    var scored = [];
    INDEX.forEach(function (it) {
      var score = 0;
      it.keys.forEach(function (k) {
        var kk = k.replace(/^\//, "");
        if (kk === nq) score = Math.max(score, 100);
        else if (kk.indexOf(nq) === 0) score = Math.max(score, 60);
        else if (kk.indexOf(nq) >= 0) score = Math.max(score, 40);
      });
      if (!score && it.body.indexOf(nq) >= 0) score = 10;
      if (score) scored.push({ it: it, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, MAX).map(function (s) { return s.it; });
  }
  window.SiteSearch = { search: search, norm: norm };

  var input = document.getElementById("search-input");
  var out = document.getElementById("search-results");
  if (!input || !out) return;
  var root = document.body.getAttribute("data-root") || ".";

  function render() {
    var q = input.value;
    var res = search(q);
    if (!q.trim()) { out.innerHTML = ""; return; }
    if (!res.length) {
      out.innerHTML = '<p class="search-none">みつからなかったよ。 ほかの ことばで さがそう。 （れい：てれぽーと、 tp、 あさ）</p>';
      return;
    }
    out.innerHTML = '<ul class="search-list">' + res.map(function (it) {
      return '<li><a class="search-card" href="' + root + "/" + it.href + '">' + icon(it.icon) +
        '<span><span class="search-kind">' + it.kind + '</span><span class="search-title">' + it.title +
        '</span><span class="search-sub">' + it.sub + "</span></span></a></li>";
    }).join("") + "</ul>";
  }
  input.addEventListener("input", render);
  var q0 = new URLSearchParams(location.search).get("q");
  if (q0) { input.value = q0; }
  render();
})();
