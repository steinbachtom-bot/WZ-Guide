/* ============================================================
   DONNÉES DU JEU — Éditeur de classe Warzone (Black Ops 7)
   ============================================================
   CE FICHIER NE CONTIENT QUE DES DONNÉES (pas de logique).
   C'est ICI qu'on ajoute des armes, des accessoires, des atouts…

   IMPORTANT : chaque arme a MAINTENANT SES PROPRES accessoires,
   dans sa clé "emplacements" (comme dans le vrai jeu).

   Modèle de stats aligné sur codmunity.gg / le gunsmith :
     - recul séparé en gun_kick / horizontal / vertical
     - vélocité de balle (m/s), déplacement (m/s)
   Règles de modificateurs :
     "+15%" = pourcentage de la stat de base   |   "+20" = valeur fixe
   Pour les stats "temps" et "recul", une BAISSE est un bonus.
   ============================================================ */

const CAP_ACCESSOIRES = 5;   // règle Black Ops 7 Warzone : 5 max par arme

// Fraîcheur des données : à mettre à jour à chaque nouvelle saison / MAJ.
const META_DONNEES = {
  saison: "Saison 4",
  jeu: "Black Ops 7 / Warzone",
  maj: "juin 2026 · Saison 4",  // dernière mise à jour des stats
  source: "codmunity.gg",
  sourceUrl: "https://codmunity.gg"
};

// Définition et affichage des statistiques.
const INFOS_STATS = {
  degats:                  { label: "Dégâts",                 court: "Dégâts",               plusGrandEstMieux: true,  max: 80 },
  portee_m:                { label: "Portée (m)",             court: "Portée",               plusGrandEstMieux: true,  max: 80 },
  cadence_cpm:             { label: "Cadence (coups/min)",    court: "Cadence",              plusGrandEstMieux: true,  max: 1000 },
  velocite_ms:             { label: "Vélocité de balle (m/s)",court: "Vélocité",             plusGrandEstMieux: true,  max: 1200 },
  capacite_chargeur:       { label: "Capacité du chargeur",   court: "Capacité du chargeur", plusGrandEstMieux: true,  max: 80 },
  vitesse_visee_ms:        { label: "Temps de visée (ms)",    court: "Temps de visée",       plusGrandEstMieux: false, max: 500 },
  sprint_to_fire_ms:       { label: "Sprint-tir (ms)",        court: "Sprint-tir",           plusGrandEstMieux: false, max: 400 },
  vitesse_rechargement_ms: { label: "Temps de rechargement (ms)", court: "Temps de rechargement", plusGrandEstMieux: false, max: 4000 },
  gun_kick:                { label: "Gun kick (recul caméra)",court: "Gun kick",             plusGrandEstMieux: false, max: 40 },
  recul_horizontal:        { label: "Recul horizontal",       court: "Recul horizontal",     plusGrandEstMieux: false, max: 40 },
  recul_vertical:          { label: "Recul vertical",         court: "Recul vertical",       plusGrandEstMieux: false, max: 80 },
  mobilite:                { label: "Déplacement (m/s)",      court: "Déplacement",          plusGrandEstMieux: true,  max: 8 }
};

/* ------------------------------------------------------------
   LES CATÉGORIES D'ARMES (dans l'ordre d'affichage du sélecteur).
   Une catégorie sans aucune arme s'affiche grisée « (à venir) ».
   La catégorie d'une arme est définie par son champ "categorie".
   ------------------------------------------------------------ */
const CATEGORIES_PRINCIPALES = [
  "Fusil d'assaut",
  "Mitraillette",
  "Fusil-mitrailleur",
  "Fusil tactique",
  "Fusil de précision",
  "Fusil à pompe"
];
const CATEGORIES_SECONDAIRES = [
  "Pistolet",
  "Lanceur",
  "Arme de mêlée",
  "Arme spéciale"
];

/* ------------------------------------------------------------
   LES OPUS (jeux d'origine des armes). Warzone mélange plusieurs jeux.
   L'opus d'une arme est défini par son champ "jeu".
   Un opus sans arme (dans un emplacement donné) s'affiche grisé.
   ------------------------------------------------------------ */
const JEUX = [
  "Black Ops 7",
  "Black Ops 6",
  "Modern Warfare III",
  "Modern Warfare II"
];

/* ------------------------------------------------------------
   LA MÉTA (tier list). Indicative, basée sur la méta codmunity —
   à ajuster librement. Clé = id de l'arme, valeur = tier.
   ------------------------------------------------------------ */
const TIERS_ORDRE = ["S", "A", "B", "C", "D"];
const TIERS = {
  // --- Fusils d'assaut ---
  voyak_kt3: "S", m15_mod0: "S", peacekeeper_mk1: "S", mxr_17: "S",
  x9_maverick: "A", mk35_isr: "A", egrt_17: "A",
  ak_27: "B", maddox_rfb: "B", ds20_mirage: "B", krig_c: "B",
  // --- Mitraillettes ---
  sturmwolf_45: "S", mpc_25: "S", carbon_57: "S", kogot_7: "B",
  vst: "A", ryden_45k: "A", c9: "A",
  dravec_45: "A", rk_9: "B", razor_9mm: "B",
  rev_46: "A", cbrs_3: "A",
  // --- Fusils-mitrailleurs ---
  mk78: "C",
  xm325: "S", xmg: "A",
  sokol_545: "A",
  // --- Fusils tactiques ---
  m8a1: "S", m34_novaline: "S",
  warden_308: "A",
  krs_762: "S", swordfish_a1: "B",
  tsarkov_762: "C",
  // --- Fusils de précision ---
  strider_300: "S",
  vs_recon: "A", hawker_hx: "A",
  xr3_ion: "B", shadow_sk: "B", lr_762: "B",
  // --- Fusils à pompe ---
  sg_12: "B",
  echo_12: "B", m10_breacher: "A", gdl_havoc: "B",
  akita: "C", asg_89: "C",
  // --- Pistolets ---
  grekhova: "A",
  velox_57: "B", coda_9: "B",
  jager_45: "C", pistolet_1911: "C",
  // --- Armes spéciales ---
  siren: "B", nx_ravager: "C",
  // --- Lanceurs ---
  cigma_2b: "C", arc_m1: "C", aarow_109: "C",
  // --- Armes de mêlée ---
  couteau: "C", katana: "C", couteau_balistique: "C",
  flatline_mk2: "D", poings: "D", h311_saw: "D",
  "goblin_mk_2": "S",
  "ffar_1": "S",
  "as_val": "S",
  "ak_74": "A",
  "cr_56_amax": "A",
  "xm4": "A",
  "model_l": "B",
  "ames_85": "B",
  "kilo_141": "B",
  "cypher_091": "C",
  "gpr_91": "C",
  "abr_a1": "C",
  "tanto_22": "S",
  "kompakt_92": "S",
  "dresden_9mm": "A",
  "ksv": "A",
  "ppsh_41": "A",
  "jackal_pdw": "B",
  "saug": "B",
  "ladra": "B",
  "pp_919": "C",
  "lc10": "C",
  "maelstrom": "S",
  "pu_21": "A",
  "marine_sp": "B",
  "pml_5_56": "S",
  "feng_82": "A",
  "gpmg_7": "B",
  "essex_model_07": "S",
  "dm_10": "A",
  "tr2": "A",
  "swat_5_56": "B",
  "aek_973": "C",
  "lw3a1_frostline": "S",
  "svd": "A",
  "amr_mod_4": "B",
  "hdr": "C",
  "gs45": "S",
  "9mm_pm": "A",
  "stryder_22": "B",
  "gravemark_357_revolver": "C",
  "d1_3_sector": "S",
  "nail_gun": "S",
  "merrick_556": "A",
  "x52_resonator": "B",
  "olympia": "B",
  "sirin_9mm": "C"
};

/* ------------------------------------------------------------
   IMAGES DES ARMES (visuels codmunity.gg). Clé = id de l'arme.
   Si une image manque ou ne charge pas, une silhouette s'affiche.
   ------------------------------------------------------------ */
const IMG_BASE = "https://assets.codmunity.gg/optimized/";
const IMAGES_ARMES = {
  // Fusils d'assaut BO7
  m15_mod0: IMG_BASE + "M15-Mod-0-Green.webp",
  ak_27: IMG_BASE + "AK-27-Green.webp",
  mxr_17: IMG_BASE + "MXR-17-Green.webp",
  peacekeeper_mk1: IMG_BASE + "Peacekeeper-Mk1-Green.webp",
  egrt_17: IMG_BASE + "EGRT-17.webp",
  voyak_kt3: IMG_BASE + "VOYAK-KT-3.webp",
  mk35_isr: IMG_BASE + "MK35-ISR.webp",
  x9_maverick: IMG_BASE + "X9-Maverick-Green.webp",
  maddox_rfb: IMG_BASE + "Maddox-RFB.webp",
  ds20_mirage: IMG_BASE + "DS20-Mirage-Green.webp",
  // Mitraillettes BO7
  kogot_7: IMG_BASE + "Kogot.webp",
  mpc_25: IMG_BASE + "MPC-25-Green.webp",
  carbon_57: IMG_BASE + "Carbon-57-Green.webp",
  sturmwolf_45: IMG_BASE + "Sturmwolf-45.webp",
  ryden_45k: IMG_BASE + "Ryden-45K-Green.webp",
  rk_9: IMG_BASE + "RK-9-Green.webp",
  dravec_45: IMG_BASE + "Dravec-45-Green.webp",
  vst: IMG_BASE + "VST.webp",
  razor_9mm: IMG_BASE + "Razor-9mm-Green.webp",
  rev_46: IMG_BASE + "REV-46.webp",
  // Fusils-mitrailleurs BO7
  mk78: IMG_BASE + "MK.78-Green.webp",
  xm325: IMG_BASE + "XM325-Green.webp",
  sokol_545: IMG_BASE + "Sokol-545.webp",
  // Fusils tactiques BO7
  swordfish_a1: IMG_BASE + "Swordfish-AI.webp",
  m8a1: IMG_BASE + "M8A1-Green.webp",
  m34_novaline: IMG_BASE + "M34-Novaline-Green.webp",
  warden_308: IMG_BASE + "Warden-308-Green.webp",
  // Fusils de précision BO7
  strider_300: IMG_BASE + "strider300_bo7_icon.webp",
  hawker_hx: IMG_BASE + "Hawker-HX.webp",
  xr3_ion: IMG_BASE + "XR-3-Ion-Green.webp",
  shadow_sk: IMG_BASE + "Shadow-SK-Green.webp",
  vs_recon: IMG_BASE + "VS-Recon-Green.webp",
  // Fusils à pompe BO7
  m10_breacher: IMG_BASE + "M10-Breacher-Green.webp",
  sg_12: IMG_BASE + "SG-12-Close-Range-Warzone-Loadout-CODMunity-6394.webp",
  echo_12: IMG_BASE + "Echo-12-Green.webp",
  akita: IMG_BASE + "Akita-Green.webp",
  // Armes Black Ops 6
  krig_c: IMG_BASE + "KRIG-C.webp",
  c9: IMG_BASE + "C9-Dark-Spine.webp",
  xmg: IMG_BASE + "XMG-Dark-Spine.webp",
  tsarkov_762: IMG_BASE + "Tsarkov-7.62-Dark-Spine.webp",
  lr_762: IMG_BASE + "LR.7-Dark-Spine.webp",
  asg_89: IMG_BASE + "ASG-89-Dark-Spine.webp",
  grekhova: IMG_BASE + "Grekhova-Dark-Spine.webp",
  // Pistolets BO7
  jager_45: IMG_BASE + "J%C3%83%C2%A4ger-45-Green.webp",
  velox_57: IMG_BASE + "Velox-5.7-Green.webp",
  coda_9: IMG_BASE + "CODA-9-Green.webp",
  pistolet_1911: IMG_BASE + "1911.webp",
  // Armes spéciales BO7
  siren: IMG_BASE + "siren_bo7_icon.webp",
  nx_ravager: IMG_BASE + "NX-Ravager.webp",
  // Lanceurs BO7
  arc_m1: IMG_BASE + "A.R.C.-M1-Green.webp",
  aarow_109: IMG_BASE + "AAROW-109-Green.webp",
  // Armes de mêlée BO7
  couteau: IMG_BASE + "Knife-Green.webp",
  couteau_balistique: IMG_BASE + "ballisticknife_bo7_Icon.webp",
  katana: IMG_BASE + "katana_bo7_melee_icon.webp",
  h311_saw: IMG_BASE + "H311SAW_bo7_Icon.webp",
  // Flatline Mk.II : pas sur codmunity → render officiel Call of Duty
  flatline_mk2: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-MELEE-FLATLINE-MK-II.webp",
  // Poings : aucun render officiel (mêlée par défaut) → icône poing intégrée
  poings: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><g fill='%237d8c63'><rect x='15' y='26' width='35' height='26' rx='7'/><rect x='16' y='20' width='8' height='12' rx='4'/><rect x='25' y='17' width='8' height='15' rx='4'/><rect x='34' y='18' width='8' height='14' rx='4'/><rect x='43' y='22' width='8' height='11' rx='4'/><rect x='44' y='31' width='13' height='9' rx='4'/></g></svg>",
  krs_762: "https://assets.codmunity.gg/optimized/KRS-7.62-Versatile-Black-Ops-7-Loadout-CODMunity-1730.webp",
  cbrs_3: "https://assets.codmunity.gg/optimized/CBRS-3-Versatile-Black-Ops-7-Loadout-CODMunity-6824.webp",
  "xm4": "https://assets.codmunity.gg/optimized/XM4-Dark-Spine.webp",
  "ak_74": "https://assets.codmunity.gg/optimized/AK-74-Versatile-Black-Ops-6-ShareLoadout-CODMunity-8407.webp",
  "ames_85": "https://assets.codmunity.gg/optimized/AMES-85-Dark-Spine.webp",
  "gpr_91": "https://assets.codmunity.gg/optimized/GPR-91-Dark-Spine.webp",
  "model_l": "https://assets.codmunity.gg/optimized/MODEL-L-Dark-Spine.webp",
  "goblin_mk_2": "https://assets.codmunity.gg/optimized/GOBLIN-MK-2-Dark-Spine.webp",
  "as_val": "https://assets.codmunity.gg/optimized/AS-VAL-Versatile-Black-Ops-6-ShareLoadout-CODMunity-5634.webp",
  "cypher_091": "https://assets.codmunity.gg/optimized/Cypher-091.webp",
  "kilo_141": "https://assets.codmunity.gg/optimized/Kilo-141.webp",
  "cr_56_amax": "https://assets.codmunity.gg/optimized/CR-56-Amax.webp",
  "ksv": "https://assets.codmunity.gg/optimized/KSV-Versatile-Black-Ops-6-ShareLoadout-CODMunity-1136.webp",
  "tanto_22": "https://assets.codmunity.gg/optimized/Tanto-.22-Dark-Spine.webp",
  "pp_919": "https://assets.codmunity.gg/optimized/PP-919-Dark-Spine.webp",
  "jackal_pdw": "https://assets.codmunity.gg/optimized/JACKAL-PDW-Dark-Spine.webp",
  "kompakt_92": "https://assets.codmunity.gg/optimized/KOMPAKT-92-Dark-Spine.webp",
  "saug": "https://assets.codmunity.gg/optimized/SAUG.webp",
  "ppsh_41": "https://assets.codmunity.gg/optimized/PPSh-41.webp",
  "ladra": "https://assets.codmunity.gg/optimized/Ladra.webp",
  "lc10": "https://assets.codmunity.gg/optimized/LC10.webp",
  "marine_sp": "https://assets.codmunity.gg/optimized/Marine-SP-Dark-Spine.webp",
  "maelstrom": "https://assets.codmunity.gg/optimized/Maelstrom.webp",
  "pu_21": "https://assets.codmunity.gg/optimized/PU-21-Dark-Spine.webp",
  "gpmg_7": "https://assets.codmunity.gg/optimized/GPMG-7-Dark-Spine.webp",
  "feng_82": "https://assets.codmunity.gg/optimized/Feng-82.webp",
  "aek_973": "https://assets.codmunity.gg/optimized/AEK-973-Versatile-Black-Ops-6-ShareLoadout-CODMunity-4454.webp",
  "dm_10": "https://assets.codmunity.gg/optimized/DM-10-Dark-Spine.webp",
  "tr2": "https://assets.codmunity.gg/optimized/TR2.webp",
  "lw3a1_frostline": "https://assets.codmunity.gg/optimized/LW3A1-Frostline-Dark-Spine.webp",
  "svd": "https://assets.codmunity.gg/optimized/SVD-Dark-Spine.webp",
  "amr_mod_4": "https://assets.codmunity.gg/optimized/AMR-MOD-4.webp",
  "hdr": "https://assets.codmunity.gg/optimized/HDR.webp",
  "gs45": "https://assets.codmunity.gg/optimized/Gs45-Dark-Spine.webp",
  "stryder_22": "https://assets.codmunity.gg/optimized/Stryder-.22-Dark-Spine.webp",
  "sirin_9mm": "https://assets.codmunity.gg/optimized/Sirin-9mm.webp",
  "d1_3_sector": "https://assets.codmunity.gg/optimized/D1.3-Sector.webp",
  "nail_gun": "https://assets.codmunity.gg/optimized/Nail-Gun.webp",
  "olympia": "https://assets.codmunity.gg/optimized/Olympia1.webp",
  "merrick_556": "https://assets.codmunity.gg/optimized/Merrick-5.56.webp",
  "dresden_9mm": "https://assets.codmunity.gg/optimized/Dresden-9mm.webp",
  "x52_resonator": "https://assets.codmunity.gg/optimized/X52Resonator_wpn_bo6.webp"
};

/* ------------------------------------------------------------
   ARMES PRINCIPALES
   ------------------------------------------------------------
   La 1re est le KRIG C avec ses VRAIES données (source codmunity.gg,
   Warzone). La 2e reste un exemple pour montrer le changement d'arme.
   ------------------------------------------------------------ */
const ARMES_PRINCIPALES = [
  {
    id: "krig_c",
    nom: "Krig C",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Stats de base RÉELLES (Warzone).
    stats_base: {
      degats: 38, portee_m: 50, cadence_cpm: 638, velocite_ms: 820,
      capacite_chargeur: 30, vitesse_visee_ms: 280, sprint_to_fire_ms: 215,
      vitesse_rechargement_ms: 2933, gun_kick: 18.38, recul_horizontal: 15.25,
      recul_vertical: 50.44, mobilite: 4.8
    },
    // Accessoires COMPLETS du Krig C (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "volzhskiy", nom: "Volzhskiy Reflex", description: "Point rouge net." },
        { id: "otero", nom: "Otero Red Dot", description: "Point rouge compact." },
        { id: "jason2x", nom: "Jason Armory 2x", description: "Lunette 2x." },
        { id: "willis3x", nom: "Willis 3x", description: "Lunette 3x longue portée." },
        { id: "hawker", nom: "Hawker Hybrid", description: "Viseur hybride polyvalent." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur", description: "Discret, pas d'effet de stat notable." },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-30%" } },
        { id: "frein_bouche", nom: "Frein de bouche", description: "Stabilise sans effet de stat chiffré." },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-22%", recul_vertical: "-25%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, gagne en portée mais vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+21%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+40%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+45%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Tir plus serré mais recul nettement accru.", modificateurs: { gun_kick: "+48%", recul_horizontal: "+20%", recul_vertical: "+50%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus maniable, sans effet de stat chiffré." },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+20%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-3%", recul_horizontal: "-35%" } },
        { id: "poignee_marksman", nom: "Poignée Marksman", description: "Réduit le recul en visée focalisée.", effets_extra: { "Recul en visée": "réduit" } },
        { id: "poignee_legere", nom: "Poignée légère", description: "Légère, sans effet de stat chiffré." },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-20%" } },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal, sprinte plus vite.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-20%" }, effets_extra: { "Vitesse sprint": "+7%" } },
        { id: "g_grip", nom: "Poignée G-Grip", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+15 balles, rechargement plus lent.", modificateurs: { capacite_chargeur: "+15", vitesse_rechargement_ms: "+10%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Recharge et dégaine plus vite, mais −10 balles.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-10%", vitesse_rechargement_ms: "-26%", capacite_chargeur: "-10" } },
        { id: "flip_mag", nom: "Chargeur Flip", description: "Recharge plus vite, manie plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-10%", vitesse_rechargement_ms: "-18%", capacite_chargeur: "-5" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+40 balles, vise et recharge plus lentement.", modificateurs: { capacite_chargeur: "+40", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+14%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-29%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-45%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-30%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-20%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_infiltrateur", nom: "Crosse Infiltrateur", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+21%" } },
        { id: "sans_crosse", nom: "Sans crosse", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+24%" }, effets_extra: { "Mobilité accroupi": "+36%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement des tirs).", effets_extra: { "Flinch": "−55%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+12%" }, effets_extra: { "Mobilité accroupi": "+18%", "Mobilité ADS": "+11%" } },
        { id: "crosse_combat", nom: "Crosse de combat", description: "Plus mobile en visée, réduit le flinch.", effets_extra: { "Mobilité ADS": "+12%", "Flinch": "−30%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible par l'ennemi).", effets_extra: { "Tir à la hanche": "−20%" } },
        { id: "laser_strelok", nom: "Laser Strelok", description: "Laser de visée (visible par l'ennemi)." },
        { id: "laser_mvt_rapide", nom: "Laser mouvement rapide", description: "Améliore la manœuvrabilité (visible par l'ennemi)." },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible par l'ennemi)." },
        { id: "laser_visee", nom: "Laser de visée", description: "Laser de visée (visible par l'ennemi)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "5.56 NATO surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-18%", recul_vertical: "-13%" } },
        { id: "fmj", nom: "5.56 NATO FMJ", description: "Perforation, sans effet de stat chiffré." },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et perte de portée/vélocité.", modificateurs: { cadence_cpm: "+12%", velocite_ms: "-15%", gun_kick: "+21%", recul_horizontal: "+30%", recul_vertical: "+20%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "c9",
    nom: "C9",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Accessoires COMPLETS du C9 (liste exhaustive, source codmunity.gg Warzone BO6).
    stats_base: {
      degats: 40, portee_m: 20, cadence_cpm: 732, velocite_ms: 540,
      capacite_chargeur: 30, vitesse_visee_ms: 230, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2240, gun_kick: 42.01, recul_horizontal: 13.38,
      recul_vertical: 48.15, mobilite: 5
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "remuda", nom: "Remuda Mini Reflex", description: "Petit point rouge." },
        { id: "redwell_reflex", nom: "Redwell Reflex", description: "Point rouge ouvert." },
        { id: "jason2x", nom: "Jason Armory 2x", description: "Lunette 2x." },
        { id: "merlin", nom: "Merlin Reflex", description: "Point rouge net." },
        { id: "vmf", nom: "VMF Variable Scope", description: "Lunette à grossissement variable." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur", description: "Tir silencieux." },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-33%", recul_vertical: "-35%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-22%", recul_vertical: "-23%" } },
        { id: "muzzle_brake", nom: "Frein de bouche", description: "Réduit le recul de la 1re balle (effet visuel)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+26%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+30%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+55%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+30%", portee_m: "+15%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+44%", recul_horizontal: "+20%", recul_vertical: "+45%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus mobile (canon court)." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lightweight", nom: "Poignée légère", description: "Maniabilité (pas d'effet de stat notable)." },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-35%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal, plus rapide en sprint.", modificateurs: { recul_horizontal: "-15%" }, effets_extra: { "Vitesse sprint": "+6%" } },
        { id: "marksman", nom: "Poignée de tireur", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "g_grip", nom: "Poignée G-Grip", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "flip_mag", nom: "Chargeur Flip", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-13%" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+10 balles, recharge plus lente.", modificateurs: { capacite_chargeur: "+10", vitesse_rechargement_ms: "+14%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-17%", capacite_chargeur: "-5" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+20 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+15%", vitesse_rechargement_ms: "+21%" } },
        { id: "mag_10mm", nom: "Chargeur 10mm Auto (30)", description: "Plus de vélocité, mais cadence réduite et recul accru.", modificateurs: { velocite_ms: "+10%", cadence_cpm: "-9%", gun_kick: "+19%", recul_vertical: "+20%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-31%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-32%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-15%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "infiltrator", nom: "Crosse Infiltrator", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+18%" } },
        { id: "sans_crosse", nom: "Sans crosse", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+17%" }, effets_extra: { "Mobilité accroupi": "+26%" } },
        { id: "combat", nom: "Crosse de combat", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+11%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement plus rapide, plus mobile en visée.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+15%", "Mobilité ADS": "+10%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit fortement le flinch (encaissement).", effets_extra: { "Flinch": "−55%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "steady_aim", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible).", effets_extra: { "Tir à la hanche": "−20%" } },
        { id: "laser_tactique", nom: "Laser tactique", description: "Précision tir à la hanche (visible)." },
        { id: "fast_motion", nom: "Laser mouvement rapide", description: "Précision tir à la hanche (visible)." },
        { id: "target_laser", nom: "Laser de visée", description: "Précision tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "9x19mm surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "fmj_9mm", nom: "9mm Parabellum FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+6%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%", portee_m: "-10%" } },
        { id: "overpressured_10mm", nom: "10mm surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj_10mm", nom: "10mm FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." }
      ]}
    ]
  },
  {
    id: "xmg",
    nom: "XMG",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 6",
    // Accessoires COMPLETS du XMG (liste exhaustive, source codmunity.gg Warzone BO6).
    stats_base: {
      degats: 29, portee_m: 43, cadence_cpm: 697, velocite_ms: 860,
      capacite_chargeur: 100, vitesse_visee_ms: 380, sprint_to_fire_ms: 250,
      vitesse_rechargement_ms: 7960, gun_kick: 16.02, recul_horizontal: 4.26,
      recul_vertical: 49.29, mobilite: 4.4
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "volzhskiy", nom: "Volzhskiy Reflex", description: "Point rouge net." },
        { id: "jason2x", nom: "Jason Armory 2x", description: "Lunette 2x." },
        { id: "otero", nom: "Otero Red Dot", description: "Point rouge compact." },
        { id: "om3_holo", nom: "OM3 '92 Holo", description: "Viseur holographique." },
        { id: "redwell_zoom", nom: "Redwell Custom Zoom", description: "Lunette à grossissement variable." },
        { id: "otero_thermal", nom: "Otero Thermal 2x", description: "Lunette thermique 2x." },
        { id: "prismatech_reflex", nom: "PrismaTech Reflex", description: "Point rouge reflex." },
        { id: "rk_multizoom", nom: "R&K Multizoom", description: "Lunette à grossissements multiples." },
        { id: "prismatech_4x", nom: "PrismaTech 4x", description: "Lunette grossissement 4x." },
        { id: "kepler_microflex", nom: "Kepler Microflex", description: "Mini point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur", description: "Tir silencieux." },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-34%", recul_vertical: "-35%" } },
        { id: "muzzle_brake", nom: "Frein de bouche", description: "Réduit le recul de la 1re balle (effet visuel)." },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-25%", recul_vertical: "-25%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+12%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+40%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+35%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+25%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+50%", recul_horizontal: "+25%", recul_vertical: "+50%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus mobile (canon court)." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-40%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "lightweight", nom: "Poignée légère", description: "Maniabilité (pas d'effet de stat notable)." },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal, plus rapide en sprint.", modificateurs: { recul_horizontal: "-20%" }, effets_extra: { "Vitesse sprint": "+7%" } },
        { id: "marksman", nom: "Poignée de tireur", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "crossbar", nom: "Poignée Crossbar", description: "Manie plus vite en visée mais recul vertical accru.", modificateurs: { vitesse_visee_ms: "-13%", gun_kick: "+10%", recul_vertical: "+10%" }, effets_extra: { "Mobilité ADS": "+19%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −25 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-6%", capacite_chargeur: "-25" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+50 balles, recharge un peu plus lente.", modificateurs: { capacite_chargeur: "+50", vitesse_rechargement_ms: "+4%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Encore plus rapide, −50 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-18%", capacite_chargeur: "-50" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+100 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+100", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-16%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-31%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "light_stock", nom: "Crosse légère", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+21%" }, effets_extra: { "Mobilité accroupi": "+41%" } },
        { id: "infiltrator", nom: "Crosse Infiltrator", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+18%" } },
        { id: "combat", nom: "Crosse de combat", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+11%" } },
        { id: "heavy_stock", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." },
        { id: "balanced", nom: "Crosse équilibrée", description: "Déplacement plus rapide, plus mobile en visée.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+19%", "Mobilité ADS": "+8%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "steady_aim", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible).", effets_extra: { "Tir à la hanche": "−30%" } },
        { id: "laser_tactique", nom: "Laser tactique", description: "Précision tir à la hanche (visible)." },
        { id: "laser_cible", nom: "Laser de visée", description: "Précision tir à la hanche (visible)." },
        { id: "fast_motion", nom: "Laser mouvement rapide", description: "Précision tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "7.62 NATO surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+23%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%" } },
        { id: "fmj", nom: "7.62 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+15%", recul_horizontal: "+20%", recul_vertical: "+15%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "tsarkov_762",
    nom: "Tsarkov 7.62",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Accessoires COMPLETS du Tsarkov 7.62 (liste exhaustive, source codmunity.gg Warzone BO6). Marksman semi-auto à fort recul.
    stats_base: {
      degats: 60, portee_m: 60, cadence_cpm: 133, velocite_ms: 890,
      capacite_chargeur: 20, vitesse_visee_ms: 365, sprint_to_fire_ms: 235,
      vitesse_rechargement_ms: 3000, gun_kick: 17, recul_horizontal: 15.05,
      recul_vertical: 82.29, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "volzhskiy", nom: "Volzhskiy Reflex", description: "Point rouge net." },
        { id: "pinpoint", nom: "Pinpoint Hybrid", description: "Viseur hybride." },
        { id: "willis3x", nom: "Willis 3x", description: "Lunette 3x." },
        { id: "svd", nom: "Lunette SVD", description: "Lunette longue portée." },
        { id: "otero_dot", nom: "Otero Red Dot", description: "Point rouge compact." },
        { id: "otero_thermal", nom: "Otero Thermal 2x", description: "Lunette thermique 2x." },
        { id: "redwell_zoom", nom: "Redwell Custom Zoom", description: "Lunette à grossissement variable." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "muzzle_brake", nom: "Frein de bouche", description: "Réduit le recul de la 1re balle (effet visuel)." },
        { id: "suppresseur", nom: "Suppresseur", description: "Tir silencieux." },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-30%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-18%", recul_vertical: "-20%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+30%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+53%", recul_horizontal: "+20%", recul_vertical: "+55%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+15%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus mobile (canon court)." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "garde_leste", nom: "Garde-main lesté", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-40%" } },
        { id: "garde_leger", nom: "Garde-main léger", description: "Maniabilité (pas d'effet de stat notable)." },
        { id: "garde_prec", nom: "Garde-main de précision", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "garde_ranger", nom: "Garde-main Ranger", description: "Réduit le recul horizontal, plus rapide en sprint.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" }, effets_extra: { "Vitesse sprint": "+6%" } },
        { id: "garde_marksman", nom: "Garde-main de tireur", description: "Stabilité de visée (pas d'effet de stat notable)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+5 balles, recharge plus lente.", modificateurs: { capacite_chargeur: "+5", vitesse_rechargement_ms: "+14%" } },
        { id: "flip_mag", nom: "Chargeur Flip", description: "Manie et recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-13%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-16%", capacite_chargeur: "-5" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+10 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+9%", vitesse_rechargement_ms: "+28%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-25%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-30%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-12%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+25%" }, effets_extra: { "Mobilité accroupi": "+40%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." },
        { id: "balanced", nom: "Crosse équilibrée", description: "Déplacement plus rapide, plus mobile en visée.", modificateurs: { mobilite: "+14%" }, effets_extra: { "Mobilité accroupi": "+22%", "Mobilité ADS": "+13%" } },
        { id: "infiltrator", nom: "Crosse Infiltrator", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "combat", nom: "Crosse de combat", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+14%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "steady_aim", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible).", effets_extra: { "Tir à la hanche": "−30%" } },
        { id: "fast_motion", nom: "Laser mouvement rapide", description: "Précision tir à la hanche (visible)." },
        { id: "target_laser", nom: "Laser de visée", description: "Précision tir à la hanche (visible)." },
        { id: "laser_tactique", nom: "Laser tactique", description: "Précision tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "7.62x54mmR surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "fmj", nom: "7.62x54mmR FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul accru.", modificateurs: { cadence_cpm: "+8%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" } }
      ]}
    ]
  },
  {
    id: "lr_762",
    nom: "LR 7.62",
    categorie: "Fusil de précision",
    jeu: "Black Ops 6",
    // Accessoires COMPLETS du LR 7.62 (liste exhaustive, source codmunity.gg Warzone BO6). Sniper à verrou.
    stats_base: {
      degats: 90, portee_m: 76, cadence_cpm: 39, velocite_ms: 890,
      capacite_chargeur: 5, vitesse_visee_ms: 600, sprint_to_fire_ms: 320,
      vitesse_rechargement_ms: 3460, gun_kick: 31.15, recul_horizontal: 35.08,
      recul_vertical: 70.11, mobilite: 4.5
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "willis3x", nom: "Willis 3x", description: "Lunette 3x." },
        { id: "ks_dot", nom: "K&S Red Dot", description: "Point rouge." },
        { id: "vmf", nom: "VMF Variable Scope", description: "Lunette à grossissement variable." },
        { id: "ks_thermal", nom: "K&S Thermal Holo", description: "Holographique thermique." },
        { id: "remuda_rf", nom: "Remuda Range Finder", description: "Lunette télémètre." },
        { id: "kepler_micro", nom: "Kepler Microflex", description: "Mini point rouge." },
        { id: "prisma4x", nom: "PrismaTech 4x", description: "Lunette 4x." },
        { id: "svd", nom: "Lunette SVD", description: "Lunette de tireur d'élite." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur", description: "Tir silencieux." },
        { id: "compensateur", nom: "Compensateur", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-25%", recul_vertical: "-25%" } },
        { id: "muzzle_brake", nom: "Frein de bouche", description: "Réduit le recul de la 1re balle (effet visuel)." },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+9%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+25%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+10%", portee_m: "+15%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Vise plus lentement et recul nettement accru.", modificateurs: { vitesse_visee_ms: "+22%", gun_kick: "+50%", recul_horizontal: "+20%", recul_vertical: "+50%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus mobile (canon court)." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "garde_leste", nom: "Garde-main lesté", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-35%" } },
        { id: "garde_leger", nom: "Garde-main léger", description: "Maniabilité (pas d'effet de stat notable)." },
        { id: "garde_ranger", nom: "Garde-main Ranger", description: "Réduit le recul horizontal, plus rapide en sprint.", modificateurs: { recul_horizontal: "-17%" }, effets_extra: { "Vitesse sprint": "+6%" } },
        { id: "garde_prec", nom: "Garde-main de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "garde_marksman", nom: "Garde-main de tireur", description: "Stabilité de visée (pas d'effet de stat notable)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+2 balles, recharge plus lente.", modificateurs: { capacite_chargeur: "+2", vitesse_rechargement_ms: "+11%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-13%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+5 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+3%", sprint_to_fire_ms: "+7%", vitesse_rechargement_ms: "+21%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Manie et recharge plus vite, −1 balle.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-3%", vitesse_rechargement_ms: "-26%", capacite_chargeur: "-1" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-33%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-16%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-9%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-26%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+15%" }, effets_extra: { "Mobilité accroupi": "+28%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." },
        { id: "balanced", nom: "Crosse équilibrée", description: "Déplacement plus rapide, plus mobile en visée.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+14%", "Mobilité ADS": "+11%" } },
        { id: "combat", nom: "Crosse de combat", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+18%" } },
        { id: "infiltrator", nom: "Crosse Infiltrator", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+27%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Précision tir à la hanche (visible)." },
        { id: "steady_aim", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible).", effets_extra: { "Tir à la hanche": "−25%" } },
        { id: "fast_motion", nom: "Laser mouvement rapide", description: "Précision tir à la hanche (visible)." },
        { id: "target_laser", nom: "Laser de visée", description: "Précision tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "7.62 NATO surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "fmj", nom: "7.62 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence fortement accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+39%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "asg_89",
    nom: "ASG-89",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 6",
    // Accessoires COMPLETS de l'ASG-89 (liste exhaustive, source codmunity.gg Warzone BO6). Pompe dégâts max (102), portée courte.
    stats_base: {
      degats: 102, portee_m: 10, cadence_cpm: 128, velocite_ms: 320,
      capacite_chargeur: 12, vitesse_visee_ms: 260, sprint_to_fire_ms: 195,
      vitesse_rechargement_ms: 3200, gun_kick: 36, recul_horizontal: 31.91,
      recul_vertical: 95.48, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "prismatech_reflex", nom: "PrismaTech Reflex", description: "Point rouge reflex." },
        { id: "ks_red_dot", nom: "K&S Red Dot", description: "Point rouge." },
        { id: "kepler", nom: "Kepler Microflex", description: "Mini point rouge." },
        { id: "accuspot_holo", nom: "Accu-Spot Ultra Holo", description: "Viseur holographique." },
        { id: "merlin_mini", nom: "Merlin Mini", description: "Mini point rouge." },
        { id: "kepler_dot", nom: "Kepler Red Dot", description: "Point rouge." },
        { id: "pinpoint", nom: "Pinpoint Hybrid", description: "Viseur hybride." },
        { id: "jason2x", nom: "Jason Armory 2x", description: "Lunette 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur", description: "Tir silencieux." },
        { id: "choke_modifie", nom: "Choke modifié", description: "Resserre la gerbe de plombs (tir à la hanche)." },
        { id: "muzzle_brake", nom: "Frein de bouche", description: "Réduit le recul de la 1re balle (effet visuel)." },
        { id: "full_choke", nom: "Choke complet", description: "Resserre fortement la gerbe à la hanche.", effets_extra: { "Tir à la hanche": "−15%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+18%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+15%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Hausse de vélocité.", modificateurs: { velocite_ms: "+13%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+5%", portee_m: "+7%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul accru.", modificateurs: { gun_kick: "+29%", recul_horizontal: "+10%", recul_vertical: "+30%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus mobile (canon court)." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-30%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "lightweight", nom: "Poignée légère", description: "Maniabilité (pas d'effet de stat notable)." },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal, plus rapide en sprint.", modificateurs: { recul_horizontal: "-15%" }, effets_extra: { "Vitesse sprint": "+6%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −2 cartouches.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-13%", capacite_chargeur: "-2" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+3 cartouches, recharge plus lente.", modificateurs: { capacite_chargeur: "+3", vitesse_rechargement_ms: "+14%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+8 cartouches, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+8", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+26%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Encore plus rapide, −4 cartouches.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-10%", vitesse_rechargement_ms: "-20%", capacite_chargeur: "-4" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-31%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-10%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-21%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-23%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+26%" }, effets_extra: { "Mobilité accroupi": "+39%" } },
        { id: "balanced", nom: "Crosse équilibrée", description: "Déplacement plus rapide, plus mobile en visée.", modificateurs: { mobilite: "+14%" }, effets_extra: { "Mobilité accroupi": "+21%", "Mobilité ADS": "+10%" } },
        { id: "infiltrator", nom: "Crosse Infiltrator", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+20%" } },
        { id: "combat", nom: "Crosse de combat", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+12%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "steady_aim", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible).", effets_extra: { "Tir à la hanche": "−15%" } },
        { id: "fast_motion", nom: "Laser mouvement rapide", description: "Précision tir à la hanche (visible)." },
        { id: "laser_tactique", nom: "Laser tactique", description: "Précision tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok", description: "Précision tir à la hanche (visible)." },
        { id: "target_laser", nom: "Laser de visée", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "slug", nom: "Cartouche à balle 12 Gauge (Slug)", description: "Tir précis à balle unique : recul réduit mais vélocité moindre et dispersion à la hanche plus large.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", velocite_ms: "-25%" }, effets_extra: { "Tir à la hanche": "+20%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul accru.", modificateurs: { cadence_cpm: "+5%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } }
      ]}
    ]
  },
  {
    id: "m15_mod0",
    nom: "M15 Mod 0",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Stats de base RÉELLES (Warzone, source codmunity.gg).
    stats_base: {
      degats: 30, portee_m: 50, cadence_cpm: 769, velocite_ms: 900,
      capacite_chargeur: 30, vitesse_visee_ms: 235, sprint_to_fire_ms: 199,
      vitesse_rechargement_ms: 2550, gun_kick: 16.81, recul_horizontal: 9.27,
      recul_vertical: 45.12, mobilite: 4.7
    },
    // Accessoires COMPLETS du M15 Mod 0 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "kepler_rd", nom: "Kepler-Pro Red Dot", description: "Point rouge." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette 4x." },
        { id: "mm_scanner", nom: "Millimeter Scanner", description: "Optique de détection." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" } },
        { id: "frein", nom: "Frein RL-5.56", description: "Stabilise le recul vertical, 1re balle plus contrôlée.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "suppresseur", nom: "Suppresseur VAS 5.56", description: "Discret (pas d'effet de stat notable)." },
        { id: "comp_titan", nom: "Compensateur Titan-R 5.56", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+10%", portee_m: "+6%", vitesse_visee_ms: "+23%" } },
        { id: "frein_stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "supp_shadex", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, mais moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_moyen", nom: "Canon moyenne portée (20″ Delta-F2)", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-15%", velocite_ms: "-5%" }, effets_extra: { "Mobilité ADS": "+7%" } },
        { id: "canon_long", nom: "Canon long (18″ Bowen Watchtower)", description: "Vise un peu plus lentement.", modificateurs: { vitesse_visee_ms: "+6%" } },
        { id: "canon_court", nom: "Canon court (15″ Mirage Light)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-9%" } },
        { id: "canon_hybride", nom: "Canon hybride (16.5″ Fusion)", description: "Un peu plus de vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "canon_controle", nom: "Canon contrôle (16″ Reticulated)", description: "Plus de vélocité, recul réduit, mais vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-18%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+15%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "−10%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_angle", nom: "Poignée angulaire (Ironhold)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "poignee_recul", nom: "Poignée contrôle de recul (Axis Shift)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "poignee_mobile", nom: "Poignée recul mobile (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+8%" } },
        { id: "poignee_mobilite", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+12%" } },
        { id: "poignee_focus", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "poignee_deviation", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "flip_mag", nom: "Chargeur Flip (Backline)", description: "Recharge plus pratique." },
        { id: "fast_mag", nom: "Chargeur rapide I (Nomad Reserve)", description: "Manie et recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-27%" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I (Mayday)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Bowen Bulwark)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+9%", vitesse_rechargement_ms: "+29%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "−4%", "Mobilité ADS": "−9%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "s2f", nom: "Poignée tir-sprint (Contour)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw (Peregrine)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-23%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Contraband)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-15%", vitesse_visee_ms: "+6%" } },
        { id: "quickdraw_mobile", nom: "Poignée Quickdraw mobile (Hexcut)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "precision", nom: "Poignée précision (Caravan-H2)", description: "Réduit le recul vertical, 1re balle plus contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_mobilite", nom: "Crosse mobilité (Telescopic)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+22%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+37%" } },
        { id: "crosse_controle", nom: "Crosse contrôle (Bowen Linchpin)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+11%" }, effets_extra: { "Mobilité ADS": "−14%" } },
        { id: "crosse_ads", nom: "Crosse mobilité ADS (Wander-3V)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-9%" }, effets_extra: { "Mobilité ADS": "+24%" } },
        { id: "crosse_legere", nom: "Crosse tactique légère (Ultralight)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "crosse_flinch", nom: "Crosse anti-flinch (Intervention)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%", vitesse_visee_ms: "+9%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "laser_tactique", nom: "Laser tactique (Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_strelok", nom: "Laser Strelok (5mw Lockstep)", description: "Laser de visée (visible)." },
        { id: "laser_stable", nom: "Laser stable (3mW Motion Strike)", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+20%" } },
        { id: "laser_maniabilite", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "haute_velocite", nom: "Munitions haute vélocité (5.56 Overpressured)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "tir_rapide", nom: "Tir rapide (Bolt Carrier)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-10%" } },
        { id: "fmj", nom: "Munitions FMJ (MFS 5.56)", description: "Plus de portée, moins de vélocité.", modificateurs: { portee_m: "+16%", velocite_ms: "-18%" } }
      ]}
    ]
  },
  {
    id: "ak_27",
    nom: "AK-27",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Stats de base RÉELLES (Warzone, source codmunity.gg).
    stats_base: {
      degats: 32, portee_m: 55, cadence_cpm: 682, velocite_ms: 920,
      capacite_chargeur: 30, vitesse_visee_ms: 240, sprint_to_fire_ms: 190,
      vitesse_rechargement_ms: 2465, gun_kick: 17.59, recul_horizontal: 16.41,
      recul_vertical: 43.88, mobilite: 4.7
    },
    // Accessoires COMPLETS de l'AK-27 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "lti_reflex", nom: "LTI Reflex", description: "Point rouge." },
        { id: "prismatech_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." },
        { id: "ristrauch_7x", nom: "RistRauch 7x", description: "Lunette de précision 7x." },
        { id: "solaris_ir", nom: "Solaris Holo-IR", description: "Optique thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "suppresseur", nom: "Suppresseur SWF Tishina-11", description: "Discret (pas d'effet de stat notable)." },
        { id: "frein", nom: "Frein Eclipse 7.62", description: "Stabilise le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-16%", recul_vertical: "-16%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "comp_ported", nom: "Compensateur EMT3 Ported-70", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+12%", vitesse_visee_ms: "+23%" } },
        { id: "frein_stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "supp_shadex", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, mais moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_moyen", nom: "Canon moyenne portée (17″ Bystro)", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-25%", velocite_ms: "-6%" }, effets_extra: { "Mobilité ADS": "+7%" } },
        { id: "canon_court", nom: "Canon court (14″ Prism Light)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-12%" } },
        { id: "canon_long", nom: "Canon long (18.2″ Vostok)", description: "Vise un peu plus lentement.", modificateurs: { vitesse_visee_ms: "+6%" } },
        { id: "canon_controle", nom: "Canon contrôle (17.6″ Vandal Heavy)", description: "Plus de vélocité, recul réduit, vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+15%" }, effets_extra: { "Mobilité ADS": "−10%" } },
        { id: "canon_hybride", nom: "Canon hybride (16.3″ SWF Tumult)", description: "Un peu plus de vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_recul", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%" } },
        { id: "poignee_angle", nom: "Poignée angulaire (Ironhold)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "poignee_focus", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "poignee_mobilite", nom: "Poignée mobilité (Strider Handstop)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+10%" } },
        { id: "poignee_mobile", nom: "Poignée recul mobile (Flowguard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+8%" } },
        { id: "poignee_deviation", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-35%", recul_vertical: "-4%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "flip_mag", nom: "Chargeur Flip (Riker)", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-15%", capacite_chargeur: "+5" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I (Epitaph)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "fast_mag", nom: "Chargeur rapide I (IronDivide)", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-30%", capacite_chargeur: "-5" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Saber Heavy Drum)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+30%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "−4%", "Mobilité ADS": "−8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "s2f", nom: "Poignée tir-sprint (Dictum Light)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-43%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw (Lithe Thin)", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Kronos Heavy)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-25%", vitesse_visee_ms: "+3%" } },
        { id: "precision", nom: "Poignée précision (Czar Control)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "quickdraw_mobile", nom: "Poignée Quickdraw mobile (Garin Advanced)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-15%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_mobilite", nom: "Crosse mobilité (Caliban Light)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+20%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+33%" } },
        { id: "crosse_ads", nom: "Crosse mobilité ADS (Viktor-7R)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-8%" }, effets_extra: { "Mobilité ADS": "+19%" } },
        { id: "crosse_legere", nom: "Crosse tactique légère (Prodigal Skeleton)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "crosse_controle", nom: "Crosse contrôle (Pugil Heavy)", description: "Réduit le recul, 1re balle contrôlée, vise un peu plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" }, effets_extra: { "Recul 1re balle": "−14%", "Mobilité ADS": "−17%" } },
        { id: "crosse_flinch", nom: "Crosse anti-flinch (SWF-62 Variable)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-15%", recul_vertical: "-10%", vitesse_visee_ms: "+8%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique (Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_visee_stable", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "laser_strelok", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "laser_stable", nom: "Laser stable (3mW Motion Strike)", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+14%" } },
        { id: "laser_maniabilite", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ressorts_recul", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-12%", recul_vertical: "-8%" } },
        { id: "haute_velocite", nom: "Munitions haute vélocité (7.62 Overpressured)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: "Munitions FMJ (7.62 Soviet)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "tir_rapide", nom: "Tir rapide (Enhanced Cycle System)", description: "Cadence accrue, recul horizontal annulé mais recul vertical et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", gun_kick: "-20%", recul_horizontal: "-100%", recul_vertical: "+24%", velocite_ms: "-12%", portee_m: "-12%" } }
      ]}
    ]
  },
  {
    id: "mxr_17",
    nom: "MXR-17",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Stats de base RÉELLES (Warzone, source codmunity.gg).
    stats_base: {
      degats: 36, portee_m: 55, cadence_cpm: 500, velocite_ms: 920,
      capacite_chargeur: 30, vitesse_visee_ms: 235, sprint_to_fire_ms: 200,
      vitesse_rechargement_ms: 2266, gun_kick: 21.52, recul_horizontal: 29.16,
      recul_vertical: 60.86, mobilite: 4.7
    },
    // Accessoires COMPLETS du MXR-17 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_micro", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "bowen_ir", nom: "Bowen X-25 IR", description: "Viseur thermique." },
        { id: "target_finder", nom: "LTI Target Finder v.2", description: "Détecteur de cible." },
        { id: "vas_strix", nom: "VAS Strix 6x Thermal", description: "Lunette thermique 6x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur Greaves Ti-762", description: "Discret (pas d'effet de stat notable)." },
        { id: "compensateur", nom: "Compensateur Redwell-90", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "frein", nom: "Frein Redwell 7.62", description: "Stabilise le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+15%", portee_m: "+8%", vitesse_visee_ms: "+22%" } },
        { id: "comp_titan", nom: "Compensateur Titan-R 7.62", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_moyen", nom: "Canon moyenne portée (18″ Rapid Sterling)", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-20%", velocite_ms: "-4%" }, effets_extra: { "Mobilité ADS": "+7%" } },
        { id: "canon_court", nom: "Canon court (15″ Wraith)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-5%" } },
        { id: "canon_long", nom: "Canon long (20″ Imperial)", description: "Vise un peu plus lentement.", modificateurs: { vitesse_visee_ms: "+6%" } },
        { id: "canon_controle", nom: "Canon contrôle (17″ Greaves Scourge)", description: "Plus de vélocité, recul réduit, vise plus lentement.", modificateurs: { velocite_ms: "+18%", gun_kick: "-15%", recul_horizontal: "-12%", recul_vertical: "-15%", vitesse_visee_ms: "+14%" }, effets_extra: { "Mobilité ADS": "−10%" } },
        { id: "canon_hybride", nom: "Canon hybride (18″ Rift-M7)", description: "Un peu plus de vélocité.", modificateurs: { velocite_ms: "+8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_sentry", nom: "Poignée Sentry Pro Handstop", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "poignee_recul", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } },
        { id: "poignee_focus", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "poignee_mobile", nom: "Poignée recul mobile (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+8%" } },
        { id: "poignee_mobilite", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "flip_mag", nom: "Chargeur Flip (TwinPack)", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-14%", capacite_chargeur: "+5" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I (Vault)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Rhodes Drum)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+8%", vitesse_rechargement_ms: "+26%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "−4%", "Mobilité ADS": "−9%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "s2f", nom: "Poignée tir-sprint (Bell-H81)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw (Celerity)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Fissure)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "virgil", nom: "Poignée Virgil-XI", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "aria", nom: "Poignée précision (Aria Assail)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-10%" } }
      ]},
      { id: "comb", label: "Crosse (joue)", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "comb_s2f", nom: "Joue tir-sprint (Bell-H81)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } },
        { id: "comb_quickdraw", nom: "Joue Quickdraw (Celerity)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "comb_precision", nom: "Joue précision (Fissure)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "comb_virgil", nom: "Joue Virgil-XI", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "comb_aria", nom: "Joue précision (Aria Assail)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-10%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_mobilite", nom: "Crosse mobilité (Greaves Covenant)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+19%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+32%" } },
        { id: "crosse_controle", nom: "Crosse contrôle (Winch)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" }, effets_extra: { "Mobilité ADS": "−16%" } },
        { id: "crosse_ads", nom: "Crosse mobilité ADS (Gait-Lux)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-8%" }, effets_extra: { "Mobilité ADS": "+21%" } },
        { id: "crosse_legere", nom: "Crosse tactique légère (Skeletal)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "crosse_flinch", nom: "Crosse anti-flinch (VAS TH-09)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+8%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "laser_tactique", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_strelok", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "laser_stable", nom: "Laser stable (3mW Motion Strike)", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+15%" } },
        { id: "laser_maniabilite", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-8%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul (Recoil Sync)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "haute_velocite", nom: "Munitions haute vélocité (7.62 Overpressured)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: "Munitions FMJ (7.62 NATO)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+18%" } },
        { id: "tir_rapide", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-11%" } }
      ]}
    ]
  },
  {
    id: "peacekeeper_mk1",
    nom: "Peacekeeper Mk1",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Cadence élevée et très faible recul. Stats de base recalculées depuis les blocs loadout de codmunity.gg.
    stats_base: {
      degats: 26, portee_m: 42, cadence_cpm: 870, velocite_ms: 900,
      capacite_chargeur: 30, vitesse_visee_ms: 231, sprint_to_fire_ms: 160,
      vitesse_rechargement_ms: 2295, gun_kick: 11.94, recul_horizontal: 11.64,
      recul_vertical: 34.82, mobilite: 5.0
    },
    // Accessoires COMPLETS du Peacekeeper Mk1 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Mini point rouge." },
        { id: "greaves_rd", nom: "Greaves Red Dot", description: "Point rouge." },
        { id: "eam_dyad", nom: "EAM Dyad xL", description: "Viseur hybride." },
        { id: "greaves_zoom", nom: "Greaves Ultra Zoom", description: "Lunette à zoom variable." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur K&S Stalker 57-X", description: "Discret (pas d'effet de stat notable)." },
        { id: "compensateur", nom: "Compensateur K&S", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-25%", recul_vertical: "-25%" } },
        { id: "comp_ported", nom: "Compensateur Kühn Ported", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+10%", portee_m: "+6%", vitesse_visee_ms: "+24%" } },
        { id: "frein", nom: "Frein K&S Brake-2B", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_shadex", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, mais moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_court", nom: "Canon court (14.5″ E7-Cuff)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-11%", sprint_to_fire_ms: "-13%" } },
        { id: "canon_long", nom: "Canon long (23.5″ Longbow)", description: "Vise un peu plus lentement.", modificateurs: { vitesse_visee_ms: "+7%" } },
        { id: "canon_hybride", nom: "Canon hybride (21″ DF-3 Merge)", description: "Un peu plus de vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "canon_stimulus", nom: "Canon moyenne portée (19.4″ Stimulus)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%", velocite_ms: "-6%" }, effets_extra: { "Mobilité ADS": "+10%" } },
        { id: "canon_lourd", nom: "Canon contrôle (25″ EAM Heavy)", description: "Plus de vélocité, recul réduit, vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-18%", recul_horizontal: "-18%", recul_vertical: "-18%", vitesse_visee_ms: "+15%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "−9%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_recul", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%" } },
        { id: "poignee_focus", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "poignee_sentry", nom: "Poignée Sentry Pro Handstop", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "poignee_mobilite", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+12%" } },
        { id: "poignee_mobile", nom: "Poignée recul mobile (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-18%", mobilite: "+12%" }, effets_extra: { "Vitesse sprint": "+8%", "Mobilité accroupi": "+8%" } },
        { id: "poignee_deviation", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vulcan", nom: "Chargeur étendu I (Vulcan Reach)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "flip_mag", nom: "Chargeur Flip (Snap Switch)", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-16%", capacite_chargeur: "+5" } },
        { id: "fast_mag", nom: "Chargeur rapide I (ReconClip)", description: "Manie et recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-26%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Barrage)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+9%", vitesse_rechargement_ms: "+24%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "−3%", "Mobilité ADS": "−8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw (Rapid-Lock)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-24%" } },
        { id: "s2f", nom: "Poignée tir-sprint (EAM Dashfire)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-34%" } },
        { id: "precision", nom: "Poignée précision (Kinetix-Mk 1)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-18%", recul_vertical: "-18%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "quickdraw_mobile", nom: "Poignée Quickdraw mobile (DiveEdge-7)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-12%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Accordance)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-12%", vitesse_visee_ms: "+7%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swift_b", nom: "Crosse mobilité (Swift-B Guard)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+22%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+35%" } },
        { id: "crosse_ads", nom: "Crosse mobilité ADS (Vagrant-93)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "crosse_legere", nom: "Crosse tactique légère (Pathfinder-Skel)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-20%" } },
        { id: "blitzfire", nom: "Crosse anti-flinch (EAM Blitzfire)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+9%" }, effets_extra: { "Flinch": "réduit" } },
        { id: "counterforce", nom: "Crosse contrôle (MFS Counterforce-C1)", description: "Réduit fortement l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-30%", recul_horizontal: "-30%", recul_vertical: "-30%", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+9%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable (EAM ScatterLine)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "laser_maniabilite", nom: "Laser maniabilité (LTI SwiftPoint)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-12%" } },
        { id: "laser_tactique", nom: "Laser tactique (Redwell)", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_stable", nom: "Laser stable (EMT3 Agile)", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+15%" } },
        { id: "laser_strelok", nom: "Laser Strelok (VAS Precision Shift)", description: "Laser de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "Munitions haute vélocité (5.7x28mm)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%" } },
        { id: "fmj", nom: "Munitions FMJ (5.7x28mm)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "egrt_17",
    nom: "EGRT-17",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Stats de base et accessoires RÉELS (Warzone, source codmunity.gg).
    stats_base: {
      degats: 32, portee_m: 50, cadence_cpm: 811, velocite_ms: 915,
      capacite_chargeur: 34, vitesse_visee_ms: 230, sprint_to_fire_ms: 179,
      vitesse_rechargement_ms: 2685, gun_kick: 14.53, recul_horizontal: 8.74,
      recul_vertical: 43.57, mobilite: 4.7
    },
    // Accessoires COMPLETS de l'EGRT-17 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fang_elo", nom: "FANG HoverPoint ELO", description: "Viseur holographique." },
        { id: "reflex", nom: "Reflex", description: "Mini point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tiling", nom: "Bouche Tiling (mobilité)", description: "Améliore les transitions de tir (glissade/plongeon)." },
        { id: "ibis", nom: "Suppresseur EAM Ibis", description: "Gagne en portée.", modificateurs: { portee_m: "+10%" } },
        { id: "lattice", nom: "Compensateur Lattice", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-15%" } },
        { id: "finset", nom: "Frein EAM Finset", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+23%", portee_m: "+11.4%", vitesse_visee_ms: "+22%" } },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", velocite_ms: "-13%", portee_m: "-11.4%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "verdin", nom: "Canon court (14.6″ LTI Verdin)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-13%" } },
        { id: "hawker", nom: "Canon long (20.7″ Hawker NAP-3)", description: "Forte hausse de portée.", modificateurs: { portee_m: "+45.4%" } },
        { id: "xr_compulsion", nom: "Canon vélocité (19.1″ XR-Compulsion)", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+43%" } },
        { id: "planar", nom: "Canon hybride (17.9″ EAM Planar)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+22%", portee_m: "+25%" } },
        { id: "bowen_resistor", nom: "Canon dégâts (16.5″ Bowen Resistor)", description: "Gagne en dégâts à distance mais recul de base nettement accru.", modificateurs: { gun_kick: "+39%", recul_horizontal: "+20%", recul_vertical: "+40%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+13%" } },
        { id: "sentry_pro", nom: "Poignée Sentry Pro Handstop", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "bowen_sentry", nom: "Poignée contrôle de recul (Bowen Sentry)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "respire", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "steady90", nom: "Poignée recul mobile (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+11%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+8%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "verto", nom: "Chargeur Flip (Verto)", description: "Recharge bien plus vite.", modificateurs: { vitesse_rechargement_ms: "-32%" } },
        { id: "acute", nom: "Chargeur étendu I (EAM Acute)", description: "+11 balles.", modificateurs: { capacite_chargeur: "+11" } },
        { id: "nova_slim", nom: "Chargeur rapide (EAM Nova-Slim)", description: "Manie/recharge plus vite, −4 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-39%", capacite_chargeur: "-4" } },
        { id: "fuelcell", nom: "Chargeur étendu II (Fuel Cell-X3)", description: "+21 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+21", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+13%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "capacitor", nom: "Poignée Quickdraw (EAM Capacitor)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "fervid", nom: "Poignée tir-sprint (Fervid)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "diode", nom: "Poignée Quickdraw mobile (LTI Diode)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-15%" } },
        { id: "bowen_damp", nom: "Poignée stabilisation (Bowen Dampener)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "nanite", nom: "Poignée précision (Nanite)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "frigate", nom: "Crosse contrôle (Frigate Control)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+19%" }, effets_extra: { "Mobilité ADS": "−14%" } },
        { id: "tatter", nom: "Crosse lourde (EAM Tatter)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+14%" } },
        { id: "eider", nom: "Crosse mobilité ADS (Eider Sidestep)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "saker", nom: "Crosse mobilité (Saker Speed)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+23%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+36%" } },
        { id: "aura_bloom", nom: "Crosse tactique légère (Aura Bloom)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "strelok_5mw", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "tactique_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-10%" } },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+20.4%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts de recul (Buffer Springs)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Recul et vélocité dégradés.", modificateurs: { velocite_ms: "-12%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%", portee_m: "-4.5%" } },
        { id: "echo_rounds", nom: "Munitions Ricochet (MFS Heated Echo)", description: "Plus de vélocité/portée, léger recul en plus.", modificateurs: { velocite_ms: "+22%", portee_m: "+11.4%", gun_kick: "+5%", recul_horizontal: "+5%", recul_vertical: "+5%" } }
      ]}
    ]
  },
  {
    id: "voyak_kt3",
    nom: "Voyak KT-3",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // AR 7.62 : gros dégâts, cadence basse. Base recalculée depuis les loadouts ; accessoires réels (codmunity.gg).
    stats_base: {
      degats: 35, portee_m: 55, cadence_cpm: 659, velocite_ms: 900,
      capacite_chargeur: 30, vitesse_visee_ms: 230, sprint_to_fire_ms: 170,
      vitesse_rechargement_ms: 2266, gun_kick: 17.60, recul_horizontal: 13.81,
      recul_vertical: 46.85, mobilite: 4.9
    },
    // Accessoires COMPLETS du Voyak KT-3 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "reflex", nom: "Reflex", description: "Mini point rouge." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur SWF Tishina-11", description: "Discret (pas d'effet de stat notable)." },
        { id: "comp_ported", nom: "Compensateur EMT3 Ported-70", description: "Améliore les transitions de tir (glissade/plongeon)." },
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+15%", portee_m: "+8%", vitesse_visee_ms: "+23%" } },
        { id: "eclipse_brake", nom: "Frein Eclipse 7.62", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-12%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "greaves_c5", nom: "Canon moyenne portée (19.2″ Greaves-C5)", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+38%" } },
        { id: "hawker_fervor", nom: "Canon court (14″ Hawker Fervor)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-11%" } },
        { id: "danko", nom: "Canon long (20″ Danko)", description: "Canon long (pas d'effet de stat chiffré)." },
        { id: "bowen_dualist", nom: "Canon hybride (15″ Bowen Dualist)", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+16%" } },
        { id: "lti_grav4", nom: "Canon contrôle (17.6″ LTI Grav-4)", description: "Plus de stabilité focalisée mais recul de base nettement accru.", modificateurs: { gun_kick: "+49%", recul_horizontal: "+20%", recul_vertical: "+50%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-22%" } },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-13%" } },
        { id: "strider", nom: "Poignée mobilité (Strider)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+7%", "Mobilité ADS": "+12%" } },
        { id: "sapper", nom: "Poignée recul mobile (Sapper Guard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-12%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+7%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "casket", nom: "Chargeur étendu I (Lineguard Casket)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "slipjoint", nom: "Chargeur Flip (Slipjoint)", description: "Recharge plus pratique." },
        { id: "lancing", nom: "Chargeur rapide I (Lancing Feather)", description: "Manie/recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-34%", capacite_chargeur: "-5" } },
        { id: "garrison", nom: "Chargeur étendu II (SK-Garrison Drum)", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+26%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "initiator", nom: "Poignée tir-sprint (Initiator)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-39%" } },
        { id: "crisis_q", nom: "Poignée Quickdraw (Crisis-Q)", description: "Visée et tir-sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-26%", sprint_to_fire_ms: "-28%" } },
        { id: "path_net", nom: "Poignée stabilisation (Path Net)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "pleated", nom: "Poignée Quickdraw mobile (Pleated)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "targil", nom: "Poignée précision (Targil Luster)", description: "Poignée de précision (pas d'effet de stat chiffré)." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_tread", nom: "Crosse mobilité ADS (Bowen Tread Pad)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+20%" } },
        { id: "ridgeway", nom: "Crosse mobilité (Ridgeway Pad)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+22%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+33%" } },
        { id: "contorso", nom: "Crosse lourde (Contorso Pad)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+12%" } },
        { id: "vlast", nom: "Crosse contrôle (V-Last Control Pad)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+20%" }, effets_extra: { "Mobilité ADS": "−13%" } },
        { id: "noco", nom: "Crosse tactique légère (EMT3 Noco Pad)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-20%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-11%" } },
        { id: "tactique_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+24%" } },
        { id: "mfs_anti", nom: "Laser Strelok (MFS Anti-Dispersion)", description: "Réduit la dispersion (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "Munitions FMJ (7.62 Soviet)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+18%" } },
        { id: "overpressured", nom: "Munitions haute vélocité (7.62 Soviet)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+22%" } },
        { id: "buffer", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+12%", velocite_ms: "-8%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+15%", portee_m: "-8%" } }
      ]}
    ]
  },
  {
    id: "mk35_isr",
    nom: "MK35 ISR",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Stats de base et accessoires RÉELS (Warzone, source codmunity.gg).
    stats_base: {
      degats: 32, portee_m: 47, cadence_cpm: 750, velocite_ms: 910,
      capacite_chargeur: 30, vitesse_visee_ms: 235, sprint_to_fire_ms: 240,
      vitesse_rechargement_ms: 2493, gun_kick: 16.33, recul_horizontal: 9.71,
      recul_vertical: 50.62, mobilite: 4.7
    },
    // Accessoires COMPLETS du MK35 ISR (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fang_elo", nom: "FANG HoverPoint ELO", description: "Viseur holographique." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur VAS 5.56", description: "Discret (pas d'effet de stat notable)." },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "comp_titan", nom: "Compensateur Titan-R 5.56", description: "Améliore les transitions de tir (glissade/plongeon)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, manie plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.1%", vitesse_visee_ms: "+21%", sprint_to_fire_ms: "+22%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-11.9%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_aileron", nom: "Canon long (18.7″ Bowen Aileron)", description: "Forte hausse de portée.", modificateurs: { portee_m: "+40.5%" } },
        { id: "pn_cursus", nom: "Canon moyenne portée (17.9″ PN-Cursus)", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "greaves_bellum", nom: "Canon contrôle (16.5″ Greaves Bellum)", description: "Améliore les dégâts mais recul de base nettement accru.", modificateurs: { gun_kick: "+49%", recul_horizontal: "+15%", recul_vertical: "+30%" } },
        { id: "weaver", nom: "Canon court (15.3″ Weaver-2R)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-10%" } },
        { id: "firetail", nom: "Canon hybride (17″ LTI Firetail)", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "-4%" } },
        { id: "nightfall", nom: "Canon suppresseur intégré (19″ MFS Nightfall)", description: "Discret, gagne en portée.", modificateurs: { portee_m: "+19%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "axis_shift", nom: "Poignée contrôle de recul (Axis Shift)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "respire", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "envoy", nom: "Poignée recul mobile (Envoy)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+8%" } },
        { id: "strider", nom: "Poignée mobilité (Strider)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+13%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul, 1re balle contrôlée.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-26%", recul_vertical: "-9%" }, effets_extra: { "Recul 1re balle": "−35%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "libate", nom: "Chargeur rapide (Libate-RT)", description: "Manie/recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-25%", capacite_chargeur: "-5" } },
        { id: "genx04", nom: "Chargeur étendu I (Gen-X04)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "siskin", nom: "Chargeur Flip (Siskin)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-14%" } },
        { id: "siren_drum", nom: "Chargeur étendu II (Bowen Siren Drum)", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+8%", vitesse_rechargement_ms: "+9%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sarsen", nom: "Poignée tir-sprint (Sarsen Sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-36%" } },
        { id: "patchwork", nom: "Poignée stabilisation (Patchwork)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "rv2", nom: "Poignée Quickdraw (R-V2 Quick)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-25%" } },
        { id: "verdugo", nom: "Poignée Quickdraw mobile (Verdugo Brigand)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "knave", nom: "Poignée précision (VAS Knave Control)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cassin", nom: "Crosse contrôle (Greaves Cassin)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+17%" } },
        { id: "courser", nom: "Crosse mobilité (Courser Light)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+23%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+36%" } },
        { id: "stentor", nom: "Crosse tactique légère (EAM Stentor Tac)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-20%" } },
        { id: "forager", nom: "Crosse lourde (Forager Hybrid)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+11%" } },
        { id: "stmove", nom: "Crosse mobilité ADS (Bowen ST-Move)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+22%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "strelok_5mw", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%" } },
        { id: "tactique_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+19%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+7%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%" } },
        { id: "fmj", nom: "Munitions FMJ (5.56 NATO)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "buffer", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "overpressured", nom: "Munitions haute vélocité (5.56 NATO)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } }
      ]}
    ]
  },
  {
    id: "x9_maverick",
    nom: "X9 Maverick",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // AR cadence très basse (gros dégâts par balle). Stats et accessoires RÉELS (Warzone, codmunity.gg). Pas d'emplacement chargeur.
    stats_base: {
      degats: 40, portee_m: 55, cadence_cpm: 479, velocite_ms: 930,
      capacite_chargeur: 30, vitesse_visee_ms: 235, sprint_to_fire_ms: 195,
      vitesse_rechargement_ms: 3825, gun_kick: 16.65, recul_horizontal: 7.43,
      recul_vertical: 45.84, mobilite: 4.8
    },
    // Accessoires COMPLETS du X9 Maverick (liste exhaustive, source codmunity.gg Warzone). Pas d'emplacement chargeur (la capacité vient du canon).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "eam_xl", nom: "EAM xL Reflex", description: "Point rouge ouvert." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "greaves_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "defense_h", nom: "Suppresseur Defense-H", description: "Discret, gagne en portée.", modificateurs: { portee_m: "+10%" } },
        { id: "hawker_comp", nom: "Compensateur Hawker-473", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "novaburst", nom: "Frein NovaBurst", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "hawker_slant", nom: "Compensateur Hawker Slant (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+25%", portee_m: "+18%", vitesse_visee_ms: "+22%" } },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "os_density", nom: "Canon contrôle (16″ OS-Density)", description: "Plus de vélocité, recul réduit et +21 balles, mais manie/recharge plus lentement.", modificateurs: { velocite_ms: "+20%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", capacite_chargeur: "+21", vitesse_visee_ms: "+14%", sprint_to_fire_ms: "+8%", vitesse_rechargement_ms: "+18%" }, effets_extra: { "Mobilité ADS": "−9%" } },
        { id: "tourville", nom: "Canon moyenne portée (14.9″ Tourville Sprint)", description: "+15 balles, un peu moins de vélocité.", modificateurs: { capacite_chargeur: "+15", velocite_ms: "-6%" }, effets_extra: { "Mobilité ADS": "+7%" } },
        { id: "shroud", nom: "Canon long (19.5″ Shroud)", description: "+15 balles, recharge plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_rechargement_ms: "+12%" } },
        { id: "chiral", nom: "Canon hybride (17.6″ Chiral-02)", description: "Canon hybride (pas d'effet de stat chiffré)." },
        { id: "mfs_pulse", nom: "Canon charge rapide (14.6″ MFS Pulse Load+)", description: "Manie/recharge plus vite et plus mobile, moins de portée.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-13%", vitesse_rechargement_ms: "-21%", mobilite: "+9%", portee_m: "-13%" }, effets_extra: { "Mobilité ADS": "+12%" } },
        { id: "javelin", nom: "Conversion Javelin (lance-harpon)", description: "Convertit l'arme en lance-harpon : très maniable mais vélocité et cadence chutent fortement.", modificateurs: { sprint_to_fire_ms: "-50%", vitesse_rechargement_ms: "-27%", velocite_ms: "-81%", cadence_cpm: "-94%", capacite_chargeur: "-29" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-5%" } },
        { id: "lateral", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "steady90", nom: "Poignée recul mobile (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+8%" } },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+12%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pillory", nom: "Poignée Quickdraw (Pillory)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "granulated", nom: "Poignée précision (Granulated OM1)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "vented", nom: "Poignée tir-sprint (Vented-HKR)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-24%" } },
        { id: "celestial", nom: "Poignée stabilisation (Celestial)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-8%", vitesse_visee_ms: "+6%" } },
        { id: "daedalus", nom: "Poignée Quickdraw mobile (Daedalus)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-12%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ethereal", nom: "Crosse mobilité (Ethereal Wave)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+21%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+35%" } },
        { id: "strider_over", nom: "Crosse mobilité ADS (Strider Overstep)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-8%" }, effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "specter_x", nom: "Crosse contrôle (Specter-X Guard)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" }, effets_extra: { "Mobilité ADS": "−14%" } },
        { id: "skeleton", nom: "Crosse tactique légère (Hawker Skeleton)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "hoi90", nom: "Crosse anti-flinch (H01-90 Full)", description: "Réduit le flinch (encaissement des tirs).", effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+12%" } },
        { id: "strelok_5mw", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "tactique_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "overpressured", nom: "Munitions haute vélocité (4.73 Caseless)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: "Munitions FMJ (4.73 Caseless)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul fortement dégradé.", modificateurs: { cadence_cpm: "+6%", velocite_ms: "-8%", gun_kick: "+60%", recul_horizontal: "+60%", recul_vertical: "+60%", portee_m: "-6%" } }
      ]}
    ]
  },
  {
    id: "maddox_rfb",
    nom: "Maddox RFB",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // Stats de base et accessoires RÉELS (Warzone, source codmunity.gg).
    stats_base: {
      degats: 30, portee_m: 48, cadence_cpm: 690, velocite_ms: 905,
      capacite_chargeur: 40, vitesse_visee_ms: 240, sprint_to_fire_ms: 180,
      vitesse_rechargement_ms: 2431, gun_kick: 27.88, recul_horizontal: 9.03,
      recul_vertical: 43.81, mobilite: 4.8
    },
    // Accessoires COMPLETS du Maddox RFB (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur VAS 5.56", description: "Discret (pas d'effet de stat notable)." },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "comp_titan", nom: "Compensateur Titan-R 5.56", description: "Améliore les transitions de tir (glissade/plongeon)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10.5%", vitesse_visee_ms: "+21%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "turbine", nom: "Canon moyenne portée (21″ Turbine Booster)", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+32%" } },
        { id: "aviary", nom: "Canon court (15″ Aviary Light)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-13%" } },
        { id: "virtuous", nom: "Canon contrôle (19″ Virtuous-Op)", description: "Stabilité focalisée mais recul de base nettement accru.", modificateurs: { gun_kick: "+40%", recul_horizontal: "+20%", recul_vertical: "+40%" } },
        { id: "assemblage", nom: "Canon long (24″ Assemblage)", description: "Forte hausse de portée.", modificateurs: { portee_m: "+31.6%" } },
        { id: "perfidy", nom: "Canon hybride (17″ Perfidy-75)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+16%", portee_m: "+15.8%" } },
        { id: "echo_fire", nom: "Canon rafale (13″ MFS Echo-Fire)", description: "Cadence accrue et recul vertical réduit, mais recul horizontal explose.", modificateurs: { cadence_cpm: "+19%", recul_vertical: "-26%", recul_horizontal: "+222%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "steady90", nom: "Poignée précision (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-7%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+8%" } },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "drift_lock", nom: "Poignée contrôle de recul (VAS Drift Lock)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "respire", nom: "Poignée focus (Enhance-32 Handstop)", description: "Stabilise en visée focalisée." },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+11%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "billing", nom: "Chargeur étendu I (Billing)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "plumage", nom: "Chargeur rapide (Plumage)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-13%" } },
        { id: "scarlet", nom: "Chargeur Flip (ScarletFront)", description: "Manie/recharge plus vite, −10 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-20%", capacite_chargeur: "-10" } },
        { id: "mandible", nom: "Chargeur étendu II (Mandible)", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+11%", vitesse_rechargement_ms: "+17%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hallux", nom: "Poignée Quickdraw mobile (Hallux Mix)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-10%" } },
        { id: "harlequin", nom: "Poignée tir-sprint (Harlequin)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-47%" } },
        { id: "faraday", nom: "Poignée Quickdraw (Faraday Quick)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-19%" } },
        { id: "vas_spire", nom: "Poignée précision (VAS Spire)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "horus", nom: "Poignée stabilisation (Horus Accuracy)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rout_stride", nom: "Crosse mobilité ADS (Rout Stride)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+22%" } },
        { id: "voltaic", nom: "Crosse mobilité (Voltaic Light)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+20%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+31%" } },
        { id: "furrow", nom: "Crosse contrôle (Furrow Control)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+19%" }, effets_extra: { "Mobilité ADS": "−14%" } },
        { id: "throng", nom: "Crosse tactique légère (VAS Throng)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "migrate", nom: "Crosse anti-flinch (Migrate Mix)", description: "Réduit le flinch, plus mobile en visée.", effets_extra: { "Mobilité ADS": "+11%", "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "tactique_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-11%" } },
        { id: "strelok_5mw", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+21%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "overpressured", nom: "Munitions haute vélocité (5.56 NATO)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: "Munitions FMJ (5.56 NATO)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+6%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-10.5%" } }
      ]}
    ]
  },
  {
    id: "ds20_mirage",
    nom: "DS20 Mirage",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 7",
    // AR au recul horizontal quasi nul. Stats de base et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 28, portee_m: 50, cadence_cpm: 606, velocite_ms: 900,
      capacite_chargeur: 30, vitesse_visee_ms: 230, sprint_to_fire_ms: 178,
      vitesse_rechargement_ms: 2323, gun_kick: 11.68, recul_horizontal: 3.43,
      recul_vertical: 53.64, mobilite: 4.9
    },
    // Accessoires COMPLETS du DS20 Mirage (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "kepler", nom: "Kepler T-Range Holo", description: "Viseur holographique télémétrique." },
        { id: "prisma_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." },
        { id: "vas_duo", nom: "VAS Duo Hybrid Sight", description: "Viseur hybride." },
        { id: "eam_dual", nom: "EAM Dual Zoom", description: "Lunette à double zoom." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur VAS 5.56", description: "Discret, gagne en portée.", modificateurs: { portee_m: "+10%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+12%", portee_m: "+8%", vitesse_visee_ms: "+23%" } },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "comp_titan", nom: "Compensateur Titan-R 5.56", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "winged", nom: "Canon court (14.2″ Winged)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-14%" } },
        { id: "westerlies", nom: "Canon moyenne portée (18.9″ Westerlies)", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-15%", velocite_ms: "-5%" }, effets_extra: { "Mobilité ADS": "+10%" } },
        { id: "rupture", nom: "Canon long (20″ Rupture)", description: "Vise un peu plus lentement.", modificateurs: { vitesse_visee_ms: "+6%" } },
        { id: "abdicator", nom: "Canon contrôle (17.1″ Abdicator)", description: "Plus de vélocité, recul fortement réduit, manie plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+15%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "−9%" } },
        { id: "redwell_jx", nom: "Canon hybride (16″ Redwell JX-201)", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-14%" } },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "force_stab", nom: "Poignée contrôle de recul (Force Stabilizer)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-25%" } },
        { id: "strider", nom: "Poignée mobilité (Strider)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+10%" } },
        { id: "sapper", nom: "Poignée recul mobile (Sapper Guard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-14%", mobilite: "+10%" }, effets_extra: { "Vitesse sprint": "+8%", "Mobilité accroupi": "+8%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit la déviation (Passe de combat S3)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pinion", nom: "Chargeur Flip (Pinion)", description: "Recharge plus vite, +10 balles.", modificateurs: { vitesse_rechargement_ms: "-14%", capacite_chargeur: "+10" } },
        { id: "andean", nom: "Chargeur étendu I (Andean)", description: "+15 balles, recharge plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%", vitesse_rechargement_ms: "+18%" }, effets_extra: { "Mobilité ADS": "+4%" } },
        { id: "deltacruise", nom: "Chargeur rapide (DeltaCruise)", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-20%" } },
        { id: "griffon", nom: "Chargeur étendu II (Griffon Reserve)", description: "+30 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+11%", vitesse_rechargement_ms: "+18%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "−3%", "Mobilité ADS": "−8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "needletail", nom: "Poignée Quickdraw (Needletail)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "ulysses", nom: "Poignée tir-sprint (Ulysses)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-51%" } },
        { id: "picket", nom: "Poignée stabilisation (Picket)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-15%", vitesse_visee_ms: "+6%" } },
        { id: "viceroy", nom: "Poignée Quickdraw mobile (Viceroy)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-15%" } },
        { id: "a1c", nom: "Poignée précision (A1-C Control)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "weighted", nom: "Crosse contrôle (Weighted)", description: "Réduit fortement tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+11%" }, effets_extra: { "Mobilité ADS": "−15%" } },
        { id: "assault_div", nom: "Crosse mobilité (Assault Division)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+19%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+32%" } },
        { id: "stratagem", nom: "Crosse tactique légère (Stratagem Tight)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-15%" } },
        { id: "carrion", nom: "Crosse mobilité ADS (Redwell Carrion)", description: "Plus mobile en visée, vise un peu plus vite.", modificateurs: { vitesse_visee_ms: "-12%" }, effets_extra: { "Mobilité ADS": "+20%" } },
        { id: "trunk_mix", nom: "Crosse anti-flinch (Trunk Mix)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-14%", recul_vertical: "-14%", vitesse_visee_ms: "+8%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-11%" } },
        { id: "strelok_5mw", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+20%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "Munitions haute vélocité (5.56 NATO)", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul (Recoil Sync)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%" } },
        { id: "fmj", nom: "Munitions FMJ (5.56 NATO)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+14%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "kogot_7",
    nom: "Kogot-7",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG très haute cadence (968 RPM), recul élevé. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: { degats: 23, portee_m: 25, cadence_cpm: 952, velocite_ms: 540, capacite_chargeur: 30, vitesse_visee_ms: 200, sprint_to_fire_ms: 125, vitesse_rechargement_ms: 2860, gun_kick: 45.74, recul_horizontal: 22.11, recul_vertical: 43.72, mobilite: 5.2 },
    // Accessoires COMPLETS du Kogot-7 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "tishina", nom: "Suppresseur SWF Tishina-11", description: "Discret (pas d'effet de stat notable)." },
        { id: "hawker9_brake", nom: "Frein Hawker-9", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.7%", vitesse_visee_ms: "+28%" } },
        { id: "ported", nom: "Compensateur Hawker Ported (mobilité)", description: "Améliore les transitions de tir (glissade/plongeon)." },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cinerous", nom: "Canon contrôle maniable (11.7″ Cinerous)", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+28%" } },
        { id: "hock_xr", nom: "Canon court (8.5″ Targil Hock-XR)", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-17%", sprint_to_fire_ms: "-36%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "canis05", nom: "Canon long (13.5″ Canis-05)", description: "Plus de portée.", modificateurs: { portee_m: "+23%" } },
        { id: "tz_incisor", nom: "Canon moyenne portée (10.2″ TZ-Incisor)", description: "Plus de vélocité, manie un peu moins vite.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+5%", mobilite: "-3%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "solera", nom: "Canon hybride (9″ EMT3 Solera)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+7.7%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "drift_lock", nom: "Poignée contrôle de recul (VAS Drift Lock)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-24%" } },
        { id: "vitalize", nom: "Poignée Vitalize Handstop", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "lightpath", nom: "Poignée mobilité (EAM Lightpath)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+7%", "Mobilité ADS": "+11%" } },
        { id: "steady90", nom: "Poignée recul mobile (EAM Steady-90)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité accroupi": "+7%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-21%", recul_vertical: "-11%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "caper", nom: "Chargeur rapide (Caper Speed)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-10%" } },
        { id: "fortune", nom: "Chargeur étendu I (Fortune)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "welkin", nom: "Chargeur rapide II (Welkin)", description: "Rechargement tactique plus rapide." },
        { id: "vex", nom: "Chargeur étendu II (Vex Expanse)", description: "+20 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+16%", vitesse_rechargement_ms: "+16%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "spotted", nom: "Poignée Quickdraw (Spotted Agile)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-29%" } },
        { id: "rhinebeck", nom: "Poignée tir-sprint (Rhinebeck)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "vulpine", nom: "Poignée stabilisation (EMT3 Vulpine)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-6%" } },
        { id: "remedy", nom: "Poignée Quickdraw mobile (Remedy Light)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-14%" } },
        { id: "balter", nom: "Poignée précision (Balter Control)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-6%", recul_vertical: "-6%" }, effets_extra: { "Recul 1re balle": "−55%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "radix", nom: "Crosse contrôle (EMT3 Radix)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "orbiter", nom: "Crosse mobilité ADS (Targil Orbiter)", description: "Plus mobile en visée, vise plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+22%" } },
        { id: "cinder", nom: "Crosse tactique légère (Cinder)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-13%" } },
        { id: "f7_howl", nom: "Crosse mobilité (F7-Howl)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+26%" } },
        { id: "malaise", nom: "Crosse anti-flinch (Malaise-64)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+5%" }, effets_extra: { "Flinch": "réduit" } },
        { id: "akimbo", nom: "Akimbo (double Kogot-7)", description: "Double-arme : recul fortement accru, manie/recharge plus lentement, moins de portée.", modificateurs: { sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+5%", gun_kick: "+30%", recul_horizontal: "+30%", recul_vertical: "+30%", portee_m: "-23.1%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tactical_2mw", nom: "Laser tactique (2mW Adaptive)", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser visée stable (Convergence Box)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "strelok_5mw", nom: "Laser Strelok (5mW Lockstep)", description: "Laser de visée (visible)." },
        { id: "instinct_1mw", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "motion_3mw", nom: "Laser stable (3mW Motion Strike)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+15.4%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "Munitions haute vélocité (9x21mm)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+14%" } },
        { id: "buffer", nom: "Ressorts de recul (Buffer Spring)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-6%", recul_horizontal: "-6%", recul_vertical: "-6%" } },
        { id: "fmj", nom: "Munitions FMJ (9x21mm)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+12%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-15.4%" } }
      ]}
    ]
  },
  {
    id: "mpc_25",
    nom: "MPC-25",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG cadence moyenne, bonne maniabilité. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: { degats: 30, portee_m: 30, cadence_cpm: 750, velocite_ms: 520, capacite_chargeur: 30, vitesse_visee_ms: 180, sprint_to_fire_ms: 110, vitesse_rechargement_ms: 2533, gun_kick: 47.25, recul_horizontal: 18.51, recul_vertical: 63.73, mobilite: 5.1 },
    // Accessoires COMPLETS du MPC-25 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "prisma_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." },
        { id: "bowen_ir", nom: "Bowen X-25 IR", description: "Viseur thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "stalker", nom: "Suppresseur K&S Stalker 57-X", description: "Discret (pas d'effet de stat notable)." },
        { id: "ks_brake", nom: "Frein K&S-2B", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "ks_comp", nom: "Compensateur K&S", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.1%", vitesse_visee_ms: "+29%" } },
        { id: "ported", nom: "Compensateur Kühn Ported (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité ADS": "+7%" } },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "razorback", nom: "Canon contrôle maniable (13.1″ Razorback)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%" }, effets_extra: { "Mobilité ADS": "−6%" } },
        { id: "vas_ashe", nom: "Canon long (14.5″ VAS Ashe)", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } },
        { id: "toxin", nom: "Canon moyenne portée (12″ Toxin)", description: "Plus de vélocité, manie un peu moins vite.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+5%", mobilite: "-3%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "hydra", nom: "Canon hybride (10.4″ Hydra)", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "-5%" } },
        { id: "stratus", nom: "Canon contrôle (8.6″ MFS Stratus-X)", description: "Réduit fortement tout le recul.", modificateurs: { gun_kick: "-35%", recul_horizontal: "-35%", recul_vertical: "-35%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "drift_lock", nom: "Poignée contrôle de recul (VAS Drift Lock)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "zero_shift", nom: "Poignée Zero Shift Handstop", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+11%" } },
        { id: "flowguard", nom: "Poignée recul mobile (Flowguard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+8%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-16%", recul_vertical: "-13%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "coachwhip", nom: "Chargeur rapide (Coachwhip)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } },
        { id: "sustain25", nom: "Chargeur étendu I (Sustain-25)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "racer_t", nom: "Chargeur rapide II (Racer-T)", description: "Manie/recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-29%", capacite_chargeur: "-5" } },
        { id: "overload", nom: "Chargeur étendu II (MPC Overload Drum)", description: "+20 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+18%", vitesse_rechargement_ms: "+18%", mobilite: "-5%" }, effets_extra: { "Vitesse sprint": "−8%", "Mobilité ADS": "−6%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickshift", nom: "Poignée Quickdraw (Quickshift)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "torque", nom: "Poignée tir-sprint (Torque Prime)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-38%" } },
        { id: "vassal", nom: "Poignée stabilisation (Vassal)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-13%", vitesse_visee_ms: "+8%" } },
        { id: "photonic", nom: "Poignée Quickdraw mobile (Photonic Adaptive)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "magnate", nom: "Poignée précision (Magnate)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-7%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "medusa", nom: "Crosse contrôle (Medusa)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-18%", recul_horizontal: "-18%", recul_vertical: "-18%", vitesse_visee_ms: "+16%" }, effets_extra: { "Mobilité ADS": "−10%" } },
        { id: "k1_pedal", nom: "Crosse mobilité ADS (K-1 Pedal)", description: "Plus mobile en visée, vise plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "vas_scale", nom: "Crosse tactique légère (VAS Tactical Scale)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } },
        { id: "viper", nom: "Crosse mobilité (Viper Wire)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+27%" } },
        { id: "arid", nom: "Crosse anti-flinch (Arid Full)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+11%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_tac", nom: "Laser tactique (Redwell)", description: "Améliore le tir à la hanche (visible)." },
        { id: "scatterline", nom: "Laser visée stable (EAM ScatterLine)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "swiftpoint", nom: "Laser maniabilité (LTI SwiftPoint)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-18%" } },
        { id: "strelok", nom: "Laser Strelok (VAS Precision Shift)", description: "Laser de visée (visible)." },
        { id: "agile", nom: "Laser stable (EMT3 Agile)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+20%" } },
        { id: "contrabloom", nom: "Laser sans dispersion (ContraBloom)", description: "Plus mobile mais moins de portée.", modificateurs: { mobilite: "+6%", portee_m: "-15%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+4%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "Munitions haute vélocité (5.56x30mm)", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul (Recoil Sync)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-8%", recul_vertical: "-12%" } },
        { id: "fmj", nom: "Munitions FMJ (5.56x30mm)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+15%", portee_m: "-21.4%" } }
      ]}
    ]
  },
  {
    id: "carbon_57",
    nom: "Carbon 57",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG rapide, gros chargeur (40). Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 25, portee_m: 28, cadence_cpm: 857, velocite_ms: 550,
      capacite_chargeur: 40, vitesse_visee_ms: 175, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2560, gun_kick: 43, recul_horizontal: 17.02,
      recul_vertical: 47.86, mobilite: 5.0
    },
    // Accessoires COMPLETS du Carbon 57 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." },
        { id: "target_finder", nom: "LTI Target Finder v.2", description: "Détecteur de cible." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ks_comp", nom: "Compensateur K&S", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "stalker", nom: "Suppresseur K&S Stalker 57-X", description: "Discret (pas d'effet de stat notable)." },
        { id: "ks_brake", nom: "Frein K&S-2B", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-5%", recul_vertical: "-5%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.7%", vitesse_visee_ms: "+28%" } },
        { id: "ported", nom: "Compensateur Kühn Ported (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_radiant", nom: "Canon contrôle maniable (8.5″ VAS Radiant)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-20%" }, effets_extra: { "Mobilité ADS": "−3%" } },
        { id: "orbital", nom: "Canon court (8.6″ Orbital Light)", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-22%", sprint_to_fire_ms: "-31%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "ex3", nom: "Canon moyenne portée (10.2″ EX-3 Heavy)", description: "Plus de vélocité, manie un peu moins vite.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+5%", mobilite: "-4%" }, effets_extra: { "Mobilité ADS": "−5%" } },
        { id: "rockleigh", nom: "Canon long (14″ Rockleigh)", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } },
        { id: "repose", nom: "Canon hybride (11″ Greaves Repose)", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "-5%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "vitalize", nom: "Poignée Vitalize Handstop", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "lateral", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+10%" } },
        { id: "sapper", nom: "Poignée recul mobile (Sapper Guard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+8%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-19%", recul_vertical: "-12%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compact246", nom: "Chargeur rapide (Compact-246)", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-17%" } },
        { id: "fabricator", nom: "Chargeur imprimé 3D (Fabricator)", description: "+5 balles, vise un peu plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+6%", mobilite: "-3%" }, effets_extra: { "Vitesse sprint": "−2%", "Mobilité accroupi": "−5%", "Mobilité ADS": "−4%" } },
        { id: "renown", nom: "Chargeur étendu (MFS Renown Plus)", description: "Réduit le recul, +10 balles et portée, recharge plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-13%", recul_vertical: "-9%", capacite_chargeur: "+10", portee_m: "+21.4%", vitesse_rechargement_ms: "+13%" } },
        { id: "bowen_sideline", nom: "Chargeur étendu II (Bowen Sideline)", description: "+20 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+14%", mobilite: "-5%" }, effets_extra: { "Vitesse sprint": "−2%", "Mobilité ADS": "−6%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bombus", nom: "Poignée Quickdraw mobile (Bombus Quick)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "remus", nom: "Poignée tir-sprint (Remus Sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "dulcet", nom: "Poignée stabilisation (Dulcet Control)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%", vitesse_visee_ms: "+4%" } },
        { id: "puck", nom: "Poignée Quickdraw (Puck-57)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-22%" } },
        { id: "goliath", nom: "Poignée précision (Goliath Steady)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "oberon", nom: "Crosse tactique légère (Oberon Tactical)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-12%" } },
        { id: "heavy_bound", nom: "Crosse contrôle (Heavy Bound)", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-20%", recul_vertical: "-15%", vitesse_visee_ms: "+9%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "graph_aero", nom: "Crosse mobilité (Graph-Aero)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+15%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+26%" } },
        { id: "hammer", nom: "Crosse mobilité ADS (Hammer Platoon Pad)", description: "Plus mobile en visée, vise plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+25%" } },
        { id: "resolute", nom: "Crosse anti-flinch (Bowen Resolute Pad)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%", vitesse_visee_ms: "+7%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_tac", nom: "Laser tactique (Redwell)", description: "Améliore le tir à la hanche (visible)." },
        { id: "scatterline", nom: "Laser visée stable (EAM ScatterLine)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "emt3_agile", nom: "Laser stable (EMT3 Agile)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+21%" } },
        { id: "swiftpoint", nom: "Laser maniabilité (LTI SwiftPoint)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-12%" } },
        { id: "strelok", nom: "Laser Strelok (VAS Precision Shift)", description: "Laser de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ars", nom: "Système de recul accéléré (ARS)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-14%", recul_vertical: "-12%" } },
        { id: "overpressured", nom: "Munitions haute vélocité (5.7x28mm)", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: "Munitions FMJ (5.7x28mm)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "enhanced", nom: "Tir rapide (Enhanced Cycle System)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-23.1%" } }
      ]}
    ]
  },
  {
    id: "sturmwolf_45",
    nom: "Sturmwolf 45",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG .45 cadence basse, faible recul horizontal. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 28, portee_m: 30, cadence_cpm: 645, velocite_ms: 540,
      capacite_chargeur: 32, vitesse_visee_ms: 170, sprint_to_fire_ms: 130,
      vitesse_rechargement_ms: 2184, gun_kick: 40.99, recul_horizontal: 10.49,
      recul_vertical: 42.28, mobilite: 5.0
    },
    // Accessoires COMPLETS du Sturmwolf 45 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Discret (pas d'effet de stat notable)." },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Stabilise sans effet de stat chiffré." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+9.1%", vitesse_visee_ms: "+25%" } },
        { id: "hawker_hybrid", nom: "Compensateur Hawker Hybrid .45 (mobilité)", description: "Améliore les transitions de tir (glissade/plongeon)." },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-9.1%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ascendancy", nom: "Canon court (11.5″ LTI Ascendancy)", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-35%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "perigee", nom: "Canon long (14.8″ Perigee)", description: "Gagne en dégâts à distance (pas de stat chiffrée ici)." },
        { id: "regnant", nom: "Canon moyenne portée (15″ Regnant)", description: "Améliore les dégâts mais recul de base nettement accru.", modificateurs: { gun_kick: "+29%", recul_horizontal: "+15%", recul_vertical: "+30%" } },
        { id: "piston_mosaic", nom: "Canon contrôle maniable (13.2″ Piston Mosaic)", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+50%" } },
        { id: "conflux", nom: "Canon hybride (12.3″ Lethal Conflux)", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "zero_shift", nom: "Poignée Zero Shift Handstop", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+11%" } },
        { id: "envoy", nom: "Poignée recul mobile (Envoy)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité accroupi": "+8%" } },
        { id: "lateral", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-35%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-7%", recul_vertical: "-14%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_upend", nom: "Chargeur Flip (LTI Upend)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } },
        { id: "locus", nom: "Chargeur étendu I (Locus)", description: "+16 balles.", modificateurs: { capacite_chargeur: "+16" } },
        { id: "b45_drum", nom: "Chargeur étendu II (B-45 Roar Drum)", description: "+28 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+28", vitesse_visee_ms: "+9%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+26%" } },
        { id: "tigris", nom: "Chargeur .40 Cal (MFS Tigris)", description: "Manie/recharge plus vite mais recul fortement accru, moins de vélocité/cadence.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-7%", vitesse_rechargement_ms: "-29%", velocite_ms: "-20%", cadence_cpm: "-10%", gun_kick: "+63%", recul_horizontal: "+53%", recul_vertical: "+62%", capacite_chargeur: "-2" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_pelage", nom: "Poignée tir-sprint (LTI Pelage)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "sanctum", nom: "Poignée Quickdraw (Sanctum Speed)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-30%" } },
        { id: "motley", nom: "Poignée stabilisation (Motley Light)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "aspire", nom: "Poignée précision (Aspire Comfort)", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "selene", nom: "Poignée Quickdraw mobile (Selene Rover)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mink", nom: "Crosse contrôle (Mink Stability)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-17%", recul_horizontal: "-17%", recul_vertical: "-17%" } },
        { id: "corpus", nom: "Crosse mobilité ADS (Corpus-x3)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+19%" } },
        { id: "satellite", nom: "Crosse tactique légère (Satellite Skeleton)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } },
        { id: "itinerant", nom: "Crosse mobilité (Itinerant Light)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+27%" } },
        { id: "lti_pride", nom: "Crosse anti-flinch (LTI Pride)", description: "Réduit le flinch, plus mobile en visée.", effets_extra: { "Mobilité ADS": "+10%", "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scatterline", nom: "Laser visée stable (EAM ScatterLine)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "emt3_agile", nom: "Laser stable (EMT3 Agile)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+27.3%" } },
        { id: "redwell_tac", nom: "Laser tactique (Redwell)", description: "Améliore le tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok (VAS Precision Shift)", description: "Laser de visée (visible)." },
        { id: "swiftpoint", nom: "Laser maniabilité (LTI SwiftPoint)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-13%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "recoil_spring", nom: "Ressorts de recul (Recoil Spring Assembly)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "overpressured", nom: "Munitions haute vélocité (.45 Cal)", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "fmj", nom: "Munitions FMJ (.45 Cal)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+11%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-9.1%" } }
      ]}
    ]
  },
  {
    id: "ryden_45k",
    nom: "Ryden 45K",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG très rapide (923 RPM), maniabilité excellente. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 24, portee_m: 27, cadence_cpm: 923, velocite_ms: 530,
      capacite_chargeur: 30, vitesse_visee_ms: 160, sprint_to_fire_ms: 110,
      vitesse_rechargement_ms: 2346, gun_kick: 32.01, recul_horizontal: 8.63,
      recul_vertical: 45.77, mobilite: 5.0
    },
    // Accessoires COMPLETS du Ryden 45K (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_reflex", nom: "LTI Reflex", description: "Point rouge ouvert." },
        { id: "prisma_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." },
        { id: "kepler", nom: "Kepler T-Range Holo", description: "Viseur holographique télémétrique." },
        { id: "vas_duo", nom: "VAS Duo Hybrid Sight", description: "Viseur hybride." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Discret (pas d'effet de stat notable)." },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-7%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.7%", vitesse_visee_ms: "+30%" } },
        { id: "hawker_hybrid", nom: "Compensateur Hawker Hybrid .45 (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rauch", nom: "Canon contrôle maniable (11″ Rauch 6L-R)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-16%" }, effets_extra: { "Mobilité ADS": "−3%" } },
        { id: "basilisk", nom: "Canon court (9″ Basilisk)", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-14%", sprint_to_fire_ms: "-25%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "vienna", nom: "Canon long (12″ Vienna)", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } },
        { id: "whiptail", nom: "Canon hybride (10.5″ Greaves Whiptail)", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+5%" } },
        { id: "slim_mod", nom: "Canon moyenne portée (10.5″ Slim-Mod)", description: "Plus de vélocité, manie un peu moins vite.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+5%", mobilite: "-4%" }, effets_extra: { "Mobilité ADS": "−4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée focus (Respire Handstop)", description: "Stabilise en visée focalisée." },
        { id: "lateral", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-25%" } },
        { id: "lightpath", nom: "Poignée mobilité (EAM Lightpath)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+11%" } },
        { id: "flowguard", nom: "Poignée recul mobile (Flowguard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+8%" } },
        { id: "vitalize", nom: "Poignée Vitalize Handstop", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-8%", recul_vertical: "-15%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fraternity", nom: "Chargeur Flip (Fraternity)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-19%" } },
        { id: "torch", nom: "Chargeur étendu I (Torch)", description: "Plus de capacité.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "breakpoint", nom: "Chargeur rapide (Breakpoint)", description: "Manie/recharge plus vite, −3 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-7%", vitesse_rechargement_ms: "-33%", capacite_chargeur: "-3" } },
        { id: "forward_breach", nom: "Chargeur étendu II (Forward Breach)", description: "+20 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+14%", vitesse_rechargement_ms: "+17%", mobilite: "-5%" }, effets_extra: { "Vitesse sprint": "−2%", "Mobilité ADS": "−6%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lennox", nom: "Poignée tir-sprint (Lennox)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-32%" } },
        { id: "excess", nom: "Poignée Quickdraw (Excess)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "skeletonized", nom: "Poignée stabilisation (Skeletonized)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-26%", vitesse_visee_ms: "+4%" } },
        { id: "eruption", nom: "Poignée Quickdraw mobile (Eruption)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-19%" } },
        { id: "bounty", nom: "Poignée précision (Bounty)", description: "Réduit le recul vertical, 1re balle très contrôlée.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" }, effets_extra: { "Recul 1re balle": "−63%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ventral", nom: "Crosse mobilité ADS (Ventral)", description: "Plus mobile en visée, vise plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+22%" } },
        { id: "vas_interlock", nom: "Crosse contrôle (VAS Interlock)", description: "Réduit fortement tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+9%" }, effets_extra: { "Mobilité ADS": "−4%" } },
        { id: "ske02", nom: "Crosse anti-flinch (SKE-02)", description: "Réduit le recul et le flinch, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-15%", recul_vertical: "-10%", vitesse_visee_ms: "+6%", sprint_to_fire_ms: "+5%" }, effets_extra: { "Flinch": "réduit" } },
        { id: "collapsible", nom: "Crosse mobilité (Collapsible)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+28%" } },
        { id: "mfs_full", nom: "Crosse saut tactique (MFS Full Stock+)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+10%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_tac", nom: "Laser tactique (Redwell)", description: "Améliore le tir à la hanche (visible)." },
        { id: "scatterline", nom: "Laser visée stable (EAM ScatterLine)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok (VAS Precision Shift)", description: "Laser de visée (visible)." },
        { id: "swiftpoint", nom: "Laser maniabilité (LTI SwiftPoint)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-14%" } },
        { id: "emt3_agile", nom: "Laser stable (EMT3 Agile)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+19%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "Munitions haute vélocité (.45 Cal)", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "sync_recul", nom: "Unité de synchro recul (Recoil Sync)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-15%", recul_vertical: "-8%" } },
        { id: "fmj", nom: "Munitions FMJ (.45 Cal)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-23.1%" } },
        { id: "apex", nom: "Rig Apex Sweeper (cadence réduite)", description: "Cadence fortement réduite et léger recul/mobilité en moins (kit spécial).", modificateurs: { cadence_cpm: "-53%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%", mobilite: "-5%" } }
      ]}
    ]
  },
  {
    id: "rk_9",
    nom: "RK-9",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG cadence basse, gros dégâts mais recul élevé. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 30, portee_m: 32, cadence_cpm: 570, velocite_ms: 620,
      capacite_chargeur: 30, vitesse_visee_ms: 165, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2293, gun_kick: 52.65, recul_horizontal: 25.53,
      recul_vertical: 49.82, mobilite: 5.2
    },
    // Accessoires COMPLETS du RK-9 (liste exhaustive, source codmunity.gg Warzone).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_microflex", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "greaves_dot", nom: "Greaves Red Dot", description: "Point rouge ouvert." },
        { id: "eam_dyad", nom: "EAM Dyad xL", description: "Viseur hybride." },
        { id: "solaris_ir", nom: "Solaris Holo-IR", description: "Optique thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Discret (pas d'effet de stat notable)." },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical, 1re balle contrôlée.", modificateurs: { gun_kick: "-5%", recul_vertical: "-5%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-18%", recul_vertical: "-18%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+5.9%", vitesse_visee_ms: "+28%" } },
        { id: "hawker_hybrid", nom: "Compensateur Hawker Hybrid .45 (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité ADS": "+5%" } },
        { id: "stentorian", nom: "Frein Stentorian LTI", description: "Frein de bouche (Passe de combat S4)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tethys", nom: "Canon contrôle maniable (12.4″ VAS Tethys)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%" }, effets_extra: { "Mobilité ADS": "−6%" } },
        { id: "mercurial", nom: "Canon long (13.6″ Mercurial)", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } },
        { id: "eam_hollow", nom: "Canon court (8.7″ EAM Hollow)", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-38%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "cerium", nom: "Canon hybride (9.9″ Bowen Cerium)", description: "Canon hybride (pas d'effet de stat chiffré)." },
        { id: "blackstar", nom: "Canon moyenne portée (11.3″ Blackstar)", description: "Plus de vélocité, manie un peu moins vite.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+4%", mobilite: "-3%" }, effets_extra: { "Mobilité ADS": "−4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickstep", nom: "Poignée mobilité (Quickstep)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+7%", "Mobilité ADS": "+11%" } },
        { id: "lateral", nom: "Poignée contrôle de recul (Lateral Precision)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "envoy", nom: "Poignée recul mobile (Envoy)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+7%" } },
        { id: "zero_shift", nom: "Poignée Zero Shift Handstop", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "vas_conv", nom: "Poignée déviation (VAS Convergence)", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-38%", recul_vertical: "-8%" } },
        { id: "ironlung", nom: "Poignée stable rapide (MFS Ironlung)", description: "Cadence accrue et recul fortement réduit.", modificateurs: { cadence_cpm: "+28%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "alliance", nom: "Chargeur étendu I (Alliance)", description: "+12 balles.", modificateurs: { capacite_chargeur: "+12" } },
        { id: "silverline", nom: "Chargeur Flip (Silverline)", description: "Recharge bien plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-28%", capacite_chargeur: "+5" } },
        { id: "compact_void", nom: "Chargeur rapide (Compact Void)", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-42%" } },
        { id: "ascot_drum", nom: "Chargeur étendu II (Ascot Drum)", description: "+27 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+27", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+17%", vitesse_rechargement_ms: "+12%", mobilite: "-4%" }, effets_extra: { "Vitesse sprint": "−2%", "Mobilité ADS": "−6%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lotus", nom: "Poignée Quickdraw (Lotus Draw)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-33%" } },
        { id: "skeleton_606", nom: "Poignée tir-sprint (606-T Skeleton)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-35%" } },
        { id: "raft_ready", nom: "Poignée Quickdraw mobile (Raft Ready)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-18%" } },
        { id: "vega", nom: "Poignée stabilisation (Vega Precision)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-12%", vitesse_visee_ms: "+8%" } },
        { id: "nanopulse", nom: "Poignée précision (Nanopulse)", description: "Réduit le recul vertical, 1re balle très contrôlée.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−62%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "nightfall", nom: "Crosse mobilité (Nightfall Rapid)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+29%" } },
        { id: "vas_conduit", nom: "Crosse contrôle (VAS Conduit)", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%", vitesse_visee_ms: "+15%" }, effets_extra: { "Mobilité ADS": "−12%" } },
        { id: "vectra", nom: "Crosse tactique légère (Vectra Tactical)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } },
        { id: "lontra", nom: "Crosse mobilité ADS (Lontra Step)", description: "Plus mobile en visée, vise plus vite.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "vq45", nom: "Crosse anti-flinch (VQ-45 Harpy)", description: "Réduit un peu le recul et le flinch, vise plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+10%" }, effets_extra: { "Flinch": "réduit" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scatterline", nom: "Laser visée stable (EAM ScatterLine)", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "redwell_tac", nom: "Laser tactique (Redwell)", description: "Améliore le tir à la hanche (visible)." },
        { id: "strelok", nom: "Laser Strelok (VAS Precision Shift)", description: "Laser de visée (visible)." },
        { id: "emt3_agile", nom: "Laser stable (EMT3 Agile)", description: "Plus de portée du tir à la hanche.", modificateurs: { portee_m: "+17%" } },
        { id: "swiftpoint", nom: "Laser maniabilité (LTI SwiftPoint)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-17%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "Munitions haute vélocité (9mm Parabellum)", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ars", nom: "Système de recul accéléré (ARS)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "Munitions FMJ (9mm Parabellum)", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "enhanced_cycle", nom: "Tir rapide (Enhanced Cycle System)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-10%", gun_kick: "+10%", recul_horizontal: "+12%", recul_vertical: "+10%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "dravec_45",
    nom: "Dravec 45",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Dravec 45 (liste exhaustive, source codmunity.gg Warzone). Pas d'emplacement sous-canon.
    stats_base: { degats: 26, portee_m: 30, cadence_cpm: 652, velocite_ms: 610, capacite_chargeur: 36, vitesse_visee_ms: 235, sprint_to_fire_ms: 170, vitesse_rechargement_ms: 2600, gun_kick: 45.26, recul_horizontal: 24.29, recul_vertical: 48.14, mobilite: 4.8 },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge reflex." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette grossissement 4x." },
        { id: "mm_scanner", nom: "Millimeter Scanner", description: "Détecte les ennemis proches." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" } },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Tir silencieux." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+8.3%", vitesse_visee_ms: "+26%" } },
        { id: "hawker_hybrid", nom: "Hawker Hybrid .45", description: "Plus mobile.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "jetstream", nom: "Canon 18\" Jetstream", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%" }, effets_extra: { "Mobilité ADS": "-6%" } },
        { id: "eam_horizon", nom: "Canon long 19\" EAM Horizon", description: "Vise un peu plus lentement, moins mobile en visée.", modificateurs: { vitesse_visee_ms: "+7%" }, effets_extra: { "Mobilité ADS": "-8%" } },
        { id: "cloud", nom: "Canon court 12\" Cloud", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-17%", sprint_to_fire_ms: "-26%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "predator", nom: "Canon moyen 16.5\" Predator", description: "Plus de vélocité, un peu moins mobile.", modificateurs: { velocite_ms: "+20%", sprint_to_fire_ms: "+5%", mobilite: "-4%" }, effets_extra: { "Vitesse sprint": "-3%", "Mobilité ADS": "-4%" } },
        { id: "verse", nom: "Canon hybride 14\" Verse", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+5%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "frontgate", nom: "Chargeur rapide FrontGate", description: "Manie/recharge plus vite, -6 balles.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-8%", capacite_chargeur: "-6" } },
        { id: "gator", nom: "Chargeur Gator étendu", description: "+12 balles.", modificateurs: { capacite_chargeur: "+12" } },
        { id: "lockjaw", nom: "Chargeur Lockjaw étendu", description: "+24 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+24", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+17%", mobilite: "-5%" }, effets_extra: { "Vitesse sprint": "-2%", "Mobilité ADS": "-6%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quikarm", nom: "Poignée QuikArm", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-26%" } },
        { id: "helix_tac", nom: "Poignée Helix-Tac", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-24%" } },
        { id: "vantix8", nom: "Poignée Vantix-8", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "delta_axis", nom: "Poignée Delta Axis", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-18%", vitesse_visee_ms: "+4%" } },
        { id: "herald_z1", nom: "Poignée Herald-Z1", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "endurance", nom: "Crosse Endurance LD-6", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-17%", recul_vertical: "-13%", vitesse_visee_ms: "+14%" }, effets_extra: { "Mobilité ADS": "-13%" } },
        { id: "serval", nom: "Crosse Serval Q-Step", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+19%" } },
        { id: "heritage", nom: "Crosse EAM Heritage", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+27%" } },
        { id: "converge", nom: "Crosse Converge Tactical", description: "Manie plus vite, tir après sprint plus rapide.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } },
        { id: "defiant45", nom: "Crosse Defiant-45 Skeletal", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%", vitesse_visee_ms: "+10%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_scatter", nom: "Laser EAM ScatterLine", description: "Précision tir à la hanche (visible)." },
        { id: "redwell_tac", nom: "Laser Redwell Tactical", description: "Précision tir à la hanche (visible)." },
        { id: "vas_shift", nom: "Laser VAS Precision Shift", description: "Précision tir à la hanche (visible)." },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-9%" } },
        { id: "mfs_agile", nom: "Laser MFS Agile Pro", description: "Manie plus vite et plus mobile, mais recul accru (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-9%", mobilite: "+9%", portee_m: "+8.3%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+15%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+10%", "Mobilité ADS": "+9%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-16.7%" } },
        { id: "overpressured", nom: ".45 Cal Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "fmj", nom: ".45 Cal FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } }
      ]}
    ]
  },
  {
    id: "vst",
    nom: "VST",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du VST (liste exhaustive, source codmunity.gg Warzone). SMG cadence extrême (1091 RPM).
    stats_base: {
      degats: 22, portee_m: 25, cadence_cpm: 1091, velocite_ms: 520,
      capacite_chargeur: 30, vitesse_visee_ms: 155, sprint_to_fire_ms: 100,
      vitesse_rechargement_ms: 2184, gun_kick: 34.84, recul_horizontal: 9.9,
      recul_vertical: 46.04, mobilite: 5.3
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_microflex", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "greaves_dot", nom: "Greaves Red Dot", description: "Point rouge ouvert." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Tir silencieux." },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-12%", recul_vertical: "-13%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "hawker_hybrid", nom: "Hawker Hybrid .45", description: "Améliore le tir en glissade/saut." },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-28%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+8.7%", vitesse_visee_ms: "+29%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-11%", recul_vertical: "-15%", velocite_ms: "-13%", portee_m: "-8.7%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "enmity", nom: "Canon court 9.7\" Enmity", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-11%", sprint_to_fire_ms: "-23%" } },
        { id: "hawker_broach", nom: "Canon 12.5\" Hawker Broach", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+50%" } },
        { id: "ursine", nom: "Canon moyen 11\" Ursine", description: "Plus de portée effective mais recul fortement accru.", modificateurs: { gun_kick: "+44%", recul_horizontal: "+20%", recul_vertical: "+45%" } },
        { id: "bowen_conquer", nom: "Canon hybride 10.5\" Bowen Conquer", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+30%", portee_m: "+17.4%" } },
        { id: "lti_expedition", nom: "Canon long 14\" LTI Expedition", description: "Forte hausse de portée.", modificateurs: { portee_m: "+34.8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée Respire", description: "Stabilité en visée (pas d'effet de stat notable)." },
        { id: "vitalize", nom: "Poignée Vitalize", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "lightpath", nom: "Poignée EAM Lightpath", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+7%", "Mobilité ADS": "+11%" } },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit énormément le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-35%" } },
        { id: "eam_steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal, plus mobile.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-15%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité accroupi": "+7%" } },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit le recul et la 1re balle.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-16%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−35%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "divest", nom: "Chargeur rapide Divest", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-15%", vitesse_rechargement_ms: "-18%" } },
        { id: "amplify", nom: "Chargeur Amplify étendu I", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "avarice", nom: "Chargeur Avarice étendu II", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+9%", vitesse_rechargement_ms: "+18%" } },
        { id: "mfs_kodiak", nom: "Chargeur MFS Kodiak étendu", description: "+10 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+9%" } },
        { id: "mfs_glacial", nom: "Chargeur MFS Glacial étendu", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+13%", sprint_to_fire_ms: "+23%", vitesse_rechargement_ms: "+18%" } },
        { id: "mfs_sol", nom: "Chargeur rapide MFS Sol", description: "Manie/recharge plus vite, -5 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-18%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "solace", nom: "Poignée Solace Quick Aim", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-34%" } },
        { id: "vas_sustenance", nom: "Poignée VAS Sustenance", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "pillion", nom: "Poignée Pillion Ready", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-38%" } },
        { id: "lti_coalesce", nom: "Poignée LTI Coalesce", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-18%" } },
        { id: "quiver", nom: "Poignée Quiver Control", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_blench", nom: "Crosse VAS Blench", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-17%", recul_horizontal: "-17%", recul_vertical: "-17%" } },
        { id: "hawker_cub55", nom: "Crosse Hawker Cub-55", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+25%" } },
        { id: "suffuse", nom: "Crosse Suffuse Tactical", description: "Manie plus vite, tir après sprint plus rapide.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-12%" } },
        { id: "lti_stern", nom: "Crosse LTI Stern Aim", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+18%" } },
        { id: "clench01", nom: "Crosse Clench-01", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+10%" } },
        { id: "akimbo", nom: "Akimbo VST (double)", description: "Double maniement : pas de visée, mobilité hanche, mais recul et tir accrus.", modificateurs: { sprint_to_fire_ms: "+27%", vitesse_rechargement_ms: "+16%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+15%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_shift", nom: "Laser VAS Precision Shift", description: "Précision tir à la hanche (visible)." },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Précision tir à la hanche (visible)." },
        { id: "eam_scatter", nom: "Laser EAM ScatterLine", description: "Précision tir à la hanche (visible)." },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Précision tir à la hanche (visible)." },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite, plus de portée (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-18%", portee_m: "+21.7%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "9mm Parabellum FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+12%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%" } },
        { id: "overpressured", nom: "9mm Parabellum Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "mfs_defense", nom: "Conversion MFS 5.56M Defense", description: "Plus de vélocité, moins de recul, mais cadence et mobilité réduites.", modificateurs: { velocite_ms: "+21%", gun_kick: "-10%", recul_horizontal: "-20%", recul_vertical: "-10%", vitesse_visee_ms: "+16%", sprint_to_fire_ms: "+23%", cadence_cpm: "-16%", mobilite: "-7%" }, effets_extra: { "Vitesse sprint": "-3%", "Mobilité accroupi": "-3%", "Mobilité ADS": "-7%" } }
      ]}
    ]
  },
  {
    id: "razor_9mm",
    nom: "Razor 9mm",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Razor 9mm (liste exhaustive, source codmunity.gg Warzone). SMG rapide (1000 RPM).
    stats_base: {
      degats: 23, portee_m: 26, cadence_cpm: 1000, velocite_ms: 500,
      capacite_chargeur: 30, vitesse_visee_ms: 175, sprint_to_fire_ms: 110,
      vitesse_rechargement_ms: 2208, gun_kick: 23.16, recul_horizontal: 15.48,
      recul_vertical: 46.06, mobilite: 5.1
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_xl", nom: "EAM xL Reflex", description: "Point rouge ouvert." },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "eam_dual", nom: "EAM Dual Zoom", description: "Lunette à double grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "h9mm_comp", nom: "Compensateur H-9mm Precision", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen 9mm", description: "Tir silencieux." },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-5%", recul_vertical: "-5%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+8.3%", vitesse_visee_ms: "+31%" } },
        { id: "hawker_ported", nom: "Compensateur Hawker Ported", description: "Plus mobile.", modificateurs: { mobilite: "+5%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité ADS": "+5%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "heron", nom: "Canon court 9\" Heron", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-19%", sprint_to_fire_ms: "-28%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+2%" } },
        { id: "rl_genesys", nom: "Canon long 13\" RL-Genesys", description: "Vise un peu plus lentement, moins mobile en visée.", modificateurs: { vitesse_visee_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-8%" } },
        { id: "razor_impact", nom: "Canon moyen 10\" Razor Impact", description: "Plus de vélocité, un peu moins mobile.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+4%", mobilite: "-4%" }, effets_extra: { "Vitesse sprint": "-3%", "Mobilité ADS": "-4%" } },
        { id: "synthesis", nom: "Canon hybride 9.5\" Synthesis", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+6%" } },
        { id: "sidewinder", nom: "Canon 12\" MFS Sidewinder", description: "Forte vélocité et recul réduit, mais vise plus lentement.", modificateurs: { velocite_ms: "+60%", gun_kick: "-50%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+9%", sprint_to_fire_ms: "+13%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée Respire", description: "Stabilité en visée (pas d'effet de stat notable)." },
        { id: "vitalize", nom: "Poignée Vitalize", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "lightpath", nom: "Poignée EAM Lightpath", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+10%" } },
        { id: "eam_steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal, plus mobile.", modificateurs: { recul_horizontal: "-10%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+8%" } },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit énormément le recul horizontal.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-42%", recul_vertical: "-11%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawkline", nom: "Chargeur rapide Hawkline I", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } },
        { id: "strikeface", nom: "Chargeur Strikeface étendu I", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "bolt_strike", nom: "Chargeur rapide Bolt Strike II", description: "Recharge plus vite (Fast Mag II)." },
        { id: "zealot", nom: "Chargeur Zealot étendu II", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+21%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "readiflex", nom: "Poignée ReadiFlex", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-26%" } },
        { id: "pushback", nom: "Poignée EAM Pushback", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-16%", vitesse_visee_ms: "+4%" } },
        { id: "haste", nom: "Poignée Haste Ribbed", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-31%" } },
        { id: "vice", nom: "Poignée Vice", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-17%", recul_vertical: "-17%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "microdot", nom: "Poignée Microdot Recovery", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-15%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rwl", nom: "Crosse RWL Stability", description: "Réduit l'ensemble du recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+5%" }, effets_extra: { "Mobilité ADS": "-6%" } },
        { id: "talos", nom: "Crosse Talos", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-15%" }, effets_extra: { "Mobilité ADS": "+20%" } },
        { id: "constrictor", nom: "Crosse Constrictor", description: "Manie plus vite, tir après sprint plus rapide.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-13%" } },
        { id: "renegade", nom: "Crosse Renegade", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%", vitesse_visee_ms: "+11%" } },
        { id: "serpent", nom: "Crosse Serpent", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+27%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scatterline", nom: "Laser EAM ScatterLine", description: "Précision tir à la hanche (visible)." },
        { id: "vas_shift", nom: "Laser VAS Precision Shift", description: "Précision tir à la hanche (visible)." },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Plus de portée (visible).", modificateurs: { portee_m: "+20%" } },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Précision tir à la hanche (visible)." },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-13%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "9mm Parabellum Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "9mm Parabellum FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-16.7%" } },
        { id: "wildfire", nom: "Kit Wildfire Razor 9mm", description: "Cadence et vélocité explosives, gros chargeur, mais recharge plus lente.", modificateurs: { velocite_ms: "+36%", cadence_cpm: "+50%", capacite_chargeur: "+55", vitesse_rechargement_ms: "+56%" } }
      ]}
    ]
  },
  {
    id: "rev_46",
    nom: "REV-46",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du REV-46 (liste exhaustive, source codmunity.gg Warzone). SMG cadence extrême (1154 RPM).
    stats_base: { degats: 17, portee_m: 27, cadence_cpm: 1111, velocite_ms: 540, capacite_chargeur: 35, vitesse_visee_ms: 190, sprint_to_fire_ms: 120, vitesse_rechargement_ms: 2900, gun_kick: 37.67, recul_horizontal: 6.34, recul_vertical: 48.13, mobilite: 5.1 },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "fang_elo", nom: "FANG HoverPoint ELO", description: "Viseur holographique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15.4%" } },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Compensateur de base." },
        { id: "hawker_hybrid", nom: "Hawker Hybrid .45", description: "Améliore le tir en glissade/saut." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.7%", vitesse_visee_ms: "+29%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, un peu moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-5%", portee_m: "-5%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dorsal", nom: "Canon 13\" LTI Dorsal", description: "Manie plus vite, un peu moins mobile en visée.", modificateurs: { vitesse_visee_ms: "-9%" }, effets_extra: { "Mobilité ADS": "-5%" } },
        { id: "caudal", nom: "Canon long 14.9\" Caudal Target", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+9%" } },
        { id: "tokay", nom: "Canon dégâts 11.7\" Tokay Hunter", description: "Plus de dégâts mais un peu moins mobile, vise plus lentement.", modificateurs: { vitesse_visee_ms: "+5%", mobilite: "-3%" }, effets_extra: { "Vitesse sprint": "-3%", "Mobilité ADS": "-4%" } },
        { id: "banded", nom: "Canon hybride 12\" Banded Mix", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+6%" } },
        { id: "anolis", nom: "Canon court 9.6\" Redwell Anolis", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-20%", sprint_to_fire_ms: "-43%", mobilite: "+6%" }, effets_extra: { "Vitesse sprint": "+2%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "respire", nom: "Poignée Respire", description: "Stabilité en visée (pas d'effet de stat notable)." },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-30%" } },
        { id: "sapper", nom: "Poignée Sapper Guard", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité accroupi": "+7%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+10%" }, effets_extra: { "Mobilité accroupi": "+7%", "Mobilité ADS": "+12%" } },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit le recul vertical mais augmente l'horizontal.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%", recul_horizontal: "+13%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "janus", nom: "Chargeur Flip Janus (35)", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } },
        { id: "cawdor", nom: "Chargeur Cawdor étendu (45)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "redwell_dime", nom: "Chargeur rapide Redwell Dime (30)", description: "Manie plus vite, recharge bien plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%", capacite_chargeur: "+1" } },
        { id: "komodo", nom: "Tambour Komodo (55)", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+17%", vitesse_rechargement_ms: "+18%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "abt91b", nom: "Poignée ABT-91B", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-37%" } },
        { id: "lti_integrity", nom: "Poignée LTI Integrity", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "refrain", nom: "Poignée Refrain Sketch", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "alpine", nom: "Poignée Alpine-Bare", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "traversal", nom: "Poignée Traversal", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mfs_reforge", nom: "Crosse MFS Reforge Flip", description: "Crosse repliable (maniabilité)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scatterline", nom: "Laser EAM ScatterLine", description: "Précision tir à la hanche (visible)." },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Précision tir à la hanche (visible)." },
        { id: "vas_shift", nom: "Laser VAS Precision Shift", description: "Précision tir à la hanche (visible)." },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Plus de portée (visible).", modificateurs: { portee_m: "+23.1%" } },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-17%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "4.6x30mm Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+15%", velocite_ms: "-13%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+10%", portee_m: "-7.7%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "4.6x30mm FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } }
      ]}
    ]
  },
  {
    id: "mk78",
    nom: "MK.78",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du MK.78 (liste exhaustive, source codmunity.gg Warzone). FM dominant de la méta.
    stats_base: { degats: 31, portee_m: 43, cadence_cpm: 480, velocite_ms: 800, capacite_chargeur: 75, vitesse_visee_ms: 440, sprint_to_fire_ms: 250, vitesse_rechargement_ms: 6340, gun_kick: 16.99, recul_horizontal: 13.93, recul_vertical: 49.5, mobilite: 4.4 },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge reflex." },
        { id: "lti_reflex", nom: "LTI Reflex", description: "Point rouge ouvert." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "kepler_trange", nom: "Kepler T-Range Holo", description: "Holo avec télémètre." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." },
        { id: "prismatech_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." },
        { id: "greaves_ultra", nom: "Greaves Ultra Zoom", description: "Lunette à grossissement variable." },
        { id: "vas_duo", nom: "VAS Duo Hybrid Sight", description: "Viseur hybride." },
        { id: "lti_target", nom: "LTI Target Finder v.2", description: "Détecteur de cible." },
        { id: "circuit_z", nom: "Circuit-Z Rangefinder", description: "Lunette télémètre." },
        { id: "bowen_ir", nom: "Bowen X-25 IR", description: "Viseur thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Tir silencieux, un peu plus de portée.", modificateurs: { portee_m: "+8%" } },
        { id: "bowen_mod", nom: "Frein Bowen Modulator 7.62", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7%", vitesse_visee_ms: "+19%" } },
        { id: "titan_r", nom: "Compensateur Titan-R 7.62", description: "Améliore le tir en glissade/saut." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mach78", nom: "Canon moyen 20\" Mach-78", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "bowen_moon", nom: "Canon long 17\" Bowen Moon", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "skylance", nom: "Canon court 15\" Skylance", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-4%" } },
        { id: "titan_hybrid", nom: "Canon hybride 18.5\" Titan", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "impulse_hb", nom: "Canon contrôle 22\" Impulse HB-762", description: "Plus de vélocité et recul fortement réduit, mais vise plus lentement.", modificateurs: { velocite_ms: "+20%", gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+12%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-12%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "enhance32", nom: "Poignée Enhance-32", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "parallel", nom: "Poignée Parallel", description: "Manie plus vite mais recul vertical accru.", modificateurs: { vitesse_visee_ms: "-13%", gun_kick: "+14%", recul_vertical: "+14%" }, effets_extra: { "Mobilité ADS": "+21%" } },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "bowen_sentry", nom: "Poignée Bowen Sentry", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+11%", "Mobilité ADS": "+11%" } },
        { id: "eam_steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal, plus mobile.", modificateurs: { recul_horizontal: "-8%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+11%" } },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit fortement l'ensemble du recul.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-26%", recul_vertical: "-16%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swift_belt", nom: "Bande rapide Swift Feed", description: "Manie/recharge plus vite, -10 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-12%", capacite_chargeur: "-10" } },
        { id: "gravepack", nom: "Bande Gravepack étendue", description: "+25 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+25", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+8%" } },
        { id: "payload", nom: "Extension de bande Payload", description: "+75 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+75", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+9%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "trailblaze", nom: "Poignée Trailblaze", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } },
        { id: "bowen_thrust", nom: "Poignée Bowen Thrust", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-22%" } },
        { id: "lti_precision", nom: "Poignée LTI Precision", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-22%", vitesse_visee_ms: "+6%" } },
        { id: "fleet_g2", nom: "Poignée Fleet-G2", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "hades_looper", nom: "Poignée Hades Looper-X", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-9%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "shock_shield", nom: "Crosse Shock Shield", description: "Réduit fortement l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+10%" }, effets_extra: { "Mobilité ADS": "-18%" } },
        { id: "charon", nom: "Crosse Charon Light", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+19%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+41%" } },
        { id: "scatter", nom: "Crosse Scatter Skeletal", description: "Manie plus vite, tir après sprint plus rapide.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-10%" } },
        { id: "bowen_light", nom: "Crosse Bowen Light", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-7%" }, effets_extra: { "Mobilité ADS": "+21%" } },
        { id: "swiftguard", nom: "Crosse SwiftGuard", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+7%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-8%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+12%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-20%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "7.62 NATO FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+15%" } }
      ]}
    ]
  },
  {
    id: "xm325",
    nom: "XM325",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du XM325 (liste exhaustive, source codmunity.gg Warzone). FM cadence élevée (1000 RPM).
    stats_base: {
      degats: 28, portee_m: 55, cadence_cpm: 1000, velocite_ms: 920,
      capacite_chargeur: 60, vitesse_visee_ms: 245, sprint_to_fire_ms: 220,
      vitesse_rechargement_ms: 4586, gun_kick: 14.9, recul_horizontal: 7.37,
      recul_vertical: 36.52, mobilite: 4.6
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "kepler_pro", nom: "Kepler-Pro Red Dot", description: "Point rouge reflex." },
        { id: "prismatech_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette grossissement 4x." },
        { id: "mm_scanner", nom: "Millimeter Scanner", description: "Détecte les ennemis proches." },
        { id: "eam_dyad", nom: "EAM Dyad xL", description: "Viseur hybride." },
        { id: "kepler_wvt", nom: "Kepler Custom WVT-08", description: "Lunette à grossissement variable." },
        { id: "solaris_ir", nom: "Solaris Holo-IR", description: "Holographique thermique." },
        { id: "eam_dual", nom: "EAM Dual Zoom", description: "Lunette à double grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Tir silencieux, un peu plus de portée.", modificateurs: { portee_m: "+8%" } },
        { id: "titan_r", nom: "Compensateur Titan-R 7.62", description: "Améliore le tir en glissade/saut." },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-29%", recul_vertical: "-30%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+8.9%", vitesse_visee_ms: "+20%" } },
        { id: "redwell_brake", nom: "Frein Redwell 7.62", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fractal_lrb", nom: "Canon long 24\" Fractal-LRB", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "hermes", nom: "Canon 22\" Hermes Fluted", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-22%", velocite_ms: "-10%" }, effets_extra: { "Mobilité ADS": "-10%" } },
        { id: "r556_chief", nom: "Canon contrôle 19.3\" R-556 Chief", description: "Plus de vélocité et recul fortement réduit, mais vise plus lentement.", modificateurs: { velocite_ms: "+20%", gun_kick: "-30%", recul_horizontal: "-30%", recul_vertical: "-30%", vitesse_visee_ms: "+14%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-11%" } },
        { id: "ristrauch", nom: "Canon court 18\" RistRauch S-100", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-11%" } },
        { id: "rist76", nom: "Canon hybride 20\" Rist-76 Nova", description: "Plus de vélocité et de portée, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", portee_m: "+14%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sentry_pro", nom: "Poignée Sentry Pro", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+10%", "Mobilité ADS": "+12%" } },
        { id: "respire", nom: "Poignée Respire", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "parallel", nom: "Poignée Parallel", description: "Manie plus vite mais recul accru.", modificateurs: { vitesse_visee_ms: "-13%", gun_kick: "+9%", recul_vertical: "+10%" }, effets_extra: { "Mobilité ADS": "+20%" } },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-25%" } },
        { id: "flowguard", nom: "Poignée Flowguard", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+10%" } },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-13%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "wessi", nom: "Bande rapide Wessi", description: "Manie plus vite (Fast Belt)." },
        { id: "sawblade", nom: "Tambour Sawblade", description: "+10 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+9%" } },
        { id: "enforcer", nom: "Bande Enforcer étendue", description: "+25 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+25", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+14%", vitesse_rechargement_ms: "+8%" } },
        { id: "leyden", nom: "Bande Leyden Spark (Belt Fed)", description: "+240 balles (énorme réserve).", modificateurs: { capacite_chargeur: "+240" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "causeway", nom: "Poignée Causeway", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-37%" } },
        { id: "elysian", nom: "Poignée Elysian Quick", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "lucius90", nom: "Poignée Lucius-90", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-18%" } },
        { id: "induction", nom: "Poignée Induction", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "l1_command", nom: "Poignée L1-Command", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vg0", nom: "Crosse VG-0 Light", description: "Crosse légère (maniabilité)." },
        { id: "rx7_shock", nom: "Crosse RX-7 Shock", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-18%", recul_horizontal: "-18%", recul_vertical: "-18%", vitesse_visee_ms: "+11%" }, effets_extra: { "Mobilité ADS": "-17%" } },
        { id: "ristrauch_recon", nom: "Crosse Rist Rauch Recon", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-7%" }, effets_extra: { "Mobilité ADS": "+24%" } },
        { id: "aegis", nom: "Crosse Aegis-X40", description: "Crosse tactique (maniabilité)." },
        { id: "r2_mobility", nom: "Crosse 2R-Mobility", description: "Réduit le flinch (encaissement)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-9%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.56 Caseless Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit fortement l'ensemble du recul.", modificateurs: { gun_kick: "-18%", recul_horizontal: "-18%", recul_vertical: "-18%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-20%" } },
        { id: "fmj", nom: "5.56 Caseless FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+15%" } }
      ]}
    ]
  },
  {
    id: "sokol_545",
    nom: "Sokol 545",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Sokol 545 (liste exhaustive, source codmunity.gg Warzone). FM gros chargeur (102), longue portée.
    stats_base: {
      degats: 34, portee_m: 60, cadence_cpm: 533, velocite_ms: 890,
      capacite_chargeur: 102, vitesse_visee_ms: 285, sprint_to_fire_ms: 235,
      vitesse_rechargement_ms: 4986, gun_kick: 25.66, recul_horizontal: 12.45,
      recul_vertical: 57.23, mobilite: 4.5
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tishina", nom: "Suppresseur SWF Tishina-11", description: "Tir silencieux, un peu plus de portée.", modificateurs: { portee_m: "+8%" } },
        { id: "eclipse_brake", nom: "Frein Eclipse 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" } },
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-18%", recul_vertical: "-18%" } },
        { id: "emt3_ported", nom: "Compensateur EMT3 Ported-70", description: "Améliore le tir en glissade/saut." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+13.2%", vitesse_visee_ms: "+19%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "primer", nom: "Canon moyen 18.2\" Primer", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-10%", velocite_ms: "-10%" } },
        { id: "tartarus", nom: "Canon long 20\" SWF Tartarus", description: "Plus de dégâts à distance, vise un peu plus lentement.", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "fixative", nom: "Canon hybride 16.8\" Fixative", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "stolos", nom: "Canon court 15.6\" Stolos", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-6%" } },
        { id: "parlous", nom: "Canon contrôle 18.2\" Parlous Heavy", description: "Plus de vélocité, recul fortement réduit, vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+12%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-12%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "enhance32", nom: "Poignée Enhance-32", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "lti_missive", nom: "Poignée LTI Missive", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+11%", "Mobilité ADS": "+11%" } },
        { id: "parallel", nom: "Poignée Parallel", description: "Manie plus vite en visée.", modificateurs: { vitesse_visee_ms: "-13%" }, effets_extra: { "Mobilité ADS": "+20%" } },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+10%" }, effets_extra: { "Vitesse sprint": "+5%", "Mobilité accroupi": "+11%" } },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-13%", recul_vertical: "-14%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "clepen", nom: "Chargeur rapide Clepen", description: "Manie/recharge plus vite, -42 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-33%", capacite_chargeur: "-42" } },
        { id: "invective", nom: "Chargeur Invective étendu", description: "+48 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+48", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+9%" } },
        { id: "ludens", nom: "Chargeur rapide Ludens", description: "Manie/recharge bien plus vite, -60 balles.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-13%", vitesse_rechargement_ms: "-50%", capacite_chargeur: "-60" } },
        { id: "nevis", nom: "Chargeur Nevis-K Bulk", description: "+78 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+78", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+13%" } },
        { id: "samarskiy", nom: "Bande Samarskiy Overdrive", description: "+204 balles et recul réduit (alimentation par bande).", modificateurs: { capacite_chargeur: "+204", gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pythian", nom: "Poignée Pythian-VI", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-26%" } },
        { id: "rennen", nom: "Poignée Rennen", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-26%" } },
        { id: "hoover", nom: "Poignée Hoover Precision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } },
        { id: "swf_garrote", nom: "Poignée SWF Garrote", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "eldritch", nom: "Poignée Eldritch Ergo", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "taction", nom: "Crosse Taction Control", description: "Réduit fortement l'ensemble du recul.", modificateurs: { gun_kick: "-21%", recul_horizontal: "-21%", recul_vertical: "-21%" } },
        { id: "voda", nom: "Crosse Voda Flounce", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+22%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+40%" } },
        { id: "milton", nom: "Crosse Milton Tactical", description: "Manie plus vite, tir après sprint plus rapide.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-10%" } },
        { id: "echidna", nom: "Crosse Echidna Aim", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-7%" }, effets_extra: { "Mobilité ADS": "+26%" } },
        { id: "callow", nom: "Crosse Callow Mix", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+7%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-6%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19.6%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.45 Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "5.45 FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+15%" } },
        { id: "dread_burst", nom: "MFS 48-Dread (tir rapide+)", description: "Cadence accrue et recul fortement réduit, un peu moins de vélocité.", modificateurs: { cadence_cpm: "+26%", gun_kick: "-45%", recul_horizontal: "-45%", recul_vertical: "-45%", mobilite: "+6%", velocite_ms: "-10%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité ADS": "+8%" } }
      ]}
    ]
  },
  {
    id: "strider_300",
    nom: "Strider 300",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Strider 300 (liste exhaustive, source codmunity.gg Warzone). Sniper à verrou, méta absolue.
    stats_base: {
      degats: 95, portee_m: 80, cadence_cpm: 56, velocite_ms: 990,
      capacite_chargeur: 8, vitesse_visee_ms: 540, sprint_to_fire_ms: 220,
      vitesse_rechargement_ms: 2907, gun_kick: 35.35, recul_horizontal: 38.4,
      recul_vertical: 75.72, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Lunette standard —" },
        { id: "quick_scope", nom: "Quick Scope", description: "Lunette à visée rapide." },
        { id: "kepler_sniper", nom: "Lunette Kepler longue portée", description: "Fort grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Tir silencieux." },
        { id: "titan_r", nom: "Compensateur Titan-R 7.62", description: "Améliore le tir en glissade/saut." },
        { id: "vs762_brake", nom: "Frein VS-762", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.6%", vitesse_visee_ms: "+11%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-12.1%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "saltire", nom: "Canon vélocité 24.1\" Saltire Dispatch", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+20%" } },
        { id: "trigon", nom: "Canon long 19\" Trigon Heavy", description: "Vise plus lentement et recul fortement accru.", modificateurs: { vitesse_visee_ms: "+25%", gun_kick: "+40%", recul_horizontal: "+20%", recul_vertical: "+40%" } },
        { id: "bowen_grooved", nom: "Canon dégâts 25\" Bowen Grooved", description: "Forte hausse de portée.", modificateurs: { portee_m: "+25.8%" } },
        { id: "carbon_atoll", nom: "Canon hybride 21.2\" Carbon Atoll", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+10%", portee_m: "+10.6%" } },
        { id: "eam_plyp4", nom: "Canon court 17\" EAM PLYP-4", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-11%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cornerstone", nom: "Poignée Cornerstone-642", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "huntsmen", nom: "Poignée Bowen Huntsmen", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+9%", "Mobilité ADS": "+19%" } },
        { id: "bowen_morphic", nom: "Poignée Bowen Morphic", description: "Réduit le recul horizontal, plus mobile.", modificateurs: { recul_horizontal: "-17%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+9%" } },
        { id: "redwell_align", nom: "Poignée Redwell Alignment", description: "Réduit très fortement le recul horizontal.", modificateurs: { recul_horizontal: "-35%" } },
        { id: "mfs_ballast", nom: "Poignée MFS Ballast Stabilizer", description: "Stabilité de visée, plus mobile en visée mais vise plus lentement.", modificateurs: { vitesse_visee_ms: "+13%" }, effets_extra: { "Mobilité ADS": "+26%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laden", nom: "Chargeur Laden étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+4%", sprint_to_fire_ms: "+9%" } },
        { id: "carnation", nom: "Chargeur rapide Carnation", description: "Manie/recharge plus vite, -2 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-21%", capacite_chargeur: "-2" } },
        { id: "prisma_ext2", nom: "Chargeur PrismaTech étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+6%", sprint_to_fire_ms: "+14%", vitesse_rechargement_ms: "+11%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "nighthawk", nom: "Poignée Nighthawk CQB (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-43%" } },
        { id: "keystone", nom: "Poignée Keystone Control", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "fringing", nom: "Poignée Fringing Stable (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "hatch", nom: "Poignée Hatch Quick (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "redwell_gorgon", nom: "Poignée Redwell Gorgon", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-7%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "prudence", nom: "Crosse Prudence-R11 (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "hawker_vigor", nom: "Crosse Hawker Vigor (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+29%" } },
        { id: "raconteur", nom: "Crosse EAM Raconteur", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+17%" } },
        { id: "ambulate", nom: "Crosse Ambulate-X4 (ADS mobilité)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+30%" } },
        { id: "bowen_indus", nom: "Crosse Bowen Industrial (contrôle)", description: "Crosse de contrôle (stabilité)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19.7%" } },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-9%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: ".300 WM FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "overpressured", nom: ".300 WM Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "quick_bolt", nom: "Tir rapide (Quick Bolt)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+18%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "hawker_hx",
    nom: "Hawker HX",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Hawker HX (liste exhaustive, source codmunity.gg Warzone). Sniper à verrou, méta absolue.
    stats_base: {
      degats: 95, portee_m: 80, cadence_cpm: 48, velocite_ms: 960,
      capacite_chargeur: 7, vitesse_visee_ms: 510, sprint_to_fire_ms: 230,
      vitesse_rechargement_ms: 3240, gun_kick: 23.35, recul_horizontal: 33.59,
      recul_vertical: 68.72, mobilite: 4.8
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Lunette standard —" },
        { id: "quick_scope", nom: "Quick Scope", description: "Lunette à visée rapide." },
        { id: "kepler_sniper", nom: "Lunette Kepler longue portée", description: "Fort grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "tishina_supp", nom: "Suppresseur SWF Tishina-11", description: "Tir silencieux." },
        { id: "emt3_ported", nom: "Compensateur EMT3 Ported-70", description: "Améliore le tir en glissade/saut." },
        { id: "eclipse_brake", nom: "Frein Eclipse .338", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.9%", vitesse_visee_ms: "+11%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-11.8%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "teleos", nom: "Canon long 27.4\" Teleos Range", description: "Forte hausse de portée.", modificateurs: { portee_m: "+25%" } },
        { id: "absolution", nom: "Canon vélocité 26.1\" Absolution", description: "Améliore la vélocité de balle." },
        { id: "composite11", nom: "Canon dégâts 23.7\" Composite-11", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+10%", portee_m: "+10.5%" } },
        { id: "votive", nom: "Canon hybride MFS 25\" Votive", description: "Canon hybride équilibré." },
        { id: "hawker_spring", nom: "Canon court 20.5\" Hawker Spring", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-11%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ridge", nom: "Poignée Hawker Ridge", description: "Réduit très fortement le recul horizontal.", modificateurs: { recul_horizontal: "-35%" } },
        { id: "hawker_mobile", nom: "Poignée Hawker Mobile", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+18%" } },
        { id: "knitline", nom: "Poignée Knitline Focus", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "flattop", nom: "Poignée FlatTop", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "underpitch", nom: "Poignée UnderPitch", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-17%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "amrita", nom: "Chargeur rapide Amrita", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-26%" } },
        { id: "ext_338", nom: "Chargeur .338 Hawker étendu", description: "+3 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+3", vitesse_visee_ms: "+4%", sprint_to_fire_ms: "+9%" } },
        { id: "flatload", nom: "Chargeur rapide Flatload", description: "Manie/recharge plus vite, -1 balle.", modificateurs: { vitesse_visee_ms: "-2%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-36%", capacite_chargeur: "-1" } },
        { id: "tyrant", nom: "Chargeur Tyrant-II étendu II", description: "+5 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+6%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+12%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "volant", nom: "Poignée Volant Tight (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-35%" } },
        { id: "syncretic", nom: "Poignée Hawker Syncretic", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "scud", nom: "Poignée Scud Shelf (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "auroral", nom: "Poignée Auroral Light (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "chimeric", nom: "Poignée Chimeric Mobile", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-7%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bardo", nom: "Crosse Bardo Light (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+11%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+16%" } },
        { id: "centurion", nom: "Crosse Centurion Stitch (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "infiltrator", nom: "Crosse Infiltrator (ADS mobilité)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+28%" } },
        { id: "requiem", nom: "Crosse Requiem-ZW", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+16%" } },
        { id: "steadfast", nom: "Crosse Hawker Steadfast (contrôle)", description: "Crosse de contrôle (stabilité)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19.7%" } },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-9%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "recoil_spring", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: ".338 LM FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "overpressured", nom: ".338 LM Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "light_bolt", nom: "Tir rapide (Light Bolt)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+19%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "xr3_ion",
    nom: "XR-3 Ion",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du XR-3 Ion (liste exhaustive, source codmunity.gg Warzone). Sniper semi-auto, faible recul.
    stats_base: {
      degats: 70, portee_m: 78, cadence_cpm: 136, velocite_ms: 820,
      capacite_chargeur: 12, vitesse_visee_ms: 620, sprint_to_fire_ms: 250,
      vitesse_rechargement_ms: 2907, gun_kick: 16, recul_horizontal: 5.63,
      recul_vertical: 25.38, mobilite: 4.5
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Lunette standard —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "greaves_zoom", nom: "Greaves Ultra Zoom", description: "Lunette à zoom variable." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "lti_target", nom: "LTI Target Finder v.2", description: "Détecteur de cible." },
        { id: "eam_dyad", nom: "EAM Dyad xL", description: "Viseur hybride." },
        { id: "strix_thermal", nom: "VAS Strix 6x Thermal", description: "Lunette thermique 6x." },
        { id: "rangefinder", nom: "Circuit-Z Rangefinder", description: "Lunette télémètre." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_triad", nom: "Suppresseur LTI Triad", description: "Tir silencieux." },
        { id: "trishot_comp", nom: "Compensateur TriShot", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "triptych_brake", nom: "Frein Triptych", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.5%", vitesse_visee_ms: "+9%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "mfs_3x3", nom: "Compensateur MFS 3x3", description: "Améliore le tir en glissade/saut, mais vise et tire plus lentement.", modificateurs: { vitesse_visee_ms: "+24%", cadence_cpm: "-21%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_infinity", nom: "Canon long 21\" LTI Infinity", description: "Plus de portée.", modificateurs: { portee_m: "+25%" } },
        { id: "ion_trinity", nom: "Canon vélocité 20\" Ion Trinity", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "fringe", nom: "Canon court 15\" Fringe", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-10%" } },
        { id: "revolution", nom: "Canon dégâts 19\" Revolution", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+13%" } },
        { id: "xr_adapt", nom: "Canon hybride 17\" XR-Adapt", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+12.5%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "stalwart", nom: "Garde-main Stalwart-5", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "neutralize", nom: "Garde-main Neutralize-XR", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-25%" } },
        { id: "zero_s", nom: "Garde-main Zero-S", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "advanced_step", nom: "Garde-main Advanced Step", description: "Améliore la mobilité (maniabilité)." },
        { id: "lti_enforcer", nom: "Garde-main LTI Enforcer", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+9%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+10%" } },
        { id: "vulcan", nom: "Conversion XR-3 Ion Vulcan Minigun", description: "Convertit l'arme en minigun (cadence extrême)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "phantom_v", nom: "Chargeur rapide Phantom-V", description: "Recharge plus vite (rechargement tactique)." },
        { id: "overload", nom: "Chargeur Overload étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+3%", sprint_to_fire_ms: "+8%" } },
        { id: "mammoth", nom: "Chargeur Mammoth Stack étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+12%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "xr_omega", nom: "Poignée XR-Omega (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-38%" } },
        { id: "lt_sling", nom: "Poignée L.T. Sling (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-9%" } },
        { id: "l9_vertigo", nom: "Poignée L9 Vertigo", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "transit_ion", nom: "Poignée Transit-Ion", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-5%" } },
        { id: "xr_init", nom: "Poignée XR-Initialize (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_collapsed", nom: "Crosse LTI Collapsed (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+18%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+34%" } },
        { id: "lethal_absorb", nom: "Crosse Lethal Absorb", description: "Réduit le flinch (encaissement)." },
        { id: "padded_crush", nom: "Crosse Padded Crush (ADS mobilité)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+28%" } },
        { id: "exposed73", nom: "Crosse Exposed-73 (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "lightshield", nom: "Crosse Lightshield", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+19%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-8%" } },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+12%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "7.62 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "quick_charge", nom: "Tir rapide (Quick Charge)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "shadow_sk",
    nom: "Shadow SK",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Shadow SK (liste exhaustive, source codmunity.gg Warzone). Sniper avec emplacement « Crosse (joue) ».
    stats_base: {
      degats: 75, portee_m: 78, cadence_cpm: 100, velocite_ms: 920,
      capacite_chargeur: 10, vitesse_visee_ms: 500, sprint_to_fire_ms: 260,
      vitesse_rechargement_ms: 2520, gun_kick: 26, recul_horizontal: 14.61,
      recul_vertical: 20.81, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Lunette standard —" },
        { id: "greaves_dot", nom: "Greaves Red Dot", description: "Point rouge." },
        { id: "iron_sight", nom: "Œilleton de sniper", description: "Visée fer à visée rapide." },
        { id: "eam_dual", nom: "EAM Dual Zoom", description: "Lunette à double grossissement." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "prisma_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." },
        { id: "kepler_wvt", nom: "Kepler Custom WVT-08", description: "Lunette à grossissement variable." },
        { id: "solaris", nom: "Solaris Holo-IR", description: "Viseur holographique thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "tishina_supp", nom: "Suppresseur SWF Tishina-11", description: "Tir silencieux." },
        { id: "emt3_ported", nom: "Compensateur EMT3 Ported-70", description: "Améliore le tir en glissade/saut." },
        { id: "eclipse_brake", nom: "Frein Eclipse 7.62", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.1%", vitesse_visee_ms: "+10%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "thrust", nom: "Canon court 17\" Thrust", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-10%" } },
        { id: "strand", nom: "Canon long 22.4\" Strand", description: "Plus de portée.", modificateurs: { portee_m: "+19.6%" } },
        { id: "dimpled", nom: "Canon 18.3\" Dimpled-4150", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+13%", portee_m: "+8.9%" } },
        { id: "bellx1", nom: "Canon vélocité 19.6\" Bell-X1", description: "Améliore la vélocité de balle." },
        { id: "emt3_fluted", nom: "Canon 19.6\" EMT3 Fluted", description: "Plus de vélocité mais recul fortement accru.", modificateurs: { velocite_ms: "+10%", vitesse_visee_ms: "+16%", gun_kick: "+40%", recul_horizontal: "+20%", recul_vertical: "+40%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "targil", nom: "Chargeur Targil étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+4%", sprint_to_fire_ms: "+8%" } },
        { id: "riptide", nom: "Chargeur rapide Riptide", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-19%" } },
        { id: "rapid_gulf", nom: "Chargeur rapide Rapid Gulf II", description: "Manie/recharge plus vite, -2 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-19%", capacite_chargeur: "-2" } },
        { id: "progenitor", nom: "Chargeur Progenitor étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+25%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "e3_billet", nom: "Poignée E-3 Billet (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-12%" } },
        { id: "custom_flier", nom: "Poignée Custom Flier (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-37%" } },
        { id: "freehold", nom: "Poignée Freehold Control", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "stippled", nom: "Poignée Stippled Comfort (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "vital_grace", nom: "Poignée Vital Grace", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-6%" } }
      ]},
      { id: "comb", label: "Crosse (joue)", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "parapet", nom: "Joue Parapet Riser", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "vanquish", nom: "Joue EMT3 Vanquish", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "flowline", nom: "Joue EMT3 Flowline", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+9%", "Mobilité ADS": "+15%" } },
        { id: "efirm", nom: "Joue E-Firm Riser", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "squadron", nom: "Joue Squadron Riser", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+9%" } },
        { id: "masterkey", nom: "Fusil sous-canon 12-Gauge Masterkey", description: "Réduit fortement tout le recul (canon à pompe sous le canon).", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "friction", nom: "Crosse Friction (anti-flinch)", description: "Réduit le tremblement quand on est touché." },
        { id: "preservation", nom: "Crosse Preservation (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+29%" } },
        { id: "skeletal", nom: "Crosse Skeletal (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "tflux", nom: "Crosse T-Flux (ADS mobilité)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+29%" } },
        { id: "flourish", nom: "Crosse Flourish Full", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+15%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+10%" } },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-8%" } },
        { id: "mfs_convergence", nom: "Laser MFS Convergence Box", description: "Tir après sprint quasi instantané (visible).", modificateurs: { sprint_to_fire_ms: "-96%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: ".300 WM FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "overpressured", nom: ".300 WM Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "lw_trigger", nom: "Détente allégée (LW Trigger)", description: "Cadence accrue, mais recul fortement dégradé.", modificateurs: { cadence_cpm: "+8%", gun_kick: "+25%", recul_horizontal: "+25%", recul_vertical: "+25%" } }
      ]}
    ]
  },
  {
    id: "vs_recon",
    nom: "VS Recon",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du VS Recon (liste exhaustive, source codmunity.gg Warzone). Sniper à verrou (un coup).
    stats_base: {
      degats: 95, portee_m: 80, cadence_cpm: 43, velocite_ms: 760,
      capacite_chargeur: 6, vitesse_visee_ms: 525, sprint_to_fire_ms: 260,
      vitesse_rechargement_ms: 3120, gun_kick: 35.35, recul_horizontal: 38.4,
      recul_vertical: 75.72, mobilite: 4.6
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Lunette standard —" },
        { id: "ristrauch_7x", nom: "RistRauch 7x", description: "Lunette de sniper 7x." },
        { id: "prisma_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette grossissement 4x." },
        { id: "scanner", nom: "Millimeter Scanner", description: "Lunette détection de mouvement." },
        { id: "vas_duo", nom: "VAS Duo Hybrid Sight", description: "Viseur hybride." },
        { id: "kepler_trange", nom: "Kepler T-Range Holo", description: "Holo avec télémètre." },
        { id: "bowen_ir", nom: "Bowen X-25 IR", description: "Viseur thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Tir silencieux." },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "vs762_brake", nom: "Frein VS-762", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.9%", vitesse_visee_ms: "+9%" } },
        { id: "titan_r", nom: "Compensateur Titan-R 7.62", description: "Améliore le tir en glissade/saut." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "domain", nom: "Canon hybride 24.9\" Domain", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+14%", vitesse_visee_ms: "-5%" } },
        { id: "gforce", nom: "Canon vélocité 23\" G-Force", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+27%" } },
        { id: "engage_r", nom: "Canon visée 21\" Engage-R", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-12%" } },
        { id: "nimbus", nom: "Canon court 17\" RistRauch Nimbus", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-2%", sprint_to_fire_ms: "-8%" } },
        { id: "tack_driver", nom: "Canon contrôle 19.3\" Tack Driver", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "axispro", nom: "Garde-main AxisPro", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%" } },
        { id: "stetig_c", nom: "Garde-main Stetig-C", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "breacher", nom: "Garde-main Breacher", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+9%" } },
        { id: "kinetic_lock", nom: "Garde-main Kinetic Lock", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+9%", "Mobilité ADS": "+16%" } },
        { id: "mfs_rstop", nom: "Garde-main MFS R-Stop", description: "Réduit énormément l'ensemble du recul, manie un peu plus vite.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-8%", gun_kick: "-50%", recul_horizontal: "-50%", recul_vertical: "-50%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dashline", nom: "Chargeur rapide DashLine", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-13%" } },
        { id: "wyvern", nom: "Chargeur Wyvern étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+3%", sprint_to_fire_ms: "+8%" } },
        { id: "vsr_ext2", nom: "Chargeur VS-R étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+20%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "r2_laufen", nom: "Poignée R-2-Laúfen (tir-sprint)", description: "Tir après sprint plus rapide." },
        { id: "vs_poise", nom: "Poignée VS Poise", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "skeletal", nom: "Poignée Skeletal (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "r1_shelf", nom: "Poignée R-1 Shelf (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-8%" } },
        { id: "kinesis", nom: "Poignée Kinesis", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-4%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "contra_light", nom: "Crosse Contra Light (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+30%" } },
        { id: "ristrauch_breach", nom: "Crosse RistRauch Breach (ADS mobilité)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+30%" } },
        { id: "stabil_heavy", nom: "Crosse Stabil Heavy (anti-flinch)", description: "Réduit le tremblement quand on est touché." },
        { id: "stronghold", nom: "Crosse Stronghold (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "outpost", nom: "Crosse Outpost Raider", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+16%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-8%" } },
        { id: "tactical", nom: "Laser tactique Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+10%" } },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "7.62 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "light_bolt", nom: "Tir rapide (Light Bolt)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+29%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "swordfish_a1",
    nom: "Swordfish A1",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Swordfish A1 (liste exhaustive, source codmunity.gg Warzone). Fusil tactique (marksman) semi-auto.
    stats_base: {
      degats: 45, portee_m: 60, cadence_cpm: 488, velocite_ms: 915,
      capacite_chargeur: 36, vitesse_visee_ms: 270, sprint_to_fire_ms: 240,
      vitesse_rechargement_ms: 2622, gun_kick: 17.8, recul_horizontal: 1.68,
      recul_vertical: 19.95, mobilite: 4.4
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." },
        { id: "lunette_3x", nom: "Lunette 3x", description: "Grossissement moyen." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_supp", nom: "Suppresseur VAS 5.56", description: "Tir silencieux." },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-17%" } },
        { id: "titan_r", nom: "Compensateur Titan-R 5.56", description: "Améliore le tir en glissade/saut." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+15%", portee_m: "+7.9%", vitesse_visee_ms: "+15%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-10.5%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gar_xl", nom: "Canon vélocité 16.5\" Gar-xL", description: "Améliore la vélocité de balle." },
        { id: "angler", nom: "Canon long 17\" Angler", description: "Plus de portée.", modificateurs: { portee_m: "+26.3%" } },
        { id: "spatha", nom: "Canon hybride 15.1\" Spatha", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+13.2%" } },
        { id: "bowen_melville", nom: "Canon 15.9\" Bowen Melville", description: "Plus de dégâts effectifs mais recul fortement accru.", modificateurs: { gun_kick: "+54%", recul_horizontal: "+20%", recul_vertical: "+55%" } },
        { id: "volare", nom: "Canon court 13\" EAM Volare", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-7%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fixus", nom: "Poignée Fixus", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "dominium", nom: "Poignée Dominium", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } },
        { id: "aperture2", nom: "Poignée Aperture-2", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "modus_r", nom: "Poignée Modus-R", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-8%", mobilite: "+10%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+8%" } },
        { id: "dart", nom: "Poignée Dart", description: "Améliore la mobilité.", modificateurs: { mobilite: "+10%" }, effets_extra: { "Mobilité accroupi": "+8%", "Mobilité ADS": "+14%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dorado", nom: "Chargeur Dorado étendu (48)", description: "+12 balles.", modificateurs: { capacite_chargeur: "+12" } },
        { id: "r0g", nom: "Chargeur rapide R0-G (36)", description: "Manie plus vite (Fast Mag)." },
        { id: "mini_pearl", nom: "Chargeur rapide Mini-Pearl", description: "Manie/recharge plus vite, -4 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-30%", capacite_chargeur: "-4" } },
        { id: "samson", nom: "Tambour VAS Samson (60)", description: "+24 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+24", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+21%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "plenary", nom: "Poignée Plenary (tir-sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-24%" } },
        { id: "r1_splendor", nom: "Poignée R1-Splendor (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "webbed", nom: "Poignée Webbed Pistol", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-6%" } },
        { id: "hawker_vicr", nom: "Poignée Hawker VIC-R", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "trevally", nom: "Poignée Trevally Shock (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "adept_skiff", nom: "Crosse Adept Skiff (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+20%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+29%" } },
        { id: "narwhal", nom: "Crosse Narwhal Heavy", description: "Crosse lourde (stabilité)." },
        { id: "bosun", nom: "Crosse Bosun Light (ADS mobilité)", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+21%" } },
        { id: "qstubb", nom: "Crosse Q-Stubb", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+9%" } },
        { id: "amber_j", nom: "Crosse Amber-J (contrôle)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+15.8%" } },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-7%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "5.56 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "overpressured", nom: "5.56 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+11%", velocite_ms: "-20%", gun_kick: "+30%", recul_horizontal: "+30%", recul_vertical: "+30%", portee_m: "-20%" } },
        { id: "penta_burst", nom: "MFS Penta Burst Mod (rafale 5)", description: "Rafale de 5, cadence et chargeur accrus, mais fort recul.", modificateurs: { cadence_cpm: "+25%", capacite_chargeur: "+24", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+6%", vitesse_rechargement_ms: "+21%", gun_kick: "+35%", recul_horizontal: "+8%", recul_vertical: "+35%" } }
      ]}
    ]
  },
  {
    id: "m8a1",
    nom: "M8A1",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du M8A1 (liste exhaustive, source codmunity.gg Warzone). Tactique (marksman) en rafale ; conversion auto disponible.
    stats_base: {
      degats: 40, portee_m: 58, cadence_cpm: 591, velocite_ms: 900,
      capacite_chargeur: 32, vitesse_visee_ms: 265, sprint_to_fire_ms: 200,
      vitesse_rechargement_ms: 2877, gun_kick: 18, recul_horizontal: 33.2,
      recul_vertical: 41.06, mobilite: 4.5
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "kepler_dot", nom: "Kepler-Pro Red Dot", description: "Point rouge." },
        { id: "prismatech_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "vas_duo", nom: "VAS Duo Hybrid Sight", description: "Viseur hybride." },
        { id: "kepler_trange", nom: "Kepler T-Range Holo", description: "Holo avec télémètre." },
        { id: "solaris_ir", nom: "Solaris Holo-IR", description: "Holographique thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-9%", recul_vertical: "-12%" } },
        { id: "vas_supp", nom: "Suppresseur VAS 5.56", description: "Tir silencieux." },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-6%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+6.7%", vitesse_visee_ms: "+20%" } },
        { id: "titan_r", nom: "Compensateur Titan-R 5.56", description: "Améliore le tir en glissade/saut." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "autostrike", nom: "Conversion M8A1 AutoStrike-X8", description: "Convertit l'arme en tir automatique." },
        { id: "ionic8", nom: "Canon 18\" Ionic-8", description: "Plus de vélocité, réduit le recul horizontal.", modificateurs: { velocite_ms: "+18%", recul_horizontal: "-5%" }, effets_extra: { "Mobilité ADS": "-4%" } },
        { id: "barrier", nom: "Canon long 23\" Barrier", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "frontline", nom: "Canon hybride 21\" Frontline", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "ascend", nom: "Canon court 15\" Ascend-KS", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-7%" } },
        { id: "deadeye", nom: "Canon contrôle 16.5\" Deadeye", description: "Réduit le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-7%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-8%" } },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-3%", recul_horizontal: "-15%" } },
        { id: "enhance32", nom: "Poignée Enhance-32", description: "Stabilité de visée (pas d'effet de stat notable)." },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-8%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+9%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+9%", "Mobilité ADS": "+11%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "blink", nom: "Chargeur rapide Blink-Chamber", description: "Manie/recharge plus vite, -4 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-36%", capacite_chargeur: "-4" } },
        { id: "sentinel", nom: "Chargeur Sentinel étendu", description: "+8 balles.", modificateurs: { capacite_chargeur: "+8" } },
        { id: "echo_flip", nom: "Chargeur Echo Reverse Flip", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-20%" } },
        { id: "redline", nom: "Tambour Redline", description: "+20 balles, manie/recharge un peu plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+7%", vitesse_rechargement_ms: "+13%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "-4%", "Mobilité accroupi": "-6%", "Mobilité ADS": "-9%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_grip", nom: "Poignée Instinct (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "rush99", nom: "Poignée Rush-99 (tir-sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } },
        { id: "g7_launch", nom: "Poignée G7-Launch (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-9%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "ks_raze", nom: "Poignée K&S Raze", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-8%" } },
        { id: "schmidt", nom: "Poignée Schmidt Trapper", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-11%", vitesse_visee_ms: "+5%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "barrage01", nom: "Crosse VAS Barrage-01 (mobilité)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+22%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+39%" } },
        { id: "swiftline", nom: "Crosse Swiftline (ADS mobilité)", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-7%" }, effets_extra: { "Mobilité ADS": "+21%" } },
        { id: "gridlock", nom: "Crosse Gridlock (contrôle)", description: "Réduit le recul, vise un peu plus lentement, plus mobile en visée.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+7%" }, effets_extra: { "Mobilité ADS": "+11%" } },
        { id: "ks_impact", nom: "Crosse K&S Impact (contrôle)", description: "Crosse de contrôle (stabilité)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-7%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+8%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "overpressured", nom: "5.56 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+6%", velocite_ms: "-15%", gun_kick: "+35%", recul_horizontal: "+35%", recul_vertical: "+35%", portee_m: "-20%" } },
        { id: "fmj", nom: "5.56 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." }
      ]}
    ]
  },
  {
    id: "m34_novaline",
    nom: "M34 Novaline",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du M34 Novaline (liste exhaustive, source codmunity.gg Warzone). Tactique (marksman) semi-auto.
    stats_base: {
      degats: 50, portee_m: 62, cadence_cpm: 235, velocite_ms: 885,
      capacite_chargeur: 20, vitesse_visee_ms: 300, sprint_to_fire_ms: 250,
      vitesse_rechargement_ms: 2545, gun_kick: 21.5, recul_horizontal: 10.51,
      recul_vertical: 42.34, mobilite: 4.4
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "greaves_dot", nom: "Greaves Red Dot", description: "Point rouge." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." },
        { id: "ristrauch_7x", nom: "RistRauch 7x", description: "Lunette de sniper 7x." },
        { id: "lti_target", nom: "LTI Target Finder v.2", description: "Détecteur de cible." },
        { id: "eam_dual", nom: "EAM Dual Zoom", description: "Lunette à double grossissement." },
        { id: "kepler_wvt", nom: "Kepler Custom WVT-08", description: "Lunette à grossissement variable." },
        { id: "strix_thermal", nom: "VAS Strix 6x Thermal", description: "Lunette thermique 6x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-18%" } },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Tir silencieux." },
        { id: "redwell_brake", nom: "Frein Redwell 7.62", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+6.7%", vitesse_visee_ms: "+18%" } },
        { id: "titan_r", nom: "Compensateur Titan-R 7.62", description: "Améliore le tir en glissade/saut." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "velox90", nom: "Canon vélocité 17.3\" Velox-90", description: "Plus de vélocité, réduit un peu le recul.", modificateurs: { velocite_ms: "+18%", gun_kick: "-5%", recul_vertical: "-5%" }, effets_extra: { "Mobilité ADS": "-4%" } },
        { id: "severus", nom: "Canon court 14.2\" Severus Light", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-10%" } },
        { id: "callisto", nom: "Canon long 18.5\" Callisto", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "b1_hybrid", nom: "Canon hybride 17\" B1-Hybrid", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+3%" } },
        { id: "cyclops", nom: "Canon contrôle 15\" Cyclops-03", description: "Réduit le recul, vise plus lentement.", modificateurs: { gun_kick: "-17%", recul_horizontal: "-10%", recul_vertical: "-18%", vitesse_visee_ms: "+9%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-7%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "bowen_agile", nom: "Poignée Bowen Agile", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" }, effets_extra: { "Mobilité accroupi": "+9%", "Mobilité ADS": "+10%" } },
        { id: "eam_steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal, plus mobile.", modificateurs: { recul_horizontal: "-10%", mobilite: "+7%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+9%" } },
        { id: "mfs_enhance", nom: "Poignée MFS Enhance-32", description: "Stabilité mobile (pas d'effet de stat notable)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "templar", nom: "Chargeur Flip Templar", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-24%", capacite_chargeur: "+5" } },
        { id: "bowen762", nom: "Chargeur Bowen 762 étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "syncopate", nom: "Chargeur rapide Syncopate", description: "Manie/recharge plus vite, -2 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-34%", capacite_chargeur: "-2" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vitality", nom: "Poignée Vitality Sprint", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-27%" } },
        { id: "actuation76", nom: "Poignée Actuation-76 (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "guerilla", nom: "Poignée Guerilla Assault", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-8%", vitesse_visee_ms: "+5%" } },
        { id: "cougar", nom: "Poignée Cougar Draw (Quickdraw)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-28%" } },
        { id: "amicus", nom: "Poignée Amicus K19", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "seismic", nom: "Crosse Seismic Fixed (contrôle)", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" }, effets_extra: { "Mobilité ADS": "-16%" } },
        { id: "milspec", nom: "Crosse Mil-Spec Light (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+20%" }, effets_extra: { "Vitesse sprint": "+2%", "Mobilité accroupi": "+36%" } },
        { id: "adjustable", nom: "Crosse Adjustable Rise (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "battalion", nom: "Crosse Battalion Core", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+7%" } },
        { id: "infantry_xy", nom: "Crosse Infantry-XY (ADS mobilité)", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-7%" }, effets_extra: { "Mobilité ADS": "+20%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%" } },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+12%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-5%", recul_vertical: "-15%" } },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: "7.62 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+2%", velocite_ms: "-15%", gun_kick: "+35%", recul_horizontal: "+35%", recul_vertical: "+35%", portee_m: "-20%" } }
      ]}
    ]
  },
  {
    id: "warden_308",
    nom: "Warden 308",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Warden 308 (liste exhaustive, source codmunity.gg Warzone). Marksman à verrou, avec emplacement « Crosse (joue) » et kit conversion revolver.
    stats_base: {
      degats: 50, portee_m: 62, cadence_cpm: 670, velocite_ms: 950,
      capacite_chargeur: 8, vitesse_visee_ms: 270, sprint_to_fire_ms: 240,
      vitesse_rechargement_ms: 2378, gun_kick: 10.2, recul_horizontal: 10.53,
      recul_vertical: 57.6, mobilite: 4.5
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette grossissement 4x." },
        { id: "eam_dyad", nom: "EAM Dyad xL", description: "Viseur hybride." },
        { id: "prisma_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." },
        { id: "bowen_ir", nom: "Bowen X-25 IR", description: "Viseur thermique." },
        { id: "mm_scanner", nom: "Millimeter Scanner", description: "Détecte les ennemis proches." },
        { id: "greaves_ultra", nom: "Greaves Ultra Zoom", description: "Lunette à grossissement variable." },
        { id: "circuit_z", nom: "Circuit-Z Rangefinder", description: "Lunette télémètre." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "outlaw_supp", nom: "Silencieux Outlaw", description: "Tir silencieux." },
        { id: "ltilm_brake", nom: "Frein LTI-LM", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-18%", recul_vertical: "-20%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "watchdog_comp", nom: "Compensateur Watchdog", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-30%" } },
        { id: "crown_comp", nom: "Compensateur Lethal Tools Crown", description: "Améliore le tir en glissade/saut." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+19%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fluted_x35", nom: "Canon vélocité 17.3\" LTI Fluted-X35", description: "Plus de vélocité, réduit un peu le recul.", modificateurs: { velocite_ms: "+28%", gun_kick: "-5%", recul_vertical: "-5%" }, effets_extra: { "Mobilité ADS": "-4%" } },
        { id: "invictus", nom: "Canon long 18\" Invictus", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "prolite", nom: "Canon court 14.8\" Pro-Lite", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-10%" } },
        { id: "phalanx", nom: "Canon hybride 15.4\" LTI Phalanx", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+3%" } },
        { id: "artemis", nom: "Canon contrôle 16.2\" Artemis-01", description: "Réduit le recul, vise plus lentement.", modificateurs: { gun_kick: "-10.7%", recul_horizontal: "-10%", recul_vertical: "-18%", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+8%" }, effets_extra: { "Mobilité ADS": "-7%" } },
        { id: "spiral", nom: "Canon revolver 10\" Spiral", description: "Conversion revolver : réduit fortement le recul, plus de portée.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-39%", recul_vertical: "-14%", portee_m: "+33.3%" } },
        { id: "snub", nom: "Canon revolver 6\" Snub Nose", description: "Conversion revolver : manie plus vite, moins de portée.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-19%", portee_m: "-20%" } },
        { id: "admonish", nom: "Canon revolver 8\" Admonish", description: "Conversion revolver : plus de dégâts mais fort recul, vise plus lentement.", modificateurs: { vitesse_visee_ms: "+17%", sprint_to_fire_ms: "+27%", gun_kick: "+45%", recul_horizontal: "+45%", recul_vertical: "+45%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "speed_latch", nom: "Barillet rapide Speed Latch", description: "Manie/recharge un peu plus vite, -2 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-5%", capacite_chargeur: "-2" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scarab", nom: "Poignée Scarab (tir-sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "tyrannis", nom: "Poignée LTI Tyrannis (Quickdraw)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-29%" } },
        { id: "leviathan", nom: "Poignée Leviathan", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-8%", vitesse_visee_ms: "+5%" } },
        { id: "thunder", nom: "Poignée Thunder", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-18%" } },
        { id: "partition", nom: "Poignée Partition (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "comb", label: "Crosse (joue)", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lockdown_riser", nom: "Joue LTI Lockdown", description: "Améliore la stabilité de visée." },
        { id: "static_riser", nom: "Joue Static-907x", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } },
        { id: "ogre_riser", nom: "Joue LTI Ogre", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "baron_riser", nom: "Joue Baron", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+9%" } },
        { id: "trail40_riser", nom: "Joue LTI Trail-40", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" }, effets_extra: { "Mobilité accroupi": "+9%", "Mobilité ADS": "+11%" } },
        { id: "badlands_kit", nom: "Kit revolver Badlands", description: "Convertit en revolver : très maniable et mobile, moins de recul, mais cadence/vélocité réduites et fort à-coup.", modificateurs: { vitesse_visee_ms: "-36%", sprint_to_fire_ms: "-46%", recul_horizontal: "-26%", recul_vertical: "-15%", mobilite: "+19%", cadence_cpm: "-15%", velocite_ms: "-50%", gun_kick: "+125%" }, effets_extra: { "Vitesse sprint": "+6%", "Mobilité accroupi": "+18%", "Mobilité ADS": "+36%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "propulsion", nom: "Crosse Propulsion (contrôle)", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" }, effets_extra: { "Mobilité ADS": "-15%" } },
        { id: "lti_skeleton", nom: "Crosse LTI Skeleton (ADS mobilité)", description: "Manie plus vite, plus mobile en visée.", modificateurs: { vitesse_visee_ms: "-7%" }, effets_extra: { "Mobilité ADS": "+23%" } },
        { id: "warden_folding", nom: "Crosse Warden pliable (mobilité)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+23%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité accroupi": "+39%" } },
        { id: "trench", nom: "Crosse Trench Tactical", description: "Améliore le tir en stance tactique." },
        { id: "ftac", nom: "Crosse FTAC Hybrid", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+7%" } },
        { id: "akimbo", nom: "Warden 308 Revolver Akimbo (double)", description: "Double maniement (avec conversion revolver) : tir après sprint plus lent.", modificateurs: { sprint_to_fire_ms: "+46%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "tactical", nom: "Laser tactique Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%" } },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+12%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-5%", recul_vertical: "-15%" } },
        { id: "overpressured", nom: ".308 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "fmj", nom: ".308 NATO FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "snap_trigger", nom: "MFS Snap Trigger (cadence+)", description: "Cadence accrue mais recul accru et portée réduite.", modificateurs: { cadence_cpm: "+13%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+15%", portee_m: "-55%" } }
      ]}
    ]
  },
  {
    id: "m10_breacher",
    nom: "M10 Breacher",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du M10 Breacher (liste exhaustive, source codmunity.gg Warzone). Pompe — codmunity ne publie quasi aucun chiffre d'effet pour cette arme.
    stats_base: { degats: 220, portee_m: 13, cadence_cpm: 75, velocite_ms: 320, capacite_chargeur: 8, vitesse_visee_ms: 300, sprint_to_fire_ms: 210, vitesse_rechargement_ms: 6810, gun_kick: 53.6, recul_horizontal: 42.04, recul_vertical: 98.04, mobilite: 4.7 },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "vas_microflex", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "prisma_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." },
        { id: "solaris", nom: "Solaris Holo-IR", description: "Holographique thermique." },
        { id: "lti_target", nom: "LTI Target Finder v.2", description: "Détecteur de cible." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "agency_supp", nom: "Suppresseur Redwell Agency", description: "Tir silencieux." },
        { id: "precision_choke", nom: "Étrangleur Breacher Precision", description: "Resserre la gerbe en visée (portée utile accrue)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Tir silencieux (pas de chiffre d'effet publié)." },
        { id: "cqb_choke", nom: "Étrangleur M10 CQB", description: "Resserre la gerbe au tir à la hanche." },
        { id: "onyx_brake", nom: "Frein Breacher Onyx", description: "Réduit le recul de la 1re balle.", effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, un peu moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overload", nom: "Canon lourd 17\" Overload", description: "Canon polyvalent (meilleure gerbe en visée)." },
        { id: "light", nom: "Canon léger 15.5\"", description: "Manie plus vite." },
        { id: "redwell5k", nom: "Canon long 17.4\" Redwell-5K", description: "Plus de portée." },
        { id: "bull", nom: "Canon long 19.8\" Bull", description: "Portée et gerbe plus serrée (longue portée)." },
        { id: "zephyr", nom: "Canon court 14\" Zephyr-R", description: "Tir après sprint plus rapide (maniabilité)." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Améliore le contrôle du recul." },
        { id: "redwell_dash", nom: "Poignée Redwell Dash", description: "Améliore la mobilité." },
        { id: "steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul (mobile)." },
        { id: "zero_shift", nom: "Poignée Zero Shift", description: "Améliore la stabilité de visée." },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit la déviation des plombs." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "no_stock", nom: "Sans crosse", description: "Manie nettement plus vite (tir à la hanche)." },
        { id: "r54_padded", nom: "Crosse R-54 Padded", description: "Plus mobile en visée." },
        { id: "collapsible", nom: "Crosse repliable", description: "Bon compromis maniabilité." },
        { id: "sf7x", nom: "Crosse SF-7X", description: "Améliore le tir en glissade." },
        { id: "m10_light", nom: "Poignée M10 Light", description: "Visée plus rapide." },
        { id: "lw_skeleton", nom: "Crosse LW Skeleton", description: "Sprint prolongé (maniabilité)." },
        { id: "mfs_xk", nom: "Crosse MFS XK-Lite", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25" } },
        { id: "argus_lever", nom: "Levier M10 Breacher Argus", description: "Conversion à levier (récompense défi)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Précision tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit le recul (pas de chiffre d'effet publié)." },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires." },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée accrue, plus de précision." },
        { id: "pump_rod", nom: "Tige de pompe (Pump Guide Rod)", description: "Réarmement (cadence) plus rapide." }
      ]}
    ]
  },
  {
    id: "sg_12",
    nom: "SG-12",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du SG-12 (liste exhaustive, source codmunity.gg Warzone). Pompe semi-auto — codmunity ne publie de chiffres que pour la capacité chargeur.
    stats_base: { degats: 88, portee_m: 13, cadence_cpm: 212, velocite_ms: 320, capacite_chargeur: 8, vitesse_visee_ms: 250, sprint_to_fire_ms: 200, vitesse_rechargement_ms: 2860, gun_kick: 32.47, recul_horizontal: 34.04, recul_vertical: 91.59, mobilite: 4.7 },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." },
        { id: "lunette_2x", nom: "Lunette 2x", description: "Faible grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hko_supp", nom: "Suppresseur HKO", description: "Tir silencieux." },
        { id: "onyx_brake", nom: "Frein Breacher Onyx", description: "Réduit le recul (effet non chiffré)." },
        { id: "akita_choke", nom: "Étrangleur Akita Full Bore-12", description: "Resserre la gerbe en stance tactique (visée)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Tir silencieux (pas de chiffre d'effet publié)." },
        { id: "fang_choke", nom: "Étrangleur Fang Modified", description: "Resserre la gerbe au tir à la hanche." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit le recul (effet non chiffré)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker_reach", nom: "Canon long 20\" Hawker Reach", description: "Portée utile accrue." },
        { id: "universal", nom: "Canon hybride 17\" Universal", description: "Canon polyvalent." },
        { id: "lockshot", nom: "Canon vélocité 19\" Lockshot", description: "Vélocité des plombs accrue." },
        { id: "mini_cut", nom: "Canon court 15\" EAM-Mini Cut", description: "Manie plus vite." },
        { id: "crit_strike", nom: "Canon dégâts 18\" Crit-Strike", description: "Dégâts accrus." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal (effet non chiffré)." },
        { id: "redwell_dash", nom: "Poignée Redwell Dash", description: "Améliore la mobilité." },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Améliore le contrôle du recul." },
        { id: "sapper", nom: "Poignée Sapper Guard", description: "Recul réduit et mobilité (effet non chiffré)." },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit la déviation des plombs." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "collie", nom: "Chargeur Flip Collie (8)", description: "Recharge plus vite, -1 cartouche.", modificateurs: { capacite_chargeur: "-1" } },
        { id: "hcomb", nom: "Chargeur H-Comb (10)", description: "+1 cartouche.", modificateurs: { capacite_chargeur: "+1" } },
        { id: "streamline", nom: "Chargeur rapide Streamline (6)", description: "Recharge plus vite, -3 cartouches.", modificateurs: { capacite_chargeur: "-3" } },
        { id: "bighorn", nom: "Tambour Bowen Bighorn (14)", description: "+5 cartouches.", modificateurs: { capacite_chargeur: "+5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_buffer", nom: "Poignée EAM Buffer", description: "Stabilise le recul (effet non chiffré)." },
        { id: "alignlite", nom: "Poignée Align-Lite (Quickdraw)", description: "Visée plus rapide (effet non chiffré)." },
        { id: "dashbound", nom: "Poignée Dashbound (tir-sprint)", description: "Tir après sprint plus rapide (effet non chiffré)." },
        { id: "dawnvoid", nom: "Poignée LTI DawnVoid (précision)", description: "Améliore la précision (effet non chiffré)." },
        { id: "dropzone", nom: "Poignée Dropzone", description: "Visée plus rapide (mobile, effet non chiffré)." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "beadline", nom: "Crosse Beadline Tactical (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "b3_dragstep", nom: "Crosse B3-Dragstep (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "control_frame", nom: "Crosse Control Frame", description: "Réduit le flinch (encaissement)." },
        { id: "overrun", nom: "Crosse Overrun (mobilité)", description: "Améliore la mobilité (effet non chiffré)." },
        { id: "anchor", nom: "Crosse Anchor (contrôle)", description: "Réduit le recul (effet non chiffré)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Précision tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible)." },
        { id: "pulse_fire", nom: "Lampe tactique MFS Pulse Fire", description: "Lampe tactique (tir binaire)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit le recul (effet non chiffré)." },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires (fortement nerfées en S4)." },
        { id: "lw_trigger", nom: "Détente allégée (LW Trigger)", description: "Cadence de tir plus rapide." },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée et précision accrues." }
      ]}
    ]
  },
  {
    id: "echo_12",
    nom: "Echo 12",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS de l'Echo 12 (liste exhaustive, source codmunity.gg Warzone). Pompe — codmunity ne publie de chiffres que sur quelques accessoires.
    stats_base: {
      degats: 100, portee_m: 13, cadence_cpm: 75, velocite_ms: 320,
      capacite_chargeur: 12, vitesse_visee_ms: 240, sprint_to_fire_ms: 180,
      vitesse_rechargement_ms: 2853, gun_kick: 36.9, recul_horizontal: 35.86,
      recul_vertical: 106.19, mobilite: 4.6
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "kepler_dot", nom: "Kepler-Pro Red Dot", description: "Point rouge." },
        { id: "eam_xl", nom: "EAM xL Reflex", description: "Point rouge ouvert." },
        { id: "mm_scanner", nom: "Millimeter Scanner", description: "Détecte les ennemis proches." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dual_clone", nom: "Suppresseur Dual Clone", description: "Tir silencieux." },
        { id: "echo_choke", nom: "Étrangleur Echo Modified", description: "Resserre la gerbe en visée." },
        { id: "twin_damp", nom: "Twin Dampener", description: "Réduit le recul de la 1re balle.", effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Tir silencieux (pas de chiffre d'effet publié)." },
        { id: "binary_choke", nom: "Étrangleur Binary Echo", description: "Resserre la gerbe au tir à la hanche." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "nero_twin", nom: "Canon dégâts 17.3\" Nero-Twin", description: "Dégâts accrus." },
        { id: "ghostline", nom: "Canon court 15\" Ghostline", description: "Manie plus vite." },
        { id: "proton", nom: "Canon hybride 16.1\" Proton", description: "Canon polyvalent." },
        { id: "magellan", nom: "Canon long 18.7\" Magellan Dual", description: "Bon équilibre portée/contrôle." },
        { id: "greyhound", nom: "Canon vélocité 18\" MFS Greyhound", description: "Vélocité des plombs stabilisée." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bravotap", nom: "Tambour VAS BravoTap", description: "Recharge plus vite (tambour rapide)." },
        { id: "fortrex", nom: "Tambour Greaves Fortrex", description: "Capacité augmentée (tambour)." }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_ignition", nom: "Poignée EAM Ignition (tir-sprint)", description: "Tir après sprint plus rapide (effet non chiffré)." },
        { id: "harbinger", nom: "Poignée Harbinger", description: "Stabilise le recul (effet non chiffré)." },
        { id: "phantom17", nom: "Poignée Phantom-17 (Quickdraw)", description: "Visée plus rapide (effet non chiffré)." },
        { id: "axel", nom: "Poignée Axel Control (précision)", description: "Réduit le recul de la 1re balle.", effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "traverse", nom: "Poignée Traverse", description: "Visée plus rapide (mobile, effet non chiffré)." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "bowen_defender", nom: "Crosse Bowen Defender (contrôle)", description: "Crosse de contrôle (stabilité)." },
        { id: "stalker", nom: "Crosse Greaves Stalker (mobilité)", description: "Améliore la mobilité." },
        { id: "scatterproof", nom: "Crosse Scatterproof (tactique)", description: "Resserre la gerbe en stance tactique." },
        { id: "extraction", nom: "Crosse Extraction (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "stonewall", nom: "Crosse EAM Stonewall", description: "Plus mobile en visée.", effets_extra: { "Mobilité ADS": "+9%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible)." },
        { id: "tactical_2mw", nom: "Laser tactique 2mW Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit le recul (effet non chiffré)." },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires." },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée/précision, recul réduit, moins de vélocité.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", velocite_ms: "-25%" } },
        { id: "turnkey", nom: "Turnkey Rapid Drum", description: "Cadence de tir accrue." },
        { id: "backlash", nom: "Kit lance-grenade Echo 12 Backlash", description: "Ajoute un tir explosif, mais réduit la cadence.", modificateurs: { cadence_cpm: "-18%" } }
      ]}
    ]
  },
  {
    id: "akita",
    nom: "Akita",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS de l'Akita (liste exhaustive, source codmunity.gg Warzone). Pompe automatique — codmunity ne publie de chiffres que sur quelques accessoires.
    stats_base: {
      degats: 70, portee_m: 12, cadence_cpm: 400, velocite_ms: 320,
      capacite_chargeur: 12, vitesse_visee_ms: 210, sprint_to_fire_ms: 160,
      vitesse_rechargement_ms: 2900, gun_kick: 24.67, recul_horizontal: 24.48,
      recul_vertical: 64.12, mobilite: 4.8
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge reflex." },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "kepler_trange", nom: "Kepler T-Range Holo", description: "Holo avec télémètre." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akita_choke", nom: "Étrangleur Akita Full Bore-12", description: "Resserre la gerbe en stance tactique." },
        { id: "hko_supp", nom: "Suppresseur HKO", description: "Tir silencieux." },
        { id: "phantasm_brake", nom: "Frein Phantasm 12G", description: "Réduit le recul de la 1re balle.", effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Tir silencieux (pas de chiffre d'effet publié)." },
        { id: "fang_choke", nom: "Étrangleur Fang Modified", description: "Resserre la gerbe au tir à la hanche." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "security_cipher", nom: "Canon vélocité 12\" Security Cipher", description: "Vélocité des plombs accrue." },
        { id: "lightpad", nom: "Canon court 10.3\" Lightpad Strike", description: "Manie plus vite." },
        { id: "phobos", nom: "Canon dégâts 9.4\" Phobos Heavy", description: "Dégâts accrus." },
        { id: "splice_mix", nom: "Canon hybride 10\" Splice Mix", description: "Canon polyvalent." },
        { id: "retriever", nom: "Canon long 14\" Retriever Hunt", description: "Portée utile accrue." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sapper", nom: "Poignée Sapper Guard", description: "Recul réduit et mobilité (effet non chiffré)." },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Améliore le contrôle du recul." },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité." },
        { id: "zero_shift", nom: "Poignée Zero Shift", description: "Améliore la stabilité de visée." },
        { id: "vas_convergence", nom: "Poignée VAS Convergence", description: "Réduit la déviation des plombs." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "shell_ext1", nom: "Porte-cartouches étendu I", description: "Capacité augmentée." },
        { id: "bravo_rack", nom: "Chargeur rapide Bravo Speed Rack", description: "Recharge plus vite (Fast Mag)." },
        { id: "thinpoint", nom: "Chargeur rapide Thinpoint", description: "Manie/recharge plus vite (Fast Mag II)." },
        { id: "bulk_feed", nom: "Porte-cartouches étendu II Bulk Feed", description: "Capacité augmentée." }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pioneer", nom: "Poignée Pioneer Blaze (tir-sprint)", description: "Tir après sprint plus rapide (effet non chiffré)." },
        { id: "stippled", nom: "Poignée Stippled Control", description: "Stabilise le recul (effet non chiffré)." },
        { id: "granulated", nom: "Poignée Granulated Fast (Quickdraw)", description: "Visée plus rapide (effet non chiffré)." },
        { id: "paradise", nom: "Poignée Paradise Gen-4 (précision)", description: "Réduit le recul de la 1re balle.", effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "s47", nom: "Poignée S-47 Response", description: "Visée plus rapide (mobile, effet non chiffré)." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "venomous", nom: "Crosse Venomous (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "vagabond", nom: "Crosse Vagabond (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "mobile_security", nom: "Crosse Mobile Security (mobilité)", description: "Améliore la mobilité." },
        { id: "illicit", nom: "Crosse Illicit Motion", description: "Réduit le flinch (encaissement)." },
        { id: "mfs_gd7", nom: "Crosse MFS GD-7 Shock", description: "Maniabilité améliorée." },
        { id: "scorchlink", nom: "Akita ScorchLink Akimbo (double, belt-fed)", description: "Double maniement alimenté par bande : énorme volume de feu mais recul et tir après sprint dégradés.", modificateurs: { sprint_to_fire_ms: "+25%", gun_kick: "+25%", recul_horizontal: "+100%", recul_vertical: "+100%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scatterline", nom: "Laser EAM ScatterLine", description: "Précision tir à la hanche (visible)." },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Précision tir à la hanche (visible)." },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Précision tir à la hanche (visible)." },
        { id: "vas_shift", nom: "Laser VAS Precision Shift", description: "Précision tir à la hanche (visible)." },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit le recul (effet non chiffré)." },
        { id: "dragons_breath", nom: "12 Gauge Short Dragon's Breath", description: "Munitions incendiaires." },
        { id: "enhanced_cycle", nom: "Système de cycle amélioré", description: "Cadence de tir accrue." },
        { id: "slug", nom: "12 Gauge Short Slug", description: "Projectile unique : portée et précision accrues (buff dégâts S3R)." }
      ]}
    ]
  }
,
  {
    id: "krs_762",
    nom: "KRS-7.62",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Nouveau — Saison 4. Stats codmunity.gg. Jeu d'accessoires représentatif (même catégorie).
    stats_base: { degats: 84, portee_m: 52, cadence_cpm: 364, velocite_ms: 875, capacite_chargeur: 10, vitesse_visee_ms: 330, sprint_to_fire_ms: 250, vitesse_rechargement_ms: 3233, gun_kick: 17, recul_horizontal: 25.03, recul_vertical: 70.1, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"optique_0","nom":"Redwell 30-S 2x","modificateurs":{"vitesse_visee_ms":"+4%"}},{"id":"optique_1","nom":"FANG HoverPoint ELO"}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"bouche_2","nom":"Suppresseur monolithique","modificateurs":{"portee_m":"+8%","velocite_ms":"+10%","vitesse_visee_ms":"+6%","recul_vertical":"-5%"}},{"id":"bouche_3","nom":"Suppresseur Redwell Shade-X","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-3%","vitesse_visee_ms":"+3%"}},{"id":"bouche_4","nom":"Compensateur RL-7.62","modificateurs":{"recul_horizontal":"-8%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"canon_5","nom":"Canon KGS Hartha 14.7\"","modificateurs":{"portee_m":"+10%","velocite_ms":"+8%","recul_vertical":"-4%","vitesse_visee_ms":"+6%","mobilite":"-3%"}},{"id":"canon_6","nom":"Canon MFS Incursion 15\"","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"canon_7","nom":"Canon VAS Allay 16.5\"","modificateurs":{"portee_m":"+14%","velocite_ms":"+12%","recul_vertical":"-3%","vitesse_visee_ms":"+10%","mobilite":"-5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"chargeur_8","nom":"Chargeur étendu Satiate","modificateurs":{"capacite_chargeur":"+5","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"chargeur_9","nom":"Chargeur VAS Elpis-X","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+16%","vitesse_visee_ms":"+6%"}}]},{"id":"crosse_joue","label":"Crosse (joue)","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"joue_10","nom":"Joue Percy-V","modificateurs":{"vitesse_visee_ms":"-6%"},"effets_extra":{"Flinch":"−15%","Recul en visée":"−8%"}}]},{"id":"mode_tir","label":"Mode de tir","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"mode_11","nom":"Détente rapide","modificateurs":{"cadence_cpm":"+8%","recul_vertical":"+6%"}},{"id":"mode_12","nom":"7.62 NATO surpressurisé","modificateurs":{"velocite_ms":"+12%","portee_m":"+8%"}}]}]
  },
  {
    id: "cbrs_3",
    nom: "CBRS-3",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // Nouveau — Saison 4. Stats codmunity.gg. Jeu d'accessoires représentatif (même catégorie).
    stats_base: { degats: 29, portee_m: 34, cadence_cpm: 740, velocite_ms: 590, capacite_chargeur: 60, vitesse_visee_ms: 210, sprint_to_fire_ms: 140, vitesse_rechargement_ms: 3560, gun_kick: 42.01, recul_horizontal: 19.57, recul_vertical: 46.63, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"optique_0","nom":"Lethal Tools ELO"},{"id":"optique_1","nom":"FANG HoverPoint ELO"}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"bouche_2","nom":"Suppresseur Bowen 9mm","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-3%","vitesse_visee_ms":"+3%"}},{"id":"bouche_3","nom":"Suppresseur monolithique","modificateurs":{"portee_m":"+8%","velocite_ms":"+10%","vitesse_visee_ms":"+6%","recul_vertical":"-5%"}},{"id":"bouche_4","nom":"Compensateur Hawker Series 45","modificateurs":{"recul_horizontal":"-8%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"canon_5","nom":"Canon Redwell Parlay 15\"","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"canon_6","nom":"Canon Gaunt 11\"","modificateurs":{"vitesse_visee_ms":"-10%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-10%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"souscanon_7","nom":"Poignée Sapper Guard","modificateurs":{"sprint_to_fire_ms":"-8%","recul_horizontal":"-6%"},"effets_extra":{"Tir à la hanche":"+8%","Mobilité ADS":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"chargeur_8","nom":"Chargeur rapide MFS Carousel","modificateurs":{"vitesse_rechargement_ms":"-18%","vitesse_visee_ms":"-5%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"poignee_9","nom":"Poignée Ante","modificateurs":{"sprint_to_fire_ms":"-9%","vitesse_visee_ms":"-7%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"crosse_10","nom":"Crosse Slipway","modificateurs":{"recul_horizontal":"-7%","recul_vertical":"-5%","vitesse_visee_ms":"+4%"}}]},{"id":"mode_tir","label":"Mode de tir","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"mode_11","nom":"9mm Parabellum FMJ","modificateurs":{"velocite_ms":"+8%","portee_m":"+5%"}}]}]
  },
  {
    id: "gdl_havoc",
    nom: "GDL Havoc",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Nouveau — Saison 4. Stats codmunity.gg. Jeu d'accessoires représentatif (même catégorie).
    stats_base: { degats: 100, portee_m: 15, cadence_cpm: 82, velocite_ms: 790, capacite_chargeur: 4, vitesse_visee_ms: 260, sprint_to_fire_ms: 230, vitesse_rechargement_ms: 4080, gun_kick: 20, recul_horizontal: 7.65, recul_vertical: 18.48, mobilite: 4.8 },
    emplacements: [{"id":"viseur","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"lti_mini","nom":"LTI Mini","description":"Mini point rouge."},{"id":"vas_microflex","nom":"VAS MicroFlex","description":"Mini point rouge."},{"id":"prisma_holo","nom":"PrismaTech Digital Holo","description":"Viseur holographique."},{"id":"accuspot_3x","nom":"Greaves AccuSpot 3x","description":"Lunette grossissement 3x."},{"id":"solaris","nom":"Solaris Holo-IR","description":"Holographique thermique."},{"id":"lti_target","nom":"LTI Target Finder v.2","description":"Détecteur de cible."}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"agency_supp","nom":"Suppresseur Redwell Agency","description":"Tir silencieux."},{"id":"precision_choke","nom":"Étrangleur Breacher Precision","description":"Resserre la gerbe en visée (portée utile accrue)."},{"id":"supp_mono","nom":"Suppresseur monolithique","description":"Tir silencieux (pas de chiffre d'effet publié)."},{"id":"cqb_choke","nom":"Étrangleur M10 CQB","description":"Resserre la gerbe au tir à la hanche."},{"id":"onyx_brake","nom":"Frein Breacher Onyx","description":"Réduit le recul de la 1re balle.","effets_extra":{"Recul 1re balle":"−50%"}},{"id":"stentorian","nom":"Frein LTI Stentorian","description":"Bouche du Battle Pass S4."},{"id":"redwell","nom":"Suppresseur Redwell Shade-X","description":"Réduit tout le recul, un peu moins de vélocité/portée.","modificateurs":{"gun_kick":"-11%","recul_horizontal":"-11%","recul_vertical":"-11%","velocite_ms":"-13%","portee_m":"-15%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"overload","nom":"Canon lourd 17\" Overload","description":"Canon polyvalent (meilleure gerbe en visée)."},{"id":"light","nom":"Canon léger 15.5\"","description":"Manie plus vite."},{"id":"redwell5k","nom":"Canon long 17.4\" Redwell-5K","description":"Plus de portée."},{"id":"bull","nom":"Canon long 19.8\" Bull","description":"Portée et gerbe plus serrée (longue portée)."},{"id":"zephyr","nom":"Canon court 14\" Zephyr-R","description":"Tir après sprint plus rapide (maniabilité)."}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"force_stab","nom":"Poignée Force Stabilizer","description":"Améliore le contrôle du recul."},{"id":"redwell_dash","nom":"Poignée Redwell Dash","description":"Améliore la mobilité."},{"id":"steady90","nom":"Poignée EAM Steady-90","description":"Réduit le recul (mobile)."},{"id":"zero_shift","nom":"Poignée Zero Shift","description":"Améliore la stabilité de visée."},{"id":"vas_convergence","nom":"Poignée VAS Convergence","description":"Réduit la déviation des plombs."}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Crosse standard —"},{"id":"no_stock","nom":"Sans crosse","description":"Manie nettement plus vite (tir à la hanche)."},{"id":"r54_padded","nom":"Crosse R-54 Padded","description":"Plus mobile en visée."},{"id":"collapsible","nom":"Crosse repliable","description":"Bon compromis maniabilité."},{"id":"sf7x","nom":"Crosse SF-7X","description":"Améliore le tir en glissade."},{"id":"m10_light","nom":"Poignée M10 Light","description":"Visée plus rapide."},{"id":"lw_skeleton","nom":"Crosse LW Skeleton","description":"Sprint prolongé (maniabilité)."},{"id":"mfs_xk","nom":"Crosse MFS XK-Lite","description":"Tir après sprint plus rapide.","modificateurs":{"sprint_to_fire_ms":"-25"}},{"id":"argus_lever","nom":"Levier M10 Breacher Argus","description":"Conversion à levier (récompense défi)."}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"lockstep_5mw","nom":"Laser 5mW Lockstep","description":"Précision tir à la hanche (visible)."},{"id":"tactical_2mw","nom":"Laser tactique 2mW Adaptive","description":"Précision tir à la hanche (visible)."},{"id":"motion_3mw","nom":"Laser 3mW Motion Strike","description":"Précision tir à la hanche (visible)."},{"id":"convergence","nom":"Laser Convergence Box","description":"Précision tir à la hanche (visible)."},{"id":"instinct_1mw","nom":"Laser 1mW Instinct","description":"Manie plus vite (visible)."}]},{"id":"mode_tir","label":"Mode de tir","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"buffer","nom":"Ressorts amortisseurs","description":"Réduit le recul (pas de chiffre d'effet publié)."},{"id":"dragons_breath","nom":"12 Gauge Dragon's Breath","description":"Munitions incendiaires."},{"id":"slug","nom":"12 Gauge Slug","description":"Projectile unique : portée accrue, plus de précision."},{"id":"pump_rod","nom":"Tige de pompe (Pump Guide Rod)","description":"Réarmement (cadence) plus rapide."}]}]
  }
,
  {
    id: "xm4",
    nom: "XM4",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 22, portee_m: 40.6, cadence_cpm: 800, velocite_ms: 750, capacite_chargeur: 30, vitesse_visee_ms: 260, sprint_to_fire_ms: 190, vitesse_rechargement_ms: 2860, gun_kick: 15.45, recul_horizontal: 10.59, recul_vertical: 40.32, mobilite: 4.8 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "ak_74",
    nom: "AK-74",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 29, portee_m: 40.6, cadence_cpm: 652, velocite_ms: 725, capacite_chargeur: 30, vitesse_visee_ms: 290, sprint_to_fire_ms: 205, vitesse_rechargement_ms: 2730, gun_kick: 22.4, recul_horizontal: 19, recul_vertical: 44.24, mobilite: 4.6 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "ames_85",
    nom: "AMES 85",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 23, portee_m: 50.8, cadence_cpm: 750, velocite_ms: 760, capacite_chargeur: 30, vitesse_visee_ms: 265, sprint_to_fire_ms: 190, vitesse_rechargement_ms: 3000, gun_kick: 16.88, recul_horizontal: 12.31, recul_vertical: 39.93, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "gpr_91",
    nom: "GPR 91",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 23, portee_m: 45.7, cadence_cpm: 714, velocite_ms: 730, capacite_chargeur: 30, vitesse_visee_ms: 225, sprint_to_fire_ms: 160, vitesse_rechargement_ms: 3000, gun_kick: 19.65, recul_horizontal: 5.37, recul_vertical: 47.8, mobilite: 4.9 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "model_l",
    nom: "MODEL L",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 28, portee_m: 44.4, cadence_cpm: 600, velocite_ms: 770, capacite_chargeur: 30, vitesse_visee_ms: 270, sprint_to_fire_ms: 190, vitesse_rechargement_ms: 2833, gun_kick: 19.83, recul_horizontal: 14.68, recul_vertical: 49.34, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "goblin_mk_2",
    nom: "GOBLIN MK 2",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 36, portee_m: 48.3, cadence_cpm: 600, velocite_ms: 740, capacite_chargeur: 20, vitesse_visee_ms: 230, sprint_to_fire_ms: 170, vitesse_rechargement_ms: 3000, gun_kick: 20.9, recul_horizontal: 3.59, recul_vertical: 54.47, mobilite: 4.9 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "as_val",
    nom: "AS VAL",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 22, portee_m: 43.2, cadence_cpm: 896, velocite_ms: 715, capacite_chargeur: 20, vitesse_visee_ms: 230, sprint_to_fire_ms: 180, vitesse_rechargement_ms: 1867, gun_kick: 21.58, recul_horizontal: 19.66, recul_vertical: 38.35, mobilite: 4.8 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "cypher_091",
    nom: "Cypher 091",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 30, portee_m: 47, cadence_cpm: 561, velocite_ms: 810, capacite_chargeur: 30, vitesse_visee_ms: 235, sprint_to_fire_ms: 165, vitesse_rechargement_ms: 2630, gun_kick: 16.77, recul_horizontal: 23.51, recul_vertical: 47.98, mobilite: 4.9 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "kilo_141",
    nom: "KILO 141",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 23, portee_m: 55.9, cadence_cpm: 750, velocite_ms: 850, capacite_chargeur: 30, vitesse_visee_ms: 270, sprint_to_fire_ms: 200, vitesse_rechargement_ms: 2800, gun_kick: 20.9, recul_horizontal: 5, recul_vertical: 35.16, mobilite: 4.8 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "cr_56_amax",
    nom: "CR-56 Amax",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 30, portee_m: 48.3, cadence_cpm: 632, velocite_ms: 650, capacite_chargeur: 30, vitesse_visee_ms: 280, sprint_to_fire_ms: 190, vitesse_rechargement_ms: 2767, gun_kick: 32, recul_horizontal: 12.09, recul_vertical: 57.82, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "ffar_1",
    nom: "FFAR 1",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 21, portee_m: 41.9, cadence_cpm: 938, velocite_ms: 600, capacite_chargeur: 30, vitesse_visee_ms: 285, sprint_to_fire_ms: 200, vitesse_rechargement_ms: 2960, gun_kick: 26.58, recul_horizontal: 8.65, recul_vertical: 35.83, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "abr_a1",
    nom: "ABR A1",
    categorie: "Fusil d'assaut",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 32, portee_m: 34.3, cadence_cpm: 495, velocite_ms: 700, capacite_chargeur: 30, vitesse_visee_ms: 240, sprint_to_fire_ms: 170, vitesse_rechargement_ms: 3267, gun_kick: 37.9, recul_horizontal: 13.41, recul_vertical: 42.58, mobilite: 4.9 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "ksv",
    nom: "KSV",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 26, portee_m: 31.8, cadence_cpm: 800, velocite_ms: 510, capacite_chargeur: 30, vitesse_visee_ms: 220, sprint_to_fire_ms: 137, vitesse_rechargement_ms: 2530, gun_kick: 44.87, recul_horizontal: 13.4, recul_vertical: 49.84, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "tanto_22",
    nom: "TANTO .22",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 38, portee_m: 30.5, cadence_cpm: 1000, velocite_ms: 500, capacite_chargeur: 30, vitesse_visee_ms: 210, sprint_to_fire_ms: 120, vitesse_rechargement_ms: 2600, gun_kick: 40, recul_horizontal: 15, recul_vertical: 45, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "pp_919",
    nom: "PP-919",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 25, portee_m: 34.3, cadence_cpm: 625, velocite_ms: 540, capacite_chargeur: 64, vitesse_visee_ms: 240, sprint_to_fire_ms: 160, vitesse_rechargement_ms: 3400, gun_kick: 44, recul_horizontal: 5.11, recul_vertical: 50.33, mobilite: 4.8 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "jackal_pdw",
    nom: "JACKAL PDW",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 26, portee_m: 29.2, cadence_cpm: 682, velocite_ms: 530, capacite_chargeur: 30, vitesse_visee_ms: 195, sprint_to_fire_ms: 110, vitesse_rechargement_ms: 2800, gun_kick: 47.65, recul_horizontal: 27.15, recul_vertical: 49.75, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "kompakt_92",
    nom: "KOMPAKT 92",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 20, portee_m: 27.9, cadence_cpm: 1091, velocite_ms: 475, capacite_chargeur: 30, vitesse_visee_ms: 225, sprint_to_fire_ms: 145, vitesse_rechargement_ms: 2860, gun_kick: 28.47, recul_horizontal: 26.64, recul_vertical: 40.39, mobilite: 4.8 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "saug",
    nom: "SAUG",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 21, portee_m: 29.8, cadence_cpm: 909, velocite_ms: 525, capacite_chargeur: 36, vitesse_visee_ms: 200, sprint_to_fire_ms: 115, vitesse_rechargement_ms: 2560, gun_kick: 33.96, recul_horizontal: 13.6, recul_vertical: 44.23, mobilite: 5.2 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "ppsh_41",
    nom: "PPSh-41",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 22, portee_m: 31.8, cadence_cpm: 952, velocite_ms: 530, capacite_chargeur: 32, vitesse_visee_ms: 210, sprint_to_fire_ms: 125, vitesse_rechargement_ms: 3060, gun_kick: 35.1, recul_horizontal: 19.21, recul_vertical: 38.12, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "ladra",
    nom: "Ladra",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 19, portee_m: 33, cadence_cpm: 1071, velocite_ms: 500, capacite_chargeur: 38, vitesse_visee_ms: 200, sprint_to_fire_ms: 115, vitesse_rechargement_ms: 2730, gun_kick: 36.65, recul_horizontal: 15.89, recul_vertical: 43.67, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "lc10",
    nom: "LC10",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 22, portee_m: 38.1, cadence_cpm: 800, velocite_ms: 600, capacite_chargeur: 34, vitesse_visee_ms: 250, sprint_to_fire_ms: 165, vitesse_rechargement_ms: 2630, gun_kick: 33.75, recul_horizontal: 10.19, recul_vertical: 33.36, mobilite: 5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "marine_sp",
    nom: "MARINE SP",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 90, portee_m: 12, cadence_cpm: 63, velocite_ms: 320, capacite_chargeur: 6, vitesse_visee_ms: 320, sprint_to_fire_ms: 200, vitesse_rechargement_ms: 5580, gun_kick: 53.6, recul_horizontal: 42.04, recul_vertical: 98.04, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]}]
  },
  {
    id: "maelstrom",
    nom: "Maelstrom",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 90, portee_m: 12, cadence_cpm: 316, velocite_ms: 320, capacite_chargeur: 10, vitesse_visee_ms: 290, sprint_to_fire_ms: 190, vitesse_rechargement_ms: 3130, gun_kick: 36, recul_horizontal: 37.48, recul_vertical: 100.91, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]}]
  },
  {
    id: "pu_21",
    nom: "PU-21",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 27, portee_m: 45.7, cadence_cpm: 750, velocite_ms: 700, capacite_chargeur: 75, vitesse_visee_ms: 435, sprint_to_fire_ms: 240, vitesse_rechargement_ms: 6233, gun_kick: 18.92, recul_horizontal: 11.96, recul_vertical: 43.91, mobilite: 4.6 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]}]
  },
  {
    id: "gpmg_7",
    nom: "GPMG-7",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 23, portee_m: 55.9, cadence_cpm: 909, velocite_ms: 710, capacite_chargeur: 50, vitesse_visee_ms: 460, sprint_to_fire_ms: 230, vitesse_rechargement_ms: 6333, gun_kick: 16.2, recul_horizontal: 16.21, recul_vertical: 37.4, mobilite: 4.5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "feng_82",
    nom: "Feng 82",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 38, portee_m: 41.9, cadence_cpm: 461, velocite_ms: 740, capacite_chargeur: 30, vitesse_visee_ms: 370, sprint_to_fire_ms: 210, vitesse_rechargement_ms: 3400, gun_kick: 15.93, recul_horizontal: 11.61, recul_vertical: 64.85, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "pml_5_56",
    nom: "PML 5.56",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 30, portee_m: 55.9, cadence_cpm: 799, velocite_ms: 810, capacite_chargeur: 100, vitesse_visee_ms: 450, sprint_to_fire_ms: 225, vitesse_rechargement_ms: 8060, gun_kick: 18.3, recul_horizontal: 28.57, recul_vertical: 51.19, mobilite: 4.3 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "swat_5_56",
    nom: "SWAT 5.56",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 39, portee_m: 43.2, cadence_cpm: 402, velocite_ms: 830, capacite_chargeur: 30, vitesse_visee_ms: 315, sprint_to_fire_ms: 205, vitesse_rechargement_ms: 3030, gun_kick: 17.2, recul_horizontal: 15.97, recul_vertical: 56.31, mobilite: 4.5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "aek_973",
    nom: "AEK-973",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 42, portee_m: 53.3, cadence_cpm: 367, velocite_ms: 860, capacite_chargeur: 30, vitesse_visee_ms: 325, sprint_to_fire_ms: 215, vitesse_rechargement_ms: 3000, gun_kick: 18.1, recul_horizontal: 21.41, recul_vertical: 32.04, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "dm_10",
    nom: "DM-10",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 65, portee_m: 69.8, cadence_cpm: 333, velocite_ms: 850, capacite_chargeur: 20, vitesse_visee_ms: 350, sprint_to_fire_ms: 215, vitesse_rechargement_ms: 3233, gun_kick: 17, recul_horizontal: 29.41, recul_vertical: 68.49, mobilite: 4.6 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "tr2",
    nom: "TR2",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 44, portee_m: 50.8, cadence_cpm: 522, velocite_ms: 660, capacite_chargeur: 20, vitesse_visee_ms: 300, sprint_to_fire_ms: 210, vitesse_rechargement_ms: 3660, gun_kick: 24.4, recul_horizontal: 1.1, recul_vertical: 62.39, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "essex_model_07",
    nom: "Essex Model 07",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 100, portee_m: 66, cadence_cpm: 67, velocite_ms: 875, capacite_chargeur: 8, vitesse_visee_ms: 380, sprint_to_fire_ms: 250, vitesse_rechargement_ms: 3160, gun_kick: 35, recul_horizontal: 4.53, recul_vertical: 51.8, mobilite: 4.6 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "lw3a1_frostline",
    nom: "LW3A1 Frostline",
    categorie: "Fusil de précision",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 104, portee_m: 88.9, cadence_cpm: 45, velocite_ms: 880, capacite_chargeur: 5, vitesse_visee_ms: 520, sprint_to_fire_ms: 260, vitesse_rechargement_ms: 3330, gun_kick: 35.35, recul_horizontal: 38.4, recul_vertical: 75.72, mobilite: 4.6 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "svd",
    nom: "SVD",
    categorie: "Fusil de précision",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 104, portee_m: 76.2, cadence_cpm: 120, velocite_ms: 875, capacite_chargeur: 10, vitesse_visee_ms: 565, sprint_to_fire_ms: 300, vitesse_rechargement_ms: 3460, gun_kick: 40, recul_horizontal: 26.02, recul_vertical: 26.88, mobilite: 4.77 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "amr_mod_4",
    nom: "AMR Mod 4",
    categorie: "Fusil de précision",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 204, portee_m: 127, cadence_cpm: 95, velocite_ms: 860, capacite_chargeur: 6, vitesse_visee_ms: 625, sprint_to_fire_ms: 320, vitesse_rechargement_ms: 4300, gun_kick: 40, recul_horizontal: 15.97, recul_vertical: 35, mobilite: 4.5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "hdr",
    nom: "HDR",
    categorie: "Fusil de précision",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 104, portee_m: 127, cadence_cpm: 36, velocite_ms: 720, capacite_chargeur: 5, vitesse_visee_ms: 500, sprint_to_fire_ms: 250, vitesse_rechargement_ms: 3700, gun_kick: 12, recul_horizontal: 30.01, recul_vertical: 57.66, mobilite: 4.5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "dresden_9mm",
    nom: "Dresden 9mm",
    categorie: "Mitraillette",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 34, portee_m: 26.7, cadence_cpm: 536, velocite_ms: 700, capacite_chargeur: 32, vitesse_visee_ms: 200, sprint_to_fire_ms: 140, vitesse_rechargement_ms: 2860, gun_kick: 59.2, recul_horizontal: 10.7, recul_vertical: 58.5, mobilite: 5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"sous_canon","label":"Sous-canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"sc_vert","nom":"Poignée verticale","modificateurs":{"recul_vertical":"-8%","recul_horizontal":"-5%"}},{"id":"sc_avant","nom":"Poignée avant","modificateurs":{"recul_horizontal":"-9%"},"effets_extra":{"Tir à la hanche":"+8%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"poignee_arriere","label":"Poignée arrière","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"pa_qd","nom":"Poignée Quickdraw","modificateurs":{"vitesse_visee_ms":"-9%"}},{"id":"pa_as","nom":"Poignée d'assaut","modificateurs":{"sprint_to_fire_ms":"-9%"}}]},{"id":"crosse","label":"Crosse","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"cr_leg","nom":"Crosse légère","modificateurs":{"vitesse_visee_ms":"-7%","mobilite":"+4%"}},{"id":"cr_lourde","nom":"Crosse lourde","modificateurs":{"recul_vertical":"-7%","recul_horizontal":"-6%","vitesse_visee_ms":"+5%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  }
];

/* ------------------------------------------------------------
   ARMES SECONDAIRES (exemples)
   ------------------------------------------------------------ */
const ARMES_SECONDAIRES = [
  {
    id: "grekhova",
    nom: "Grekhova",
    categorie: "Pistolet",
    jeu: "Black Ops 6",
    // Accessoires COMPLETS de la Grekhova (liste exhaustive, source codmunity.gg Warzone BO6). Pistolet secondaire.
    stats_base: {
      degats: 35, portee_m: 14.5, cadence_cpm: 750, velocite_ms: 290,
      capacite_chargeur: 20, vitesse_visee_ms: 200, sprint_to_fire_ms: 110,
      vitesse_rechargement_ms: 2530, gun_kick: 23.68, recul_horizontal: 12.72,
      recul_vertical: 33.25, mobilite: 5.1
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "merlin_mini", nom: "Merlin Mini", description: "Petit point rouge." },
        { id: "kepler", nom: "Lunette Kepler", description: "Lunette pistolet." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur", description: "Tir silencieux." },
        { id: "compensateur", nom: "Compensateur", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-24%", recul_vertical: "-25%" } },
        { id: "muzzle_brake", nom: "Frein de bouche", description: "Réduit le recul de la 1re balle (effet visuel)." },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise davantage à la verticale.", modificateurs: { gun_kick: "-29%", recul_vertical: "-30%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+28%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+35%" } },
        { id: "canon_long", nom: "Canon long", description: "Améliore la portée effective.", modificateurs: { portee_m: "+30%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+49%", recul_horizontal: "+20%", recul_vertical: "+50%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+15%" } },
        { id: "canon_court", nom: "Canon court", description: "Plus mobile (canon court)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+5 balles, vise et recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+17%", sprint_to_fire_ms: "+32%", vitesse_rechargement_ms: "+30%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-18%", vitesse_rechargement_ms: "-17%", capacite_chargeur: "-5" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+10 balles, encore plus lent à manier.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+28%", sprint_to_fire_ms: "+50%", vitesse_rechargement_ms: "+28%" } },
        { id: "mag_etendu3", nom: "Chargeur étendu III", description: "+40 balles, très lourd à manier.", modificateurs: { capacite_chargeur: "+40", vitesse_visee_ms: "+38%", sprint_to_fire_ms: "+68%", vitesse_rechargement_ms: "+45%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-5%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-14%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_lestee", nom: "Crosse lestée", description: "Recul fortement réduit, mais vise plus lentement.", modificateurs: { gun_kick: "-40%", recul_horizontal: "-40%", recul_vertical: "-40%", vitesse_visee_ms: "+13%", sprint_to_fire_ms: "+23%" } },
        { id: "akimbo", nom: "Akimbo Grekhova (double)", description: "Double maniement : recharge/recul accrus et dispersion à la hanche plus large.", modificateurs: { vitesse_rechargement_ms: "+12%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" }, effets_extra: { "Tir à la hanche": "+35%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Précision tir à la hanche (visible)." },
        { id: "steady_aim", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible).", effets_extra: { "Tir à la hanche": "−20%" } },
        { id: "strelok", nom: "Laser Strelok", description: "Précision tir à la hanche (visible)." },
        { id: "fast_motion", nom: "Laser mouvement rapide", description: "Précision tir à la hanche (visible)." },
        { id: "target_laser", nom: "Laser de visée", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "9x18mm Makarov surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "fmj", nom: "9x18mm Makarov FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+15%", recul_horizontal: "+10%", recul_vertical: "+15%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "jager_45",
    nom: "Jäger 45",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Jäger 45 (liste exhaustive, source codmunity.gg Warzone). Pistolet semi-auto par défaut de BO7.
    stats_base: {
      degats: 34, portee_m: 15, cadence_cpm: 600, velocite_ms: 410,
      capacite_chargeur: 10, vitesse_visee_ms: 150, sprint_to_fire_ms: 90,
      vitesse_rechargement_ms: 1995, gun_kick: 32.5, recul_horizontal: 22.39,
      recul_vertical: 37.81, mobilite: 5.3
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "bowen_pixel", nom: "Bowen Pixel Reflex", description: "Mini point rouge." },
        { id: "bowen_scout", nom: "Bowen Scout Scope", description: "Lunette pistolet." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "jager_supp", nom: "Suppresseur Jäger Roar", description: "Tir silencieux." },
        { id: "ported_brake", nom: "Frein Ported-45", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "h45_comp", nom: "Compensateur H-45 Precision", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+37%" } },
        { id: "hawker_ported", nom: "Compensateur Hawker Ported", description: "Améliore le tir en glissade/saut." },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "elevation", nom: "Canon court 6.3\" Elevation", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-11%" } },
        { id: "warp45", nom: "Canon vélocité 8\" Warp-45", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+45%" } },
        { id: "voyager", nom: "Canon long 8.7\" EAM Voyager", description: "Allonge la portée.", modificateurs: { portee_m: "+30%" } },
        { id: "hawker_ion", nom: "Canon hybride 7.1\" Hawker Ion", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+22%", portee_m: "+15%" } },
        { id: "vital_ace", nom: "Canon 9.6\" MFS Vital Ace (Skull Splitter)", description: "Conversion gros calibre : dégâts massifs mais cadence chutée, recul énorme et visée bien plus lente.", modificateurs: { vitesse_visee_ms: "+70%", sprint_to_fire_ms: "+28%", cadence_cpm: "-67%", gun_kick: "+134%", recul_horizontal: "+70%", recul_vertical: "+116%" }, effets_extra: { "Mobilité ADS": "-13%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "stryder_snap", nom: "Chargeur rapide Stryder-Snap", description: "Manie et recharge plus vite, −2 balles.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-14%", vitesse_rechargement_ms: "-24%", capacite_chargeur: "-2" } },
        { id: "warpath", nom: "Chargeur Warpath étendu I", description: "+2 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+17%" } },
        { id: "goliath", nom: "Chargeur Goliath-X étendu+", description: "+5 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+20%", sprint_to_fire_ms: "+28%", vitesse_rechargement_ms: "+20%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dashl", nom: "Poignée Dash-L (tir-sprint)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "intercept", nom: "Poignée Intercept (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "gl3n", nom: "Poignée GL-3N", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "vx_shift", nom: "Poignée VX-Shift", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-10%" } },
        { id: "ranger_lite", nom: "Poignée Ranger Lite (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo Jäger 45 (double)", description: "Double maniement : recharge plus lente.", modificateurs: { vitesse_rechargement_ms: "+35%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vector_sync", nom: "Laser Vector Sync", description: "Précision tir à la hanche (visible)." },
        { id: "xs1_tac", nom: "Laser tactique XS-1", description: "Précision tir à la hanche (visible)." },
        { id: "zero_x", nom: "Laser Jäger Rapid Zero-X", description: "Précision tir à la hanche (visible)." },
        { id: "airglide", nom: "Laser AirGlide Target", description: "Plus de portée (visible).", modificateurs: { portee_m: "+13%" } },
        { id: "rapid_sight", nom: "Laser Rapid Sight Motion", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-17%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ressorts_recul", nom: "Ressort de recul pistolet", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "overpressured", nom: ".45 Cal surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "match_trigger", nom: "Détente Match Grade", description: "Cadence accrue, mais recul accru.", modificateurs: { cadence_cpm: "+9%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%" } },
        { id: "fmj", nom: ".45 Cal FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." }
      ]}
    ]
  },
  {
    id: "velox_57",
    nom: "Velox 5.7",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Velox 5.7 (liste exhaustive, source codmunity.gg Warzone). Pistolet à rafale de 3 coups (BO7).
    stats_base: {
      degats: 36, portee_m: 18, cadence_cpm: 549, velocite_ms: 400,
      capacite_chargeur: 15, vitesse_visee_ms: 160, sprint_to_fire_ms: 110,
      vitesse_rechargement_ms: 2267, gun_kick: 42, recul_horizontal: 22.28,
      recul_vertical: 35.88, mobilite: 5.2
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "vas_micro", nom: "VAS MicroFlex", description: "Mini point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur Greaves Covert-5", description: "Tir silencieux." },
        { id: "compensateur", nom: "Compensateur G-57 Viper", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "frein", nom: "Frein Greaves 5.7 Narrow", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "multiport", nom: "Compensateur Greaves Multi-Port", description: "Améliore le tir en glissade/saut." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+11.1%", vitesse_visee_ms: "+34%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_anvil", nom: "Canon dégâts Anvil 5.2\"", description: "Dégâts accrus mais recul nettement accru.", modificateurs: { gun_kick: "+30%", recul_horizontal: "+20%", recul_vertical: "+30%" } },
        { id: "canon_tarrow", nom: "Canon long Redwell T-Arrow 7.8\"", description: "Allonge la portée.", modificateurs: { portee_m: "+22.2%" } },
        { id: "canon_anodized", nom: "Canon vélocité Anodized-88 7.1\"", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "canon_lx3m", nom: "Canon hybride LX-3M 5.2\"", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+11.1%" } },
        { id: "celeste", nom: "Canon mobilité MFS Celeste 4\"", description: "Améliore la mobilité.", modificateurs: { mobilite: "+10%" }, effets_extra: { "Vitesse sprint": "+4%", "Mobilité accroupi": "+5%", "Mobilité ADS": "+17%" } },
        { id: "carbine", nom: "Châssis carabine Velox 5.7", description: "Conversion carabine (récompense défi)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide Serpens", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-15%" } },
        { id: "mag_corvus", nom: "Chargeur étendu Corvus", description: "+3 balles.", modificateurs: { capacite_chargeur: "+3" } },
        { id: "mag_draco2", nom: "Chargeur Draco Reserve étendu II", description: "+9 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+9", vitesse_visee_ms: "+13%", sprint_to_fire_ms: "+18%", vitesse_rechargement_ms: "+22%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "nt_speed", nom: "Poignée NT-Speed (tir-sprint)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-27%" } },
        { id: "quick_spine", nom: "Poignée Quick Spine (Quickdraw)", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-44%" } },
        { id: "hunter", nom: "Poignée Hunter Stability", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "perennial", nom: "Poignée Perennial", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-25%" } },
        { id: "rdw12", nom: "Poignée RDW-12 (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−60%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo Velox 5.7 (double)", description: "Double pistolet : recharge plus lente, dégâts réduits.", modificateurs: { vitesse_rechargement_ms: "+24%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "xs1_tac", nom: "Laser tactique XS-1", description: "Précision tir à la hanche (visible)." },
        { id: "vector_sync", nom: "Laser Vector Sync", description: "Précision tir à la hanche (visible)." },
        { id: "rapid_sight", nom: "Laser Rapid Sight Motion", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-18%" } },
        { id: "zero_x", nom: "Laser Jäger Rapid Zero-X", description: "Précision tir à la hanche (visible)." },
        { id: "airglide", nom: "Laser AirGlide Target", description: "Plus de portée (visible).", modificateurs: { portee_m: "+10%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "recul_accelere", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "surpressurise", nom: "5.7x28mm surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "cycle_ameliore", nom: "Système de cycle amélioré", description: "Cadence accrue mais recul et portée fortement dégradés.", modificateurs: { cadence_cpm: "+3%", velocite_ms: "-8%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-91.1%" } },
        { id: "fmj", nom: "5.7x28mm FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." }
      ]}
    ]
  },
  {
    id: "coda_9",
    nom: "Coda 9",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du Coda 9 (liste exhaustive, source codmunity.gg Warzone). Pistolet entièrement automatique (BO7).
    stats_base: {
      degats: 24, portee_m: 12, cadence_cpm: 938, velocite_ms: 280,
      capacite_chargeur: 20, vitesse_visee_ms: 180, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2375, gun_kick: 24.53, recul_horizontal: 15.29,
      recul_vertical: 34.32, mobilite: 5.1
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "kepler", nom: "Kepler Prism-IX Mini", description: "Mini viseur." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "suppresseur", nom: "Suppresseur Bowen 9mm", description: "Tir silencieux." },
        { id: "frein", nom: "Frein Hawker-9", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "compensateur", nom: "Compensateur H-9mm Precision", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "hawker_ported", nom: "Compensateur Hawker Ported", description: "Améliore le tir en glissade/saut." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+12.5%", vitesse_visee_ms: "+31%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_paragon", nom: "Canon court Paragon 4.1\"", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-11%", sprint_to_fire_ms: "-21%" } },
        { id: "canon_banisher", nom: "Canon vélocité Banisher 5.6\"", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "canon_halberd", nom: "Canon long Greaves Halberd 6.3\"", description: "Allonge la portée.", modificateurs: { portee_m: "+25%" } },
        { id: "canon_omen", nom: "Canon dégâts Omen 4.9\"", description: "Dégâts accrus mais recul nettement accru.", modificateurs: { gun_kick: "+30%", recul_horizontal: "+20%", recul_vertical: "+30%" } },
        { id: "canon_epsilon", nom: "Canon hybride LTI Epsilon-1 5\"", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+12.5%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide NanoFeed", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-20%", capacite_chargeur: "-5" } },
        { id: "mag_hellgate", nom: "Chargeur Hellgate", description: "+5 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+9%" } },
        { id: "mag_deltacell", nom: "Chargeur MFS DeltaCell Bulk", description: "+10 balles, recul fortement réduit et plus mobile, mais recharge plus lente.", modificateurs: { gun_kick: "-30%", recul_horizontal: "-30%", recul_vertical: "-30%", mobilite: "+14%", capacite_chargeur: "+10", vitesse_rechargement_ms: "+20%" }, effets_extra: { "Vitesse sprint": "+3%", "Mobilité ADS": "+17%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "express", nom: "Poignée Express (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-14%" } },
        { id: "pincer", nom: "Poignée Pincer (tir-sprint)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "muse", nom: "Poignée Muse (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" }, effets_extra: { "Recul 1re balle": "−50%" } },
        { id: "terra", nom: "Poignée Terra-1X", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-5%" } },
        { id: "st3_gloria", nom: "Poignée ST3-Gloria", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-7%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo Coda 9 (double)", description: "Double pistolet : recharge plus lente, recul accru.", modificateurs: { vitesse_rechargement_ms: "+13%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" } },
        { id: "discharge_ads", nom: "Mod décharge adaptative (ADS)", description: "Recul quasi nul et visée stable, mais cadence et mobilité fortement réduites.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-95%", recul_vertical: "-95%", vitesse_visee_ms: "+29%", sprint_to_fire_ms: "+26%", cadence_cpm: "-72.3%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "-4%", "Mobilité accroupi": "-10%", "Mobilité ADS": "-8%" } },
        { id: "discharge_hip", nom: "Mod décharge adaptative (hanche)", description: "Recul quasi nul, cadence accrue, mais mobilité réduite et visée plus lente.", modificateurs: { cadence_cpm: "+7%", gun_kick: "-13%", recul_horizontal: "-95%", recul_vertical: "-95%", vitesse_visee_ms: "+29%", sprint_to_fire_ms: "+26%", mobilite: "-6%" }, effets_extra: { "Vitesse sprint": "-4%", "Mobilité accroupi": "-10%", "Mobilité ADS": "-8%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pinpoint_2mw", nom: "Laser 2mW Pinpoint Pistol", description: "Précision tir à la hanche (visible)." },
        { id: "snap_4mw", nom: "Laser 4mW Snap", description: "Précision tir à la hanche (visible)." },
        { id: "laser_flex", nom: "Laser tactique Flex", description: "Précision tir à la hanche (visible)." },
        { id: "laser_pulse", nom: "Laser 1mW Pulse", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-17%" } },
        { id: "laser_kflash", nom: "Laser cible K-Flash", description: "Plus de portée (visible).", modificateurs: { portee_m: "+15%" } },
        { id: "tactical_adaptive", nom: "Laser tactique Adaptive", description: "Précision tir à la hanche (visible)." },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+22.2%" } },
        { id: "convergence", nom: "Laser Convergence Box", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "fmj", nom: "9mm Parabellum FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "surpressurise", nom: "9mm Parabellum surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "bolt_carrier", nom: "Groupe culasse (Bolt Carrier)", description: "Cadence accrue mais recul et portée dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-8%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%", portee_m: "-11.1%" } }
      ]}
    ]
  },
  {
    id: "pistolet_1911",
    nom: "1911",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Accessoires COMPLETS du 1911 (liste exhaustive, source codmunity.gg Warzone). Pistolet .45 semi-auto classique (BO7).
    stats_base: {
      degats: 40, portee_m: 16, cadence_cpm: 400, velocite_ms: 450,
      capacite_chargeur: 7, vitesse_visee_ms: 150, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2337, gun_kick: 36.63, recul_horizontal: 32.66,
      recul_vertical: 52.66, mobilite: 5.1
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique pistolet." },
        { id: "strix_thermal", nom: "VAS Strix 6x Thermal", description: "Lunette thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "supp_shade", nom: "Suppresseur Redwell Shade-X", description: "Discret, réduit le recul mais perd en vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-12.1%" } },
        { id: "p45_supp_mob", nom: "Suppresseur P-45 Strike Comp", description: "Améliore le tir en glissade/saut." },
        { id: "p45_supp", nom: "Suppresseur P-45 Strike", description: "Améliore le tir en glissade/saut." },
        { id: "compensateur", nom: "Compensateur Castle", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-13%", recul_vertical: "-13%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+9.1%", vitesse_visee_ms: "+33%" } },
        { id: "stentorian", nom: "Frein LTI Stentorian", description: "Bouche du Battle Pass S4." },
        { id: "auto_brake", nom: "Frein auto MFS Overdrive (full-auto)", description: "Convertit en tir automatique : cadence accrue, 1re balle réduite.", modificateurs: { cadence_cpm: "+25%" }, effets_extra: { "Recul 1re balle": "−25%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_longslide", nom: "Canon Long Slide 6.4\"", description: "Allonge fortement la portée.", modificateurs: { portee_m: "+33.3%" } },
        { id: "canon_vela", nom: "Canon Vela court 3.7\"", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-21%" } },
        { id: "canon_torx", nom: "Canon hybride Torx 4.5\"", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+25%", portee_m: "+18.2%" } },
        { id: "canon_tessellate", nom: "Canon vélocité Tessellate 5.1\"", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "canon_lout", nom: "Canon dégâts LTI Lout 4.5\"", description: "Dégâts accrus mais recul nettement accru.", modificateurs: { gun_kick: "+46%", recul_horizontal: "+20%", recul_vertical: "+50%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide Lucien", description: "Manie et recharge un peu plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-4%" } },
        { id: "mag_sirius", nom: "Chargeur étendu Sirius", description: "+3 balles.", modificateurs: { capacite_chargeur: "+3" } },
        { id: "mag_rigel2", nom: "Chargeur étendu Rigel II", description: "+8 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+8", vitesse_visee_ms: "+18%", sprint_to_fire_ms: "+17%", vitesse_rechargement_ms: "+8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "molt", nom: "Poignée Molt Regen (tir-sprint)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "eaves", nom: "Poignée Eaves Quick (Quickdraw)", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-42%" } },
        { id: "stencil", nom: "Poignée Stencil Control", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-8%" } },
        { id: "f4able", nom: "Poignée F4-Able (précision)", description: "Réduit le recul vertical et la 1re balle.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" }, effets_extra: { "Recul 1re balle": "−60%" } },
        { id: "interlock", nom: "Poignée Interlock Advanced", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-24%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo 1911 (double)", description: "Double pistolet : recharge et tir après sprint plus lents.", modificateurs: { sprint_to_fire_ms: "+4%", vitesse_rechargement_ms: "+15%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "xs1_tac", nom: "Laser tactique XS-1", description: "Précision tir à la hanche (visible)." },
        { id: "rapid_sight", nom: "Laser Rapid Sight Motion", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-17%" } },
        { id: "vector_sync", nom: "Laser Vector Sync", description: "Précision tir à la hanche (visible)." },
        { id: "airglide", nom: "Laser AirGlide Target", description: "Plus de portée (visible).", modificateurs: { portee_m: "+18.2%" } },
        { id: "zero_x", nom: "Laser Jäger Rapid Zero-X", description: "Précision tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: ".45 Cal FMJ", description: "Pénétration des surfaces (pas d'effet de stat notable)." },
        { id: "surpressurise", nom: ".45 Cal surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "sear", nom: "Gâchette rapide Sear", description: "Cadence accrue mais recul dégradé.", modificateurs: { cadence_cpm: "+11%", gun_kick: "+19%", recul_horizontal: "+15%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "siren",
    nom: "Siren",
    categorie: "Arme spéciale",
    jeu: "Black Ops 7",
    // Arme spéciale BO7 à projectile ricochet (« one-shot »). Stats de base RÉELLES (source codmunity.gg).
    stats_base: {
      degats: 120, portee_m: 30, cadence_cpm: 150, velocite_ms: 13,
      capacite_chargeur: 6, vitesse_visee_ms: 260, sprint_to_fire_ms: 230,
      vitesse_rechargement_ms: 3033, gun_kick: 20, recul_horizontal: 7.65,
      recul_vertical: 18.48, mobilite: 4.8
    },
    emplacements: [
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lancet", nom: "Poignée Lancet Tear (maniabilité)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-15%", sprint_to_fire_ms: "-17%" } },
        { id: "soma81", nom: "Poignée Soma-81 (mobilité)", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+6%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "deflection", nom: "Noyau MFS Deflection (ricochet)", description: "Projectile ricochet : +vélocité et +munitions, mais cadence réduite.", modificateurs: { velocite_ms: "+50%", capacite_chargeur: "+3", cadence_cpm: "-33%" } }
      ]}
    ]
  },
  {
    id: "nx_ravager",
    nom: "NX Ravager",
    categorie: "Arme spéciale",
    jeu: "Black Ops 7",
    // Arbalète (arme spéciale BO7). Stats de base RÉELLES (source codmunity.gg).
    stats_base: {
      degats: 120, portee_m: 50, cadence_cpm: 113, velocite_ms: 127,
      capacite_chargeur: 1, vitesse_visee_ms: 260, sprint_to_fire_ms: 180,
      vitesse_rechargement_ms: 2933, gun_kick: 25, recul_horizontal: 0.22,
      recul_vertical: 5, mobilite: 4.8
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell2x", nom: "Redwell 30-S 2x", description: "Lunette 2x." },
        { id: "ultrazoom", nom: "Greaves Ultra Zoom", description: "Lunette à zoom variable." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tribolt", nom: "TriBolt", description: "Tire 3 carreaux à la fois.", modificateurs: { capacite_chargeur: "+2" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "explosif", nom: "Carreau explosif", description: "Les carreaux explosent à l'impact." }
      ]}
    ]
  },
  {
    id: "cigma_2b",
    nom: "Cigma 2B",
    categorie: "Lanceur",
    jeu: "Black Ops 6",
    // Lanceur à verrouillage (anti-véhicule/streak). Stats simplifiées : un lanceur ne suit
    // pas le modèle des armes à feu (pas de recul/cadence classiques).
    stats_base: {
      degats: 200, portee_m: 70, cadence_cpm: 15, velocite_ms: 110,
      capacite_chargeur: 1, vitesse_visee_ms: 450, sprint_to_fire_ms: 320,
      vitesse_rechargement_ms: 4200, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 4.2
    },
    emplacements: []
  },
  // --- LANCEURS BLACK OPS 7 ---
  // Comme la mêlée, les lanceurs n'ont pas de stats chiffrées publiées : valeurs INDICATIVES.
  {
    id: "arc_m1",
    nom: "A.R.C. M1",
    categorie: "Lanceur",
    jeu: "Black Ops 7",
    stats_base: {
      degats: 150, portee_m: 80, cadence_cpm: 20, velocite_ms: 130,
      capacite_chargeur: 1, vitesse_visee_ms: 500, sprint_to_fire_ms: 350,
      vitesse_rechargement_ms: 4000, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 4.0
    },
    emplacements: []
  },
  {
    id: "aarow_109",
    nom: "AAROW 109",
    categorie: "Lanceur",
    jeu: "Black Ops 7",
    // Lanceur à verrouillage avec suivi de cible (anti-séries de points).
    stats_base: {
      degats: 130, portee_m: 90, cadence_cpm: 18, velocite_ms: 100,
      capacite_chargeur: 1, vitesse_visee_ms: 480, sprint_to_fire_ms: 340,
      vitesse_rechargement_ms: 4200, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 4.2
    },
    emplacements: []
  },
  // --- ARMES DE MÊLÉE (Black Ops 7) ---
  // Les armes de mêlée n'ont pas de stats chiffrées publiées ni d'accessoires en jeu.
  // Les valeurs ci-dessous sont INDICATIVES : elles traduisent surtout les différences
  // d'allonge (portee_m) et de maniabilité (mobilite) entre les armes.
  {
    id: "couteau",
    nom: "Couteau",
    categorie: "Arme de mêlée",
    jeu: "Black Ops 7",
    stats_base: {
      degats: 150, portee_m: 2, cadence_cpm: 60, velocite_ms: 0,
      capacite_chargeur: 0, vitesse_visee_ms: 0, sprint_to_fire_ms: 0,
      vitesse_rechargement_ms: 0, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 7.8
    },
    emplacements: []
  },
  {
    id: "flatline_mk2",
    nom: "Flatline Mk.II",
    categorie: "Arme de mêlée",
    jeu: "Black Ops 7",
    stats_base: {
      degats: 150, portee_m: 3, cadence_cpm: 50, velocite_ms: 0,
      capacite_chargeur: 0, vitesse_visee_ms: 0, sprint_to_fire_ms: 0,
      vitesse_rechargement_ms: 0, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 6.5
    },
    emplacements: []
  },
  {
    id: "couteau_balistique",
    nom: "Couteau balistique",
    categorie: "Arme de mêlée",
    jeu: "Black Ops 7",
    // Particularité : tire une lame -> a une portée, une vélocité et un « chargeur » d'une lame.
    stats_base: {
      degats: 150, portee_m: 25, cadence_cpm: 40, velocite_ms: 60,
      capacite_chargeur: 1, vitesse_visee_ms: 0, sprint_to_fire_ms: 0,
      vitesse_rechargement_ms: 1500, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 7.0
    },
    emplacements: []
  },
  {
    id: "katana",
    nom: "Katana",
    categorie: "Arme de mêlée",
    jeu: "Black Ops 7",
    stats_base: {
      degats: 160, portee_m: 4, cadence_cpm: 55, velocite_ms: 0,
      capacite_chargeur: 0, vitesse_visee_ms: 0, sprint_to_fire_ms: 0,
      vitesse_rechargement_ms: 0, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 6.8
    },
    emplacements: []
  },
  {
    id: "poings",
    nom: "Poings",
    categorie: "Arme de mêlée",
    jeu: "Black Ops 7",
    stats_base: {
      degats: 120, portee_m: 1.5, cadence_cpm: 80, velocite_ms: 0,
      capacite_chargeur: 0, vitesse_visee_ms: 0, sprint_to_fire_ms: 0,
      vitesse_rechargement_ms: 0, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 8
    },
    emplacements: []
  },
  {
    id: "h311_saw",
    nom: "H311-SAW",
    categorie: "Arme de mêlée",
    jeu: "Black Ops 7",
    stats_base: {
      degats: 160, portee_m: 2.5, cadence_cpm: 45, velocite_ms: 0,
      capacite_chargeur: 0, vitesse_visee_ms: 0, sprint_to_fire_ms: 0,
      vitesse_rechargement_ms: 0, gun_kick: 0, recul_horizontal: 0,
      recul_vertical: 0, mobilite: 6.0
    },
    emplacements: []
  }
,
  {
    id: "9mm_pm",
    nom: "9MM PM",
    categorie: "Pistolet",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 37, portee_m: 21, cadence_cpm: 400, velocite_ms: 340, capacite_chargeur: 10, vitesse_visee_ms: 150, sprint_to_fire_ms: 100, vitesse_rechargement_ms: 2160, gun_kick: 43, recul_horizontal: 24.42, recul_vertical: 41.25, mobilite: 5.2 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "gs45",
    nom: "GS45",
    categorie: "Pistolet",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 52, portee_m: 22.9, cadence_cpm: 300, velocite_ms: 375, capacite_chargeur: 10, vitesse_visee_ms: 170, sprint_to_fire_ms: 110, vitesse_rechargement_ms: 2430, gun_kick: 45, recul_horizontal: 39.51, recul_vertical: 63.42, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "stryder_22",
    nom: "Stryder .22",
    categorie: "Pistolet",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 29, portee_m: 19.7, cadence_cpm: 545, velocite_ms: 310, capacite_chargeur: 30, vitesse_visee_ms: 140, sprint_to_fire_ms: 90, vitesse_rechargement_ms: 2000, gun_kick: 31.45, recul_horizontal: 6.75, recul_vertical: 43.71, mobilite: 5.3 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "gravemark_357_revolver",
    nom: "Gravemark .357 Revolver",
    categorie: "Pistolet",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 87, portee_m: 45.7, cadence_cpm: 171, velocite_ms: 375, capacite_chargeur: 8, vitesse_visee_ms: 150, sprint_to_fire_ms: 110, vitesse_rechargement_ms: 8310, gun_kick: 200, recul_horizontal: 25.36, recul_vertical: 54.38, mobilite: 5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"canon","label":"Canon","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"c_long","nom":"Canon long","modificateurs":{"portee_m":"+12%","velocite_ms":"+10%","vitesse_visee_ms":"+8%","mobilite":"-4%"}},{"id":"c_court","nom":"Canon court","modificateurs":{"vitesse_visee_ms":"-8%","sprint_to_fire_ms":"-8%","mobilite":"+5%","portee_m":"-8%"}},{"id":"c_renf","nom":"Canon renforcé","modificateurs":{"recul_vertical":"-6%","portee_m":"+6%","vitesse_visee_ms":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]},{"id":"laser","label":"Laser","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"l_vise","nom":"Laser de visée","modificateurs":{"sprint_to_fire_ms":"-10%"},"effets_extra":{"Tir à la hanche":"+10%","Mobilité ADS":"+8%"}}]}]
  },
  {
    id: "sirin_9mm",
    nom: "Sirin 9mm",
    categorie: "Arme spéciale",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 30, portee_m: 23.5, cadence_cpm: 500, velocite_ms: 480, capacite_chargeur: 32, vitesse_visee_ms: 200, sprint_to_fire_ms: 120, vitesse_rechargement_ms: 2760, gun_kick: 47.32, recul_horizontal: 7.12, recul_vertical: 69.69, mobilite: 5.1 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]}]
  },
  {
    id: "d1_3_sector",
    nom: "D1.3 Sector",
    categorie: "Arme spéciale",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 150, portee_m: 0, cadence_cpm: 82, velocite_ms: 76.2, capacite_chargeur: 5, vitesse_visee_ms: 300, sprint_to_fire_ms: 230, vitesse_rechargement_ms: 3260, gun_kick: 0, recul_horizontal: 0, recul_vertical: 0, mobilite: 4.4 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]}]
  },
  {
    id: "nail_gun",
    nom: "Nail Gun",
    categorie: "Arme spéciale",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 34, portee_m: 15.2, cadence_cpm: 517, velocite_ms: 100, capacite_chargeur: 20, vitesse_visee_ms: 180, sprint_to_fire_ms: 100, vitesse_rechargement_ms: 2167, gun_kick: 5, recul_horizontal: 4.19, recul_vertical: 59.85, mobilite: 5 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]}]
  },
  {
    id: "olympia",
    nom: "Olympia",
    categorie: "Arme spéciale",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 80, portee_m: 25, cadence_cpm: 171, velocite_ms: 280, capacite_chargeur: 2, vitesse_visee_ms: 375, sprint_to_fire_ms: 200, vitesse_rechargement_ms: 3830, gun_kick: 56.8, recul_horizontal: 15.11, recul_vertical: 85.68, mobilite: 4.7 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]}]
  },
  {
    id: "merrick_556",
    nom: "Merrick 556",
    categorie: "Arme spéciale",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 24, portee_m: 50.8, cadence_cpm: 732, velocite_ms: 840, capacite_chargeur: 30, vitesse_visee_ms: 300, sprint_to_fire_ms: 210, vitesse_rechargement_ms: 2860, gun_kick: 23.6, recul_horizontal: 11.6, recul_vertical: 45.03, mobilite: 4.9 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]}]
  },
  {
    id: "x52_resonator",
    nom: "X52 Resonator",
    categorie: "Arme spéciale",
    jeu: "Black Ops 6",
    // Black Ops 6 — stats codmunity.gg. Accessoires : set générique (vrais accessoires à venir).
    stats_base: { degats: 13, portee_m: 0, cadence_cpm: 1200, velocite_ms: 3000, capacite_chargeur: 70, vitesse_visee_ms: 350, sprint_to_fire_ms: 130, vitesse_rechargement_ms: 3130, gun_kick: 18.36, recul_horizontal: 16.13, recul_vertical: 42.01, mobilite: 4.8 },
    emplacements: [{"id":"optique","label":"Optique","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"opt_rd","nom":"Point rouge"},{"id":"opt_holo","nom":"Holographique"},{"id":"opt_3x","nom":"Lunette 3x","modificateurs":{"vitesse_visee_ms":"+6%"}}]},{"id":"bouche","label":"Bouche","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"b_sup","nom":"Suppresseur","modificateurs":{"velocite_ms":"+6%","recul_vertical":"-4%","vitesse_visee_ms":"+4%"}},{"id":"b_comp","nom":"Compensateur","modificateurs":{"recul_horizontal":"-9%","recul_vertical":"-6%","vitesse_visee_ms":"+3%"}},{"id":"b_frein","nom":"Frein de bouche","modificateurs":{"recul_vertical":"-11%","recul_horizontal":"+5%"}}]},{"id":"chargeur","label":"Chargeur","options":[{"id":"aucun","nom":"— Aucun —"},{"id":"ch_ext","nom":"Chargeur étendu","modificateurs":{"capacite_chargeur":"+10","vitesse_rechargement_ms":"+12%","vitesse_visee_ms":"+4%"}},{"id":"ch_rap","nom":"Chargeur rapide","modificateurs":{"vitesse_rechargement_ms":"-16%"}}]}]
  }
];

/* ============================================================
   ATOUTS & ÉQUIPEMENT — différents selon le MODE (Warzone / Black Ops).
   Les deux modes utilisent les mêmes identifiants d'emplacements
   (slot1/2/3 pour les atouts ; letal/tactique/terrain pour l'équipement),
   mais les OPTIONS diffèrent (c'est là toute la différence entre les modes).
   ============================================================ */

// --- ATOUTS : MODE WARZONE ---
const ATOUTS_WARZONE = [
  { id: "slot1", label: "Atout 1", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "double_time", nom: "Sprint prolongé", description: "Augmente la durée du sprint tactique.", modificateurs: { mobilite: "+8%" } },
    { id: "scavenger", nom: "Charognard", description: "Récupère des munitions sur les ennemis abattus." },
    { id: "bomb_squad", nom: "Démineur", description: "Réduit les dégâts subis par les explosifs." }
  ]},
  { id: "slot2", label: "Atout 2", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "overkill", nom: "Carnage", description: "Permet de porter deux armes principales." },
    { id: "ghost", nom: "Fantôme", description: "Invisible aux UAV et drones de reconnaissance." },
    { id: "fast_hands", nom: "Mains agiles", description: "Rechargement et manipulations plus rapides.", modificateurs: { vitesse_rechargement_ms: "-15%" } }
  ]},
  { id: "slot3", label: "Atout 3", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "high_alert", nom: "Vigilance", description: "Détecte les ennemis qui te repèrent." },
    { id: "steady_aim", nom: "Visée stable", description: "Réduit le recul caméra de l'arme.", modificateurs: { gun_kick: "-10%" } },
    { id: "tracker", nom: "Pisteur", description: "Affiche les traces de pas des ennemis." }
  ]}
];

// --- ATOUTS : MODE BLACK OPS 7 ---
// Système BO7 : 3 emplacements (Niveau 1/2/3), un atout par niveau.
// Chaque atout est de type Offense / Furtivité / Support — réunir 3 atouts du
// même type active une spécialité (Enforcer / Recon / Stratège).
// (Liste de la bêta ouverte BO7 — peut évoluer.)
const ATOUTS_BLACKOPS = [
  { id: "slot1", label: "Atout — Niveau 1", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "charognard", nom: "Charognard", description: "Offense — Récupère munitions et équipement sur les ennemis abattus." },
    { id: "legerete", nom: "Légèreté", description: "Offense — Vitesse de déplacement accrue ; sauts, glissades et plongeons plus longs.", modificateurs: { mobilite: "+7%" } },
    { id: "gung_ho", nom: "Gung-Ho", description: "Offense — Tire en sprintant ; plus mobile en rechargeant ou utilisant l'équipement." },
    { id: "sang_froid", nom: "Sang-froid", description: "Furtivité — Indétectable par le ciblage IA et les optiques thermiques." },
    { id: "fantome", nom: "Fantôme", description: "Furtivité — Indétectable par le Scout Pulse et l'UAV en mouvement." },
    { id: "ninja", nom: "Ninja", description: "Furtivité — Déplacements plus silencieux." },
    { id: "masque_tech", nom: "Masque tech", description: "Support — Résiste aux flash, commotions et gaz ; immunisé à l'EMP et au piratage." },
    { id: "gilet", nom: "Gilet pare-éclats", description: "Support — Réduit les dégâts explosifs et incendiaires." },
    { id: "ombre", nom: "Ombre", description: "Support — Indétectable par les pièges et mines ennemis." }
  ]},
  { id: "slot2", label: "Atout — Niveau 2", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "assassin", nom: "Assassin", description: "Offense — Marque les ennemis en série ; ils lâchent des packs de prime." },
    { id: "combat_rapproche", nom: "Combat rapproché", description: "Offense — Déclenche automatiquement l'attaque de mêlée dédiée." },
    { id: "instinct", nom: "Instinct de chasseur", description: "Offense — Tuer un ennemi marque la direction du suivant." },
    { id: "looper", nom: "Looper", description: "Offense — Permet de regagner des séries de points dans la même vie." },
    { id: "vigilance", nom: "Vigilance", description: "Furtivité — Alerte quand tu apparais sur une mini-carte ennemie ; immunité CUAV / Brouilleur / Vendetta." },
    { id: "lien_explosif", nom: "Lien explosif", description: "Furtivité — Tes dégâts explosifs marquent les ennemis sur la mini-carte." },
    { id: "ingenieur", nom: "Ingénieur", description: "Furtivité — Voit l'équipement et les séries ennemis à travers les murs." },
    { id: "mains_agiles", nom: "Mains agiles", description: "Support — Rechargement et changement d'arme plus rapides.", modificateurs: { vitesse_rechargement_ms: "-15%" } },
    { id: "bricoleur", nom: "Bricoleur", description: "Support — Deux charges d'atout de terrain ; piège les colis de ravitaillement." }
  ]},
  { id: "slot3", label: "Atout — Niveau 3", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "dexterite", nom: "Dextérité", description: "Offense — Visée complète en glissade, plongeon et saut mural ; moins de dégâts de chute." },
    { id: "sprinteur_tac", nom: "Sprinteur tactique", description: "Offense — Active le sprint tactique mais réduit la vitesse de sprint normale." },
    { id: "bankroll", nom: "Pactole", description: "Offense — Commence chaque vie avec +150 points de série." },
    { id: "cogneur", nom: "Cogneur", description: "Offense — Les éliminations au corps à corps régénèrent la santé et rapportent des points." },
    { id: "pisteur", nom: "Pisteur", description: "Furtivité — Localise les ennemis proches, montre leurs traces de pas, auto-ping en visant." },
    { id: "vendetta", nom: "Vendetta", description: "Furtivité — Au réapparition, marque la position de ton tueur ; bonus pour l'éliminer." },
    { id: "intendant", nom: "Intendant", description: "Support — Recharge les utilisations d'équipement avec le temps." },
    { id: "lien_charge", nom: "Lien de charge", description: "Support — Recharge d'atout de terrain plus rapide ; bénéfice partagé aux alliés." },
    { id: "gardien", nom: "Gardien", description: "Support — Soin plus rapide sur les objectifs ; réanime les alliés plus vite." }
  ]}
];

/* ------------------------------------------------------------
   ÉQUIPEMENT (létal, tactique, atout de terrain) selon le mode.
   ------------------------------------------------------------ */

// --- ÉQUIPEMENT : MODE WARZONE ---
const EQUIPEMENTS_WARZONE = [
  { id: "letal", label: "Équipement létal", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "frag", nom: "Grenade à fragmentation", description: "Grenade à délai, peut être cuisinée pour exploser en l'air." },
    { id: "semtex", nom: "Semtex", description: "Grenade collante à explosion rapide." },
    { id: "couteau", nom: "Couteau de lancer", description: "Élimination en un coup, récupérable sur les ennemis." },
    { id: "thermite", nom: "Thermite", description: "Colle à la cible et inflige des dégâts de feu dans la durée." },
    { id: "molotov", nom: "Cocktail Molotov", description: "Crée une zone enflammée qui inflige des dégâts continus." },
    { id: "c4", nom: "C4", description: "Gros explosif collant à détonation à distance." },
    { id: "charge_perforante", nom: "Charge perforante", description: "Se fixe dans une surface et explose de l'autre côté (perce les murs)." },
    { id: "mine", nom: "Mine de proximité", description: "Se déclenche au passage d'un ennemi." },
    { id: "claymore", nom: "Claymore", description: "Mine directionnelle déclenchée par détection." }
  ]},
  { id: "tactique", label: "Équipement tactique", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "stun", nom: "Grenade paralysante", description: "Ralentit les déplacements et la visée des ennemis." },
    { id: "flash", nom: "Grenade aveuglante", description: "Aveugle et assourdit les ennemis." },
    { id: "fumigene", nom: "Grenade fumigène", description: "Déploie un écran de fumée." },
    { id: "snapshot", nom: "Grenade Snapshot", description: "Révèle brièvement la position des ennemis proches." },
    { id: "leurre", nom: "Leurre", description: "Simule des bruits de tir pour tromper l'ennemi." },
    { id: "stim", nom: "Stim", description: "Régénère la santé et relance le sprint tactique." },
    { id: "detecteur", nom: "Détecteur de rythme cardiaque", description: "Repère les ennemis proches sur un mini-scanner." },
    { id: "gaz", nom: "Grenade à gaz", description: "Libère un nuage de gaz qui ralentit et endommage." }
  ]}
  // Pas d'atout de terrain en Warzone : il ne fait pas partie de la classe (ramassé/acheté en partie).
];

// --- ÉQUIPEMENT : MODE BLACK OPS (multijoueur) ---
const EQUIPEMENTS_BLACKOPS = [
  { id: "letal", label: "Équipement létal", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "frag", nom: "Grenade à fragmentation", description: "Grenade à fragmentation à délai (peut être cuisinée)." },
    { id: "cluster", nom: "Grenade à fragmentation en grappe", description: "Disperse de plus petits explosifs en détonant." },
    { id: "sticky", nom: "Grenade collante", description: "Grenade collante à retardement." },
    { id: "needle_drone", nom: "Drone aiguille", description: "Petit drone volant qui explose à l'impact (auto ou manuel)." },
    { id: "molotov", nom: "Cocktail Molotov", description: "Arme incendiaire : crée une zone enflammée." },
    { id: "point_turret", nom: "Tourelle ponctuelle", description: "Petite tourelle déployable qui tire automatiquement sur les ennemis." },
    { id: "c4", nom: "C4", description: "Gros explosif collant, détonation à distance ou immédiate." },
    { id: "combat_axe", nom: "Hache de combat", description: "Hache de lancer, élimination en un coup ; rebondit sur les surfaces." }
  ]},
  { id: "tactique", label: "Équipement tactique", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "stun", nom: "Grenade paralysante", description: "Ralentit les déplacements et la visée de la victime." },
    { id: "emp", nom: "Grenade EMP", description: "Désactive ou détruit l'électronique (équipements, séries, joueurs)." },
    { id: "decoy", nom: "Leurre", description: "Simule des bruits de tir pour tromper l'ennemi ; colle aux surfaces." },
    { id: "pinpoint", nom: "Grenade de repérage", description: "Détecte les ennemis à portée et les marque d'un traceur." },
    { id: "flash", nom: "Grenade aveuglante", description: "Aveugle et assourdit les cibles." },
    { id: "stim", nom: "Stim", description: "Stimulant militaire qui soigne rapidement les blessures." },
    { id: "psych", nom: "Grenade psychotrope", description: "Explose à l'impact et libère un nuage de gaz hallucinogène." },
    { id: "fumigene", nom: "Grenade fumigène", description: "Déploie un écran de fumée qui bloque la vue et le ciblage auto." },
    { id: "hunter_bot", nom: "Drone chasseur", description: "Drone défensif : cible l'équipement/les séries ennemis, contre les grenades." }
  ]},
  { id: "terrain", label: "Atout de terrain", options: [
    { id: "aucun", nom: "— Aucun —" },
    { id: "assault_pack", nom: "Sacoche d'assaut", description: "Distribue des munitions et accélère les séries de points." },
    { id: "trophy", nom: "Système anti-missile", description: "Détruit les projectiles ennemis proches." },
    { id: "scrambler", nom: "Brouilleur", description: "Brouille la mini-carte des ennemis proches." },
    { id: "insertion", nom: "Insertion tactique", description: "Définit ton point de réapparition." },
    { id: "sleeper", nom: "Agent dormant", description: "Te déguise brièvement en allié pour l'ennemi." }
  ]}
];


/* ------------------------------------------------------------
   PALIERS DE DÉGÂTS PAR DISTANCE (corps) — source codmunity (BO6/BO7).
   Pour chaque arme : [{ m: distance_min_m, deg: dégâts_corps }].
   Le dernier palier sappplique au-delà de sa distance. deg 0 = hors de portée.
   Utilisé pour le tableau TTK selon la distance. Enrichissable par lot.
   ------------------------------------------------------------ */
const DEGATS_PALIERS = {
  krig_c: [{ m: 0, deg: 28 }, { m: 41.9, deg: 22 }],
  c9: [{ m: 0, deg: 26 }, { m: 15.2, deg: 22 }, { m: 20.3, deg: 18 }, { m: 33, deg: 15 }],
  xmg: [{ m: 0, deg: 29 }, { m: 61, deg: 22 }],
  tsarkov_762: [{ m: 0, deg: 75 }, { m: 43.2, deg: 60 }, { m: 71.1, deg: 47 }],
  lr_762: [{ m: 0, deg: 112 }, { m: 76.2, deg: 110 }, { m: 101.6, deg: 108 }],
  m15_mod0: [{ m: 0, deg: 21 }, { m: 30, deg: 18 }, { m: 46, deg: 17 }],
  ak_27: [{ m: 0, deg: 26 }, { m: 23, deg: 22 }, { m: 51, deg: 22 }],
  mxr_17: [{ m: 0, deg: 35 }, { m: 33, deg: 34 }, { m: 52, deg: 26 }],
  peacekeeper_mk1: [{ m: 0, deg: 23 }, { m: 15, deg: 22 }, { m: 25, deg: 18 }, { m: 39, deg: 15 }],
  egrt_17: [{ m: 0, deg: 22 }, { m: 44, deg: 19 }, { m: 58, deg: 16 }],
  voyak_kt3: [{ m: 0, deg: 29 }, { m: 25, deg: 23 }, { m: 41, deg: 19 }],
  mk35_isr: [{ m: 0, deg: 24 }, { m: 42, deg: 19 }],
  x9_maverick: [{ m: 0, deg: 34 }, { m: 17, deg: 32 }, { m: 29, deg: 30 }, { m: 43, deg: 23 }],
  maddox_rfb: [{ m: 0, deg: 28 }, { m: 13, deg: 22 }, { m: 28, deg: 19 }],
  ds20_mirage: [{ m: 0, deg: 27 }, { m: 25, deg: 23 }, { m: 44, deg: 21 }],
  kogot_7: [{ m: 0, deg: 23 }, { m: 13, deg: 19 }, { m: 20, deg: 16 }, { m: 25, deg: 13 }],
  mpc_25: [{ m: 0, deg: 30 }, { m: 10, deg: 23 }, { m: 15, deg: 19 }, { m: 26, deg: 16 }],
  carbon_57: [{ m: 0, deg: 24 }, { m: 15, deg: 19 }, { m: 25, deg: 16 }, { m: 36, deg: 14 }],
  sturmwolf_45: [{ m: 0, deg: 30 }, { m: 11, deg: 23 }, { m: 18, deg: 19 }, { m: 26, deg: 16 }],
  ryden_45k: [{ m: 0, deg: 22 }, { m: 12, deg: 21 }, { m: 18, deg: 15 }, { m: 34, deg: 13 }],
  rk_9: [{ m: 0, deg: 34 }, { m: 10, deg: 32 }, { m: 22, deg: 24 }, { m: 30, deg: 19 }],
  dravec_45: [{ m: 0, deg: 26 }, { m: 11, deg: 21 }, { m: 18, deg: 17 }, { m: 27, deg: 15 }],
  vst: [{ m: 0, deg: 20 }, { m: 8, deg: 18 }, { m: 12, deg: 15 }, { m: 23, deg: 12 }],
  razor_9mm: [{ m: 0, deg: 21 }, { m: 13, deg: 18 }, { m: 20, deg: 14 }, { m: 30, deg: 12 }],
  rev_46: [{ m: 0, deg: 17 }, { m: 13, deg: 15 }, { m: 23, deg: 12 }, { m: 33, deg: 10 }],
  mk78: [{ m: 0, deg: 31 }, { m: 41, deg: 24 }, { m: 61, deg: 23 }],
  xm325: [{ m: 0, deg: 23 }, { m: 36, deg: 18 }, { m: 51, deg: 16 }],
  sokol_545: [{ m: 0, deg: 35 }, { m: 51, deg: 34 }, { m: 71, deg: 26 }],
  strider_300: [{ m: 0, deg: 112 }, { m: 66, deg: 98 }],
  hawker_hx: [{ m: 0, deg: 117 }, { m: 76, deg: 107 }],
  xr3_ion: [{ m: 0, deg: 99 }],
  shadow_sk: [{ m: 0, deg: 112 }, { m: 51, deg: 106 }, { m: 76, deg: 98 }],
  vs_recon: [{ m: 0, deg: 112 }, { m: 64, deg: 106 }, { m: 89, deg: 98 }],
  swordfish_a1: [{ m: 0, deg: 37 }, { m: 38, deg: 32 }],
  m8a1: [{ m: 0, deg: 30 }, { m: 36, deg: 29 }, { m: 48, deg: 24 }],
  m34_novaline: [{ m: 0, deg: 50 }, { m: 66, deg: 40 }],
  warden_308: [{ m: 0, deg: 101 }, { m: 42, deg: 97 }, { m: 57, deg: 60 }],
  m10_breacher: [{ m: 0, deg: 220 }, { m: 3.3, deg: 200 }, { m: 8.4, deg: 151 }, { m: 16.5, deg: 90 }, { m: 30.5, deg: 0 }],
  echo_12: [{ m: 0, deg: 148 }, { m: 3, deg: 128 }, { m: 10.2, deg: 103 }, { m: 20.8, deg: 64 }, { m: 35.6, deg: 0 }],
  akita: [{ m: 0, deg: 81 }, { m: 2.5, deg: 59 }, { m: 6.4, deg: 44 }, { m: 12.1, deg: 30 }, { m: 23.5, deg: 0 }],
  grekhova: [{ m: 0, deg: 20 }, { m: 8.3, deg: 17 }, { m: 17.8, deg: 15 }, { m: 21.6, deg: 13 }],
  jager_45: [{ m: 0, deg: 31 }, { m: 15, deg: 29 }, { m: 27, deg: 23 }],
  velox_57: [{ m: 0, deg: 33 }, { m: 6, deg: 30 }, { m: 20, deg: 20 }, { m: 25, deg: 19 }],
  coda_9: [{ m: 0, deg: 20 }, { m: 9, deg: 17 }, { m: 14, deg: 13 }, { m: 20, deg: 11 }],
  pistolet_1911: [{ m: 0, deg: 50 }, { m: 10, deg: 47 }, { m: 15, deg: 45 }, { m: 24, deg: 34 }],
  siren: [{ m: 0, deg: 100 }],
  nx_ravager: [{ m: 0, deg: 150 }],
  krs_762: [{ m: 0, deg: 84 }, { m: 36, deg: 54 }, { m: 52, deg: 50 }],
  cbrs_3: [{ m: 0, deg: 29 }, { m: 15, deg: 23 }, { m: 25, deg: 19 }, { m: 34, deg: 16 }],
  "xm4": [{ m: 0, deg: 22 }, { m: 40.6, deg: 19 }],
  "ak_74": [{ m: 0, deg: 29 }, { m: 11.4, deg: 27 }, { m: 40.6, deg: 22 }],
  "ames_85": [{ m: 0, deg: 23 }, { m: 15.2, deg: 22 }, { m: 50.8, deg: 19 }],
  "gpr_91": [{ m: 0, deg: 23 }, { m: 45.7, deg: 19 }],
  "model_l": [{ m: 0, deg: 28 }, { m: 44.4, deg: 22 }],
  "goblin_mk_2": [{ m: 0, deg: 36 }, { m: 33, deg: 30 }, { m: 48.3, deg: 26 }],
  "as_val": [{ m: 0, deg: 22 }, { m: 19.1, deg: 19 }, { m: 43.2, deg: 16 }],
  "cypher_091": [{ m: 0, deg: 30 }, { m: 47, deg: 23 }],
  "kilo_141": [{ m: 0, deg: 23 }, { m: 26.7, deg: 21 }, { m: 55.9, deg: 19 }],
  "cr_56_amax": [{ m: 0, deg: 30 }, { m: 24.1, deg: 28 }, { m: 48.3, deg: 23 }],
  "ffar_1": [{ m: 0, deg: 21 }, { m: 16.5, deg: 19 }, { m: 31.7, deg: 18 }, { m: 41.9, deg: 16 }],
  "abr_a1": [{ m: 0, deg: 32 }, { m: 34.3, deg: 24 }],
  "ksv": [{ m: 0, deg: 26 }, { m: 12.7, deg: 21 }, { m: 19.6, deg: 15 }, { m: 31.8, deg: 13 }],
  "tanto_22": [{ m: 0, deg: 38 }, { m: 8.9, deg: 34 }, { m: 20.3, deg: 29 }, { m: 30.5, deg: 22 }],
  "pp_919": [{ m: 0, deg: 25 }, { m: 18.4, deg: 21 }, { m: 24.1, deg: 18 }, { m: 34.3, deg: 15 }],
  "jackal_pdw": [{ m: 0, deg: 26 }, { m: 15.9, deg: 22 }, { m: 21.6, deg: 17 }, { m: 29.2, deg: 16 }],
  "kompakt_92": [{ m: 0, deg: 20 }, { m: 13.3, deg: 17 }, { m: 19.1, deg: 13 }, { m: 27.9, deg: 11 }],
  "saug": [{ m: 0, deg: 21 }, { m: 13.3, deg: 18 }, { m: 22.9, deg: 15 }, { m: 29.8, deg: 12 }],
  "ppsh_41": [{ m: 0, deg: 22 }, { m: 13.6, deg: 19 }, { m: 23.3, deg: 15 }, { m: 31.8, deg: 13 }],
  "ladra": [{ m: 0, deg: 19 }, { m: 19.7, deg: 16 }, { m: 23.5, deg: 14 }, { m: 33, deg: 11 }],
  "lc10": [{ m: 0, deg: 22 }, { m: 21.6, deg: 18 }, { m: 38.1, deg: 15 }],
  "pu_21": [{ m: 0, deg: 27 }, { m: 45.7, deg: 21 }],
  "gpmg_7": [{ m: 0, deg: 23 }, { m: 55.9, deg: 19 }],
  "feng_82": [{ m: 0, deg: 38 }, { m: 30.5, deg: 35 }, { m: 41.9, deg: 28 }],
  "pml_5_56": [{ m: 0, deg: 30 }, { m: 26.7, deg: 28 }, { m: 55.9, deg: 22 }],
  "swat_5_56": [{ m: 0, deg: 39 }, { m: 31.8, deg: 34 }, { m: 43.2, deg: 32 }],
  "aek_973": [{ m: 0, deg: 42 }, { m: 34.3, deg: 34 }, { m: 53.3, deg: 33 }],
  "dm_10": [{ m: 0, deg: 65 }, { m: 38.1, deg: 42 }, { m: 55.9, deg: 38 }, { m: 69.8, deg: 34 }],
  "tr2": [{ m: 0, deg: 44 }, { m: 35.6, deg: 40 }, { m: 50.8, deg: 29 }],
  "essex_model_07": [{ m: 0, deg: 100 }, { m: 33, deg: 90 }, { m: 66, deg: 80 }],
  "lw3a1_frostline": [{ m: 0, deg: 104 }, { m: 63.5, deg: 102 }, { m: 88.9, deg: 95 }],
  "svd": [{ m: 0, deg: 104 }, { m: 50.8, deg: 102 }, { m: 76.2, deg: 98 }],
  "amr_mod_4": [{ m: 0, deg: 204 }, { m: 88.9, deg: 200 }, { m: 127, deg: 198 }],
  "hdr": [{ m: 0, deg: 104 }, { m: 88.9, deg: 102 }, { m: 127, deg: 95 }],
  "9mm_pm": [{ m: 0, deg: 37 }, { m: 10.8, deg: 34 }, { m: 21, deg: 29 }],
  "gs45": [{ m: 0, deg: 52 }, { m: 7.6, deg: 43 }, { m: 22.9, deg: 32 }],
  "stryder_22": [{ m: 0, deg: 29 }, { m: 9.5, deg: 26 }, { m: 19.7, deg: 22 }],
  "gravemark_357_revolver": [{ m: 0, deg: 87 }, { m: 8.9, deg: 62 }, { m: 30.5, deg: 50 }, { m: 45.7, deg: 46 }],
  "sirin_9mm": [{ m: 0, deg: 30 }, { m: 7, deg: 26 }, { m: 16.6, deg: 21 }, { m: 23.5, deg: 17 }],
  "d1_3_sector": [{ m: 0, deg: 150 }],
  "nail_gun": [{ m: 0, deg: 34 }, { m: 7.6, deg: 32 }, { m: 15.2, deg: 24 }],
  "merrick_556": [{ m: 0, deg: 24 }, { m: 50.8, deg: 19 }],
  "dresden_9mm": [{ m: 0, deg: 34 }, { m: 10.2, deg: 30 }, { m: 17.8, deg: 23 }, { m: 26.7, deg: 19 }],
  "x52_resonator": [{ m: 0, deg: 13 }]
};


/* ------------------------------------------------------------
   DÉGÂTS PAR PARTIE DU CORPS (courte portée) — source codmunity.
   { head, neck, chest, stomach, arm, leg } par arme. Pour le mannequin.
   ------------------------------------------------------------ */
const DEGATS_PARTIES = {
  krig_c: { head: 35, neck: 28, chest: 28, stomach: 28, arm: 28, leg: 28 },
  c9: { head: 33, neck: 26, chest: 26, stomach: 26, arm: 26, leg: 26 },
  xmg: { head: 34, neck: 29, chest: 29, stomach: 29, arm: 29, leg: 29 },
  tsarkov_762: { head: 105, neck: 75, chest: 75, stomach: 75, arm: 75, leg: 75 },
  lr_762: { head: 306, neck: 204, chest: 112, stomach: 102, arm: 104, leg: 100 },
  m15_mod0: { head: 27, neck: 21, chest: 21, stomach: 21, arm: 21, leg: 21 },
  ak_27: { head: 35, neck: 26, chest: 26, stomach: 26, arm: 26, leg: 26 },
  mxr_17: { head: 38, neck: 35, chest: 35, stomach: 32, arm: 32, leg: 32 },
  peacekeeper_mk1: { head: 28, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  egrt_17: { head: 26, neck: 22, chest: 22, stomach: 22, arm: 22, leg: 22 },
  voyak_kt3: { head: 34, neck: 29, chest: 29, stomach: 29, arm: 29, leg: 29 },
  mk35_isr: { head: 27, neck: 24, chest: 24, stomach: 24, arm: 24, leg: 24 },
  x9_maverick: { head: 42, neck: 34, chest: 34, stomach: 33, arm: 34, leg: 33 },
  maddox_rfb: { head: 32, neck: 28, chest: 28, stomach: 28, arm: 28, leg: 28 },
  ds20_mirage: { head: 35, neck: 27, chest: 27, stomach: 27, arm: 27, leg: 27 },
  kogot_7: { head: 25, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  mpc_25: { head: 34, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  carbon_57: { head: 27, neck: 24, chest: 24, stomach: 24, arm: 24, leg: 24 },
  sturmwolf_45: { head: 37, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  ryden_45k: { head: 27, neck: 22, chest: 22, stomach: 22, arm: 22, leg: 22 },
  rk_9: { head: 40, neck: 34, chest: 34, stomach: 32, arm: 32, leg: 32 },
  dravec_45: { head: 33, neck: 26, chest: 26, stomach: 26, arm: 26, leg: 26 },
  vst: { head: 23, neck: 20, chest: 20, stomach: 20, arm: 20, leg: 20 },
  razor_9mm: { head: 26, neck: 21, chest: 21, stomach: 21, arm: 21, leg: 21 },
  rev_46: { head: 21, neck: 17, chest: 17, stomach: 17, arm: 17, leg: 17 },
  mk78: { head: 37, neck: 31, chest: 31, stomach: 31, arm: 31, leg: 31 },
  xm325: { head: 29, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  sokol_545: { head: 38, neck: 38, chest: 35, stomach: 32, arm: 32, leg: 32 },
  strider_300: { head: 336, neck: 224, chest: 112, stomach: 91, arm: 112, leg: 91 },
  hawker_hx: { head: 294, neck: 196, chest: 117, stomach: 107, arm: 117, leg: 98 },
  xr3_ion: { head: 270, neck: 180, chest: 99, stomach: 90, arm: 91, leg: 81 },
  shadow_sk: { head: 336, neck: 224, chest: 112, stomach: 105, arm: 112, leg: 97 },
  vs_recon: { head: 336, neck: 224, chest: 112, stomach: 109, arm: 112, leg: 100 },
  swordfish_a1: { head: 40, neck: 37, chest: 37, stomach: 31, arm: 31, leg: 31 },
  m8a1: { head: 34, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  m34_novaline: { head: 65, neck: 50, chest: 50, stomach: 50, arm: 50, leg: 50 },
  warden_308: { head: 105, neck: 105, chest: 101, stomach: 75, arm: 75, leg: 75 },
  m10_breacher: { head: 220, neck: 220, chest: 220, stomach: 220, arm: 220, leg: 220 },
  echo_12: { head: 148, neck: 148, chest: 148, stomach: 148, arm: 148, leg: 148 },
  akita: { head: 81, neck: 81, chest: 81, stomach: 81, arm: 81, leg: 81 },
  grekhova: { head: 26, neck: 20, chest: 20, stomach: 20, arm: 20, leg: 20 },
  jager_45: { head: 37, neck: 31, chest: 31, stomach: 31, arm: 31, leg: 31 },
  velox_57: { head: 36, neck: 33, chest: 33, stomach: 33, arm: 33, leg: 33 },
  coda_9: { head: 26, neck: 20, chest: 20, stomach: 20, arm: 20, leg: 20 },
  pistolet_1911: { head: 52, neck: 50, chest: 50, stomach: 44, arm: 44, leg: 44 },
  siren: { head: 100, neck: 100, chest: 100, stomach: 100, arm: 100, leg: 100 },
  nx_ravager: { head: 150, neck: 150, chest: 150, stomach: 150, arm: 150, leg: 150 },
  krs_762: { head: 91, neck: 84, chest: 84, stomach: 65, arm: 65, leg: 65 },
  cbrs_3: { head: 34, neck: 29, chest: 29, stomach: 29, arm: 29, leg: 29 },
  "xm4": { head: 27, neck: 22, chest: 22, stomach: 22, arm: 22, leg: 22 },
  "ak_74": { head: 36, neck: 29, chest: 29, stomach: 29, arm: 29, leg: 29 },
  "ames_85": { head: 27, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  "gpr_91": { head: 28, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  "model_l": { head: 35, neck: 28, chest: 28, stomach: 28, arm: 28, leg: 28 },
  "goblin_mk_2": { head: 42, neck: 42, chest: 36, stomach: 33, arm: 36, leg: 33 },
  "as_val": { head: 27, neck: 22, chest: 22, stomach: 22, arm: 22, leg: 22 },
  "cypher_091": { head: 37, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  "kilo_141": { head: 27, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  "cr_56_amax": { head: 38, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  "ffar_1": { head: 27, neck: 21, chest: 21, stomach: 21, arm: 21, leg: 21 },
  "abr_a1": { head: 43, neck: 32, chest: 32, stomach: 32, arm: 32, leg: 32 },
  "ksv": { head: 32, neck: 26, chest: 26, stomach: 26, arm: 26, leg: 26 },
  "tanto_22": { head: 45, neck: 38, chest: 38, stomach: 38, arm: 38, leg: 38 },
  "pp_919": { head: 32, neck: 25, chest: 25, stomach: 25, arm: 25, leg: 25 },
  "jackal_pdw": { head: 32, neck: 26, chest: 26, stomach: 26, arm: 26, leg: 26 },
  "kompakt_92": { head: 24, neck: 20, chest: 20, stomach: 20, arm: 20, leg: 20 },
  "saug": { head: 26, neck: 21, chest: 21, stomach: 21, arm: 21, leg: 21 },
  "ppsh_41": { head: 25, neck: 22, chest: 22, stomach: 22, arm: 22, leg: 22 },
  "ladra": { head: 21, neck: 19, chest: 19, stomach: 19, arm: 19, leg: 19 },
  "lc10": { head: 29, neck: 22, chest: 22, stomach: 22, arm: 22, leg: 22 },
  "pu_21": { head: 35, neck: 27, chest: 27, stomach: 27, arm: 27, leg: 27 },
  "gpmg_7": { head: 27, neck: 23, chest: 23, stomach: 23, arm: 23, leg: 23 },
  "feng_82": { head: 51, neck: 38, chest: 38, stomach: 38, arm: 38, leg: 38 },
  "pml_5_56": { head: 36, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  "swat_5_56": { head: 41, neck: 39, chest: 39, stomach: 38, arm: 39, leg: 38 },
  "aek_973": { head: 44, neck: 42, chest: 42, stomach: 40, arm: 42, leg: 40 },
  "dm_10": { head: 91, neck: 65, chest: 65, stomach: 65, arm: 65, leg: 65 },
  "tr2": { head: 61, neck: 44, chest: 44, stomach: 44, arm: 44, leg: 44 },
  "essex_model_07": { head: 150, neck: 120, chest: 100, stomach: 98, arm: 100, leg: 90 },
  "lw3a1_frostline": { head: 312, neck: 208, chest: 104, stomach: 101, arm: 104, leg: 93 },
  "svd": { head: 312, neck: 208, chest: 104, stomach: 101, arm: 104, leg: 93 },
  "amr_mod_4": { head: 306, neck: 306, chest: 204, stomach: 102, arm: 104, leg: 100 },
  "hdr": { head: 312, neck: 208, chest: 104, stomach: 101, arm: 104, leg: 93 },
  "9mm_pm": { head: 44, neck: 37, chest: 37, stomach: 37, arm: 37, leg: 37 },
  "gs45": { head: 57, neck: 52, chest: 52, stomach: 52, arm: 52, leg: 52 },
  "stryder_22": { head: 34, neck: 29, chest: 29, stomach: 29, arm: 29, leg: 29 },
  "gravemark_357_revolver": { head: 105, neck: 87, chest: 87, stomach: 70, arm: 70, leg: 70 },
  "sirin_9mm": { head: 39, neck: 30, chest: 30, stomach: 30, arm: 30, leg: 30 },
  "d1_3_sector": { head: 150, neck: 150, chest: 150, stomach: 150, arm: 150, leg: 150 },
  "nail_gun": { head: 44, neck: 34, chest: 34, stomach: 34, arm: 34, leg: 34 },
  "merrick_556": { head: 30, neck: 24, chest: 24, stomach: 24, arm: 24, leg: 24 },
  "dresden_9mm": { head: 44, neck: 34, chest: 34, stomach: 34, arm: 34, leg: 34 },
  "x52_resonator": { head: 13, neck: 13, chest: 13, stomach: 13, arm: 13, leg: 13 }
};
