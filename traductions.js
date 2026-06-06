/* ============================================================
   WZ GUIDE — TRADUCTIONS (i18n)
   Source = français. Ce fichier fournit les traductions EN / DE.
   Clé = chaîne française exacte affichée dans l'app.
   Toute chaîne absente retombe automatiquement sur le français.

   On utilise autant que possible la TERMINOLOGIE OFFICIELLE DU JEU
   (Call of Duty : Warzone / Black Ops). Les noms propres d'armes et
   d'accessoires restent inchangés (ils sont identiques dans le jeu).

   L'enrichissement des noms/descriptions d'accessoires se fait
   progressivement : ajouter ici les paires FR -> EN / FR -> DE.
   ============================================================ */
window.TRAD = {
  en: {
    /* ---------- Navigation / interface générale ---------- */
    "Accueil": "Home",
    "Créateur de classe": "Class Builder",
    "Classes enregistrées": "Saved Classes",
    "Comparateur": "Comparison",
    "Méta / Tier list": "Meta / Tier List",
    "Replier / déplier le menu": "Collapse / expand menu",
    "Publicité": "Advertisement",
    "Espace publicitaire": "Ad space",

    /* ---------- Accueil (hero + cartes) ---------- */
    "Crée tes classes Warzone & Black Ops 7 optimales": "Build your optimal Warzone & Black Ops 7 classes",
    "Gunsmith complet, stats réelles, calcul du TTK, générateur de classe et tier list — le tout au même endroit.": "Full Gunsmith, real stats, TTK calculator, class generator and tier list — all in one place.",
    "données": "data",
    "Saison 4": "Season 4",
    "juin 2026": "June 2026",
    "Actualités": "News",
    "Les dernières mises à jour de l'app et du jeu.": "The latest app and game updates.",
    "Toute l'actu de l'app et du jeu Warzone / Black Ops 7.": "All the latest app and Warzone / Black Ops 7 news.",
    "Mise à jour": "Update",
    "Nouveauté": "New",
    "Créer une classe →": "Build a class →",
    "Explorer": "Explore",
    "Ouvrir →": "Open →",
    "Compose ton arme, tes accessoires, atouts et équipement, avec stats et TTK en direct.": "Build your weapon, attachments, perks and equipment, with live stats and TTK.",
    "Le classement des meilleures armes du moment, regroupé par catégorie.": "A ranking of the current best weapons, grouped by category.",
    "Mets deux armes côte à côte et compare-les statistique par statistique.": "Put two weapons side by side and compare them stat by stat.",
    "Retrouve, recharge et partage les classes que tu as sauvegardées.": "Find, reload and share the classes you saved.",

    /* ---------- Éditeur de classe ---------- */
    "Éditeur de classe —": "Class Editor —",
    "5 accessoires max par arme, un seul par emplacement. Étiquettes :": "Up to 5 attachments per weapon, one per slot. Tags:",
    "vert = bonus": "green = bonus",
    "rouge = malus": "red = penalty",
    "Afficher les valeurs (%)": "Show values (%)",
    "Enregistrer la classe": "Save class",
    "🔗 Partager": "🔗 Share",
    "GUNSMITH": "GUNSMITH",
    "Opus :": "Title:",
    "Catégorie :": "Category:",
    "Arme :": "Weapon:",
    "Recherche rapide :": "Quick search:",
    "Statistiques": "Statistics",
    "✨ Générateur de classe": "✨ Class generator",
    "Objectif :": "Goal:",
    "Générer la classe": "Generate class",
    "Atouts & équipement": "Perks & Equipment",
    "Atouts": "Perks",
    "Équipement": "Equipment",
    "(à venir)": "(coming soon)",

    /* ---------- Objectifs du générateur ---------- */
    "Polyvalent": "Versatile",
    "Longue portée": "Long range",
    "Courte portée": "Close range",
    "Mobilité": "Mobility",
    "Recul minimal": "Min. recoil",
    "Classe": "Class",
    "générée pour": "generated for",
    "accessoire": "attachment",
    "accessoires": "attachments",
    "Aucun accessoire utile trouvé pour cet objectif sur cette arme.": "No useful attachment found for this goal on this weapon.",

    /* ---------- Compteur d'accessoires / reset ---------- */
    "Accessoires équipés :": "Attachments equipped:",
    "— maximum atteint !": "— maximum reached!",
    "↺ Réinitialiser les accessoires": "↺ Reset attachments",

    /* ---------- TTK ---------- */
    "Cible :": "Target:",
    "Warzone (250 PV)": "Warzone (250 HP)",
    "Multijoueur (150 PV)": "Multiplayer (150 HP)",
    "Sans armure (100 PV)": "No armor (100 HP)",
    "(tir au corps, courte portée)": "(body shots, close range)",
    "Données insuffisantes": "Not enough data",
    "TTK selon la distance": "TTK by distance",
    "Données de distance indisponibles pour cette arme.": "Distance data unavailable for this weapon.",
    "PV": "HP",
    "Distance": "Distance",
    "Balles": "Shots",
    "hors de portée": "out of range",
    "Dégâts au corps par palier de distance (codmunity). TTK = (balles − 1) × cadence. Réagit à la cadence et à la portée des accessoires.": "Body damage per distance bracket (codmunity). TTK = (shots − 1) × fire interval. Reacts to fire rate and attachment range.",
    "Dégâts par zone": "Damage by body part",
    "Données par zone indisponibles pour cette arme.": "Body-part data unavailable for this weapon.",
    "Tête": "Head",
    "Cou": "Neck",
    "Torse": "Chest",
    "Ventre": "Stomach",
    "Bras": "Arms",
    "Jambes": "Legs",
    "Dégâts à courte portée (codmunity). Survole une zone. « Balles » = tirs pour éliminer la cible.": "Close-range damage (codmunity). Hover a zone. “Shots” = hits to eliminate the target.",
    "Distance (m)": "Distance (m)",
    "indispo.": "n/a",
    "TTK au corps selon la distance, d'après les paliers de dégâts réels. Plus bas = plus rapide.": "Body TTK by distance, from real damage brackets. Lower = faster.",
    "balle": "shot",
    "balles": "shots",
    "cadence": "rate",
    "c/min": "rpm",

    /* ---------- Spray pattern ---------- */
    "Spray pattern": "Spray pattern",
    "⏸ Stop": "⏸ Stop",
    "▶ Rejouer": "▶ Replay",
    "Estimation simulée d'après le recul (vertical, horizontal, gun kick) — pas le tracé exact du jeu. Réagit aux accessoires. L'animation rejoue les impacts à la cadence réelle de l'arme.": "Simulated estimate from recoil (vertical, horizontal, gun kick) — not the game's exact pattern. Reacts to attachments. The animation replays impacts at the weapon's real fire rate.",
    "● 1re balle": "● 1st shot",
    "● dernière": "● last",
    "Recul 1re balle simulé :": "Simulated first-shot recoil:",
    "du normal": "of normal",
    "Zoomer": "Zoom in",
    "Dézoomer": "Zoom out",
    "Réinitialiser le zoom": "Reset zoom",

    /* ---------- Recherche ---------- */
    "Tape un nom d'arme…": "Type a weapon name…",
    "Aucune arme trouvée": "No weapon found",

    /* ---------- Classes enregistrées ---------- */
    "Tes classes sauvegardées sur cet ordinateur. Clique « Charger » pour réappliquer une classe.": "Your classes saved on this computer. Click « Load » to re-apply a class.",
    "Aucune classe enregistrée pour l'instant. Compose une classe dans le créateur, puis clique « Enregistrer la classe ».": "No class saved yet. Build a class in the editor, then click « Save class ».",
    "Charger": "Load",
    "Supprimer": "Delete",
    "Nom de la classe :": "Class name:",
    "Lien copié ! 📋": "Link copied! 📋",
    "Copie impossible — lien : ": "Copy failed — link: ",

    /* ---------- Comparateur ---------- */
    "Comparateur d'armes": "Weapon comparison",
    "Compare les statistiques de base de deux armes — le vert indique la meilleure des deux.": "Compare the base stats of two weapons — green marks the better of the two.",
    "Arme A :": "Weapon A:",
    "Arme B :": "Weapon B:",
    "Statistique": "Stat",

    /* ---------- Méta / tier list ---------- */
    "Méta — Tier list": "Meta — Tier list",
    "Classement indicatif des armes, basé sur la méta codmunity (modifiable dans donnees.js).": "Indicative weapon ranking based on the codmunity meta (editable in donnees.js).",
    "Ouvrir dans le créateur de classe": "Open in the class builder",

    /* ---------- Stats (label + court) ---------- */
    "Dégâts": "Damage",
    "Portée (m)": "Range (m)",
    "Portée": "Range",
    "Cadence (coups/min)": "Fire rate (rpm)",
    "Cadence": "Fire rate",
    "Vélocité de balle (m/s)": "Bullet velocity (m/s)",
    "Vélocité": "Velocity",
    "Capacité du chargeur": "Magazine size",
    "Temps de visée (ms)": "ADS time (ms)",
    "Temps de visée": "ADS time",
    "Sprint-tir (ms)": "Sprint-to-fire (ms)",
    "Sprint-tir": "Sprint-to-fire",
    "Temps de rechargement (ms)": "Reload time (ms)",
    "Temps de rechargement": "Reload time",
    "Gun kick (recul caméra)": "Gun kick (camera recoil)",
    "Gun kick": "Gun kick",
    "Recul horizontal": "Horizontal recoil",
    "Recul vertical": "Vertical recoil",
    "Déplacement (m/s)": "Movement (m/s)",
    "Déplacement": "Movement",

    /* ---------- effets_extra (chips info) ---------- */
    "Flinch": "Flinch",
    "Mobilité ADS": "ADS mobility",
    "Mobilité accroupi": "Crouch mobility",
    "Recul 1re balle": "First-shot recoil",
    "Recul en visée": "ADS recoil",
    "Tir à la hanche": "Hipfire",
    "Vitesse sprint": "Sprint speed",
    "Effet réel non pris en compte dans le calcul des stats": "Real effect not factored into the stat calculation",

    /* ---------- Catégories ---------- */
    "Fusil d'assaut": "Assault Rifle",
    "Mitraillette": "SMG",
    "Fusil-mitrailleur": "LMG",
    "Fusil tactique": "Marksman Rifle",
    "Fusil de précision": "Sniper Rifle",
    "Fusil à pompe": "Shotgun",
    "Pistolet": "Pistol",
    "Lanceur": "Launcher",
    "Arme de mêlée": "Melee",
    "Arme spéciale": "Special",

    /* ---------- Emplacements ---------- */
    "Optique": "Optic",
    "Bouche": "Muzzle",
    "Canon": "Barrel",
    "Sous-canon": "Underbarrel",
    "Chargeur": "Magazine",
    "Poignée arrière": "Rear Grip",
    "Crosse": "Stock",
    "Crosse (joue)": "Stock (Comb)",
    "Laser": "Laser",
    "Mode de tir": "Fire Mode",

    /* ---------- Atouts / équipement : libellés d'emplacement ---------- */
    "Atout 1": "Perk 1",
    "Atout 2": "Perk 2",
    "Atout 3": "Perk 3",
    "Atout — Niveau 1": "Perk — Tier 1",
    "Atout — Niveau 2": "Perk — Tier 2",
    "Atout — Niveau 3": "Perk — Tier 3",
    "Équipement létal": "Lethal Equipment",
    "Équipement tactique": "Tactical Equipment",
    "Atout de terrain": "Field Upgrade",
    "— Aucun —": "— None —",

    /* ---------- ATOUTS Warzone : noms + descriptions ---------- */
    "Sprint prolongé": "Double Time",
    "Augmente la durée du sprint tactique.": "Increases tactical sprint duration.",
    "Charognard": "Scavenger",
    "Récupère des munitions sur les ennemis abattus.": "Resupply ammo from downed enemies.",
    "Démineur": "Bomb Squad",
    "Réduit les dégâts subis par les explosifs.": "Reduces damage taken from explosives.",
    "Carnage": "Overkill",
    "Permet de porter deux armes principales.": "Lets you carry two primary weapons.",
    "Fantôme": "Ghost",
    "Invisible aux UAV et drones de reconnaissance.": "Undetectable by UAVs and recon drones.",
    "Mains agiles": "Fast Hands",
    "Rechargement et manipulations plus rapides.": "Faster reloads and equipment handling.",
    "Vigilance": "High Alert",
    "Détecte les ennemis qui te repèrent.": "Detects enemies who spot you.",
    "Visée stable": "Steady Aim",
    "Réduit le recul caméra de l'arme.": "Reduces the weapon's camera recoil.",
    "Pisteur": "Tracker",
    "Affiche les traces de pas des ennemis.": "Shows enemy footstep trails.",

    /* ---------- ATOUTS Black Ops 7 : noms + descriptions ---------- */
    "Légèreté": "Lightweight",
    "Gung-Ho": "Gung-Ho",
    "Sang-froid": "Cold-Blooded",
    "Ninja": "Ninja",
    "Masque tech": "Tac Mask",
    "Gilet pare-éclats": "Flak Jacket",
    "Ombre": "Shadow",
    "Assassin": "Assassin",
    "Combat rapproché": "Close Combat",
    "Instinct de chasseur": "Hunter's Instinct",
    "Looper": "Looper",
    "Lien explosif": "Explosive Link",
    "Ingénieur": "Engineer",
    "Bricoleur": "Tinkerer",
    "Dextérité": "Dexterity",
    "Sprinteur tactique": "Tactical Sprinter",
    "Pactole": "Bankroll",
    "Cogneur": "Bruiser",
    "Vendetta": "Vendetta",
    "Intendant": "Quartermaster",
    "Lien de charge": "Charge Link",
    "Gardien": "Guardian",
    "Offense — Récupère munitions et équipement sur les ennemis abattus.": "Offense — Resupply ammo and equipment from downed enemies.",
    "Offense — Vitesse de déplacement accrue ; sauts, glissades et plongeons plus longs.": "Offense — Increased movement speed; longer jumps, slides and dives.",
    "Offense — Tire en sprintant ; plus mobile en rechargeant ou utilisant l'équipement.": "Offense — Fire while sprinting; more mobile while reloading or using equipment.",
    "Furtivité — Indétectable par le ciblage IA et les optiques thermiques.": "Stealth — Undetectable by AI targeting and thermal optics.",
    "Furtivité — Indétectable par le Scout Pulse et l'UAV en mouvement.": "Stealth — Undetectable by Scout Pulse and UAV while moving.",
    "Furtivité — Déplacements plus silencieux.": "Stealth — Quieter movement.",
    "Support — Résiste aux flash, commotions et gaz ; immunisé à l'EMP et au piratage.": "Support — Resists flash, concussion and gas; immune to EMP and hacking.",
    "Support — Réduit les dégâts explosifs et incendiaires.": "Support — Reduces explosive and incendiary damage.",
    "Support — Indétectable par les pièges et mines ennemis.": "Support — Undetectable by enemy traps and mines.",
    "Offense — Marque les ennemis en série ; ils lâchent des packs de prime.": "Offense — Marks enemies on a streak; they drop bounty packs.",
    "Offense — Déclenche automatiquement l'attaque de mêlée dédiée.": "Offense — Automatically triggers the dedicated melee attack.",
    "Offense — Tuer un ennemi marque la direction du suivant.": "Offense — Killing an enemy marks the direction of the next one.",
    "Offense — Permet de regagner des séries de points dans la même vie.": "Offense — Lets you earn scorestreaks again within the same life.",
    "Furtivité — Alerte quand tu apparais sur une mini-carte ennemie ; immunité CUAV / Brouilleur / Vendetta.": "Stealth — Alerts when you appear on an enemy minimap; immune to CUAV / Scrambler / Vendetta.",
    "Furtivité — Tes dégâts explosifs marquent les ennemis sur la mini-carte.": "Stealth — Your explosive damage marks enemies on the minimap.",
    "Furtivité — Voit l'équipement et les séries ennemis à travers les murs.": "Stealth — See enemy equipment and streaks through walls.",
    "Support — Rechargement et changement d'arme plus rapides.": "Support — Faster reloads and weapon swaps.",
    "Support — Deux charges d'atout de terrain ; piège les colis de ravitaillement.": "Support — Two field upgrade charges; booby-traps care packages.",
    "Offense — Visée complète en glissade, plongeon et saut mural ; moins de dégâts de chute.": "Offense — Full ADS while sliding, diving and wall-jumping; less fall damage.",
    "Offense — Active le sprint tactique mais réduit la vitesse de sprint normale.": "Offense — Enables tactical sprint but lowers normal sprint speed.",
    "Offense — Commence chaque vie avec +150 points de série.": "Offense — Start each life with +150 scorestreak points.",
    "Offense — Les éliminations au corps à corps régénèrent la santé et rapportent des points.": "Offense — Melee kills regenerate health and grant points.",
    "Furtivité — Localise les ennemis proches, montre leurs traces de pas, auto-ping en visant.": "Stealth — Locates nearby enemies, shows their footsteps, auto-pings while aiming.",
    "Furtivité — Au réapparition, marque la position de ton tueur ; bonus pour l'éliminer.": "Stealth — On respawn, marks your killer's position; bonus for eliminating them.",
    "Support — Recharge les utilisations d'équipement avec le temps.": "Support — Recharges equipment uses over time.",
    "Support — Recharge d'atout de terrain plus rapide ; bénéfice partagé aux alliés.": "Support — Faster field upgrade recharge; benefit shared with allies.",
    "Support — Soin plus rapide sur les objectifs ; réanime les alliés plus vite.": "Support — Faster healing on objectives; revives allies faster.",

    /* ---------- ÉQUIPEMENT : noms + descriptions ---------- */
    "Grenade à fragmentation": "Frag Grenade",
    "Grenade à délai, peut être cuisinée pour exploser en l'air.": "Timed grenade, can be cooked to explode in the air.",
    "Semtex": "Semtex",
    "Grenade collante à explosion rapide.": "Sticky grenade with a fast detonation.",
    "Couteau de lancer": "Throwing Knife",
    "Élimination en un coup, récupérable sur les ennemis.": "One-hit kill, retrievable from enemies.",
    "Thermite": "Thermite",
    "Colle à la cible et inflige des dégâts de feu dans la durée.": "Sticks to the target and deals fire damage over time.",
    "Cocktail Molotov": "Molotov Cocktail",
    "Crée une zone enflammée qui inflige des dégâts continus.": "Creates a burning zone that deals continuous damage.",
    "C4": "C4",
    "Gros explosif collant à détonation à distance.": "Large sticky explosive with remote detonation.",
    "Charge perforante": "Drill Charge",
    "Se fixe dans une surface et explose de l'autre côté (perce les murs).": "Embeds in a surface and explodes on the other side (penetrates walls).",
    "Mine de proximité": "Proximity Mine",
    "Se déclenche au passage d'un ennemi.": "Triggers when an enemy passes by.",
    "Claymore": "Claymore",
    "Mine directionnelle déclenchée par détection.": "Directional mine triggered by detection.",
    "Grenade paralysante": "Stun Grenade",
    "Ralentit les déplacements et la visée des ennemis.": "Slows enemy movement and aim.",
    "Grenade aveuglante": "Flash Grenade",
    "Aveugle et assourdit les ennemis.": "Blinds and deafens enemies.",
    "Grenade fumigène": "Smoke Grenade",
    "Déploie un écran de fumée.": "Deploys a smoke screen.",
    "Grenade Snapshot": "Snapshot Grenade",
    "Révèle brièvement la position des ennemis proches.": "Briefly reveals the position of nearby enemies.",
    "Leurre": "Decoy",
    "Simule des bruits de tir pour tromper l'ennemi.": "Simulates gunfire sounds to fool the enemy.",
    "Stim": "Stim",
    "Régénère la santé et relance le sprint tactique.": "Regenerates health and refreshes tactical sprint.",
    "Détecteur de rythme cardiaque": "Heartbeat Sensor",
    "Repère les ennemis proches sur un mini-scanner.": "Spots nearby enemies on a mini scanner.",
    "Grenade à gaz": "Gas Grenade",
    "Libère un nuage de gaz qui ralentit et endommage.": "Releases a gas cloud that slows and damages.",
    "Grenade à fragmentation en grappe": "Cluster Grenade",
    "Disperse de plus petits explosifs en détonant.": "Scatters smaller explosives on detonation.",
    "Grenade collante": "Sticky Grenade",
    "Grenade collante à retardement.": "Delayed sticky grenade.",
    "Drone aiguille": "Needle Drone",
    "Petit drone volant qui explose à l'impact (auto ou manuel).": "Small flying drone that explodes on impact (auto or manual).",
    "Arme incendiaire : crée une zone enflammée.": "Incendiary weapon: creates a burning zone.",
    "Tourelle ponctuelle": "Pocket Turret",
    "Petite tourelle déployable qui tire automatiquement sur les ennemis.": "Small deployable turret that automatically fires at enemies.",
    "Gros explosif collant, détonation à distance ou immédiate.": "Large sticky explosive, remote or instant detonation.",
    "Hache de combat": "Combat Axe",
    "Hache de lancer, élimination en un coup ; rebondit sur les surfaces.": "Throwing axe, one-hit kill; bounces off surfaces.",
    "Ralentit les déplacements et la visée de la victime.": "Slows the victim's movement and aim.",
    "Grenade EMP": "EMP Grenade",
    "Désactive ou détruit l'électronique (équipements, séries, joueurs).": "Disables or destroys electronics (equipment, streaks, players).",
    "Simule des bruits de tir pour tromper l'ennemi ; colle aux surfaces.": "Simulates gunfire to fool the enemy; sticks to surfaces.",
    "Grenade de repérage": "Pinpoint Grenade",
    "Détecte les ennemis à portée et les marque d'un traceur.": "Detects enemies in range and marks them with a tracer.",
    "Stimulant militaire qui soigne rapidement les blessures.": "Military stimulant that quickly heals injuries.",
    "Grenade psychotrope": "Psychosis Grenade",
    "Explose à l'impact et libère un nuage de gaz hallucinogène.": "Explodes on impact and releases a hallucinogenic gas cloud.",
    "Déploie un écran de fumée qui bloque la vue et le ciblage auto.": "Deploys a smoke screen that blocks vision and auto-targeting.",
    "Drone chasseur": "Hunter Drone",
    "Drone défensif : cible l'équipement/les séries ennemis, contre les grenades.": "Defensive drone: targets enemy equipment/streaks, counters grenades.",
    "Sacoche d'assaut": "Assault Pack",
    "Distribue des munitions et accélère les séries de points.": "Dispenses ammo and speeds up scorestreaks.",
    "Système anti-missile": "Trophy System",
    "Détruit les projectiles ennemis proches.": "Destroys nearby enemy projectiles.",
    "Brouilleur": "Scrambler",
    "Brouille la mini-carte des ennemis proches.": "Jams the minimap of nearby enemies.",
    "Insertion tactique": "Tactical Insertion",
    "Définit ton point de réapparition.": "Sets your respawn point.",
    "Agent dormant": "Sleeper Agent",
    "Te déguise brièvement en allié pour l'ennemi.": "Briefly disguises you as an ally to the enemy.",
    "Grenade à fragmentation à délai (peut être cuisinée).": "Timed frag grenade (can be cooked)."
  },

  de: {
    /* ---------- Navigation / interface générale ---------- */
    "Accueil": "Startseite",
    "Créateur de classe": "Klassen-Editor",
    "Classes enregistrées": "Gespeicherte Klassen",
    "Comparateur": "Vergleich",
    "Méta / Tier list": "Meta / Tier-Liste",
    "Replier / déplier le menu": "Menü ein-/ausklappen",
    "Publicité": "Werbung",
    "Espace publicitaire": "Werbefläche",

    /* ---------- Accueil ---------- */
    "Crée tes classes Warzone & Black Ops 7 optimales": "Erstelle deine optimalen Warzone- & Black-Ops-7-Klassen",
    "Gunsmith complet, stats réelles, calcul du TTK, générateur de classe et tier list — le tout au même endroit.": "Voller Waffenschmied, echte Werte, TTK-Rechner, Klassengenerator und Tier-Liste — alles an einem Ort.",
    "données": "Daten",
    "Saison 4": "Staffel 4",
    "juin 2026": "Juni 2026",
    "Actualités": "Neuigkeiten",
    "Les dernières mises à jour de l'app et du jeu.": "Die neuesten App- und Spiel-Updates.",
    "Toute l'actu de l'app et du jeu Warzone / Black Ops 7.": "Alle Neuigkeiten zur App und zu Warzone / Black Ops 7.",
    "Mise à jour": "Update",
    "Nouveauté": "Neu",
    "Créer une classe →": "Klasse erstellen →",
    "Explorer": "Entdecken",
    "Ouvrir →": "Öffnen →",
    "Compose ton arme, tes accessoires, atouts et équipement, avec stats et TTK en direct.": "Stelle Waffe, Anbauteile, Vorteile und Ausrüstung zusammen — mit Live-Werten und TTK.",
    "Le classement des meilleures armes du moment, regroupé par catégorie.": "Die Rangliste der aktuell besten Waffen, nach Kategorie gruppiert.",
    "Mets deux armes côte à côte et compare-les statistique par statistique.": "Stelle zwei Waffen nebeneinander und vergleiche sie Wert für Wert.",
    "Retrouve, recharge et partage les classes que tu as sauvegardées.": "Finde, lade und teile deine gespeicherten Klassen.",

    /* ---------- Éditeur de classe ---------- */
    "Éditeur de classe —": "Klassen-Editor —",
    "5 accessoires max par arme, un seul par emplacement. Étiquettes :": "Max. 5 Anbauteile pro Waffe, eins pro Slot. Markierungen:",
    "vert = bonus": "grün = Bonus",
    "rouge = malus": "rot = Malus",
    "Afficher les valeurs (%)": "Werte anzeigen (%)",
    "Enregistrer la classe": "Klasse speichern",
    "🔗 Partager": "🔗 Teilen",
    "GUNSMITH": "WAFFENSCHMIED",
    "Opus :": "Teil:",
    "Catégorie :": "Kategorie:",
    "Arme :": "Waffe:",
    "Recherche rapide :": "Schnellsuche:",
    "Statistiques": "Werte",
    "✨ Générateur de classe": "✨ Klassengenerator",
    "Objectif :": "Ziel:",
    "Générer la classe": "Klasse generieren",
    "Atouts & équipement": "Vorteile & Ausrüstung",
    "Atouts": "Vorteile",
    "Équipement": "Ausrüstung",
    "(à venir)": "(in Kürze)",

    /* ---------- Objectifs ---------- */
    "Polyvalent": "Vielseitig",
    "Longue portée": "Weite Reichweite",
    "Courte portée": "Nahbereich",
    "Mobilité": "Mobilität",
    "Recul minimal": "Min. Rückstoß",
    "Classe": "Klasse",
    "générée pour": "generiert für",
    "accessoire": "Anbauteil",
    "accessoires": "Anbauteile",
    "Aucun accessoire utile trouvé pour cet objectif sur cette arme.": "Kein nützliches Anbauteil für dieses Ziel bei dieser Waffe gefunden.",

    /* ---------- Compteur / reset ---------- */
    "Accessoires équipés :": "Ausgerüstete Anbauteile:",
    "— maximum atteint !": "— Maximum erreicht!",
    "↺ Réinitialiser les accessoires": "↺ Anbauteile zurücksetzen",

    /* ---------- TTK ---------- */
    "Cible :": "Ziel:",
    "Warzone (250 PV)": "Warzone (250 LP)",
    "Multijoueur (150 PV)": "Mehrspieler (150 LP)",
    "Sans armure (100 PV)": "Ohne Panzerung (100 LP)",
    "(tir au corps, courte portée)": "(Körpertreffer, kurze Distanz)",
    "Données insuffisantes": "Nicht genug Daten",
    "TTK selon la distance": "TTK nach Distanz",
    "Données de distance indisponibles pour cette arme.": "Distanzdaten für diese Waffe nicht verfügbar.",
    "PV": "LP",
    "Distance": "Distanz",
    "Balles": "Schüsse",
    "hors de portée": "außer Reichweite",
    "Dégâts au corps par palier de distance (codmunity). TTK = (balles − 1) × cadence. Réagit à la cadence et à la portée des accessoires.": "Körperschaden pro Distanzbereich (codmunity). TTK = (Schüsse − 1) × Schussintervall. Reagiert auf Feuerrate und Anbauteil-Reichweite.",
    "Dégâts par zone": "Schaden nach Körperzone",
    "Données par zone indisponibles pour cette arme.": "Zonendaten für diese Waffe nicht verfügbar.",
    "Tête": "Kopf",
    "Cou": "Hals",
    "Torse": "Brust",
    "Ventre": "Bauch",
    "Bras": "Arme",
    "Jambes": "Beine",
    "Dégâts à courte portée (codmunity). Survole une zone. « Balles » = tirs pour éliminer la cible.": "Schaden auf kurze Distanz (codmunity). Zone überfahren. „Schüsse“ = Treffer zum Ausschalten.",
    "Distance (m)": "Distanz (m)",
    "indispo.": "k.A.",
    "TTK au corps selon la distance, d'après les paliers de dégâts réels. Plus bas = plus rapide.": "Körper-TTK nach Distanz, aus echten Schadensbereichen. Niedriger = schneller.",
    "balle": "Schuss",
    "balles": "Schüsse",
    "cadence": "Feuerrate",
    "c/min": "S/min",

    /* ---------- Spray pattern ---------- */
    "Spray pattern": "Schussmuster",
    "⏸ Stop": "⏸ Stopp",
    "▶ Rejouer": "▶ Abspielen",
    "Estimation simulée d'après le recul (vertical, horizontal, gun kick) — pas le tracé exact du jeu. Réagit aux accessoires. L'animation rejoue les impacts à la cadence réelle de l'arme.": "Simulierte Schätzung anhand des Rückstoßes (vertikal, horizontal, Gun Kick) — nicht das exakte Spielmuster. Reagiert auf Anbauteile. Die Animation spielt die Treffer in der echten Feuerrate der Waffe ab.",
    "● 1re balle": "● 1. Schuss",
    "● dernière": "● letzter",
    "Recul 1re balle simulé :": "Simulierter Erstschuss-Rückstoß:",
    "du normal": "vom Normalwert",
    "Zoomer": "Vergrößern",
    "Dézoomer": "Verkleinern",
    "Réinitialiser le zoom": "Zoom zurücksetzen",

    /* ---------- Recherche ---------- */
    "Tape un nom d'arme…": "Waffennamen eingeben…",
    "Aucune arme trouvée": "Keine Waffe gefunden",

    /* ---------- Classes enregistrées ---------- */
    "Tes classes sauvegardées sur cet ordinateur. Clique « Charger » pour réappliquer une classe.": "Deine auf diesem Computer gespeicherten Klassen. Klicke « Laden », um eine Klasse erneut anzuwenden.",
    "Aucune classe enregistrée pour l'instant. Compose une classe dans le créateur, puis clique « Enregistrer la classe ».": "Noch keine Klasse gespeichert. Erstelle eine Klasse im Editor und klicke dann « Klasse speichern ».",
    "Charger": "Laden",
    "Supprimer": "Löschen",
    "Nom de la classe :": "Klassenname:",
    "Lien copié ! 📋": "Link kopiert! 📋",
    "Copie impossible — lien : ": "Kopieren fehlgeschlagen — Link: ",

    /* ---------- Comparateur ---------- */
    "Comparateur d'armes": "Waffenvergleich",
    "Compare les statistiques de base de deux armes — le vert indique la meilleure des deux.": "Vergleiche die Basiswerte zweier Waffen — Grün markiert die bessere von beiden.",
    "Arme A :": "Waffe A:",
    "Arme B :": "Waffe B:",
    "Statistique": "Wert",

    /* ---------- Méta ---------- */
    "Méta — Tier list": "Meta — Tier-Liste",
    "Classement indicatif des armes, basé sur la méta codmunity (modifiable dans donnees.js).": "Richtwert-Rangliste der Waffen, basierend auf der codmunity-Meta (anpassbar in donnees.js).",
    "Ouvrir dans le créateur de classe": "Im Klassen-Editor öffnen",

    /* ---------- Stats ---------- */
    "Dégâts": "Schaden",
    "Portée (m)": "Reichweite (m)",
    "Portée": "Reichweite",
    "Cadence (coups/min)": "Feuerrate (S/min)",
    "Cadence": "Feuerrate",
    "Vélocité de balle (m/s)": "Geschossgeschwindigkeit (m/s)",
    "Vélocité": "Geschwindigkeit",
    "Capacité du chargeur": "Magazingröße",
    "Temps de visée (ms)": "ZV-Zeit (ms)",
    "Temps de visée": "ZV-Zeit",
    "Sprint-tir (ms)": "Sprint-Feuer (ms)",
    "Sprint-tir": "Sprint-Feuer",
    "Temps de rechargement (ms)": "Nachladezeit (ms)",
    "Temps de rechargement": "Nachladezeit",
    "Gun kick (recul caméra)": "Gun Kick (Kamera-Rückstoß)",
    "Gun kick": "Gun Kick",
    "Recul horizontal": "Horizontaler Rückstoß",
    "Recul vertical": "Vertikaler Rückstoß",
    "Déplacement (m/s)": "Bewegung (m/s)",
    "Déplacement": "Bewegung",

    /* ---------- effets_extra ---------- */
    "Flinch": "Zucken",
    "Mobilité ADS": "ZV-Mobilität",
    "Mobilité accroupi": "Hock-Mobilität",
    "Recul 1re balle": "Erstschuss-Rückstoß",
    "Recul en visée": "ZV-Rückstoß",
    "Tir à la hanche": "Hüftfeuer",
    "Vitesse sprint": "Sprinttempo",
    "Effet réel non pris en compte dans le calcul des stats": "Tatsächlicher Effekt, der bei der Wertberechnung nicht berücksichtigt wird",

    /* ---------- Catégories ---------- */
    "Fusil d'assaut": "Sturmgewehr",
    "Mitraillette": "MP",
    "Fusil-mitrailleur": "LMG",
    "Fusil tactique": "Schützengewehre",
    "Fusil de précision": "Scharfschützengewehr",
    "Fusil à pompe": "Schrotflinte",
    "Pistolet": "Pistole",
    "Lanceur": "Werfer",
    "Arme de mêlée": "Nahkampf",
    "Arme spéciale": "Spezial",

    /* ---------- Emplacements ---------- */
    "Optique": "Optik",
    "Bouche": "Mündung",
    "Canon": "Lauf",
    "Sous-canon": "Unterlauf",
    "Chargeur": "Magazin",
    "Poignée arrière": "Hinterer Griff",
    "Crosse": "Schaft",
    "Crosse (joue)": "Schaft (Wange)",
    "Laser": "Laser",
    "Mode de tir": "Feuermodus",

    /* ---------- Atouts/équipement : libellés d'emplacement ---------- */
    "Atout 1": "Vorteil 1",
    "Atout 2": "Vorteil 2",
    "Atout 3": "Vorteil 3",
    "Atout — Niveau 1": "Vorteil — Stufe 1",
    "Atout — Niveau 2": "Vorteil — Stufe 2",
    "Atout — Niveau 3": "Vorteil — Stufe 3",
    "Équipement létal": "Tödliche Ausrüstung",
    "Équipement tactique": "Taktische Ausrüstung",
    "Atout de terrain": "Spezialausrüstung",
    "— Aucun —": "— Keine —",

    /* ---------- ATOUTS Warzone ---------- */
    "Sprint prolongé": "Doppelte Zeit",
    "Augmente la durée du sprint tactique.": "Erhöht die Dauer des taktischen Sprints.",
    "Charognard": "Aasgeier",
    "Récupère des munitions sur les ennemis abattus.": "Sammelt Munition von getöteten Gegnern.",
    "Démineur": "Bombenkommando",
    "Réduit les dégâts subis par les explosifs.": "Reduziert den durch Sprengstoffe erlittenen Schaden.",
    "Carnage": "Overkill",
    "Permet de porter deux armes principales.": "Erlaubt das Tragen von zwei Primärwaffen.",
    "Fantôme": "Geist",
    "Invisible aux UAV et drones de reconnaissance.": "Unsichtbar für UAVs und Aufklärungsdrohnen.",
    "Mains agiles": "Flinke Hände",
    "Rechargement et manipulations plus rapides.": "Schnelleres Nachladen und Hantieren.",
    "Vigilance": "Höchste Alarmstufe",
    "Détecte les ennemis qui te repèrent.": "Erkennt Gegner, die dich sehen.",
    "Visée stable": "Ruhige Hand",
    "Réduit le recul caméra de l'arme.": "Reduziert den Kamera-Rückstoß der Waffe.",
    "Pisteur": "Spurenleser",
    "Affiche les traces de pas des ennemis.": "Zeigt die Fußspuren der Gegner.",

    /* ---------- ATOUTS Black Ops 7 ---------- */
    "Légèreté": "Leichtgewicht",
    "Gung-Ho": "Gung-Ho",
    "Sang-froid": "Kaltblütig",
    "Ninja": "Ninja",
    "Masque tech": "Einsatzmaske",
    "Gilet pare-éclats": "Splitterschutzweste",
    "Ombre": "Schatten",
    "Assassin": "Assassine",
    "Combat rapproché": "Nahkampf",
    "Instinct de chasseur": "Jägerinstinkt",
    "Looper": "Looper",
    "Lien explosif": "Explosiv-Verbindung",
    "Ingénieur": "Ingenieur",
    "Bricoleur": "Bastler",
    "Dextérité": "Geschicklichkeit",
    "Sprinteur tactique": "Taktischer Sprinter",
    "Pactole": "Geldsegen",
    "Cogneur": "Schläger",
    "Vendetta": "Vendetta",
    "Intendant": "Quartiermeister",
    "Lien de charge": "Lade-Verbindung",
    "Gardien": "Wächter",
    "Offense — Récupère munitions et équipement sur les ennemis abattus.": "Offensive — Sammelt Munition und Ausrüstung von getöteten Gegnern.",
    "Offense — Vitesse de déplacement accrue ; sauts, glissades et plongeons plus longs.": "Offensive — Erhöhte Bewegungsgeschwindigkeit; längere Sprünge, Rutscher und Hechtsprünge.",
    "Offense — Tire en sprintant ; plus mobile en rechargeant ou utilisant l'équipement.": "Offensive — Schießen beim Sprinten; mobiler beim Nachladen oder Ausrüsten.",
    "Furtivité — Indétectable par le ciblage IA et les optiques thermiques.": "Tarnung — Unentdeckbar für KI-Zielerfassung und Wärmebildoptiken.",
    "Furtivité — Indétectable par le Scout Pulse et l'UAV en mouvement.": "Tarnung — Unentdeckbar für Scout-Puls und UAV in Bewegung.",
    "Furtivité — Déplacements plus silencieux.": "Tarnung — Leisere Bewegungen.",
    "Support — Résiste aux flash, commotions et gaz ; immunisé à l'EMP et au piratage.": "Unterstützung — Widersteht Blend-, Schock- und Gasgranaten; immun gegen EMP und Hacking.",
    "Support — Réduit les dégâts explosifs et incendiaires.": "Unterstützung — Reduziert Explosions- und Brandschaden.",
    "Support — Indétectable par les pièges et mines ennemis.": "Unterstützung — Unentdeckbar für gegnerische Fallen und Minen.",
    "Offense — Marque les ennemis en série ; ils lâchent des packs de prime.": "Offensive — Markiert Gegner in Serie; sie lassen Kopfgeld-Pakete fallen.",
    "Offense — Déclenche automatiquement l'attaque de mêlée dédiée.": "Offensive — Löst automatisch den speziellen Nahkampfangriff aus.",
    "Offense — Tuer un ennemi marque la direction du suivant.": "Offensive — Ein Kill markiert die Richtung des nächsten Gegners.",
    "Offense — Permet de regagner des séries de points dans la même vie.": "Offensive — Erlaubt erneutes Verdienen von Killserien im selben Leben.",
    "Furtivité — Alerte quand tu apparais sur une mini-carte ennemie ; immunité CUAV / Brouilleur / Vendetta.": "Tarnung — Warnung, wenn du auf einer gegnerischen Minikarte erscheinst; immun gegen CUAV / Störsender / Vendetta.",
    "Furtivité — Tes dégâts explosifs marquent les ennemis sur la mini-carte.": "Tarnung — Dein Explosionsschaden markiert Gegner auf der Minikarte.",
    "Furtivité — Voit l'équipement et les séries ennemis à travers les murs.": "Tarnung — Sieht gegnerische Ausrüstung und Killserien durch Wände.",
    "Support — Rechargement et changement d'arme plus rapides.": "Unterstützung — Schnelleres Nachladen und Waffenwechseln.",
    "Support — Deux charges d'atout de terrain ; piège les colis de ravitaillement.": "Unterstützung — Zwei Spezialausrüstungs-Ladungen; präpariert Versorgungspakete.",
    "Offense — Visée complète en glissade, plongeon et saut mural ; moins de dégâts de chute.": "Offensive — Volles Zielen beim Rutschen, Hechten und Wandsprung; weniger Fallschaden.",
    "Offense — Active le sprint tactique mais réduit la vitesse de sprint normale.": "Offensive — Aktiviert taktischen Sprint, senkt aber das normale Sprinttempo.",
    "Offense — Commence chaque vie avec +150 points de série.": "Offensive — Beginne jedes Leben mit +150 Killserien-Punkten.",
    "Offense — Les éliminations au corps à corps régénèrent la santé et rapportent des points.": "Offensive — Nahkampf-Kills regenerieren Lebenspunkte und bringen Punkte.",
    "Furtivité — Localise les ennemis proches, montre leurs traces de pas, auto-ping en visant.": "Tarnung — Ortet nahe Gegner, zeigt ihre Fußspuren, Auto-Ping beim Zielen.",
    "Furtivité — Au réapparition, marque la position de ton tueur ; bonus pour l'éliminer.": "Tarnung — Beim Respawn wird die Position deines Killers markiert; Bonus für dessen Ausschaltung.",
    "Support — Recharge les utilisations d'équipement avec le temps.": "Unterstützung — Lädt Ausrüstungsnutzungen mit der Zeit wieder auf.",
    "Support — Recharge d'atout de terrain plus rapide ; bénéfice partagé aux alliés.": "Unterstützung — Schnellere Spezialausrüstungs-Aufladung; Vorteil wird mit Verbündeten geteilt.",
    "Support — Soin plus rapide sur les objectifs ; réanime les alliés plus vite.": "Unterstützung — Schnellere Heilung an Zielen; belebt Verbündete schneller wieder.",

    /* ---------- ÉQUIPEMENT ---------- */
    "Grenade à fragmentation": "Splittergranate",
    "Grenade à délai, peut être cuisinée pour exploser en l'air.": "Zeitgranate, kann „gekocht“ werden, um in der Luft zu explodieren.",
    "Semtex": "Semtex",
    "Grenade collante à explosion rapide.": "Haftgranate mit schneller Detonation.",
    "Couteau de lancer": "Wurfmesser",
    "Élimination en un coup, récupérable sur les ennemis.": "Ein-Treffer-Kill, von Gegnern aufsammelbar.",
    "Thermite": "Thermit",
    "Colle à la cible et inflige des dégâts de feu dans la durée.": "Haftet am Ziel und verursacht Brandschaden über Zeit.",
    "Cocktail Molotov": "Molotow-Cocktail",
    "Crée une zone enflammée qui inflige des dégâts continus.": "Erzeugt eine brennende Zone mit anhaltendem Schaden.",
    "C4": "C4",
    "Gros explosif collant à détonation à distance.": "Großer Haftsprengstoff mit Ferndetonation.",
    "Charge perforante": "Bohrladung",
    "Se fixe dans une surface et explose de l'autre côté (perce les murs).": "Bohrt sich in eine Oberfläche und explodiert auf der anderen Seite (durchdringt Wände).",
    "Mine de proximité": "Annäherungsmine",
    "Se déclenche au passage d'un ennemi.": "Wird ausgelöst, wenn ein Gegner vorbeikommt.",
    "Claymore": "Claymore",
    "Mine directionnelle déclenchée par détection.": "Richtungsmine, ausgelöst durch Erfassung.",
    "Grenade paralysante": "Schockgranate",
    "Ralentit les déplacements et la visée des ennemis.": "Verlangsamt Bewegung und Zielen der Gegner.",
    "Grenade aveuglante": "Blendgranate",
    "Aveugle et assourdit les ennemis.": "Blendet und betäubt Gegner.",
    "Grenade fumigène": "Rauchgranate",
    "Déploie un écran de fumée.": "Erzeugt eine Rauchwand.",
    "Grenade Snapshot": "Schnappschussgranate",
    "Révèle brièvement la position des ennemis proches.": "Enthüllt kurz die Position naher Gegner.",
    "Leurre": "Köder",
    "Simule des bruits de tir pour tromper l'ennemi.": "Simuliert Schussgeräusche, um Gegner zu täuschen.",
    "Stim": "Stim",
    "Régénère la santé et relance le sprint tactique.": "Stellt Lebenspunkte wieder her und erneuert den taktischen Sprint.",
    "Détecteur de rythme cardiaque": "Herzschlagsensor",
    "Repère les ennemis proches sur un mini-scanner.": "Erfasst nahe Gegner auf einem Mini-Scanner.",
    "Grenade à gaz": "Gasgranate",
    "Libère un nuage de gaz qui ralentit et endommage.": "Setzt eine Gaswolke frei, die verlangsamt und Schaden verursacht.",
    "Grenade à fragmentation en grappe": "Streugranate",
    "Disperse de plus petits explosifs en détonant.": "Verteilt beim Detonieren kleinere Sprengsätze.",
    "Grenade collante": "Haftgranate",
    "Grenade collante à retardement.": "Haftgranate mit Zeitzünder.",
    "Drone aiguille": "Nadeldrohne",
    "Petit drone volant qui explose à l'impact (auto ou manuel).": "Kleine Flugdrohne, die beim Aufprall explodiert (auto oder manuell).",
    "Arme incendiaire : crée une zone enflammée.": "Brandwaffe: erzeugt eine brennende Zone.",
    "Tourelle ponctuelle": "Mini-Geschütz",
    "Petite tourelle déployable qui tire automatiquement sur les ennemis.": "Kleines aufstellbares Geschütz, das automatisch auf Gegner feuert.",
    "Gros explosif collant, détonation à distance ou immédiate.": "Großer Haftsprengstoff, Fern- oder Sofortdetonation.",
    "Hache de combat": "Kampfaxt",
    "Hache de lancer, élimination en un coup ; rebondit sur les surfaces.": "Wurfaxt, Ein-Treffer-Kill; prallt von Oberflächen ab.",
    "Ralentit les déplacements et la visée de la victime.": "Verlangsamt Bewegung und Zielen des Opfers.",
    "Grenade EMP": "EMP-Granate",
    "Désactive ou détruit l'électronique (équipements, séries, joueurs).": "Deaktiviert oder zerstört Elektronik (Ausrüstung, Killserien, Spieler).",
    "Simule des bruits de tir pour tromper l'ennemi ; colle aux surfaces.": "Simuliert Schussgeräusche, um Gegner zu täuschen; haftet an Oberflächen.",
    "Grenade de repérage": "Ortungsgranate",
    "Détecte les ennemis à portée et les marque d'un traceur.": "Erfasst Gegner in Reichweite und markiert sie mit einem Tracer.",
    "Stimulant militaire qui soigne rapidement les blessures.": "Militärisches Stimulans, das Wunden schnell heilt.",
    "Grenade psychotrope": "Psycho-Granate",
    "Explose à l'impact et libère un nuage de gaz hallucinogène.": "Explodiert beim Aufprall und setzt eine halluzinogene Gaswolke frei.",
    "Déploie un écran de fumée qui bloque la vue et le ciblage auto.": "Erzeugt eine Rauchwand, die Sicht und Auto-Zielerfassung blockiert.",
    "Drone chasseur": "Jägerdrohne",
    "Drone défensif : cible l'équipement/les séries ennemis, contre les grenades.": "Verteidigungsdrohne: zielt auf gegnerische Ausrüstung/Killserien, kontert Granaten.",
    "Sacoche d'assaut": "Sturmtasche",
    "Distribue des munitions et accélère les séries de points.": "Verteilt Munition und beschleunigt Killserien.",
    "Système anti-missile": "Trophy-System",
    "Détruit les projectiles ennemis proches.": "Zerstört nahe gegnerische Projektile.",
    "Brouilleur": "Störsender",
    "Brouille la mini-carte des ennemis proches.": "Stört die Minikarte naher Gegner.",
    "Insertion tactique": "Taktische Platzierung",
    "Définit ton point de réapparition.": "Legt deinen Wiedereinstiegspunkt fest.",
    "Agent dormant": "Schläferagent",
    "Te déguise brièvement en allié pour l'ennemi.": "Tarnt dich kurz als Verbündeten für den Gegner.",
    "Grenade à fragmentation à délai (peut être cuisinée).": "Splittergranate mit Zeitzünder (kann „gekocht“ werden)."
  }
};

/* ============================================================
   TRADUCTEUR D'ACCESSOIRES (fallback par tokens)
   Les noms d'accessoires suivent le schéma : <nom de pièce> + <modificateurs FR> + <marque>.
   On traduit le nom de pièce et les modificateurs connus (terminologie du jeu),
   on conserve la marque (nom propre) telle quelle. Utilisé seulement quand
   aucune traduction exacte n'existe dans window.TRAD.
   - EN : adjectif placé avant le nom (Canon long -> Long Barrel).
   - DE : déclinaison forte au nominatif (m -er / f -e / n -es) ou mot composé
          (Crosse de combat -> Kampfschaft ; Munitions haute vélocité -> Hochgeschwindigkeitsmunition).
   ============================================================ */
// Noms de pièce : [FR, {en, de, g(genre m/f/n pour déclinaison), nd(pas de déclinaison)}]
// Ordre : expressions les plus longues d'abord.
window.TRAD_TETES = [
  ["Poignée arrière", { en: "Rear Grip", de: "Hinterer Griff", nd: true }],
  ["Frein de bouche", { en: "Muzzle Brake", de: "Mündungsbremse", g: "f" }],
  ["Groupe culasse", { en: "Bolt Carrier Group", de: "Verschlussträger", nd: true }],
  ["Porte-cartouches", { en: "Shell Holder", de: "Patronenhalter", g: "m" }],
  ["Garde-main", { en: "Handguard", de: "Handschutz", g: "m" }],
  ["Sans crosse", { en: "No Stock", de: "Ohne Schaft", nd: true }],
  ["Tir rapide", { en: "Rapid Fire", de: "Schnellfeuer", nd: true }],
  ["Poignée", { en: "Grip", de: "Griff", g: "m" }],
  ["Canon", { en: "Barrel", de: "Lauf", g: "m" }],
  ["Crosse", { en: "Stock", de: "Schaft", g: "m" }],
  ["Chargeur", { en: "Magazine", de: "Magazin", g: "n" }],
  ["Laser", { en: "Laser", de: "Laser", g: "m" }],
  ["Compensateur", { en: "Compensator", de: "Kompensator", g: "m" }],
  ["Suppresseur", { en: "Suppressor", de: "Schalldämpfer", g: "m" }],
  ["Frein", { en: "Muzzle Brake", de: "Mündungsbremse", g: "f" }],
  ["Munitions", { en: "Rounds", de: "Munition", g: "f" }],
  ["Joue", { en: "Cheek Rest", de: "Wangenauflage", g: "f" }],
  ["Tambour", { en: "Drum Mag", de: "Trommelmagazin", g: "n" }],
  ["Bande", { en: "Belt", de: "Gurt", g: "m" }],
  ["Étrangleur", { en: "Choke", de: "Würger", g: "m" }],
  ["Lunette", { en: "Scope", de: "Visier", g: "n" }],
  ["Ressorts", { en: "Springs", de: "Federn", nd: true }],
  ["Détente", { en: "Trigger", de: "Abzug", g: "m" }],
  ["Couteau", { en: "Bayonet", de: "Bajonett", g: "n" }],
  ["Optique", { en: "Optic", de: "Optik", g: "f" }],
  ["Conversion", { en: "Conversion", de: "Umbau", g: "m" }],
  ["Châssis", { en: "Chassis", de: "Chassis", g: "n" }],
  ["Extension", { en: "Extension", de: "Erweiterung", g: "f" }],
  ["Système", { en: "System", de: "System", g: "n" }],
  ["Unité", { en: "Unit", de: "Einheit", g: "f" }],
  ["Kit", { en: "Kit", de: "Kit", g: "n" }],
  ["Mode", { en: "Mode", de: "Modus", g: "m" }]
];
// Modificateurs adjectivaux : FR -> {en, de(radical à décliner)}
window.TRAD_MODS_ADJ = {
  "long": { en: "Long", de: "lang" }, "longue": { en: "Long", de: "lang" },
  "court": { en: "Short", de: "kurz" }, "courte": { en: "Short", de: "kurz" },
  "léger": { en: "Light", de: "leicht" }, "légère": { en: "Light", de: "leicht" },
  "lourd": { en: "Heavy", de: "schwer" }, "lourde": { en: "Heavy", de: "schwer" },
  "renforcé": { en: "Reinforced", de: "verstärkt" }, "renforcée": { en: "Reinforced", de: "verstärkt" },
  "ventilé": { en: "Vented", de: "ventiliert" }, "ventilée": { en: "Vented", de: "ventiliert" },
  "monolithique": { en: "Monolithic", de: "monolithisch" },
  "tactique": { en: "Tactical", de: "taktisch" },
  "vertical": { en: "Vertical", de: "vertikal" }, "verticale": { en: "Vertical", de: "vertikal" },
  "ergonomique": { en: "Ergonomic", de: "ergonomisch" },
  "étendu": { en: "Extended", de: "verlängert" }, "étendue": { en: "Extended", de: "verlängert" },
  "rapide": { en: "Rapid", de: "schnell" },
  "stable": { en: "Steady", de: "stabil" },
  "équilibré": { en: "Balanced", de: "ausgewogen" }, "équilibrée": { en: "Balanced", de: "ausgewogen" },
  "réglable": { en: "Adjustable", de: "verstellbar" },
  "hybride": { en: "Hybrid", de: "hybrid" },
  "mobile": { en: "Mobile", de: "mobil" },
  "maniable": { en: "Agile", de: "wendig" },
  "lesté": { en: "Weighted", de: "beschwert" }, "lestée": { en: "Weighted", de: "beschwert" },
  "allégé": { en: "Lightened", de: "erleichtert" }, "allégée": { en: "Lightened", de: "erleichtert" },
  "pliable": { en: "Folding", de: "klappbar" },
  "repliable": { en: "Collapsible", de: "einklappbar" },
  "intégré": { en: "Integrated", de: "integriert" }, "intégrée": { en: "Integrated", de: "integriert" },
  "amélioré": { en: "Improved", de: "verbessert" }, "améliorée": { en: "Improved", de: "verbessert" },
  "angulaire": { en: "Angled", de: "gewinkelt" },
  "accéléré": { en: "Accelerated", de: "beschleunigt" }, "accélérée": { en: "Accelerated", de: "beschleunigt" },
  "imprimé": { en: "Printed", de: "gedruckt" }, "imprimée": { en: "Printed", de: "gedruckt" },
  "balistique": { en: "Ballistic", de: "ballistisch" },
  "automatique": { en: "Automatic", de: "automatisch" },
  "semi-automatique": { en: "Semi-Auto", de: "halbautomatisch" },
  "moyen": { en: "Medium", de: "mittler" }, "moyenne": { en: "Medium", de: "mittler" }
};
// Modificateurs « nom » -> {en, de(préfixe composé)}
window.TRAD_MODS_CMP = {
  "d'assaut": { en: "Assault", de: "Sturm" }, "assaut": { en: "Assault", de: "Sturm" },
  "focus": { en: "Focus", de: "Fokus" },
  "mobilité": { en: "Mobility", de: "Mobilitäts" },
  "maniabilité": { en: "Handling", de: "Handling" },
  "contrôle": { en: "Control", de: "Kontroll" },
  "précision": { en: "Precision", de: "Präzisions" },
  "stabilisation": { en: "Stabilizing", de: "Stabilisierungs" },
  "dégâts": { en: "Damage", de: "Schadens" },
  "déviation": { en: "Deflection", de: "Ablenkungs" },
  "synchro": { en: "Sync", de: "Synchron" },
  "dispersion": { en: "Spread", de: "Streuungs" },
  "recul": { en: "Recoil", de: "Rückstoß" },
  "charge": { en: "Charge", de: "Lade" },
  "saut": { en: "Jump", de: "Sprung" },
  "cible": { en: "Target", de: "Ziel" },
  "carabine": { en: "Carbine", de: "Karabiner" },
  "revolver": { en: "Revolver", de: "Revolver" },
  "portée": { en: "Range", de: "Reichweiten" },
  "rafale": { en: "Burst", de: "Salven" },
  "grenade": { en: "Grenade", de: "Granat" },
  "amortisseurs": { en: "Buffer", de: "Puffer" }, "amortisseur": { en: "Buffer", de: "Puffer" },
  "vélocité": { en: "Velocity", de: "Geschwindigkeit" },
  "suppresseur": { en: "Suppressor", de: "Schalldämpfer" },
  "cycle": { en: "Cycle", de: "Zyklus" },
  "visée": { en: "Aiming", de: "Visier" },
  "harpon": { en: "Harpoon", de: "Harpunen" },
  "bande": { en: "Belt", de: "Gurt" }
};
// Modificateurs à deux mots -> {en, de(préfixe composé)}
window.TRAD_MODS_W2 = {
  "de précision": { en: "Precision", de: "Präzisions" },
  "de visée": { en: "Aiming", de: "Ziel" },
  "de combat": { en: "Combat", de: "Kampf" },
  "de tireur": { en: "Marksman", de: "Schützen" },
  "de recul": { en: "Recoil", de: "Rückstoß" },
  "haute vélocité": { en: "High-Velocity", de: "Hochgeschwindigkeits" },
  "mouvement rapide": { en: "Fast-Motion", de: "Schnellbewegungs" },
  "visée stable": { en: "Steady-Aim", de: "Stabilvisier" },
  "contrôle de recul": { en: "Recoil-Control", de: "Rückstoßkontroll" },
  "moyenne portée": { en: "Mid-Range", de: "Mittelstrecken" },
  "longue portée": { en: "Long-Range", de: "Langstrecken" },
  "courte portée": { en: "Short-Range", de: "Kurzstrecken" },
  "anti-flinch": { en: "Anti-Flinch", de: "Anti-Flinch" },
  "tir-sprint": { en: "Sprint-Fire", de: "Sprint-Feuer" },
  "mobilité ads": { en: "ADS-Mobility", de: "ZV-Mobilitäts" },
  "lance-grenade": { en: "Grenade-Launcher", de: "Granatwerfer" },
  "lance-harpon": { en: "Harpoon-Launcher", de: "Harpunenwerfer" }
};
window.trArme = function (nom, lang) {
  if ((lang !== "en" && lang !== "de") || nom == null) return nom;
  let tete = null, headStr = "";
  for (let i = 0; i < window.TRAD_TETES.length; i++) {
    const fr = window.TRAD_TETES[i][0];
    if (nom === fr || nom.indexOf(fr + " ") === 0 || nom.indexOf(fr + "-") === 0 || nom.indexOf(fr + "(") === 0) {
      tete = window.TRAD_TETES[i][1]; headStr = fr; break;
    }
  }
  if (!tete) return nom;
  let rest = nom.slice(headStr.length).trim();
  const adjsEn = [], adjsDe = [];
  let cmpEn = "", cmpDe = "";
  let guard = 0;
  while (rest && guard++ < 6) {
    const low = rest.toLowerCase();
    // 1) deux mots
    let matched = false;
    for (const k in window.TRAD_MODS_W2) {
      if (low === k || low.indexOf(k + " ") === 0 || low.indexOf(k + "-") === 0 || low.indexOf(k + "(") === 0) {
        cmpEn = window.TRAD_MODS_W2[k].en; cmpDe = window.TRAD_MODS_W2[k].de;
        rest = rest.slice(k.length).trim(); matched = true; break;
      }
    }
    if (matched) continue;
    // 2) un mot
    const tok = rest.split(/[ (\-]/)[0];
    const tl = tok.toLowerCase();
    if (window.TRAD_MODS_ADJ[tl]) {
      adjsEn.push(window.TRAD_MODS_ADJ[tl].en); adjsDe.push(window.TRAD_MODS_ADJ[tl].de);
      rest = rest.slice(tok.length).trim(); continue;
    }
    if (window.TRAD_MODS_CMP[tl]) {
      cmpEn = window.TRAD_MODS_CMP[tl].en; cmpDe = window.TRAD_MODS_CMP[tl].de;
      rest = rest.slice(tok.length).trim(); continue;
    }
    break; // mot inconnu = marque -> on garde tel quel
  }
  let remainder = rest.replace(/^[\s\-]+/, "");
  // Nettoyage : traduire aussi les modificateurs FR situés APRÈS une marque/calibre
  // (ex : « Chargeur 5.56 NATO étendu »), au cas par cas, sans toucher aux noms propres.
  if (remainder) {
    // phrases à deux mots d'abord
    for (const k in window.TRAD_MODS_W2) {
      const re = new RegExp("(^|[ (\\-])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=$|[ )\\-])", "ig");
      remainder = remainder.replace(re, (m, p1) => p1 + window.TRAD_MODS_W2[k][lang]);
    }
    // mots simples
    remainder = remainder.replace(/[A-Za-zÀ-ÿ']+/g, (w) => {
      const tl = w.toLowerCase();
      if (window.TRAD_MODS_ADJ[tl]) return window.TRAD_MODS_ADJ[tl][lang];
      if (window.TRAD_MODS_CMP[tl]) {
        if (lang === "en") return window.TRAD_MODS_CMP[tl].en;
        // DE : forme autonome lisible (on retire le 's' de liaison du composé)
        return window.TRAD_MODS_CMP[tl].de.replace(/s$/, "");
      }
      return w;
    });
  }
  if (lang === "en") {
    const parts = [];
    if (adjsEn.length) parts.push(adjsEn.join(" "));
    if (cmpEn) parts.push(cmpEn);
    parts.push(tete.en);
    let out = parts.join(" ");
    if (remainder) out += " " + remainder;
    return out;
  }
  // allemand
  function declEnd(g) { return g === "f" ? "e" : g === "n" ? "es" : g === "m" ? "er" : ""; }
  let noun = tete.de;
  if (cmpDe) noun = cmpDe + noun.toLowerCase();   // mot composé (même pour les têtes pluriel/fixe)
  let out;
  if (adjsDe.length && !tete.nd) {
    out = adjsDe.map(s => s + declEnd(tete.g)).join(" ") + " " + noun;
  } else {
    out = noun;
  }
  if (remainder) out += " " + remainder;
  return out;
};
