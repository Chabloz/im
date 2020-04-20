# Frontend MVC avec Backbone et Bootsrap

  

## Mise en place

Le *design pattern* mise en place dans les TP précédents nous aide à avoir une architecture de code propre. Backbone.js et Handlebars nous permettent de simplifier notre architecture de code, la gestion des événements ainsi que la modification du DOM.   Il nous reste toutefois le travail complexe de l'ergonomie applicative *responsive*. Afin d'éviter un long travail en HTML et CSS, il existe de multiples *frameworks* nous offrant les composants de base pour la réalisation d'une interface Web *responsive*. Nous allons dans ce TP utiliser le plus utilisé d'entre eux: [Boostrap](https://getbootstrap.com/). Commencez donc par l'installer (ainsi que sa dépendance à *popper.js*) avec *npm*.

```bash
npm install bootstrap popper.js --save
```

Il nous vous restera plus qu'à l'importer dans votre code pour en bénéficier:

```js
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```

En plus de s'initier à un *framework* de design d'interface Web, ce TP à comme objectif de faire réviser les différentes pièces du design pattern MVC. Vous devez réaliser un « embryon » d’application pour un shop en ligne proposant des périphériques informatiques de type souris, claviers et casques audio uniquement. 

## Cahier des charges

L'application doit  afficher la liste des produits sur la page. Les produits seront définis par 4 champs: le modèle, la marque, le prix et le type (qui vaut soit "mouse", "keyboard" ou "headset"). L'utilisateur pourra naviguer entre les 3 types de produits grâce à 3 boutons de filtre. Il pourra aussi trier la liste affichée par prix croissant ou décroissant. 

L'utilisateur pourra ajouter un produit à son caddie d'achat. Pour des raisons de simplification, la quantité ne sera pas à gérer. Le produit sera alors simplement ajouté au caddie de l'utilisateur en un seul exemplaire. L'utilisateur pourra visualiser son caddie en cliquant sur l'icone associée. La page du caddie affichera la liste des produits avec les prix ainsi que le prix total actuel. Enfin, L'utilisateur pourra supprimer un produit de son caddie.

**Indications:** Commencez par identifier les différents *Models* nécessaires. Puis réfléchissez au nombre de vues à faire et réaliser les *templates handlebars* associées. Utilisez Bootsrap pour le design Web en choisissant les bons composants graphiques. Pour les données, insérez simplement des données de tests *en dur*  dans votre collection de produits. Il n'y a donc pas de communication avec un backend dans ce TP.  Si vous souhaitez des données de tests, vous pouvez utiliser celles-ci: [https://chabloz.eu/files/products/](https://chabloz.eu/files/products/).
   




<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIwNjYzODI2MywzODI5MjEzNzEsLTE5OD
UwMTA3NjcsOTE0ODAzOTAzLDExODI4NTc1NjldfQ==
-->
