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
    why: "コマンドを かえるだけで、 おなじ そうちが ちがう うごきを するね。 これが プログラミングの おもしろい ところ。" },
  /* レベル4 */
  { level: 4, type: "meaning", q: "<p>チェーン（みどり）の コマンドブロックは いつ うごく？</p>",
    choices: ["つながって いる まえの ブロックが うごいた あと", "ボタンを おした ときだけ", "よるに なった とき"], answer: 0,
    hint: "チェーンは 「くさり」の いみ。 くさりで つながって いるよ。", why: "チェーンは まえの ブロックに つづいて うごく。 だから じゅんばんに めいれいを うごかせるんだ。" },
  { level: 4, type: "bug", q: "<p>1ばんは うごくのに、 2ばんの チェーンが うごかない。 いちばん あやしいのは？</p>",
    choices: ["1ばんの やじるしが 2ばんを むいて いない", "ボタンが <ruby>石<rt>いし</rt></ruby>で できて いる", "2ばんの コマンドが みじかい"], answer: 0,
    hint: "コマンドブロックの やじるしは なにを あらわして いたかな？", why: "やじるしの さきに ある ブロックに つながる。 チェーンは 「つねに オン」にも しようね。" },
  { level: 4, type: "predict", q: "<p>1ばん <code>/title @p title A</code> → 2ばん <code>/title @p title B</code> の じゅんに つなげた。 さいごに <ruby>画面<rt>がめん</rt></ruby>に のこるのは？</p>",
    choices: ["A", "B", "A と B が ならぶ"], answer: 1,
    hint: "あとから うごいた ほうは どっち？", why: "1 → 2 の じゅんに うごくので、 あとの B に かきかわるよ。 じゅんばんが だいじ！" },

  /* レベル5 */
  { level: 5, type: "meaning", q: "<p>リピート（むらさき）を 「つねに オン」に すると どうなる？</p>",
    choices: ["1かいだけ うごく", "ずっと くりかえし うごく", "うごかない"], answer: 1,
    hint: "リピートは えいごで 「くりかえす」。", why: "1びょうに 20かいも くりかえす。 だから 「ずっと <ruby>見<rt>み</rt></ruby>はる」 ことが できるよ。" },
  { level: 5, type: "meaning", q: "<p>「じょうけんつき」の チェーンは どんな ときに うごく？</p>",
    choices: ["いつでも", "まえの ブロックが せいこう した ときだけ", "まえの ブロックが しっぱい した ときだけ"], answer: 1,
    hint: "「じょうけん」は 「もし 〜 なら」 だったね。", why: "まえの ブロックが せいこう（たとえば ちかくに <ruby>人<rt>ひと</rt></ruby>が いた）したら うごく。 これが 「もし〜なら」。" },
  { level: 5, type: "bug", q: "<p>リピートに <code>/summon pig</code> を いれたら ブタが どんどん ふえて とまらない。 まず なにを する？</p>",
    choices: ["リピートの コマンドブロックを こわす", "もっと ブタを よぶ", "<code>/kill @e</code> を うつ"], answer: 0,
    hint: "もとを とめないと、 ずっと ふえつづけるよ。 /kill @e は やっては いけない コマンド だったね。", why: "まず もとの リピートを こわして とめる。 ブタを けすなら <code>/kill @e[type=pig]</code> のように しゅるいを きめよう。" },

  /* レベル6 */
  { level: 6, type: "meaning", q: "<p><code>/scoreboard objectives add point dummy</code> は なにを する コマンド？</p>",
    choices: ["point と いう <ruby>点<rt>てん</rt></ruby>すうの はこを つくる", "<ruby>点<rt>てん</rt></ruby>すうを 1 ふやす", "<ruby>点<rt>てん</rt></ruby>すうを けす"], answer: 0,
    hint: "add は 「くわえる」。 objectives は 「<ruby>点<rt>てん</rt></ruby>すうの しゅるい」だよ。", why: "さいしょに はこを つくって おかないと、 <ruby>点<rt>てん</rt></ruby>すうを ふやせないよ。" },
  { level: 6, type: "syntax", q: "<p>「point が 10 いじょうの <ruby>人<rt>ひと</rt></ruby>」を えらぶ ただしい かきかたは？</p>",
    choices: ["<code>@p[scores={point=10..}]</code>", "<code>@p[point=10]</code>", "<code>@p[scores=point10]</code>"], answer: 0,
    hint: "scores= の あとは { } で かこむよ。 「いじょう」は .. （てん 2つ）。", why: "10.. は 「10 いじょう」。 ..10 なら 「10 いか」だよ。" },
  { level: 6, type: "think", q: "<p>ボタン ラリーの かちの <ruby>点<rt>てん</rt></ruby>すうを 5 から 3 に かえて あそんで みよう。 どこを かえれば いいかな？ できたら 「やって みた！」。</p>",
    why: "6ばんの <code>point=5..</code> を <code>point=3..</code> に かえれば いいね。 かずを かえるだけで ゲームの むずかしさが かわる！" }
];
