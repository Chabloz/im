
# Canvas, animation, recherche de chemin
  

## Mise en place  

Le premier objectif de ce TP est de continuer à travailler sur la balise *canvas*, les animations ainsi que la programmation modulaire. Le deuxième objectif est de s'initier aux problèmes de recherche de chemin (*pathfinding*) .

Afin de bien comprendre l'avantage d'un code modulaire, nous allons reprendre les classes que nous avons créées dans les TP précédent, *Circle*, *Keyboard*, *Automaton* et *Tweens*.

Pour vous simplifier le travail, vous pouvez utiliser  ce [code HTML](resources/canvas_path_finding.html) afin d'avoir un design de base pour votre animation. Ensuite, récupérez le **contexte** graphique du *canvas* dans votre programme principal.   

Vous trouverez une [démo ici](https://chabloz.eu/files/pathfinding/).

## Recherche de chemin
  
Le problème de la recherche de chemin est un point important de l'algorithmique puisqu'on le retrouve dans des domaines variés comme la robotique, la navigation, les jeux, ... Dans ce TP nous n'allons qu’effleurer la surface de ce domaine complexe. 

Afin de ne pas partir de zéro, nous allons nous focaliser sur la recherche de chemin dans une grille 2D. Puisque nous avons déjà codé cette structure sous la forme d'un tableau à deux dimensions dans notre automate cellulaire, commencez par créer un nouveau fichier dans votre dossier *class/Automaton* nommé *WithPathfinding.js* qui contiendra une classe héritant de *Automaton*. Créez aussi un programme principal qui, pour le moment, ne fera que les choses suivantes:

- Initialisation du *canvas*
- Création d'un automate cellulaire de la taille du *canvas* divisé par 40 px avec une largeur des cases valant 40 px 
- Initialisation de l'automate cellulaire avec toutes ses cases à l'état *vivant*
- Dessin de l'automate sur le *canvas*  

### Algorithme de parcours en largeur (*breadth-first search*)
  
Un des algorithmes le plus simple pour la recherche de chemin est une adaptation mineure de l'[algorithme de parcours en largeur](https://fr.wikipedia.org/wiki/Algorithme_de_parcours_en_largeur) abrégé **BFS**. Appliqué à notre grille, cet algorithme de parcours va partir d'une case de la grille (notre destination) et parcourir en premier ses voisins (8 voisins si l'on autorise les mouvements en diagonale). Puis pour chacun de ces voisins, l'algorithme va parcourir leurs voisins respectifs, mais en y excluant les cases déjà parcourues. Ainsi, petit à petit l'ensemble des cases de la grille va être traité, un peu à la manière d'un remplissage par un flot.  Vous trouverez [ici](https://www.redblobgames.com/pathfinding/a-star/introduction.html#breadth-first-search) une très bonne animation représentant la chose. 

Afin de transformer cet algorithme en recherche de chemin, il suffit d'ajouter la chose suivante: à chaque fois qu'une case est parcourue, il faut se rappeler (c.à.d. stocker) la case d'où l'on venait (c'est à dire, la case dont on était considéré comme le voisin). Ainsi, une fois l’algorithme finit, nous aurons toutes les informations nécessaire pour nous rendre d'une case à une autre dans notre grille. 

La deuxième petite amélioration de l'algorithme que nous pouvons faire, est de ne pas parcourir les voisins *morts* d'une cellule. Ainsi les cases *mortes* représenterons  des *murs* infranchissables. 

Voici un exemple de code JS que vous pouvez reprendre dans votre classe. Je ne vous demande donc pas de coder l'algorithme (si vous le voulez vraiment, ne regardez pas le code qui suit), mais uniquement de le comprendre afin de l'utiliser efficacement. 

```js
initFlowMap() {
  // create an empty "flow map" matrix of the same size as the actual grid.
  this.flowMap = [];  
  for (let row = 0; row < this.rows; row++) {
    this.flowMap[row] = [];
    for (let col = 0; col < this.cols; col++) {
      // By default, there is no path found for the cells
      this.flowMap[row][col] = false;
    }
  }
}
  
flowFieldTo(row, col) {
  this.initFlowMap();
  // The frontier will store the cells who needs to be visited
  const frontier = [];
  // At the beginning, only the destination is in the frontier
  frontier.push({row, col});
  this.flowMap[row][col] = {row, col};
  // While the frontier is not empty, we must continue to visit the cells inside it
  while (frontier.length > 0) {
    // Get the first cell in the frontier
    const cell = frontier.shift();
    // For each of the "walkables" neighbors (all "alives" neighbors)
    this.getWalkableNeighbors(cell).forEach(next => {
      // Ignore allready visited cells
      if (this.flowMap[next.row][next.col] === false) {
        //  the current neighbor need to be visited. So we put it in the frontier.
        frontier.push(next);
        // Store the actual cell as the destination of the current neighbor
        this.flowMap[next.row][next.col] = cell;
      }
    });
  }
  // The destination is the final step. There is no destination from it.
  this.flowMap[row][col] = false;
}
```

Comme vous pouvez le remarquer, une seule méthode n'est pas fournie : *getWalkableNeighbors*. Cette méthode doit fournir un tableau contenant les voisins de la cellule de position {row, col}, c'est à dire les cellules suivantes : {row: row + 1, col}, {row: row + 1, col}, {row, col: col + 1},  {row, col: col - 1}, {row: row + 1, col: col - 1}, {row: row + 1, col: col + 1},  {row: row - 1, col: col + 1} et {row: row - 1, col: col - 1}. Bien sûr, il faudra exclure (vous pouvez utiliser la méthode [filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter)) les cellules voisines mortes ou en dehors du tableau (pour gérer correctement les bords de la grille). Implémentez cette méthode, puis modifiez votre programme principal en rajoutant un appel à la méthode *flowFieldTo* vers une cellule quelconque. Faites un *console.log* de *flowMap* afin de vérifier que le flot est correctement calculé. Comme vous pourrez le voir dans votre console, *flowMap* contiendra pour chaque case les valeurs {row, col} du voisin de destination afin de se rapprocher de la destination finale.
 
### Dessin du flot

Afin de visualiser plus clairement le résultat de l'algorithme précédent, nous allons ajouter une méthode de dessin du flot. Une flèche de direction dans chaque case, pointant dans la direction de la case suivante (désignée par *flowMap*) devrait être suffisante pour une bonne représentation. Nous pourrions bien sûr dessiner cette flèche, mais pour apprendre de nouvelles fonctionnalités de dessin sur le *canvas*, nous allons le faire avec l'affichage d'un caractère.  Notre page étant en UNICODE UTF-8,  il suffit donc de choisir l'un des nombreux caractères de flèche disponible dans ce jeu de caractère. Le caractère '→' devrait faire l'affaire. L'astuce est de faire pivoter la flèche d'un certain angle pour le faire pointer dans la bonne direction. Il faut aussi penser à la taille du caractère et à son centrage dans la cellule.  Pour ce qui est de la taille et du centrage, utilisez les méthodes suivante sur votre contexte de *canvas*:

```js
ctx.font = `${this.tileSize / 2}px serif`; // Où tileSize est la largeur (et aussi hauteur) en [px] des cases
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
```

Ainsi, votre flèche aura une taille équivalente à la moitié  de la taille d'une cellule. Il vous faut encore trouver le centre d'une cellule {row, col}, mais vous devriez trouver facilement la formule.

Pour ce qui est de l'angle de rotation, la méthode **Math.atan2** permet de facilement connaitre l'angle entre deux points grâce à la formule suivante :

```js
const angle = Math.atan2(destRow - row, destCol - col);
```

Pour appliquer facilement cette rotation, effectuez une translation du *canvas* sur le centre de la case avec la méthode  [translate](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/translate), puis appliquez la rotation avec la méthode [rotate](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/rotate).  Affichez votre caractère grâce à la méthode [fillText](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillText). Enfin réinitialisez les modifications de translation et rotation grâce à la méthode [setTransform](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/setTransform). Pour plus de détail sur ces techniques, n’hésitez pas à consulter ce [tutoriel](https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Transformations).

L'algorithme final pour afficher les flèches du flot devient alors pour chaque case:

- calculer la position du centre de la cellule {row, col}
- calculer l'angle entre {row, col} et la cellule suivante (la destination) disponible dans *flowMap*
- effectuer une translation et une rotation du contexte de *canvas*
- Afficher le caractère  '→' en position (0, 0) 
- Réinitialiser la translation et la rotation

Finalement, testez votre algorithme en dessinant ce flot dans votre programme principal.

## Gestion des clics sur la grille

Notre automate contenant actuellement que des cellules vivantes, il serait interessant de pouvoir modifier l'état *vivant/mort* d'une cellule. Une gestion du clic de la souris sur l'une des cellules de l'automate semble approprié. 
Voici un exemple de code qui permet d'obtenir la ligne et colonne de la grille en fonction de la position de la souris :

```js
const rect = ctx.canvas.getBoundingClientRect();
const row = Math.floor((event.clientY - rect.top) / tileSize);
const col = Math.floor((event.clientX - rect.left) / tileSize);
```

Lorsqu'un clic de souris se produit sur la grille, vous devez faire les choses suivantes:

- Récupérer les {row, col} correspondant (grâce au code ci-dessus)
- Changer l'etat *vivant/mort* de la cellule {row, col}
- Refaire un appel à la méthode *flowFieldTo* pour que la *flowMap* soit mise à jour en conséquence

Testez votre code en cliquant sur votre grille et en regardant que la couleur des cellules change bien et que le *flow* est correctement recalculé.  

## Partie optionnelle (difficile): mouvement d'une entité par interpolation entre les points de passage.

Maintenant que nous possédons l'information nécessaire pour trouver n'importe quel chemin d'un point de la grille à un autre, nous allons l'utiliser pour déplacer une entité (un simple cercle) sur un chemin entre une origine et une destination. 

Commencez par créer dans votre programme principal un simple cercle. La position (x, y) du cercle devra coïncider avec le centre de la case qui fera office de point de départ (*spawn*). Pour trouver le centre de la case sur le *canvas*, il vous faudra donc multiplier les coordonnées {row, col} de la case de départ avec la taille des cases et de trouver le centre de la case (en ajoutant la moitié de la taille des cases). Vous pouvez spécifier une vitesse de 0.05 [px/ms] et une couleur de votre choix.

### Animation avec interpolation (*tweening*) 

Créez dans votre programme principal une méthode *generateTweens* qui se chargera d'initialiser toutes les animations des mouvements entre la position actuelle du cercle et la position du centre de la case de destination suivante (trouvable via *flowMap*).  Cette méthode prendra une entité en paramètre le cercle (nommé **mob** dans l'aglo qui va suivre) et s'occupera d'initialiser les interpolations (*tween*) entre tous les points de passe pour atteindre sa destination. Comme aide, voici un exemple d'algorithme :

**a)** Stocker la position initial {x, y} du cercle dans une variables nommée *lastPos*

**b)** Stocker les coordonnées {row, col} de la case de la grille où se trouve notre cercle à partir de *lastPos* dans une variable nommée *lastCell*

**c)** Stocker les coordonnées {row, col} de la destination à partir de *lastCell* grâce à *flowMap* dans une variable nommée *nextCell* . Si aucune destination n'est disponible, s'arrêter là.

**d)** Stocker la position {x, y} de la destination dans une variable *nextPos* en transformant les coordonnées de *nextCell* en {x, y}

**e)** Calculer la distance entre *lastPos* et la destination (grâce au **théorème de Pythagore**)

**f)** Créer deux *tweens*, l'une pour l'animation des x et l'autre pour les y en se basant sur le code suivant:

```js
const duration = dist / mob.speed;
tweenX = tweens.create({from: lastPos.x, to: nextPos.x, duration, after: tweenX, animate: x => {
  mob.x = x;
}});
tweenY = tweens.create({from: lastPos.y, to: nextPos.y, duration, after: tweenY, animate: y => {
  mob.y = y;
}});
```
**g)** *lastPos* prend la valeur de *nextPos*. *lastCell* prend la valeur de *nextCell* et on recommence au point **c)**

Finalement, modifiez votre méthode de gestion des clics. Lorsqu'un clic se produit, après le recalcul de *flowMap*, il vous faut supprimer toutes les *tweens* actuelles et appellé à nouveau votre fonction *generateTweens*.
