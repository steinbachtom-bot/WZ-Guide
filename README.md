# Éditeur de classe Warzone / Black Ops

Outil web qui montre en détail l'effet de chaque variable d'une classe Call of Duty
(arme, accessoires, atouts, équipement) sur les statistiques, façon « Gunsmith ».

## Fonctionnalités
- Modes **Warzone** et **Black Ops** (atouts et équipement différents).
- Armes réelles par catégorie (fusil d'assaut, mitraillette, FM, fusil tactique, sniper, fusil à pompe, pistolet, lanceur, mêlée).
- Accessoires avec leurs vrais effets (étiquettes colorées : vert = bonus, rouge = malus), max 5 par arme.
- Atouts et équipement, comparateur d'armes, tier list (méta), classes sauvegardées.

## Développement (édition au quotidien)
Ouvre simplement `index.html` dans un navigateur. **Aucune installation, aucune compilation** :
le JSX est transformé à la volée par Babel. C'est le mode pratique pour modifier et voir
le résultat tout de suite.

> Pour un aperçu local propre (recommandé), lance un petit serveur : `npm run preview`
> puis ouvre http://127.0.0.1:8765

## Mise en ligne (production)
En production, on ne veut **pas** de Babel dans le navigateur (lent et lourd). Avant de publier :

```bash
npm install      # une seule fois, installe esbuild
npm run build    # génère le dossier dist/
```

`npm run build` crée un dossier **`dist/`** où le JSX est **pré-compilé** (chargement bien
plus rapide, ~3 Mo de Babel en moins). **Mets en ligne le contenu de `dist/`** (et ajoute
tes images + `og-image.png`). Le dossier `dist/` est régénéré à chaque build, il n'est pas
versionné.

> Domaine de production : **wzguide.com**. Avant la mise en ligne, ajoute une image
> `og-image.png` (1200×630) à la racine pour un bel aperçu de partage.

## Activer la publicité (AdSense)
Le site est déjà câblé pour Google AdSense, dans le respect du RGPD (bandeau de
consentement + Consent Mode v2). Tant que ce n'est pas configuré, les emplacements
affichent un cadre « Espace publicitaire » et **aucun script externe n'est chargé**.

Pour passer en production une fois ton compte AdSense validé :
1. Dans `index.html`, renseigne `const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";`
2. Dans `ads.txt`, remplace `pub-XXXXXXXXXXXXXXXX` par le même identifiant (sans le `ca-`).
3. Dans la page Confidentialité (`PRIVACY` dans `index.html`), complète l'éditeur et l'email de contact.
4. `npm run build` puis mets `dist/` en ligne (avec `ads.txt` à la racine du domaine).

Les emplacements (`<AdSlot>`) se chargent en **lazy-load** (au défilement) pour préserver
la vitesse. Le bandeau de consentement est trilingue (FR/EN/DE) ; « Gérer les cookies »
(pied de page) permet de revenir sur son choix.

### Option : CMP certifié (Google Funding Choices)
Pour des **publicités personnalisées à grande échelle en Europe**, Google recommande un
CMP certifié IAB. Le code est prêt à basculer dessus :
1. Renseigne `ADSENSE_CLIENT` (voir ci-dessus).
2. Dans ton compte AdSense : **Confidentialité et messages → RGPD → créer un message**,
   puis publie-le. Le message s'injecte automatiquement via la balise AdSense.
3. Dans `index.html`, mets `const CMP_GOOGLE = true;`.

À partir de là, le bandeau maison s'efface au profit du CMP Google (pas de double
consentement), et le bouton « Gérer les cookies » rouvre le message Google. Tant que
`ADSENSE_CLIENT` est vide, c'est toujours le bandeau maison qui s'affiche (repli sûr).

> Le bandeau maison intégré gère le consentement de base + le signal Consent Mode v2 et
> suffit pour démarrer. Dans tous les cas, fais relire ta page Confidentialité.

## Fichiers
- `index.html` — l'application (interface + logique, éditée en JSX).
- `ads.txt` — déclaration des régies publicitaires autorisées (à compléter).
- `donnees.js` — toutes les données (armes, accessoires, atouts, catégories, tiers). C'est ici qu'on ajoute du contenu.
- `traductions.js` — traductions FR / EN / DE.
- `scripts/build.mjs` — génère `dist/` (build de production).
- `scripts/preview-server.mjs` — petit serveur local pour l'aperçu (`npm run preview`).

## Données
Statistiques et accessoires relevés sur codmunity.gg (jeu Black Ops 6 / Warzone).
Les chiffres peuvent évoluer à chaque mise à jour du jeu.
