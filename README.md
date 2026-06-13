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

> ⚠️ Avant la mise en ligne, remplace `https://exemple.com` par l'URL réelle du site dans
> les balises `canonical` / `og:url` / `twitter` de `index.html`, et ajoute une image
> `og-image.png` (1200×630) pour un bel aperçu de partage.

## Fichiers
- `index.html` — l'application (interface + logique, éditée en JSX).
- `donnees.js` — toutes les données (armes, accessoires, atouts, catégories, tiers). C'est ici qu'on ajoute du contenu.
- `traductions.js` — traductions FR / EN / DE.
- `scripts/build.mjs` — génère `dist/` (build de production).
- `scripts/preview-server.mjs` — petit serveur local pour l'aperçu (`npm run preview`).

## Données
Statistiques et accessoires relevés sur codmunity.gg (jeu Black Ops 6 / Warzone).
Les chiffres peuvent évoluer à chaque mise à jour du jeu.
