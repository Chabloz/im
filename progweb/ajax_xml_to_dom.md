# Exercice jQuery - Ajax avec Xml 

## Mise en place

**Objectif**:  réaliser une application Web pour la visualisation des horaires de la filière IM.

A partir du [code HTML donné](resources/jqueryAjaxXml.html) , ajoutez les balises "script" pour jQuery et un fichier javascript pour votre code. Ajoutez dans votre fichier  les fonctions de gestion des dates suivantes :

```js
/** 
 * Convertit une string au format ISO 8601 (avec heures UTC) en objet Date
 * 
 * @param {string} str La date au format ISO 8601 avec heures UTC
 * @return {Date} en "local timezone"
 */
const strToDate = str => new Date(Date.UTC(
  str.substr(0, 4),
  str.substr(4, 2) - 1,
  str.substr(6, 2),
  str.substr(9, 2),
  str.substr(11, 2),
  str.substr(13, 2)  
));
/**
 * Convertit un objet Date en string au format FR_CH simplifié 
 * 
 * @param {Date} 
 * @return {string} exemple de retour: "Lun 02.11"
 */
const dateToFrCh = date => {
  let mapDay = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  let day = date.getDate();
  let dayName = mapDay[date.getDay()];
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;  
  if (day < 10) day = '0' + day;
  return `${dayName} ${day}.${month}`;
};
/**
 * Convertit un objet Date au format heures:minutes en "local timezone"
 * 
 * @param {Date} 
 * @return {string} exemple de retour: "15:32"
 */
const dateToHours = date => {  
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = '0' + hours;  
  if (minutes < 10) minutes = '0' + minutes;    
  return `${hours}:${minutes}`;
};
```

## Gestion des événements

Gérez les clicks sur les 3 boutons de classe css *btn-schedule*.  Lors d'un click, vous devez récupérer l'attribut *data-class-id* contenant l’identifiant de la classe.  Vous pouvez utilisez la méthode [data](https://api.jquery.com/data/#data2) de jQuery. De plus, vous devez ajouter la classe css *selected* au bouton cliqué (et la supprimer des autres boutons).

## Requête AJAX

Une fois l'identifiant de la classe récupéré, vous devez retrouver le XML de l'horaire associé. Le XML est  à récupérer via la méthode [$.ajax](https://api.jquery.com/jQuery.Ajax/)  . L'url des XML des différents horaires respecte l'exemple suivant:  https://chabloz.eu/files/horaires/M45.xml . Il vous suffit de remplacer M45 par l'identifiant de la classe pour obtenir les bonnes données. Essayez ensuite d'améliorer votre requête AJAX pour que l'utilisateur ne puisse pas charger plusieurs horaires en même temps. Pour ce faire, vous pouvez désactiver les boutons dés que l'un d'eux est cliqué, et les réactiver dés que la requête AJAX est finie (grâce à une fonction *then* de la *promise $.ajax*).

## Traitement des données

En utilisant à chaque fois une promesse différente (méthode *then* de $.ajax) , réalisez les traitements dans l'ordre suivant:

 1. A l'aide de jQuery, récupérez les éléments *VEVENT* du DOM XML de l'horaire, et transformez le tout en tableau grâce à la méthode  [toArray](https://api.jquery.com/toArray).
 2. Filtrez le tableau pour qu'il ne contienne que les éléments dont la date de fin (élément *DTEND*) se situe dans le futur. **Indications**: vous pouvez convertir *DTEND* en objet *Date* grâce à *strToDate* (voir "mise en place" plus haut) . Il suffit alors de la comparer avec *new Date()*; pour savoir si elle est dans le futur.
 3. Triez les éléments par ordre chronologique. Vous pouvez comparer les éléments *DTSTART* entre eux grâce à un simple *localCompare* (sans avoir besoin de les convertir en objet *Date*).

 ## Génération du DOM des horaires

Toujours à l'aide d'une promesse, parcourez l'ensemble des *events* traités au point précédent et construisez un nouvel élément *tbody* contenant tous les *events* transformés en *tr*. **Indications**: pour transformer un *event* en *tr*, clonez le *tr* ayant la classe *template-course*, puis injectez les bonnes données dans chaque *td*. Utilisez les classes css présentent dans la template afin d'éviter un maximum d'être lié aux balises du DOM. Pour obtenir les bonnes données, utilisez les fonctions de date du point *mise en place*. Finalement, dans une dernière promesse, remplacez le *tbody* de *#schedule* par votre *tbody* (par exemple grâce à la méthode [replaceWith](http://api.jquery.com/replacewith/)) .

## Gestion des erreurs

Grâce à la méthode *catch* des promesses, gérez les éventuelles erreurs. Afin de simplifier leur gestion, affichez simplement un message d'erreur générique (par exemple:  "Impossible d'afficher l'horaire. Merci d'essayez à nouveau dans quelques instants"). Essayez de trouver le meilleur endroit où mettre ce message et la meilleure manière de l'afficher.

## Mémorisation du dernier horaire affiché

Afin de peaufiner l'application, il serait ergonomique que l'application se souvienne du dernier horaire affiché par l'utilisateur. Ainsi, lorsque l'utilisateur reviendra sur la page (ou s'il la recharge), l'horaire s'affiche sans autre action de sa part. Vous pouvez simplement utiliser [localStorage.setItem](https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem) et [localStorage.getItem](https://developer.mozilla.org/fr/docs/Web/API/Storage/getItem) pour sauvegarder l'identifiant de la classe dans la mémoire du *browser* de l'utilisateur. Il vous suffira d'utiliser un *getItem* et si la valeur retournée n'est pas *null*, de charger l'horaire de manière identique à ce que vous avez déjà fait. (Mais ne dupliquez pas votre code, utilisez une fonction!)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE0NjQyMzgxMCw5MDY4MTU4ODYsLTEwOD
MyNjU1NTYsMjA1OTkzMDcwOCwtMTI5NDE1ODAyMCwxMzI4MzMy
NTg0LC0yMjkxODMwODgsNzcyMjk3NjQyLDM1MzQyNjg0MCwtNj
QxODc2MDk1XX0=
-->