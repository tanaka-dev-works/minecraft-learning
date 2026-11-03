/* クイズ：答えは すべて タップで えらぶ。まちがえても ヒントが 出て、なんどでも やりなおせる。
   <div class="quiz" data-level="1"></div>  … そのレベルの もんだいを ぜんぶ
   quiz.html?level=1 でも ひらける */
(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var all = data.quizzes || [];
  var icon = window.PixelIcon || function () { return ""; };
  var TYPE = {
    meaning: "いみを あてよう",
    syntax: "ただしい かきかたは？",
    predict: "どうなるかな？",
    bug: "まちがいさがし",
    think: "じぶんで やってみよう"
  };

  function shuffleKeep(choices) {
    // えらぶ じゅんばんは データの まま（おぼえやすいように まぜない）
    return choices.map(function (c, i) { return { html: c, i: i }; });
  }

  function render(box) {
    var level = box.getAttribute("data-level");
    var qs = all.filter(function (q) { return String(q.level) === String(level); });
    if (!qs.length) { box.innerHTML = "<p>まだ もんだいが ないよ。</p>"; return; }
    var right = 0;
    var html = "";
    qs.forEach(function (q, n) {
      html += '<section class="quiz-card" data-q="' + n + '">' +
        '<p class="quiz-type">もんだい ' + (n + 1) + "　" + (TYPE[q.type] || "") + "</p>" +
        '<div class="quiz-q">' + q.q + "</div>" +
        (q.tiles ? '<div class="tiles" data-cmd="' + q.tiles.replace(/"/g, "&quot;") + '"></div>' : "");
      if (q.type === "think") {
        html += '<button type="button" class="btn btn-grass quiz-did">' + icon("check") + "<span>やって みた！</span></button>";
      } else {
        html += '<div class="quiz-choices">';
        shuffleKeep(q.choices).forEach(function (c) {
          html += '<button type="button" class="btn quiz-choice" data-i="' + c.i + '">' + c.html + "</button>";
        });
        html += "</div>";
      }
      html += '<div class="quiz-feedback" aria-live="polite"></div></section>';
    });
    html += '<div class="quiz-total" aria-live="polite"></div>';
    box.innerHTML = html;
    if (window.SiteParts) window.SiteParts.init(box);

    var total = box.querySelector(".quiz-total");
    function updateTotal() {
      if (right === qs.length) {
        total.innerHTML = '<div class="guide" data-mood="happy"><p>ぜんぶ せいかい！ よく できました。</p></div>';
        if (window.SiteParts) window.SiteParts.init(total);
      }
    }

    box.addEventListener("click", function (e) {
      var card = e.target.closest(".quiz-card");
      if (!card || card.classList.contains("is-right")) return;
      var q = qs[Number(card.getAttribute("data-q"))];
      var fb = card.querySelector(".quiz-feedback");
      if (e.target.closest(".quiz-did")) {
        card.classList.add("is-right");
        fb.innerHTML = '<p class="quiz-ok">' + icon("check") + "<span>すごい！ じぶんで ためせたね。</span></p>" + (q.why ? "<p>" + q.why + "</p>" : "");
        right++; updateTotal();
        return;
      }
      var btn = e.target.closest(".quiz-choice");
      if (!btn) return;
      var i = Number(btn.getAttribute("data-i"));
      if (i === q.answer) {
        card.classList.add("is-right");
        btn.classList.add("is-correct");
        card.querySelectorAll(".quiz-choice").forEach(function (b) { b.disabled = b !== btn; });
        fb.innerHTML = '<p class="quiz-ok">' + icon("check") + "<span>せいかい！</span></p>" + (q.why ? '<div class="box box-why"><p class="box-title">なぜ？</p><p>' + q.why + "</p></div>" : "");
        right++; updateTotal();
      } else {
        btn.classList.add("is-wrong");
        btn.disabled = true;
        fb.innerHTML = '<p class="quiz-ng">' + icon("reload") + "<span>おしい！ もう いちど えらんでね。</span></p>" + (q.hint ? '<div class="box box-hint"><p class="box-title">ヒント</p><p>' + q.hint + "</p></div>" : "");
      }
      if (window.SiteParts) window.SiteParts.init(fb);
    });
  }

  document.querySelectorAll(".quiz[data-level]").forEach(render);
  window.SiteQuiz = { render: render };
})();
