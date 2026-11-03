# 公式リファレンスの控え（Microsoft Learn）

2026-11-03 に Microsoft Learn の Bedrock コマンドリファレンスを読んで控えたものです。データ（`js/data.js`）の「確認状況：公式ドキュメントで確認済」はこの控えにもとづきます。

- 一覧：https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/ （一覧ページの更新日 2026-03-10）
- 各コマンド：`https://learn.microsoft.com/en-us/minecraft/creator/commands/commands/<name>?view=minecraft-bedrock-stable`

## 一覧（82個）：必要な権限／チートが必要か／ページの注記

| # | コマンド | 権限 | チート | 注記 |
|---|---|---|---|---|
| 1 | /aimassist | Game Directors | Yes | |
| 2 | /allowlist | Owner | Yes | サーバーの allowlist を管理 |
| 3 | /camera | Game Directors | Yes | |
| 4 | /camerashake | Game Directors | Yes | ユーザー設定で Allow Camera Shake が必要 |
| 5 | /changesetting | Owner | Yes | 専用サーバーの設定を変える |
| 6 | /clear | Game Directors | Yes | |
| 7 | /clearspawnpoint | Game Directors | Yes | |
| 8 | /clone | Game Directors | Yes | |
| 9 | /controlscheme | Game Directors | Yes | |
| 10 | /damage | Game Directors | Yes | |
| 11 | /daylock | Game Directors | Yes | |
| 12 | /deop | Admin | No | |
| 13 | /dialogue | Game Directors | Yes | |
| 14 | /difficulty | Game Directors | Yes | |
| 15 | /effect | Game Directors | Yes | |
| 16 | /enchant | Game Directors | Yes | |
| 17 | /event | Game Directors | Yes | |
| 18 | /execute | Game Directors | Yes | |
| 19 | /fill | Game Directors | Yes | |
| 20 | /fog | Game Directors | Yes | |
| 21 | /function | Game Directors | Yes | |
| 22 | /gamemode | Game Directors | Yes | |
| 23 | /gamerule | Game Directors | No | |
| 24 | /gametest | Game Directors | Yes | Beta APIs の実験的機能が必要 |
| 25 | /give | Game Directors | Yes | |
| 26 | /help | Any | No | |
| 27 | /hud | Game Directors | Yes | |
| 28 | /inputpermission | Game Directors | Yes | |
| 29 | /kick | Game Directors | No | |
| 30 | /kill | Game Directors | Yes | |
| 31 | /list | Any | No | |
| 32 | /locate | Game Directors | Yes | |
| 33 | /loot | Game Directors | Yes | |
| 34 | /me | Any | No | |
| 35 | /mobevent | Game Directors | Yes | |
| 36 | /music | Game Directors | Yes | |
| 37 | /op | Admin | No | |
| 38 | /packstack | Any | No | |
| 39 | /particle | Game Directors | Yes | |
| 40 | /permission | Owner | Yes | 専用サーバーだけ |
| 41 | /place | Admin | Yes | |
| 42 | /playanimation | Game Directors | Yes | |
| 43 | /playsound | Game Directors | Yes | |
| 44 | /project | Game Directors | No | Editor モードだけ |
| 45 | /recipe | Game Directors | Yes | |
| 46 | /reload | Admin | Yes | |
| 47 | /reloadconfig | Owner | Yes | |
| 48 | /reloadpacketlimitconfig | Owner | Yes | |
| 49 | /replaceitem | Game Directors | Yes | |
| 50 | /ride | Game Directors | Yes | |
| 51 | /save | Owner | Yes | 専用サーバーだけ |
| 52 | /say | Game Directors | No | |
| 53 | /schedule | Game Directors | Yes | |
| 54 | /scoreboard | Game Directors | Yes | |
| 55 | /script | Admin | Yes | |
| 56 | /scriptevent | Game Directors | Yes | |
| 57 | /sendshowstoreoffer | Owner | Yes | 専用サーバーだけ（管理者） |
| 58 | /setblock | Game Directors | Yes | |
| 59 | /setmaxplayers | Host | Yes | |
| 60 | /setworldspawn | Game Directors | Yes | |
| 61 | /spawnpoint | Game Directors | Yes | |
| 62 | /spreadplayers | Game Directors | Yes | |
| 63 | /stop | Owner | Yes | 専用サーバーだけ |
| 64 | /stopsound | Game Directors | Yes | |
| 65 | /structure | Game Directors | Yes | |
| 66 | /summon | Game Directors | Yes | |
| 67 | /tag | Game Directors | Yes | |
| 68 | /teleport | Game Directors | Yes | `/tp` とも書ける |
| 69 | /tell | Any | No | |
| 70 | /tellraw | Game Directors | No | |
| 71 | /testfor | Game Directors | Yes | |
| 72 | /testforblock | Game Directors | Yes | |
| 73 | /testforblocks | Game Directors | Yes | |
| 74 | /tickingarea | Game Directors | Yes | |
| 75 | /time | Game Directors | Yes | |
| 76 | /title | Game Directors | Yes | |
| 77 | /titleraw | Game Directors | Yes | |
| 78 | /toggledownfall | Game Directors | Yes | |
| 79 | /transfer | Owner | Yes | |
| 80 | /weather | Game Directors | Yes | |
| 81 | /wsserver | Admin | Yes | |
| 82 | /xp | Game Directors | Yes | |

教育版（Education Edition）だけのコマンドについての記載は、一覧にも各ページにも見つかりませんでした（Code Builder 用の `/agent` などは、この一覧には載っていません）。

## 基本編と関係するコマンドの構文（各ページから原文のまま）

- **time**：`/time add <amount: int>`／`/time set <amount: int>`／`/time set <time: TimeSpec>`／`/time query <time: TimeQuery>`（TimeSpec = day, sunrise, noon, sunset, night, midnight）
- **weather**：`/weather <type: WeatherType> [duration: int]`／`/weather query`（clear, rain, thunder）
- **say**：`/say <message: message>`
- **gamemode**：`/gamemode <gameMode: GameMode> [player: target]`／`/gamemode <gameMode: int> [player: target]`
- **give**：`/give <player: target> <itemName: Item> [amount: int] [data: int] [components: json]`
- **clear**：`/clear [player: target] [itemName: Item] [data: int] [maxCount: int]`
- **teleport (tp)**：`/teleport <destination: x y z> [checkForBlocks: Boolean]`／`/teleport <victim: target> <destination: x y z> [checkForBlocks: Boolean]`／`/teleport <destination: target>`／`/teleport <victim: target> <destination: target> [checkForBlocks: Boolean]`／facing・回転つきの形もあり
- **setblock**：`/setblock <position: x y z> <tileName: Block> [blockStates] [oldBlockHandling: SetBlockMode]`（replace, destroy, keep）
- **summon**：`/summon <entityType: EntityType> [spawnPos: x y z] …`／`/summon <entityType: EntityType> <nameTag: string> [spawnPos: x y z]`
- **fill**：`/fill <from: x y z> <to: x y z> <tileName: Block> [blockStates] [oldBlockHandling: FillMode]`（outline, hollow, destroy, keep）／`… replace [replaceTileName: Block]`
- **title**：`/title <player: target> <titleLocation: TitleSet> <titleText: message>`（title, subtitle, actionbar）／`clear`／`reset`／`times <fadeIn> <stay> <fadeOut>`
- **playsound**：`/playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]`
- **particle**：`/particle <effect: string> [position: x y z]`
- **effect**：`/effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]`／`/effect <player: target> <effect: Effect> infinite …`／`/effect <player: target> clear [effect: Effect]`
- **enchant**：`/enchant <player: target> <enchantmentName: Enchant> [level: int]`
- **kill**：`/kill [target: target]`
- **testfor**：`/testfor <victim: target>`
- **testforblock**：`/testforblock <position: x y z> <tileName: Block> [blockStates]`
- **gamerule**：`/gamerule <rule: BoolGameRule> [value: Boolean]`／`/gamerule <rule: IntGameRule> [value: int]`
- **spawnpoint**：`/spawnpoint [player: target] [spawnPos: x y z]`
- **scoreboard**：`objectives add <objective> dummy [displayName]`／`objectives setdisplay <slot> [objective]`／`players <add|remove|set> <player> <objective> <count>`／`players test …`／`players random …`／`players operation …`／`players reset …`
- **tag**：`/tag <entity: targets> <add|remove> <name>`／`/tag <entity: targets> list`
- **execute**：`as`／`at`／`in`／`positioned`／`rotated`／`facing`／`align`／`anchored`／`if|unless block|blocks|entity|score`／`run <command>`
- **clone**：`/clone <begin> <end> <destination> [maskMode] [cloneMode]`／`… filtered <cloneMode> <tileName>`
- **setworldspawn**：`/setworldspawn [spawnPoint: x y z]`
- **tellraw**：`/tellraw <target: target> <raw json message: json>`
- **titleraw**：`/titleraw <player: target> <titleLocation> <raw json titleText: json>` ほか

権限はどのページも「Game Directors」。チートが要らないのは `/say` `/gamerule` `/tellraw`。

## 大ずかんでの分類（フェーズ10・11）

- **Switch で使える（63）**：上の表のうち、下の2つ以外すべて。くわしいページ（構文パターン・引数・例文）あり
- **専用サーバー（BDS）だけ（9）**：allowlist, changesetting, permission, reloadconfig, reloadpacketlimitconfig, save, sendshowstoreoffer, stop, transfer
- **アドオンやパソコンが必要（10）**：dialogue, function, gametest, packstack, project, reload, schedule, script, scriptevent, wsserver
- **教育版だけ（6、公式一覧の外）**：ability, agent, classroommode, code, immutableworld, worldbuilder（未確認）

op / deop / kick / setmaxplayers はマルチプレイの管理用なので、ページに「おうちの人と いっしょに」と書いています。
