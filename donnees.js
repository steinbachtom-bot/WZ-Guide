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
const TIERS_ORDRE = ["S", "A", "B", "C"];
const TIERS = {
  c9: "A",
  xmg: "A",
  grekhova: "A",
  krig_c: "B",
  lr_762: "B",
  tsarkov_762: "C",
  asg_89: "C",
  cigma_2b: "C",
  couteau: "C"
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
    // Accessoires RÉELS du Krig C (ordre du jeu).
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "volzhskiy", nom: "Volzhskiy Reflex", description: "Point rouge net, sans effet de stat notable." },
        { id: "willis3x", nom: "Willis 3x", description: "Lunette 3x pour la longue portée." },
        { id: "hawker", nom: "Hawker Hybrid", description: "Viseur hybride polyvalent." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur", description: "Réduit fortement le recul vertical.", modificateurs: { gun_kick: "-27%", recul_vertical: "-30%" } },
        { id: "comp_ported", nom: "Compensateur ventilé", description: "Stabilise verticalement.", modificateurs: { gun_kick: "-22%", recul_vertical: "-25%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Discret, gagne en portée mais vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+10%", vitesse_visee_ms: "+21%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "gain_twist", nom: "Canon Gain-Twist", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+45%" } },
        { id: "canon_long", nom: "Canon long", description: "Allonge la portée.", modificateurs: { portee_m: "+40%" } },
        { id: "canon_renforce", nom: "Canon renforcé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+20%" } },
        { id: "canon_chf", nom: "Canon CHF", description: "Tir plus serré mais recul nettement accru.", modificateurs: { gun_kick: "+48%", recul_horizontal: "+20%", recul_vertical: "+50%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit fortement le recul horizontal.", modificateurs: { gun_kick: "-3%", recul_horizontal: "-35%" } },
        { id: "poignee_prec", nom: "Poignée de précision", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-20%" } },
        { id: "poignee_ranger", nom: "Poignée Ranger", description: "Réduit le recul horizontal.", modificateurs: { gun_kick: "-2%", recul_horizontal: "-20%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I", description: "+15 balles, rechargement plus lent.", modificateurs: { capacite_chargeur: "+15", vitesse_rechargement_ms: "+10%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II", description: "+40 balles, vise et recharge plus lentement.", modificateurs: { capacite_chargeur: "+40", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+14%" } },
        { id: "fast_mag2", nom: "Chargeur rapide II", description: "Recharge et dégaine plus vite, mais −10 balles.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-10%", vitesse_rechargement_ms: "-26%", capacite_chargeur: "-10" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-29%" } },
        { id: "ergonomique", nom: "Poignée ergonomique", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-17%" } },
        { id: "assaut", nom: "Poignée d'assaut", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-45%" } },
        { id: "commando", nom: "Poignée Commando", description: "Visée et tir après sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-13%", sprint_to_fire_ms: "-20%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "sans_crosse", nom: "Sans crosse", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+24%" } },
        { id: "crosse_equilibree", nom: "Crosse équilibrée", description: "Déplacement plus rapide.", modificateurs: { mobilite: "+12%" } },
        { id: "crosse_lourde", nom: "Crosse lourde", description: "Réduit le flinch (encaissement des tirs)." }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible par l'ennemi)." },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible par l'ennemi)." }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et perte de portée/vélocité.", modificateurs: { cadence_cpm: "+12%", velocite_ms: "-15%", gun_kick: "+21%", recul_horizontal: "+30%", recul_vertical: "+20%", portee_m: "-10%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-13%", recul_horizontal: "-18%", recul_vertical: "-13%" } },
        { id: "surpressurise", nom: "5.56 surpressurisé", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "lti_mini", nom: "LTI Mini", description: "Mini point rouge." },
        { id: "kepler_rd", nom: "Kepler-Pro Red Dot", description: "Point rouge." },
        { id: "kepler_4x", nom: "Kepler Ultra 4x", description: "Lunette 4x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur Redwell 5.56", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-17%", recul_vertical: "-18%" } },
        { id: "frein", nom: "Frein RL-5.56", description: "Stabilise le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "suppresseur", nom: "Suppresseur VAS 5.56", description: "Discret (pas d'effet de stat notable)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+10%", portee_m: "+6%", vitesse_visee_ms: "+23%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_controle", nom: "Canon contrôle 16\"", description: "Plus de vélocité, recul réduit, mais vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-18%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+15%" } },
        { id: "canon_hybride", nom: "Canon hybride 16.5\"", description: "Un peu plus de vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "canon_court", nom: "Canon court 15\"", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-9%" } },
        { id: "canon_moyen", nom: "Canon moyenne portée 20\"", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-15%", velocite_ms: "-5%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_recul", nom: "Poignée contrôle de recul", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-20%" } },
        { id: "poignee_mobile", nom: "Poignée recul mobile EAM", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+9%" } },
        { id: "poignee_angle", nom: "Poignée angulaire Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide Nomad", description: "Manie et recharge plus vite.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-27%" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I (Mayday)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Bowen)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+9%", vitesse_rechargement_ms: "+29%", mobilite: "-6%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw (Peregrine)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-23%" } },
        { id: "s2f", nom: "Poignée tir-sprint (Contour)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-23%" } },
        { id: "precision", nom: "Poignée précision (Caravan-H2)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Contraband)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-15%", vitesse_visee_ms: "+6%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_mobilite", nom: "Crosse mobilité (Telescopic)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+22%" } },
        { id: "crosse_controle", nom: "Crosse contrôle (Bowen Linchpin)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%", vitesse_visee_ms: "+11%" } },
        { id: "crosse_flinch", nom: "Crosse anti-flinch (Intervention)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-8%", recul_vertical: "-8%", vitesse_visee_ms: "+9%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_visee_stable", nom: "Laser visée stable", description: "Réduit la dispersion à la hanche (visible)." },
        { id: "laser_maniabilite", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "laser_stable", nom: "Laser stable (3mW Motion Strike)", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+20%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "haute_velocite", nom: "Munitions haute vélocité", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "tir_rapide", nom: "Tir rapide", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-10%" } },
        { id: "fmj", nom: "Munitions FMJ", description: "Plus de portée, moins de vélocité.", modificateurs: { portee_m: "+16%", velocite_ms: "-18%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_led", nom: "VAS LED", description: "Point rouge." },
        { id: "lti_reflex", nom: "LTI Reflex", description: "Point rouge." },
        { id: "ristrauch_7x", nom: "RistRauch 7x", description: "Lunette de précision 7x." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-19%", recul_vertical: "-20%" } },
        { id: "frein", nom: "Frein Eclipse 7.62", description: "Stabilise le recul vertical.", modificateurs: { gun_kick: "-16%", recul_vertical: "-16%" } },
        { id: "suppresseur", nom: "Suppresseur SWF Tishina", description: "Discret (pas d'effet de stat notable)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+20%", portee_m: "+12%", vitesse_visee_ms: "+23%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_controle", nom: "Canon contrôle 17.6\" Vandal", description: "Plus de vélocité, recul réduit, vise plus lentement.", modificateurs: { velocite_ms: "+15%", gun_kick: "-20%", recul_horizontal: "-20%", recul_vertical: "-20%", vitesse_visee_ms: "+15%" } },
        { id: "canon_hybride", nom: "Canon hybride 16.3\"", description: "Un peu plus de vélocité, vise plus lentement.", modificateurs: { velocite_ms: "+8%", vitesse_visee_ms: "+4%" } },
        { id: "canon_court", nom: "Canon court 14\" Prism", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-12%" } },
        { id: "canon_moyen", nom: "Canon moyenne portée 17\"", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-25%", velocite_ms: "-6%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_recul", nom: "Poignée contrôle de recul (Lateral)", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%" } },
        { id: "poignee_deviation", nom: "Poignée déviation VAS", description: "Réduit fortement le recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-35%", recul_vertical: "-4%" } },
        { id: "poignee_mobile", nom: "Poignée recul mobile (Flowguard)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-15%", mobilite: "+6%" } },
        { id: "poignee_mobilite", nom: "Poignée mobilité (Strider)", description: "Améliore la mobilité.", modificateurs: { mobilite: "+6%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fast_mag", nom: "Chargeur rapide IronDivide", description: "Manie et recharge plus vite, −5 balles.", modificateurs: { vitesse_visee_ms: "-4%", sprint_to_fire_ms: "-5%", vitesse_rechargement_ms: "-30%", capacite_chargeur: "-5" } },
        { id: "mag_etendu1", nom: "Chargeur étendu I (Epitaph)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Saber)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+8%", sprint_to_fire_ms: "+10%", vitesse_rechargement_ms: "+30%", mobilite: "-6%" } },
        { id: "flip_mag", nom: "Chargeur Flip (Riker)", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-15%", capacite_chargeur: "+5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw (Lithe)", description: "Visée nettement plus rapide.", modificateurs: { vitesse_visee_ms: "-27%" } },
        { id: "s2f", nom: "Poignée tir-sprint (Dictum)", description: "Tir après sprint nettement plus rapide.", modificateurs: { sprint_to_fire_ms: "-43%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Kronos)", description: "Réduit le recul horizontal, vise un peu plus lentement.", modificateurs: { recul_horizontal: "-25%", vitesse_visee_ms: "+3%" } },
        { id: "precision", nom: "Poignée précision (Czar)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_mobilite", nom: "Crosse mobilité (Caliban)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+20%" } },
        { id: "crosse_controle", nom: "Crosse contrôle (Pugil)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" } },
        { id: "crosse_flinch", nom: "Crosse anti-flinch (SWF-62)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-15%", recul_vertical: "-10%", vitesse_visee_ms: "+8%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique Adaptive", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_maniabilite", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-10%" } },
        { id: "laser_stable", nom: "Laser stable (3mW Motion Strike)", description: "Améliore la portée du tir à la hanche.", modificateurs: { portee_m: "+14%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "haute_velocite", nom: "Munitions haute vélocité", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "ressorts_recul", nom: "Ressorts de recul (Buffer)", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-8%", recul_horizontal: "-12%", recul_vertical: "-8%" } },
        { id: "fmj", nom: "Munitions FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+14%", portee_m: "+14%" } },
        { id: "tir_rapide", nom: "Tir rapide (Enhanced Cycle)", description: "Cadence accrue, recul horizontal annulé mais recul vertical et vélocité dégradés.", modificateurs: { cadence_cpm: "+5%", gun_kick: "-20%", recul_horizontal: "-100%", recul_vertical: "+24%", velocite_ms: "-12%", portee_m: "-12%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vas_micro", nom: "VAS MicroFlex", description: "Mini point rouge." },
        { id: "ks_slim", nom: "K&S Slim Reflex", description: "Point rouge fin." },
        { id: "target_finder", nom: "LTI Target Finder", description: "Détecteur de cible." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "compensateur", nom: "Compensateur Redwell-90", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-20%", recul_vertical: "-20%" } },
        { id: "frein", nom: "Frein Redwell 7.62", description: "Stabilise le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "suppresseur", nom: "Suppresseur Greaves Ti-762", description: "Discret (pas d'effet de stat notable)." },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+15%", portee_m: "+8%", vitesse_visee_ms: "+22%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_controle", nom: "Canon contrôle 17\" Greaves", description: "Plus de vélocité, recul réduit, vise plus lentement.", modificateurs: { velocite_ms: "+18%", gun_kick: "-15%", recul_horizontal: "-12%", recul_vertical: "-15%", vitesse_visee_ms: "+14%" } },
        { id: "canon_hybride", nom: "Canon hybride 18\" Rift-M7", description: "Un peu plus de vélocité.", modificateurs: { velocite_ms: "+8%" } },
        { id: "canon_court", nom: "Canon court 15\" Wraith", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-9%", sprint_to_fire_ms: "-5%" } },
        { id: "canon_moyen", nom: "Canon moyenne portée 18\"", description: "Réduit le recul horizontal, un peu moins de vélocité.", modificateurs: { recul_horizontal: "-20%", velocite_ms: "-4%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_recul", nom: "Poignée contrôle de recul (Lateral)", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } },
        { id: "poignee_sentry", nom: "Poignée Sentry Pro", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-15%" } },
        { id: "poignee_mobile", nom: "Poignée recul mobile (EAM)", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-10%", mobilite: "+7%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "mag_etendu1", nom: "Chargeur étendu I (Vault)", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+4%" } },
        { id: "mag_etendu2", nom: "Chargeur étendu II (Rhodes Drum)", description: "+30 balles, manie et recharge plus lentement.", modificateurs: { capacite_chargeur: "+30", vitesse_visee_ms: "+8%", vitesse_rechargement_ms: "+26%", mobilite: "-6%" } },
        { id: "flip_mag", nom: "Chargeur Flip (TwinPack)", description: "Recharge plus vite, +5 balles.", modificateurs: { vitesse_rechargement_ms: "-14%", capacite_chargeur: "+5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "s2f", nom: "Poignée tir-sprint (Bell-H81)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } },
        { id: "quickdraw", nom: "Poignée Quickdraw (Celerity)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "stabilisation", nom: "Poignée stabilisation (Fissure)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } },
        { id: "virgil", nom: "Poignée Virgil-XI", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "comb", label: "Crosse (joue)", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "comb_s2f", nom: "Joue tir-sprint (Bell-H81)", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } },
        { id: "comb_quickdraw", nom: "Joue Quickdraw (Celerity)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-20%" } },
        { id: "comb_precision", nom: "Joue précision (Fissure)", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-8%", recul_vertical: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crosse_mobilite", nom: "Crosse mobilité (Greaves Covenant)", description: "Déplacement nettement plus rapide.", modificateurs: { mobilite: "+19%" } },
        { id: "crosse_controle", nom: "Crosse contrôle (Winch)", description: "Réduit le recul, vise un peu plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+10%" } },
        { id: "crosse_ads", nom: "Crosse ADS (Gait-Lux)", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-8%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique 2mW", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_maniabilite", nom: "Laser maniabilité (1mW Instinct)", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-8%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "haute_velocite", nom: "Munitions haute vélocité", description: "Augmente la vélocité de balle.", modificateurs: { velocite_ms: "+20%" } },
        { id: "sync_recul", nom: "Unité de synchro recul", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
        { id: "fmj", nom: "Munitions FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+18%" } },
        { id: "tir_rapide", nom: "Tir rapide (Bolt Carrier)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+4%", velocite_ms: "-15%", gun_kick: "+20%", recul_horizontal: "+25%", recul_vertical: "+20%", portee_m: "-11%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "eam_xl", nom: "EAM XL Reflex", description: "Point rouge grossissement léger." },
        { id: "eam_reflex", nom: "EAM Reflex", description: "Mini point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+10%", portee_m: "+8%", vitesse_visee_ms: "+20%" } },
        { id: "compensateur", nom: "Compensateur", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%" } },
        { id: "frein", nom: "Frein de bouche", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-18%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "canon_lourd", nom: "Canon lourd 25\" EAM", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+18%", portee_m: "+15%", vitesse_visee_ms: "+16%", mobilite: "-6%" } },
        { id: "canon_stimulus", nom: "Canon 19.4\" Stimulus", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-25%", recul_vertical: "-12%" } },
        { id: "canon_court", nom: "Canon court", description: "Manie plus vite, moins de vélocité.", modificateurs: { vitesse_visee_ms: "-8%", sprint_to_fire_ms: "-6%", velocite_ms: "-8%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "poignee_tact", nom: "Poignée avant tactique", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-12%" } },
        { id: "poignee_vert", nom: "Poignée verticale", description: "Réduit le recul vertical.", modificateurs: { recul_vertical: "-12%", vitesse_visee_ms: "+5%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "barrage_mag", nom: "Chargeur étendu Barrage", description: "+15 balles, vise un peu plus lentement.", modificateurs: { capacite_chargeur: "+15", vitesse_visee_ms: "+5%" } },
        { id: "vulcan", nom: "Vulcan Reach Extension", description: "Plus de portée et de vélocité.", modificateurs: { portee_m: "+12%", velocite_ms: "+10%" } },
        { id: "chargeur_rapide", nom: "Chargeur rapide", description: "Recharge plus vite.", modificateurs: { vitesse_rechargement_ms: "-15%" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "quickdraw", nom: "Poignée Quickdraw", description: "Visée plus rapide.", modificateurs: { vitesse_visee_ms: "-18%" } },
        { id: "s2f", nom: "Poignée tir-sprint", description: "Tir après sprint plus rapide.", modificateurs: { sprint_to_fire_ms: "-20%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "blitzfire", nom: "Crosse EAM Blitzfire", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-10%", sprint_to_fire_ms: "-10%" } },
        { id: "counterforce", nom: "Crosse MFS Counterforce-C1", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-15%", recul_vertical: "-15%", recul_horizontal: "-10%" } },
        { id: "swift_b", nom: "Crosse Swift-B Guard", description: "Améliore légèrement la mobilité.", modificateurs: { mobilite: "+3%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "laser_tactique", nom: "Laser tactique", description: "Améliore le tir à la hanche (visible)." },
        { id: "laser_maniabilite", nom: "Laser maniabilité", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-8%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "5.7x28mm FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+18%" } },
        { id: "overpressured", nom: "5.7x28mm Surpressurisé", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+15%", portee_m: "+10%" } },
        { id: "bolt_carrier", nom: "Tir rapide (Bolt Carrier Group)", description: "Cadence accrue, mais recul et vélocité dégradés.", modificateurs: { cadence_cpm: "+6%", recul_horizontal: "+15%", recul_vertical: "+12%", velocite_ms: "-12%" } }
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
    emplacements: [
      { id: "viseur", label: "Optique", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "redwell_2x", nom: "Redwell 30-S 2x", description: "Lunette grossissement 2x." },
        { id: "reflex", nom: "Reflex", description: "Mini point rouge." }
      ]},
      { id: "bouche", label: "Bouche", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "emt3_comp", nom: "Compensateur EMT3", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-12%", recul_vertical: "-12%" } },
        { id: "supp_mono", nom: "Suppresseur monolithique", description: "Plus de vélocité/portée, vise plus lentement.", modificateurs: { velocite_ms: "+15%", portee_m: "+8%", vitesse_visee_ms: "+23%" } },
        { id: "eclipse_brake", nom: "Frein Eclipse 7.62", description: "Réduit le recul vertical.", modificateurs: { gun_kick: "-10%", recul_vertical: "-10%" } },
        { id: "redwell", nom: "Suppresseur Redwell Shade-X", description: "Réduit tout le recul, moins de vélocité/portée.", modificateurs: { gun_kick: "-11%", recul_horizontal: "-11%", recul_vertical: "-11%", velocite_ms: "-13%", portee_m: "-12%" } }
      ]},
      { id: "canon", label: "Canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "hawker_fervor", nom: "Canon court 14\" Hawker Fervor", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-11%" } },
        { id: "bowen_dualist", nom: "Canon hybride 15\" Bowen Dualist", description: "Plus de vélocité.", modificateurs: { velocite_ms: "+16%" } },
        { id: "greaves_c5", nom: "Canon 19.2\" Greaves-C5", description: "Forte hausse de vélocité.", modificateurs: { velocite_ms: "+38%" } }
      ]},
      { id: "sous_canon", label: "Sous-canon", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "force_stab", nom: "Poignée Force Stabilizer", description: "Réduit fortement le recul horizontal.", modificateurs: { recul_horizontal: "-22%" } },
        { id: "ironhold", nom: "Poignée Ironhold", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-13%" } },
        { id: "sapper", nom: "Poignée Sapper Guard", description: "Réduit le recul horizontal et améliore la mobilité.", modificateurs: { recul_horizontal: "-12%", mobilite: "+9%" } },
        { id: "strider", nom: "Poignée Strider", description: "Améliore la mobilité.", modificateurs: { mobilite: "+9%" } }
      ]},
      { id: "chargeur", label: "Chargeur", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "casket", nom: "Chargeur Lineguard Casket", description: "+10 balles.", modificateurs: { capacite_chargeur: "+10" } },
        { id: "garrison", nom: "Tambour SK-Garrison", description: "+20 balles, manie/recharge plus lentement.", modificateurs: { capacite_chargeur: "+20", vitesse_visee_ms: "+10%", sprint_to_fire_ms: "+13%", vitesse_rechargement_ms: "+26%" } },
        { id: "lancing", nom: "Chargeur rapide Lancing Feather", description: "Manie/recharge plus vite, -5 balles.", modificateurs: { vitesse_visee_ms: "-6%", sprint_to_fire_ms: "-8%", vitesse_rechargement_ms: "-34%", capacite_chargeur: "-5" } }
      ]},
      { id: "poignee_arr", label: "Poignée arrière", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "crisis_q", nom: "Poignée Crisis-Q", description: "Visée et tir-sprint plus rapides.", modificateurs: { vitesse_visee_ms: "-26%", sprint_to_fire_ms: "-28%" } },
        { id: "initiator", nom: "Poignée Initiator", description: "Tir après sprint bien plus rapide.", modificateurs: { sprint_to_fire_ms: "-39%" } },
        { id: "path_net", nom: "Poignée Path Net", description: "Réduit le recul horizontal.", modificateurs: { recul_horizontal: "-8%" } }
      ]},
      { id: "crosse", label: "Crosse", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "vlast", nom: "Crosse V-Last Control", description: "Réduit tout le recul, vise plus lentement.", modificateurs: { gun_kick: "-15%", recul_horizontal: "-15%", recul_vertical: "-15%", vitesse_visee_ms: "+20%" } },
        { id: "noco", nom: "Crosse EMT3 Noco", description: "Manie plus vite.", modificateurs: { vitesse_visee_ms: "-18%", sprint_to_fire_ms: "-20%" } },
        { id: "ridgeway", nom: "Crosse Ridgeway", description: "Améliore fortement la mobilité.", modificateurs: { mobilite: "+22%" } }
      ]},
      { id: "laser", label: "Laser", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "instinct_1mw", nom: "Laser 1mW Instinct", description: "Manie plus vite (visible).", modificateurs: { vitesse_visee_ms: "-7%", sprint_to_fire_ms: "-11%" } },
        { id: "motion_3mw", nom: "Laser 3mW Motion Strike", description: "Plus de portée (visible).", modificateurs: { portee_m: "+24%" } }
      ]},
      { id: "mode_tir", label: "Mode de tir", options: [
        { id: "aucun", nom: "— Aucun —" },
        { id: "fmj", nom: "7.62 Soviet FMJ", description: "Plus de vélocité et de portée.", modificateurs: { velocite_ms: "+20%", portee_m: "+18%" } },
        { id: "buffer", nom: "Ressorts amortisseurs", description: "Réduit l'ensemble du recul.", modificateurs: { gun_kick: "-10%", recul_horizontal: "-10%", recul_vertical: "-10%" } },
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
