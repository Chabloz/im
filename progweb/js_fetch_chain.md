# DOM et Fetch API - Enchaînement

## Mise en place

**Objectifs**:  Récupérer des données d'un service REST. Charger plusieurs ressources en parallèles (grâce aux *promises*). 

A partir du [code HTML donné](resources/jsFetchChain.html), ajoutez un lien vers votre JS et la css de [bootstrap](https://getbootstrap.com/). Puis copiez la fonction suivante dans votre code:

```js
/** 
 * Effectue plusieurs requêtes HTTP GET afin d'aller charger les URLs pointant
 * sur des données au format JSON. La fonction retourne un tableau contenant tous
 * les résultats ("désérialisés"). 
 * 
 * @param {array} urls Les URLs à charger (dont le contenu est du JSON)
 * @return {array} un tableau contenant les résultats de chaque requête 
 */
async function loadJsonUrls(urls) {
  const results = await Promise.all(urls.map(url => fetch(url)));
  const responses = await Promise.all(results.map(result => result.json()));
  return responses;
}
```
## SW movies

Afin de rendre l'exercice plus ludique, nous allons utiliser [SWAPI](https://swapi.dev/)  (api Star Wars). Vous devez y récupérer la liste des films au format JSON via l'url suivante: https://swapi.dev/api/films/. Si l'api n'est pas disponible (ou trop lente), vous pouvez utiliser le *miroir* disponible à l'url suivante: https://chabloz.eu/sw/films . Puis réalisez les traitements dans l'ordre suivant:

 1. Ne prendre que la partie *results* des données.
 2. Triez le tableau des films pour qu'il soit dans l'ordre des épisodes (l'épisode 1 en premier, ...)
 3. Générez le DOM de chaque film en utilisant un clone de la template de classe CSS *tmpl-movie*. Lors de la génération du DOM d'un film,  ajoutez l'identifiant du film (l’identifiant de l'épisode) comme attribut *data-movie-id* sur l'élément racine du DOM du film.  Sauvegardez aussi cet identifiant et les URLs des planètes du film a un endroit pratique pour la suite.
 4. Injectez les DOM générés dans l'élément DOM *#movies* de la page Web.

## SW planets

Vous devez gérer les clics de l'utilisateur sur les boutons de classes *.btn-planets* . Lors d'un clic, réalisez les traitements dans l'ordre suivant: :

1. Désactivez le bouton cliqué (pour éviter des chargements multiples des mêmes données)
2. Chargez toutes les données des planètes du film dans un tableau (grâce à la fonction *loadJsonUrls*).
3. Triez les planètes par ordre alphabétique des noms.
4. Générez le DOM de chaque planète en utilisant un clone de la template de classe *tmpl-planet*.
5. Injectez ce DOM au bon endroit dans la page Web (c.à.d. dans l'élément DOM de classe *planets* du film), Indication: utilisez l'identifiant du film pour retrouver le bon élément DOM.
6. Réactivez le bouton cliqué.

## Ce ne sont pas ces planètes que vous recherchez

Il ne serait pas très performant de recharger à chaque click les mêmes planètes d'un film. Puisque celles-ci sont présentes dans le DOM à la suite du premier click sur le bouton, essayez d'optimiser votre code en le modifiant pour que les prochains clics ne fassent que disparaître et apparaître les planètes du film (*toggle*). 

## Retour visuel (**feedback** utilisateur)

Les requêtes via Fetch peuvent prendre  du temps. Il serait donc utile d'avoir un retour visuel pour l'utilisateur afin de l'informer qu'un chargement de données est en cours. Vous trouverez dans le HTML un *div.fetch-loader* stylisé en CSS pour afficher une icone de chargement au milieu de l'écran de l'utilisateur. Afin d'avoir une solution générique, il serait pratique de pouvoir afficher le retour visuel lors du début d'une requête Fetch et de le cacher lorsque plus aucune requête n'est en cours. Essayez donc de capturer le début d'un fetch et sa fin afin de faire apparaître et disparaître l'icone aux moments opportuns. Pour le faire correctement, étudiez les styles CSS de la page Web.  
