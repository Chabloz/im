# Progressive Web App 

## Mise en place

L'objectif principal de ce TP est la réalisation d'une "Progressive Web App" ([PWA](https://fr.wikipedia.org/wiki/Progressive_web_app)) à partir de zéro (*from scratch*).

Nous allons utiliser les mêmes outils de développement que ceux du cours [
ProgWeb](https://chabloz.eu/progweb). Si vous devez refaire les installations, référez-vous au document sur la [programmation modulaire en JS](../progweb/module_base.md). Rajoutez un *loader* de *css* pour webpack grâce à la ligne suivante :
```bash
 npm install style-loader css-loader --save-dev
```
Rajoutez ce *loader* à votre config webpack en  ajoutant  aux *rules*  du fichier *webpack.config.js* la règle suivante:

```js
{ 
  test:/\.css$/,
  use: [ 'style-loader', {
    loader: 'css-loader',
    options: {url: false} 
  }],        
}      
```

Grâce à ce nouveau *loader* vous pourrez ainsi directement importer des fichiers *css* depuis vos fichiers JS grâce à un simple *import* comme dans l'exemple suivant:

```js
import 'css/main.css';
```

## HTML5

Créez le code HTML5 (dans votre dossier *dist*) d’une futur  PWA  en utilisant des balises sémantiquement proches des besoins suivants:

-   L’application possède un haut de page contenant son titre.
-   Un menu offre à l’utilisateur le choix parmi 3 fonctionnalités , les horaires des cours IM (*schedule*), une gestion de liste des choses à faire (*todo*) et une gestion de favoris Web (*bookmarks*) 
-   La fonctionnalité *todo* sera composée d’un unique formulaire comprenant deux champs de saisie, un champ pour la  *chose à faire*  et un champ (facultatif) pour la date limite.
-   Les autres fonctionnalités auront pour le moment un contenu vide.
-   L’application possédera un bas de page reprenant le nom de la  PWA  ainsi que les informations sur votre personne (au minimum votre nom et email) en respectant les formats de micro-data proposés par [schema.org](http://schema.org/) pour une sémantique compréhensible par les principaux moteurs de recherche du Web.
-   La partie *Todo* devra déjà contenir la tâche à faire suivante: “Finir les parties HTML5 et Responsive du TP du cours WebMobUi. A faire pour le mardi 26.02.2019”

## *Responsive*

### *layout*

Afin de rendre l'application disponible sur le maximum de périphérique, réalisez la *css* adéquate pour un *responsive design*.  Pour simplifier, essayez un design *vertical* comme proposé ci-après :

```ascii
 +----------------------------------+
 |      Header                      |
 +----------------------------------+
 |      Navigation                  |
 +----------------------------------+
 |                                  |
 |      Contenu principal           |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 +----------------------------------+
 |      Footer                      |
 +----------------------------------+
 ```
 
 Pour le faire, vous pouvez utiliser [CSS Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout/Les_concepts_de_base)  et/ou [CSS Flexible Box Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Flexible_Box_Layout/Concepts_de_base_flexbox).

### Media-queries et police d'icônes
La navigation pourrait prendre trop de place sur smartphone. Il faut donc proposer une autre méthode d'accès  plus adaptée aux petits écrans des smartphones. Une solution courante et de rendre la navigation invisible par défaut et d'ajouter un bouton d'accès pour l'afficher. L'utilisation  du caractère '☰' comme icone d'accès à la navigation s'est progressivement imposée. Utilisez des polices d’icônes plutôt que des images apportent certains avantages (la colorisation via css par exemple). De plus, si l'on utilise une police vectorielle, les icônes ne seront pas pixelisées sur  les écrans à forte densité de pixels (comme ceux des smartphones). Utilisez [l'app Icomoon](https://icomoon.io/app) et générez un police contenant au moins le caractère de menu et un caractère permettant d'indiquer un statut *en ligne / hors ligne* qui nous sera utile plus tard (comme par exemple l'icone de wifi, un nuage, un avion, ... ) .

Une fois la police téléchargée dans votre projet, il reste à rendre la navigation *responsive*. Ajoutez la média queries suivante à votre *css* pour cibler les écrans trop petits pour l'affichage de la navigation actuelle:
```css
screen and (max-width: 30rem), screen and (max-device-width: 30rem)
```
Puis réalisez la *css* nécessaire pour un affichage du menu en vertical plutôt qu'en horizontal. Cachez ensuite tout le menu dans votre *css* et ajoutez le caractère de menu d'icomoon (grâce au pseudo élément ::before). Finalement, réalisez le JavaScript nécessaire pour le changement d'état du menu (aussi réalisable en pure *css* si vous aimez  les défis).

## Application à page unique (*Single Page App*)
Notre PWA sera une application à page unique. Le contenu de chaque page est soit dynamiquement chargé (via AJAX, LocalStorage, ou autre), soit déjà présent dans le DOM  et change simplement entre les états visible et invisible. Une combinaison de ces deux techniques est bien sûr possible. Nous allons pour le moment utilisé la variante "déjà présent dans le DOM". 

Le défaut de  cette navigation simulée est qu'elle rend inutilisable les boutons  *back*  et  *forward* du browser, ainsi que l’utilisation des favoris (ou d’un lien direct) vers une des sections. En effet, pour le browser, il s’agit bien d’une unique page et la navigation interne n’est pas inscrite dans l’historique de navigation du browser.  *HTML5*  propose une solution pour la manipulation de l’historique de navigation grâce à l’API  *history*. Utilisez donc cette API pour rendre à nouveau fonctionnel les boutons  *back*  et  *forward*.  

Ecoutez l’événement  *popstate*  pour capturer les changements dans la barre d'adresse qui seront provoqué par  les clicks sur les liens du menu. Puis, en fonction de l'ancre présente dans l’url (accessible en JS avec  *window.location.hash*), affichez la section appropriée. Si aucune ancre n’est disponible dans l’url, utilisez la section *todo*  par défaut. Finalement, au chargement de la page, affichez la bonne section correspondante à l’url du browser (via un  *trigger*  de l’événement  *popstate*).

## LocalStorage
L'une des contraintes des *PWA* est de rendre disponible l'app en mode offline. C'est à dire que l’application doit rester fonctionnel même si le *backend* n'est pas accessible. Dans cette situation, il est quasi indispensable de stocker des données de l'application du coté du *browser*. L'[api Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API)   et en particulier [LocalStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) va nous permettre de répondre à ce besoin. Elle nous offre un espace de stockage persistant propre au browser et propre au nom de domaine (chaque sous-domaine aura toutefois un espace de stockage différent). Malheureusement, elle ne permet que de sauvez des chaînes de caractères. Ce problème est aisément résolu avec l'utilisation conjointe de JSON. Il suffit ainsi de sérialiser en JSON la donnée à stocker et de sauver la chaîne de caractère dans le *LocalStorage*. 

Un besoin fréquent est d'organiser les données dans des collections de données (c.à.d des espace de noms différents) . De plus le LocalStorage étant partagé entre toutes les pages d'un même sous-domaine, il serait pratique de pouvoir créer des "


<!--stackedit_data:
eyJoaXN0b3J5IjpbMjAxNTM4NTExLC0xMDg2MDI0NjgxLDE1Mj
g3NTIzLDY5NTk3MzUyMSwtMTA5Mzk1NDU4OCw3OTM0NTIyMTMs
LTEyMDQ2NjEyODgsMTEwMTE2NjQzNywzOTQ5NzA5MzEsMTg1ND
c3NDgzLDI2MzE4ODk3MSwtMTA3NTI0OTU0OCwtNzA2MzU5MTky
LDI3MTM1NjgxMiwxNjEzOTQyMjQzLDQyOTUyMDM3LC0yODA1Nz
E3MzAsMTA5NTUyNTk2NCwtMTczNDI1NjgzMSw2MDE3NjgxNDJd
fQ==
-->