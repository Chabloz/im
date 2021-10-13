# Exercice JS révision: Fetch, XMl, JSON,  DOM, ...

## Mise en place 

A partir du [code HTML donné](resources/jsFetchDomRevision.html), ajoutez la balise "script" pour votre code puis développer une petite interface Web permettant de faire la recherches des films à l’affiche pour une ville de Suisse fournie par l’utilisateur. De plus l’outil devra permettre aux utilisateurs d’évaluer les films par des notes (étoiles) allant de 1 à 5, et de consulter la note moyenne pour un film.  
 
## Recherche des films
 
La première partie de votre développement consiste à récupérer les données des films trouvés en fonction de la localité saisie par l'utilisateur. Vous devez implémenter les fonctionnalités ci dessous.   
 
Lorsque l'utilisateur fait une recherche, vous devez effacer les éventuels résultats précédents et faire un appel au WS suivant pour obtenir les résultats https://chabloz.eu/movies/?query=XXX où XXX est a remplacer par la ville saisie par l'utilisateur. **Remarque**: le WebService n'index que quelques villes de Suisse romande.
 
 ## Ajout des films au DOM
Une fois les résultats récupérés, ajouter les films au DOM de la page dans le *div#results*. Pour ce faire, vous devez cloner la template d'un film (les XXX marquent les endroits où devront s’insérer les données). Vous devriez avoir reçu du WS les informations suivantes pour chaque film : un identifiant, un titre, et une courte description. Insérez donc ces données et si aucun film n’est reçu, indiquez-le à l’utilisateur. Remarques : L’identifiant du film doit s’insérer dans l’attribut *data-movie-id* de votre clone. Ignorez pour le moment l’image et la partie *évaluation*.
  
Malheureusement ce WS ne fournit pas l’image de l’affiche du film, pour ce faire vous devez utiliser ce deuxième WS: https://chabloz.eu/movies/thumb/?id=XXX qui fournit ses résultats sous la forme d’une image (jpg ou png). Vous devez bien sûr remplacer XXX par l’identifiant du film.  Utilisez ce WS pour afficher correctement l’affiche du film. **Remarque** : les affiches des films ne sont pas toutes répertoriées, si l’affiche d’un film n’existe pas ou que l’identifiant est erroné, le WS vous retourne alors une image invisible de dimension identique aux affiches existantes.  
 
## Récupération des notations des films  
 
Un troisième WS permet de récupérer les évaluations d'un films : https://chabloz.eu/movies/rating/get/?id=XXX . XXX est à remplacer par  l’id du film. Le WS fournit ses résultats au format **XML**.  
 
Pour chaque film, utilisez le WS pour aller chercher sa notation. Une fois les données reçues, ajoutez les deux informations (la notation et le nombre de votes) dans les *span* adéquats (*.rating* et *.votes* du film). 

Vous devez aussi ajoutez une classe CSS pour le *span.rating* de chaque film. Cette classe doit être *rating0, rating1, rating2, rating3, rating4,* ou *rating5* en fonction de la notation actuelle du film. **Indication** : il va falloir arrondir la notation reçue à l’entier le plus proche afin de pouvoir ajouter la bonne classe CSS grâce au code suivant : *Math.round(nb)* . La plupart des films auront des notations et un nombre de votes valant 0, c’est un résultat tout à fait normal.
 
## Gestion des notations de l’utilisateur  
 
Un quatrième WS est disponible pour noter les films : https://chabloz.eu/movies/rating/post/?id=XXX&rating=Y où XXX est l'identifiant du film et Y la note de l’utilisateur (un entier entre 1 et 5 compris). Le WS fournit en réponse un XML avec les nouvelles valeurs de la note et du nombre de votes (prenant en compte ce nouveau vote). Vous devez gérer les *click* sur les *span.rate-it* de chaque film afin d’envoyer la notation correspondante au WS. 

Lors d’un *click*, vous devez donc récupérer l’identifiant du film concerné et la note approprié (vous pouvez la récupérer dans l’attribut data-rating du *span* cliqué). Une fois ces données envoyées au serveur et le résultat reçu, vous devez mettre à jour l’affichage de la note et du nombre de vote du film afin que l’utilisateur s’aperçoive du changement sur la notation qu’il a provoqué.
