/* サイトのデータは ここに まとめる（fetch を使わないので file:// でも動く）。
   形は docs/DESIGN.md 5章。コマンド・作品・クイズはフェーズ3以降で足す。
   title / goal は子ども向けの文で、<ruby> をふくむ HTML。 */
window.SITE_DATA = {
  siteName: "マイクラ コマンド ぼうけん",

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

  commands: [],
  works: [],
  quizzes: []
};
