# Exercice Fetch Xml et DOM

## Mise en place

**Objectif**:  réaliser une application Web pour la visualisation des horaires de la filière IM.

A partir du [code HTML donné](resources/jsFetchXml.html), ajoutez la balise "script" qui pointe vers un fichier qui contiendra le code JS de ce travail pratique. Ajoutez-y les fonctions de gestion des dates suivantes :

```js
/**
 * Convertit une string au format ISO 8601 (avec heures UTC) en objet Date
 *
 * @param {string} str La date au format ISO 8601 avec heures UTC
 * @return {Date} en "local timezone"
 */
 function strToDate(str){
  return new Date(Date.UTC(
    str.substr(0, 4),
    str.substr(4, 2) - 1,
    str.substr(6, 2),
    str.substr(9, 2),
    str.substr(11, 2),
    str.substr(13, 2)
  ));
}
/**
 * Convertit un objet Date en string au format FR_CH simplifié
 *
 * @param {Date}
 * @return {string} exemple de retour: "Lun 02.11"
 */
function dateToFrCh(date) {
  let mapDay = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  let day = date.getDate();
  let dayName = mapDay[date.getDay()];
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return `${dayName} ${day}.${month}`;
}
/**
 * Convertit un objet Date au format heures:minutes en "local timezone"
 *
 * @param {Date}
 * @return {string} exemple de retour: "15:32"
 */
function dateToHours(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes}`;
}
```

## Gestion des événements

Gérez les clicks sur les boutons possédant la classe css *btn-schedule*.  Lors d'un click, vous devez récupérer l'attribut *data-class-id* contenant l’identifiant de la classe.  Utilisez la propriété [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) pour le faire. Vous devez aussi ajouter la classe css *selected* au bouton cliqué (et la supprimer des autres boutons).

## Fetch API

Une fois l'identifiant de la classe récupéré, vous devez retrouver le XML de l'horaire associé. Le XML est  à récupérer via l'API [Fetch](https://javascript.info/fetch. L'URL des XML des différents horaires respecte l'exemple suivant:  https://chabloz.eu/files/horaires/XXX.xml . Il vous suffit de remplacer XXX par l'identifiant de la classe. Essayez d'améliorer votre requête *Fetch* pour que l'utilisateur ne puisse pas charger plusieurs horaires en même temps. Pour ce faire, vous pouvez désactiver les boutons dés que l'un d'eux est cliqué, et les réactiver dés que la requête est finie.

## Traitement des données des horaires

Une fois les données reçuent, réalisez les traitements dans l'ordre suivant:

 1. Récupérez les éléments *VEVENT* du DOM XML de l'horaire.
 2. Filtrez le tableau pour qu'il ne contienne que les éléments dont la date de fin (élément *DTEND*) se situe dans le futur. **Indications**: vous pouvez convertir *DTEND* en objet *Date* grâce à *strToDate* (voir "mise en place" plus haut) . Il suffit alors de la comparer avec *new Date()*; pour savoir si elle est dans le futur.
 3. Triez les éléments par ordre chronologique. Vous pouvez comparer les éléments *DTSTART* entre eux (sans avoir besoin de les convertir en objet *Date*).

 ## Génération du DOM des horaires

Parcourez l'ensemble des *events* traités au point précédent et générez un *tr* (avec ses *td*) pour chacun d'eux. **Indications**: pour transformer un *event* en *tr*, [clonez](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode) le *tr* ayant la classe *template-course* (déjà existant dans le DOM), puis injectez les bonnes données dans chaque *td*. Utilisez les classes CSS présentes dans la template afin d'éviter un maximum d'être lié aux balises. Pour obtenir les bonnes données, utilisez les fonctions de date du point *mise en place*. Finalement, injectez chaque *tr* créé dans le *tbody* de *#schedule* (par exemple avec [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) ou peut être mieux [replaceChildren](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren)).