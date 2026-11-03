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
const PAGES = ["index.html", "404.html"];
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
  const path = new URL(link).pathname;
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
  const expect = ["clear", "clear", "next", "soon", "soon", "soon"];
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

await browser.close();
server.close();

if (failures.length) {
  console.error("✗ チェックで見つかった問題:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("✓ すべてのチェックに合格しました");
