// 自動チェック：node tests/check.mjs
// ・GitHub Pages と同じく /minecraft-learning/ の下でサイトを配信して確かめる
// ・タブレット縦 768px / 横 1024px / スマホ 375px で横スクロールが出ないか
// ・ボタンが 60px 以上か、サイト内リンクが切れていないか、コンソールにエラーが出ないか
// ・file:// で開いても動くか、localStorage が使えなくても壊れないか
// スクリーンショットは tests/screenshots/ に保存する（git には入れない）
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
// playwright はグローバルに入っているものも使えるように require で読む
const { chromium } = createRequire(import.meta.url)("playwright");

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "/minecraft-learning/";
const PAGES = ["index.html", "404.html", "pages/stamps.html", "pages/parts.html", "pages/commands.html", "pages/command.html?id=tp", "pages/command.html?id=scoreboard", "pages/command.html?id=nope", "pages/search.html?q=てれぽーと", "pages/dont.html", "pages/syntax.html", "pages/selectors.html", "pages/start.html", "pages/parents.html", "pages/level1.html", "pages/level2.html", "pages/level3.html", "works/morning.html", "works/block-magic.html", "works/diamond-button.html", "works/message.html", "pages/quiz.html", "pages/quiz.html?level=1", "pages/quiz.html?level=2", "pages/quiz.html?level=3", "pages/level4.html", "pages/level5.html", "pages/level6.html", "works/teleport.html", "works/item-giver.html", "works/auto-door.html", "works/minigame.html", "pages/quiz.html?level=6", "pages/command-blocks.html", "pages/troubleshooting.html", "pages/errors.html", "pages/programming.html"];
const WIDTHS = [
  { name: "phone", width: 375, height: 740 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768 },
];
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png" };

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = null;
  if (path.startsWith(BASE)) {
    file = join(ROOT, path.slice(BASE.length) || "index.html");
    if (file.endsWith("/")) file = join(file, "index.html");
  }
  if (file && existsSync(file)) {
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } else {
    res.writeHead(404, { "content-type": TYPES[".html"] });
    res.end(await readFile(join(ROOT, "404.html")));
  }
});
await new Promise((r) => server.listen(0, r));
const origin = `http://127.0.0.1:${server.address().port}`;

const failures = [];
const fail = (msg) => failures.push(msg);
await mkdir(join(ROOT, "tests/screenshots"), { recursive: true });

const browser = await chromium.launch();

async function checkPage(context, url, label, vp) {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text()); }); // 読みこみ失敗は response で見る
  page.on("requestfailed", (r) => errors.push("読みこみ失敗: " + r.url()));
  page.on("response", (r) => { if (r.status() >= 400 && !r.url().endsWith("/no-such-page.html")) errors.push(`${r.status()}: ${r.url()}`); });
  await page.goto(url, { waitUntil: "load" });

  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const small = [];
    document.querySelectorAll(".btn, a.square, .site-title").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && (r.width < 60 || r.height < 60)) small.push(`${el.textContent.trim().slice(0, 20)} (${Math.round(r.width)}x${Math.round(r.height)})`);
    });
    const links = [...document.querySelectorAll("a[href]")].map((a) => a.href);
    return {
      overflow: doc.scrollWidth > window.innerWidth,
      scrollWidth: doc.scrollWidth,
      small,
      links,
      hasHeader: !!document.querySelector(".site-header"),
      hasFooter: !!document.querySelector(".site-footer"),
      squares: document.querySelectorAll("#sugoroku .square").length,
      bodyFont: parseFloat(getComputedStyle(document.body).fontSize),
    };
  });

  if (result.overflow) fail(`${label}: 横スクロールが出る (scrollWidth=${result.scrollWidth})`);
  if (result.small.length) fail(`${label}: 60px 未満のボタン: ${result.small.join(", ")}`);
  if (!result.hasHeader || !result.hasFooter) fail(`${label}: ヘッダーかフッターがない`);
  if (result.bodyFont < 20) fail(`${label}: 本文が 20px 未満`);
  if (errors.length) fail(`${label}: エラー: ${errors.join(" / ")}`);
  await page.screenshot({ path: join(ROOT, "tests/screenshots", `${label.replace(/[^\w.-]+/g, "_")}.png`), fullPage: true });
  await page.close();
  return result;
}

// 1) http で各ページ × 各はば
const allLinks = new Set();
for (const vp of WIDTHS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, hasTouch: true, isMobile: vp.width < 1024 });
  for (const p of PAGES) {
    const r = await checkPage(context, origin + BASE + p, `${p}@${vp.name}`, vp);
    r.links.forEach((l) => allLinks.add(l));
    if (p === "index.html" && r.squares !== 6) fail(`${p}@${vp.name}: すごろくのマスが ${r.squares} こ（6こ のはず）`);
  }
  await context.close();
}

// 2) 存在しない URL で 404 ページがきちんと出るか（深い階層でも CSS が読める）
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const r = await checkPage(context, origin + BASE + "pages/no-such-page.html", "404-deep@tablet", WIDTHS[1]);
  r.links.forEach((l) => allLinks.add(l));
  await context.close();
}

// 3) サイト内リンク切れ
for (const link of allLinks) {
  if (!link.startsWith(origin)) continue;
  const path = decodeURIComponent(new URL(link).pathname);
  const file = join(ROOT, path.slice(BASE.length) || "index.html");
  if (!existsSync(file)) fail(`リンク切れ: ${path}`);
}

// 4) file:// で直接ひらく
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(pathToFileURL(join(ROOT, "index.html")).href);
  const n = await page.locator("#sugoroku .square").count();
  if (n !== 6 || errors.length) fail(`file:// で うまく動かない（マス ${n}、エラー ${errors.join(" / ")}）`);
  await context.close();
}

// 5) localStorage が使えない環境
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  await context.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(origin + BASE + "index.html");
  const n = await page.locator("#sugoroku .square").count();
  if (n !== 6 || errors.length) fail(`localStorage なしで壊れる（マス ${n}、エラー ${errors.join(" / ")}）`);
  await context.close();
}

// 6) スタンプがあると「つぎは ここ！」が進む
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  await context.addInitScript(() => {
    localStorage.setItem("mcl-progress-v1", JSON.stringify({ stamps: { 1: "2026-11-03", 2: "2026-11-03" } }));
  });
  const page = await context.newPage();
  await page.goto(origin + BASE + "index.html");
  const states = await page.locator("#sugoroku .square").evaluateAll((els) => els.map((e) => e.dataset.state));
  const expect = ["clear", "clear", "next", "todo", "todo", "todo"];
  if (states.join() !== expect.join()) fail(`すごろくの状態がちがう: ${states.join()}（${expect.join()} のはず）`);
  const count = await page.locator("#stamp-count").textContent();
  if (count !== "2 / 6") fail(`スタンプの数がちがう: ${count}`);
  await context.close();
}

// 7) よみあげ用の文：ふりがなは読みに、コマンドのタイルは読まない
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(origin + BASE + "index.html");
  const text = await page.evaluate(() => {
    const div = document.createElement("div");
    div.innerHTML = '<p><ruby>光<rt>ひか</rt></ruby>って いる</p><div class="tiles">/tp</div>';
    return window.SiteSpeech.textForSpeech(div);
  });
  if (!text.includes("ひかって") || text.includes("/tp") || text.includes("光")) fail(`よみあげの文がおかしい: ${text}`);
  await context.close();
}

// 8) 部品：タイル・ステップ・スタンプ・ふりがな
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(origin + BASE + "pages/parts.html");
  // タイル：/time set day は 13 もじ、スペースは「スペース」の名前つき
  const n = await page.locator('.tiles[data-cmd="/time set day"]').first().locator(".tile").count();
  if (n !== 13) fail(`タイルの数がちがう: ${n}`);
  const names = await page.locator('.tiles[data-cmd="/tp @s ~ ~5 ~"] .tile-name').allTextContents();
  for (const want of ["スラッシュ", "アットマーク", "にょろ", "スペース"]) if (!names.includes(want)) fail(`記号の名前「${want}」がない`);
  // 打ったよ：3回で のこり 10
  const t = page.locator(".tiles[data-track]").first();
  for (let i = 0; i < 3; i++) await t.locator('[data-act="next"]').click();
  const left = await t.locator(".tile-count").textContent();
  if (left !== "あと 10 もじ") fail(`打ったよ が うごかない: ${left}`);
  // キーボード：t i m e s d a y が光る
  const used = await page.locator(".kbd .kbd-key.is-used").allTextContents();
  for (const k of ["t", "i", "m", "e", "s", "d", "a", "y"]) if (!used.includes(k)) fail(`キーボードで ${k} が光っていない`);
  // ステップ：つぎへ → 2 / 4、リロードしても 2 / 4
  await page.locator(".step-next").click();
  let c = await page.locator(".step-count").textContent();
  if (c !== "2 / 4") fail(`ステップが進まない: ${c}`);
  await page.reload();
  c = await page.locator(".step-count").textContent();
  if (c !== "2 / 4") fail(`ステップの続きから再開できない: ${c}`);
  // スタンプ
  await page.locator(".step-next").click();
  await page.locator(".step-next").click();
  await page.locator('[data-stamp="1"]').click();
  if (!(await page.locator(".celebrate").isVisible())) fail("スタンプのお祝いが出ない");
  await page.screenshot({ path: join(ROOT, "tests/screenshots", "celebrate@tablet.png") });
  await page.locator(".celebrate [data-close]").click();
  // ふりがな ON/OFF
  await page.locator("#furigana-toggle").click();
  const rtHidden = await page.evaluate(() => getComputedStyle(document.querySelector("rt")).display === "none");
  if (!rtHidden) fail("ふりがなが けせない");
  // スタンプちょう・トップに反映
  await page.goto(origin + BASE + "pages/stamps.html");
  const got = await page.locator(".stamp-slot.is-got").count();
  if (got !== 1) fail(`スタンプちょうに反映されない: ${got}`);
  await page.goto(origin + BASE + "index.html");
  const first = await page.locator("#sugoroku .square").first().getAttribute("data-state");
  if (first !== "clear") fail(`トップに反映されない: ${first}`);
  if (errors.length) fail("部品でエラー: " + errors.join(" / "));
  await context.close();
}

// 9) コマンドずかん・さがす
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(origin + BASE + "pages/commands.html");
  const cards = await page.locator(".cmd-card").count();
  const total = await page.evaluate(() => window.SITE_DATA.commands.length);
  if (cards !== total || total < 20) fail(`コマンドの カード ${cards} / データ ${total}`);
  // 全コマンドに 確認状況と公式URL、例文、ひきすう
  const bad = await page.evaluate(() => window.SITE_DATA.commands.filter((c) =>
    !["doc", "device", "unknown"].includes(c.status) || !/^https:\/\/learn\.microsoft\.com\//.test(c.parents.url) ||
    !c.examples.length || !c.args.length || !c.form.length || c.examples.some((e) => /[^\x20-\x7e]/.test(e.cmd))).map((c) => c.id));
  if (bad.length) fail("データが たりない／例文に全角: " + bad.join(", "));
  // 関連リンクの id が あるか
  const badRel = await page.evaluate(() => { const ids = new Set(window.SITE_DATA.commands.map((c) => c.id)); return window.SITE_DATA.commands.flatMap((c) => (c.related || []).filter((r) => !ids.has(r)).map((r) => c.id + "→" + r)); });
  if (badRel.length) fail("関連コマンドの id が ない: " + badRel.join(", "));
  // さがす：てれぽーと / テレポート / tp / ＴＰ で /tp が 1ばん
  for (const q of ["てれぽーと", "テレポート", "tp", "ＴＰ", "/tp"]) {
    await page.goto(origin + BASE + "pages/search.html?q=" + encodeURIComponent(q));
    const first = await page.locator(".search-title").first().textContent().catch(() => "");
    if (first !== "/tp") fail(`「${q}」で /tp が さいしょに 出ない（${first}）`);
  }
  // くわしいページ：おぼえた
  await page.goto(origin + BASE + "pages/command.html?id=give");
  await page.locator("#learned-btn").click();
  await page.goto(origin + BASE + "pages/commands.html");
  const learned = await page.locator('a[href="command.html?id=give"] .cmd-learned').count();
  if (learned !== 1) fail("おぼえた が いちらんに 出ない");
  // 子ども向けページに外部リンクがない
  for (const p of ["pages/command.html?id=tp", "pages/commands.html", "index.html", "pages/dont.html", "pages/syntax.html", "pages/selectors.html", "pages/stamps.html", "pages/command-blocks.html", "pages/troubleshooting.html", "pages/errors.html", "pages/programming.html", "pages/level5.html", "works/auto-door.html"]) {
    await page.goto(origin + BASE + p);
    const ext = await page.evaluate(() => [...document.querySelectorAll("a[href]")].filter((a) => !a.href.startsWith(location.origin) && !a.href.startsWith("file:")).length);
    if (ext) fail(`${p}: 子ども向けページに外部リンクが ${ext} こ`);
    const tables = await page.locator("main table").count();
    if (tables) fail(`${p}: 子ども向けページに表がある`);
  }
  if (errors.length) fail("ずかんでエラー: " + errors.join(" / "));
  await context.close();
}

// 9b) さくひん・クイズ：ステップを最後まで進めて「できた！」、クイズに正解
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const works = await (async () => { await page.goto(origin + BASE + "index.html"); return page.evaluate(() => window.SITE_DATA.works); })();
  for (const w of works) {
    await page.goto(origin + BASE + w.href);
    const total = Number((await page.locator(".step-count").textContent()).split("/")[1]);
    for (let i = 1; i < total; i++) {
      const stampBtn = page.locator(".step:not([hidden]) [data-stamp]");
      if (await stampBtn.count()) break;
      await page.locator(".step-next").click();
    }
    const has = await page.locator(".step:not([hidden]) [data-stamp]").count();
    if (w.stamp && !has) fail(`${w.href}: 「できた！」ボタンが ない`);
    if (w.stamp && has) {
      await page.locator(".step:not([hidden]) [data-stamp]").click();
      await page.locator(".celebrate [data-close]").click();
    }
    // 設置図・設定カード（レベル3 以上）
    if (w.level >= 3) {
      const d = await page.locator(".diagram").count();
      const cb = await page.locator(".cb-card").count();
      if (!d || !cb) fail(`${w.href}: 設置図(${d}) か 設定カード(${cb}) が ない`);
    }
  }
  await page.goto(origin + BASE + "index.html");
  const states = await page.locator("#sugoroku .square").evaluateAll((els) => els.map((e) => e.dataset.state));
  if (states.join() !== "clear,clear,clear,clear,clear,clear") fail(`レベル1〜6 が クリアに ならない: ${states.join()}`);
  // クイズ：ぜんぶ 正解できる
  for (const lv of [1, 2, 3, 4, 5, 6]) {
    await page.goto(origin + BASE + "pages/quiz.html?level=" + lv);
    const answers = await page.evaluate((lv) => window.SITE_DATA.quizzes.filter((q) => q.level === lv).map((q) => q.type === "think" ? -1 : q.answer), lv);
    if (answers.length !== 3) fail(`レベル${lv} の クイズが 3もん ではない`);
    for (let i = 0; i < answers.length; i++) {
      const card = page.locator(`.quiz-card[data-q="${i}"]`);
      if (answers[i] === -1) await card.locator(".quiz-did").click();
      else {
        // まず まちがえて ヒントを 出し、つぎに 正解
        const wrong = answers[i] === 0 ? 1 : 0;
        await card.locator(`.quiz-choice[data-i="${wrong}"]`).click();
        if (!(await card.locator(".box-hint").count())) fail(`レベル${lv} もんだい${i + 1}: ヒントが 出ない`);
        await card.locator(`.quiz-choice[data-i="${answers[i]}"]`).click();
      }
    }
    if (!(await page.locator(".quiz-total .guide").count())) fail(`レベル${lv}: ぜんぶ せいかい が 出ない`);
  }
  if (errors.length) fail("さくひん・クイズで エラー: " + errors.join(" / "));
  await context.close();
}

// 9c) トラブル かいけつ：10こ いじょう、おすと ひらく
{
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await context.newPage();
  await page.goto(origin + BASE + "pages/troubleshooting.html");
  const n = await page.locator(".tr-card").count();
  if (n < 10) fail(`トラブルが ${n} こ（10こ いじょう いる）`);
  await page.locator(".tr-card summary").first().click();
  if (!(await page.locator(".tr-card[open] .tr-fix").count())) fail("トラブルの なおしかたが ひらかない");
  await context.close();
}

// 10) 子ども向けページ：1年生の漢字 以外には ふりがな（ruby）が ついているか
{
  const GRADE1 = "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六";
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await context.newPage();
  const kidsPages = PAGES.filter((p) => !/start|parents|parts|404/.test(p));
  for (const p of kidsPages) {
    await page.goto(origin + BASE + p);
    const found = await page.evaluate((g1) => {
      const skip = "rt, ruby, .no-yomi, code, .tiles, .parents-box, script, style, .site-footer, .kbd";
      const out = new Set();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (n.parentElement.closest(skip)) continue;
        for (const ch of n.textContent) if (/\p{Script=Han}/u.test(ch) && !g1.includes(ch)) out.add(ch);
      }
      return [...out].join("");
    }, GRADE1);
    if (found) fail(`${p}: ふりがなの ない 漢字: ${found}`);
  }
  await context.close();
}

await browser.close();
server.close();

if (failures.length) {
  console.error("✗ チェックで見つかった問題:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("✓ すべてのチェックに合格しました");
