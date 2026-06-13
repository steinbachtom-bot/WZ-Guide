// ============================================================
//  BUILD DE PRODUCTION — WZ Guide
// ============================================================
//  Génère un dossier dist/ prêt à mettre en ligne, où le JSX est
//  PRÉ-COMPILÉ (plus de Babel dans le navigateur → chargement bien
//  plus rapide et plus léger).
//
//  Tu continues à éditer index.html normalement (Babel en dev) ;
//  quand tu veux publier, lance simplement :  npm run build
//  puis mets en ligne le contenu du dossier dist/.
// ============================================================
import { transform } from "esbuild";
import { readFile, writeFile, mkdir, copyFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, "dist");

// Fichiers de données à copier tels quels à côté du HTML compilé.
const ASSETS = ["donnees.js", "traductions.js"];

async function main() {
  let html = await readFile(join(ROOT, "index.html"), "utf8");

  // 1) Extraire le bloc <script type="text/babel"> ... </script>
  const re = /<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/;
  const match = html.match(re);
  if (!match) throw new Error("Bloc <script type=\"text/babel\"> introuvable dans index.html");
  const jsxSource = match[1];

  // 2) Compiler le JSX → JS classique, minifié.
  //    React/ReactDOM restent des variables globales (chargées depuis le CDN),
  //    donc on ne bundle rien : on transforme juste le JSX.
  const { code, warnings } = await transform(jsxSource, {
    loader: "jsx",
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    minify: true,
    target: ["es2018"],
  });
  warnings.forEach(w => console.warn("⚠️ ", w.text));

  // 3) Retirer le script Babel du CDN (devenu inutile en production).
  html = html.replace(/\s*<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/babel-standalone[^>]*><\/script>/g, "");
  html = html.replace(/\s*<!-- React \+ Babel depuis un CDN[^>]*-->/g,
    "\n  <!-- React (production) depuis un CDN — JSX déjà pré-compilé, aucun Babel requis -->");

  // 4) Remplacer le bloc Babel par le JS compilé (script classique).
  html = html.replace(re, `<script>\n${code}\n</script>`);

  // 5) Écrire dist/
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await writeFile(join(DIST, "index.html"), html, "utf8");
  for (const f of ASSETS) await copyFile(join(ROOT, f), join(DIST, f));

  const ko = (n) => (n / 1024).toFixed(0) + " Ko";
  console.log("✅ Build terminé → dist/");
  console.log(`   index.html : ${ko(Buffer.byteLength(html))} (JSX compilé, sans Babel)`);
  console.log(`   JS compilé : ${ko(Buffer.byteLength(code))} (avant : ~${ko(Buffer.byteLength(jsxSource))} de JSX + ~3 Mo de Babel CDN)`);
  console.log("   + " + ASSETS.join(", "));
  console.log("\n👉 Mets en ligne le contenu du dossier dist/ (ajoute aussi tes images et og-image.png).");
}

main().catch(e => { console.error("❌ Build échoué :", e.message); process.exit(1); });
