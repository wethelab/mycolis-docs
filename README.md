# Documentation myColis

Site public de documentation de myColis, l'app Shopify de Webesencia qui relie une boutique au contrat Colissimo du marchand.

Le site est construit avec [Docusaurus](https://docusaurus.io/) (preset classic, TypeScript), sur le modèle de la documentation myDiagnostic (`wethelab/mydiagnostic-docs`) : même version, même thème, même structure. Les pages sont dans `docs/`, l'ordre de la barre latérale vient du front matter et des `_category_.json`, les réglages du site sont dans `docusaurus.config.ts`.

Avant d'écrire ou de modifier une page, lisez `CONTRIBUTING.md` (charte de rédaction).

## Développement local

```bash
npm install
npm start
```

Le serveur de développement tourne sur http://localhost:3000 et se recharge à chaque enregistrement.

Avant chaque commit :

```bash
npm run build
npm run typecheck
npm run check
```

Le build échoue sur un lien interne cassé. `npm run check` (`scripts/check-docs.mjs`) refuse les tirets cadratins et demi-cadratins, les emojis, les points d'exclamation, le mot « officiel » à côté de Colissimo, et toute image référencée absente de `static/`. Il refuse aussi les mots d'une liste locale facultative, `.check-docs.local.json` à la racine (tableau JSON de mots, ignoré par git), pour les noms qui ne doivent jamais paraître sur le site.

Pour vérifier la version de production en local :

```bash
npm run build
npm run serve
```

## Images de marque

Le logo est `static/img/logo.svg`. Les favicons (`favicon.ico` en 32 et 64 px, `favicon-192.png`, `favicon-512.png`) et l'image de partage `social-card.png` (1200 x 630) en sont tirés par `scripts/brand-assets.mjs`, qui les fait rendre par un Chrome sans interface à chaque taille. Si le logo change, remplacez `static/img/logo.svg`, puis relancez :

```bash
node scripts/brand-assets.mjs
```

Le script trouve le Chrome sans interface installé par Playwright ; sinon, indiquez son chemin dans la variable `CHROME`. Le manifeste `static/site.webmanifest` déclare les icônes 192 et 512.

## Langues

Le français est la langue par défaut et la seule publiée. Les textes de l'accueil et des composants passent par le système de traduction de Docusaurus (`<Translate>`, `translate()`), avec le français comme texte par défaut dans le code.

`i18n/fr/code.json` ne contient que les chaînes du thème et de la recherche locale que les traductions françaises de Docusaurus ne couvrent pas (résultats de recherche, libellés d'accessibilité). N'y recopiez pas les autres chaînes : pour la langue par défaut, une entrée de ce fichier remplace en silence le texte du code. Après une mise à jour de Docusaurus ou du plugin de recherche, lancez `npm run write-translations -- --locale fr` dans une copie de travail propre, repérez les nouvelles chaînes restées en anglais, ajoutez leur traduction ici et jetez le reste du fichier généré.

Pour ajouter l'anglais :

1. Dans `docusaurus.config.ts`, ajoutez `'en'` à `i18n.locales` (avec une entrée `localeConfigs.en`, `htmlLang: 'en-GB'`) et à `language` dans les options de la recherche locale.
2. Ajoutez à la barre de navigation un élément `{type: 'localeDropdown', position: 'right'}`.
3. Lancez `npm run write-translations -- --locale en` pour générer les fichiers de `i18n/en/`, puis traduisez-les.
4. Copiez `docs/` dans `i18n/en/docusaurus-plugin-content-docs/current/` et traduisez les pages. Les slugs français restent valables ; un `slug:` dans le front matter d'une page anglaise les remplace.
5. Traduisez les `_category_.json` dans `i18n/en/docusaurus-plugin-content-docs/current.json`.

N'ajoutez pas `en` à la configuration avant que les pages soient traduites : le sélecteur de langue mènerait vers du contenu français.

## Déploiement

Le site n'est pas encore publié. Il le sera avec la fiche App Store de myColis.

Le workflow `.github/workflows/deploy.yml` construit le site et le publie sur GitHub Pages. Il ne se lance pour l'instant qu'à la main (onglet Actions) ; à la mise en ligne, rétablissez le déclenchement sur un push vers `main`, comme indiqué dans le fichier.

Le site sera servi à l'adresse https://mycolis.docs.webesencia.com, déclarée dans `static/CNAME`. La mise en ligne demande un enregistrement DNS CNAME `mycolis.docs` vers `wethelab.github.io` et l'activation de GitHub Pages (source : GitHub Actions) dans les réglages du dépôt.
