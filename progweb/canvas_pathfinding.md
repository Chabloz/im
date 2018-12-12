
# Canvas, animation, recherche de chemins
  

## Mise en place  

Le premier objectif de ce TP est de continuer à travailler sur la balise *canvas*, les animations ainsi que la programmation modulaire. Le deuxième objectif est de s'initier aux problèmes de recherche de chemin (*pathfinding*) .

Afin de bien comprendre l'avantage d'un code modulaire, nous allons reprendre les classes que nous avons créées dans les TP précédent, *Circle*, *Keyboard* et *LifeLikeAutomaton*. Enfin, afin de simplifier la gestion des animations, nous allons utiliser un bibliothèque de fonction pour le déplacement de nos objets à l'écran : [tween.js](https://github.com/tweenjs/tween.js/). 

Pour vous simplifier le travail, vous pouvez utiliser  ce [code HTML](resources/canvas_path_finding.html) afin d'avoir un design de base pour votre animation. Ensuite, récupérez le **contexte** graphique du *canvas* dans votre programme principal.   


## Recherche de chemin
  
Le problème de la recherche de chemin est un point important de l'algorithmique puisqu'on le retrouve dans des domaines variés comme la robotique, la navigation par gps, les jeux, ... Dans ce TP nous n'allons qu’effleurer la surface de ce domaine complexe. 

Afin de ne pas partir de zéro, nous allons nous focaliser sur la recherche de chemin dans une grille 2D. Puisque nous avons déjà codé cette structure sous la forme d'un tableau à deux dimensions dans notre automate cellulaire, commencez par créer un nouveau fichier dans votre dossier *class/LifeLikeAutomaton* nommé *WithPathfinding.js* qui contiendra une classe héritant de *LifeLikeAutomaton*. Créez aussi un programme principal qui, pour le moment, ne fera que les choses suivantes:

- Initialisation du *canvas*
- Création d'un automate cellulaire de la taille du *canvas* divisé par 40 px avec une largeur des cases valant 40 px 
- Initialisation de l'automate cellulaire avec toutes ses cases à l'état *vivant*
- Dessin de l'automate sur le *canvas*  

### Algorithme de parcours en largeur (*breadth-first search*)
  
 Un des algorithmes le plus simple pour la recherche de chemin est une adaptation mineure de l'[algorithme de parcours en largeur](https://fr.wikipedia.org/wiki/Algorithme_de_parcours_en_largeur) (BFS) . Appliqué à notre grille, cet algorithme de parcours va partir d'une case de la grille (notre destination) et parcourir en premier ses voisins (4 ou 8 voisins selon que l'on autorise les mouvements en diagonale ou pas). Puis pour chacun de ces voisins, l'algorithme va parcourir leurs voisins respectifs, mais en y excluant les cases déjà parcourues.   Ainsi, petit à petit l'ensemble des cases de la grille va être traité, un peu à la manière d'un remplissage par un flot.  Vous trouverez [ici](https://www.redblobgames.com/pathfinding/a-star/introduction.html#breadth-first-search) une très bonne animation représentant la chose. 

Afin de transformer cet algorithme en recherche de chemin, il suffit d'ajouter la chose suivante: à chaque fois qu'une case est parcourue, il faut se rappeler (c.à.d. stocker) la case d'où l'on venait (c'est à dire, la case dont on était considéré comme le voisin). Ainsi, une fois l’algorithme finit, nous aurons toutes les informations nécessaire pour nous rendre d'une case à une autre dans notre grille. 

La deuxième petite amélioration de l'algorithme que nous pouvons faire, est de ne pas parcourir les voisins *morts* d'une cellule. Ainsi les cases *mortes* représenterons  des *murs* infranchissables. 

Voici un exemple de code JS que vous pouvez reprendre dans votre classe. Je vous ne demande donc pas de coder l'algorithme (si vous le voulez vraiment, ne regardez pas le code qui suit), mais uniquement de le comprendre afin de l'utiliser efficacement:

```js
initFlowMap() {
   this.flowMap = [];
   for (let x = 0; x < this.width; x++) {
     this.flowMap[x] = [];
     for (let y = 0; y < this.height; y++) {
       this.flowMap[x][y] = false;
     }
   }
 }
  
flowFieldTo(x, y, allowDiag = true) {
    this.initFlowMap(); // ini
    let frontier = [];
    frontier.push({x, y});
    this.flowMap[x][y] = {x, y};
    while (frontier.length > 0) {
      let current = frontier.shift();
      this.getWalkableNeighbors(current.x, current.y, allowDiag).forEach(next => {
        if (this.flowMap[next.x][next.y] === false) {
          frontier.push(next);
          this.flowMap[next.x][next.y] = {x: current.x, y: current.y};
        }
      });
    }
    this.flowMap[x][y] = false;
  }
```

Comme vous pouvez le remarquer, une seule méthode n'est pas fournie : *getWalkableNeighbors*. Cette méthode doit fournir un tableau contenant les voisins de la cellule de position (x,y), c'est à dire les cellules suivantes : (x + 1, y), (x - 1, y), (x, y + 1),  (x, y - 1) ainsi que les suivantes si vous autorisez les diagonales: (x + 1, y -1), (x + 1, y + 1),  (x - 1, y -1), (x - 1, y + 1). Bien sûr, il faudra exclure (vous pouvez utiliser la méthode [filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter)) les celluleuses voisines mortes ou en dehors du tableau (pour gérer correctement les bords de la grille). Implémentez cette méthode, puis modifiez votre programme principal en rajoutant un appel à la méthode *flowFieldTo*. Faites un *console.log* de *flowMap* afin de vérifier que le flot est correctement calculé. Comme vous pourrez le voir dans votre console, *flowMap* contiendra pour chaque case les valeurs (x, y) du voisin de destination afin de se rapprocher de la destination finale.
 
### Dessin du flot

Afin de visualiser plus clairement le résultat de l'algorithme précédent, nous allons ajouter une méthode de dessin du flot.  Une flèche de direction dans chaque case, pointant dans la direction de la case suivante (désignée par *flowMap*) devrait être suffisante pour une bonne représentation. Nous pourrions bien sûr dessiner cette flèche, mais pour apprendre de nouvelles fonctionnalités de dessin sur le *canvas*, nous allons le faire avec l'affichage d'un caractère.  Notre page étant en UTF-8,  il suffit donc de choisir l'un des nombreux caractères de flèche disponible dans ce jeu de caractère. Le caractère '→' devrait faire l'affaire. L'astuce est de faire pivoter la flèche d'un certain angle pour le faire pointer dans la bonne direction. Il faut aussi penser à la taille du caractère et à son centrage dans la cellule.  Pour ce qui est de la taille et du centrage, utilisez les méthodes suivante sur votre contexte de *canvas*:
```js
ctx.font = `${this.tileSize/2}px serif`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
```
Ainsi, votre flèche aura une taille équivalente à la moitié  de la taille d'une cellule. Il vous faut encore trouver le centre d'une cellule (x,y), mais vous devriez trouver facilement la formule.

Pour ce qui est de l'angle de rotation, la méthode **Math.atan2** permet de facilement connaitre l'angle entre deux points grâce à la formule suivante :

```js
let angle = Math.atan2(destY - y, destX - x);
```
Pour appliquer facilement cette rotation, effectuez une translation du *canvas* sur le centre de la case avec la méthode  [translate](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/translate), puis appliquez la rotation avec la méthode [rotate](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/rotate).  Affichez votre caractère grâce à la méthode [fillText](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillText). Enfin réinitialisez les modifications de translation et rotation grâce à la méthode [setTransform](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/setTransform). Pour plus de détail sur ces techniques, n’hésitez pas à consulter ce [tutoriel](https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Transformations).

L'algorithme final pour afficher les flèches du flot devient alors pour chaque case:

- calculer la position du centre de la case (x,y)
- calculer l'angle entre (x,y) et la case suivante du flot disponible dans *flowMap*
- effectuer une translation et une rotation du contexte de *canvas*
- Afficher le caractère  '→' en position (0,0) 
- Réinitialiser la translation et la rotation

Finalement, testez votre algorithme en dessinant ce flot dans votre programme principal.

## Génération et mouvement d'entités 

Maintenant que nous possédons l'information nécessaire pour trouver n'importe quel chemin d'un point de la grille à un autre, nous allons l'utiliser pour déplacer des entités (des cercles dans notre cas) sur un chemin entre une origine et une destination. Avant de coder une générateur d'entité (un *mob spawner* en langage Minecraft), nous allons nous contenter de faire bouger un seul cercle. 

Commencez par créer dans votre programme principal une méthode qui s'occupera de la création de ce cercle. La position (x,y) du cercle devra coïncider avec le centre de la case qui servira à la génération (*spawn*) de nos entités. Pour trouver le centre de la case sur le *canvas*, il vous faudra donc multiplier les coordonnées (x,y) de la case de départ avec la taille des cases et de trouver le centre de la case. Vous pouvez spécifier une vitesse de 0.1 [px/ms] et une couleur de votre choix ou  aléatoire ( avec *randomcolor*).

### Animation avec interpolation (*tween*) grâce à tween.js 

Commencez par installer le module [tween.js](https://github.com/tweenjs/tween.js/) dans votre projet. Voilà la commande pour le faire:

```js
npm install @tweenjs/tween.js --save
```

Ensuite, créez (toujours dans votre programme principal) une méthode qui se chargera d'initialiser l'animation du mouvement entre la position actuelle du cercle et la position du centre de la case de destination (trouvable via *flowMap*).  Cette méthode prendra une entité en paramètre (notre cercle) et s'occupera d'initialiser l'interpolation (*tween* ).  L'algorithme de cette méthode sera le suivant:

- Trouver les coordonnées (x,y) de la case de la grille où se trouve notre cercle
- Récupérer les coordonnées (x,y) de la destination grâce à *flowMap*. Si aucune destination n'est disponible, s'arrêter là.
- Transformer les coordonnées (x,y) de la destination en position (x,y) du centre de la case dans le *canvas*
- Calculer la distance entre l'originie







<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk0MzY1ODU2OSw5MTI0Mjk0NzEsLTEyOT
Q0MjYyMTMsLTE3NDk2ODI5NTldfQ==
-->