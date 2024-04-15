# *Frontend Framework* - Une introduction à Vue.js - Deuxième partie


## Mise en place

L’objectif est de continuer la prise en main du framework Vue.js. Pour ce faire nous allons travailler avec un tableau de données puisque c'est l'une des structures de données les plus fréquentes. Vous allez donc développer une petite application Web permettant une gestion simple de favoris Web (bookmarks). Il sera possible de créer et supprimer des favoris ainsi que de les filtrer par catégories. **Remarque**: le cahier des charges suivant n'est qu'une proposition, vous pouvez bien sûr le modifier pour changer l'application de gestion des favoris selon vos besoins.
  
## Proposition de structure

Pour la représentation de la liste des favoris, vous pourriez utiliser une  variable réactive (créée avec la méthode **ref**) contenant un tableau (vide par défaut). Ce tableau contiendra par la suite tous les favoris Web de l'utilisateur sous la forme d'une tableau d'objets. L'application pourrait être composée de trois parties: un formulaire d'ajout d'un favoris, un champ de saisie pour le filtrage par catégorie, ainsi que l'affichage de la liste des favoris de l'utilisateur. Cette liste pourrait être affichée grâce à l'utilisation d'un **v-for** et l'utilisation d'un sous-composant.

Pour l'ajout d'un favoris, un formulaire de trois champs semble le minimum : son nom, son URL, et ses catégories (mots clefs).  Le champ « catégories » ne pourrait-être qu'un simple champ texte ou une version plus complexe (selon vos envies). Lors de l'ajout d'un favoris, lui affecter un identifiant unique pourrait être pratique. Ensuite, on ajouterai le nouveau favori dans le tableau des favoris. Afin de simplifier l'accès au tableau des favoris, vous pourriez utiliser un *store* global à votre application.

Pour l'affichage, le minimum semble être l'affichage d'un lien vers l'URL du favoris, son nom, et l'affichage des catégories ainsi qu'un bouton de suppression. Le bouton de suppression demandera une confirmation, puis supprimera le favori du tableau. Il serait aussi intéressant de proposer un tri par ordre alphabétique des noms des favoris Vous pourriez utiliser *une computed* pour le faire.

Pour la persistance des favoris, le **LocalStorage** pourrait faire l'affaire car pour le moment, à chaque rechargement de _l'app_ tous les favoris sont perdus. Vous pourriez utiliser un **watch** sur le tableau des favoris et sauvegarder tout le tableau en _localStorage_ à chaque changement (version minimaliste peu performante mais il est rare d'avoir un nombre gigantesque de favoris Web). Si c'est l’approche choisit, vous devez rajouter **_{ deep: true }_** comme troisième paramètre de **watch** pour que _Vue_ écoute bien tous les changements. 

Implémentez aussi un champ de filtre par catégorie qui permettrait de n'afficher que les favoris ayants une catégorie contenant la valeur du champ de filtre.

Finalement, reflechissez à la possibilité de rendre disponible les favoris de l'utilisateur sur plusieurs périphériques. serait-il possible de le faire sans un stockage des données sur le backend ? Si oui, comment ?
