/* クイズの もんだい（レベルごとに 3もん）。答えは choices の なんばんめ（0から）。
   type：meaning=いみ / syntax=かきかた / predict=どうなる / bug=まちがいさがし / think=じぶんで やってみる */
window.SITE_DATA.quizzes = [
  /* レベル1 */
  { level: 1, type: "meaning", q: "<p>この コマンドを うつと どうなる？</p>", tiles: "/time set night",
    choices: ["<ruby>朝<rt>あさ</rt></ruby>に なる", "よるに なる", "<ruby>雨<rt>あめ</rt></ruby>が ふる"], answer: 1,
    hint: "night は えいごで 「よる」 だよ。", why: "night（ナイト）は よる。 day（デイ）なら <ruby>朝<rt>あさ</rt></ruby>に なるよ。" },
  { level: 1, type: "syntax", q: "<p>はれに したい。 ただしい かきかたは どれ？</p>",
    choices: ["<code>weather clear</code>", "<code>/weather clear</code>", "<code>/weatherclear</code>"], answer: 1,
    hint: "コマンドの さいしょには なにが いるかな？ ことばと ことばの あいだは？", why: "さいしょに / 、 ことばの あいだに スペース。 これが コマンドの きまりだよ。" },
  { level: 1, type: "bug", q: "<p>オンラインで <code>time set day</code> と うって おくったら、 <ruby>朝<rt>あさ</rt></ruby>に ならずに チャットに <ruby>出<rt>で</rt></ruby>た。 なにが いけなかった？</p>",
    choices: ["スペースが おおすぎた", "さいしょの / を わすれた", "えいごが おおもじだった"], answer: 1,
    hint: "コマンドは なにから はじまるかな？", why: "/ が ないと ふつうの チャットに なって、 みんなに <ruby>見<rt>み</rt></ruby>えて しまうよ。 おくる まえに さいしょを たしかめよう。" },

  /* レベル2 */
  { level: 2, type: "predict", q: "<p>この コマンドを うつと、 じぶんは どこに いく？</p>", tiles: "/tp @s ~ ~10 ~",
    choices: ["10マス <ruby>上<rt>うえ</rt></ruby>", "10マス <ruby>前<rt>まえ</rt></ruby>", "X=10 の ばしょ"], answer: 0,
    hint: "まんなかの かずは X・Y・Z の どれ？ Y は なにを あらわす？", why: "2ばんめは Y（たかさ）。 ~10 は 「いまより 10マス <ruby>上<rt>うえ</rt></ruby>」 だよ。" },
  { level: 2, type: "meaning", q: "<p><code>@p</code> は だれの こと？</p>",
    choices: ["じぶん", "みんな", "いちばん ちかい <ruby>人<rt>ひと</rt></ruby>"], answer: 2,
    hint: "p は 「プレイヤー」。 コマンドブロックで よく つかうよ。", why: "@p は いちばん ちかい <ruby>人<rt>ひと</rt></ruby>。 @s は じぶん、 @a は みんな。" },
  { level: 2, type: "bug", q: "<p><code>/give @s daimond</code> と うったら エラーに なった。 どう なおす？</p>",
    choices: ["daimond を diamond に する", "@s を @a に する", "さいごに 1 を つける"], answer: 0,
    hint: "アイテムの なまえを 1もじずつ くらべて みよう。", why: "なまえが 1もじ でも ちがうと マイクラは わからない。 「アイテムの なまえ たいおうひょう」で しらべられるよ。" },

  /* レベル3 */
  { level: 3, type: "meaning", q: "<p>インパルスの コマンドブロックは、 いつ うごく？</p>",
    choices: ["ずっと うごきつづける", "ボタンなどで しんごうが きた ときに 1かい", "よるに なった とき"], answer: 1,
    hint: "インパルスは オレンジいろ。 「1かいだけ」の ブロックだよ。", why: "インパルスは しんごう（レッドストーン）が きた ときに 1かい だけ うごく。 ボタンを おすたびに 1かい。" },
  { level: 3, type: "bug", q: "<p>コマンドブロックに <code>/give @s diamond</code> と いれて ボタンを おしたけど、 ダイヤが もらえない。 どこを なおす？</p>",
    choices: ["@s を @p に する", "diamond を おおもじに する", "ボタンを 2かい おす"], answer: 0,
    hint: "コマンドブロックから <ruby>見<rt>み</rt></ruby>て 「じぶん」は だれ？", why: "コマンドブロックが うつと @s は 「コマンドブロック じしん」に なって しまう。 @p（いちばん ちかい <ruby>人<rt>ひと</rt></ruby>）に しよう。" },
  { level: 3, type: "think", q: "<p>コマンドブロックの なかみを <code>/give @p bread 3</code> に かえて、 ボタンを おして みよう。 パンが 3こ もらえたら 「やって みた！」を おしてね。</p>",
    why: "コマンドを かえるだけで、 おなじ そうちが ちがう うごきを するね。 これが プログラミングの おもしろい ところ。" }
];
