// Patche les emplacements/accessoires des armes BO6 dans donnees.js à partir des
// données compactes extraites de codmunity (scripts/bo6-data.jsonl).
// Nettoie le doublage du rendu responsive (noms doublés, mods répétés).
// Usage : node scripts/patch-bo6-accessoires.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const KEY = { g: "gun_kick", h: "recul_horizontal", v: "recul_vertical", V: "velocite_ms", p: "portee_m", a: "vitesse_visee_ms", s: "sprint_to_fire_ms", r: "vitesse_rechargement_ms", m: "mobilite", c: "cadence_cpm", C: "capacite_chargeur" };
const LABEL = { viseur: "Optique", bouche: "Bouche", canon: "Canon", sous_canon: "Sous-canon", chargeur: "Chargeur", crosse: "Crosse", poignee_arriere: "Poignée arrière", laser: "Laser", mode_tir: "Munitions / mode de tir" };
const dehalve = (s) => (s.length % 2 === 0 && s.slice(0, s.length / 2) === s.slice(s.length / 2)) ? s.slice(0, s.length / 2) : s;
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 28) || "opt";

function buildEmplacements(e) {
  return e.map(([sid, opts]) => {
    const seen = {};
    const options = [{ id: "aucun", nom: "— Aucun —" }];
    opts.forEach(o => {
      let nom, modsStr = null;
      if (Array.isArray(o)) { nom = dehalve(o[0]); modsStr = o[1]; } else { nom = dehalve(o); }
      let id = slug(nom); while (seen[id]) id += "x"; seen[id] = 1;
      const opt = { id, nom };
      if (modsStr) {
        const mods = {};
        modsStr.split(",").forEach(tok => {
          const k = tok[0], val = tok.slice(1);
          if (KEY[k] && !(KEY[k] in mods)) mods[KEY[k]] = val; // dédup : 1re occurrence
        });
        if (Object.keys(mods).length) opt.modificateurs = mods;
      }
      options.push(opt);
    });
    return { id: sid, label: LABEL[sid] || sid, options };
  });
}

// Sources : scripts/bo6-data.jsonl + ~/Downloads/wz_*.json
import { readdir } from "node:fs/promises";
import { homedir } from "node:os";
const data = [];
try {
  const jsonl = await readFile(join(ROOT, "scripts", "bo6-data.jsonl"), "utf8");
  jsonl.split("\n").map(l => l.trim()).filter(Boolean).forEach(l => data.push(JSON.parse(l)));
} catch (e) {}
for (const f of ["bo6-all.json", "bo7-1.json", "bo7-2.json", "bo7-3.json", "bo7-4.json"]) {
  try {
    const big = JSON.parse(await readFile(join(ROOT, "scripts", f), "utf8"));
    if (Array.isArray(big)) data.push(...big);
  } catch (e) {}
}
const dl = join(homedir(), "Downloads");
for (const f of (await readdir(dl)).filter(f => /^wz_.*\.json$/.test(f))) {
  try { const j = JSON.parse(await readFile(join(dl, f), "utf8")); if (Array.isArray(j)) data.push(...j); else data.push(j); } catch (e) {}
}

let lines = (await readFile(join(ROOT, "donnees.js"), "utf8")).split("\n");
// Index nom (minuscule) -> n° de ligne
const nomIdx = {};
lines.forEach((l, i) => { if (/^\s*\{"id":/.test(l)) { try { const o = JSON.parse(l.trim().replace(/,$/, "")); nomIdx[o.nom.toLowerCase()] = i; } catch (e) {} } });

let ok = 0, manques = [], ignores = [];
const vus = new Set();
for (const wd of data) {
  const key = (wd.w || "").trim().toLowerCase();
  if (!key || vus.has(key)) continue;
  const emp = buildEmplacements(wd.e);
  const total = emp.reduce((s, e) => s + e.options.length - 1, 0);
  if (total < 8) { ignores.push(wd.w + " (" + total + ")"); continue; } // page incomplète -> on garde l'existant
  const idx = nomIdx[key];
  if (idx === undefined) { manques.push(wd.w); continue; }
  vus.add(key);
  const obj = JSON.parse(lines[idx].trim().replace(/,$/, ""));
  obj.emplacements = emp;
  lines[idx] = "  " + JSON.stringify(obj) + ",";
  ok++;
  console.log(`  ✓ ${wd.w.padEnd(24)} ${total} accessoires`);
}
await writeFile(join(ROOT, "donnees.js"), lines.join("\n"));
console.log(`\n✅ ${ok} arme(s) patchée(s).`);
if (ignores.length) console.log(`⏭️  ignorées (page incomplète) : ${ignores.join(", ")}`);
if (manques.length) console.log(`⚠️ nom non trouvé dans donnees.js : ${manques.join(", ")}`);
