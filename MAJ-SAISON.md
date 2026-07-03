# 🔁 Routine de mise à jour par saison

À chaque nouvelle **saison** ou **patch d'équilibrage** de Black Ops 7 / Warzone,
suis cette procédure pour garder le site à jour (c'est ce qui fait revenir les
visiteurs **et** ce que Google récompense).

## Sources de référence
- **codmunity.gg** — stats, accessoires, tier lists (source principale du projet)
- **wzstats.gg/bo7/meta** — méta & nouvelles armes
- **callofduty.com/patchnotes** — notes officielles (armes ajoutées/nerfs)

## Étapes

### 1. Repérer les changements
- Nouvelles armes ajoutées ? Armes retirées ? Stats modifiées ? Nouveaux accessoires ?
- Astuce : compare la liste codmunity/wzstats avec la nôtre via `node scripts/audit-contenu.mjs`.

### 2. Mettre à jour `donnees.js`
Un **objet arme par ligne**. Pour chaque arme concernée :
- **Ajouter une arme** : nouvel objet dans `ARMES_PRINCIPALES` (ou `ARMES_SECONDAIRES`).
  Champs : `id`, `nom`, `categorie`, `jeu`, `stats_base` (les 12 stats), `emplacements`
  (accessoires avec `modificateurs`). Tu peux cloner les `emplacements` d'une arme
  similaire puis ajuster.
- **Tier** : ajoute/maj la ligne dans `const TIERS = { ... }` (id: "S".."D").
- **Image** (optionnel) : ajoute l'URL dans `IMAGES_ARMES` (clé = id).
- **TTK par distance / par zone** (optionnel) : `DEGATS_PALIERS` / `DEGATS_PARTIES`.
- **Stats modifiées** : édite simplement `stats_base` de l'arme.

### 3. Forcer le rechargement des données
Dans `index.html`, incrémente la version de cache :
`<script src="donnees.js?v=12">` → `?v=13` (idem `traductions.js?v=…` si tu y touches).

### 4. Vérifier
```bash
node scripts/audit-contenu.mjs   # contrôle complétude (armes, accessoires, manques)
npm run build                    # compile + régénère les 164+ pages SEO + sitemap
```

### 5. Publier
```bash
git add -A && git commit -m "MAJ Saison X : armes/stats/tiers" && git push
```
Le workflow GitHub Actions déploie automatiquement (app + pages SEO + sitemap).

### 6. (Optionnel) Re-soumettre le sitemap
Dans Google Search Console → Sitemaps → re-soumettre `https://wzguide.com/sitemap.xml`
pour accélérer la prise en compte des nouvelles pages.

## Checklist nouvelle arme
- [ ] objet dans `ARMES_PRINCIPALES`/`ARMES_SECONDAIRES`
- [ ] `stats_base` complet (12 stats)
- [ ] `emplacements` avec accessoires
- [ ] entrée `TIERS`
- [ ] image dans `IMAGES_ARMES` (sinon silhouette de repli)
- [ ] `?v=` incrémenté
- [ ] `audit-contenu.mjs` OK puis `npm run build` puis push

> ⚠️ Note : images manquantes à compléter : **VX Compact**, **GDL Havoc**
> (l'icône n'apparaît pas sur leur propre page codmunity — la chercher dans la
> liste « alternatives » d'une autre arme de la même catégorie).

> ℹ️ Convention (depuis la re-sync S4 Reloaded du 03/07/2026) : `degats` =
> dégâts **torse (stomach)** du 1er palier dans le **comparateur Warzone** de
> codmunity (arme de base, sans accessoire) ; `portee_m` = fin du 1er palier ;
> `DEGATS_PALIERS` = paliers torse du même comparateur. Armes re-synchronisées :
> AN-94, VX Compact, MK35 ISR, Voyak KT-3, REV-46, Sturmwolf 45, VST, XM325,
> XR-3 Ion, Kogot-7, Maddox RFB, X9 Maverick, Warden 308, Grimhawk. Les autres
> armes gardent d'anciennes conventions (paliers BO7 multijoueur pour certaines) —
> à harmoniser lors d'une prochaine re-sync complète.
> Stats de mêlée de l'**Executioner's Duet** (dégâts/cadence/portée) : estimation
> (codmunity ne publie pas de stats pour la mêlée) — mobilité max de sa classe,
> allonge la plus courte.
