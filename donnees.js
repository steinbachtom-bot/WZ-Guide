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
  maj: "juin 2026",          // mois de la dernière mise à jour des stats
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
  sturmwolf_45: "S", mpc_25: "S", carbon_57: "S", kogot_7: "S",
  vst: "A", ryden_45k: "A", c9: "A",
  dravec_45: "B", rk_9: "B", razor_9mm: "B",
  rev_46: "C",
  // --- Fusils-mitrailleurs ---
  mk78: "S",
  xm325: "A", xmg: "A",
  sokol_545: "B",
  // --- Fusils tactiques ---
  m8a1: "S", m34_novaline: "S",
  warden_308: "A",
  swordfish_a1: "B",
  tsarkov_762: "C",
  // --- Fusils de précision ---
  strider_300: "S",
  vs_recon: "A", hawker_hx: "A",
  xr3_ion: "B", shadow_sk: "B", lr_762: "B",
  // --- Fusils à pompe ---
  sg_12: "A",
  echo_12: "B", m10_breacher: "B",
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
  flatline_mk2: "D", poings: "D", h311_saw: "D"
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
  nx_ravager: IMG_BASE + "NX-Ravager.webp"
  // (Lanceurs et armes de mêlée : pas de visuel propre sur codmunity → silhouette)
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
    // Stats de base RÉELLES (Warzone, source codmunity.gg).
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
        { id: "jason2x", nom: "Jason Armory 2x", description: "Lunette 2x." },
        { id: "merlin", nom: "Merlin Reflex", description: "Point rouge net." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-33%", recul_vertical: "-35%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-22%", recul_vertical: "-23%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+26%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+30%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+55%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+30%", portee_m: "+15%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+44%", recul_horizontal: "+20%", recul_vertical: "+45%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-35%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "g_grip", nom: "Poignée G-Grip", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+10 balles, recharge plus lente.", modificateurs: { capacite_chargeur: "+10", vitesse_rechargement_ms: "+14%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+20 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+15%", vitesse_rechargement_ms: "+21%" } },
        { id: "flip_mag", nom: "Chargeur Flip", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-13%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-17%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-31%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-32%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-15%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sans_crosse", nom: "Sans crosse", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+17%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+9%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "9x19mm surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+6%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "xmg",
    nom: "XMG",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 6",
    // Stats de base RÉELLES (Warzone, source codmunity.gg).
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
        { id: "otero", nom: "Otero Red Dot", description: "Point rouge compact." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-34%", recul_vertical: "-35%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-25%", recul_vertical: "-25%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+12%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+40%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+35%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+25%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+50%", recul_horizontal: "+25%", recul_vertical: "+50%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-40%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+50 balles, recharge un peu plus lente.", modificateurs: { capacite_chargeur: "+50", vitesse_rechargement_ms: "+4%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+100 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+100", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+8%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −25 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-6%", capacite_chargeur: "-25" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Encore plus rapide, −50 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-18%", capacite_chargeur: "-50" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-16%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-31%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_lestee", nom: "Crosse lestée", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-25%", recul_vertical: "-15%" } },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+21%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement un peu plus rapide.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_cible", nom: "Laser cible", description: "Améliore la précision à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "7.62 surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+23%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+15%", recul_horizontal: "+20%", recul_vertical: "+15%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "tsarkov_762",
    nom: "Tsarkov 7.62",
    categorie: "Fusil tactique",
    jeu: "Black Ops 6",
    // Stats de base RÉELLES (Warzone, source codmunity.gg). Dégâts/portée approximés (non affichés dans le panneau).
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
        { id: "willis3x", nom: "Willis 3x", description: "Lunette 3x." },
        { id: "svd", nom: "Lunette SVD", description: "Lunette longue portée." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-30%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-18%", recul_vertical: "-20%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+30%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+15%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+53%", recul_horizontal: "+20%", recul_vertical: "+55%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "garde_leste", nom: "Garde-main lesté", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-40%" } },
        { id: "garde_prec", nom: "Garde-main de précision", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "garde_ranger", nom: "Garde-main Ranger", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+5 balles, recharge plus lente.", modificateurs: { capacite_chargeur: "+5", vitesse_rechargement_ms: "+14%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+10 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+9%", vitesse_rechargement_ms: "+28%" } },
        { id: "flip_mag", nom: "Chargeur Flip", description: "Manie et recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-13%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-16%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-25%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-30%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-12%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+25%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+14%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "7.62 surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul accru.", modificateurs: { cadence_cpm: "+8%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" } }
      ]}
    ]
  },
  {
    id: "lr_762",
    nom: "LR 7.62",
    categorie: "Fusil de précision",
    jeu: "Black Ops 6",
    // Stats de base RÉELLES (Warzone, source codmunity.gg). Dégâts/portée approximés (sniper, non affichés).
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
        { id: "svd", nom: "Lunette SVD", description: "Lunette de tireur d'élite." },
        { id: "prisma4x", nom: "PrismaTech 4x", description: "Lunette 4x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-25%", recul_vertical: "-25%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+9%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+25%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+10%", portee_m: "+15%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+50%", recul_horizontal: "+20%", recul_vertical: "+50%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "garde_leste", nom: "Garde-main lesté", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-35%" } },
        { id: "garde_prec", nom: "Garde-main de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "garde_ranger", nom: "Garde-main Ranger", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+2 balles, recharge plus lente.", modificateurs: { capacite_chargeur: "+2", vitesse_rechargement_ms: "+11%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+5 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+3%", sprint_to_fire_ms: "+7%", vitesse_rechargement_ms: "+21%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-13%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Manie et recharge plus vite, −1 balle.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-3%", vitesse_rechargement_ms: "-26%", capacite_chargeur: "-1" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-9%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-33%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-16%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-26%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+15%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement un peu plus rapide.", modificateurs: { mobilite: "+7%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "7.62 surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence fortement accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+39%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "asg_89",
    nom: "ASG-89",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 6",
    // Stats de base RÉELLES (Warzone, source codmunity.gg). Dégâts max (102) et portée courte.
    stats_base: {
      degats: 102, portee_m: 10, cadence_cpm: 128, velocite_ms: 320,
      capacite_chargeur: 12, vitesse_visee_ms: 260, sprint_to_fire_ms: 195,
      vitesse_rechargement_ms: 3200, gun_kick: 36, recul_horizontal: 31.91,
      recul_vertical: 95.48, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ks_red_dot", nom: "K&S Red Dot", description: "Point rouge." },
        { id: "kepler", nom: "Kepler Microflex", description: "Mini point rouge." },
        { id: "jason2x", nom: "Jason Armory 2x", description: "Lunette 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "choke_modifie", nom: "Choke modifié", description: "Resserre la gerbe de plombs (tir à la hanche)." },
        { id: "full_choke", nom: "Choke complet", description: "Resserre fortement la gerbe à la hanche." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+18%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+15%" } },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Hausse de vélocité.", modificateurs: { velocite_ms: "+13%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+5%", portee_m: "+7%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul accru.", modificateurs: { gun_kick: "+29%", recul_horizontal: "+10%", recul_vertical: "+30%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-30%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+3 cartouches, recharge plus lente.", modificateurs: { capacite_chargeur: "+3", vitesse_rechargement_ms: "+14%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+8 cartouches, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+8", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+26%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −2 cartouches.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-13%", capacite_chargeur: "-2" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Encore plus rapide, −4 cartouches.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-10%", vitesse_rechargement_ms: "-20%", capacite_chargeur: "-4" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-23%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-31%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-10%" } },
        { id: "cqb", nom: "Poignée CQB", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-21%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_legere", nom: "Crosse légère", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+26%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+14%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "slug", nom: "Cartouche à balle (Slug)", description: "Tir précis à balle unique : recul réduit mais vélocité moindre.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", velocite_ms: "-25%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul accru.", modificateurs: { cadence_cpm: "+5%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fang_elo", nom: "FANG HoverPoint ELO", description: "Viseur holographique." },
        { id: "reflex", nom: "Reflex", description: "Mini point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+23%", portee_m: "+11.4%", vitesse_visee_ms: "+22%" } },
        { id: "lattice", nom: "Compensateur Lattice", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-15%" } },
        { id: "finset", nom: "Frein EAM Finset", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", velocite_ms: "-13%", portee_m: "-11.4%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "verdin", nom: "Canon 14.6\" LTI Verdin", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-13%" } },
        { id: "planar", nom: "Canon 17.9\" EAM Planar", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+22%", portee_m: "+25%" } },
        { id: "hawker", nom: "Canon 20.7\" Hawker NAP-3", description: "Forte hausse de portée.", modificateurs: { portee_m: "+45.4%" } },
        { id: "xr_compulsion", nom: "Canon 19.1\" XR-Compulsion", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+43%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sentry_pro", nom: "Poignée Sentry Pro", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "bowen_sentry", nom: "Poignée Bowen Sentry", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+11%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "acute", nom: "Chargeur EAM Acute", description: "+11 balles.", modificateurs: { capacite_chargeur: "+11" } },
        { id: "fuelcell", nom: "Chargeur Fuel Cell-X3", description: "+21 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+21", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+13%" } },
        { id: "verto", nom: "Chargeur Verto Flip", description: "Recharge bien plus vite.", modificateurs: { vitesse_rechargement_ms: "-32%" } },
        { id: "nova_slim", nom: "Chargeur EAM Nova-Slim", description: "Manie/recharge plus vite, -4 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-39%", capacite_chargeur: "-4" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "capacitor", nom: "Poignée EAM Capacitor", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "fervid", nom: "Poignée Fervid", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "nanite", nom: "Poignée Nanite", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "bowen_damp", nom: "Poignée Bowen Dampener", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "frigate", nom: "Crosse Frigate Control", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+19%" } },
        { id: "aura_bloom", nom: "Crosse Aura Bloom", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-10%" } },
        { id: "saker", nom: "Crosse Saker Speed", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+23%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-10%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+20.4%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "echo_rounds", nom: "MFS Heated Echo Rounds", description: "Plus de vélocité/portée, léger recul en plus.", modificateurs: { velocite_ms: "+22%", portee_m: "+11.4%", gun_kick: "+5%", recul_horizontal: "+5%", recul_vertical: "+5%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { velocite_ms: "-12%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%", portee_m: "-4.5%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fang_elo", nom: "FANG HoverPoint ELO", description: "Viseur holographique." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, manie plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.1%", vitesse_visee_ms: "+21%", sprint_to_fire_ms: "+22%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-11.9%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "weaver", nom: "Canon court 15.3\" Weaver-2R", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-10%" } },
        { id: "pn_cursus", nom: "Canon 17.9\" PN-Cursus", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "bowen_aileron", nom: "Canon long 18.7\" Bowen Aileron", description: "Forte hausse de portée.", modificateurs: { portee_m: "+40.5%" } },
        { id: "firetail", nom: "Canon hybride 17\" LTI Firetail", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "-4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_conv", nom: "Poignée VAS Convergence", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-26%", recul_vertical: "-9%" } },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+9%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "genx04", nom: "Chargeur Gen-X04 étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "siren_drum", nom: "Tambour Bowen Siren", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+8%", vitesse_rechargement_ms: "+9%" } },
        { id: "libate", nom: "Chargeur rapide Libate-RT", description: "Manie/recharge plus vite, -5 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-25%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rv2", nom: "Poignée R-V2 Quick", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-25%" } },
        { id: "sarsen", nom: "Poignée Sarsen Sprint", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-36%" } },
        { id: "knave", nom: "Poignée VAS Knave Control", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "patchwork", nom: "Poignée Patchwork", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cassin", nom: "Crosse Greaves Cassin", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+17%" } },
        { id: "stentor", nom: "Crosse EAM Stentor Tac", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-20%" } },
        { id: "courser", nom: "Crosse Courser Light", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+23%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "5.56 NATO FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+7%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "eam_xl", nom: "EAM xL Reflex", description: "Point rouge ouvert." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker_comp", nom: "Compensateur Hawker-473", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "novaburst", nom: "Frein NovaBurst", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+25%", portee_m: "+18%", vitesse_visee_ms: "+22%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "os_density", nom: "Canon 16\" OS-Density", description: "Plus de vélocité, recul réduit et +21 balles, mais manie/recharge plus lentement.", modificateurs: { velocite_ms: "+20%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", capacite_chargeur: "+21", vitesse_visee_ms: "+14%", sprint_to_fire_ms: "+8%", vitesse_rechargement_ms: "+18%" } },
        { id: "shroud", nom: "Canon long 19.5\" Shroud", description: "+15 balles, recharge plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_rechargement_ms: "+12%" } },
        { id: "tourville", nom: "Canon 14.9\" Tourville Sprint", description: "+15 balles, un peu moins de vélocité.", modificateurs: { capacite_chargeur: "+15", velocite_ms: "-6%" } },
        { id: "mfs_pulse", nom: "Canon 14.6\" MFS Pulse Load+", description: "Manie/recharge plus vite et plus mobile, moins de portée.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-13%", vitesse_rechargement_ms: "-21%", mobilite: "+9%", portee_m: "-13%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-5%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pillory", nom: "Poignée Pillory", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "vented", nom: "Poignée Vented-HKR", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-24%" } },
        { id: "granulated", nom: "Poignée Granulated OM1", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "celestial", nom: "Poignée Celestial", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-8%", vitesse_visee_ms: "+6%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "specter_x", nom: "Crosse Specter-X Guard", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" } },
        { id: "skeleton", nom: "Crosse Hawker Skeleton", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "ethereal", nom: "Crosse Ethereal Wave", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+21%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-10%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+12%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "4.73 Caseless FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10.5%", vitesse_visee_ms: "+21%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "aviary", nom: "Canon court 15\" Aviary Light", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-13%" } },
        { id: "turbine", nom: "Canon 21\" Turbine Booster", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+32%" } },
        { id: "assemblage", nom: "Canon long 24\" Assemblage", description: "Forte hausse de portée.", modificateurs: { portee_m: "+31.6%" } },
        { id: "perfidy", nom: "Canon hybride 17\" Perfidy-75", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+16%", portee_m: "+15.8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "drift_lock", nom: "Poignée VAS Drift Lock", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "steady90", nom: "Poignée EAM Steady-90", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-7%", mobilite: "+7%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "billing", nom: "Chargeur Billing étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "mandible", nom: "Chargeur Mandible étendu", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+11%", vitesse_rechargement_ms: "+17%" } },
        { id: "plumage", nom: "Chargeur rapide Plumage", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-13%" } },
        { id: "scarlet", nom: "Chargeur Flip ScarletFront", description: "Manie/recharge plus vite, -10 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-20%", capacite_chargeur: "-10" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "faraday", nom: "Poignée Faraday Quick", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-19%" } },
        { id: "harlequin", nom: "Poignée Harlequin", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-47%" } },
        { id: "vas_spire", nom: "Poignée VAS Spire", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "horus", nom: "Poignée Horus Accuracy", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "furrow", nom: "Crosse Furrow Control", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+19%" } },
        { id: "throng", nom: "Crosse VAS Throng", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "voltaic", nom: "Crosse Voltaic Light", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+20%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-11%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+21%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "5.56 NATO FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "kepler", nom: "Kepler T-Range Holo", description: "Viseur holographique télémétrique." },
        { id: "prisma_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." },
        { id: "vas_duo", nom: "VAS Duo Hybrid Sight", description: "Viseur hybride." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+13%", vitesse_visee_ms: "+23%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "winged", nom: "Canon court 14.2\" Winged", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-14%" } },
        { id: "westerlies", nom: "Canon 18.9\" Westerlies", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-15%", velocite_ms: "-5%" } },
        { id: "abdicator", nom: "Canon contrôle 17.1\" Abdicator", description: "Plus de vélocité, recul fortement réduit, manie plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+15%", sprint_to_fire_ms: "+8%" } },
        { id: "redwell_jx", nom: "Canon hybride 16\" Redwell JX-201", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "-4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-25%" } },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-14%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "andean", nom: "Chargeur Andean étendu", description: "+15 balles, recharge plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%", vitesse_rechargement_ms: "+18%" } },
        { id: "griffon", nom: "Chargeur Griffon étendu II", description: "+30 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+11%", vitesse_rechargement_ms: "+18%", mobilite: "-6%" } },
        { id: "pinion", nom: "Chargeur Flip Pinion", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-6%", capacite_chargeur: "+5" } },
        { id: "deltacruise", nom: "Chargeur rapide DeltaCruise", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-20%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "needletail", nom: "Poignée Needletail", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "ulysses", nom: "Poignée Ulysses", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-51%" } },
        { id: "picket", nom: "Poignée Picket", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-15%", vitesse_visee_ms: "+6%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "weighted", nom: "Crosse Weighted Control", description: "Réduit fortement tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+11%" } },
        { id: "stratagem", nom: "Crosse Stratagem Tight", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-15%" } },
        { id: "assault_div", nom: "Crosse Assault Division", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+19%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-11%" } },
        { id: "tactical_2mw", nom: "Laser tactique 2mW", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "5.56 NATO FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+14%" } },
        { id: "overpressured", nom: "5.56 NATO Surpressurisé", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%" } }
      ]}
    ]
  },
  {
    id: "kogot_7",
    nom: "Kogot-7",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG très haute cadence (968 RPM), recul élevé. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 25, portee_m: 28, cadence_cpm: 968, velocite_ms: 540,
      capacite_chargeur: 30, vitesse_visee_ms: 160, sprint_to_fire_ms: 110,
      vitesse_rechargement_ms: 2288, gun_kick: 43.33, recul_horizontal: 18.8,
      recul_vertical: 41.53, mobilite: 5.2
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "hawker9_brake", nom: "Frein Hawker-9", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.7%", vitesse_visee_ms: "+28%" } },
        { id: "tishina", nom: "Suppresseur SWF Tishina-11", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hock_xr", nom: "Canon court 8.5\" Targil Hock-XR", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-17%", sprint_to_fire_ms: "-36%", mobilite: "+6%" } },
        { id: "cinerous", nom: "Canon 11.7\" Cinerous", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+28%" } },
        { id: "canis05", nom: "Canon long 13.5\" Canis-05", description: "Plus de portée.", modificateurs: { portee_m: "+23%" } },
        { id: "tz_incisor", nom: "Canon moyen 10.2\" TZ-Incisor", description: "Canon polyvalent." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "drift_lock", nom: "Poignée VAS Drift Lock", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-24%" } },
        { id: "vitalize", nom: "Poignée Vitalize", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "lightpath", nom: "Poignée EAM Lightpath", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fortune", nom: "Chargeur Fortune étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "caper", nom: "Chargeur rapide Caper", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-10%" } },
        { id: "welkin", nom: "Chargeur rapide Welkin II", description: "Recharge plus vite (rechargement tactique)." }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "spotted", nom: "Poignée Spotted Agile", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-29%" } },
        { id: "rhinebeck", nom: "Poignée Rhinebeck", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "vulpine", nom: "Poignée EMT3 Vulpine", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-6%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "radix", nom: "Crosse EMT3 Radix", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "orbiter", nom: "Crosse Targil Orbiter", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-15%" } },
        { id: "cinder", nom: "Crosse Cinder", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-13%" } },
        { id: "f7_howl", nom: "Crosse F7-Howl", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "tactical_2mw", nom: "Laser tactique 2mW", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "9x21mm Surpressurisé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+14%" } },
        { id: "fmj", nom: "9x21mm FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-6%", recul_horizontal: "-6%", recul_vertical: "-6%" } }
      ]}
    ]
  },
  {
    id: "mpc_25",
    nom: "MPC-25",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG cadence moyenne, bonne maniabilité. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 28, portee_m: 30, cadence_cpm: 706, velocite_ms: 520,
      capacite_chargeur: 30, vitesse_visee_ms: 170, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2026, gun_kick: 37.8, recul_horizontal: 14.8,
      recul_vertical: 50.98, mobilite: 5.1
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." },
        { id: "prisma_4x", nom: "PrismaTech Turbo 4x", description: "Lunette grossissement 4x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ks_comp", nom: "Compensateur K&S", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" } },
        { id: "ks_brake", nom: "Frein K&S-2B", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.1%", vitesse_visee_ms: "+29%" } },
        { id: "stalker", nom: "Suppresseur K&S Stalker 57-X", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "razorback", nom: "Canon 13.1\" Razorback", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%" } },
        { id: "vas_ashe", nom: "Canon long 14.5\" VAS Ashe", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } },
        { id: "toxin", nom: "Canon moyen 12\" Toxin", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+5%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "drift_lock", nom: "Poignée VAS Drift Lock", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sustain25", nom: "Chargeur Sustain-25 étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "coachwhip", nom: "Chargeur rapide Coachwhip", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } },
        { id: "racer_t", nom: "Chargeur rapide Racer-T II", description: "Manie/recharge plus vite, -5 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-29%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickshift", nom: "Poignée Quickshift", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "torque", nom: "Poignée Torque Prime", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-38%" } },
        { id: "vassal", nom: "Poignée Vassal", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-13%", vitesse_visee_ms: "+8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "medusa", nom: "Crosse Medusa Control", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-18%", recul_horizontal: "-18%", recul_vertical: "-18%", vitesse_visee_ms: "+16%" } },
        { id: "k1_pedal", nom: "Crosse K-1 Pedal", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-15%" } },
        { id: "vas_scale", nom: "Crosse VAS Tactical Scale", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-18%" } },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.56x30mm Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-8%", recul_vertical: "-12%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_micro", nom: "EAM Micro Dot", description: "Mini point rouge." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ks_comp", nom: "Compensateur K&S", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "ks_brake", nom: "Frein K&S-2B", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-5%", recul_vertical: "-5%" } },
        { id: "stalker", nom: "Suppresseur K&S Stalker 57-X", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_radiant", nom: "Canon 8.5\" VAS Radiant", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "orbital", nom: "Canon court 8.6\" Orbital Light", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-22%", sprint_to_fire_ms: "-31%", mobilite: "+6%" } },
        { id: "ex3", nom: "Canon moyen 10.2\" EX-3 Heavy", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+5%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vitalize", nom: "Poignée Vitalize", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_sideline", nom: "Chargeur Bowen Sideline étendu", description: "+20 balles, manie/recharge plus lentement et moins mobile.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+14%", mobilite: "-5%" } },
        { id: "compact246", nom: "Chargeur rapide Compact-246", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-17%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bombus", nom: "Poignée Bombus Quick", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "remus", nom: "Poignée Remus Sprint", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "dulcet", nom: "Poignée Dulcet Control", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "heavy_bound", nom: "Crosse Heavy Bound", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-20%", recul_vertical: "-15%", vitesse_visee_ms: "+9%" } },
        { id: "oberon", nom: "Crosse Oberon Tactical", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-12%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Plus de portée (visible).", modificateurs: { portee_m: "+21%" } },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.7x28mm Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-14%", recul_vertical: "-12%" } }
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
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Stabilise le premier tir." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ascendancy", nom: "Canon court 11.5\" LTI Ascendancy", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-35%", mobilite: "+6%" } },
        { id: "piston_mosaic", nom: "Canon 13.2\" Piston Mosaic", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+50%" } },
        { id: "perigee", nom: "Canon long 14.8\" Perigee", description: "Canon longue portée." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "zero_shift", nom: "Poignée Zero Shift", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+9%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "locus", nom: "Chargeur Locus étendu", description: "+16 balles.", modificateurs: { capacite_chargeur: "+16" } },
        { id: "b45_drum", nom: "Tambour B-45 Roar", description: "+28 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+28", vitesse_visee_ms: "+9%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+26%" } },
        { id: "lti_upend", nom: "Chargeur Flip LTI Upend", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sanctum", nom: "Poignée Sanctum Speed", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-30%" } },
        { id: "lti_pelage", nom: "Poignée LTI Pelage", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "motley", nom: "Poignée Motley Light", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mink", nom: "Crosse Mink Stability", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-17%", recul_horizontal: "-17%", recul_vertical: "-17%" } },
        { id: "satellite", nom: "Crosse Satellite Skeleton", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Plus de portée (visible).", modificateurs: { portee_m: "+27.3%" } },
        { id: "scatterline", nom: "Laser EAM ScatterLine", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".45 Cal Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "fmj", nom: ".45 Cal FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "recoil_spring", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_reflex", nom: "LTI Reflex", description: "Point rouge ouvert." },
        { id: "prisma_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-7%", recul_vertical: "-8%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "basilisk", nom: "Canon court 9\" Basilisk", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-14%", sprint_to_fire_ms: "-25%", mobilite: "+6%" } },
        { id: "rauch", nom: "Canon 11\" Rauch 6L-R", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "whiptail", nom: "Canon hybride 10.5\" Greaves Whiptail", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+5%" } },
        { id: "vienna", nom: "Canon long 12\" Vienna", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-25%" } },
        { id: "lightpath", nom: "Poignée EAM Lightpath", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "torch", nom: "Chargeur Torch étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "fraternity", nom: "Chargeur Flip Fraternity", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-19%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lennox", nom: "Poignée Lennox", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-32%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_interlock", nom: "Crosse VAS Interlock", description: "Réduit fortement tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+9%" } },
        { id: "ventral", nom: "Crosse Ventral", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-15%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Améliore le tir à la hanche (visible)." },
        { id: "scatterline", nom: "Laser EAM ScatterLine", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".45 Cal Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-15%", recul_vertical: "-8%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_microflex", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "greaves_dot", nom: "Greaves Red Dot", description: "Point rouge ouvert." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-18%", recul_vertical: "-18%" } },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-5%", recul_vertical: "-5%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+5.9%", vitesse_visee_ms: "+28%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_hollow", nom: "Canon court 8.7\" EAM Hollow", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-38%", mobilite: "+6%" } },
        { id: "blackstar", nom: "Canon moyen 11.3\" Blackstar", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+4%" } },
        { id: "mercurial", nom: "Canon long 13.6\" Mercurial", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } },
        { id: "tethys", nom: "Canon 12.4\" VAS Tethys", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ironlung", nom: "Poignée MFS Ironlung", description: "Cadence accrue et recul fortement réduit.", modificateurs: { cadence_cpm: "+28%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%" } },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "alliance", nom: "Chargeur Alliance étendu", description: "+12 balles.", modificateurs: { capacite_chargeur: "+12" } },
        { id: "ascot_drum", nom: "Tambour Ascot", description: "+27 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+27", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+17%", vitesse_rechargement_ms: "+12%", mobilite: "-4%" } },
        { id: "silverline", nom: "Chargeur Flip Silverline", description: "Recharge bien plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-28%", capacite_chargeur: "+5" } },
        { id: "compact_void", nom: "Chargeur rapide Compact Void", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-42%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lotus", nom: "Poignée Lotus Draw", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-33%" } },
        { id: "skeleton_606", nom: "Poignée 606-T Skeleton", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-35%" } },
        { id: "nanopulse", nom: "Poignée Nanopulse", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "vega", nom: "Poignée Vega Precision", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-12%", vitesse_visee_ms: "+8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_conduit", nom: "Crosse VAS Conduit", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%", vitesse_visee_ms: "+15%" } },
        { id: "nightfall", nom: "Crosse Nightfall Rapid", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" } },
        { id: "vectra", nom: "Crosse Vectra Tactical", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-12%" } },
        { id: "vq45", nom: "Crosse VQ-45 Harpy", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+10%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-17%" } },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Plus de portée (visible).", modificateurs: { portee_m: "+17%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "9mm Parabellum Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "enhanced_cycle", nom: "Tir rapide (Enhanced Cycle System)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-10%", gun_kick: "+10%", recul_horizontal: "+12%", recul_vertical: "+10%", portee_m: "-10%" } }
      ]}
    ]
  },
  {
    id: "dravec_45",
    nom: "Dravec 45",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG .45 polyvalent. Stats et accessoires RÉELS (Warzone, codmunity.gg). Pas d'emplacement sous-canon.
    stats_base: {
      degats: 30, portee_m: 30, cadence_cpm: 638, velocite_ms: 480,
      capacite_chargeur: 36, vitesse_visee_ms: 170, sprint_to_fire_ms: 125,
      vitesse_rechargement_ms: 2080, gun_kick: 45.26, recul_horizontal: 24.29,
      recul_vertical: 48.14, mobilite: 5.0
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette grossissement 4x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker45_comp", nom: "Compensateur Hawker Series 45", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" } },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+8.3%", vitesse_visee_ms: "+26%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cloud", nom: "Canon court 12\" Cloud", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-17%", sprint_to_fire_ms: "-26%", mobilite: "+7%" } },
        { id: "predator", nom: "Canon moyen 16.5\" Predator", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+20%", sprint_to_fire_ms: "+5%" } },
        { id: "verse", nom: "Canon hybride 14\" Verse", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+5%" } },
        { id: "jetstream", nom: "Canon 18\" Jetstream", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gator", nom: "Chargeur Gator étendu", description: "+12 balles.", modificateurs: { capacite_chargeur: "+12" } },
        { id: "lockjaw", nom: "Chargeur Lockjaw étendu", description: "+24 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+24", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+17%", mobilite: "-5%" } },
        { id: "frontgate", nom: "Chargeur rapide FrontGate", description: "Manie/recharge plus vite, -6 balles.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-9%", vitesse_rechargement_ms: "-8%", capacite_chargeur: "-6" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quikarm", nom: "Poignée QuikArm", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-26%" } },
        { id: "helix_tac", nom: "Poignée Helix-Tac", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-24%" } },
        { id: "vantix8", nom: "Poignée Vantix-8", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "delta_axis", nom: "Poignée Delta Axis", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-18%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "endurance", nom: "Crosse Endurance LD-6", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-17%", recul_vertical: "-13%", vitesse_visee_ms: "+14%" } },
        { id: "serval", nom: "Crosse Serval Q-Step", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-15%" } },
        { id: "heritage", nom: "Crosse EAM Heritage", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" } },
        { id: "defiant45", nom: "Crosse Defiant-45 Skeletal", description: "Réduit un peu le recul, vise plus lentement.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%", vitesse_visee_ms: "+10%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-9%" } },
        { id: "mfs_agile", nom: "Laser MFS Agile Pro", description: "Manie plus vite et plus mobile, mais recul accru (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-9%", mobilite: "+9%", portee_m: "+8.3%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+15%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".45 Cal Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-16.7%" } }
      ]}
    ]
  },
  {
    id: "vst",
    nom: "VST",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG cadence extrême (1091 RPM), très mobile. Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-13%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen .45", description: "Discret (pas d'effet de stat notable)." },
        { id: "hawker_hybrid", nom: "Bouche hybride Hawker .45", description: "Améliore le tir en glissade/saut." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "enmity", nom: "Canon court 9.7\" Enmity", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-11%", sprint_to_fire_ms: "-23%" } },
        { id: "hawker_broach", nom: "Canon 12.5\" Hawker Broach", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+50%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vitalize", nom: "Poignée Vitalize", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "lightpath", nom: "Poignée EAM Lightpath", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "amplify", nom: "Chargeur Amplify étendu I", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "divest", nom: "Chargeur rapide Divest", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-15%", vitesse_rechargement_ms: "-18%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "solace", nom: "Poignée Solace Quick Aim", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-34%" } },
        { id: "vas_sustenance", nom: "Poignée VAS Sustenance", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_blench", nom: "Crosse VAS Blench", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-17%", recul_horizontal: "-17%", recul_vertical: "-17%" } },
        { id: "hawker_cub55", nom: "Crosse Hawker Cub-55", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Améliore le tir à la hanche (visible)." },
        { id: "redwell_tac", nom: "Laser tactique Redwell", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "9mm Parabellum FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+8%", portee_m: "+8%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+12%", velocite_ms: "-10%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "razor_9mm",
    nom: "Razor 9mm",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG rapide (1000 RPM), faible à-coup. Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "h9mm_comp", nom: "Compensateur H-9mm Precision", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-5%", recul_vertical: "-5%" } },
        { id: "bowen_supp", nom: "Suppresseur Bowen 9mm", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "heron", nom: "Canon court 9\" Heron", description: "Manie bien plus vite, plus mobile.", modificateurs: { vitesse_visee_ms: "-19%", sprint_to_fire_ms: "-28%", mobilite: "+7%" } },
        { id: "razor_impact", nom: "Canon moyen 10\" Razor Impact", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+12%", sprint_to_fire_ms: "+4%" } },
        { id: "rl_genesys", nom: "Canon long 13\" RL-Genesys", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vitalize", nom: "Poignée Vitalize", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "lightpath", nom: "Poignée EAM Lightpath", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "strikeface", nom: "Chargeur Strikeface étendu I", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "hawkline", nom: "Chargeur rapide Hawkline I", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "haste", nom: "Poignée Haste Ribbed", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-31%" } },
        { id: "readiflex", nom: "Poignée ReadiFlex", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-26%" } },
        { id: "pushback", nom: "Poignée EAM Pushback", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-16%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rwl", nom: "Crosse RWL Stability", description: "Réduit l'ensemble du recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+5%" } },
        { id: "talos", nom: "Crosse Talos", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-15%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "scatterline", nom: "Laser EAM ScatterLine", description: "Améliore le tir à la hanche (visible)." },
        { id: "vas_shift", nom: "Laser VAS Precision Shift", description: "Améliore la stabilité de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "9mm Parabellum Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } }
      ]}
    ]
  },
  {
    id: "rev_46",
    nom: "REV-46",
    categorie: "Mitraillette",
    jeu: "Black Ops 7",
    // SMG cadence extrême (1154 RPM), recul horizontal minime. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 21, portee_m: 24, cadence_cpm: 1154, velocite_ms: 620,
      capacite_chargeur: 35, vitesse_visee_ms: 175, sprint_to_fire_ms: 105,
      vitesse_rechargement_ms: 2233, gun_kick: 36.81, recul_horizontal: 5.77,
      recul_vertical: 47.2, mobilite: 5.2
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "fang_elo", nom: "FANG HoverPoint ELO", description: "Viseur holographique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker_mk2", nom: "Frein Hawker Stabilizer MK.II", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.7%", vitesse_visee_ms: "+29%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15.4%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "anolis", nom: "Canon court 9.6\" Redwell Anolis", description: "Manie plus vite (canon court)." },
        { id: "caudal", nom: "Canon long 14.9\" Caudal Target", description: "Meilleure portée (canon long)." },
        { id: "dorsal", nom: "Canon 13\" LTI Dorsal", description: "Améliore la vélocité de balle." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-30%" } },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "sapper", nom: "Poignée Sapper Guard", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%", mobilite: "+9%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+10%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cawdor", nom: "Chargeur Cawdor étendu (45)", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "komodo", nom: "Tambour Komodo (55)", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+17%", vitesse_rechargement_ms: "+18%" } },
        { id: "janus", nom: "Chargeur Flip Janus", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-16%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "alpine", nom: "Poignée Alpine-Bare", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "abt91b", nom: "Poignée ABT-91B", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-37%" } },
        { id: "lti_integrity", nom: "Poignée LTI Integrity", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "refrain", nom: "Poignée Refrain Sketch", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mfs_reforge", nom: "Crosse MFS Reforge Flip", description: "Crosse repliable (maniabilité)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swiftpoint", nom: "Laser LTI SwiftPoint", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-17%" } },
        { id: "emt3_agile", nom: "Laser EMT3 Agile", description: "Plus de portée (visible).", modificateurs: { portee_m: "+23.1%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "4.6x30mm Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+15%", velocite_ms: "-13%", gun_kick: "+15%", recul_horizontal: "+15%", recul_vertical: "+10%", portee_m: "-7.7%" } }
      ]}
    ]
  },
  {
    id: "mk78",
    nom: "MK.78",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 7",
    // FM dominant de la méta. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 33, portee_m: 55, cadence_cpm: 652, velocite_ms: 930,
      capacite_chargeur: 75, vitesse_visee_ms: 250, sprint_to_fire_ms: 230,
      vitesse_rechargement_ms: 4372, gun_kick: 15.62, recul_horizontal: 10.7,
      recul_vertical: 45.92, mobilite: 4.6
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "lti_reflex", nom: "LTI Reflex", description: "Point rouge ouvert." },
        { id: "emt3_holo", nom: "EMT3 Holo Mk.2", description: "Viseur holographique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen_mod", nom: "Frein Bowen Modulator 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mach78", nom: "Canon moyen 20\" Mach-78", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "bowen_moon", nom: "Canon long 17\" Bowen Moon", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "skylance", nom: "Canon court 15\" Skylance", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } },
        { id: "parallel", nom: "Poignée Parallel", description: "Manie plus vite mais recul vertical accru.", modificateurs: { vitesse_visee_ms: "-13%", gun_kick: "+14%", recul_vertical: "+14%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "swift_belt", nom: "Bande rapide Swift Feed", description: "Manie/recharge plus vite, -10 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-12%", capacite_chargeur: "-10" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "trailblaze", nom: "Poignée Trailblaze", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "shock_shield", nom: "Crosse Shock Shield", description: "Réduit fortement l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+10%" } },
        { id: "charon", nom: "Crosse Charon Light", description: "Améliore la mobilité.", modificateurs: { mobilite: "+19%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tactical_2mw", nom: "Laser tactique 2mW", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Améliore la stabilité de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-20%" } }
      ]}
    ]
  },
  {
    id: "xm325",
    nom: "XM325",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 7",
    // FM cadence élevée. Stats et accessoires RÉELS (Warzone, codmunity.gg).
    stats_base: {
      degats: 28, portee_m: 50, cadence_cpm: 1000, velocite_ms: 900,
      capacite_chargeur: 60, vitesse_visee_ms: 245, sprint_to_fire_ms: 220,
      vitesse_rechargement_ms: 4586, gun_kick: 15.14, recul_horizontal: 10.53,
      recul_vertical: 35.85, mobilite: 4.6
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-23%", recul_vertical: "-25%" } },
        { id: "redwell_brake", nom: "Frein Redwell 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+20%", vitesse_visee_ms: "+20%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "r556_chief", nom: "Canon 19.3\" R-556 Chief", description: "Réduit fortement le recul, vise plus lentement.", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+13%", sprint_to_fire_ms: "+8%" } },
        { id: "hermes", nom: "Canon 22\" Hermes Fluted", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-22%", velocite_ms: "-10%" } },
        { id: "ristrauch", nom: "Canon court 18\" RistRauch S-100", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-11%" } },
        { id: "rist76", nom: "Canon 20\" Rist-76 Nova", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lateral", nom: "Poignée Lateral Precision", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-25%" } },
        { id: "sentry_pro", nom: "Poignée Sentry Pro", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "flowguard", nom: "Poignée Flowguard", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sawblade", nom: "Tambour Sawblade", description: "+10 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+9%" } },
        { id: "enforcer", nom: "Bande Enforcer étendue", description: "+25 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+25", vitesse_visee_ms: "+11%", sprint_to_fire_ms: "+14%", vitesse_rechargement_ms: "+8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "elysian", nom: "Poignée Elysian Quick", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "causeway", nom: "Poignée Causeway", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-37%" } },
        { id: "l1_command", nom: "Poignée L1-Command", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "lucius90", nom: "Poignée Lucius-90", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-18%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rx7_shock", nom: "Crosse RX-7 Shock", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-18%", recul_horizontal: "-18%", recul_vertical: "-18%", vitesse_visee_ms: "+11%" } },
        { id: "ristrauch_recon", nom: "Crosse Rist Rauch Recon", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%" } },
        { id: "vg0", nom: "Crosse VG-0 Light", description: "Crosse légère (maniabilité)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-9%" } },
        { id: "tactical_2mw", nom: "Laser tactique 2mW", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.56 Caseless Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-12%", recul_horizontal: "-12%", recul_vertical: "-12%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "sokol_545",
    nom: "Sokol 545",
    categorie: "Fusil-mitrailleur",
    jeu: "Black Ops 7",
    // FM gros chargeur (102), cadence basse, longue portée. Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-18%", recul_vertical: "-18%" } },
        { id: "eclipse_brake", nom: "Frein Eclipse 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+13.2%", vitesse_visee_ms: "+19%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "parlous", nom: "Canon contrôle 18.2\" Parlous Heavy", description: "Plus de vélocité, recul fortement réduit, vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+12%", sprint_to_fire_ms: "+8%" } },
        { id: "primer", nom: "Canon moyen 18.2\" Primer", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-10%", velocite_ms: "-10%" } },
        { id: "stolos", nom: "Canon court 15.6\" Stolos", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-6%" } },
        { id: "fixative", nom: "Canon hybride 16.8\" Fixative", description: "Plus de vélocité, vise un peu plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_missive", nom: "Poignée LTI Missive", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+10%" } },
        { id: "hlock", nom: "Poignée H-Lock", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-10%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "invective", nom: "Chargeur Invective étendu", description: "+48 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+48", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+9%" } },
        { id: "samarskiy", nom: "Bande Samarskiy Overdrive", description: "+204 balles et recul réduit (alimentation par bande).", modificateurs: { capacite_chargeur: "+204", gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "clepen", nom: "Chargeur rapide Clepen", description: "Manie/recharge plus vite, -42 balles.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-33%", capacite_chargeur: "-42" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "pythian", nom: "Poignée Pythian-VI", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-26%" } },
        { id: "rennen", nom: "Poignée Rennen", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-26%" } },
        { id: "swf_garrote", nom: "Poignée SWF Garrote", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "hoover", nom: "Poignée Hoover Precision", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "taction", nom: "Crosse Taction Control", description: "Réduit fortement l'ensemble du recul.", modificateurs: { gun_kick: "-21%", recul_horizontal: "-21%", recul_vertical: "-21%" } },
        { id: "voda", nom: "Crosse Voda Flounce", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+22%" } },
        { id: "echidna", nom: "Crosse Echidna Aim", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%" } },
        { id: "milton", nom: "Crosse Milton Tactical", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-6%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19.6%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.45 Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "dread_burst", nom: "MFS 48-Dread (tir rapide+)", description: "Cadence accrue et recul fortement réduit, un peu moins de vélocité.", modificateurs: { cadence_cpm: "+26%", gun_kick: "-45%", recul_horizontal: "-45%", recul_vertical: "-45%", mobilite: "+6%", velocite_ms: "-10%" } }
      ]}
    ]
  },
  {
    id: "strider_300",
    nom: "Strider 300",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Sniper à verrou. Stats de base ET accessoires RÉELS (Warzone, codmunity.gg, relevés sur page rendue).
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
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.6%", vitesse_visee_ms: "+11%" } },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "vs762_brake", nom: "Frein VS-762", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-12.1%" } },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "saltire", nom: "Canon vélocité 24.1\" Saltire Dispatch", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+20%" } },
        { id: "carbon_atoll", nom: "Canon hybride 21.2\" Carbon Atoll", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+10%", portee_m: "+10.6%" } },
        { id: "bowen_grooved", nom: "Canon dégâts 25\" Bowen Grooved", description: "Forte hausse de portée.", modificateurs: { portee_m: "+25.8%" } },
        { id: "eam_plyp4", nom: "Canon court 17\" EAM PLYP-4", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-11%" } },
        { id: "trigon", nom: "Canon long 19\" Trigon Heavy", description: "Vise plus lentement et recul fortement accru.", modificateurs: { vitesse_visee_ms: "+25%", gun_kick: "+40%", recul_horizontal: "+20%", recul_vertical: "+40%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_align", nom: "Poignée Redwell Alignment", description: "Réduit très fortement le recul horizontal.", modificateurs: { recul_horizontal: "-35%" } },
        { id: "bowen_morphic", nom: "Poignée Bowen Morphic", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-17%" } },
        { id: "huntsmen", nom: "Poignée Bowen Huntsmen", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laden", nom: "Chargeur Laden étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+4%", sprint_to_fire_ms: "+9%" } },
        { id: "prisma_ext2", nom: "Chargeur PrismaTech étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+6%", sprint_to_fire_ms: "+14%", vitesse_rechargement_ms: "+11%" } },
        { id: "carnation", nom: "Chargeur rapide Carnation", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-21%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hatch", nom: "Poignée Hatch Quick (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-11%" } },
        { id: "nighthawk", nom: "Poignée Nighthawk CQB (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-43%" } },
        { id: "fringing", nom: "Poignée Fringing Stable (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "keystone", nom: "Poignée Keystone Control", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker_vigor", nom: "Crosse Hawker Vigor (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+17%" } },
        { id: "prudence", nom: "Crosse Prudence-R11 (tactique)", description: "Améliore le tir en stance tactique." },
        { id: "ambulate", nom: "Crosse Ambulate-X4 (ADS mobilité)", description: "Déplacement en visée amélioré." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-9%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19.7%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".300 WM Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "quick_bolt", nom: "Tir rapide (Quick Bolt)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+18%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "hawker_hx",
    nom: "Hawker HX",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Sniper à verrou. Stats de base ET accessoires RÉELS (Warzone, codmunity.gg, relevés sur page rendue).
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
        { id: "eclipse_brake", nom: "Frein Eclipse .338", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.9%", vitesse_visee_ms: "+11%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-11.8%" } },
        { id: "tishina_supp", nom: "Suppresseur SWF Tishina-11", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "teleos", nom: "Canon long 27.4\" Teleos Range", description: "Forte hausse de portée.", modificateurs: { portee_m: "+25%" } },
        { id: "composite11", nom: "Canon dégâts 23.7\" Composite-11", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+10%", portee_m: "+10.5%" } },
        { id: "hawker_spring", nom: "Canon court 20.5\" Hawker Spring", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-11%" } },
        { id: "absolution", nom: "Canon vélocité 26.1\" Absolution", description: "Améliore la vélocité de balle." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ridge", nom: "Poignée Hawker Ridge", description: "Réduit très fortement le recul horizontal.", modificateurs: { recul_horizontal: "-35%" } },
        { id: "flattop", nom: "Poignée FlatTop", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "underpitch", nom: "Poignée UnderPitch", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-17%", mobilite: "+9%" } },
        { id: "hawker_mobile", nom: "Poignée Hawker Mobile", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ext_338", nom: "Chargeur .338 Hawker étendu", description: "+1 balle, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+1", vitesse_visee_ms: "+4%", sprint_to_fire_ms: "+9%" } },
        { id: "tyrant", nom: "Chargeur Tyrant-II étendu II", description: "+2 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+6%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+12%" } },
        { id: "amrita", nom: "Chargeur rapide Amrita", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-26%" } },
        { id: "flatload", nom: "Chargeur rapide Flatload", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-2%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-36%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "auroral", nom: "Poignée Auroral Light (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-13%" } },
        { id: "volant", nom: "Poignée Volant Tight (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-35%" } },
        { id: "scud", nom: "Poignée Scud Shelf (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "syncretic", nom: "Poignée Hawker Syncretic", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bardo", nom: "Crosse Bardo Light (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+11%" } },
        { id: "infiltrator", nom: "Crosse Infiltrator (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "steadfast", nom: "Crosse Hawker Steadfast (contrôle)", description: "Améliore le contrôle." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-9%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+19.7%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".338 LM Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "recoil_spring", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "light_bolt", nom: "Tir rapide (Light Bolt)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+19%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "xr3_ion",
    nom: "XR-3 Ion",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Sniper semi-auto (cadence plus élevée, faible recul). Stats de base et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "strix_thermal", nom: "VAS Strix 6x Thermal", description: "Lunette thermique 6x." },
        { id: "rangefinder", nom: "Circuit-Z Rangefinder", description: "Lunette télémètre." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.5%", vitesse_visee_ms: "+9%" } },
        { id: "trishot_comp", nom: "Compensateur TriShot", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "triptych_brake", nom: "Frein Triptych", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "lti_triad", nom: "Suppresseur LTI Triad", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ion_trinity", nom: "Canon vélocité 20\" Ion Trinity", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "lti_infinity", nom: "Canon long 21\" LTI Infinity", description: "Plus de portée.", modificateurs: { portee_m: "+25%" } },
        { id: "xr_adapt", nom: "Canon hybride 17\" XR-Adapt", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+12.5%" } },
        { id: "revolution", nom: "Canon dégâts 19\" Revolution", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+13%" } },
        { id: "fringe", nom: "Canon court 15\" Fringe", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "neutralize", nom: "Garde-main Neutralize-XR", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-25%" } },
        { id: "zero_s", nom: "Garde-main Zero-S", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overload", nom: "Chargeur Overload étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+3%", sprint_to_fire_ms: "+8%" } },
        { id: "phantom_v", nom: "Chargeur rapide Phantom-V", description: "Recharge plus vite (rechargement tactique)." }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lt_sling", nom: "Poignée L.T. Sling (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-9%" } },
        { id: "xr_omega", nom: "Poignée XR-Omega (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-38%" } },
        { id: "xr_init", nom: "Poignée XR-Initialize (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" } },
        { id: "l9_vertigo", nom: "Poignée L9 Vertigo", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_collapsed", nom: "Crosse LTI Collapsed (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+18%" } },
        { id: "padded_crush", nom: "Crosse Padded Crush (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "lightshield", nom: "Crosse Lightshield", description: "Déplacement en visée amélioré." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-8%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+12%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "quick_charge", nom: "Tir rapide (Quick Charge)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "shadow_sk",
    nom: "Shadow SK",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Sniper avec emplacement « Crosse (joue) ». Stats de base et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "solaris", nom: "Solaris Holo-IR", description: "Viseur holographique thermique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.1%", vitesse_visee_ms: "+10%" } },
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "eclipse_brake", nom: "Frein Eclipse 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "strand", nom: "Canon long 22.4\" Strand", description: "Plus de portée.", modificateurs: { portee_m: "+19.6%" } },
        { id: "dimpled", nom: "Canon 18.3\" Dimpled-4150", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+13%", portee_m: "+8.9%" } },
        { id: "thrust", nom: "Canon court 17\" Thrust", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-10%" } },
        { id: "emt3_fluted", nom: "Canon 19.6\" EMT3 Fluted", description: "Plus de vélocité mais recul fortement accru.", modificateurs: { velocite_ms: "+10%", vitesse_visee_ms: "+16%", gun_kick: "+40%", recul_horizontal: "+20%", recul_vertical: "+40%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "targil", nom: "Chargeur Targil étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+4%", sprint_to_fire_ms: "+8%" } },
        { id: "progenitor", nom: "Chargeur Progenitor étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+25%" } },
        { id: "riptide", nom: "Chargeur rapide Riptide", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-19%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "e3_billet", nom: "Poignée E-3 Billet (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-12%" } },
        { id: "custom_flier", nom: "Poignée Custom Flier (tir-sprint)", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-37%" } },
        { id: "stippled", nom: "Poignée Stippled Comfort (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "freehold", nom: "Poignée Freehold Control", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "comb", label: "Crosse (joue)", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "masterkey", nom: "Joue 12-Gauge Masterkey", description: "Réduit fortement tout le recul.", modificateurs: { gun_kick: "-25%", recul_horizontal: "-25%", recul_vertical: "-25%", vitesse_visee_ms: "+4%" } },
        { id: "parapet", nom: "Joue Parapet Riser", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "squadron", nom: "Joue Squadron Riser", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+7%" } },
        { id: "flowline", nom: "Joue EMT3 Flowline", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "preservation", nom: "Crosse Preservation (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" } },
        { id: "tflux", nom: "Crosse T-Flux (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "friction", nom: "Crosse Friction (anti-flinch)", description: "Réduit le tremblement quand on est touché." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-8%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+10%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".300 WM Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "lw_trigger", nom: "Détente allégée (LW Trigger)", description: "Cadence accrue, mais recul fortement dégradé.", modificateurs: { cadence_cpm: "+8%", gun_kick: "+25%", recul_horizontal: "+25%", recul_vertical: "+25%" } }
      ]}
    ]
  },
  {
    id: "vs_recon",
    nom: "VS Recon",
    categorie: "Fusil de précision",
    jeu: "Black Ops 7",
    // Sniper à verrou (un coup). Stats de base et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "scanner", nom: "Millimeter Scanner", description: "Lunette détection de mouvement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+7.9%", vitesse_visee_ms: "+9%" } },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "vs762_brake", nom: "Frein VS-762", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gforce", nom: "Canon vélocité 23\" G-Force", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+27%" } },
        { id: "domain", nom: "Canon hybride 24.9\" Domain", description: "Plus de vélocité, manie un peu plus vite.", modificateurs: { velocite_ms: "+14%", vitesse_visee_ms: "-5%" } },
        { id: "engage_r", nom: "Canon visée 21\" Engage-R", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-12%" } },
        { id: "nimbus", nom: "Canon court 17\" RistRauch Nimbus", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-2%", sprint_to_fire_ms: "-8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "axispro", nom: "Garde-main AxisPro", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%" } },
        { id: "stetig_c", nom: "Garde-main Stetig-C", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "breacher", nom: "Garde-main Breacher", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "wyvern", nom: "Chargeur Wyvern étendu", description: "+2 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+3%", sprint_to_fire_ms: "+8%" } },
        { id: "vsr_ext2", nom: "Chargeur VS-R étendu II", description: "+4 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+4", vitesse_visee_ms: "+5%", sprint_to_fire_ms: "+12%", vitesse_rechargement_ms: "+20%" } },
        { id: "dashline", nom: "Chargeur rapide DashLine", description: "Manie/recharge plus vite.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-6%", vitesse_rechargement_ms: "-13%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "r1_shelf", nom: "Poignée R-1 Shelf (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-8%" } },
        { id: "r2_laufen", nom: "Poignée R-2-Laúfen (tir-sprint)", description: "Tir après sprint plus rapide." },
        { id: "skeletal", nom: "Poignée Skeletal (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "vs_poise", nom: "Poignée VS Poise", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "contra_light", nom: "Crosse Contra Light (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+16%" } },
        { id: "ristrauch_breach", nom: "Crosse RistRauch Breach (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "stabil_heavy", nom: "Crosse Stabil Heavy (anti-flinch)", description: "Réduit le tremblement quand on est touché." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-8%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+10%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "ars", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "light_bolt", nom: "Tir rapide (Light Bolt)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+29%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "swordfish_a1",
    nom: "Swordfish A1",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Fusil de précision tactique (marksman) semi-auto, recul horizontal minime. Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+15%", portee_m: "+7.9%", vitesse_visee_ms: "+15%" } },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-17%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" } },
        { id: "vas_supp", nom: "Suppresseur VAS 5.56", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "angler", nom: "Canon long 17\" Angler", description: "Plus de portée.", modificateurs: { portee_m: "+26.3%" } },
        { id: "spatha", nom: "Canon hybride 15.1\" Spatha", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+13.2%" } },
        { id: "volare", nom: "Canon court 13\" EAM Volare", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-7%" } },
        { id: "gar_xl", nom: "Canon vélocité 16.5\" Gar-xL", description: "Améliore la vélocité de balle." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dominium", nom: "Poignée Dominium", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } },
        { id: "fixus", nom: "Poignée Fixus", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "modus_r", nom: "Poignée Modus-R", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-8%", mobilite: "+10%" } },
        { id: "dart", nom: "Poignée Dart", description: "Améliore la mobilité.", modificateurs: { mobilite: "+10%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "dorado", nom: "Chargeur Dorado étendu (48)", description: "+12 balles.", modificateurs: { capacite_chargeur: "+12" } },
        { id: "samson", nom: "Tambour VAS Samson (60)", description: "+24 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+24", vitesse_visee_ms: "+7%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+21%" } },
        { id: "mini_pearl", nom: "Chargeur rapide Mini-Pearl", description: "Manie/recharge plus vite, -4 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-30%", capacite_chargeur: "-4" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "r1_splendor", nom: "Poignée R1-Splendor (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "plenary", nom: "Poignée Plenary (tir-sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-24%" } },
        { id: "trevally", nom: "Poignée Trevally Shock (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "webbed", nom: "Poignée Webbed Pistol", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-6%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "adept_skiff", nom: "Crosse Adept Skiff (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+20%" } },
        { id: "amber_j", nom: "Crosse Amber-J (contrôle)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "bosun", nom: "Crosse Bosun Light (ADS mobilité)", description: "Déplacement en visée amélioré." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-7%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+15.8%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.56 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+11%", velocite_ms: "-20%", gun_kick: "+30%", recul_horizontal: "+30%", recul_vertical: "+30%", portee_m: "-20%" } }
      ]}
    ]
  },
  {
    id: "m8a1",
    nom: "M8A1",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Fusil tactique (marksman), tir en rafale ; conversion auto disponible. Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_comp", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-9%", recul_vertical: "-12%" } },
        { id: "rl_brake", nom: "Frein RL-5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-6%", recul_vertical: "-8%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+6.7%", vitesse_visee_ms: "+20%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-15%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "autostrike", nom: "Conversion M8A1 AutoStrike-X8", description: "Convertit l'arme en tir automatique." },
        { id: "ionic8", nom: "Canon 18\" Ionic-8", description: "Plus de vélocité, réduit le recul horizontal.", modificateurs: { velocite_ms: "+18%", recul_horizontal: "-5%" } },
        { id: "deadeye", nom: "Canon contrôle 16.5\" Deadeye", description: "Réduit le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+8%" } },
        { id: "ascend", nom: "Canon court 15\" Ascend-KS", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-7%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-3%", recul_horizontal: "-15%" } },
        { id: "envoy", nom: "Poignée Envoy", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-8%", mobilite: "+8%" } },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-8%" } },
        { id: "quickstep", nom: "Poignée Quickstep", description: "Améliore la mobilité.", modificateurs: { mobilite: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sentinel", nom: "Chargeur Sentinel étendu", description: "+8 balles.", modificateurs: { capacite_chargeur: "+8" } },
        { id: "redline", nom: "Tambour Redline", description: "+20 balles, manie un peu plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+7%", vitesse_rechargement_ms: "+13%", mobilite: "-6%" } },
        { id: "blink", nom: "Chargeur rapide Blink-Chamber", description: "Manie/recharge plus vite, -4 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-36%", capacite_chargeur: "-4" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_grip", nom: "Poignée Instinct (Quickdraw)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-16%" } },
        { id: "rush99", nom: "Poignée Rush-99 (tir-sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } },
        { id: "g7_launch", nom: "Poignée G7-Launch (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-9%", recul_vertical: "-12%" } },
        { id: "schmidt", nom: "Poignée Schmidt Trapper", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-11%", vitesse_visee_ms: "+5%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "barrage01", nom: "Crosse VAS Barrage-01 (mobilité)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+22%" } },
        { id: "gridlock", nom: "Crosse Gridlock (contrôle)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-5%", recul_horizontal: "-5%", recul_vertical: "-5%", vitesse_visee_ms: "+7%" } },
        { id: "swiftline", nom: "Crosse Swiftline (ADS mobilité)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-7%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+8%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "5.56 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+6%", velocite_ms: "-15%", gun_kick: "+35%", recul_horizontal: "+35%", recul_vertical: "+35%", portee_m: "-20%" } }
      ]}
    ]
  },
  {
    id: "m34_novaline",
    nom: "M34 Novaline",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Fusil tactique (marksman) semi-auto. Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "ristrauch_7x", nom: "RistRauch 7x", description: "Lunette de sniper 7x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "rl_comp", nom: "Compensateur RL-7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-18%" } },
        { id: "redwell_brake", nom: "Frein Redwell 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+6.7%", vitesse_visee_ms: "+18%" } },
        { id: "greaves_supp", nom: "Suppresseur Greaves A-762", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "velox90", nom: "Canon vélocité 17.3\" Velox-90", description: "Plus de vélocité, réduit un peu le recul.", modificateurs: { velocite_ms: "+18%", gun_kick: "-5%", recul_vertical: "-5%" } },
        { id: "callisto", nom: "Canon long 18.5\" Callisto", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "severus", nom: "Canon court 14.2\" Severus Light", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-10%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } },
        { id: "bowen_agile", nom: "Poignée Bowen Agile", description: "Améliore la mobilité.", modificateurs: { mobilite: "+7%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bowen762", nom: "Chargeur Bowen 762 étendu", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "templar", nom: "Chargeur Flip Templar", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-24%", capacite_chargeur: "+5" } },
        { id: "syncopate", nom: "Chargeur rapide Syncopate", description: "Manie/recharge plus vite, -2 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-34%", capacite_chargeur: "-2" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vitality", nom: "Poignée Vitality Sprint", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-27%" } },
        { id: "actuation76", nom: "Poignée Actuation-76 (précision)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-11%", recul_vertical: "-12%" } },
        { id: "guerilla", nom: "Poignée Guerilla Assault", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-8%", vitesse_visee_ms: "+5%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "seismic", nom: "Crosse Seismic Fixed (contrôle)", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" } },
        { id: "milspec", nom: "Crosse Mil-Spec Light (mobilité)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+20%" } },
        { id: "adjustable", nom: "Crosse Adjustable Rise (tactique)", description: "Améliore le tir en stance tactique." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%" } },
        { id: "lockstep_5mw", nom: "Laser 5mW Lockstep", description: "Améliore la précision au tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: "7.62 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-5%", recul_vertical: "-15%" } }
      ]}
    ]
  },
  {
    id: "warden_308",
    nom: "Warden 308",
    categorie: "Fusil tactique",
    jeu: "Black Ops 7",
    // Fusil tactique (marksman) avec emplacement « Crosse (joue) ». Stats et accessoires RÉELS (Warzone, codmunity.gg).
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
        { id: "prisma_holo", nom: "PrismaTech Digital Holo", description: "Viseur holographique." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "watchdog_comp", nom: "Compensateur Watchdog", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-30%" } },
        { id: "ltilm_brake", nom: "Frein LTI-LM", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-18%", recul_vertical: "-20%" } },
        { id: "outlaw_supp", nom: "Silencieux Outlaw", description: "Discret (pas d'effet de stat notable)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fluted_x35", nom: "Canon vélocité 17.3\" LTI Fluted-X35", description: "Plus de vélocité, réduit un peu le recul.", modificateurs: { velocite_ms: "+28%", gun_kick: "-5%", recul_vertical: "-5%" } },
        { id: "invictus", nom: "Canon long 18\" Invictus", description: "Vise un peu plus lentement (plus de portée).", modificateurs: { vitesse_visee_ms: "+5%" } },
        { id: "artemis", nom: "Canon contrôle 16.2\" Artemis-01", description: "Réduit le recul, vise plus lentement.", modificateurs: { gun_kick: "-10.7%", recul_horizontal: "-10%", recul_vertical: "-18%", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "speed_latch", nom: "Barillet rapide Speed Latch", description: "Manie/recharge un peu plus vite, -2 balles.", modificateurs: { vitesse_visee_ms: "-3%", sprint_to_fire_ms: "-4%", vitesse_rechargement_ms: "-5%", capacite_chargeur: "-2" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tyrannis", nom: "Poignée LTI Tyrannis (Quickdraw)", description: "Visée bien plus rapide.", modificateurs: { vitesse_visee_ms: "-29%" } },
        { id: "scarab", nom: "Poignée Scarab (tir-sprint)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } }
      ]},
      { id: "comb", label: "Crosse (joue)", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ogre_riser", nom: "Joue LTI Ogre", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-20%" } },
        { id: "static_riser", nom: "Joue Static-907x", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } },
        { id: "baron_riser", nom: "Joue Baron", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+8%" } },
        { id: "lockdown_riser", nom: "Joue LTI Lockdown", description: "Améliore la stabilité de visée." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "propulsion", nom: "Crosse Propulsion (contrôle)", description: "Réduit l'ensemble du recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" } },
        { id: "warden_folding", nom: "Crosse Warden pliable (mobilité)", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+23%" } },
        { id: "lti_skeleton", nom: "Crosse LTI Skeleton (ADS mobilité)", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-5%", sprint_to_fire_ms: "-8%" } },
        { id: "tactical", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "overpressured", nom: ".308 NATO Surpressurisé", description: "Plus de vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-14%", recul_horizontal: "-5%", recul_vertical: "-15%" } }
      ]}
    ]
  },
  {
    id: "m10_breacher",
    nom: "M10 Breacher",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Pompe. Stats de base RÉELLES (Warzone, codmunity.gg). Accessoires réels ; codmunity ne publie pas de chiffres d'effet pour la plupart.
    stats_base: {
      degats: 100, portee_m: 12, cadence_cpm: 43, velocite_ms: 320,
      capacite_chargeur: 8, vitesse_visee_ms: 280, sprint_to_fire_ms: 155,
      vitesse_rechargement_ms: 6128, gun_kick: 53.6, recul_horizontal: 42.04,
      recul_vertical: 98.04, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "vas_microflex", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "accuspot_3x", nom: "Greaves AccuSpot 3x", description: "Lunette grossissement 3x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "cqb_choke", nom: "Étrangleur M10 CQB", description: "Resserre la gerbe au tir à la hanche." },
        { id: "precision_choke", nom: "Étrangleur Breacher Precision", description: "Resserre fortement la gerbe (portée utile accrue)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret (pas d'effet de stat publié)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, un peu moins de vélocité.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bull", nom: "Canon long 19.8\" Bull", description: "Portée et gerbe plus serrée (longue portée)." },
        { id: "overload", nom: "Canon 17\" Overload", description: "Canon polyvalent." },
        { id: "light", nom: "Canon léger 15.5\"", description: "Manie plus vite." },
        { id: "zephyr", nom: "Canon court 14\" Zephyr-R", description: "Maniabilité maximale." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Améliore le contrôle." },
        { id: "redwell_dash", nom: "Poignée Redwell Dash", description: "Améliore la mobilité." },
        { id: "steady90", nom: "Poignée EAM Steady-90", description: "Améliore la stabilité." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "no_stock", nom: "Sans crosse", description: "Manie nettement plus vite (tir à la hanche)." },
        { id: "collapsible", nom: "Crosse repliable", description: "Bon compromis maniabilité." },
        { id: "mfs_xk", nom: "Crosse MFS XK-Lite", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-25" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Améliore la stabilité de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée accrue, plus de précision." },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires." },
        { id: "pump_rod", nom: "Tige de pompe", description: "Réarmement (cadence) plus rapide." }
      ]}
    ]
  },
  {
    id: "sg_12",
    nom: "SG-12",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Pompe semi-auto. Stats de base RÉELLES (Warzone, codmunity.gg). Accessoires réels ; codmunity ne publie pas de chiffres d'effet (sauf capacité chargeur).
    stats_base: {
      degats: 95, portee_m: 14, cadence_cpm: 212, velocite_ms: 320,
      capacite_chargeur: 9, vitesse_visee_ms: 220, sprint_to_fire_ms: 200,
      vitesse_rechargement_ms: 2860, gun_kick: 32.47, recul_horizontal: 34.04,
      recul_vertical: 91.59, mobilite: 4.7
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." },
        { id: "lunette_2x", nom: "Lunette 2x", description: "Faible grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akita_choke", nom: "Étrangleur Akita Full Bore-12", description: "Resserre la gerbe en stance tactique (visée)." },
        { id: "fang_choke", nom: "Étrangleur Fang Modified", description: "Resserre la gerbe au tir à la hanche." },
        { id: "onyx_brake", nom: "Frein Breacher Onyx", description: "Réduit le recul (effet non chiffré)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret (pas d'effet de stat publié)." }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker_reach", nom: "Canon long 20\" Hawker Reach", description: "Portée utile accrue." },
        { id: "universal", nom: "Canon hybride 17\" Universal", description: "Canon polyvalent." },
        { id: "lockshot", nom: "Canon vélocité 19\" Lockshot", description: "Vélocité des plombs accrue." },
        { id: "crit_strike", nom: "Canon dégâts 18\" Crit-Strike", description: "Dégâts accrus." },
        { id: "mini_cut", nom: "Canon court 15\" EAM-Mini Cut", description: "Manie plus vite." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Améliore le contrôle." },
        { id: "redwell_dash", nom: "Poignée Redwell Dash", description: "Améliore la mobilité." },
        { id: "sapper", nom: "Poignée Sapper Guard", description: "Recul réduit et mobilité (effet non chiffré)." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hcomb", nom: "Chargeur H-Comb (10)", description: "+1 cartouche.", modificateurs: { capacite_chargeur: "+1" } },
        { id: "bighorn", nom: "Tambour Bowen Bighorn (14)", description: "+5 cartouches.", modificateurs: { capacite_chargeur: "+5" } },
        { id: "streamline", nom: "Chargeur rapide Streamline (6)", description: "Recharge plus vite, -3 cartouches.", modificateurs: { capacite_chargeur: "-3" } },
        { id: "collie", nom: "Chargeur Flip Collie (8)", description: "Recharge plus vite, -1 cartouche.", modificateurs: { capacite_chargeur: "-1" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "alignlite", nom: "Poignée Align-Lite (Quickdraw)", description: "Visée plus rapide (effet non chiffré)." },
        { id: "dashbound", nom: "Poignée Dashbound (tir-sprint)", description: "Tir après sprint plus rapide (effet non chiffré)." },
        { id: "dawnvoid", nom: "Poignée LTI DawnVoid (précision)", description: "Améliore la précision (effet non chiffré)." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "overrun", nom: "Crosse Overrun (mobilité)", description: "Améliore la mobilité (effet non chiffré)." },
        { id: "b3_dragstep", nom: "Crosse B3-Dragstep (ADS mobilité)", description: "Déplacement en visée amélioré." },
        { id: "anchor", nom: "Crosse Anchor (contrôle)", description: "Réduit le recul (effet non chiffré)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Améliore la stabilité de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée et précision accrues." },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires." },
        { id: "lw_trigger", nom: "Détente allégée (LW Trigger)", description: "Cadence de tir plus rapide." }
      ]}
    ]
  },
  {
    id: "echo_12",
    nom: "Echo 12",
    categorie: "Fusil à pompe",
    jeu: "Black Ops 7",
    // Pompe. Stats de base RÉELLES (Warzone, codmunity.gg). Accessoires réels ; chiffres d'effet publiés uniquement sur quelques-uns.
    stats_base: {
      degats: 100, portee_m: 13, cadence_cpm: 75, velocite_ms: 320,
      capacite_chargeur: 12, vitesse_visee_ms: 240, sprint_to_fire_ms: 230,
      vitesse_rechargement_ms: 2853, gun_kick: 36.9, recul_horizontal: 35.86,
      recul_vertical: 106.19, mobilite: 4.6
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "lethal_elo", nom: "Lethal Tools ELO", description: "Viseur holographique." },
        { id: "kepler_dot", nom: "Kepler-Pro Red Dot", description: "Point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "binary_choke", nom: "Étrangleur Binary Echo", description: "Resserre la gerbe (portée utile accrue)." },
        { id: "echo_choke", nom: "Étrangleur Echo Modified", description: "Resserre la gerbe au tir à la hanche." },
        { id: "twin_damp", nom: "Twin Dampener", description: "Réduit le recul (effet non chiffré)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "magellan", nom: "Canon 18.7\" Magellan Dual", description: "Bon équilibre portée/contrôle." },
        { id: "nero_twin", nom: "Canon 17.3\" Nero-Twin", description: "Canon polyvalent." },
        { id: "proton", nom: "Canon 16.1\" Proton", description: "Canon polyvalent." },
        { id: "ghostline", nom: "Canon court 15\" Ghostline", description: "Manie plus vite." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "bravotap", nom: "Tambour VAS BravoTap", description: "Capacité augmentée (tambour)." },
        { id: "fortrex", nom: "Tambour Greaves Fortrex", description: "Capacité augmentée (tambour)." }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "traverse", nom: "Poignée Traverse", description: "Améliore la maniabilité." },
        { id: "phantom17", nom: "Poignée Phantom-17", description: "Améliore la stabilité." },
        { id: "axel", nom: "Poignée Axel Control", description: "Améliore le contrôle." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "scatterproof", nom: "Crosse Scatterproof", description: "Resserre la gerbe en stance tactique." },
        { id: "stalker", nom: "Crosse Greaves Stalker", description: "Améliore le contrôle." },
        { id: "stonewall", nom: "Crosse EAM Stonewall (ADS mobilité)", description: "Déplacement en visée amélioré." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Améliore la stabilité de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée/précision, recul réduit, moins de vélocité.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", velocite_ms: "-25%" } },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires." },
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
    // Fusil à pompe automatique (cadence élevée). Stats de base RÉELLES (Warzone, codmunity.gg). Accessoires réels (effets peu publiés).
    stats_base: {
      degats: 70, portee_m: 12, cadence_cpm: 400, velocite_ms: 320,
      capacite_chargeur: 12, vitesse_visee_ms: 210, sprint_to_fire_ms: 160,
      vitesse_rechargement_ms: 2900, gun_kick: 24.67, recul_horizontal: 24.48,
      recul_vertical: 64.12, mobilite: 4.8
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "reflex", nom: "Reflex", description: "Point rouge ouvert." },
        { id: "lunette_2x", nom: "Lunette 2x", description: "Faible grossissement." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akita_choke", nom: "Étrangleur Akita Full Bore-12", description: "Resserre la gerbe en stance tactique." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret (pas d'effet de stat publié)." },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_long", nom: "Canon long", description: "Portée utile accrue." },
        { id: "canon_court", nom: "Canon court", description: "Manie plus vite." },
        { id: "canon_velocite", nom: "Canon vélocité", description: "Vélocité des plombs accrue." }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Améliore le contrôle." },
        { id: "mobility_grip", nom: "Poignée mobilité", description: "Améliore la mobilité." }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "ext_mag", nom: "Chargeur étendu", description: "Capacité augmentée.", modificateurs: { capacite_chargeur: "+6" } },
        { id: "fast_mag", nom: "Chargeur rapide", description: "Recharge plus vite, capacité réduite.", modificateurs: { capacite_chargeur: "-3" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide (effet non chiffré)." },
        { id: "s2f", nom: "Poignée tir-sprint", description: "Tir après sprint plus rapide (effet non chiffré)." }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Crosse standard —" },
        { id: "mobility_stock", nom: "Crosse mobilité", description: "Améliore la mobilité." },
        { id: "control_stock", nom: "Crosse contrôle", description: "Réduit le recul (effet non chiffré)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Améliore le tir à la hanche (visible)." },
        { id: "convergence", nom: "Laser Convergence Box", description: "Améliore la stabilité de visée (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "slug", nom: "12 Gauge Slug", description: "Projectile unique : portée et précision accrues." },
        { id: "dragons_breath", nom: "12 Gauge Dragon's Breath", description: "Munitions incendiaires." }
      ]}
    ]
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
    // Stats de base RÉELLES (Warzone, source codmunity.gg).
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
        { id: "compensateur", nom: "Compensateur", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-24%", recul_vertical: "-25%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise davantage à la verticale.", modificateurs: { gun_kick: "-29%", recul_vertical: "-30%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret et rapide en vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+20%", vitesse_visee_ms: "+28%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+35%" } },
        { id: "canon_long", nom: "Canon long", description: "Améliore la portée effective.", modificateurs: { portee_m: "+15%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+10%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Recul nettement accru.", modificateurs: { gun_kick: "+49%", recul_horizontal: "+20%", recul_vertical: "+50%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+5 balles, vise et recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+17%", sprint_to_fire_ms: "+32%", vitesse_rechargement_ms: "+30%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+10 balles, encore plus lent à manier.", modificateurs: { capacite_chargeur: "+10", vitesse_visee_ms: "+28%", sprint_to_fire_ms: "+50%", vitesse_rechargement_ms: "+28%" } },
        { id: "mag_etendu3", nom: "Chargeur étendu III", description: "+40 balles, très lourd à manier.", modificateurs: { capacite_chargeur: "+40", vitesse_visee_ms: "+38%", sprint_to_fire_ms: "+68%", vitesse_rechargement_ms: "+45%" } },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-18%", vitesse_rechargement_ms: "-17%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-32%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-5%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_lestee", nom: "Crosse lestée", description: "Recul fortement réduit, mais vise plus lentement.", modificateurs: { gun_kick: "-40%", recul_horizontal: "-40%", recul_vertical: "-40%", vitesse_visee_ms: "+13%", sprint_to_fire_ms: "+23%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible par l'ennemi)." },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "surpressurise", nom: "9x18mm surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-13%", recul_vertical: "-13%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-10%", gun_kick: "+15%", recul_horizontal: "+10%", recul_vertical: "+15%" } }
      ]}
    ]
  },
  {
    id: "jager_45",
    nom: "Jäger 45",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Pistolet semi-auto par défaut de Black Ops 7. Stats de base RÉELLES (source codmunity.gg).
    stats_base: {
      degats: 34, portee_m: 15, cadence_cpm: 600, velocite_ms: 410,
      capacite_chargeur: 15, vitesse_visee_ms: 162, sprint_to_fire_ms: 115,
      vitesse_rechargement_ms: 2394, gun_kick: 25.16, recul_horizontal: 20.15,
      recul_vertical: 28.92, mobilite: 5.3
    },
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mini_reflex", nom: "Mini réflex", description: "Petit point rouge." },
        { id: "pistol_scope", nom: "Lunette pistolet", description: "Lunette de visée." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "frein", nom: "Frein de bouche", description: "Stabilise un peu le recul.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "suppresseur", nom: "Suppresseur", description: "Discret (pas d'effet de stat notable)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+37%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_court", nom: "Canon court", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-11%" } },
        { id: "canon_velocite", nom: "Canon haute vélocité", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+45%" } },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+30%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag1", nom: "Chargeur rapide I", description: "Manie et recharge plus vite, −2 balles.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-14%", vitesse_rechargement_ms: "-24%", capacite_chargeur: "-2" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+2 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+2", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+17%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+5 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+20%", sprint_to_fire_ms: "+28%", vitesse_rechargement_ms: "+20%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "grip_s2f", nom: "Poignée tir-sprint", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-28%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "stabilisation", nom: "Poignée de stabilisation", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "haute_velocite", nom: "Munitions haute vélocité", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul accru.", modificateurs: { cadence_cpm: "+9%", gun_kick: "+20%", recul_horizontal: "+15%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "velox_57",
    nom: "Velox 5.7",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Pistolet à rafale de 3 coups (Black Ops 7). Stats de base RÉELLES (source codmunity.gg).
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
        { id: "compensateur", nom: "Compensateur G-57 Viper", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-14%", recul_vertical: "-15%" } },
        { id: "frein", nom: "Frein Greaves Narrow", description: "Stabilise un peu le recul.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "suppresseur", nom: "Suppresseur Greaves Covert-5", description: "Discret (pas d'effet de stat notable)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+11%", vitesse_visee_ms: "+34%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_anodized", nom: "Canon Anodized 7.1\"", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "canon_tarrow", nom: "Canon T-Arrow 7.8\"", description: "Allonge la portée.", modificateurs: { portee_m: "+22%" } },
        { id: "canon_lx3m", nom: "Canon LX-3M 5.2\"", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+11%" } },
        { id: "canon_anvil", nom: "Canon Anvil 5.2\"", description: "Recul nettement accru.", modificateurs: { gun_kick: "+30%", recul_horizontal: "+20%", recul_vertical: "+30%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide Serpens", description: "Recharge plus rapide.", modificateurs: { vitesse_rechargement_ms: "-15%" } },
        { id: "mag_corvus", nom: "Chargeur étendu Corvus", description: "+3 balles.", modificateurs: { capacite_chargeur: "+3" } },
        { id: "mag_draco2", nom: "Chargeur étendu Draco II", description: "+9 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+9", vitesse_visee_ms: "+13%", sprint_to_fire_ms: "+18%", vitesse_rechargement_ms: "+22%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quick_spine", nom: "Poignée Quick Spine", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-44%" } },
        { id: "nt_speed", nom: "Poignée NT-Speed", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-27%" } },
        { id: "rdw12", nom: "Poignée RDW-12", description: "Réduit le recul.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" } },
        { id: "hunter", nom: "Poignée Hunter Stability", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo Velox 5.7", description: "Double pistolet : recharge plus lente, dégâts réduits.", modificateurs: { vitesse_rechargement_ms: "+24%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_rapid", nom: "Laser Rapid Sight", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-18%" } },
        { id: "laser_airglide", nom: "Laser cible AirGlide", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+10%" } },
        { id: "laser_tactique", nom: "Laser tactique XS-1", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "recul_accelere", nom: "Système de recul accéléré", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "surpressurise", nom: "5.7 surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "cycle_ameliore", nom: "Système de cycle amélioré", description: "Cadence accrue mais recul fortement dégradé.", modificateurs: { cadence_cpm: "+3%", velocite_ms: "-8%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "coda_9",
    nom: "Coda 9",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Pistolet entièrement automatique (Black Ops 7). Stats de base RÉELLES (source codmunity.gg).
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
        { id: "compensateur", nom: "Compensateur H-9mm", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "frein", nom: "Frein Hawker-9", description: "Stabilise un peu le recul.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "suppresseur", nom: "Suppresseur Bowen 9mm", description: "Discret (pas d'effet de stat notable)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+12%", vitesse_visee_ms: "+31%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_banisher", nom: "Canon Banisher 5.6\"", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+30%" } },
        { id: "canon_halberd", nom: "Canon Halberd 6.3\"", description: "Allonge la portée.", modificateurs: { portee_m: "+25%" } },
        { id: "canon_epsilon", nom: "Canon Epsilon-1 5\"", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+12%" } },
        { id: "canon_paragon", nom: "Canon Paragon 4.1\"", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-11%", sprint_to_fire_ms: "-21%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide NanoFeed", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-20%", capacite_chargeur: "-5" } },
        { id: "mag_hellgate", nom: "Chargeur Hellgate", description: "+5 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+5", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+9%" } },
        { id: "mag_deltacell", nom: "Chargeur DeltaCell Bulk", description: "+10 balles, recul fortement réduit, mais recharge plus lente.", modificateurs: { gun_kick: "-30%", recul_horizontal: "-30%", recul_vertical: "-30%", mobilite: "+14%", capacite_chargeur: "+10", vitesse_rechargement_ms: "+20%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "express", nom: "Poignée Express", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-14%" } },
        { id: "pincer", nom: "Poignée Pincer", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "muse", nom: "Poignée Muse", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "terra", nom: "Poignée Terra-1X", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-5%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo Coda 9", description: "Double pistolet : recharge plus lente, recul accru.", modificateurs: { vitesse_rechargement_ms: "+13%", gun_kick: "+10%", recul_horizontal: "+10%", recul_vertical: "+10%" } },
        { id: "discharge", nom: "Mod décharge adaptative", description: "Recul quasi nul et visée rapide, mais cadence fortement réduite.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-95%", recul_vertical: "-95%", vitesse_visee_ms: "+29%", sprint_to_fire_ms: "+26%", cadence_cpm: "-72%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_pulse", nom: "Laser 1mW Pulse", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-17%" } },
        { id: "laser_kflash", nom: "Laser cible K-Flash", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+15%" } },
        { id: "laser_flex", nom: "Laser tactique Flex", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%" } },
        { id: "surpressurise", nom: "9mm surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "groupe_culasse", nom: "Groupe culasse", description: "Cadence accrue mais recul dégradé.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-8%", gun_kick: "+20%", recul_horizontal: "+20%", recul_vertical: "+20%" } }
      ]}
    ]
  },
  {
    id: "pistolet_1911",
    nom: "1911",
    categorie: "Pistolet",
    jeu: "Black Ops 7",
    // Pistolet .45 semi-auto classique (Black Ops 7). Stats de base RÉELLES (source codmunity.gg).
    stats_base: {
      degats: 40, portee_m: 16, cadence_cpm: 400, velocite_ms: 450,
      capacite_chargeur: 7, vitesse_visee_ms: 150, sprint_to_fire_ms: 120,
      vitesse_rechargement_ms: 2337, gun_kick: 36.63, recul_horizontal: 32.66,
      recul_vertical: 52.66, mobilite: 5.1
    },
    emplacements: [
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur Castle", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-13%", recul_vertical: "-13%" } },
        { id: "auto_brake", nom: "Frein auto MFS Overdrive", description: "Augmente la cadence de tir.", modificateurs: { cadence_cpm: "+25%" } },
        { id: "supp_shade", nom: "Suppresseur Redwell Shade-X", description: "Discret, réduit le recul mais perd en vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-12%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+9%", vitesse_visee_ms: "+33%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_longslide", nom: "Canon Long Slide 6.4\"", description: "Allonge fortement la portée.", modificateurs: { portee_m: "+33%" } },
        { id: "canon_tessellate", nom: "Canon Tessellate 5.1\"", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+40%" } },
        { id: "canon_torx", nom: "Canon Torx 4.5\"", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+25%", portee_m: "+18%" } },
        { id: "canon_vela", nom: "Canon Vela court 3.7\"", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-12%", sprint_to_fire_ms: "-21%" } },
        { id: "canon_lout", nom: "Canon LTI Lout 4.5\"", description: "Recul nettement accru.", modificateurs: { gun_kick: "+46%", recul_horizontal: "+20%", recul_vertical: "+50%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide Lucien", description: "Manie et recharge un peu plus vite.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-4%" } },
        { id: "mag_sirius", nom: "Chargeur étendu Sirius", description: "+3 balles.", modificateurs: { capacite_chargeur: "+3" } },
        { id: "mag_rigel2", nom: "Chargeur étendu Rigel II", description: "+8 balles, manie plus lentement.", modificateurs: { capacite_chargeur: "+8", vitesse_visee_ms: "+18%", sprint_to_fire_ms: "+17%", vitesse_rechargement_ms: "+8%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eaves", nom: "Poignée Eaves Quick", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-42%" } },
        { id: "molt", nom: "Poignée Molt Regen", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-25%" } },
        { id: "f4able", nom: "Poignée F4-Able", description: "Réduit le recul.", modificateurs: { gun_kick: "-9%", recul_vertical: "-10%" } },
        { id: "stencil", nom: "Poignée Stencil", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-1%", recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "akimbo", nom: "Akimbo 1911", description: "Double pistolet : recharge et tir après sprint plus lents.", modificateurs: { sprint_to_fire_ms: "+4%", vitesse_rechargement_ms: "+15%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_rapid", nom: "Laser Rapid Sight", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-17%" } },
        { id: "laser_airglide", nom: "Laser cible AirGlide", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+18%" } },
        { id: "laser_tactique", nom: "Laser tactique XS-1", description: "Améliore le tir à la hanche (visible)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "surpressurise", nom: ".45 surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+15%" } },
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
