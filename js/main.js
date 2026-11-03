/* 共通の しくみ：ヘッダー・パンくず・フッターの差しこみ、よみあげ。
   各ページの <body> に次の属性をつける。
     data-root="."   … トップまでの相対パス（pages/ の中なら ".."）
     data-kids="true" … 子ども向けページ（よみあげボタンを出す）
     data-crumbs='[["しらべる","pages/search.html"],["いまのページ",""]]' … パンくず（トップは自動）
   file:// で開いても動くように、リンクはすべて相対パスで作る。 */
(function () {
  "use strict";

  var body = document.body;
  var root = body.getAttribute("data-root") || ".";
  var isKids = body.getAttribute("data-kids") === "true";
  var data = window.SITE_DATA || {};
  var siteName = data.siteName || "マイクラ コマンド ぼうけん";

  function url(path) {
    return root + "/" + path;
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* ---- 小さなドット絵アイコン（自作。外部の画像は使わない） ---- */
  var ICONS = {
    logo:
      '<svg class="logo" viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect width="8" height="8" fill="#7a4f2a"/><rect width="8" height="3" fill="#5fae3e"/>' +
      '<rect y="3" width="2" height="1" fill="#5fae3e"/><rect x="5" y="3" width="1" height="1" fill="#5fae3e"/>' +
      '<rect x="2" y="5" width="1" height="1" fill="#553518"/><rect x="6" y="6" width="1" height="1" fill="#553518"/>' +
      '<rect x="4" y="1" width="1" height="1" fill="#3f7d2c"/><rect x="1" y="0" width="1" height="1" fill="#3f7d2c"/></svg>',
    speaker:
      '<svg class="icon" viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges" fill="currentColor">' +
      '<rect x="0" y="3" width="2" height="2"/><rect x="2" y="2" width="1" height="4"/><rect x="3" y="1" width="1" height="6"/>' +
      '<rect x="5" y="3" width="1" height="2"/><rect x="6" y="2" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/>' +
      '<rect x="7" y="3" width="1" height="2"/></svg>',
    stop:
      '<svg class="icon" viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges" fill="currentColor">' +
      '<rect x="1" y="1" width="6" height="6"/></svg>'
  };
  window.SiteIcons = ICONS;

  /* ---- ヘッダー ---- */
  function buildHeader() {
    var header = el("header", { class: "site-header" });
    var wrap = el("div", { class: "wrap" });
    var title = el("a", { class: "site-title", href: url("index.html") }, ICONS.logo + "<span>" + siteName + "</span>");
    wrap.appendChild(title);
    var tools = el("div", { class: "header-tools" });
    if (window.PixelIcon) {
      tools.appendChild(el("a", { class: "btn btn-small btn-diamond", href: url("pages/search.html") }, window.PixelIcon("search") + "<span>さがす</span>"));
    }
    tools.appendChild(buildFuriganaButton());
    if (isKids) {
      var yomi = buildYomiageButton();
      if (yomi) tools.appendChild(yomi);
    }
    wrap.appendChild(tools);
    header.appendChild(wrap);
    body.insertBefore(header, body.firstChild);
  }

  /* ---- ふりがな ON/OFF（rt を CSS で かくすだけ）。子ども向けは さいしょ ON、保護者向けは OFF ---- */
  function buildFuriganaButton() {
    var P = window.Progress;
    var prefKey = isKids ? "furigana-kids" : "furigana-parents";
    var stored = P ? P.getPref(prefKey, null) : null;
    var on = stored === null ? isKids : stored;
    var btn = el("button", { type: "button", class: "btn btn-small btn-toggle", id: "furigana-toggle" });
    function render() {
      body.classList.toggle("no-furigana", !on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.innerHTML = "<span><ruby>字<rt>じ</rt></ruby></span><span>ふりがな " + (on ? "あり" : "なし") + "</span>";
    }
    btn.addEventListener("click", function () {
      on = !on;
      if (P) P.setPref(prefKey, on);
      render();
    });
    render();
    return btn;
  }

  /* ---- パンくず（トップ以外） ---- */
  function buildBreadcrumb() {
    var raw = body.getAttribute("data-crumbs");
    if (!raw) return;
    var crumbs;
    try { crumbs = JSON.parse(raw); } catch (e) { return; }
    var nav = el("nav", { class: "breadcrumb wrap", "aria-label": "いまの ばしょ" });
    var ol = el("ol");
    var items = [["トップ", "index.html"]].concat(crumbs);
    items.forEach(function (c, i) {
      var li = el("li");
      if (c[1] && i < items.length - 1) {
        li.appendChild(el("a", { href: url(c[1]) }, c[0]));
      } else {
        li.appendChild(el("span", { "aria-current": "page" }, c[0]));
      }
      ol.appendChild(li);
    });
    nav.appendChild(ol);
    var main = document.querySelector("main");
    if (main) main.parentNode.insertBefore(nav, main);
  }

  /* ---- フッター ---- */
  function buildFooter() {
    var footer = el("footer", { class: "site-footer" });
    footer.innerHTML =
      '<div class="wrap">' +
      "<p>このサイトは Mojang・Microsoft とは かんけいの ない、<ruby>非公式<rt>ひこうしき</rt></ruby>の しりょうです。</p>" +
      "<p>Minecraft は Mojang Synergies AB の<ruby>商標<rt>しょうひょう</rt></ruby>です。</p>" +
      "</div>";
    body.appendChild(footer);
  }

  /* ---- よみあげ（ブラウザ標準の speechSynthesis。日本語の声） ----
     ・ふりがなは「読み」をつかう（<ruby>漢字<rt>かんじ</rt></ruby> → かんじ）
     ・コマンドの文字タイル（.tiles）や .no-yomi は読まない */
  var speaking = false;

  function textForSpeech(node) {
    var clone = node.cloneNode(true);
    clone.querySelectorAll("script, style, .tiles, .no-yomi, code, [aria-hidden='true']").forEach(function (n) {
      n.parentNode.removeChild(n);
    });
    clone.querySelectorAll("ruby").forEach(function (r) {
      var rt = r.querySelector("rt");
      var reading = rt ? rt.textContent : r.textContent;
      r.parentNode.replaceChild(document.createTextNode(reading), r);
    });
    // ブロック要素の区切りで少し間をあける
    clone.querySelectorAll("p, li, h1, h2, h3, .name, .goal, .state").forEach(function (n) {
      n.appendChild(document.createTextNode("。"));
    });
    return clone.textContent.replace(/\s+/g, " ").replace(/。\s*。/g, "。").trim();
  }

  function pickJapaneseVoice() {
    var voices = window.speechSynthesis.getVoices() || [];
    for (var i = 0; i < voices.length; i++) {
      if (/^ja/i.test(voices[i].lang)) return voices[i];
    }
    return null;
  }

  function buildYomiageButton() {
    if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") return null;
    var btn = el("button", { type: "button", class: "btn btn-sky", "aria-pressed": "false", id: "yomiage" });
    function render() {
      btn.innerHTML = speaking ? ICONS.stop + "<span>とめる</span>" : ICONS.speaker + "<span>よみあげ</span>";
      btn.setAttribute("aria-pressed", speaking ? "true" : "false");
    }
    render();
    btn.addEventListener("click", function () {
      var synth = window.speechSynthesis;
      if (speaking) {
        synth.cancel();
        speaking = false;
        render();
        return;
      }
      var target = document.querySelector("[data-yomi]") || document.querySelector("main");
      if (!target) return;
      var u = new SpeechSynthesisUtterance(textForSpeech(target));
      u.lang = "ja-JP";
      u.rate = 0.9;
      var v = pickJapaneseVoice();
      if (v) u.voice = v;
      u.onend = u.onerror = function () { speaking = false; render(); };
      synth.cancel();
      synth.speak(u);
      speaking = true;
      render();
    });
    // ページを離れるときは止める
    window.addEventListener("pagehide", function () { window.speechSynthesis.cancel(); });
    return btn;
  }
  window.SiteSpeech = { textForSpeech: textForSpeech };

  buildHeader();
  buildBreadcrumb();
  buildFooter();
})();
