// Vérifie la cohérence des accessoires entre armes d'une MÊME classe :
// emplacements manquants et nombre d'options anormalement bas (= accessoires manquants).
// Usage : node scripts/audit-accessoires.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const code = await readFile(join(ROOT, "donnees.js"), "utf8");
const sb = { window: {}, console };
vm.createContext(sb);
vm.runInContext(code + "\n;var __O={ARMES_PRINCIPALES,ARMES_SECONDAIRES,CATEGORIES_PRINCIPALES,CATEGORIES_SECONDAIRES};", sb);
const D = sb.__O;
const ALL = [...D.ARMES_PRINCIPALES, ...D.ARMES_SECONDAIRES];
const CATS = [...D.CATEGORIES_PRINCIPALES, ...D.CATEGORIES_SECONDAIRES];

const median = (arr) => { if (!arr.length) return 0; const s = [...arr].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const optCount = (emp) => emp.options.filter(o => o.id !== "aucun").length;

console.log("══════════════════════════════════════════════════════");
console.log("  AUDIT ACCESSOIRES — cohérence intra-classe");
console.log("══════════════════════════════════════════════════════");

let totalAlertes = 0;
for (const cat of CATS) {
  const armes = ALL.filter(a => a.categorie === cat);
  if (armes.length < 2) continue; // pas de comparaison possible

  // Slots présents dans la classe + médiane d'options par slot
  const slotIds = [...new Set(armes.flatMap(a => a.emplacements.map(e => e.id)))];
  const slotPresence = {}; // slotId -> nb d'armes qui l'ont
  const slotOptCounts = {}; // slotId -> [counts]
  armes.forEach(a => {
    a.emplacements.forEach(e => {
      slotPresence[e.id] = (slotPresence[e.id] || 0) + 1;
      (slotOptCounts[e.id] = slotOptCounts[e.id] || []).push(optCount(e));
    });
  });
  // Slots "standards" = présents chez ≥ 60 % des armes de la classe
  const slotsStd = slotIds.filter(s => slotPresence[s] / armes.length >= 0.6);
  const medOptParSlot = {}; slotsStd.forEach(s => medOptParSlot[s] = median(slotOptCounts[s]));
  const totaux = armes.map(a => a.emplacements.reduce((x, e) => x + optCount(e), 0));
  const medTotal = median(totaux);

  // Analyse par arme
  const alertes = [];
  armes.forEach(a => {
    const sienSlots = new Set(a.emplacements.map(e => e.id));
    const slotsManquants = slotsStd.filter(s => !sienSlots.has(s));
    // slots présents mais avec bien moins d'options que la médiane de classe
    const slotsPauvres = a.emplacements.filter(e =>
      slotsStd.includes(e.id) && medOptParSlot[e.id] >= 3 && optCount(e) <= Math.max(1, Math.floor(medOptParSlot[e.id] * 0.5))
    ).map(e => `${e.id}(${optCount(e)}/${medOptParSlot[e.id]})`);
    const total = a.emplacements.reduce((x, e) => x + optCount(e), 0);
    if (slotsManquants.length || slotsPauvres.length || (medTotal >= 10 && total < medTotal * 0.6)) {
      alertes.push({ nom: a.nom, jeu: a.jeu, total, slotsManquants, slotsPauvres });
    }
  });

  console.log(`\n### ${cat}  (${armes.length} armes)`);
  console.log(`   Emplacements standards de la classe : ${slotsStd.join(", ")}`);
  console.log(`   Options/arme — médiane : ${medTotal}  (min ${Math.min(...totaux)}, max ${Math.max(...totaux)})`);
  if (!alertes.length) { console.log("   ✅ Toutes les armes sont cohérentes avec la classe."); continue; }
  alertes.forEach(al => {
    totalAlertes++;
    const parts = [];
    if (al.slotsManquants.length) parts.push(`emplacements MANQUANTS: [${al.slotsManquants.join(", ")}]`);
    if (al.slotsPauvres.length) parts.push(`peu d'options: [${al.slotsPauvres.join(", ")}]`);
    parts.push(`total ${al.total}/${medTotal}`);
    console.log(`   ⚠️ ${al.nom} [${al.jeu.replace("Black Ops ", "BO")}] — ${parts.join(" · ")}`);
  });
}

console.log(`\n──────────────────────────────────────────────────────`);
console.log(`  ${totalAlertes} arme(s) avec un écart d'accessoires vs leur classe.`);
console.log(`  (slot(x/y) = x options chez l'arme vs y médiane de la classe)`);
console.log(`──────────────────────────────────────────────────────`);
