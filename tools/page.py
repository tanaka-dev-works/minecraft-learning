"""開発用：ページの ひな形を つくる（サイトの動作には不要。できた HTML をそのまま公開する）

使い方（Python から）:
    from page import write_page
    write_page("pages/foo.html", title="…", crumbs=[["しらべる", ""]], body="<h1>…</h1>", kids=True, scripts=["commands.js"])
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "マイクラ コマンド ぼうけん"
BASE_SCRIPTS = ["data.js", "data-commands.js", "icons.js", "progress.js", "main.js", "parts.js"]


def write_page(path, title, body, crumbs=None, kids=True, scripts=None, extra_head="", yomi=True, inline_script=""):
    depth = path.count("/")
    root = ".." if depth == 1 else ("." if depth == 0 else "/".join([".."] * depth))
    crumbs_attr = ""
    if crumbs:
        crumbs_attr = " data-crumbs='" + json.dumps(crumbs, ensure_ascii=False).replace("'", "&#39;") + "'"
    sc = BASE_SCRIPTS + [s for s in (scripts or []) if s not in BASE_SCRIPTS]
    script_tags = "\n".join(f'  <script src="{root}/js/{s}"></script>' for s in sc)
    if inline_script:
        script_tags += "\n  <script>\n" + inline_script.strip("\n") + "\n  </script>"
    html = f"""<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}｜{SITE}</title>
  <link rel="icon" href="{root}/images/guide.svg" type="image/svg+xml">
  <link rel="stylesheet" href="{root}/fonts/fonts.css">
  <link rel="stylesheet" href="{root}/css/style.css">{extra_head}
</head>
<body data-root="{root}" data-kids="{'true' if kids else 'false'}"{crumbs_attr}>
  <main id="main" class="wrap"{' data-yomi' if yomi else ''}>
{body.strip(chr(10))}
  </main>

{script_tags}
</body>
</html>
"""
    with open(os.path.join(ROOT, path), "w", encoding="utf-8") as f:
        f.write(html)
