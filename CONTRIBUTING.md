# Charte de rédaction

Ce fichier est le contrat de style du site de documentation myColis. Lisez-le avant d'écrire ou de modifier une page. Ce qu'il ne couvre pas se décide d'après le précédent le plus proche déjà publié sur le site, puis d'après la documentation myDiagnostic, dont ce site reprend la structure.

## À qui vous écrivez

Le lecteur est un marchand Shopify qui expédie avec son contrat Colissimo, pas un développeur. Il connaît l'admin Shopify et son espace Colissimo Box. Il ne connaît ni le JSON, ni le vocabulaire du code de myColis. Ne lui demandez jamais de lire du code, et ne nommez jamais un champ interne, une colonne de base de données, un métachamp ou un code produit, sauf si l'app l'affiche à l'écran ou si le marchand doit le saisir lui-même. Seule exception à ce jour : la définition de métachamp `mycolis.customs_description`, que le marchand crée dans Shopify.

## Ce qui est documenté

Le site décrit uniquement ce qui existe et fonctionne dans la version publiée de myColis. C'est une règle de la review Shopify, et elle ne souffre aucune exception :

- pas de fonction prévue, en cours ou annoncée, ni de mot qui en promet une (« bientôt », « prochainement », « à venir ») ;
- pas de prix myColis : les plans se décrivent par leurs quotas et leurs fonctions, et seule la page des plans de Shopify donne les tarifs ;
- pas de mention d'un environnement de développement ni d'une version non publique de myColis ;
- pas de carte des points relais tant que l'app ne l'affiche pas.

Quand l'app change, la page change dans le même lot de travail.

## Voix

- Vouvoyez le lecteur.
- Écrivez au présent. L'app fait les choses maintenant, elle ne « fera » rien.
- Employez l'impératif pour les actions du lecteur : « Ouvrez la commande », « Cochez le tarif ».
- Faites des phrases courtes. Une idée par phrase, une idée par paragraphe.
- Énoncez des faits : ce que fait l'app, et ce qui se passe ensuite. Rien de plus.
- Dites ce qu'un réglage change pour l'étiquette, pour la commande ou pour le client, pas seulement comment il s'appelle.

## Forme

La page est rédigée en prose, en paragraphes clairs.

- Une liste numérotée sert uniquement à une procédure : une action concrète par élément, chacune commençant par un verbe à l'impératif. Un élément qui décrit au lieu d'agir appartient à un paragraphe.
- Pas de liste à puces, sauf nécessité réelle, comme les liens de fin de page. Plusieurs prérequis s'écrivent en une phrase.
- Les tableaux sont réservés à la référence : codes d'erreur, pays, formats, messages.

## Typographie

Le site est écrit en français. Il suit la typographie des textes de l'app, pour qu'une citation et la phrase qui l'entoure se ressemblent :

- apostrophe droite (') ;
- guillemets français « » pour citer un nom ou un message ;
- espace avant les deux-points, le point-virgule et le point d'interrogation, comme dans l'app ;
- nombres en chiffres, unités après une espace : 30 kg, 10 minutes, 1 000 €.

## Vocabulaire

Le vocabulaire Shopify est celui de l'admin Shopify en français, tel que myColis le reprend dans ses propres textes : commande, fiche commande, liste des commandes, emplacement, tarif de livraison, checkout, page de remerciement, suivi de commande, comptes clients, **Paramètres > Paiement**, **Plus d'actions**, **Imprimer**.

Le vocabulaire Colissimo est celui du contrat et de Colissimo Box : n° client, clé API, CN23, bordereau de dépôt, point relais, EORI, code SH, DDP.

Quand l'app emploie un mot différent de Shopify, le mot de l'app l'emporte dans la description de l'écran de l'app, et le mot de Shopify partout ailleurs.

## Marque

L'app s'appelle myColis, avec cette casse, toujours. « Colissimo » ne s'emploie que de façon descriptive : « votre contrat Colissimo », « étiquettes Colissimo », « pour Colissimo ». N'écrivez jamais que myColis est une app officielle, partenaire ou certifiée, et n'utilisez aucun logo Colissimo dans les visuels propres au site.

## Éléments d'interface

Tout ce que le lecteur clique, lit ou remplit s'écrit en **gras**, au libellé exact affiché par l'app, avec sa casse, sa ponctuation, ses guillemets et ses points de suspension :

- Sélectionnez **Enregistrer et tester la connexion**.
- Ouvrez **Plus d'actions**, puis **Créer l'étiquette (myColis)**.
- Le statut devient **Étiquette créée**.

Un message affiché par l'app se cite entre guillemets français, sans gras, au mot près.

Ne traduisez jamais un libellé, ne le reformulez pas, ne corrigez pas sa casse. Si un libellé est faux ou peu clair dans l'app, signalez-le à l'équipe myColis au lieu de le corriger dans la documentation. La page peut alors dire où se trouve vraiment le réglage, sans réécrire le message.

Chaque libellé en gras doit se retrouver tel quel dans les textes de l'app myColis, dans la version que décrit le site, ou dans l'admin Shopify pour un libellé de Shopify.

## Interdits

- Le tiret cadratin et le tiret demi-cadratin. Utilisez les deux-points pour une explication, une virgule pour un lien faible, des parenthèses pour une incise, ou un point pour deux idées distinctes.
- Les emojis, partout, titres compris.
- Les points d'exclamation.
- Les formulations promotionnelles : « puissant », « en quelques clics », « la meilleure façon de ».
- Les mots qui minimisent : « simplement », « facilement », « il suffit de », « bien sûr », « évidemment ».
- La première personne du pluriel dans les instructions. « Nous recommandons » est acceptable une fois par page au plus, quand le lecteur doit vraiment choisir et qu'une option est plus sûre. L'app dit souvent « Recommandé : » ; la page peut le reprendre.
- Toute donnée réelle : marchand, client, adresse, email, téléphone, numéro de commande ou de colis.

`npm run check` refuse les tirets, les emojis, les points d'exclamation et les mots de cette liste qu'un script peut repérer.

## Chaque page se lit seule

Un lecteur arrive depuis un moteur de recherche, sur une page, sans avoir lu les autres :

- n'écrivez jamais « comme vu plus haut » ou « dans la section précédente » d'une page à l'autre ;
- redites le fait dont le lecteur a besoin au lieu de l'envoyer le chercher ;
- renvoyez ailleurs seulement pour une tâche vraiment distincte, toujours avec un lien qui nomme sa destination : « Configurez d'abord l'expéditeur, voir [Expéditeurs](/docs/reglages/expediteurs) » ;
- n'écrivez jamais « cliquez ici » ou « voir cette page » comme texte de lien.

## Badges de plan Shopify

Quelques fonctions dépendent du plan Shopify de la boutique, pas de myColis. Elles portent un badge à côté de leur titre :

```mdx
# Choix au checkout <PlanBadge plan="plus" />
```

Valeurs acceptées : `plus` (« Shopify Plus ») et `tous` (« Tous les plans Shopify »). La source de vérité est l'app : le bloc du checkout et sa règle ne fonctionnent que sur Shopify Plus et les boutiques de développement, les blocs de la page de remerciement et du suivi de commande sur tous les plans.

Le plan myColis ne porte jamais de badge : il se dit dans le texte. Le choix au checkout demande à la fois Shopify Plus (badge `plus`) et le plan Plus de myColis, que la page nomme toujours ainsi, « le plan Plus de myColis », pour ne pas le confondre avec Shopify Plus.

## Captures d'écran

Règles de capture, toutes obligatoires :

- fenêtre de navigateur de 1440 px de large, zoom à 100 % ;
- admin Shopify en thème clair ;
- boutique de développement uniquement, avec des clients fictifs. Les commandes affichent le nom, l'adresse, le téléphone et l'email du client : aucune donnée réelle ne doit apparaître, y compris dans un titre d'onglet ou une notification ;
- recadrage sur la zone décrite, avec assez d'interface autour pour la situer ;
- aucune annotation dessinée sur l'image. Ce qu'il faut montrer se dit dans le texte.

Règles de fichier :

- format PNG, nom en kebab-case ;
- chemin `static/img/<section>/<page>-<n>.png`, où `<section>` est le dossier de la page, `<page>` son nom de fichier et `<n>` la position de l'image dans la page, à partir de 1 : `static/img/prise-en-main/connexion-colissimo-1.png`. Une page à la racine de `docs/` met ses images dans `static/img/` ;
- chaque image porte un texte alternatif qui décrit ce qu'elle montre, rédigé comme une phrase, utile à qui ne la voit pas. Jamais « capture d'écran » ni « image des réglages ».

Insérez une capture avec le composant `Screenshot`, disponible sur toutes les pages sans import, et seulement quand le fichier existe : `npm run check` refuse une image absente de `static/`.

```mdx
<Screenshot
  src="/img/prise-en-main/connexion-colissimo-1.png"
  alt="La section Connexion Colissimo des réglages de myColis, avec le n° client et la clé API."
  caption="Le résultat du dernier test reste affiché après un rechargement."
/>
```

`caption` est facultatif. Il dit ce que le lecteur doit remarquer, il ne répète pas le texte alternatif.

## Gabarit de page

Chaque page suit cette structure. Aucune page n'y déroge.

```mdx
---
sidebar_position: 2
title: Connecter votre contrat Colissimo
description: Enregistrez votre n° client et votre clé API dans myColis, puis vérifiez la connexion avec Colissimo.
---

# Connecter votre contrat Colissimo

Deux phrases au plus, qui répondent à une question : à quoi sert cette page. Dites ce que le lecteur aura fait à la fin.

## Avant de commencer

Une phrase qui donne les prérequis, par exemple : il vous faut votre n° client Colissimo et une clé API générée dans Colissimo Box.

## Première tâche

1. Ouvrez myColis.
2. Sélectionnez **Réglages**.
3. Sélectionnez **Enregistrer et tester la connexion**.

## Pour aller plus loin

- [Mode test](/docs/prise-en-main/mode-test)
- [Expéditeurs](/docs/reglages/expediteurs)
```

Règles qui accompagnent le gabarit :

- le front matter porte toujours `sidebar_position`, `title` et `description`. La description est une phrase, terminée par un point, écrite pour quelqu'un qui lit un résultat de recherche ;
- le H1 reprend exactement le `title`, et c'est le seul H1 de la page ;
- l'introduction est un paragraphe de deux phrases au plus ;
- la section « Avant de commencer » n'existe que s'il y a des prérequis ;
- le corps est organisé en titres de niveau 2. Le niveau 3 est permis pour une variante à l'intérieur d'une tâche ;
- la page se termine par une section « Pour aller plus loin » qui contient un à trois liens internes ;
- pas de section vide, pas de titre suivi directement d'un autre titre.

## Avant de commiter

Lancez le build, la vérification des types et le contrôle de la charte. Le build échoue sur un lien interne cassé, l'erreur la plus fréquente quand une page change de place :

```bash
npm run build
npm run typecheck
npm run check
```
