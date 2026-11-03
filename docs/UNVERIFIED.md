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

## タブレットと保護者の設定

- [ ] Android Chrome で「よみあげ」が日本語の声で読まれるか
- [ ] Android Chrome で作り方ページを開いている間、画面が消えないか
- [ ] Nintendo みまもり Switch と Microsoft アカウント（Family Safety）の設定画面の名前

## コマンドの確認状況

基本編の23コマンドは、構文と権限を Microsoft Learn の公式リファレンスで確認済みです（docs/OFFICIAL-REFERENCE.md）。実機では未確認なので、確認状況は「公式ドキュメントで確認済」です。実機で試したら js/data-commands.js の status を "device"、checkedVersion にバージョンを入れてください。
