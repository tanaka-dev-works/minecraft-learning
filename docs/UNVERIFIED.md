# 実機で確かめてほしいこと（未確認の項目）

サイトの中で【要実機確認】（子ども向けページでは【じっきで たしかめる】）と書いた項目の一覧です。実機チェックリスト（pages/checklist.html）にも同じ項目が並んでいて、結果を記録できます。

## Switch の操作

- [ ] チャットを開くボタン（十字ボタンの右 → としている）
- [ ] 携帯モードで、画面キーボードを指で直接タップできるか
- [ ] 画面キーボードを英数入力に切り替える方法とボタン名
- [ ] 記号（/ @ ~ ^ [ ] = _ { } . : ,）の出し方
- [ ] / を打ったときにコマンド候補が出て選べるか／前に打ったコマンドを呼び出せるか
- [ ] コマンドブロックの設定画面の開き方（ZL）と閉じ方（B）
- [ ] コマンドブロック設定画面の項目名（種類・条件・レッドストーン・遅延・最後の出力）
- [ ] コマンドブロックを置いたときの矢印の向き（自分の向きとの関係）
- [ ] 「条件付き」にしたときの見た目の変化
- [ ] コマンドブロックの中では先頭の / を省略できるか

## ワールドの設定

- [ ] ワールドのコピーの手順（鉛筆ボタン → ワールドをコピー）
- [ ] 新規ワールド作成画面の項目名（フラット、チート、座標を表示、マルチプレイ）
- [ ] 座標が画面のどこに出るか

## コマンドと名前

- [ ] /gamemode c・s の短縮形が使えるか
- [ ] 音の名前：random.levelup / note.pling / random.orb / random.door_open
- [ ] パーティクル名：minecraft:heart_particle / minecraft:villager_happy
- [ ] ゲームルール名：commandblockoutput / dodaylightcycle / keepinventory / commandblocksenabled
- [ ] /fill で一度に置けるブロック数の上限
- [ ] /title の subtitle は title と一緒でないと出ないか
- [ ] /effect slow_falling（そらとび テレポート）
- [ ] /enchant で指定できるレベルの上限
- [ ] エラーメッセージの日本語表記（エラーずかん）

## 応用編（コマンド大ずかん・応用の作品）

- [ ] 応用：/clone の ~（相対座標）と向き。いえ コピー マシンで「右＝X+・奥＝Z+」になる立ち位置
- [ ] 応用：30びょう チャレンジ（リピートが1秒20回で 600＝30秒になるか）
- [ ] 応用：/execute as @p at @s if block ~ ~-1 ~ gold_block …（パワーアップ ゆか）
- [ ] 応用：/xp 5L のレベル指定、/setmaxplayers が自分のワールドで使えるか
- [ ] 応用：名前の例（/event の minecraft:ageable_grow_up、/playanimation の animation.player.sleeping、/music の曲名、/fog の fogId）
- [ ] 応用：/aimassist・/controlscheme・/camerashake の効き方（携帯モード）
- [ ] 教育版だけのコマンド（/ability /agent /classroommode /code /immutableworld /worldbuilder）は公式一覧にないので未確認

## タブレットと保護者の設定

- [ ] Android Chrome で「よみあげ」が日本語の声で読まれるか
- [ ] Android Chrome で作り方ページを開いている間、画面が消えないか
- [ ] Nintendo みまもり Switch と Microsoft アカウント（Family Safety）の設定画面の名前

## コマンドの確認状況

基本編の23コマンドは、構文と権限を Microsoft Learn の公式リファレンスで確認済みです（docs/OFFICIAL-REFERENCE.md）。実機では未確認なので、確認状況は「公式ドキュメントで確認済」です。実機で試したら js/data-commands.js の status を "device"、checkedVersion にバージョンを入れてください。

応用編（コマンド大ずかん）の 63 コマンドも同じく、構文は公式ページで確認済み・実機は未確認です。名前の例など公式ページに一覧がないものは status を "unknown" にして、ページに【じっきで たしかめる】と出しています。データは js/data-reference.js。
