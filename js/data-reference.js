/* コマンド大ずかん（応用編）のデータ。公式一覧（Microsoft Learn, 82個）＋ 教育版だけのもの。
   cat: switch=Switchで使える / bds=専用サーバーだけ / other=アドオン・Editor・実験的機能が必要 / edu=教育版だけ
   作り方：開発用スクリプトで生成（docs/OFFICIAL-REFERENCE.md の控えにもとづく） */
window.SITE_DATA = window.SITE_DATA || {};
window.SITE_DATA.reference = [
 {
  "id": "aimassist",
  "name": "/aimassist",
  "read": "エイムアシスト",
  "yomi": [
   "えいむあしすと",
   "ねらい"
  ],
  "what": "ねらいを つけやすく する てだすけを つける・はずす。",
  "patterns": [
   {
    "syntax": "/aimassist <players: target> set [x angle: float] [y angle: float] [max distance: float] [target mode: AimAssistTargetMode] [preset id: string]",
    "kid": "てだすけを つける。 かくどや とどく きょりを きめられる。"
   },
   {
    "syntax": "/aimassist <players: target> clear",
    "kid": "てだすけを はずす。"
   }
  ],
  "args": [
   {
    "name": "players",
    "desc": "だれに。",
    "optional": false
   },
   {
    "name": "x angle / y angle",
    "desc": "よこ・たての どのくらいの かくどまで すいつくか。",
    "optional": true
   },
   {
    "name": "max distance",
    "desc": "とどく きょり。",
    "optional": true
   },
   {
    "name": "target mode",
    "desc": "distance（ちかい じゅん）か angle（まんなかに ちかい じゅん）。",
    "optional": true
   },
   {
    "name": "preset id",
    "desc": "せっていの なまえ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/aimassist @s clear",
    "result": "てだすけを はずす。"
   }
  ],
  "careful": "",
  "related": [
   "camera",
   "inputpermission"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/aimassist?view=minecraft-bedrock-stable",
  "note": "preset id の既定値と Switch（携帯モード）での効き方は未確認【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "camera",
  "name": "/camera",
  "read": "カメラ",
  "yomi": [
   "かめら",
   "してん"
  ],
  "what": "カメラ（<ruby>見<rt>み</rt></ruby>え かた）を かえる。 まっくらに フェードも できる。",
  "patterns": [
   {
    "syntax": "/camera <players: target> set <preset: CameraPresets> pos <position: x y z> rot <xRot: rotation> <yRot: rotation>",
    "kid": "カメラを その ばしょ・むきに おく。"
   },
   {
    "syntax": "/camera <players: target> set <preset: CameraPresets> ease <easeTime: float> <easeType: Easing> pos <position: x y z> facing <lookAtEntity: target>",
    "kid": "なめらかに うごいて、 あいての ほうを むく。"
   },
   {
    "syntax": "/camera <players: target> set <preset: CameraPresets>",
    "kid": "minecraft:first_person（じぶんの <ruby>目<rt>め</rt></ruby>）、 minecraft:third_person（うしろから）、 minecraft:free（じゆう）など。"
   },
   {
    "syntax": "/camera <players: target> fade time <fadeInSeconds: float> <holdSeconds: float> <fadeOutSeconds: float> color <red: int> <green: int> <blue: int>",
    "kid": "<ruby>画面<rt>がめん</rt></ruby>を いろで ぬりつぶして もどす。"
   },
   {
    "syntax": "/camera <players: target> fov_set <fov_value: float> [fovEaseTime: float] [fovEaseType: Easing]",
    "kid": "<ruby>見<rt>み</rt></ruby>える ひろさを かえる。"
   },
   {
    "syntax": "/camera <players: target> clear",
    "kid": "もとに もどす。"
   }
  ],
  "args": [
   {
    "name": "preset",
    "desc": "カメラの しゅるい（7こ）。",
    "optional": false
   },
   {
    "name": "ease",
    "desc": "なめらかに うごく じかんと うごきかた（linear, in_out_quad など 32しゅるい）。",
    "optional": true
   },
   {
    "name": "pos / rot / facing",
    "desc": "ばしょ・むき・<ruby>見<rt>み</rt></ruby>る あいて。",
    "optional": true
   },
   {
    "name": "fade",
    "desc": "フェードの じかんと いろ（0〜255）。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/camera @s fade time 1 1 1 color 0 0 0",
    "result": "<ruby>画面<rt>がめん</rt></ruby>が まっくらに なって もどる。"
   },
   {
    "cmd": "/camera @s set minecraft:free pos ~ ~10 ~ facing @s",
    "result": "<ruby>上<rt>うえ</rt></ruby>から じぶんを <ruby>見<rt>み</rt></ruby>おろす。"
   },
   {
    "cmd": "/camera @s clear",
    "result": "もとの <ruby>見<rt>み</rt></ruby>え かたに もどる。"
   }
  ],
  "careful": "もどせなく なったら /camera @s clear。",
  "related": [
   "camerashake",
   "hud",
   "teleport"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/camera?view=minecraft-bedrock-stable",
  "note": "公式ページの構文は41通り。代表だけ載せた（全文は公式ページ）",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "camerashake",
  "name": "/camerashake",
  "read": "カメラシェイク",
  "yomi": [
   "かめらしぇいく",
   "ゆれる"
  ],
  "what": "<ruby>画面<rt>がめん</rt></ruby>を ゆらす。",
  "patterns": [
   {
    "syntax": "/camerashake add <player: target> [intensity: float] [seconds: float] [shakeType: CameraShakeType]",
    "kid": "つよさ（0〜4）・びょう・ゆれかた。"
   },
   {
    "syntax": "/camerashake stop [player: target]",
    "kid": "ゆれを とめる。"
   }
  ],
  "args": [
   {
    "name": "intensity",
    "desc": "つよさ。 0 から 4 まで。",
    "optional": true
   },
   {
    "name": "seconds",
    "desc": "びょう。",
    "optional": true
   },
   {
    "name": "shakeType",
    "desc": "positional（ずれる）か rotational（まわる）。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/camerashake add @a 1 2",
    "result": "みんなの <ruby>画面<rt>がめん</rt></ruby>が 2びょう ゆれる。"
   }
  ],
  "careful": "せっていで 「カメラの ゆれ」が オンの ときだけ ゆれる。 よいやすい <ruby>人<rt>ひと</rt></ruby>には つかわない。",
  "related": [
   "camera",
   "playsound"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/camerashake?view=minecraft-bedrock-stable",
  "note": "ユーザー設定 Allow Camera Shake が必要（公式ページ注記）",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "clear",
  "name": "/clear",
  "read": "クリア",
  "basic": "clear",
  "yomi": [
   "くりあ"
  ],
  "what": "もちものを けす。",
  "patterns": [
   {
    "syntax": "/clear [player: target] [itemName: Item] [data: int] [maxCount: int]",
    "kid": "ぜんぶ しょうりゃく できる。 maxCount で けす かずを きめられる。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "だれの。",
    "optional": true
   },
   {
    "name": "itemName",
    "desc": "けす アイテム。",
    "optional": true
   },
   {
    "name": "data",
    "desc": "しゅるいの ばんごう。 -1 で ぜんぶ。",
    "optional": true
   },
   {
    "name": "maxCount",
    "desc": "いくつ けすか。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/clear @s dirt -1 10",
    "result": "<ruby>土<rt>つち</rt></ruby>を 10こ だけ けす。"
   }
  ],
  "careful": "なにも つけないと ぜんぶ きえる。",
  "related": [
   "give",
   "replaceitem"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/clear?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "clearspawnpoint",
  "name": "/clearspawnpoint",
  "read": "クリアスポーンポイント",
  "yomi": [
   "すぽーん",
   "ふっかつ"
  ],
  "what": "ふっかつ ちてんを けして もとに もどす。",
  "patterns": [
   {
    "syntax": "/clearspawnpoint [player: target]",
    "kid": "しょうりゃく すると じぶん。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "だれの。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/clearspawnpoint @s",
    "result": "じぶんの ふっかつ ちてんが もとに もどる。"
   }
  ],
  "careful": "",
  "related": [
   "spawnpoint",
   "setworldspawn"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/clearspawnpoint?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "clone",
  "name": "/clone",
  "read": "クローン",
  "yomi": [
   "くろーん",
   "こぴー",
   "ふくせい"
  ],
  "what": "たてものを まるごと コピーする。",
  "patterns": [
   {
    "syntax": "/clone <begin: x y z> <end: x y z> <destination: x y z> [maskMode: MaskMode] [cloneMode: CloneMode]",
    "kid": "はこの 2つの かどと、 コピーさきの かど。"
   },
   {
    "syntax": "/clone <begin: x y z> <end: x y z> <destination: x y z> filtered <cloneMode: CloneMode> <tileName: Block> [blockStates: block properties]",
    "kid": "きめた ブロックだけ コピー。"
   }
  ],
  "args": [
   {
    "name": "begin / end",
    "desc": "コピーする はこの かど。",
    "optional": false
   },
   {
    "name": "destination",
    "desc": "コピーさきの いちばん ちいさい かど。",
    "optional": false
   },
   {
    "name": "maskMode",
    "desc": "replace（ぜんぶ）、 masked（からっぽは コピーしない）。",
    "optional": true
   },
   {
    "name": "cloneMode",
    "desc": "normal（コピー）、 move（いどう）、 force（かさなっても）。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/clone ~ ~ ~ ~4 ~4 ~4 ~10 ~ ~",
    "result": "5×5×5 の たてものを 10マス よこに コピー。"
   },
   {
    "cmd": "/clone ~ ~ ~ ~4 ~4 ~4 ~10 ~ ~ masked",
    "result": "くうきの ところは コピーしない。"
   }
  ],
  "careful": "ひろすぎる はんいは エラーや おもさの もと。 さきに ちいさく ためそう。",
  "related": [
   "fill",
   "structure"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/clone?view=minecraft-bedrock-stable",
  "note": "MaskMode/CloneMode の値は一般的な仕様に基づく説明【要確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "controlscheme",
  "name": "/controlscheme",
  "read": "コントロールスキーム",
  "yomi": [
   "そうさ"
  ],
  "what": "うごかしかた（そうさの しかた）を かえる。",
  "patterns": [
   {
    "syntax": "/controlscheme <players: target> set <control scheme: controlscheme>",
    "kid": "そうさの しかたを きめる。"
   },
   {
    "syntax": "/controlscheme <players: target> clear",
    "kid": "もとに もどす。"
   }
  ],
  "args": [
   {
    "name": "control scheme",
    "desc": "camera_relative, camera_relative_strafe, player_relative, player_relative_strafe, locked_player_relative_strafe。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/controlscheme @s clear",
    "result": "そうさが もとに もどる。"
   }
  ],
  "careful": "うごきにくく なったら clear で もどす。",
  "related": [
   "camera",
   "inputpermission"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/controlscheme?view=minecraft-bedrock-stable",
  "note": "各値の動きの違いは【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "damage",
  "name": "/damage",
  "read": "ダメージ",
  "yomi": [
   "だめーじ"
  ],
  "what": "あいてに ダメージを あたえる。",
  "patterns": [
   {
    "syntax": "/damage <target: target> <amount: int> [cause: DamageCause]",
    "kid": "どれだけ・なにが げんいんか。"
   },
   {
    "syntax": "/damage <target: target> <amount: int> <cause: DamageCause> entity <damager: target>",
    "kid": "だれが やった ことに するか。"
   }
  ],
  "args": [
   {
    "name": "target",
    "desc": "あいて。",
    "optional": false
   },
   {
    "name": "amount",
    "desc": "ダメージの かず（ハート 1こ＝2）。",
    "optional": false
   },
   {
    "name": "cause",
    "desc": "fire, lava, fall など 36しゅるい。",
    "optional": true
   },
   {
    "name": "damager",
    "desc": "やった あいて。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/damage @e[type=zombie,c=1] 4",
    "result": "いちばん ちかい ゾンビに ハート 2こぶん。"
   }
  ],
  "careful": "ともだちには つかわない。",
  "related": [
   "kill",
   "effect"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/damage?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "daylock",
  "name": "/daylock",
  "alias": "/alwaysday",
  "read": "デイロック",
  "yomi": [
   "でいろっく",
   "ずっと ひる",
   "あさ"
  ],
  "what": "ずっと おひるの ままに する（とめる・うごかす）。",
  "patterns": [
   {
    "syntax": "/daylock [lock: Boolean]",
    "kid": "true で とめる、 false で もとに。"
   }
  ],
  "args": [
   {
    "name": "lock",
    "desc": "true か false。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/daylock true",
    "result": "ずっと あかるい まま。"
   },
   {
    "cmd": "/daylock false",
    "result": "また よるが くる。"
   }
  ],
  "careful": "",
  "related": [
   "time",
   "gamerule"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/daylock?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "deop",
  "name": "/deop",
  "read": "デオプ",
  "yomi": [
   "でおぷ"
  ],
  "cheats": false,
  "permission": "Admin",
  "what": "オペレーターを やめさせる。",
  "patterns": [
   {
    "syntax": "/deop <player: target>",
    "kid": "その <ruby>人<rt>ひと</rt></ruby>の オペレーターを やめる。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "だれを。",
    "optional": false
   }
  ],
  "examples": [],
  "careful": "おうちの <ruby>人<rt>ひと</rt></ruby>と いっしょに。",
  "related": [
   "op"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/deop?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc"
 },
 {
  "id": "difficulty",
  "name": "/difficulty",
  "read": "ディフィカルティ",
  "yomi": [
   "むずかしさ",
   "なんいど",
   "ぴーすふる"
  ],
  "what": "むずかしさを かえる。",
  "patterns": [
   {
    "syntax": "/difficulty <difficulty: Difficulty>",
    "kid": "peaceful（p）、 easy（e）、 normal（n）、 hard（h）。"
   },
   {
    "syntax": "/difficulty <difficulty: int>",
    "kid": "0 ピースフル、 1 イージー、 2 ノーマル、 3 ハード。"
   }
  ],
  "args": [
   {
    "name": "difficulty",
    "desc": "ことば か かず。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/difficulty peaceful",
    "result": "てきの モブが <ruby>出<rt>で</rt></ruby>なく なる。"
   }
  ],
  "careful": "",
  "related": [
   "gamemode",
   "gamerule"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/difficulty?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "effect",
  "name": "/effect",
  "read": "エフェクト",
  "basic": "effect",
  "yomi": [
   "えふぇくと"
  ],
  "what": "こうかを つける・けす。",
  "patterns": [
   {
    "syntax": "/effect <player: target> clear [effect: Effect]",
    "kid": "こうかを けす。 なまえを つけると それだけ。"
   },
   {
    "syntax": "/effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]",
    "kid": "びょう・つよさ・つぶつぶを かくすか。"
   },
   {
    "syntax": "/effect <player: target> <effect: Effect> infinite [amplifier: int] [hideParticles: Boolean]",
    "kid": "ずっと つづく。"
   }
  ],
  "args": [
   {
    "name": "effect",
    "desc": "speed, jump_boost, night_vision, slow_falling, invisibility など。",
    "optional": false
   },
   {
    "name": "seconds",
    "desc": "びょう。",
    "optional": true
   },
   {
    "name": "amplifier",
    "desc": "つよさ。 0 から。",
    "optional": true
   },
   {
    "name": "hideParticles",
    "desc": "true で つぶつぶを かくす。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/effect @s night_vision infinite 0 true",
    "result": "ずっと くらくても <ruby>見<rt>み</rt></ruby>える。 つぶつぶ なし。"
   },
   {
    "cmd": "/effect @s clear speed",
    "result": "はやさだけ けす。"
   }
  ],
  "careful": "",
  "related": [
   "give",
   "damage"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/effect?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "enchant",
  "name": "/enchant",
  "read": "エンチャント",
  "basic": "enchant",
  "yomi": [
   "えんちゃんと"
  ],
  "what": "もって いる どうぐに まほうを つける。",
  "patterns": [
   {
    "syntax": "/enchant <player: target> <enchantmentName: Enchant> [level: int]",
    "kid": "なまえで きめる。"
   },
   {
    "syntax": "/enchant <player: target> <enchantmentId: int> [level: int]",
    "kid": "ばんごうで きめる。"
   }
  ],
  "args": [
   {
    "name": "enchantmentName",
    "desc": "sharpness, efficiency, unbreaking, fortune など。",
    "optional": false
   },
   {
    "name": "level",
    "desc": "レベル。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/enchant @s unbreaking 3",
    "result": "どうぐが こわれにくく なる。"
   }
  ],
  "careful": "どうぐを もって いないと エラー。",
  "related": [
   "give"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/enchant?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "event",
  "name": "/event",
  "read": "イベント",
  "yomi": [
   "いべんと"
  ],
  "what": "モブに とくべつな できごと（イベント）を おこす。",
  "patterns": [
   {
    "syntax": "/event entity <target: target> <eventName: EntityEvents>",
    "kid": "あいてと イベントの なまえ。"
   }
  ],
  "args": [
   {
    "name": "target",
    "desc": "あいて。",
    "optional": false
   },
   {
    "name": "eventName",
    "desc": "イベントの なまえ（モブごとに ちがう）。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/event entity @e[type=cow,c=1] minecraft:ageable_grow_up",
    "result": "こどもの ウシが おとなに なる。"
   }
  ],
  "careful": "",
  "related": [
   "summon"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/event?view=minecraft-bedrock-stable",
  "note": "イベント名はモブの定義ごとに異なる。例の名前は【要実機確認】",
  "status": "unknown",
  "cat": "switch",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "execute",
  "name": "/execute",
  "read": "エクスキュート",
  "basic": "execute",
  "yomi": [
   "えくすきゅーと"
  ],
  "what": "だれが・どこで・もし〜なら を くみあわせて コマンドを うごかす。",
  "patterns": [
   {
    "syntax": "/execute as <origin: target> <chainedCommand: executechainedoption_0>",
    "kid": "その あいてが うった ことに する。"
   },
   {
    "syntax": "/execute at <origin: target> <chainedCommand: executechainedoption_0>",
    "kid": "その あいての ばしょで。"
   },
   {
    "syntax": "/execute in <dimension: Dimension> <chainedCommand: executechainedoption_0>",
    "kid": "overworld・nether・the_end で。"
   },
   {
    "syntax": "/execute positioned <position: x y z> <chainedCommand: executechainedoption_0>",
    "kid": "その ばしょで。"
   },
   {
    "syntax": "/execute positioned as <origin: target> <chainedCommand: executechainedoption_0>",
    "kid": "あいての ばしょで（むきは かえない）。"
   },
   {
    "syntax": "/execute rotated <yaw: rotation> <pitch: rotation> <chainedCommand: executechainedoption_0>",
    "kid": "むきを かえて。"
   },
   {
    "syntax": "/execute rotated as <origin: target> <chainedCommand: executechainedoption_0>",
    "kid": "あいてと おなじ むきで。"
   },
   {
    "syntax": "/execute facing <position: x y z> <chainedCommand: executechainedoption_0>",
    "kid": "ばしょの ほうを むいて。"
   },
   {
    "syntax": "/execute facing entity <origin: target> <anchor: ActorLocation> <chainedCommand: executechainedoption_0>",
    "kid": "あいての ほうを むいて（eyes・feet）。"
   },
   {
    "syntax": "/execute align <axes: string> <chainedCommand: executechainedoption_0>",
    "kid": "ブロックの マスめに そろえる（xyz）。"
   },
   {
    "syntax": "/execute anchored <anchored: ActorLocation> <chainedCommand: executechainedoption_0>",
    "kid": "<ruby>目<rt>め</rt></ruby>（eyes）か あし（feet）を きじゅんに。"
   },
   {
    "syntax": "/execute <subcommand: Option_If_Unless> block <position: x y z> <block: Block> [chainedCommand: executechainedoption_0]",
    "kid": "もし（if）／もし〜でなければ（unless） その ブロックが あったら。"
   },
   {
    "syntax": "/execute <subcommand: Option_If_Unless> block <position: x y z> <block: Block> <blockStates: block properties> [chainedCommand: executechainedoption_0]",
    "kid": "じょうたいまで しらべる。"
   },
   {
    "syntax": "/execute <subcommand: Option_If_Unless> blocks <begin: x y z> <end: x y z> <destination: x y z> <scan mode: BlocksScanMode> [chainedCommand: executechainedoption_0]",
    "kid": "2つの ばしょの ブロックが おなじなら（all・masked）。"
   },
   {
    "syntax": "/execute <subcommand: Option_If_Unless> entity <target: target> [chainedCommand: executechainedoption_0]",
    "kid": "あいてが いたら。"
   },
   {
    "syntax": "/execute <subcommand: Option_If_Unless> score <target: target> <objective: ScoreboardObjectives> <operation: compareoperator> <source: target> <objective: ScoreboardObjectives> [chainedCommand: executechainedoption_0]",
    "kid": "<ruby>点<rt>てん</rt></ruby>どうしを くらべて。"
   },
   {
    "syntax": "/execute <subcommand: Option_If_Unless> score <target: target> <objective: ScoreboardObjectives> matches <range: fullintegerrange> [chainedCommand: executechainedoption_0]",
    "kid": "<ruby>点<rt>てん</rt></ruby>が はんい（5.. など）なら。"
   },
   {
    "syntax": "/execute run <command: codebuilderargs>",
    "kid": "さいごに うごかす コマンド。"
   }
  ],
  "args": [
   {
    "name": "as / at",
    "desc": "だれが・どこで。",
    "optional": false
   },
   {
    "name": "if / unless",
    "desc": "もし〜なら／もし〜でなければ。",
    "optional": false
   },
   {
    "name": "run",
    "desc": "うごかす コマンド（/ は いらない）。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/execute as @e[type=sheep] at @s run particle minecraft:heart_particle ~ ~2 ~",
    "result": "ヒツジ みんなの <ruby>上<rt>うえ</rt></ruby>に ハート。"
   },
   {
    "cmd": "/execute unless entity @p[r=10] run say bye",
    "result": "10マス いないに だれも いなければ bye。"
   }
  ],
  "careful": "むかしの かきかた（/execute @p ~ ~ ~ …）は つかわない。",
  "related": [
   "testfor",
   "scoreboard",
   "tag"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/execute?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "fill",
  "name": "/fill",
  "read": "フィル",
  "basic": "fill",
  "yomi": [
   "ふぃる"
  ],
  "what": "はんいを ブロックで うめる。",
  "patterns": [
   {
    "syntax": "/fill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block properties> [oldBlockHandling: FillMode]",
    "kid": "じょうたいつき。"
   },
   {
    "syntax": "/fill <from: x y z> <to: x y z> <tileName: Block> [oldBlockHandling: FillMode]",
    "kid": "ふつうの かきかた。 outline（そとがわ）、 hollow（なかを からに）、 destroy、 keep。"
   },
   {
    "syntax": "/fill <from: x y z> <to: x y z> <tileName: Block> <blockStates: block properties> replace [replaceTileName: Block] [replaceBlockStates: block properties]",
    "kid": "じょうたいつきで、 きめた ブロックだけ おきかえる。"
   },
   {
    "syntax": "/fill <from: x y z> <to: x y z> <tileName: Block> replace [replaceTileName: Block] [replaceBlockStates: block properties]",
    "kid": "きめた ブロックだけ おきかえる。"
   }
  ],
  "args": [
   {
    "name": "from / to",
    "desc": "はこの 2つの かど。",
    "optional": false
   },
   {
    "name": "tileName",
    "desc": "うめる ブロック。",
    "optional": false
   },
   {
    "name": "oldBlockHandling",
    "desc": "outline・hollow・destroy・keep。",
    "optional": true
   },
   {
    "name": "replaceTileName",
    "desc": "おきかえる まえの ブロック。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/fill ~-2 ~ ~-2 ~2 ~3 ~2 glass hollow",
    "result": "なかが からっぽの ガラスの はこ。"
   },
   {
    "cmd": "/fill ~-3 ~-1 ~-3 ~3 ~-1 ~3 gold_block replace grass_block",
    "result": "<ruby>草<rt>くさ</rt></ruby>ブロックだけ <ruby>金<rt>きん</rt></ruby>に。"
   }
  ],
  "careful": "ひろい はんいは ワールドを こわす。",
  "related": [
   "setblock",
   "clone"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/fill?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "fog",
  "name": "/fog",
  "read": "フォグ",
  "yomi": [
   "きり"
  ],
  "what": "きり（もや）の せっていを つける・はずす。",
  "patterns": [
   {
    "syntax": "/fog <victim: target> push <fogId: string> <userProvidedId: string>",
    "kid": "きりを かさねる。 じぶんで きめた なまえを つける。"
   },
   {
    "syntax": "/fog <victim: target> <mode: delete> <userProvidedId: string>",
    "kid": "pop（さいごの 1つ）か remove（ぜんぶ）で はずす。"
   }
  ],
  "args": [
   {
    "name": "fogId",
    "desc": "きりの せっていの なまえ。",
    "optional": false
   },
   {
    "name": "userProvidedId",
    "desc": "あとで はずす ための じぶんの なまえ。",
    "optional": false
   },
   {
    "name": "mode",
    "desc": "pop か remove。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/fog @s remove myfog",
    "result": "myfog で つけた きりを はずす。"
   }
  ],
  "careful": "",
  "related": [
   "camera",
   "effect"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/fog?view=minecraft-bedrock-stable",
  "note": "バニラで使える fogId の名前は公式コマンドページに一覧なし【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "gamemode",
  "name": "/gamemode",
  "read": "ゲームモード",
  "basic": "gamemode",
  "yomi": [
   "げーむもーど"
  ],
  "what": "ゲームモードを きりかえる。",
  "patterns": [
   {
    "syntax": "/gamemode <gameMode: GameMode> [player: target]",
    "kid": "ことばで きめる（creative, survival, adventure, spectator など）。"
   },
   {
    "syntax": "/gamemode <gameMode: int> [player: target]",
    "kid": "かずで きめる（0 サバイバル、 1 クリエイティブ、 2 アドベンチャー）。"
   }
  ],
  "args": [
   {
    "name": "gameMode",
    "desc": "モードの なまえか かず。",
    "optional": false
   },
   {
    "name": "player",
    "desc": "だれの モードか。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/gamemode adventure @p",
    "result": "ちかくの <ruby>人<rt>ひと</rt></ruby>が アドベンチャーに なる（ブロックを こわせない）。"
   },
   {
    "cmd": "/gamemode 1",
    "result": "クリエイティブに なる。"
   }
  ],
  "careful": "",
  "related": [
   "difficulty",
   "gamerule"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/gamemode?view=minecraft-bedrock-stable",
  "note": "かず指定の対応（0/1/2）と spectator の可否は公式ページに列挙なし【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "gamerule",
  "name": "/gamerule",
  "read": "ゲームルール",
  "basic": "gamerule",
  "yomi": [
   "げーむるーる"
  ],
  "cheats": false,
  "what": "ワールドの きまりを かえる。",
  "patterns": [
   {
    "syntax": "/gamerule",
    "kid": "いまの きまりを ぜんぶ <ruby>見<rt>み</rt></ruby>る。"
   },
   {
    "syntax": "/gamerule playerwaypoints <value: playerwaypointsValues>",
    "kid": "プレイヤーの いちの めじるしの せってい。"
   },
   {
    "syntax": "/gamerule <rule: BoolGameRule> [value: Boolean]",
    "kid": "true／false の きまり。"
   },
   {
    "syntax": "/gamerule <rule: IntGameRule> [value: int]",
    "kid": "かずの きまり。"
   }
  ],
  "args": [
   {
    "name": "rule",
    "desc": "きまりの なまえ。",
    "optional": false
   },
   {
    "name": "value",
    "desc": "true・false か かず。 しょうりゃく すると いまの せっていを <ruby>見<rt>み</rt></ruby>る。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/gamerule",
    "result": "きまりの いちらんが <ruby>出<rt>で</rt></ruby>る。"
   },
   {
    "cmd": "/gamerule domobspawning false",
    "result": "モブが しぜんに わかなく なる。"
   }
  ],
  "careful": "",
  "related": [
   "time",
   "difficulty"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/gamerule?view=minecraft-bedrock-stable",
  "note": "ルール名一覧はコマンドページにない【要実機確認】。playerwaypoints の値も未確認",
  "cat": "switch",
  "status": "doc",
  "permission": "Game Directors"
 },
 {
  "id": "give",
  "name": "/give",
  "read": "ギブ",
  "basic": "give",
  "yomi": [
   "ぎぶ"
  ],
  "what": "アイテムを あげる。",
  "patterns": [
   {
    "syntax": "/give <player: target> <itemName: Item> [amount: int] [data: int] [components: json]",
    "kid": "あいて・なまえ・かず。 data と components は むずかしいので つかわなくて いい。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "もらう <ruby>人<rt>ひと</rt></ruby>。",
    "optional": false
   },
   {
    "name": "itemName",
    "desc": "アイテムの なまえ。",
    "optional": false
   },
   {
    "name": "amount",
    "desc": "かず。",
    "optional": true
   },
   {
    "name": "data",
    "desc": "アイテムの しゅるいの ばんごう（むかしの しくみ）。",
    "optional": true
   },
   {
    "name": "components",
    "desc": "「こわせる ブロックを きめる」などの とくべつな せってい（JSON）。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/give @a cookie 3",
    "result": "みんなに クッキーが 3こ。"
   }
  ],
  "careful": "",
  "related": [
   "clear",
   "replaceitem",
   "loot"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/give?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "help",
  "name": "/help",
  "alias": "/?",
  "read": "ヘルプ",
  "yomi": [
   "へるぷ",
   "たすけて"
  ],
  "cheats": false,
  "permission": "Any",
  "what": "つかえる コマンドの いちらんや かきかたを <ruby>見<rt>み</rt></ruby>る。",
  "patterns": [
   {
    "syntax": "/help [command: CommandName]",
    "kid": "コマンドの なまえを つけると その かきかた。"
   },
   {
    "syntax": "/help <page: int>",
    "kid": "いちらんの ページばんごう。"
   }
  ],
  "args": [
   {
    "name": "command",
    "desc": "しりたい コマンド。",
    "optional": true
   },
   {
    "name": "page",
    "desc": "ページ。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/help give",
    "result": "give の かきかたが <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "",
  "related": [
   "list"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/help?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc"
 },
 {
  "id": "hud",
  "name": "/hud",
  "read": "ハド",
  "yomi": [
   "はど",
   "がめんの ひょうじ"
  ],
  "what": "<ruby>画面<rt>がめん</rt></ruby>の ハートや ホットバーを かくす・<ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/hud <target: target> <visible: HudVisibility> [hud_element: HudElement]",
    "kid": "hide（かくす）か reset（もどす）。"
   }
  ],
  "args": [
   {
    "name": "visible",
    "desc": "hide か reset。",
    "optional": false
   },
   {
    "name": "hud_element",
    "desc": "all, hunger, health, hotbar, crosshair, armor など 14しゅるい。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/hud @s hide hotbar",
    "result": "ホットバーが きえる。"
   },
   {
    "cmd": "/hud @s reset",
    "result": "ぜんぶ もとに もどる。"
   }
  ],
  "careful": "",
  "related": [
   "camera",
   "title"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/hud?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "inputpermission",
  "name": "/inputpermission",
  "read": "インプットパーミッション",
  "yomi": [
   "うごけない",
   "そうさ"
  ],
  "what": "ジャンプや いどうなどの そうさを とめる・もどす。",
  "patterns": [
   {
    "syntax": "/inputpermission set <targets: target> <permission: permission> <state: state>",
    "kid": "enabled（できる）か disabled（できない）。"
   },
   {
    "syntax": "/inputpermission query <targets: target> <permission: permission> [state: state]",
    "kid": "いま どうなって いるか しらべる。"
   }
  ],
  "args": [
   {
    "name": "permission",
    "desc": "camera, movement, jump, sneak, mount, dismount, lateral_movement, move_forward など 11しゅるい。",
    "optional": false
   },
   {
    "name": "state",
    "desc": "enabled か disabled。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/inputpermission set @s jump disabled",
    "result": "ジャンプ できなく なる。"
   },
   {
    "cmd": "/inputpermission set @s jump enabled",
    "result": "また ジャンプ できる。"
   }
  ],
  "careful": "movement を とめたら かならず もどす。",
  "related": [
   "controlscheme",
   "camera"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/inputpermission?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "kick",
  "name": "/kick",
  "read": "キック",
  "yomi": [
   "きっく"
  ],
  "cheats": false,
  "what": "プレイヤーを ワールドから <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/kick <name: target> <reason: message>",
    "kid": "だれを・なぜ。"
   }
  ],
  "args": [
   {
    "name": "name",
    "desc": "<ruby>出<rt>だ</rt></ruby>す <ruby>人<rt>ひと</rt></ruby>。",
    "optional": false
   },
   {
    "name": "reason",
    "desc": "わけ。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/kick steve bye",
    "result": "steve が ワールドから <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "ともだちには つかわない。 こまった ときは おうちの <ruby>人<rt>ひと</rt></ruby>に。",
  "related": [
   "list",
   "op"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/kick?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "permission": "Game Directors"
 },
 {
  "id": "kill",
  "name": "/kill",
  "read": "キル",
  "basic": "kill",
  "yomi": [
   "きる"
  ],
  "what": "あいてを たおす・けす。",
  "patterns": [
   {
    "syntax": "/kill [target: target]",
    "kid": "あいてを きめる。 しょうりゃく すると じぶん。"
   }
  ],
  "args": [
   {
    "name": "target",
    "desc": "かならず type= で しぼる。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/kill @e[type=item,r=20]",
    "result": "20マス いないの おちて いる アイテムを けす。"
   }
  ],
  "careful": "/kill @e は ぜったいに うたない。",
  "related": [
   "summon",
   "damage"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/kill?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "list",
  "name": "/list",
  "read": "リスト",
  "yomi": [
   "りすと",
   "だれがいる"
  ],
  "cheats": false,
  "permission": "Any",
  "what": "いま ワールドに いる <ruby>人<rt>ひと</rt></ruby>の いちらん。",
  "patterns": [
   {
    "syntax": "/list",
    "kid": "なにも つけない。"
   }
  ],
  "args": [],
  "examples": [
   {
    "cmd": "/list",
    "result": "いる <ruby>人<rt>ひと</rt></ruby>の なまえが <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "",
  "related": [
   "help"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/list?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc"
 },
 {
  "id": "locate",
  "name": "/locate",
  "read": "ロケート",
  "yomi": [
   "ろけーと",
   "さがす",
   "むら"
  ],
  "what": "いちばん ちかい たてものや バイオームを さがす。",
  "patterns": [
   {
    "syntax": "/locate structure <structure: StructureFeature> [useNewChunksOnly: Boolean]",
    "kid": "village（むら）、 mansion（やかた）など。"
   },
   {
    "syntax": "/locate biome <biome: Biome>",
    "kid": "minecraft:desert（さばく）など。"
   }
  ],
  "args": [
   {
    "name": "structure",
    "desc": "たてもの（17しゅるい）。",
    "optional": false
   },
   {
    "name": "biome",
    "desc": "バイオーム（87しゅるい）。",
    "optional": false
   },
   {
    "name": "useNewChunksOnly",
    "desc": "まだ いって いない ところだけ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/locate structure village",
    "result": "いちばん ちかい むらの ばしょが <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "",
  "related": [
   "teleport"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/locate?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "loot",
  "name": "/loot",
  "read": "ルート",
  "yomi": [
   "るーと",
   "たからばこ"
  ],
  "what": "たからばこや モブの おとしものを つくって <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/loot spawn <position: x y z> loot <loot_table: string> [<tool>|mainhand|offhand: Tool]",
    "kid": "その ばしょに おとす。"
   },
   {
    "syntax": "/loot give <players: target> kill <entity: target> [<tool>|mainhand|offhand: Tool]",
    "kid": "その モブを たおした ときの ものを もらう。"
   },
   {
    "syntax": "/loot insert <position: x y z> mine <TargetBlockPosition: x y z> [<tool>|mainhand|offhand: Tool]",
    "kid": "ブロックを ほった ときの ものを チェストに いれる。"
   },
   {
    "syntax": "/loot replace entity <entity: target> <slotType: EntityEquipmentSlot> <slotId: int> loot <loot_table: string> [<tool>|mainhand|offhand: Tool]",
    "kid": "もちものの わくに いれる。"
   }
  ],
  "args": [
   {
    "name": "spawn / give / insert / replace",
    "desc": "どこに <ruby>出<rt>だ</rt></ruby>すか。",
    "optional": false
   },
   {
    "name": "loot / kill / mine",
    "desc": "なにの おとしもの か。",
    "optional": false
   },
   {
    "name": "loot_table",
    "desc": "テーブルの なまえ。",
    "optional": false
   },
   {
    "name": "tool",
    "desc": "つかう どうぐ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/loot give @s kill @e[type=cow,c=1]",
    "result": "ウシを たおした ときの ものが もらえる（ウシは たおれない）。"
   }
  ],
  "careful": "",
  "related": [
   "give",
   "replaceitem"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/loot?view=minecraft-bedrock-stable",
  "note": "公式ページ構文は21通り。loot_table の名前は【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "me",
  "name": "/me",
  "read": "ミー",
  "yomi": [
   "みー"
  ],
  "cheats": false,
  "permission": "Any",
  "what": "「じぶんの なまえ ＋ ことば」を チャットに <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/me <message: message>",
    "kid": "ことば。"
   }
  ],
  "args": [
   {
    "name": "message",
    "desc": "ことば。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/me is happy",
    "result": "＊ なまえ is happy と <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "オンラインでは みんなに <ruby>見<rt>み</rt></ruby>える。",
  "related": [
   "say",
   "tell"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/me?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc"
 },
 {
  "id": "mobevent",
  "name": "/mobevent",
  "read": "モブイベント",
  "yomi": [
   "もぶいべんと"
  ],
  "what": "ぎょうしょうにんや とうぞくの パトロールが くるか きめる。",
  "patterns": [
   {
    "syntax": "/mobevent <event: MobEvent> [value: Boolean]",
    "kid": "true で くる、 false で こない。"
   }
  ],
  "args": [
   {
    "name": "event",
    "desc": "minecraft:pillager_patrols_event, minecraft:wandering_trader_event, minecraft:ender_dragon_event, events_enabled。",
    "optional": false
   },
   {
    "name": "value",
    "desc": "true か false。 しょうりゃく すると いまの せってい。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/mobevent minecraft:pillager_patrols_event false",
    "result": "パトロールが こなく なる。"
   }
  ],
  "careful": "",
  "related": [
   "gamerule",
   "difficulty"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/mobevent?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "music",
  "name": "/music",
  "read": "ミュージック",
  "yomi": [
   "みゅーじっく",
   "おんがく"
  ],
  "what": "おんがくを ながす・とめる。",
  "patterns": [
   {
    "syntax": "/music play <trackName: string> [volume: float] [fadeSeconds: float] [repeatMode: MusicRepeatMode]",
    "kid": "すぐ ながす。 play_once（1かい）か loop（くりかえし）。"
   },
   {
    "syntax": "/music queue <trackName: string> [volume: float] [fadeSeconds: float] [repeatMode: MusicRepeatMode]",
    "kid": "いまの きょくの つぎに ながす。"
   },
   {
    "syntax": "/music stop [fadeSeconds: float]",
    "kid": "とめる。"
   },
   {
    "syntax": "/music volume <volume: float>",
    "kid": "おおきさ。"
   }
  ],
  "args": [
   {
    "name": "trackName",
    "desc": "きょくの なまえ。",
    "optional": false
   },
   {
    "name": "volume",
    "desc": "おおきさ。",
    "optional": true
   },
   {
    "name": "fadeSeconds",
    "desc": "だんだん かわる びょう。",
    "optional": true
   },
   {
    "name": "repeatMode",
    "desc": "play_once か loop。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/music stop 3",
    "result": "3びょうで だんだん きえる。"
   }
  ],
  "careful": "",
  "related": [
   "playsound",
   "stopsound"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/music?view=minecraft-bedrock-stable",
  "note": "バニラで指定できる trackName は【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "op",
  "name": "/op",
  "read": "オプ",
  "yomi": [
   "おぷ",
   "おぺれーたー"
  ],
  "cheats": false,
  "permission": "Admin",
  "what": "プレイヤーを 「オペレーター（コマンドが うてる <ruby>人<rt>ひと</rt></ruby>）」に する。",
  "patterns": [
   {
    "syntax": "/op <player: target>",
    "kid": "その <ruby>人<rt>ひと</rt></ruby>を オペレーターに。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "だれを。",
    "optional": false
   }
  ],
  "examples": [],
  "careful": "ともだちに コマンドの ちからを わたす ことに なる。 おうちの <ruby>人<rt>ひと</rt></ruby>と いっしょに きめる。",
  "related": [
   "deop",
   "kick"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/op?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc"
 },
 {
  "id": "particle",
  "name": "/particle",
  "read": "パーティクル",
  "basic": "particle",
  "yomi": [
   "ぱーてぃくる"
  ],
  "what": "もようを <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/particle <effect: string> [position: x y z]",
    "kid": "なまえと ばしょだけの みじかい コマンド。"
   }
  ],
  "args": [
   {
    "name": "effect",
    "desc": "パーティクルの なまえ。",
    "optional": false
   },
   {
    "name": "position",
    "desc": "ばしょ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/particle minecraft:villager_happy ~ ~1 ~",
    "result": "<ruby>緑<rt>みどり</rt></ruby>の キラキラ。"
   }
  ],
  "careful": "",
  "related": [
   "execute"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/particle?view=minecraft-bedrock-stable",
  "note": "パーティクル名は【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "place",
  "name": "/place",
  "read": "プレイス",
  "yomi": [
   "ぷれいす",
   "き",
   "たてもの"
  ],
  "permission": "Admin",
  "what": "きや いせきなどを その ばに つくる。",
  "patterns": [
   {
    "syntax": "/place feature <feature: features> [position: x y z]",
    "kid": "きや こうぶつなどの 「かざり」。"
   },
   {
    "syntax": "/place featurerule <featurerule: featureRules> [position: x y z]",
    "kid": "しぜんの つくりかたの きまりで おく。"
   },
   {
    "syntax": "/place structure <structure: JigsawStructure> [pos: x y z] [ignoreStartHeight: Boolean] [keepJigsaws: Boolean] [includeEntities: Boolean] [liquidSettings: LiquidSettings]",
    "kid": "minecraft:trail_ruins（いせき）か minecraft:trial_chambers（しれんの まど）。"
   },
   {
    "syntax": "/place jigsaw <pool: filepath> <jigsawTarget: string> <maxDepth: int> [pos: x y z] [keepJigsaws: Boolean] [includeEntities: Boolean] [liquidSettings: LiquidSettings]",
    "kid": "ジグソーで くみたてる（むずかしい）。"
   }
  ],
  "args": [
   {
    "name": "feature / featurerule",
    "desc": "なまえ（とても おおい）。",
    "optional": false
   },
   {
    "name": "structure",
    "desc": "trail_ruins か trial_chambers。",
    "optional": false
   },
   {
    "name": "position",
    "desc": "ばしょ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/place feature minecraft:random_oak_tree_from_sapling_feature ~3 ~ ~",
    "result": "3マス さきに オークの <ruby>木<rt>き</rt></ruby>。"
   }
  ],
  "careful": "おおきな たてものは まわりを こわす。 れんしゅう ワールドで。",
  "related": [
   "structure",
   "clone"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/place?view=minecraft-bedrock-stable",
  "note": "権限 Admin。例の feature 名は公式一覧にあるもの",
  "cat": "switch",
  "status": "doc",
  "cheats": true
 },
 {
  "id": "playanimation",
  "name": "/playanimation",
  "read": "プレイアニメーション",
  "yomi": [
   "あにめーしょん",
   "うごき"
  ],
  "what": "モブに いちどだけ うごき（アニメーション）を させる。",
  "patterns": [
   {
    "syntax": "/playanimation <entity: target> <animation: string> [next_state: string] [blend_out_time: float] [stop_expression: string] [controller: string]",
    "kid": "あいてと うごきの なまえ。"
   }
  ],
  "args": [
   {
    "name": "entity",
    "desc": "あいて。",
    "optional": false
   },
   {
    "name": "animation",
    "desc": "うごきの なまえ。",
    "optional": false
   },
   {
    "name": "next_state / blend_out_time / stop_expression / controller",
    "desc": "むずかしい せってい。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/playanimation @s animation.player.sleeping",
    "result": "ねむる かっこうに なる。"
   }
  ],
  "careful": "",
  "related": [
   "event"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/playanimation?view=minecraft-bedrock-stable",
  "note": "例のアニメーション名は【要実機確認】",
  "status": "unknown",
  "cat": "switch",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "playsound",
  "name": "/playsound",
  "read": "プレイサウンド",
  "basic": "playsound",
  "yomi": [
   "ぷれいさうんど",
   "おと"
  ],
  "what": "<ruby>音<rt>おと</rt></ruby>を ならす。",
  "patterns": [
   {
    "syntax": "/playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]",
    "kid": "<ruby>音<rt>おと</rt></ruby>・あいて・ばしょ・おおきさ・たかさ。"
   }
  ],
  "args": [
   {
    "name": "sound",
    "desc": "<ruby>音<rt>おと</rt></ruby>の なまえ。",
    "optional": false
   },
   {
    "name": "player",
    "desc": "きく <ruby>人<rt>ひと</rt></ruby>。",
    "optional": true
   },
   {
    "name": "position",
    "desc": "<ruby>音<rt>おと</rt></ruby>が なる ばしょ。",
    "optional": true
   },
   {
    "name": "volume",
    "desc": "おおきさ。",
    "optional": true
   },
   {
    "name": "pitch",
    "desc": "たかさ（1 が ふつう、 2 で たかい）。",
    "optional": true
   },
   {
    "name": "minimumVolume",
    "desc": "とおくでも きこえる おおきさ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/playsound note.pling @s ~ ~ ~ 1 2",
    "result": "たかい <ruby>音<rt>おと</rt></ruby>で ポーン。"
   }
  ],
  "careful": "",
  "related": [
   "stopsound",
   "music"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/playsound?view=minecraft-bedrock-stable",
  "note": "音の名前は【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "recipe",
  "name": "/recipe",
  "read": "レシピ",
  "yomi": [
   "れしぴ",
   "くらふと"
  ],
  "what": "クラフトの レシピを おぼえさせる・わすれさせる。",
  "patterns": [
   {
    "syntax": "/recipe give <player: target> <recipe: UnlockableRecipeValues>",
    "kid": "おぼえさせる。 * で ぜんぶ。"
   },
   {
    "syntax": "/recipe take <player: target> <recipe: UnlockableRecipeValues>",
    "kid": "わすれさせる。"
   }
  ],
  "args": [
   {
    "name": "recipe",
    "desc": "レシピの なまえ。 * で ぜんぶ。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/recipe give @s *",
    "result": "ぜんぶの レシピが レシピブックに <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "",
  "related": [
   "give"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/recipe?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "replaceitem",
  "name": "/replaceitem",
  "read": "リプレイスアイテム",
  "yomi": [
   "りぷれいす",
   "そうび"
  ],
  "what": "もちものや チェストの きまった わくに アイテムを いれる。",
  "patterns": [
   {
    "syntax": "/replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]",
    "kid": "あいての わく（あたま・て など）。"
   },
   {
    "syntax": "/replaceitem block <position: x y z> slot.container <slotId: int> <itemName: Item> [amount: int] [data: int] [components: json]",
    "kid": "チェストなどの わく。"
   },
   {
    "syntax": "/replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <oldItemHandling: ReplaceMode> <itemName: Item> [amount: int] [data: int] [components: json]",
    "kid": "keep で あいて いる ときだけ、 destroy で おきかえ。"
   }
  ],
  "args": [
   {
    "name": "slotType",
    "desc": "slot.armor.head（あたま）、 slot.weapon.mainhand（ききて）など。",
    "optional": false
   },
   {
    "name": "slotId",
    "desc": "わくの ばんごう（0 から）。",
    "optional": false
   },
   {
    "name": "oldItemHandling",
    "desc": "keep か destroy。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/replaceitem entity @s slot.armor.head 0 pumpkin",
    "result": "あたまに カボチャを かぶる。"
   }
  ],
  "careful": "",
  "related": [
   "give",
   "clear",
   "loot"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/replaceitem?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "ride",
  "name": "/ride",
  "read": "ライド",
  "yomi": [
   "らいど",
   "のる"
  ],
  "what": "モブに のせる・おろす。",
  "patterns": [
   {
    "syntax": "/ride <riders: target> start_riding <ride: target> [teleportRules: TeleportRules] [howToFill: FillType]",
    "kid": "のせる。"
   },
   {
    "syntax": "/ride <riders: target> stop_riding",
    "kid": "おろす。"
   },
   {
    "syntax": "/ride <rides: target> evict_riders",
    "kid": "のって いる ものを ぜんぶ おろす。"
   },
   {
    "syntax": "/ride <rides: target> summon_rider <entityType: EntityType> [spawnEvent: string] [nameTag: string]",
    "kid": "のる モブを よびだす。"
   },
   {
    "syntax": "/ride <riders: target> summon_ride <entityType: EntityType> [rideRules: RideRules] [spawnEvent: string] [nameTag: string]",
    "kid": "のりものを よびだして のる。"
   }
  ],
  "args": [
   {
    "name": "riders / rides",
    "desc": "のる ほう／のせる ほう。",
    "optional": false
   },
   {
    "name": "teleportRules",
    "desc": "teleport_rider か teleport_ride。",
    "optional": true
   },
   {
    "name": "howToFill",
    "desc": "until_full か if_group_fits。",
    "optional": true
   },
   {
    "name": "rideRules",
    "desc": "no_ride_change, reassign_rides, skip_riders。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/ride @s summon_ride horse",
    "result": "ウマを よびだして のる。"
   },
   {
    "cmd": "/ride @s stop_riding",
    "result": "おりる。"
   }
  ],
  "careful": "のれない モブも いる。",
  "related": [
   "summon"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/ride?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "say",
  "name": "/say",
  "read": "セイ",
  "basic": "say",
  "yomi": [
   "せい",
   "いう"
  ],
  "cheats": false,
  "what": "チャットに メッセージを <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/say <message: message>",
    "kid": "メッセージを みんなに <ruby>出<rt>だ</rt></ruby>す。 @p などを いれると なまえに かわる。"
   }
  ],
  "args": [
   {
    "name": "message",
    "desc": "<ruby>出<rt>だ</rt></ruby>したい ことば。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/say hello @p",
    "result": "hello と ちかくの <ruby>人<rt>ひと</rt></ruby>の なまえが <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "オンラインでは みんなに <ruby>見<rt>み</rt></ruby>える。",
  "related": [
   "tell",
   "me",
   "tellraw"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/say?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "permission": "Game Directors"
 },
 {
  "id": "scoreboard",
  "name": "/scoreboard",
  "read": "スコアボード",
  "basic": "scoreboard",
  "yomi": [
   "すこあぼーど"
  ],
  "what": "<ruby>点<rt>てん</rt></ruby>すうを あつかう。",
  "patterns": [
   {
    "syntax": "/scoreboard objectives add <objective: ScoreboardObjectives> dummy [displayName: string]",
    "kid": "<ruby>点<rt>てん</rt></ruby>すうの はこを つくる。"
   },
   {
    "syntax": "/scoreboard objectives remove <objective: ScoreboardObjectives>",
    "kid": "はこを けす。"
   },
   {
    "syntax": "/scoreboard objectives list",
    "kid": "はこの いちらん。"
   },
   {
    "syntax": "/scoreboard objectives setdisplay <displaySlot: ScoreboardDisplaySlotSortable> [objective: ScoreboardObjectives] [sortOrder: ScoreboardSortOrder]",
    "kid": "<ruby>画面<rt>がめん</rt></ruby>に <ruby>出<rt>だ</rt></ruby>す（sidebar, list）。 ならびじゅんも。"
   },
   {
    "syntax": "/scoreboard objectives setdisplay belowname [objective: ScoreboardObjectives]",
    "kid": "なまえの <ruby>下<rt>した</rt></ruby>に <ruby>出<rt>だ</rt></ruby>す。"
   },
   {
    "syntax": "/scoreboard players list [playername: targets]",
    "kid": "だれが なん<ruby>点<rt>てん</rt></ruby>か <ruby>見<rt>み</rt></ruby>る。"
   },
   {
    "syntax": "/scoreboard players reset <player: targets> [objective: ScoreboardObjectives]",
    "kid": "<ruby>点<rt>てん</rt></ruby>を なしに する。"
   },
   {
    "syntax": "/scoreboard players test <player: targets> <objective: ScoreboardObjectives> <min: wildcard int> [max: wildcard int]",
    "kid": "<ruby>点<rt>てん</rt></ruby>が はんいに あるか しらべる。"
   },
   {
    "syntax": "/scoreboard players random <player: targets> <objective: ScoreboardObjectives> <min: int> <max: int>",
    "kid": "ランダムな かずを いれる（サイコロ）。"
   },
   {
    "syntax": "/scoreboard players <action: ScoreboardPlayersNumAction> <player: targets> <objective: ScoreboardObjectives> <count: int>",
    "kid": "add（たす）・remove（ひく）・set（きめる）。"
   },
   {
    "syntax": "/scoreboard players operation <targetName: targets> <targetObjective: ScoreboardObjectives> <operation: operator> <selector: targets> <objective: ScoreboardObjectives>",
    "kid": "<ruby>点<rt>てん</rt></ruby>どうしで けいさん（+= -= *= /= %= = < > ><）。"
   }
  ],
  "args": [
   {
    "name": "objective",
    "desc": "はこの なまえ。",
    "optional": false
   },
   {
    "name": "displaySlot",
    "desc": "sidebar（よこ）、 list（いちらん）、 belowname（なまえの <ruby>下<rt>した</rt></ruby>）。",
    "optional": false
   },
   {
    "name": "count / min / max",
    "desc": "かず。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/scoreboard players random @p dice 1 6",
    "result": "dice に 1〜6 の どれかが はいる（サイコロ）。"
   },
   {
    "cmd": "/scoreboard players test @p point 10",
    "result": "10<ruby>点<rt>てん</rt></ruby> いじょうなら せいこう。"
   }
  ],
  "careful": "さきに objectives add で はこを つくる。",
  "related": [
   "execute",
   "tag"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/scoreboard?view=minecraft-bedrock-stable",
  "note": "operation の演算子一覧はコマンドページの記載に従う（要確認）",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "setblock",
  "name": "/setblock",
  "read": "セットブロック",
  "basic": "setblock",
  "yomi": [
   "せっとぶろっく"
  ],
  "what": "ブロックを 1こ おく。",
  "patterns": [
   {
    "syntax": "/setblock <position: x y z> <tileName: Block> <blockStates: block properties> [oldBlockHandling: SetBlockMode]",
    "kid": "ブロックの むきなどの 「じょうたい」も きめる。"
   },
   {
    "syntax": "/setblock <position: x y z> <tileName: Block> [oldBlockHandling: SetBlockMode]",
    "kid": "ふつうの かきかた。"
   }
  ],
  "args": [
   {
    "name": "position",
    "desc": "ばしょ。",
    "optional": false
   },
   {
    "name": "tileName",
    "desc": "ブロックの なまえ。",
    "optional": false
   },
   {
    "name": "blockStates",
    "desc": "むきや いろなどの じょうたい（[\"facing_direction\"=2] の ような かきかた）。",
    "optional": true
   },
   {
    "name": "oldBlockHandling",
    "desc": "replace（おきかえる）、 destroy（こわして アイテムを おとす）、 keep（あいて いる ときだけ）。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/setblock ~ ~ ~2 stone keep",
    "result": "そこが からっぽの ときだけ <ruby>石<rt>いし</rt></ruby>を おく。"
   },
   {
    "cmd": "/setblock ~ ~ ~2 air destroy",
    "result": "ブロックを こわして アイテムを おとす。"
   }
  ],
  "careful": "",
  "related": [
   "fill",
   "clone",
   "testforblock"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/setblock?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "setmaxplayers",
  "name": "/setmaxplayers",
  "read": "セットマックスプレイヤーズ",
  "yomi": [
   "にんずう"
  ],
  "permission": "Host",
  "what": "いっしょに あそべる にんずうを きめる。",
  "patterns": [
   {
    "syntax": "/setmaxplayers <maxPlayers: int>",
    "kid": "にんずう。"
   }
  ],
  "args": [
   {
    "name": "maxPlayers",
    "desc": "にんずう。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/setmaxplayers 2",
    "result": "2<ruby>人<rt>にん</rt></ruby>まで。"
   }
  ],
  "careful": "おうちの <ruby>人<rt>ひと</rt></ruby>と いっしょに。",
  "related": [
   "list",
   "kick"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/setmaxplayers?view=minecraft-bedrock-stable",
  "note": "権限 Host。Switch で自分が開いたワールドで使えるか【要実機確認】",
  "status": "unknown",
  "cat": "switch",
  "cheats": true
 },
 {
  "id": "setworldspawn",
  "name": "/setworldspawn",
  "read": "セットワールドスポーン",
  "yomi": [
   "わーるどすぽーん"
  ],
  "what": "ワールドの はじまりの ばしょを きめる。",
  "patterns": [
   {
    "syntax": "/setworldspawn [spawnPoint: x y z]",
    "kid": "しょうりゃく すると いまの ばしょ。"
   }
  ],
  "args": [
   {
    "name": "spawnPoint",
    "desc": "ばしょ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/setworldspawn",
    "result": "ここが ワールドの はじまりの ばしょに なる。"
   }
  ],
  "careful": "ワールド ぜんたいに えいきょうする。 れんしゅう ワールドだけで。",
  "related": [
   "spawnpoint"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/setworldspawn?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "spawnpoint",
  "name": "/spawnpoint",
  "read": "スポーンポイント",
  "basic": "spawnpoint",
  "yomi": [
   "すぽーんぽいんと"
  ],
  "what": "ふっかつ ちてんを きめる。",
  "patterns": [
   {
    "syntax": "/spawnpoint [player: target] [spawnPos: x y z]",
    "kid": "あいてと ばしょ。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "だれの。",
    "optional": true
   },
   {
    "name": "spawnPos",
    "desc": "ばしょ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/spawnpoint @a 0 80 0",
    "result": "みんなの ふっかつ ちてんを 0 80 0 に。"
   }
  ],
  "careful": "",
  "related": [
   "setworldspawn",
   "clearspawnpoint"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/spawnpoint?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "spreadplayers",
  "name": "/spreadplayers",
  "read": "スプレッドプレイヤーズ",
  "yomi": [
   "ばらばら",
   "ちらす"
  ],
  "what": "あいてを まわりの ばらばらな ばしょに とばす。",
  "patterns": [
   {
    "syntax": "/spreadplayers <x: rotation> <z: rotation> <spreadDistance: float> <maxRange: float> <victim: target> [maxHeight: rotation]",
    "kid": "まんなか・あいだの きょり・ひろさ・あいて。"
   }
  ],
  "args": [
   {
    "name": "x / z",
    "desc": "まんなかの ばしょ（~ も つかえる）。",
    "optional": false
   },
   {
    "name": "spreadDistance",
    "desc": "あいだの いちばん みじかい きょり。",
    "optional": false
   },
   {
    "name": "maxRange",
    "desc": "まんなかから どこまで。",
    "optional": false
   },
   {
    "name": "victim",
    "desc": "とばす あいて。",
    "optional": false
   },
   {
    "name": "maxHeight",
    "desc": "いちばん たかい ところ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/spreadplayers ~ ~ 5 20 @e[type=pig]",
    "result": "ブタたちを 20マス いないに ばらばらに。"
   }
  ],
  "careful": "@a は つかわない。",
  "related": [
   "teleport"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/spreadplayers?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "stopsound",
  "name": "/stopsound",
  "read": "ストップサウンド",
  "yomi": [
   "おと",
   "とめる"
  ],
  "what": "<ruby>音<rt>おと</rt></ruby>を とめる。",
  "patterns": [
   {
    "syntax": "/stopsound <player: target> [sound: string]",
    "kid": "なまえを つけると その <ruby>音<rt>おと</rt></ruby>だけ。"
   }
  ],
  "args": [
   {
    "name": "player",
    "desc": "だれの。",
    "optional": false
   },
   {
    "name": "sound",
    "desc": "<ruby>音<rt>おと</rt></ruby>の なまえ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/stopsound @s",
    "result": "ぜんぶの <ruby>音<rt>おと</rt></ruby>が とまる。"
   }
  ],
  "careful": "",
  "related": [
   "playsound",
   "music"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/stopsound?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "structure",
  "name": "/structure",
  "read": "ストラクチャー",
  "yomi": [
   "すとらくちゃー",
   "ほぞん",
   "たてもの"
  ],
  "what": "たてものを なまえを つけて ほぞん して、 あとで <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/structure save <name: string> <from: x y z> <to: x y z> [saveMode: StructureSaveMode]",
    "kid": "ほぞん。 disk で ずっと、 memory で いちじてき。"
   },
   {
    "syntax": "/structure load <name: string> <to: x y z> [rotation: Rotation] [mirror: Mirror] [includeEntities: Boolean] [includeBlocks: Boolean] [waterlogged: Boolean] [integrity: float] [seed: string]",
    "kid": "<ruby>出<rt>だ</rt></ruby>す。 まわす・はんてん できる。"
   },
   {
    "syntax": "/structure load <name: string> <to: x y z> [rotation: Rotation] [mirror: Mirror] [animationMode: StructureAnimationMode] [animationSeconds: float] …",
    "kid": "1ブロックずつ（block_by_block）でき あがる。"
   },
   {
    "syntax": "/structure delete <name: string>",
    "kid": "けす。"
   }
  ],
  "args": [
   {
    "name": "name",
    "desc": "じぶんで きめる なまえ。",
    "optional": false
   },
   {
    "name": "rotation",
    "desc": "0_degrees, 90_degrees, 180_degrees, 270_degrees。",
    "optional": true
   },
   {
    "name": "mirror",
    "desc": "none, x, z, xz。",
    "optional": true
   },
   {
    "name": "animationMode",
    "desc": "block_by_block か layer_by_layer。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/structure save house ~ ~ ~ ~5 ~5 ~5 disk",
    "result": "いえを house と いう なまえで ほぞん。"
   },
   {
    "cmd": "/structure load house ~10 ~ ~ 90_degrees none block_by_block 3",
    "result": "3びょうかけて 90ど まわった いえが できる。"
   }
  ],
  "careful": "",
  "related": [
   "clone",
   "fill",
   "place"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/structure?view=minecraft-bedrock-stable",
  "note": "animationMode の構文はページ上の2つめの load。省略した引数はページ参照",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "summon",
  "name": "/summon",
  "read": "サモン",
  "basic": "summon",
  "yomi": [
   "さもん"
  ],
  "what": "モブや ものを よびだす。",
  "patterns": [
   {
    "syntax": "/summon <entityType: EntityType> [spawnPos: x y z] [yRot: rotation] [xRot: rotation] [spawnEvent: EntityEvents] [nameTag: string]",
    "kid": "ばしょ・むき・とくべつな イベント・なまえ。"
   },
   {
    "syntax": "/summon <entityType: EntityType> <nameTag: string> [spawnPos: x y z]",
    "kid": "なまえを つけて よびだす。"
   },
   {
    "syntax": "/summon <entityType: EntityType> [spawnPos: x y z] facing <lookAtPosition: x y z> [spawnEvent: EntityEvents] [nameTag: string]",
    "kid": "ばしょの ほうを むかせる。"
   },
   {
    "syntax": "/summon <entityType: EntityType> [spawnPos: x y z] facing <lookAtEntity: target> [spawnEvent: EntityEvents] [nameTag: string]",
    "kid": "あいての ほうを むかせる。"
   }
  ],
  "args": [
   {
    "name": "entityType",
    "desc": "モブの なまえ。",
    "optional": false
   },
   {
    "name": "spawnPos",
    "desc": "ばしょ。",
    "optional": true
   },
   {
    "name": "nameTag",
    "desc": "あたまの <ruby>上<rt>うえ</rt></ruby>の なまえ。",
    "optional": true
   },
   {
    "name": "spawnEvent",
    "desc": "「こどもで うまれる」などの とくべつな イベント。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/summon cat pochi",
    "result": "pochi と いう なまえの ネコ。"
   },
   {
    "cmd": "/summon cow ~ ~ ~3 facing @p",
    "result": "ウシが こちらを むいて <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "リピートで つかわない。",
  "related": [
   "kill",
   "event",
   "ride"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/summon?view=minecraft-bedrock-stable",
  "note": "spawnEvent の値（minecraft:entity_born など）はモブごとに異なり公式コマンドページに一覧なし【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "tag",
  "name": "/tag",
  "read": "タグ",
  "basic": "tag",
  "yomi": [
   "たぐ"
  ],
  "what": "しるしを つける・はずす・<ruby>見<rt>み</rt></ruby>る。",
  "patterns": [
   {
    "syntax": "/tag <entity: targets> <action: TagChangeAction> <name: TagValues>",
    "kid": "add（つける）・remove（はずす）。"
   },
   {
    "syntax": "/tag <entity: targets> list",
    "kid": "しるしの いちらん。"
   }
  ],
  "args": [
   {
    "name": "entity",
    "desc": "あいて。",
    "optional": false
   },
   {
    "name": "action",
    "desc": "add・remove。",
    "optional": false
   },
   {
    "name": "name",
    "desc": "しるしの なまえ。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/tag @e[type=cow,c=1] add boss",
    "result": "1とうの ウシに boss の しるし。"
   }
  ],
  "careful": "",
  "related": [
   "scoreboard",
   "testfor"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/tag?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "teleport",
  "name": "/teleport",
  "alias": "/tp",
  "read": "テレポート",
  "basic": "tp",
  "yomi": [
   "てれぽーと",
   "tp"
  ],
  "what": "<ruby>人<rt>ひと</rt></ruby>や モブを いどうさせる。 /tp と おなじ。",
  "patterns": [
   {
    "syntax": "/teleport <destination: x y z> [checkForBlocks: Boolean]",
    "kid": "じぶんを ばしょへ。"
   },
   {
    "syntax": "/teleport <destination: x y z> [yRot: rotation] [xRot: rotation] [checkForBlocks: Boolean]",
    "kid": "ばしょと、 むく ほうこう（よこ・たて）。"
   },
   {
    "syntax": "/teleport <destination: x y z> facing <lookAtPosition: x y z> [checkForBlocks: Boolean]",
    "kid": "いどうして、 その ばしょの ほうを むく。"
   },
   {
    "syntax": "/teleport <destination: x y z> facing <lookAtEntity: target> [checkForBlocks: Boolean]",
    "kid": "いどうして、 その あいての ほうを むく。"
   },
   {
    "syntax": "/teleport <victim: target> <destination: x y z> [yRot: rotation] [xRot: rotation] [checkForBlocks: Boolean]",
    "kid": "あいてを ばしょへ。 むきも きめる。"
   },
   {
    "syntax": "/teleport <victim: target> <destination: x y z> [checkForBlocks: Boolean]",
    "kid": "あいてを ばしょへ。"
   },
   {
    "syntax": "/teleport <victim: target> <destination: x y z> facing <lookAtPosition: x y z> [checkForBlocks: Boolean]",
    "kid": "あいてを いどうして、 ばしょの ほうを むかせる。"
   },
   {
    "syntax": "/teleport <victim: target> <destination: x y z> facing <lookAtEntity: target> [checkForBlocks: Boolean]",
    "kid": "あいてを いどうして、 べつの あいての ほうを むかせる。"
   },
   {
    "syntax": "/teleport <destination: target>",
    "kid": "じぶんを あいての ところへ。"
   },
   {
    "syntax": "/teleport <victim: target> <destination: target> [checkForBlocks: Boolean]",
    "kid": "あいてを べつの あいての ところへ。"
   }
  ],
  "args": [
   {
    "name": "victim",
    "desc": "うごかす あいて。 しょうりゃく すると じぶん。",
    "optional": true
   },
   {
    "name": "destination",
    "desc": "いく ばしょ（X Y Z）か、 あいて。",
    "optional": false
   },
   {
    "name": "yRot / xRot",
    "desc": "むく ほうこう（よこ／たて）の かくど。",
    "optional": true
   },
   {
    "name": "facing",
    "desc": "その ほうを むく。",
    "optional": true
   },
   {
    "name": "checkForBlocks",
    "desc": "true に すると、 ブロックに うまる ばしょには いかない。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/tp @s ~ ~ ~ facing ~ ~ ~5",
    "result": "その ばで うしろ（Z の むき）を むく。"
   },
   {
    "cmd": "/tp @a @s",
    "result": "みんなを じぶんの ところに よぶ。"
   },
   {
    "cmd": "/tp @s ~ ~ ~10 true",
    "result": "ブロックに うまらない ときだけ いどう。"
   }
  ],
  "careful": "@a を うごかすと ともだちも いどう して しまう。",
  "related": [
   "spreadplayers",
   "spawnpoint",
   "execute"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/teleport?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "tell",
  "name": "/tell",
  "alias": "/w, /msg",
  "read": "テル",
  "yomi": [
   "てる",
   "ないしょ"
  ],
  "cheats": false,
  "permission": "Any",
  "what": "きめた <ruby>人<rt>ひと</rt></ruby>だけに メッセージを おくる。",
  "patterns": [
   {
    "syntax": "/tell <target: target> <message: message>",
    "kid": "あいてと ことば。"
   }
  ],
  "args": [
   {
    "name": "target",
    "desc": "あいて。",
    "optional": false
   },
   {
    "name": "message",
    "desc": "ことば。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/tell @s hello",
    "result": "じぶんだけに hello。"
   }
  ],
  "careful": "しらない <ruby>人<rt>ひと</rt></ruby>とは やりとり しない。",
  "related": [
   "say",
   "me",
   "tellraw"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/tell?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc"
 },
 {
  "id": "tellraw",
  "name": "/tellraw",
  "read": "テルロー",
  "yomi": [
   "てるろー"
  ],
  "cheats": false,
  "what": "JSON で かいた メッセージを とどける。",
  "patterns": [
   {
    "syntax": "/tellraw <target: target> <raw json message: json>",
    "kid": "{\"rawtext\":[{\"text\":\"…\"}]} の かたちで かく。"
   }
  ],
  "args": [
   {
    "name": "target",
    "desc": "とどける あいて。",
    "optional": false
   },
   {
    "name": "raw json message",
    "desc": "rawtext の JSON。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/tellraw @a {\"rawtext\":[{\"text\":\"hi\"}]}",
    "result": "みんなに hi。"
   }
  ],
  "careful": "きごうが おおくて ながい。 ふだんは /say で じゅうぶん。",
  "related": [
   "say",
   "tell",
   "titleraw"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/tellraw?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "permission": "Game Directors"
 },
 {
  "id": "testfor",
  "name": "/testfor",
  "read": "テストフォー",
  "basic": "testfor",
  "yomi": [
   "てすとふぉー"
  ],
  "what": "あいてが いるか しらべる。",
  "patterns": [
   {
    "syntax": "/testfor <victim: target>",
    "kid": "いたら せいこう。"
   }
  ],
  "args": [
   {
    "name": "victim",
    "desc": "しらべる あいて。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/testfor @e[type=zombie,r=10]",
    "result": "10マス いないに ゾンビが いたら せいこう。"
   }
  ],
  "careful": "",
  "related": [
   "testforblock",
   "testforblocks",
   "execute"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/testfor?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "testforblock",
  "name": "/testforblock",
  "read": "テストフォーブロック",
  "basic": "testforblock",
  "yomi": [
   "てすとふぉーぶろっく"
  ],
  "what": "ブロックが あるか しらべる。",
  "patterns": [
   {
    "syntax": "/testforblock <position: x y z> <tileName: Block> [blockStates: block properties]",
    "kid": "じょうたいまで しらべられる。"
   }
  ],
  "args": [
   {
    "name": "position",
    "desc": "ばしょ。",
    "optional": false
   },
   {
    "name": "tileName",
    "desc": "ブロック。",
    "optional": false
   },
   {
    "name": "blockStates",
    "desc": "じょうたい。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/testforblock ~ ~1 ~ lever",
    "result": "<ruby>上<rt>うえ</rt></ruby>に レバーが あれば せいこう。"
   }
  ],
  "careful": "",
  "related": [
   "testforblocks",
   "testfor"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/testforblock?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "testforblocks",
  "name": "/testforblocks",
  "read": "テストフォーブロックス",
  "yomi": [
   "くらべる"
  ],
  "what": "2つの はんいの ブロックが おなじか くらべる。",
  "patterns": [
   {
    "syntax": "/testforblocks <begin: x y z> <end: x y z> <destination: x y z> [mode: TestForBlocksMode]",
    "kid": "all（ぜんぶ）か masked（くうき いがい）。"
   }
  ],
  "args": [
   {
    "name": "begin / end",
    "desc": "おてほんの はこの かど。",
    "optional": false
   },
   {
    "name": "destination",
    "desc": "くらべる さきの かど。",
    "optional": false
   },
   {
    "name": "mode",
    "desc": "all か masked。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/testforblocks 0 64 0 2 64 2 10 64 0",
    "result": "おてほんと おなじなら せいこう（パズルの こたえあわせ）。"
   }
  ],
  "careful": "",
  "related": [
   "testforblock",
   "clone"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/testforblocks?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "tickingarea",
  "name": "/tickingarea",
  "read": "ティッキングエリア",
  "yomi": [
   "うごきつづける"
  ],
  "what": "とおくに いても その ばしょを うごかし つづける。",
  "patterns": [
   {
    "syntax": "/tickingarea add <from: x y z> <to: x y z> [name: string] [preload: Boolean]",
    "kid": "はこで きめる。"
   },
   {
    "syntax": "/tickingarea add circle <center: x y z> <radius: int> [name: string] [preload: Boolean]",
    "kid": "まるで きめる。"
   },
   {
    "syntax": "/tickingarea remove <name: string>",
    "kid": "けす。"
   },
   {
    "syntax": "/tickingarea remove_all",
    "kid": "ぜんぶ けす。"
   },
   {
    "syntax": "/tickingarea list [all-dimensions: AllDimensions]",
    "kid": "いちらん。"
   }
  ],
  "args": [
   {
    "name": "from / to / center",
    "desc": "ばしょ。",
    "optional": false
   },
   {
    "name": "radius",
    "desc": "はんけい（チャンク）。",
    "optional": false
   },
   {
    "name": "name",
    "desc": "なまえ。",
    "optional": true
   },
   {
    "name": "preload",
    "desc": "さきに よみこむ。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/tickingarea add circle ~ ~ ~ 2 farm",
    "result": "ここの まわりを farm と して うごかし つづける。"
   },
   {
    "cmd": "/tickingarea list",
    "result": "いちらんが <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "ふやしすぎると おもく なる。",
  "related": [
   "schedule"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/tickingarea?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "time",
  "name": "/time",
  "read": "タイム",
  "basic": "time",
  "yomi": [
   "たいむ",
   "じかん"
  ],
  "what": "ワールドの じかんを かえたり、 しらべたり する。",
  "patterns": [
   {
    "syntax": "/time add <amount: int>",
    "kid": "いまの じかんに たす。 1にち は 24000。"
   },
   {
    "syntax": "/time set <amount: int>",
    "kid": "じかんを かずで きめる。 0 が あさ、 6000 が おひる。"
   },
   {
    "syntax": "/time set <time: TimeSpec>",
    "kid": "ことばで きめる：day, sunrise, noon, sunset, night, midnight。"
   },
   {
    "syntax": "/time query <time: TimeQuery>",
    "kid": "いまの じかんを しらべる：daytime, gametime, day。"
   }
  ],
  "args": [
   {
    "name": "amount",
    "desc": "じかんの かず（ティック）。 20 で 1びょう。",
    "optional": false
   },
   {
    "name": "time",
    "desc": "day（あさ）、 noon（おひる）、 sunset（ゆうがた）、 night（よる）、 midnight（まよなか）、 sunrise（よあけ）。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/time set 6000",
    "result": "おひるに なる。"
   },
   {
    "cmd": "/time add 1000",
    "result": "すこし じかんが すすむ。"
   },
   {
    "cmd": "/time query day",
    "result": "なんにちめか チャットに <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "ともだちと あそぶ ワールドでは うたない。",
  "related": [
   "weather",
   "daylock",
   "gamerule"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/time?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "title",
  "name": "/title",
  "read": "タイトル",
  "basic": "title",
  "yomi": [
   "たいとる"
  ],
  "what": "<ruby>画面<rt>がめん</rt></ruby>に <ruby>文字<rt>もじ</rt></ruby>を <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/title <player: target> clear",
    "kid": "いま <ruby>出<rt>で</rt></ruby>て いる <ruby>文字<rt>もじ</rt></ruby>を けす。"
   },
   {
    "syntax": "/title <player: target> reset",
    "kid": "せっていを もとに もどす。"
   },
   {
    "syntax": "/title <player: target> <titleLocation: TitleSet> <titleText: message>",
    "kid": "title・subtitle・actionbar に <ruby>出<rt>だ</rt></ruby>す。"
   },
   {
    "syntax": "/title <player: target> times <fadeIn: int> <stay: int> <fadeOut: int>",
    "kid": "あらわれる・とどまる・きえる じかん（ティック）。"
   }
  ],
  "args": [
   {
    "name": "titleLocation",
    "desc": "title（おおきく）、 subtitle（その <ruby>下<rt>した</rt></ruby>）、 actionbar（もちものの <ruby>上<rt>うえ</rt></ruby>）。",
    "optional": false
   },
   {
    "name": "fadeIn / stay / fadeOut",
    "desc": "20 で 1びょう。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/title @a times 10 60 10",
    "result": "3びょう <ruby>出<rt>で</rt></ruby>る ように する。"
   },
   {
    "cmd": "/title @a subtitle go",
    "result": "つぎの title の <ruby>下<rt>した</rt></ruby>に go。"
   }
  ],
  "careful": "",
  "related": [
   "titleraw",
   "say"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/title?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "titleraw",
  "name": "/titleraw",
  "read": "タイトルロー",
  "yomi": [
   "たいとるろー"
  ],
  "what": "JSON で かいた <ruby>文字<rt>もじ</rt></ruby>を <ruby>画面<rt>がめん</rt></ruby>に <ruby>出<rt>だ</rt></ruby>す。",
  "patterns": [
   {
    "syntax": "/titleraw <player: target> clear",
    "kid": "けす。"
   },
   {
    "syntax": "/titleraw <player: target> reset",
    "kid": "もとに もどす。"
   },
   {
    "syntax": "/titleraw <player: target> <titleLocation: TitleRawSet> <raw json titleText: json>",
    "kid": "rawtext で <ruby>出<rt>だ</rt></ruby>す。"
   },
   {
    "syntax": "/titleraw <player: target> times <fadeIn: int> <stay: int> <fadeOut: int>",
    "kid": "じかん。"
   }
  ],
  "args": [
   {
    "name": "raw json titleText",
    "desc": "rawtext の JSON。",
    "optional": false
   }
  ],
  "examples": [
   {
    "cmd": "/titleraw @a title {\"rawtext\":[{\"text\":\"go\"}]}",
    "result": "<ruby>画面<rt>がめん</rt></ruby>に go。"
   }
  ],
  "careful": "ふだんは /title で じゅうぶん。",
  "related": [
   "title",
   "tellraw"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/titleraw?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "toggledownfall",
  "name": "/toggledownfall",
  "read": "トグルダウンフォール",
  "yomi": [
   "あめ",
   "てんき"
  ],
  "what": "<ruby>雨<rt>あめ</rt></ruby>を ふらせる・やませる（きりかえ）。",
  "patterns": [
   {
    "syntax": "/toggledownfall",
    "kid": "なにも つけない。"
   }
  ],
  "args": [],
  "examples": [
   {
    "cmd": "/toggledownfall",
    "result": "はれなら <ruby>雨<rt>あめ</rt></ruby>に、 <ruby>雨<rt>あめ</rt></ruby>なら はれに。"
   }
  ],
  "careful": "",
  "related": [
   "weather"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/toggledownfall?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "weather",
  "name": "/weather",
  "read": "ウェザー",
  "basic": "weather",
  "yomi": [
   "てんき"
  ],
  "what": "<ruby>天気<rt>てんき</rt></ruby>を かえる・しらべる。",
  "patterns": [
   {
    "syntax": "/weather <type: WeatherType> [duration: int]",
    "kid": "clear・rain・thunder。 つづく じかんも きめられる。"
   },
   {
    "syntax": "/weather query",
    "kid": "いまの <ruby>天気<rt>てんき</rt></ruby>を しらべる。"
   }
  ],
  "args": [
   {
    "name": "type",
    "desc": "clear（はれ）、 rain（<ruby>雨<rt>あめ</rt></ruby>）、 thunder（かみなり）。",
    "optional": false
   },
   {
    "name": "duration",
    "desc": "つづく じかん（ティック）。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/weather rain 6000",
    "result": "5ふん くらい <ruby>雨<rt>あめ</rt></ruby>が ふる。"
   },
   {
    "cmd": "/weather query",
    "result": "いまの <ruby>天気<rt>てんき</rt></ruby>が <ruby>出<rt>で</rt></ruby>る。"
   }
  ],
  "careful": "",
  "related": [
   "time",
   "toggledownfall"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/weather?view=minecraft-bedrock-stable",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "xp",
  "name": "/xp",
  "read": "エックスピー",
  "yomi": [
   "けいけんち",
   "れべる"
  ],
  "what": "けいけんちを ふやす・へらす。",
  "patterns": [
   {
    "syntax": "/xp <amount: int> [player: target]",
    "kid": "かずで ふやす。 マイナスで へらす。"
   },
   {
    "syntax": "/xp <amount>L [player: target]",
    "kid": "かずの うしろに L を つけると レベルで ふやす。"
   }
  ],
  "args": [
   {
    "name": "amount",
    "desc": "かず。 L を つけると レベル。",
    "optional": false
   },
   {
    "name": "player",
    "desc": "だれに。",
    "optional": true
   }
  ],
  "examples": [
   {
    "cmd": "/xp 5L @s",
    "result": "レベルが 5 あがる。"
   },
   {
    "cmd": "/xp -1L @s",
    "result": "レベルが 1 さがる。"
   }
  ],
  "careful": "",
  "related": [
   "enchant"
  ],
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/xp?view=minecraft-bedrock-stable",
  "note": "公式ページの構文は `/xp <amount: int> [player: target]`。L 付き（レベル指定）の書き方はページに明記なし【要実機確認】",
  "cat": "switch",
  "status": "doc",
  "cheats": true,
  "permission": "Game Directors"
 },
 {
  "id": "allowlist",
  "name": "/allowlist",
  "cat": "bds",
  "reason": "サーバーに はいれる <ruby>人<rt>ひと</rt></ruby>を きめる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/allowlist?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "changesetting",
  "name": "/changesetting",
  "cat": "bds",
  "reason": "うごいて いる サーバーの せっていを かえる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/changesetting?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "permission",
  "name": "/permission",
  "cat": "bds",
  "reason": "サーバーの けんげんの ファイルを よみなおす。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/permission?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "reloadconfig",
  "name": "/reloadconfig",
  "cat": "bds",
  "reason": "サーバーの せってい ファイルを よみなおす。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/reloadconfig?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "reloadpacketlimitconfig",
  "name": "/reloadpacketlimitconfig",
  "cat": "bds",
  "reason": "サーバーの つうしんの せっていを よみなおす。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/reloadpacketlimitconfig?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "save",
  "name": "/save",
  "cat": "bds",
  "reason": "サーバーの ほぞんを とめたり しらべたり する。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/save?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "sendshowstoreoffer",
  "name": "/sendshowstoreoffer",
  "cat": "bds",
  "reason": "マーケットプレイスの ページを ひらかせる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/sendshowstoreoffer?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "stop",
  "name": "/stop",
  "cat": "bds",
  "reason": "サーバーを とめる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/stop?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "transfer",
  "name": "/transfer",
  "cat": "bds",
  "reason": "プレイヤーを べつの サーバーへ うつす。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/transfer?view=minecraft-bedrock-stable",
  "permission": "Owner",
  "cheats": true
 },
 {
  "id": "dialogue",
  "name": "/dialogue",
  "cat": "other",
  "reason": "NPC の かいわ。 かいわの ないようは アドオン（ビヘイビアパック）で つくる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/dialogue?view=minecraft-bedrock-stable",
  "permission": "Game Directors",
  "cheats": true
 },
 {
  "id": "function",
  "name": "/function",
  "cat": "other",
  "reason": "コマンドを まとめた ファイルを うごかす。 ファイルは アドオンで つくる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/function?view=minecraft-bedrock-stable",
  "permission": "Game Directors",
  "cheats": true
 },
 {
  "id": "gametest",
  "name": "/gametest",
  "cat": "other",
  "reason": "テストの しくみ。 じっけんてき きのう（Beta APIs）が ひつよう。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/gametest?view=minecraft-bedrock-stable",
  "permission": "Game Directors",
  "cheats": true
 },
 {
  "id": "packstack",
  "name": "/packstack",
  "cat": "other",
  "reason": "つかって いる パックの いちらんを <ruby>出<rt>だ</rt></ruby>す。 アドオンを つくる <ruby>人<rt>ひと</rt></ruby>むけ。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/packstack?view=minecraft-bedrock-stable",
  "permission": "Any",
  "cheats": false
 },
 {
  "id": "project",
  "name": "/project",
  "cat": "other",
  "reason": "Editor モードだけ で つかう。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/project?view=minecraft-bedrock-stable",
  "permission": "Game Directors",
  "cheats": false
 },
 {
  "id": "reload",
  "name": "/reload",
  "cat": "other",
  "reason": "アドオンの ファンクションや スクリプトを よみなおす。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/reload?view=minecraft-bedrock-stable",
  "permission": "Admin",
  "cheats": true
 },
 {
  "id": "schedule",
  "name": "/schedule",
  "cat": "other",
  "reason": "じかんや ばしょで ファンクションを うごかす。 ファンクションは アドオンで つくる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/schedule?view=minecraft-bedrock-stable",
  "permission": "Game Directors",
  "cheats": true
 },
 {
  "id": "script",
  "name": "/script",
  "cat": "other",
  "reason": "スクリプト（プログラム）の しらべもの よう。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/script?view=minecraft-bedrock-stable",
  "permission": "Admin",
  "cheats": true
 },
 {
  "id": "scriptevent",
  "name": "/scriptevent",
  "cat": "other",
  "reason": "スクリプトに あいずを おくる。 スクリプトは アドオンで つくる。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/scriptevent?view=minecraft-bedrock-stable",
  "permission": "Game Directors",
  "cheats": true
 },
 {
  "id": "wsserver",
  "name": "/wsserver",
  "cat": "other",
  "reason": "パソコンの プログラムと つなぐ。 Switch だけでは つかえない。",
  "note": "",
  "status": "doc",
  "url": "https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/wsserver?view=minecraft-bedrock-stable",
  "permission": "Admin",
  "cheats": true
 },
 {
  "id": "ability",
  "name": "/ability",
  "cat": "edu",
  "reason": "とぶ・こわせる などの けんげんを <ruby>人<rt>ひと</rt></ruby>ごとに きめる。",
  "note": "公式コマンド一覧（Bedrock）には載っていない。教育版のドキュメントによる一般的な説明【要確認】",
  "status": "unknown",
  "url": "",
  "permission": "",
  "cheats": true
 },
 {
  "id": "agent",
  "name": "/agent",
  "cat": "edu",
  "reason": "コードビルダーの エージェント（ロボット）を うごかす。",
  "note": "公式コマンド一覧（Bedrock）には載っていない。教育版のドキュメントによる一般的な説明【要確認】",
  "status": "unknown",
  "url": "",
  "permission": "",
  "cheats": true
 },
 {
  "id": "classroommode",
  "name": "/classroommode",
  "cat": "edu",
  "reason": "せんせい むけの クラスルームモードと つなぐ。",
  "note": "公式コマンド一覧（Bedrock）には載っていない。教育版のドキュメントによる一般的な説明【要確認】",
  "status": "unknown",
  "url": "",
  "permission": "",
  "cheats": true
 },
 {
  "id": "code",
  "name": "/code",
  "cat": "edu",
  "reason": "コードビルダーを ひらく。",
  "note": "公式コマンド一覧（Bedrock）には載っていない。教育版のドキュメントによる一般的な説明【要確認】",
  "status": "unknown",
  "url": "",
  "permission": "",
  "cheats": true
 },
 {
  "id": "immutableworld",
  "name": "/immutableworld",
  "cat": "edu",
  "reason": "ワールドを こわせない ように する。",
  "note": "公式コマンド一覧（Bedrock）には載っていない。教育版のドキュメントによる一般的な説明【要確認】",
  "status": "unknown",
  "url": "",
  "permission": "",
  "cheats": true
 },
 {
  "id": "worldbuilder",
  "name": "/worldbuilder",
  "cat": "edu",
  "reason": "ワールドビルダーの けんげんを きりかえる（/wb）。",
  "note": "公式コマンド一覧（Bedrock）には載っていない。教育版のドキュメントによる一般的な説明【要確認】",
  "status": "unknown",
  "url": "",
  "permission": "",
  "cheats": true
 }
];
