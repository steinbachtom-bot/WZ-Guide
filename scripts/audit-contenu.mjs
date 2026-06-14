// Audit de complétude du contenu (armes, accessoires, combinaisons, données).
// Usage : node scripts/audit-contenu.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const code = await readFile(join(ROOT, "donnees.js"), "utf8");
const sb = { window: {}, console };
vm.createContext(sb);
vm.runInContext(code + "\n;var __O={ARMES_PRINCIPALES,ARMES_SECONDAIRES,CATEGORIES_PRINCIPALES,CATEGORIES_SECONDAIRES,JEUX,TIERS,TIERS_ORDRE,IMAGES_ARMES,DEGATS_PALIERS,DEGATS_PARTIES,INFOS_STATS,CAP_ACCESSOIRES};", sb);
const D = sb.__O;
const ALL = [...D.ARMES_PRINCIPALES, ...D.ARMES_SECONDAIRES];
const STATS = Object.keys(D.INFOS_STATS);

const line = (s = "") => console.log(s);
const pct = (n, t) => t ? Math.round(n / t * 100) + "%" : "0%";

line("════════════════════════════════════════════════");
line("  AUDIT DE CONTENU — WZ Guide");
line("════════════════════════════════════════════════");

// ---- 1. ARMES ----
line("\n### 1. ARMES");
line(`Total : ${ALL.length}  (principales : ${D.ARMES_PRINCIPALES.length}, secondaires : ${D.ARMES_SECONDAIRES.length})`);
line(`\nPar jeu :`);
D.JEUX.forEach(j => line(`  ${j.padEnd(14)} ${ALL.filter(a => a.jeu === j).length}`));
const autresJeux = [...new Set(ALL.map(a => a.jeu))].filter(j => !D.JEUX.includes(j));
if (autresJeux.length) line(`  ⚠️ jeux non déclarés dans JEUX : ${autresJeux.join(", ")}`);

line(`\nPar catégorie (principales) :`);
D.CATEGORIES_PRINCIPALES.forEach(c => {
  const n = D.ARMES_PRINCIPALES.filter(a => a.categorie === c).length;
  line(`  ${c.padEnd(22)} ${n}${n === 0 ? "   ⚠️ VIDE (affichée « à venir »)" : ""}`);
});
line(`Par catégorie (secondaires) :`);
D.CATEGORIES_SECONDAIRES.forEach(c => {
  const n = D.ARMES_SECONDAIRES.filter(a => a.categorie === c).length;
  line(`  ${c.padEnd(22)} ${n}${n === 0 ? "   ⚠️ VIDE" : ""}`);
});
const catsInconnues = [...new Set(ALL.map(a => a.categorie))].filter(c => ![...D.CATEGORIES_PRINCIPALES, ...D.CATEGORIES_SECONDAIRES].includes(c));
if (catsInconnues.length) line(`  ⚠️ catégories hors liste : ${catsInconnues.join(", ")}`);

// doublons d'id
const ids = ALL.map(a => a.id);
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
line(`\nID en double : ${dup.length ? "⚠️ " + [...new Set(dup)].join(", ") : "aucun ✅"}`);

// ---- 2. ACCESSOIRES ----
line("\n### 2. ACCESSOIRES (emplacements & options)");
let totalSlots = 0, totalOpts = 0, optsAvecMod = 0, optsAvecExtra = 0, optsCosmetiques = 0;
const slotsParType = {};
ALL.forEach(a => {
  (a.emplacements || []).forEach(emp => {
    totalSlots++;
    slotsParType[emp.id] = (slotsParType[emp.id] || 0) + 1;
    emp.options.forEach(o => {
      if (o.id === "aucun") return;
      totalOpts++;
      if (o.modificateurs && Object.keys(o.modificateurs).length) optsAvecMod++;
      else if (o.effets_extra && Object.keys(o.effets_extra).length) optsAvecExtra++;
      else optsCosmetiques++;
    });
  });
});
line(`Emplacements totaux : ${totalSlots}  (moy. ${(totalSlots / ALL.length).toFixed(1)} / arme)`);
line(`Options d'accessoires (hors « Aucun ») : ${totalOpts}  (moy. ${(totalOpts / ALL.length).toFixed(1)} / arme)`);
line(`  • avec effet chiffré sur les stats (modificateurs) : ${optsAvecMod}  (${pct(optsAvecMod, totalOpts)})`);
line(`  • avec effet « réel non simulé » (effets_extra)     : ${optsAvecExtra}  (${pct(optsAvecExtra, totalOpts)})`);
line(`  • purement descriptifs / cosmétiques (aucun effet)  : ${optsCosmetiques}  (${pct(optsCosmetiques, totalOpts)})`);
line(`\nEmplacements par type :`);
Object.entries(slotsParType).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => line(`  ${k.padEnd(18)} ${v}`));

// armes avec peu d'accessoires
const pauvres = ALL.filter(a => (a.emplacements || []).reduce((s, e) => s + e.options.filter(o => o.id !== "aucun").length, 0) < 5);
line(`\nArmes avec < 5 options d'accessoires : ${pauvres.length}${pauvres.length ? " (" + pauvres.map(a => a.nom).join(", ") + ")" : " ✅"}`);

// ---- 3. COMBINAISONS POSSIBLES (règle des 5 max) ----
line("\n### 3. COMBINAISONS DE CLASSE POSSIBLES");
line(`(règle : max ${D.CAP_ACCESSOIRES} accessoires/arme, un par emplacement)`);
function combosArme(a) {
  // DP : dp[j] = nombre de façons de remplir j emplacements
  let dp = [1];
  (a.emplacements || []).forEach(emp => {
    const k = emp.options.filter(o => o.id !== "aucun").length;
    const nd = dp.slice();
    for (let j = 0; j < dp.length; j++) { nd[j + 1] = (nd[j + 1] || 0) + dp[j] * k; }
    dp = nd;
  });
  let total = 0;
  for (let j = 0; j <= Math.min(D.CAP_ACCESSOIRES, dp.length - 1); j++) total += dp[j] || 0;
  return total; // inclut la classe « sans accessoire »
}
let totalCombos = 0; let maxC = { n: 0 };
ALL.forEach(a => { const c = combosArme(a); totalCombos += c; if (c > maxC.n) maxC = { n: c, nom: a.nom }; });
line(`Combinaisons d'accessoires valides (toutes armes) : ${totalCombos.toLocaleString("fr-FR")}`);
line(`Arme la plus profonde : ${maxC.nom} (${maxC.n.toLocaleString("fr-FR")} combinaisons)`);
line(`→ L'app génère ces combinaisons dynamiquement : toutes sont jouables.`);

// ---- 4. COMPLÉTUDE DES DONNÉES ----
line("\n### 4. COMPLÉTUDE DES DONNÉES (par arme)");
const sansTier = ALL.filter(a => !D.TIERS[a.id]);
const sansImage = ALL.filter(a => !(D.IMAGES_ARMES[a.id] || a.image));
const sansPaliers = ALL.filter(a => !D.DEGATS_PALIERS[a.id]);
const sansParties = ALL.filter(a => !D.DEGATS_PARTIES[a.id]);
const statsManquantes = ALL.filter(a => STATS.some(s => a.stats_base[s] == null));
const rep = (label, arr) => line(`  ${label.padEnd(34)} ${arr.length === 0 ? "complet ✅" : arr.length + " manquante(s) : " + arr.slice(0, 12).map(a => a.nom).join(", ") + (arr.length > 12 ? "…" : "")}`);
rep("Tier (méta)", sansTier);
rep("Image", sansImage);
rep("Paliers de dégâts (TTK/distance)", sansPaliers);
rep("Dégâts par zone (mannequin)", sansParties);
rep("Stats de base (12 stats)", statsManquantes);

// couverture globale
line(`\nCouverture :`);
line(`  Tier      : ${pct(ALL.length - sansTier.length, ALL.length)}`);
line(`  Image     : ${pct(ALL.length - sansImage.length, ALL.length)}`);
line(`  Paliers   : ${pct(ALL.length - sansPaliers.length, ALL.length)}`);
line(`  Par zone  : ${pct(ALL.length - sansParties.length, ALL.length)}`);

line("\n════════════════════════════════════════════════");
line("  Note : cet audit vérifie la COHÉRENCE INTERNE des");
line("  données. Il ne peut PAS garantir l'exhaustivité vs");
line("  le jeu réel (nécessite une source externe : codmunity).");
line("════════════════════════════════════════════════");
