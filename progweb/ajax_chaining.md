# Exercice Ajax - Enchaînement

## Mise en place

**Objectifs**:  Récupérer des données d'un servcie REST. Charger plusieurs ressources en parallèles (grâce aux *promises*). 

A partir du [code HTML donné](resources/jqueryAjaxChaining.html) , ajoutez les balises "script" pour jQuery et [bootstrap](https://getbootstrap.com/), la css pour *bootstrap* et finalement un fichier javascript pour votre code.  Ajoutez la fonction suivante dans votre fichier de code:
```js
/** 
 * Effectue plusieurs requêtes HTTP GET afin d'aller charger les URLs fournies
 * en paramètre. La fonction retourne une Promise qui se résolvera lorsque toutes
 * les requêtes AJAX seront finies. 
 * 
 * @param {array} urls Les URLs à charger
 * @return {Promise} Une Promise qui se résoudra à la fin des requetes AJAX
 */
const loadUrls = async urls => {  
  let results = [];
  urls.forEach(url => {
    results.push($.ajax({url}));        
  })    
  return await Promise.all(results);  
}
```
## SW movies

Afin de rendre l'exercice plus ludique, nous allons utiliser [SWAPI](https://swapi.co/)  (api Star Wars). Vous devez y récupérer la liste des films au format JSON via l'url suivante: https://swapi.co/api/films/. Si l'api n'est pas disponible (ou trop lente), vous pouvez utilisez le *miroir* disponible à l'url suivante: https://chabloz.eu/sw/films . Puis, en utilisant à chaque fois une promesse différente, réalisez les traitements dans l'ordre suivant:

1. Ne prendre que la partie *results* des données (pour que les promesses suivantes travaillent sur un tableau ne contenant que les données sur les films).
 2. Triez le tableau des films pour qu'il soit dans l'ordre des épisodes (l'épisode 1 en premier, ...)
 3. Générez le DOM de chaque film en utilisant un clone de la template de classe CSS *tmpl-movie*. Lors de la génération du DOM d'un film,  ajoutez l'identifiant du film (l’identifiant de l'épisode) comme attribut *data-movie-id* sur l'élément racine du DOM du film.  Sauvegardez aussi cet identifiant et les URLs des planètes du film  sur le bouton de classe *.btn-planets* .
 4. Injectez le DOM généré dans l'élément DOM de classe CSS *movies* de la page Web.

## SW planets

Vous devez gérer les clics de l'utilisateur sur les boutons de classes *.btn-planets* . Lors d'un clic, réalisez les traitements dans l'ordre suivant: :

1. Désactivez le bouton cliqué (pour éviter des chargements multiples des mêmes données)
2. Chargez toutes les données des planètes du film dans un tableau (grâce à la fonction *loadUrls*). Puis lors de la résolution de la promesse :
3. Triez les planètes par ordre alphabétique des nom
4. Générez le DOM de chaque planète en utilisant un clone de la template de classe CSS *tmpl-planet* .
5. Injectez ce DOM au bon endroit dans la page Web (c.à.d. dans l'élément DOM de classe *planets* du film), Indication: utilisez l'identifiant du film pour retrouver le bon élément DOM.
6. Réactivez le bouton cliqué.

## Ce ne sont pas ces planètes que vous recherchez

Il ne serait pas très performant de recharger à chaque clic les mêmes planètes d'un film. Puisque celle-ci sont présente dans la DOM à la suite du premier clic sur le bouton, essayez d'optimiser votre code en le modifiant pour que les prochains clics ne fassent que disparaître et apparaître les planètes du film (*toggle*). 

## Retour visuel AJAX

Les requêtes AJAX peuvent prendre  du temps. Il serait donc utile d'avoir un retour visuel pour l'utilisateur afin de l'informer qu'un chargement de données est en cours. Vous trouverez dans le HTML un *div.ajax-loader* stylisé en CSS pour afficher une icone de chargement au milieu de l'écran de l'utilisateur. Afin d'avoir une solution générique, il serait pratique de pouvoir afficher le retour visuel lors du début d'une requête AJAX et de le cacher lorsque plus aucune requête n'est en cours. Jquery génèr
https://api.jquery.com/Ajax_Events/


   
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE1NjkyMDkxNCwxNDIyNTgzNTA2XX0=
-->