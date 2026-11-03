/* 基本編のコマンド（23こ）。data.js の あとに 読みこむ。
   形は docs/DESIGN.md 5章。構文と権限は docs/OFFICIAL-REFERENCE.md（Microsoft Learn）で確認した。
   form の k（しゅるい）：cmd=コマンドの名前 / who=あいて / where=ばしょ / thing=もの / num=かず / word=ことば・せってい
   where（どこで つかう）：chat=チャット / block=コマンドブロック / both=どちらでも
   status：doc=公式ドキュメントで確認済 / device=実機で確認済 / unknown=未確認
   ※ 例文に出てくる音・パーティクルの名前は、公式ページに一覧がないので【要実機確認】（parents.note に書く） */
(function () {
  "use strict";
  var URL = "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/";
  var V = "?view=minecraft-bedrock-stable";
  function u(name) { return URL + name + V; }

  window.SITE_DATA.commands = [
    /* ---------------- レベル1 ---------------- */
    {
      id: "time", name: "/time", read: "タイム",
      yomi: ["たいむ", "じかん", "あさ", "よる", "ひる", "time", "day", "night"],
      level: 1, where: "both",
      what: "<ruby>朝<rt>あさ</rt></ruby>や よるに できる。 マイクラの なかの じかんを かえる コマンド。",
      form: [["/time", "cmd"], ["set", "word"], ["day", "word"]],
      args: [
        { name: "set（セット）", desc: "じかんを 「〜に する」 という いみ。" },
        { name: "day（デイ）", desc: "<ruby>朝<rt>あさ</rt></ruby>。 ほかに noon（おひる）、 night（よる）、 midnight（まよなか）も つかえる。" }
      ],
      examples: [
        { cmd: "/time set day", result: "<ruby>朝<rt>あさ</rt></ruby>に なる。" },
        { cmd: "/time set night", result: "よるに なる。" },
        { cmd: "/time set noon", result: "おひるに なる。" }
      ],
      result: "<ruby>空<rt>そら</rt></ruby>の いろが すぐに かわる。",
      careful: "ともだちの ワールドでは うたないでね。 みんなの じかんが かわって しまうよ。",
      related: ["weather", "gamerule"],
      parents: {
        syntax: ["/time set <time: TimeSpec>", "/time set <amount: int>", "/time add <amount: int>", "/time query <daytime|gametime|day>"],
        cheats: true, note: "TimeSpec は day, sunrise, noon, sunset, night, midnight。", url: u("time")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "weather", name: "/weather", read: "ウェザー",
      yomi: ["うぇざー", "てんき", "はれ", "あめ", "かみなり", "weather", "clear", "rain"],
      level: 1, where: "both",
      what: "<ruby>天気<rt>てんき</rt></ruby>を かえる コマンド。 はれ、 <ruby>雨<rt>あめ</rt></ruby>、 かみなりに できる。",
      form: [["/weather", "cmd"], ["clear", "word"]],
      args: [
        { name: "clear（クリア）", desc: "はれ。 rain（<ruby>雨<rt>あめ</rt></ruby>）、 thunder（かみなり）も つかえる。" },
        { name: "じかん（かず）", desc: "その <ruby>天気<rt>てんき</rt></ruby>が つづく じかん。 しょうりゃく できる。" }
      ],
      examples: [
        { cmd: "/weather clear", result: "はれに なる。" },
        { cmd: "/weather rain", result: "<ruby>雨<rt>あめ</rt></ruby>が ふる。" },
        { cmd: "/weather thunder", result: "かみなりが なる。" }
      ],
      result: "<ruby>空<rt>そら</rt></ruby>の ようすが かわる。",
      careful: "かみなりは ものに <ruby>火<rt>ひ</rt></ruby>が つくことが あるよ。 れんしゅう ワールドで ためそう。",
      related: ["time"],
      parents: {
        syntax: ["/weather <type: WeatherType> [duration: int]", "/weather query"],
        cheats: true, note: "WeatherType は clear, rain, thunder。", url: u("weather")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "say", name: "/say", read: "セイ",
      yomi: ["せい", "いう", "めっせーじ", "しゃべる", "say", "message"],
      level: 1, where: "both",
      what: "チャットに メッセージを <ruby>出<rt>だ</rt></ruby>す コマンド。",
      form: [["/say", "cmd"], ["hello", "word"]],
      args: [{ name: "メッセージ", desc: "<ruby>出<rt>だ</rt></ruby>したい ことば。 さいしょは えいごの こもじで うとう。" }],
      examples: [
        { cmd: "/say hello", result: "チャットに [じぶんの なまえ] hello と <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/say go", result: "チャットに go と <ruby>出<rt>で</rt></ruby>る。" }
      ],
      result: "チャット らんに ことばが <ruby>出<rt>で</rt></ruby>る。",
      careful: "/ を わすれると、 ふつうの チャットとして おくられるよ。 オンラインでは みんなに <ruby>見<rt>み</rt></ruby>えるので きをつけよう。",
      related: ["title"],
      parents: {
        syntax: ["/say <message: message>"],
        cheats: false, note: "チート不要。メッセージにセレクター（@p など）を入れると名前に置き換わる。", url: u("say")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "gamemode", name: "/gamemode", read: "ゲームモード",
      yomi: ["げーむもーど", "くりえいてぃぶ", "さばいばる", "もーど", "gamemode", "creative", "survival"],
      level: 1, where: "chat",
      what: "クリエイティブや サバイバルに きりかえる コマンド。",
      form: [["/gamemode", "cmd"], ["c", "word"]],
      args: [
        { name: "c（クリエイティブ）", desc: "とべる、 ブロックが いくらでも つかえる。 s は サバイバル。" },
        { name: "あいて", desc: "だれの モードを かえるか。 しょうりゃく すると じぶん。" }
      ],
      examples: [
        { cmd: "/gamemode c", result: "クリエイティブに なる。" },
        { cmd: "/gamemode s", result: "サバイバルに なる。" },
        { cmd: "/gamemode creative", result: "c と おなじ。 ながい かきかた。" }
      ],
      result: "あそびかたの モードが かわる。",
      careful: "コマンドブロックを つかう ときは クリエイティブに しておこう。",
      related: ["give"],
      parents: {
        syntax: ["/gamemode <gameMode: GameMode> [player: target]", "/gamemode <gameMode: int> [player: target]"],
        cheats: true, note: "c / s / a などの短縮形が使える（公式ページは GameMode 列挙のみ記載。短縮形の受付は【要実機確認】）。", url: u("gamemode")
      },
      status: "doc", checkedVersion: null
    },

    /* ---------------- レベル2 ---------------- */
    {
      id: "give", name: "/give", read: "ギブ",
      yomi: ["ぎぶ", "あげる", "もらう", "あいてむ", "give", "item"],
      level: 2, where: "both",
      what: "アイテムを もらえる コマンド。 あいてと ものの なまえを きめて うつ。",
      form: [["/give", "cmd"], ["@s", "who"], ["diamond", "thing"], ["5", "num"]],
      args: [
        { name: "あいて", desc: "@s（じぶん）、 @p（いちばん ちかい <ruby>人<rt>ひと</rt></ruby>） など。" },
        { name: "アイテムの なまえ", desc: "コマンドで つかう えいごの なまえ。 ダイヤモンドは diamond。" },
        { name: "かず", desc: "いくつ もらうか。 しょうりゃく すると 1こ。" }
      ],
      examples: [
        { cmd: "/give @s diamond", result: "ダイヤモンドが 1こ もらえる。" },
        { cmd: "/give @s diamond 5", result: "ダイヤモンドが 5こ もらえる。" },
        { cmd: "/give @p bread 3", result: "いちばん ちかい <ruby>人<rt>ひと</rt></ruby>が パンを 3こ もらう。" }
      ],
      result: "もちものに アイテムが ふえる。",
      careful: "アイテムの なまえを まちがえると エラーに なるよ。 なまえは 「コマンドの かきかた」の ページで しらべよう。",
      related: ["clear", "enchant"],
      parents: {
        syntax: ["/give <player: target> <itemName: Item> [amount: int] [data: int] [components: json]"],
        cheats: true, note: "", url: u("give")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "clear", name: "/clear", read: "クリア",
      yomi: ["くりあ", "けす", "かたづけ", "もちもの", "clear"],
      level: 2, where: "both",
      what: "もちものの アイテムを けす コマンド。 /give の はんたい。",
      form: [["/clear", "cmd"], ["@s", "who"], ["dirt", "thing"]],
      args: [
        { name: "あいて", desc: "だれの もちものか。 しょうりゃく すると じぶん。" },
        { name: "アイテムの なまえ", desc: "けしたい もの。 しょうりゃく すると <ruby>全部<rt>ぜんぶ</rt></ruby> きえる。" }
      ],
      examples: [
        { cmd: "/clear @s dirt", result: "もちものの <ruby>土<rt>つち</rt></ruby>だけ きえる。" },
        { cmd: "/clear", result: "もちものが <ruby>全部<rt>ぜんぶ</rt></ruby> きえる。" }
      ],
      result: "もちものから アイテムが きえる。",
      careful: "なまえを つけないと <ruby>全部<rt>ぜんぶ</rt></ruby> きえるよ。 だいじな ものを もって いる ときは うたないでね。",
      related: ["give"],
      parents: {
        syntax: ["/clear [player: target] [itemName: Item] [data: int] [maxCount: int]"],
        cheats: true, note: "引数なしで自分の全アイテムを消す。", url: u("clear")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "tp", name: "/tp", read: "テレポート",
      yomi: ["てれぽーと", "いどう", "わーぷ", "tp", "teleport"],
      level: 2, where: "both",
      what: "すきな ばしょへ いっしゅんで いどう できる コマンド。",
      form: [["/tp", "cmd"], ["@s", "who"], ["~ ~5 ~", "where"]],
      args: [
        { name: "あいて", desc: "だれを うごかすか。 しょうりゃく すると じぶん。" },
        { name: "ばしょ（X Y Z）", desc: "3つの かずで ばしょを きめる。 ~ は 「いまの ばしょから」 と いう いみ。" }
      ],
      examples: [
        { cmd: "/tp @s ~ ~5 ~", result: "5マス <ruby>上<rt>うえ</rt></ruby>に とぶ。" },
        { cmd: "/tp @s ~3 ~ ~", result: "X の むきに 3マス うごく。" },
        { cmd: "/tp @s 0 100 0", result: "X=0、 Y=100、 Z=0 の ばしょに いく。" }
      ],
      result: "いっしゅんで ばしょが かわる。",
      careful: "Y を ひくくすると じめんの なかに うまって しまうよ。 ~ を つかうと あんしん。",
      related: ["spawnpoint", "execute"],
      parents: {
        syntax: ["/teleport <destination: x y z> [checkForBlocks: Boolean]", "/teleport <victim: target> <destination: x y z> [checkForBlocks: Boolean]", "/teleport <victim: target> <destination: target> [checkForBlocks: Boolean]"],
        cheats: true, note: "公式名は /teleport。/tp は別名（公式ページに Aliases: /tp と記載）。facing・回転つきの書き方もある。", url: u("teleport")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "setblock", name: "/setblock", read: "セットブロック",
      yomi: ["せっとぶろっく", "ぶろっく", "おく", "setblock"],
      level: 2, where: "both",
      what: "ブロックを 1こ おく コマンド。 ばしょと ブロックの なまえを きめる。",
      form: [["/setblock", "cmd"], ["~ ~ ~2", "where"], ["gold_block", "thing"]],
      args: [
        { name: "ばしょ（X Y Z）", desc: "どこに おくか。 ~ ~ ~2 は 「Z の むきに 2マス さき」。" },
        { name: "ブロックの なまえ", desc: "おきたい ブロック。 金ブロックは gold_block。" }
      ],
      examples: [
        { cmd: "/setblock ~ ~ ~2 gold_block", result: "Z の むきに 2マス さきに <ruby>金<rt>きん</rt></ruby>ブロックが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/setblock ^ ^ ^2 diamond_block", result: "<ruby>目<rt>め</rt></ruby>の <ruby>前<rt>まえ</rt></ruby> 2マスに ダイヤモンドブロックが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/setblock ~ ~-1 ~ stone", result: "あしもとの ブロックが <ruby>石<rt>いし</rt></ruby>に なる。" }
      ],
      result: "えらんだ ばしょに ブロックが あらわれる。",
      careful: "そこに あった ブロックは きえて しまうよ。",
      related: ["fill", "testforblock"],
      parents: {
        syntax: ["/setblock <position: x y z> <tileName: Block> [blockStates] [oldBlockHandling: SetBlockMode]"],
        cheats: true, note: "SetBlockMode は replace, destroy, keep。^ ^ ^ はプレイヤーの向き基準のローカル座標。", url: u("setblock")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "summon", name: "/summon", read: "サモン",
      yomi: ["さもん", "よびだす", "どうぶつ", "もぶ", "summon"],
      level: 2, where: "both",
      what: "どうぶつや モブを よびだす コマンド。",
      form: [["/summon", "cmd"], ["pig", "thing"], ["~ ~ ~2", "where"]],
      args: [
        { name: "モブの なまえ", desc: "よびだしたい いきもの。 ブタは pig、 ネコは cat。" },
        { name: "ばしょ（X Y Z）", desc: "どこに だすか。 しょうりゃく すると じぶんの ばしょ。" }
      ],
      examples: [
        { cmd: "/summon pig", result: "ブタが 1ぴき <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/summon cat ~ ~ ~2", result: "すこし はなれた ばしょに ネコが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/summon chicken", result: "ニワトリが <ruby>出<rt>で</rt></ruby>る。" }
      ],
      result: "いきものが あらわれる。",
      careful: "リピートの コマンドブロックで つかうと、 とまらずに ふえつづけて ゲームが おもく なるよ。",
      related: ["kill"],
      parents: {
        syntax: ["/summon <entityType: EntityType> [spawnPos: x y z] [yRot] [xRot] [spawnEvent] [nameTag: string]", "/summon <entityType: EntityType> <nameTag: string> [spawnPos: x y z]"],
        cheats: true, note: "リピート＋常にアクティブでの使用は「やってはいけないコマンド」で注意。", url: u("summon")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "fill", name: "/fill", read: "フィル",
      yomi: ["ふぃる", "うめる", "ひろい", "はんい", "fill"],
      level: 2, where: "both",
      what: "ブロックを まとめて しきつめる コマンド。 2つの かどを きめる。",
      form: [["/fill", "cmd"], ["~1 ~ ~1", "where"], ["~3 ~2 ~3", "where"], ["glass", "thing"]],
      args: [
        { name: "はじめの かど（X Y Z）", desc: "はこの かどの 1つ。" },
        { name: "おわりの かど（X Y Z）", desc: "はんたいがわの かど。" },
        { name: "ブロックの なまえ", desc: "しきつめる ブロック。" }
      ],
      examples: [
        { cmd: "/fill ~1 ~ ~1 ~3 ~2 ~3 glass", result: "ちいさな ガラスの はこが できる。" },
        { cmd: "/fill ~-1 ~-1 ~-1 ~1 ~-1 ~1 gold_block", result: "あしもとが <ruby>金<rt>きん</rt></ruby>の ゆか（3×3）に なる。" }
      ],
      result: "はこの かたちに ブロックが ならぶ。",
      careful: "かずを おおきく しすぎると、 ワールドが こわれたり おもく なったり するよ。 さいしょは 5マス いないで ためそう。",
      related: ["setblock"],
      parents: {
        syntax: ["/fill <from: x y z> <to: x y z> <tileName: Block> [blockStates] [oldBlockHandling: FillMode]", "/fill <from> <to> <tileName> replace [replaceTileName: Block]"],
        cheats: true, note: "FillMode は outline, hollow, destroy, keep。一度に置ける数には上限がある（上限値は公式ページに記載なし【要実機確認】）。", url: u("fill")
      },
      status: "doc", checkedVersion: null
    },

    /* ---------------- レベル3 ---------------- */
    {
      id: "title", name: "/title", read: "タイトル",
      yomi: ["たいとる", "もじ", "おおきい", "がめん", "title"],
      level: 3, where: "both",
      what: "<ruby>画面<rt>がめん</rt></ruby>の まんなかに おおきく <ruby>文字<rt>もじ</rt></ruby>を <ruby>出<rt>だ</rt></ruby>す コマンド。",
      form: [["/title", "cmd"], ["@a", "who"], ["title", "word"], ["hello", "word"]],
      args: [
        { name: "あいて", desc: "だれの <ruby>画面<rt>がめん</rt></ruby>に <ruby>出<rt>だ</rt></ruby>すか。 @a は <ruby>全員<rt>ぜんいん</rt></ruby>。" },
        { name: "title（タイトル）", desc: "おおきい <ruby>文字<rt>もじ</rt></ruby>。 subtitle は その <ruby>下<rt>した</rt></ruby>の ちいさい <ruby>文字<rt>もじ</rt></ruby>、 actionbar は もちものの <ruby>上<rt>うえ</rt></ruby>。" },
        { name: "メッセージ", desc: "<ruby>出<rt>だ</rt></ruby>したい ことば。" }
      ],
      examples: [
        { cmd: "/title @s title hello", result: "じぶんの <ruby>画面<rt>がめん</rt></ruby>に hello と おおきく <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/title @a title welcome", result: "みんなの <ruby>画面<rt>がめん</rt></ruby>に welcome と <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/title @a actionbar go", result: "もちものの <ruby>上<rt>うえ</rt></ruby>に go と <ruby>出<rt>で</rt></ruby>る。" }
      ],
      result: "<ruby>文字<rt>もじ</rt></ruby>が すこしの あいだ <ruby>画面<rt>がめん</rt></ruby>に うかぶ。",
      careful: "subtitle だけでは <ruby>出<rt>で</rt></ruby>ないよ。 title と いっしょに つかおう。【要実機確認】",
      related: ["say", "playsound"],
      parents: {
        syntax: ["/title <player: target> <titleLocation: TitleSet> <titleText: message>", "/title <player: target> clear", "/title <player: target> reset", "/title <player: target> times <fadeIn: int> <stay: int> <fadeOut: int>"],
        cheats: true, note: "TitleSet は title, subtitle, actionbar。", url: u("title")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "playsound", name: "/playsound", read: "プレイサウンド",
      yomi: ["ぷれいさうんど", "おと", "さうんど", "playsound", "sound"],
      level: 3, where: "both",
      what: "<ruby>音<rt>おと</rt></ruby>を ならす コマンド。 そうちが うごいた あいずに なる。",
      form: [["/playsound", "cmd"], ["random.levelup", "thing"], ["@s", "who"]],
      args: [
        { name: "<ruby>音<rt>おと</rt></ruby>の なまえ", desc: "ならしたい <ruby>音<rt>おと</rt></ruby>。 random.levelup は レベルアップの <ruby>音<rt>おと</rt></ruby>。" },
        { name: "あいて", desc: "だれに きかせるか。" }
      ],
      examples: [
        { cmd: "/playsound random.levelup @s", result: "レベルアップの <ruby>音<rt>おと</rt></ruby>が なる。" },
        { cmd: "/playsound note.pling @a", result: "「ポーン」と いう <ruby>音<rt>おと</rt></ruby>が なる。" },
        { cmd: "/playsound random.orb @s", result: "けいけんちの <ruby>音<rt>おと</rt></ruby>が なる。" }
      ],
      result: "<ruby>音<rt>おと</rt></ruby>が きこえる。 <ruby>文字<rt>もじ</rt></ruby>は <ruby>出<rt>で</rt></ruby>ない。",
      careful: "<ruby>音<rt>おと</rt></ruby>の なまえは ながいので、 ゆっくり うとう。 . （てん）を わすれないでね。",
      related: ["title", "particle"],
      parents: {
        syntax: ["/playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]"],
        cheats: true, note: "音の名前（random.levelup, note.pling, random.orb）は公式のコマンドページに一覧がない【要実機確認】。", url: u("playsound")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "particle", name: "/particle", read: "パーティクル",
      yomi: ["ぱーてぃくる", "きらきら", "えふぇくと", "はーと", "particle"],
      level: 3, where: "both",
      what: "ハートや キラキラを <ruby>出<rt>だ</rt></ruby>す コマンド。",
      form: [["/particle", "cmd"], ["minecraft:heart_particle", "thing"], ["~ ~2 ~", "where"]],
      args: [
        { name: "パーティクルの なまえ", desc: "<ruby>出<rt>だ</rt></ruby>したい もよう。 minecraft: から はじまる。" },
        { name: "ばしょ（X Y Z）", desc: "どこに <ruby>出<rt>だ</rt></ruby>すか。" }
      ],
      examples: [
        { cmd: "/particle minecraft:heart_particle ~ ~2 ~", result: "あたまの <ruby>上<rt>うえ</rt></ruby>に ハートが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/particle minecraft:villager_happy ~ ~1 ~", result: "<ruby>緑<rt>みどり</rt></ruby>の キラキラが <ruby>出<rt>で</rt></ruby>る。" }
      ],
      result: "すこしの あいだ もようが うかぶ。",
      careful: "なまえが ながいよ。 : （コロン）と _ （アンダーバー）を わすれないでね。",
      related: ["playsound", "execute"],
      parents: {
        syntax: ["/particle <effect: string> [position: x y z]"],
        cheats: true, note: "パーティクル名は公式のコマンドページに一覧がない【要実機確認】。", url: u("particle")
      },
      status: "doc", checkedVersion: null
    },

    /* ---------------- レベル4 ---------------- */
    {
      id: "effect", name: "/effect", read: "エフェクト",
      yomi: ["えふぇくと", "はやく", "じゃんぷ", "ちから", "effect", "speed"],
      level: 4, where: "both",
      what: "はやく はしる、 たかく とぶ などの ちからを つける コマンド。",
      form: [["/effect", "cmd"], ["@s", "who"], ["speed", "thing"], ["30", "num"], ["1", "num"]],
      args: [
        { name: "あいて", desc: "だれに つけるか。" },
        { name: "こうかの なまえ", desc: "speed（はやい）、 jump_boost（たかく とぶ）、 night_vision（くらくても <ruby>見<rt>み</rt></ruby>える）。" },
        { name: "びょう", desc: "なんびょう つづくか。 しょうりゃく できる。" },
        { name: "つよさ", desc: "0 が いちばん よわい。 しょうりゃく できる。" }
      ],
      examples: [
        { cmd: "/effect @s speed 30 1", result: "30びょう はやく はしれる。" },
        { cmd: "/effect @s jump_boost 20 2", result: "20びょう たかく とべる。" },
        { cmd: "/effect @s clear", result: "ついて いる こうかが <ruby>全部<rt>ぜんぶ</rt></ruby> きえる。" }
      ],
      result: "からだの まわりに つぶつぶが <ruby>出<rt>で</rt></ruby>て、 こうかが つく。",
      careful: "つよさを おおきく しすぎると うごきにくく なるよ。 1 か 2 に しよう。",
      related: ["give", "enchant"],
      parents: {
        syntax: ["/effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]", "/effect <player: target> <effect: Effect> infinite [amplifier: int] [hideParticles: Boolean]", "/effect <player: target> clear [effect: Effect]"],
        cheats: true, note: "amplifier は 0 がレベルI。", url: u("effect")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "enchant", name: "/enchant", read: "エンチャント",
      yomi: ["えんちゃんと", "まほう", "つよく", "enchant"],
      level: 4, where: "chat",
      what: "<ruby>手<rt>て</rt></ruby>に もって いる どうぐに まほう（エンチャント）を つける コマンド。",
      form: [["/enchant", "cmd"], ["@s", "who"], ["sharpness", "thing"], ["3", "num"]],
      args: [
        { name: "あいて", desc: "どうぐを もって いる <ruby>人<rt>ひと</rt></ruby>。" },
        { name: "まほうの なまえ", desc: "sharpness（よく きれる）、 efficiency（はやく ほれる）。" },
        { name: "レベル", desc: "つよさ。 しょうりゃく すると 1。" }
      ],
      examples: [
        { cmd: "/enchant @s sharpness 3", result: "もって いる けんが つよく なる。" },
        { cmd: "/enchant @s efficiency 3", result: "もって いる つるはしで はやく ほれる。" }
      ],
      result: "どうぐが キラキラ ひかる。",
      careful: "<ruby>手<rt>て</rt></ruby>に どうぐを もって いないと エラーに なるよ。 どうぐに あわない まほうも つけられないよ。",
      related: ["give", "effect"],
      parents: {
        syntax: ["/enchant <player: target> <enchantmentName: Enchant> [level: int]", "/enchant <player: target> <enchantmentId: int> [level: int]"],
        cheats: true, note: "対象はメインハンドのアイテム。通常の最大レベルを超える指定はできない（公式ページに詳細なし【要実機確認】）。", url: u("enchant")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "kill", name: "/kill", read: "キル",
      yomi: ["きる", "けす", "たおす", "kill"],
      level: 4, where: "both",
      what: "モブや おちて いる アイテムを けす コマンド。 かならず しゅるいを きめて つかう。",
      form: [["/kill", "cmd"], ["@e[type=zombie]", "who"]],
      args: [{ name: "あいて", desc: "@e[type=zombie] で 「ゾンビだけ」。 type= で しゅるいを きめる。" }],
      examples: [
        { cmd: "/kill @e[type=zombie]", result: "ゾンビだけ きえる。" },
        { cmd: "/kill @e[type=item]", result: "じめんに おちて いる アイテムが きえる。" },
        { cmd: "/kill @e[type=pig,r=10]", result: "10マス いないの ブタだけ きえる。" }
      ],
      result: "えらんだ ものが きえる。",
      careful: "/kill @e だけを うつと、 ペットも むらびとも じぶんも <ruby>全部<rt>ぜんぶ</rt></ruby> きえるよ。 ぜったいに type= を つけてね。",
      related: ["summon"],
      parents: {
        syntax: ["/kill [target: target]"],
        cheats: true, note: "引数なしは自分を倒す。@e 単体は「やってはいけないコマンド」に掲載。", url: u("kill")
      },
      status: "doc", checkedVersion: null
    },

    /* ---------------- レベル5 ---------------- */
    {
      id: "testfor", name: "/testfor", read: "テストフォー",
      yomi: ["てすとふぉー", "しらべる", "いるか", "ちかく", "testfor"],
      level: 5, where: "block",
      what: "「その <ruby>人<rt>ひと</rt></ruby>が いるか」を しらべる コマンド。 いたら つぎの コマンドブロックが うごく。",
      form: [["/testfor", "cmd"], ["@p[r=3]", "who"]],
      args: [{ name: "あいて", desc: "@p[r=3] は 「3マス いないに いる <ruby>人<rt>ひと</rt></ruby>」。" }],
      examples: [
        { cmd: "/testfor @p[r=3]", result: "3マス いないに <ruby>人<rt>ひと</rt></ruby>が いたら 「せいこう」。" },
        { cmd: "/testfor @a[tag=oni]", result: "oni の しるしが ついた <ruby>人<rt>ひと</rt></ruby>が いたら 「せいこう」。" }
      ],
      result: "<ruby>見<rt>み</rt></ruby>た めは なにも かわらない。 コマンドブロックの 「せいこう」が つぎに つたわる。",
      careful: "これだけでは なにも おきないよ。 うしろに 「じょうけんつき」の チェーンを つなげよう。",
      related: ["testforblock", "execute"],
      parents: {
        syntax: ["/testfor <victim: target>"],
        cheats: true, note: "条件付きチェーンの判定に使う。/execute if entity でも同じことができる。", url: u("testfor")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "testforblock", name: "/testforblock", read: "テストフォーブロック",
      yomi: ["てすとふぉーぶろっく", "ぶろっくを しらべる", "testforblock"],
      level: 5, where: "block",
      what: "「その ばしょに その ブロックが あるか」を しらべる コマンド。",
      form: [["/testforblock", "cmd"], ["~ ~2 ~", "where"], ["gold_block", "thing"]],
      args: [
        { name: "ばしょ（X Y Z）", desc: "しらべる ばしょ。" },
        { name: "ブロックの なまえ", desc: "あるか しらべたい ブロック。" }
      ],
      examples: [
        { cmd: "/testforblock ~ ~2 ~ gold_block", result: "2マス <ruby>上<rt>うえ</rt></ruby>に <ruby>金<rt>きん</rt></ruby>ブロックが あったら 「せいこう」。" },
        { cmd: "/testforblock ~1 ~ ~ air", result: "となりが からっぽ（air）なら 「せいこう」。" }
      ],
      result: "<ruby>見<rt>み</rt></ruby>た めは かわらない。 「せいこう」か 「しっぱい」かが つぎに つたわる。",
      careful: "コマンドブロックから <ruby>見<rt>み</rt></ruby>た ばしょで しらべるよ。",
      related: ["testfor", "setblock"],
      parents: {
        syntax: ["/testforblock <position: x y z> <tileName: Block> [blockStates: block properties]"],
        cheats: true, note: "", url: u("testforblock")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "gamerule", name: "/gamerule", read: "ゲームルール",
      yomi: ["げーむるーる", "るーる", "せってい", "gamerule"],
      level: 5, where: "chat",
      what: "ワールドの きまりを かえる コマンド。",
      form: [["/gamerule", "cmd"], ["commandblockoutput", "word"], ["false", "word"]],
      args: [
        { name: "きまりの なまえ", desc: "commandblockoutput は 「コマンドブロックの けっかを チャットに <ruby>出<rt>だ</rt></ruby>すか」。" },
        { name: "true / false", desc: "true は 「する」、 false は 「しない」。" }
      ],
      examples: [
        { cmd: "/gamerule commandblockoutput false", result: "コマンドブロックの けっかが チャットに <ruby>出<rt>で</rt></ruby>なく なる。" },
        { cmd: "/gamerule dodaylightcycle false", result: "じかんが すすまなく なる（ずっと <ruby>朝<rt>あさ</rt></ruby>のまま など）。" },
        { cmd: "/gamerule keepinventory true", result: "やられても もちものが なくならない。" }
      ],
      result: "チャットに 「ルールを かえた」と <ruby>出<rt>で</rt></ruby>る。",
      careful: "リピートを つかう まえに commandblockoutput を false に しておくと、 チャットが うまらないよ。",
      related: ["time"],
      parents: {
        syntax: ["/gamerule <rule: BoolGameRule> [value: Boolean]", "/gamerule <rule: IntGameRule> [value: int]", "/gamerule"],
        cheats: false, note: "公式ページではチート不要と記載。ルール名一覧はコマンドページにない（commandblockoutput, dodaylightcycle, keepinventory は【要実機確認】）。", url: u("gamerule")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "spawnpoint", name: "/spawnpoint", read: "スポーンポイント",
      yomi: ["すぽーんぽいんと", "ふっかつ", "りすぽーん", "spawnpoint"],
      level: 5, where: "both",
      what: "やられた ときに もどる ばしょを きめる コマンド。",
      form: [["/spawnpoint", "cmd"], ["@s", "who"], ["~ ~ ~", "where"]],
      args: [
        { name: "あいて", desc: "だれの ばしょか。 しょうりゃく すると じぶん。" },
        { name: "ばしょ（X Y Z）", desc: "もどる ばしょ。 しょうりゃく すると いま いる ばしょ。" }
      ],
      examples: [
        { cmd: "/spawnpoint", result: "いま いる ばしょが ふっかつの ばしょに なる。" },
        { cmd: "/spawnpoint @a ~ ~ ~", result: "みんなの ふっかつの ばしょが ここに なる。" }
      ],
      result: "チャットに 「ふっかつ ちてんを せってい した」と <ruby>出<rt>で</rt></ruby>る。",
      careful: "ベッドで ねると また かわるよ。",
      related: ["tp"],
      parents: {
        syntax: ["/spawnpoint [player: target] [spawnPos: x y z]"],
        cheats: true, note: "", url: u("spawnpoint")
      },
      status: "doc", checkedVersion: null
    },

    /* ---------------- レベル6 ---------------- */
    {
      id: "scoreboard", name: "/scoreboard", read: "スコアボード",
      yomi: ["すこあぼーど", "てんすう", "すこあ", "かぞえる", "scoreboard", "score"],
      level: 6, where: "both",
      what: "<ruby>点<rt>てん</rt></ruby>すうを かぞえる コマンド。 ミニゲームの もと。",
      form: [["/scoreboard", "cmd"], ["players", "word"], ["add", "word"], ["@s", "who"], ["point", "word"], ["1", "num"]],
      args: [
        { name: "objectives add point dummy", desc: "point と いう なまえの 「<ruby>点<rt>てん</rt></ruby>すうの はこ」を つくる。 さいしょに 1かい だけ。" },
        { name: "players add", desc: "<ruby>点<rt>てん</rt></ruby>すうを ふやす。 remove で へらす、 set で きめる。" },
        { name: "objectives setdisplay sidebar", desc: "<ruby>画面<rt>がめん</rt></ruby>の よこに <ruby>点<rt>てん</rt></ruby>すうを <ruby>出<rt>だ</rt></ruby>す。" }
      ],
      examples: [
        { cmd: "/scoreboard objectives add point dummy", result: "point と いう <ruby>点<rt>てん</rt></ruby>すうの はこが できる。" },
        { cmd: "/scoreboard objectives setdisplay sidebar point", result: "<ruby>画面<rt>がめん</rt></ruby>の よこに <ruby>点<rt>てん</rt></ruby>すうが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/scoreboard players add @s point 1", result: "じぶんの <ruby>点<rt>てん</rt></ruby>すうが 1 ふえる。" }
      ],
      result: "<ruby>画面<rt>がめん</rt></ruby>の よこの <ruby>点<rt>てん</rt></ruby>すうが かわる。",
      careful: "ながい コマンドだよ。 タイルを <ruby>見<rt>み</rt></ruby>ながら ゆっくり うとう。 さきに objectives add を しないと エラーに なるよ。",
      related: ["execute", "tag"],
      parents: {
        syntax: ["/scoreboard objectives add <objective> dummy [displayName: string]", "/scoreboard objectives setdisplay <displaySlot> [objective] [sortOrder]", "/scoreboard players <add|remove|set> <player: targets> <objective> <count: int>", "/scoreboard players test <player> <objective> <min> [max]", "/scoreboard players random <player> <objective> <min> <max>", "/scoreboard players reset <player> [objective]", "/scoreboard players operation <targetName> <targetObjective> <operation> <selector> <objective>"],
        cheats: true, note: "表示名に日本語を使う場合は画面キーボードの日本語入力が必要（Switch での可否は【要実機確認】）。", url: u("scoreboard")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "tag", name: "/tag", read: "タグ",
      yomi: ["たぐ", "しるし", "なふだ", "tag"],
      level: 6, where: "both",
      what: "<ruby>人<rt>ひと</rt></ruby>や モブに 「しるし」を つける コマンド。",
      form: [["/tag", "cmd"], ["@s", "who"], ["add", "word"], ["oni", "word"]],
      args: [
        { name: "あいて", desc: "しるしを つける あいて。" },
        { name: "add / remove", desc: "add は つける、 remove は はずす。" },
        { name: "しるしの なまえ", desc: "じぶんで きめる。 えいごの こもじで みじかく。" }
      ],
      examples: [
        { cmd: "/tag @s add oni", result: "じぶんに oni の しるしが つく。" },
        { cmd: "/tag @s remove oni", result: "oni の しるしが はずれる。" },
        { cmd: "/tag @s list", result: "ついて いる しるしが チャットに <ruby>出<rt>で</rt></ruby>る。" }
      ],
      result: "<ruby>見<rt>み</rt></ruby>た めは かわらない。 @a[tag=oni] のように えらぶ ときに つかう。",
      careful: "しるしの なまえを うちまちがえると べつの しるしに なるよ。",
      related: ["scoreboard", "testfor", "execute"],
      parents: {
        syntax: ["/tag <entity: targets> <add|remove> <name: TagValues>", "/tag <entity: targets> list"],
        cheats: true, note: "", url: u("tag")
      },
      status: "doc", checkedVersion: null
    },
    {
      id: "execute", name: "/execute", read: "エクスキュート",
      yomi: ["えくすきゅーと", "じっこう", "もし", "かわりに", "execute"],
      level: 6, where: "both",
      what: "「だれが」「どこで」「もし〜なら」を きめてから、 べつの コマンドを うごかす コマンド。",
      form: [["/execute", "cmd"], ["as @a", "who"], ["at @s", "where"], ["run", "word"], ["say hi", "word"]],
      args: [
        { name: "as（アズ） あいて", desc: "「この <ruby>人<rt>ひと</rt></ruby>が」 うごかす ことに する。" },
        { name: "at（アット） あいて", desc: "「この <ruby>人<rt>ひと</rt></ruby>の ばしょで」 うごかす。" },
        { name: "if（イフ）", desc: "「もし 〜 なら」。 if score … matches 10.. で 「10<ruby>点<rt>てん</rt></ruby> いじょう なら」。" },
        { name: "run（ラン） コマンド", desc: "さいごに うごかす コマンド。 / は いらない。" }
      ],
      examples: [
        { cmd: "/execute as @a at @s run summon chicken", result: "みんなの ところに ニワトリが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/execute at @p run setblock ~ ~3 ~ glowstone", result: "いちばん ちかい <ruby>人<rt>ひと</rt></ruby>の 3マス <ruby>上<rt>うえ</rt></ruby>に ひかる ブロックが <ruby>出<rt>で</rt></ruby>る。" },
        { cmd: "/execute if score @p point matches 10.. run say win", result: "10<ruby>点<rt>てん</rt></ruby> いじょう なら win と <ruby>出<rt>で</rt></ruby>る。" }
      ],
      result: "run の うしろの コマンドが、 きめた <ruby>人<rt>ひと</rt></ruby>と ばしょで うごく。",
      careful: "あたらしい かきかた（as … at … run …）を つかおう。 むかしの かきかた（/execute @p ~ ~ ~ …）は うごかないよ。",
      related: ["testfor", "scoreboard", "tag"],
      parents: {
        syntax: ["/execute as <origin: target> <chainedCommand>", "/execute at <origin: target> <chainedCommand>", "/execute positioned <position: x y z> <chainedCommand>", "/execute <if|unless> entity <target: target> [chainedCommand]", "/execute <if|unless> block <position: x y z> <block: Block> [chainedCommand]", "/execute <if|unless> score <target> <objective> matches <range> [chainedCommand]", "/execute run <command>"],
        cheats: true, note: "新しい構文だけを使う（導入バージョンは公式ページに記載なし）。in / rotated / facing / align / anchored もある。", url: u("execute")
      },
      status: "doc", checkedVersion: null
    }
  ];

  /* しゅるいの 名前と色（form の k） */
  window.SITE_DATA.formKinds = {
    cmd: "コマンドの なまえ",
    who: "あいて（だれ）",
    where: "ばしょ",
    thing: "もの・なまえ",
    num: "かず",
    word: "ことば・せってい"
  };
})();
