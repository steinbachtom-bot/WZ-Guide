// ============================================================
//  GÉNÉRATEUR DE PAGES SEO — WZ Guide
// ============================================================
//  Crée de vraies pages HTML statiques (indexables sans JavaScript)
//  pour chaque arme, en FR (/armes/<slug>/) et EN (/weapons/<slug>/),
//  + des pages "hub" listant toutes les armes, + le sitemap.xml.
//
//  But : capter les recherches « meilleure classe X » / « best X loadout »
//  et alimenter le site en contenu réel (utile pour le SEO ET pour AdSense).
//
//  Lancé automatiquement par `npm run build` (après scripts/build.mjs).
// ============================================================
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, "dist");
const BASE = "https://wzguide.com";

// ---- 1) Charger les données (donnees.js est du pur data, sans dépendance navigateur) ----
const donneesCode = await readFile(join(ROOT, "donnees.js"), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(
  donneesCode +
  "\n;var __OUT = { ARMES_PRINCIPALES, INFOS_STATS, TIERS, DEGATS_PALIERS, IMAGES_ARMES, CAP_ACCESSOIRES, META_DONNEES };",
  sandbox
);
const { ARMES_PRINCIPALES, INFOS_STATS, TIERS, DEGATS_PALIERS, IMAGES_ARMES, CAP_ACCESSOIRES } = sandbox.__OUT;

// ---- 2) Logique reprise de l'app (calcul de classe + TTK) ----
function appliquerMod(base, actuelle, mod) {
  const v = parseFloat(String(mod).replace("−", "-"));
  if (String(mod).includes("%")) return actuelle + base * (v / 100);
  return actuelle + v;
}
function etatVide(emps) { const o = {}; emps.forEach(e => o[e.id] = "aucun"); return o; }
function statsFinales(arme, sel) {
  const f = { ...arme.stats_base };
  arme.emplacements.forEach(emp => {
    const opt = emp.options.find(o => o.id === sel[emp.id]);
    if (!opt || !opt.modificateurs) return;
    for (const s in opt.modificateurs) f[s] = appliquerMod(arme.stats_base[s], f[s], opt.modificateurs[s]);
  });
  for (const s in f) f[s] = Math.round(f[s] * 100) / 100;
  return f;
}
const POIDS_POLY = { recul_vertical: 1.5, recul_horizontal: 1.5, gun_kick: 1, portee_m: 1.2, velocite_ms: 1, vitesse_visee_ms: 1, sprint_to_fire_ms: 1, mobilite: 0.8, capacite_chargeur: 0.6, vitesse_rechargement_ms: 0.5 };
function noterOption(arme, option, poids) {
  if (!option || !option.modificateurs) return 0;
  let score = 0;
  for (const stat in option.modificateurs) {
    const base = arme.stats_base[stat];
    if (base === undefined) continue;
    const ref = Math.abs(base) < 1e-6 ? 1 : Math.abs(base);
    const nouvelle = appliquerMod(base, base, option.modificateurs[stat]);
    const deltaRel = (nouvelle - base) / ref;
    const infos = INFOS_STATS[stat];
    score += (poids[stat] || 0) * (infos.plusGrandEstMieux ? deltaRel : -deltaRel);
  }
  return score;
}
function classeRecommandee(arme) {
  const candidats = arme.emplacements.map(emp => {
    let best = null, bestScore = 0;
    emp.options.forEach(opt => {
      if (opt.id === "aucun") return;
      const sc = noterOption(arme, opt, POIDS_POLY);
      if (sc > bestScore) { bestScore = sc; best = opt; }
    });
    return { slot: emp.id, label: emp.label, opt: best, score: bestScore };
  }).filter(c => c.opt && c.score > 0);
  candidats.sort((a, b) => b.score - a.score);
  const retenus = candidats.slice(0, CAP_ACCESSOIRES);
  const sel = etatVide(arme.emplacements);
  retenus.forEach(c => sel[c.slot] = c.opt.id);
  return { sel, retenus };
}
function ttkClose(finales, pv = 250) {
  const deg = finales.degats, cad = finales.cadence_cpm;
  if (!deg || !cad) return null;
  const stk = Math.max(1, Math.ceil(pv / deg));
  return { stk, ttk: Math.round((stk - 1) * (60000 / cad)) };
}

// ---- 3) Helpers ----
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Libellé lisible d'un modificateur, ex: ("recul_vertical","-30%") -> "Recul vertical −30%"
function modLisible(stat, val, lang) {
  const court = (INFOS_STATS[stat] && INFOS_STATS[stat].court) || stat;
  const courtTr = TR_STATS[lang] && TR_STATS[lang][court] ? TR_STATS[lang][court] : court;
  return `${courtTr} ${String(val).replace("-", "−")}`;
}
function estBonus(stat, val) {
  const v = parseFloat(String(val).replace("−", "-"));
  return INFOS_STATS[stat].plusGrandEstMieux ? v > 0 : v < 0;
}
// Forces / faiblesses d'après les stats de base.
function forcesFaiblesses(arme) {
  const scored = Object.keys(INFOS_STATS).map(stat => {
    const v = arme.stats_base[stat];
    if (v == null) return null;
    const max = INFOS_STATS[stat].max || 1;
    const norm = Math.max(0, Math.min(1, v / max));
    const force = INFOS_STATS[stat].plusGrandEstMieux ? norm : 1 - norm;
    return { stat, force };
  }).filter(Boolean);
  scored.sort((a, b) => b.force - a.force);
  return { forces: scored.slice(0, 3).map(x => x.stat), faiblesses: scored.slice(-2).map(x => x.stat) };
}

// ---- 4) Traductions / textes ----
const TR_STATS = {
  fr: { "Dégâts": "Dégâts", "Portée": "Portée", "Cadence": "Cadence", "Vélocité": "Vélocité", "Capacité du chargeur": "Chargeur", "Temps de visée": "Visée", "Sprint-tir": "Sprint-tir", "Temps de rechargement": "Rechargement", "Gun kick": "Gun kick", "Recul horizontal": "Recul H.", "Recul vertical": "Recul V.", "Déplacement": "Mobilité" },
  en: { "Dégâts": "Damage", "Portée": "Range", "Cadence": "Fire rate", "Vélocité": "Velocity", "Capacité du chargeur": "Magazine", "Temps de visée": "ADS time", "Sprint-tir": "Sprint-to-fire", "Temps de rechargement": "Reload", "Gun kick": "Gun kick", "Recul horizontal": "Horiz. recoil", "Recul vertical": "Vert. recoil", "Déplacement": "Movement" }
};
const TR_STATLABEL = {
  fr: { degats: "Dégâts", portee_m: "Portée (m)", cadence_cpm: "Cadence (c/min)", velocite_ms: "Vélocité (m/s)", capacite_chargeur: "Chargeur", vitesse_visee_ms: "Temps de visée (ms)", sprint_to_fire_ms: "Sprint-tir (ms)", vitesse_rechargement_ms: "Rechargement (ms)", gun_kick: "Gun kick", recul_horizontal: "Recul horizontal", recul_vertical: "Recul vertical", mobilite: "Mobilité (m/s)" },
  en: { degats: "Damage", portee_m: "Range (m)", cadence_cpm: "Fire rate (rpm)", velocite_ms: "Velocity (m/s)", capacite_chargeur: "Magazine", vitesse_visee_ms: "ADS time (ms)", sprint_to_fire_ms: "Sprint-to-fire (ms)", vitesse_rechargement_ms: "Reload (ms)", gun_kick: "Gun kick", recul_horizontal: "Horizontal recoil", recul_vertical: "Vertical recoil", mobilite: "Movement (m/s)" }
};
const TR_CAT = {
  fr: { "Fusil d'assaut": "fusil d'assaut", "Mitraillette": "mitraillette", "Fusil-mitrailleur": "fusil-mitrailleur", "Fusil tactique": "fusil tactique", "Fusil de précision": "fusil de précision", "Fusil à pompe": "fusil à pompe" },
  en: { "Fusil d'assaut": "assault rifle", "Mitraillette": "SMG", "Fusil-mitrailleur": "LMG", "Fusil tactique": "tactical rifle", "Fusil de précision": "sniper rifle", "Fusil à pompe": "shotgun" }
};
// Nom de catégorie pour l'affichage (titre/badge), traduit et capitalisé en EN.
function catDisplay(cat, lang) {
  if (lang === "fr") return cat;
  const en = (TR_CAT.en[cat] || cat);
  return en.charAt(0).toUpperCase() + en.slice(1);
}
const CAT_DESC = {
  fr: { "Fusil d'assaut": "polyvalent, efficace à moyenne portée", "Mitraillette": "redoutable au corps-à-corps et en déplacement", "Fusil-mitrailleur": "puissant et précis en continu, mais lourd à manier", "Fusil tactique": "précis en tir semi-automatique à moyenne/longue portée", "Fusil de précision": "fait pour la longue portée et les éliminations rapides", "Fusil à pompe": "dévastateur à très courte portée" },
  en: { "Fusil d'assaut": "versatile and effective at mid range", "Mitraillette": "deadly up close and on the move", "Fusil-mitrailleur": "powerful and accurate in sustained fire, but heavy to handle", "Fusil tactique": "accurate in semi-auto at mid/long range", "Fusil de précision": "built for long range and quick eliminations", "Fusil à pompe": "devastating at very close range" }
};
const T = {
  fr: {
    titre: (n) => `Meilleure classe ${n} — Warzone & Black Ops 7`,
    desc: (n, c) => `Meilleure classe ${n} (${c}) sur Warzone & Black Ops 7 : accessoires optimisés, statistiques détaillées, TTK et conseils. Gratuit.`,
    h1: (n) => `Meilleure classe ${n}`,
    intro: (n, art, cat, catdesc, tier) => `${n} est ${art} ${cat} ${tier ? `classé tier <strong>${tier}</strong> dans la méta actuelle` : "présent dans la méta actuelle"}, ${catdesc}. Voici sa <strong>classe optimale</strong> (accessoires recommandés), ses <strong>statistiques</strong> détaillées et son <strong>TTK</strong>.`,
    secLoadout: "Classe recommandée", secStats: "Statistiques", secTTK: "TTK (temps pour éliminer)", secFF: "Forces & faiblesses",
    forces: "Points forts", faiblesses: "Points faibles",
    statBase: "Base", statOpt: "Avec accessoires", statName: "Statistique",
    ttkTxt: (stk, ttk) => `Au corps et à courte portée, ${n => n} À 250 PV (Warzone), il faut environ <strong>${stk} balles</strong> pour une élimination, soit un TTK d'environ <strong>${ttk} ms</strong>.`,
    cta: "Composer cette classe dans l'éditeur →",
    related: "Autres armes de la même catégorie", hub: "Toutes les armes", home: "Accueil",
    noLoadout: "Aucun accessoire à fort impact détecté pour cette arme — elle est déjà efficace de base.",
    aucun: "—", maj: "Données : "
  },
  en: {
    titre: (n) => `Best ${n} loadout — Warzone & Black Ops 7`,
    desc: (n, c) => `Best ${n} (${c}) loadout for Warzone & Black Ops 7: optimal attachments, detailed stats, TTK and tips. Free.`,
    h1: (n) => `Best ${n} loadout`,
    intro: (n, art, cat, catdesc, tier) => `${n} is ${art} ${cat} ${tier ? `ranked tier <strong>${tier}</strong> in the current meta` : "featured in the current meta"}, ${catdesc}. Here is its <strong>optimal loadout</strong> (recommended attachments), detailed <strong>stats</strong> and <strong>TTK</strong>.`,
    secLoadout: "Recommended loadout", secStats: "Stats", secTTK: "TTK (time to kill)", secFF: "Strengths & weaknesses",
    forces: "Strengths", faiblesses: "Weaknesses",
    statBase: "Base", statOpt: "With attachments", statName: "Stat",
    cta: "Build this loadout in the editor →",
    related: "Other weapons in the same category", hub: "All weapons", home: "Home",
    noLoadout: "No high-impact attachment detected for this weapon — it is already effective by default.",
    aucun: "—", maj: "Data: "
  }
};
const ARTICLE = { fr: { v: "une", c: "un" }, en: { v: "an", c: "a" } }; // (simplifié)

// ---- 5) Style commun (compact, thème sombre comme l'app) ----
const STYLE = `
  :root{color-scheme:dark}
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,Arial,sans-serif;background:#0f1217;color:#e8eaed;margin:0;line-height:1.6}
  a{color:#ff8a3c}
  .wrap{max-width:840px;margin:0 auto;padding:24px 18px 60px}
  header.top{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid #2c3038;background:#0a0c0f;position:sticky;top:0;z-index:10}
  header.top .brand{font-weight:800;letter-spacing:1px;color:#fff;text-decoration:none;font-size:18px}
  header.top .brand span{color:#ff8a3c}
  nav.bc{font-size:13px;color:#8a939d;margin:18px 0 6px}
  nav.bc a{color:#b0b7c0;text-decoration:none}
  h1{font-size:28px;margin:6px 0 4px}
  .cat{color:#d29a6a;text-transform:uppercase;letter-spacing:1px;font-size:12px;font-weight:700}
  .tier-badge{display:inline-block;margin-left:8px;padding:2px 10px;border-radius:999px;font-weight:800;font-size:13px;color:#0c1116}
  .lede{color:#c8ccd2;font-size:16px;margin:14px 0 8px}
  .cta{display:inline-block;margin:14px 0;background:#ff7a18;color:#fff;padding:12px 20px;border-radius:10px;font-weight:800;text-decoration:none}
  .cta:hover{background:#ff9046}
  h2{font-family:system-ui;font-size:20px;color:#ffb070;margin:30px 0 10px;border-bottom:1px solid #2c3038;padding-bottom:6px}
  ul.load{list-style:none;padding:0;margin:0}
  ul.load li{background:#1a1e24;border:1px solid #2c3038;border-left:3px solid #ff7a18;border-radius:8px;padding:10px 14px;margin-bottom:8px}
  ul.load .slot{font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#8a939d}
  ul.load .name{font-weight:700;color:#fff}
  .chips{margin-top:4px}
  .chip{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;margin:2px 4px 0 0}
  .chip.b{background:rgba(74,222,128,.15);color:#4ade80}
  .chip.m{background:rgba(248,113,113,.15);color:#f87171}
  table{width:100%;border-collapse:collapse;font-size:14px}
  th,td{text-align:left;padding:7px 10px;border-bottom:1px solid #20242b}
  th{color:#b0b7c0;font-size:12px;text-transform:uppercase;letter-spacing:.5px}
  td:not(:first-child),th:not(:first-child){text-align:right;font-variant-numeric:tabular-nums}
  .ff{display:flex;gap:18px;flex-wrap:wrap}
  .ff .col{flex:1 1 240px;background:#161a20;border:1px solid #2c3038;border-radius:10px;padding:12px 16px}
  .ff h3{margin:0 0 8px;font-size:14px}
  .ff .good{color:#4ade80}.ff .bad{color:#f87171}
  .ttk{background:#161a20;border:1px solid #2c3038;border-radius:10px;padding:14px 16px;font-size:15px}
  .ttk strong{color:#ff8a3c}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-top:8px}
  .grid a{display:block;background:#1a1e24;border:1px solid #2c3038;border-radius:8px;padding:9px 12px;text-decoration:none;color:#e8eaed;font-size:14px;font-weight:600}
  .grid a:hover{border-color:#ff8a3c}
  .grid a small{display:block;color:#8a939d;font-weight:400;font-size:12px}
  footer{border-top:1px solid #20242b;margin-top:40px;padding-top:18px;color:#8a939d;font-size:13px;text-align:center}
  footer a{color:#b0b7c0}
  .wimg{max-width:100%;height:auto;max-height:180px;object-fit:contain;display:block;margin:10px 0}
`;
const TIER_COLOR = { S: "#ffb020", A: "#4ade80", B: "#38bdf8", C: "#d29a6a", D: "#a78bfa" };

// ---- 6) Rendu d'une page d'arme ----
function pageArme(arme, lang) {
  const tr = T[lang];
  const s = slug(arme.nom);
  const cat = arme.categorie;
  const catTr = TR_CAT[lang][cat] || cat;
  const tier = TIERS[arme.id] || null;
  const { retenus } = classeRecommandee(arme);
  const sel = etatVide(arme.emplacements); retenus.forEach(c => sel[c.slot] = c.opt.id);
  const fin = statsFinales(arme, sel);
  const ttk = ttkClose(fin, 250);
  const { forces, faiblesses } = forcesFaiblesses(arme);
  const img = IMAGES_ARMES[arme.id] || (arme.image || null);

  const urlFr = `${BASE}/armes/${s}/`;
  const urlEn = `${BASE}/weapons/${s}/`;
  const urlSelf = lang === "fr" ? urlFr : urlEn;
  const hubUrl = lang === "fr" ? "/armes/" : "/weapons/";

  const art = (lang === "fr") ? (/^[aeiouéè]/i.test(catTr) ? "un" : "un") : "a"; // simple
  const intro = tr.intro(esc(arme.nom), lang === "fr" ? "un" : (/^[aeiou]/i.test(catTr) ? "an" : "a"), esc(catTr), CAT_DESC[lang][cat] || "", tier);

  // Liste accessoires recommandés
  const loadoutHtml = retenus.length ? `<ul class="load">${retenus.map(c => {
    const mods = c.opt.modificateurs ? Object.entries(c.opt.modificateurs).map(([st, v]) =>
      `<span class="chip ${estBonus(st, v) ? "b" : "m"}">${esc(modLisible(st, v, lang))}</span>`).join("") : "";
    return `<li><span class="slot">${esc(c.label)}</span><div class="name">${esc(c.opt.nom)}</div><div class="chips">${mods}</div></li>`;
  }).join("")}</ul>` : `<p>${tr.noLoadout}</p>`;

  // Table stats
  const statsRows = Object.keys(INFOS_STATS).map(st => {
    const base = Math.round((arme.stats_base[st] ?? 0) * 100) / 100;
    const opt = fin[st];
    const diff = opt !== base;
    return `<tr><td>${esc(TR_STATLABEL[lang][st] || st)}</td><td>${base}</td><td style="color:${diff ? (INFOS_STATS[st].plusGrandEstMieux ? (opt > base ? "#4ade80" : "#f87171") : (opt < base ? "#4ade80" : "#f87171")) : "#e8eaed"}">${opt}</td></tr>`;
  }).join("");

  const ttkHtml = ttk ? `<div class="ttk">${lang === "fr"
    ? `À courte portée et à 250 PV (Warzone), il faut environ <strong>${ttk.stk} balles</strong> pour éliminer une cible, soit un TTK d'environ <strong>${ttk.ttk} ms</strong> (cadence ${Math.round(fin.cadence_cpm)} c/min).`
    : `Up close at 250 HP (Warzone), it takes about <strong>${ttk.stk} shots</strong> to down a target, i.e. a TTK of roughly <strong>${ttk.ttk} ms</strong> (fire rate ${Math.round(fin.cadence_cpm)} rpm).`}</div>` : "";

  const ffHtml = `<div class="ff"><div class="col"><h3 class="good">▲ ${tr.forces}</h3><ul style="margin:0;padding-left:18px">${forces.map(st => `<li>${esc(TR_STATLABEL[lang][st] || st)}</li>`).join("")}</ul></div><div class="col"><h3 class="bad">▼ ${tr.faiblesses}</h3><ul style="margin:0;padding-left:18px">${faiblesses.map(st => `<li>${esc(TR_STATLABEL[lang][st] || st)}</li>`).join("")}</ul></div></div>`;

  // Armes liées (même catégorie, même langue)
  const liees = ARMES_PRINCIPALES.filter(a => a.categorie === cat && a.id !== arme.id).slice(0, 8);
  const lieesHtml = `<div class="grid">${liees.map(a => {
    const u = (lang === "fr" ? "/armes/" : "/weapons/") + slug(a.nom) + "/";
    return `<a href="${u}">${esc(a.nom)}<small>${esc(TIERS[a.id] ? "Tier " + TIERS[a.id] : catTr)}</small></a>`;
  }).join("")}</div>`;

  const jsonld = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": tr.h1(arme.nom),
    "inLanguage": lang,
    "about": { "@type": "Thing", "name": arme.nom + " (" + cat + ")" },
    "isPartOf": { "@type": "WebSite", "name": "WZ Guide", "url": BASE + "/" },
    "publisher": { "@type": "Organization", "name": "WZ Guide" },
    "description": tr.desc(arme.nom, catTr)
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-adsense-account" content="ca-pub-2060302255453240">
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2060302255453240" crossorigin="anonymous"></script>
<title>${esc(tr.titre(arme.nom))} | WZ Guide</title>
<meta name="description" content="${esc(tr.desc(arme.nom, catTr))}">
<link rel="canonical" href="${urlSelf}">
<link rel="alternate" hreflang="fr" href="${urlFr}">
<link rel="alternate" hreflang="en" href="${urlEn}">
<link rel="alternate" hreflang="x-default" href="${urlFr}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(tr.titre(arme.nom))}">
<meta property="og:description" content="${esc(tr.desc(arme.nom, catTr))}">
<meta property="og:url" content="${urlSelf}">
${img ? `<meta property="og:image" content="${esc(img)}">` : ""}
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>${STYLE}</style>
</head>
<body>
<header class="top"><a class="brand" href="/">WZ <span>GUIDE</span></a></header>
<div class="wrap">
  <nav class="bc"><a href="/">${tr.home}</a> › <a href="${hubUrl}">${tr.hub}</a> › ${esc(arme.nom)}</nav>
  <div class="cat">${esc(catDisplay(cat, lang))} · ${esc(arme.jeu)}${tier ? `<span class="tier-badge" style="background:${TIER_COLOR[tier] || "#3a4049"}">Tier ${tier}</span>` : ""}</div>
  <h1>${esc(tr.h1(arme.nom))}</h1>
  ${img ? `<img class="wimg" src="${esc(img)}" alt="${esc(arme.nom)}" loading="lazy">` : ""}
  <p class="lede">${intro}</p>
  <a class="cta" href="/">${tr.cta}</a>

  <h2>${tr.secLoadout}</h2>
  ${loadoutHtml}

  <h2>${tr.secStats}</h2>
  <table><thead><tr><th>${tr.statName}</th><th>${tr.statBase}</th><th>${tr.statOpt}</th></tr></thead><tbody>${statsRows}</tbody></table>

  ${ttk ? `<h2>${tr.secTTK}</h2>${ttkHtml}` : ""}

  <h2>${tr.secFF}</h2>
  ${ffHtml}

  <h2>${tr.related}</h2>
  ${lieesHtml}

  <p style="margin-top:24px"><a class="cta" href="/">${tr.cta}</a></p>
  <footer>
    <a href="/">WZ Guide</a> · <a href="${hubUrl}">${tr.hub}</a> · <a href="/?lang=${lang}">${tr.home}</a><br>
    © 2026 WZ Guide — ${lang === "fr" ? "Site indépendant, non affilié à Activision / Call of Duty." : "Independent site, not affiliated with Activision / Call of Duty."}
  </footer>
</div>
</body>
</html>`;
}

// ---- 7) Page hub (liste de toutes les armes) ----
function pageHub(lang) {
  const tr = T[lang];
  const parCat = {};
  ARMES_PRINCIPALES.forEach(a => { (parCat[a.categorie] = parCat[a.categorie] || []).push(a); });
  const sections = Object.keys(parCat).map(cat => {
    const items = parCat[cat].map(a => {
      const u = (lang === "fr" ? "/armes/" : "/weapons/") + slug(a.nom) + "/";
      return `<a href="${u}">${esc(a.nom)}<small>${TIERS[a.id] ? "Tier " + TIERS[a.id] : ""}</small></a>`;
    }).join("");
    return `<h2>${esc(catDisplay(cat, lang))}</h2><div class="grid">${items}</div>`;
  }).join("");
  const titre = lang === "fr" ? "Toutes les armes — meilleures classes Warzone & Black Ops 7" : "All weapons — best Warzone & Black Ops 7 loadouts";
  const desc = lang === "fr" ? "Liste de toutes les armes de Warzone & Black Ops 7 avec leur meilleure classe, leurs stats et leur tier." : "List of all Warzone & Black Ops 7 weapons with their best loadout, stats and tier.";
  const other = lang === "fr" ? "/weapons/" : "/armes/";
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-adsense-account" content="ca-pub-2060302255453240">
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2060302255453240" crossorigin="anonymous"></script>
<title>${esc(titre)} | WZ Guide</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}${lang === "fr" ? "/armes/" : "/weapons/"}">
<link rel="alternate" hreflang="fr" href="${BASE}/armes/">
<link rel="alternate" hreflang="en" href="${BASE}/weapons/">
<link rel="alternate" hreflang="x-default" href="${BASE}/armes/">
<style>${STYLE}</style>
</head>
<body>
<header class="top"><a class="brand" href="/">WZ <span>GUIDE</span></a></header>
<div class="wrap">
  <nav class="bc"><a href="/">${tr.home}</a> › ${tr.hub}</nav>
  <h1>${esc(titre)}</h1>
  <p class="lede">${esc(desc)}</p>
  <a class="cta" href="/">${lang === "fr" ? "Ouvrir l'éditeur de classe →" : "Open the loadout editor →"}</a>
  ${sections}
  <footer><a href="/">WZ Guide</a> · <a href="${other}">${lang === "fr" ? "English" : "Français"}</a><br>© 2026 WZ Guide</footer>
</div>
</body>
</html>`;
}

// ---- 8) Sitemap complet ----
function sitemap() {
  const urls = [];
  const add = (locFr, locEn) => urls.push({ fr: locFr, en: locEn });
  add(BASE + "/", BASE + "/");                       // accueil (alternates gérées à part)
  add(BASE + "/armes/", BASE + "/weapons/");
  ARMES_PRINCIPALES.forEach(a => add(`${BASE}/armes/${slug(a.nom)}/`, `${BASE}/weapons/${slug(a.nom)}/`));
  const entry = (u) => `  <url>
    <loc>${u.fr}</loc>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="fr" href="${u.fr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.fr}"/>
  </url>${u.fr !== u.en ? `\n  <url>
    <loc>${u.en}</loc>
    <changefreq>weekly</changefreq>
    <xhtml:link rel="alternate" hreflang="fr" href="${u.fr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.fr}"/>
  </url>` : ""}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(entry).join("\n")}
</urlset>
`;
}

// ---- 9) Écriture ----
async function main() {
  let n = 0;
  for (const arme of ARMES_PRINCIPALES) {
    const s = slug(arme.nom);
    await mkdir(join(DIST, "armes", s), { recursive: true });
    await writeFile(join(DIST, "armes", s, "index.html"), pageArme(arme, "fr"));
    await mkdir(join(DIST, "weapons", s), { recursive: true });
    await writeFile(join(DIST, "weapons", s, "index.html"), pageArme(arme, "en"));
    n += 2;
  }
  await writeFile(join(DIST, "armes", "index.html"), pageHub("fr"));
  await writeFile(join(DIST, "weapons", "index.html"), pageHub("en"));
  await writeFile(join(DIST, "sitemap.xml"), sitemap());
  console.log(`✅ Pages SEO générées : ${n} pages d'armes (FR+EN) + 2 hubs + sitemap.xml`);
  console.log(`   ${ARMES_PRINCIPALES.length} armes · /armes/<slug>/ (FR) et /weapons/<slug>/ (EN)`);
}
main().catch(e => { console.error("❌ Génération SEO échouée :", e); process.exit(1); });
