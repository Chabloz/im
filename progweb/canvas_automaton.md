# Canvas, animation, automates cellulaires 2D (jeu de la vie)

## Mise en place
Le premier objectif de ce TP est de continuer à travailler sur la balise *canvas* et les animations. Le deuxième objectif est de s'initier aux [automates cellulaires](https://fr.wikipedia.org/wiki/Automate_cellulaire) et  à leur utilisation comme outils de  [génération procédurale](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_proc%C3%A9durale) de terrain.

Afin de vous simplifier le travail, vous pouvez utiliser ce [code HTML](resources/canvas_automaton.html) afin d'avoir un design de base pour l'interaction avec l'automate cellulaire. Ensuite, récupérez le **contexte** graphique du *canvas* dans votre programme principal.  

Voici une [démo](https://chabloz.eu/files/gol/automaton/) du résultat final escompté.

## Automate cellulaire 2D

L'automate cellulaire que nous allons utiliser est un automate de [type jeu de la vie](https://en.wikipedia.org/wiki/Life-like_cellular_automaton) . Nous allons le représenter grâce à un tableau à deux dimensions d'entier (une matrice 2D), permettant ainsi de stocker les états vivant **1** et mort **0** de chaque cellule. Commencez par créer une classe *Automaton* dans votre dossier *class*. Le constructeur ne devrait recevoir en paramètre que les données de la largeur et de la hauteur du tableau, mais comme nous allons le dessiner sur le *canvas* nous pouvons ajouter un paramètre pour la taille (en px) des cases et deux autres pour les couleurs des cellules vivantes et des cellules mortes. Vous pouvez y mettre des valeurs par défaut si vous le souhaitez. Vous pouvez aussi initialiser la matrice d'entier avec des cellules mortes ou vivantes, mais ce n'est pas obligatoire car nous allons plutôt utiliser une méthode aléatoire d'initialisation.

### Méthode *randomize*

Afin de créer une "population" initiale aléatoire de cellules, ajoutez une méthode *randomize* dans votre classe. Celle-ci va simplement remplir de cellules d'état aléatoire (mort ou vivant) notre tableau. Elle prendra en paramètre la probabilité entre [0,1] qu'une cellule soit initialisée à l'état vivant.

### Méthode *draw*
Ajoutez une méthode pour le dessin de l'automate sur le *canvas*. Cette méthode recevra le contexte graphique en paramètre. Pour le dessin, dessiner chacune des cellules de l'automate. Pour que la position (x, y) des cellules corresponde au bon (x, y) du *canvas* n'oubliez pas de les multiplier par la taille des cellules. Pour leur couleur (*fillStyle*), choisissez la bonne en fonction de l'état de la cellule. Finalement, pour simuler une *grille*, dessinez les cellules avec une marge externe de 1 [px]. Vous pouvez utiliser la méthode [
fillRect](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect)  pour le dessin des cellules (et de la grille).  Testez votre classe avec les étapes suivantes: 

 - Créez un automate cellulaire de taille identique au *canvas* divisé (division entière) par la taille des cellules (fixée à 14px par exemple).
 - Initialisez l'automate aléatoirement en appelant sa méthode *randomize* avec une probabilité de 0.1  pour générer un bruit de test.
 - Dessinez l'automate sur le *canvas* grâce à sa méthode *draw*.

## B3/S23, ou les règles du Jeu de la Vie

Nous allons maintenant mettre en place les changements d'état de notre automate cellulaire. C'est à dire les règles qui vont nous permettre de savoir si une cellule sera vivante ou morte à la prochaine "itération" de l'automate cellulaire. Il existe plusieurs notations pour ces règles. Nous allons utiliser la plus simple à lire. Cette notation permet de définir les règles de naissance et de survie d'une cellule par apport à son [voisinage de Moore](https://fr.wikipedia.org/wiki/Voisinage_de_Moore). Voilà un exemple de cette syntaxe :
```
B3/S23
```
Le **B** (*birth*) indique la règle provoquant la naissance d'une cellule par apport au nombre de ses voisins. Dans cet exemple, une cellule morte devient vivante (naît) si exactement 3 cellules adjacentes (selon le voisinage de Moore) sont actuellement vivantes. 

Le **S** (*survival*) indique la règle provoquant la survie (et donc réciproquement la mort) d'une cellule en fonction de ses voisins. Dans cet exemple, une cellule vivante le reste uniquement si 2 **ou** 3 cellules adjacentes sont actuellement vivantes (et elle meurt donc dans tous les autres cas).

Afin d'implémenter cette syntaxe, nous pourrions représenter ces deux règles par deux *Set* en JS. Cela permettrait ainsi de représenter les 2^18 automates possibles très facilement. La règle d'exemple pourrait-être représentée comme cela :

```js
const birth = new Set([3]); // Birth rule: B3
const survival = new Set([2, 3]); // Survival rule: S23
```

Il y a bien sûr d'autres solutions pour représenter les 2^18 automates possibles.  Mais celle là a l'avantage d'être suffisamment explicite. Modifiez votre constructeur pour que l'on puisse fournir ces deux *Set* des règles lors de la création de l'automate.

L'algorithme permettant de savoir si une cellule à la position (x,y) sera vivante ou morte à la prochaine itération pourrait donc être celui-ci (c'est un exemple, d'autre algorithme sont bien sûr possible):

 - Calculer le nombre de cellules vivantes dans le voisinage de Moore de la cellule [x][y].
 - Si la cellule [x][y] est actuellement vivante, on regarde si son nombre de voisin **n'est pas** dans le *Set* de la règle de survie. On la marque alors comme devant mourir (mais on ne change pas son état pour le moment).
 - Si la cellule (x,y) est actuellement morte, on regarde si son nombre de voisin **est** dans le *Set* de la règle de naissane. On la marque alors comme devant naître (mais on ne change pas son état pour le moment).

Rajoutez donc deux méthodes dans votre classe *LifeLikeAutomaton*:

- Une méthode qui retournera le nombre de cellules vivantes dans le voisinage de Moore d'une cellule. La position (x, y) de la cellule sera reçue en paramètre. Attention, pour les cellules en bord de tableau, ne prenez en compte que les cellules adjacentes présentes dans le tableau. (Nous utiliserons un tore plat par la suite.)  
- Une méthode qui applique les règles **B/S** à l’ensemble des cellules du tableau. Elle appliquera l'algorithme décrit plus haut. Attention toutefois à ne pas modifier trop tôt le tableau des cellules de l'automate puisque cela provoquerait des erreurs dans le décompte des voisins vivants des cellules suivantes.


## Animation

Il serait agréable de pouvoir modifier la fréquence de mise à jour de l'automate cellulaire. Ainsi nous pourrions examiner en détail le comportement de certaines règles en ralentissant cette fréquence, ou encore explorer leurs effets sur le long terme en l'augmentant. 

La plupart du temps, une boucle d'animation pour un *canvas* se fait avec la méthode *requestAnimationFrame* (cf. TP [canvas parallaxe](canvas_parallax.md)). Cela permet de déléguer au browser la gestion des *frames*. Le browser va faire de son mieux pour être proche de la fréquence de rafraîchissement de l'écran (la plupart du temps 60 [Hz]) afin de rendre l'animation fluide. Ainsi une itération d'une boucle classique d'animation peut se décrire ainsi: 

- Calculer le Δt avec la *frame* précédente
- Mettre à jour le monde selon le Δt
- Redessiner l'état du monde dans le *canvas*

L'étape "redessiner le monde" s'effectue souvent par un effacement total du *canvas* et le dessin de tous les éléments. On peut toutefois ici optimiser cette étape en ne redessinant que les cellules de l'automate. (Mais cela serait encore plus optimisé de ne redessiner que les cellules où un changement d'état a eu lieu. Vous pouvez le faire comme une partie optionnelle de ce TP).

Comme nous l'avons vu précédemment (dans les vidéos du cours sur la boucle d'animation), nous pouvons encore améliorer cette boucle en utilisant un temps constant pour les mise à jour. Pour rappel, nous avons utilisé une version légérement modifiée de MainLoop.js disponible [ici](resources/mainloop.js).

Par défaut *MainLoop.js* fixe le fréquence de mise à jour du monde (le *timestep*) à 1000/60 [ms]. Mais il est possible de changer cette valeur avec la méthode *MainLoop.setSimulationTimestep*. 

Testez cette méthode d'animation avec votre automate cellulaire. Choisissez 1000ms (une génération par seconde) afin de contrôler que les règles sont correctement appliquée à l'ensemble des cellules de votre automate. 

Si vous utilisez les règles **B3/S23**, vous devriez normalement voir le Jeu de la Vie prendre vie et évoluer toutes les secondes ! Vous pouvez maintenant jouer un peu avec le *timestep* pour accélérer ou ralentir la chose. Ce *timestep* étant le nombre de générations par seconde de notre automate cellulaire.

## Univers en tore plat
De la même manière que le TP sur l'effet parallaxe, ajoutez une nouvelle classe *InFlatTorus* dans le dossier *class/LifeLikeAutomaton* (à créer). Elle héritera (*extends*) de la classe *LifeLikeAutomaton* et surchargera la méthode qui retourne le nombre de cellules vivantes dans le voisinage de Moore. Afin de simuler un tore plat, il vous suffit en effet de modifier la manière de considérer les voisins d'une cellule. Une méthode souvent utilisée pour la gestion de cycle en informatique est l'utilisation du [modulo](https://en.wikipedia.org/wiki/Modulo_operation). Comme vous pouvez le lire sur la page Wikipédia, son implémentation dans les langages de programmation est très diversifiée. Dans notre cas, nous avons besoin du modulo euclidien couramment utilisé en mathématique. Voici une fonction  à rajouter dans votre bibliothèque mathématique *lib/math.js* pour le calculer:

```js
export function moduloEuclidian(op1, op2) {
  return ((op1 % op2) + op2) % op2;
}
```
Cette fonction va nous éviter de nombreux formants algorithmiques de sélection (*if*) dans notre algorithme. En effet, si vous appliquez cette fonction sur un indice indiquant une cellule en dehors du tableau de l'automate, l'indice sera rectifié pour se situer à l'intérieur  du tableau. Par exemple, pour la cellule (0,0) du tableau, la position de son voisin de gauche indiqué par (-1,0) sera  rectifiée en (largeur du tableau - 1,0), ce qui correspondra bien à la position de la cellule de gauche dans un univers en tore plat. 

Vous pouvez facilement tester votre nouvelle classe en modifiant l'*import* dans votre programme principal:

```js
// import Automaton from "class/LifeLikeAutomaton";
import Automaton from "class/LifeLikeAutomaton/InFlatTorus"; 
```

## Gestion des touches du clavier

Nous avons vu dans le TP précédent comment détecter si des touches du clavier de l'utilisateur sont actuellement appuyées. Mais nous avons désormais un nouveau besoin. En effet, comme nous voulons pouvoir réduire ou augementer le *nombre de générations par seconde* de notre automate, il ne serait pas souhaitable d’effectuer la détection des touches lors de notre boucle d'animation, car le délai de réaction serait trop long dans les cas de grand *timestep*. Nous allons donc légèrement améliorer la classe *Keyboard* pour pouvoir exécuter un code lorsque une touche est appuyée.

On pourrait le faire assez simplement avec une *Map* (ce n'est qu'une idée, il y a plein d'autres solutions). Cette *Map* serait initialisée dans le constructeur comme ceçi:

```js
this.doOnKeyDown = new Map();
```

Les clefs de cette Map seraient les touches à écouter et les valeurs, les fonctions à exécuter. Avec ce concept, il suffirait donc de tester l'existence de la touche comme clef dans la méthode *#onKeyDown* et d'executer la fonction associée si présente. Cette méthode minimaliste fonctionne bien mais elle ne permet pas des écouteurs multiples sur la même touche, ni des écoutes de touche en simultané (ce qui n'est pas si grâve pour ce TP).

Une autre amélioration souhaitable est la gestion des [*code* versus *key*](https://keycode.info/). Rajoutez donc un paramètre *useCode* à votre constructeur et gérer ces deux modes. En effet, pour les raccourcis clavier, mieux vaut utiliser *key* que *code*.

### Modification du *nombre de générations par seconde*

Grâce à cette nouveauté, donnez le contrôle du nombre de générations par seconde à l'utilisateur en écoutant deux touches de son clavier ('w', 's' par exemple). Le code lié à ces touches devra donc modifier le *timestep*. Bornez les valeurs que peut prendre le nombre de générations par seconde entre 1 et un maximum de votre choix.

### Autres modifications possibles par l'utilisateur
De la même manière, vous pouvez donner le contrôle à l'utilisateur sur différent paramètres de votre automate cellulaire. Implémentez au minimum les fonctionnalités suivantes: 

 - Pause de l'animation
 - Nouvelle génération aléatoire  pour l'automate cellulaire  (*reset* dans la démo)
 - Changement des probabilités des états vivant/mort d'une cellule lors de la génération aléatoire de l'automate.
 - Changement des règles **B/S** (la démo offre ce changement via la souris, mais d'autres solutions plus ergonomiques sont possibles)
 
 Vous pouvez bien sûr implémenter les autres fonctionnalités présentes dans la démo si vous le souhaitez. 
