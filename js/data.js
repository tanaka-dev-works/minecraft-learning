/* サイトのデータは ここに まとめる（fetch を使わないので file:// でも動く）。
   形は docs/DESIGN.md 5章。コマンド・作品・クイズはフェーズ3以降で足す。
   title / goal は子ども向けの文で、<ruby> をふくむ HTML。 */
window.SITE_DATA = {
  siteName: "マイクラ コマンド ぼうけん", // 仮の名前（ここを かえると 全ページの ヘッダーが かわる）

  /* あんないキャラ（仮）。見た目は images/guide.svg、名前は name を かえれば 全ページで かわる */
  guide: {
    name: "ブロボ",
    image: "images/guide.svg",
    images: { happy: "images/guide-happy.svg" }
  },

  levels: [
    {
      id: 1,
      title: "コマンドを うって みよう",
      goal: "チャットで あさに したり はれに したり できる",
      page: "pages/level1.html",
      ready: false
    },
    {
      id: 2,
      title: "ばしょと あいてを きめよう",
      goal: "<ruby>目<rt>め</rt></ruby>の <ruby>前<rt>まえ</rt></ruby>に ブロックを おける",
      page: "pages/level2.html",
      ready: false
    },
    {
      id: 3,
      title: "コマンドブロックを うごかそう",
      goal: "ボタンを おすと ダイヤモンドが <ruby>出<rt>で</rt></ruby>る",
      page: "pages/level3.html",
      ready: false
    },
    {
      id: 4,
      title: "めいれいを つなげよう",
      goal: "じゅんばんに うごく テレポート そうちを つくる",
      page: "pages/level4.html",
      ready: false
    },
    {
      id: 5,
      title: "ずっと <ruby>見<rt>み</rt></ruby>はらせよう",
      goal: "ちかづくと ひらく ドアを つくる",
      page: "pages/level5.html",
      ready: false
    },
    {
      id: 6,
      title: "じぶんの ゲームを つくろう",
      goal: "<ruby>点<rt>てん</rt></ruby>すうを かぞえる ミニゲームを つくる",
      page: "pages/level6.html",
      ready: false
    }
  ],

  /* ページの 一覧（トップの メニュー・さがす・パンくずで つかう）。ready:false は 「もうすぐ」と 出る。
     menu: lookup=しらべる / parents=おうちの人へ */
  pages: [
    { id: "commands", title: "コマンドずかん", href: "pages/commands.html", menu: "lookup", icon: "book-open", color: "btn-diamond", yomi: ["こまんど", "ずかん", "いちらん"], sub: "レベルごとの コマンド", ready: true },
    { id: "syntax", title: "コマンドの かきかた", href: "pages/syntax.html", menu: "lookup", icon: "keyboard", color: "btn-diamond", yomi: ["かきかた", "きーぼーど", "えいすう", "きごう", "あいてむの なまえ"], sub: "キーボード・きごう・アイテムの なまえ", ready: true },
    { id: "selectors", title: "ばしょと あいて", href: "pages/selectors.html", menu: "lookup", icon: "map-pin", color: "btn-diamond", yomi: ["ざひょう", "せれくたー", "ばしょ", "あいて", "@p", "~"], sub: "ざひょうと @p @s など", ready: true },
    { id: "command-blocks", title: "コマンドブロックずかん", href: "pages/command-blocks.html", menu: "lookup", icon: "blocks", color: "btn-diamond", yomi: ["こまんどぶろっく", "いんぱるす", "ちぇーん", "りぴーと"], sub: "インパルス・チェーン・リピート", ready: false },
    { id: "troubleshooting", title: "トラブル かいけつ", href: "pages/troubleshooting.html", menu: "lookup", icon: "bug", color: "btn-sky", yomi: ["とらぶる", "うごかない", "こまった", "でばっぐ"], sub: "うごかない ときは ここ", ready: false },
    { id: "errors", title: "エラーずかん", href: "pages/errors.html", menu: "lookup", icon: "warning-diamond", color: "btn-sky", yomi: ["えらー", "あかい もじ"], sub: "あかい もじが 出たら", ready: false },
    { id: "quiz", title: "クイズ", href: "pages/quiz.html", menu: "lookup", icon: "circle-question", color: "btn-sky", yomi: ["くいず", "もんだい"], sub: "レベルごとの もんだい", ready: false },
    { id: "programming", title: "プログラミングって なに？", href: "pages/programming.html", menu: "lookup", icon: "gamepad", color: "btn-sky", yomi: ["ぷろぐらみんぐ", "めいれい", "じゅんばん", "もし", "くりかえし"], sub: "まとめ", ready: false },
    { id: "cheatsheet", title: "はやみひょう（コマンド）", href: "pages/cheatsheet.html", menu: "lookup", icon: "list-box", color: "btn-grass", yomi: ["はやみひょう", "まとめ"], sub: "1まいで ぜんぶ", ready: false },
    { id: "cheatsheet-blocks", title: "はやみひょう（ブロックの せってい）", href: "pages/cheatsheet-blocks.html", menu: "lookup", icon: "list-box", color: "btn-grass", yomi: ["はやみひょう", "せってい"], sub: "コマンドブロックの せってい", ready: false },
    { id: "reference", title: "コマンド大ずかん", href: "pages/reference.html", menu: "lookup", icon: "book-open", color: "btn-grass", yomi: ["だいずかん", "おうよう", "ぜんぶ"], sub: "もっと しりたい ひとへ", ready: false },
    { id: "dont", title: "やっては いけない コマンド", href: "pages/dont.html", menu: "lookup", icon: "warning-diamond", color: "btn-dirt", yomi: ["だめ", "あぶない", "ちゅうい", "やってはいけない"], sub: "まもって あそぼう", ready: true },
    { id: "stamps", title: "スタンプちょう", href: "pages/stamps.html", menu: "lookup", icon: "trophy", color: "btn-dirt", yomi: ["すたんぷ"], sub: "あつめた スタンプ", ready: true },
    { id: "start", title: "はじめに（ワールドの準備）", href: "pages/start.html", menu: "parents", icon: "gamepad", color: "btn-grass", yomi: ["じゅんび", "ちーと", "わーるど"], sub: "チート・コマンドブロックの入手", ready: true },
    { id: "parents", title: "おうちの人へ（安全・声かけ）", href: "pages/parents.html", menu: "parents", icon: "users", color: "btn-grass", yomi: ["ほごしゃ", "あんぜん", "みまもり"], sub: "安全の設定・レベルごとの声かけ", ready: true },
    { id: "checklist", title: "実機チェックリスト", href: "pages/checklist.html", menu: "parents", icon: "check", color: "btn-grass", yomi: ["ちぇっくりすと", "じっき"], sub: "Switch で試した記録", ready: false }
  ],

  commands: [],
  works: [],
  quizzes: []
};
