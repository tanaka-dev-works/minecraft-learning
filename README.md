# マイクラ コマンド ぼうけん

小学2年生が Nintendo Switch 版 Minecraft（統合版）で、コマンドとコマンドブロックの「プログラミング」を覚えるための非公式の学習サイトです。
素の HTML / CSS / JavaScript だけで作っていて、ビルドは要りません。`index.html` をブラウザで直接開いても動きます。

- 作り方の順番：[docs/PHASES.md](docs/PHASES.md)
- 設計（ページ一覧・採用コマンド・作品・確認したい点）：[docs/DESIGN.md](docs/DESIGN.md)

このサイトは Mojang・Microsoft とは関係のない非公式の資料です。

## GitHub Pages で公開する手順

GitHub Pages を無料プランで使うには、リポジトリを **Public（公開）** にする必要があります。

1. GitHub でこのリポジトリを開きます。
2. 上のタブの **Settings** を押します。
   【スクリーンショット：Settings タブの場所】
3. （Private のときだけ）いちばん下の **Danger Zone** で **Change visibility** を押し、**Make public** を選びます。
4. 左のメニューの **Pages** を押します。
   【スクリーンショット：左メニューの Pages】
5. **Build and deployment** の **Source** を **Deploy from a branch** にします。
6. **Branch** を `main`、フォルダを `/ (root)` にして **Save** を押します。
   【スクリーンショット：Branch の設定】
7. 1〜2分待ってから Pages の画面を開き直すと、上に公開された URL（`https://tanaka-dev-works.github.io/minecraft-learning/`）が出ます。
8. タブレットの Chrome でその URL を開き、ホーム画面に追加しておくと、子どもが一人で開けます。

> `404.html` はこの URL（`/minecraft-learning/`）の下で公開する前提で書いています。リポジトリ名を変えたときは、`404.html` の `<base href>` も同じ名前に直してください。

## 更新のしかた

- ページの中身を直したら、`main` ブランチに入れる（PR をマージする）と、数分で公開サイトにも反映されます。
- コマンド・作品・クイズのデータは `js/data.js` の1か所にまとまっています。
- 色・余白・文字の大きさは `css/style.css` の先頭（`:root`）で変えられます。

## 自動チェック

Node.js と Playwright がある環境で、次を実行します。

```
node tests/check.mjs
```

スマホ 375px／タブレット縦 768px／横 1024px での横スクロール、ボタンの大きさ（60px 以上）、リンク切れ、`file://` で開いたとき、localStorage が使えないときの動きを確かめます。スクリーンショットは `tests/screenshots/` に保存されます（git には入りません）。

## フォルダ構成

```
index.html              トップ（レベルのすごろく）
404.html                ページが見つからないとき
pages/                  子ども向け・保護者向けのページ
  level1〜6.html        レベル（1ステップ1画面）
  commands.html         コマンドずかん（一覧）／command.html?id=… くわしいページ
  search.html           さがす
  syntax.html selectors.html command-blocks.html troubleshooting.html errors.html programming.html
  quiz.html             クイズ（quiz.html?level=1 など）
  cheatsheet.html cheatsheet-blocks.html  はやみひょう（A4 印刷できる）
  dont.html             やってはいけないコマンド
  stamps.html           スタンプちょう
  start.html parents.html checklist.html  保護者向け
  parts.html            部品の見本（開発用）
works/                  作品の作り方
css/style.css           共通の見た目（:root に色・文字サイズ）／css/print.css 印刷用
js/data.js              サイトのデータ（名前・キャラ・レベル・ページ・作品）
js/data-commands.js     基本編のコマンド
js/data-quiz.js         クイズ
js/data-checklist.js    実機で確かめること
js/main.js              ヘッダー・パンくず・フッター・ふりがな・よみあげ
js/parts.js             文字タイル・キーボード図・ステップ・キャラ・スタンプ
js/progress.js          スタンプなどの記録（localStorage）
js/commands.js search.js quiz.js top.js icons.js
fonts/                  BIZ UDゴシック・DotGothic16（同梱、OFL）
images/                 自作のドット絵（案内キャラは仮）
licenses/               同梱フォント・アイコンのライセンス
docs/                   フェーズ計画・設計書・公式リファレンスの控え・チェック結果
tests/check.mjs         自動チェック
tools/page.py           ページのひな形を作る開発用スクリプト（サイトの動作には不要）
```

## 名前やキャラを変えるとき

- サイト名：`js/data.js` の `siteName`（各ページの `<title>` は `tools/page.py` の `SITE` も変えてページを作り直す）
- 案内キャラ：`js/data.js` の `guide`（名前）と `images/guide.svg`・`images/guide-happy.svg`（絵）
