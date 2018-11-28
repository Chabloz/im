# Canvas, animation, automates cellulaires 2D (jeu de la vie)

## Mise en place
Le premier objectif de ce TP est de continuer à travailler sur la balise *canvas* et les animations. Le deuxième objectif est de s'initier aux [automates cellulaires](https://fr.wikipedia.org/wiki/Automate_cellulaire) et  à leur utilisation comme outils de  [génération procédurale](https://fr.wikipedia.org/wiki/G%C3%A9n%C3%A9ration_proc%C3%A9durale) de terrain.

Afin de vous simplifier le travail, vous pouvez utiliser  ce [code HTML](resources/canvas_automaton.html) afin d'avoir un design de base pour l'interaction avec l'automate cellulaire. Ensuite, récupérez le **contexte** graphique du *canvas* dans votre programme principal.  

Voici une [démo](https://chabloz.eu/files/automaton/) du résultat final escompté.

## Automate cellulaire 2D

L'automate cellulaire que nous allons utiliser est un automate de [type jeu de la vie](https://en.wikipedia.org/wiki/Life-like_cellular_automaton) . Nous allons le représenter grâce à un tableau à deux dimensions de booléens, permettant ainsi de stocker les états vivant (*true*) et mort (*false*) de chaque cellule. Commencez par créer une classe *LifeLikeAutomaton* dans votre dossier *class*. Le constructeur ne devrait recevoir en paramètre que les données de la largeur et de la hauteur du tableau, mais comme nous allons le dessiner sur le *canvas* nous pouvons ajouter un paramètre pour la taille (en px) des cases et trois autres pour les couleurs (des cellules vivantes, des cellules mortes et de la grille) . Vous pouvez y mettre des valeurs par défaut si vous le souhaitez. Vous pouvez aussi initialiser le tableau de booléens avec des cellules mortes ou vivantes, mais ce n'est pas obligatoire car nous allons plutôt utiliser une méthode aléatoire d'initialisation.

### Méthode *randomize*

Afin de créer une "population" initiale aléatoire de cellules, ajoutez une méthode *randomize* dans votre classe. Celle-ci va simplement remplir de cellules d'état aléatoire mort ou vivant notre tableau. Elle prendra en paramètre la probabilité entre [0,1] qu'une cellule soit initialisée à l'état vivant.   

### Méthode *draw*
Ajoutez une méthode pour le dessin de l'automate sur le *canvas*. Cette méthode recevra le contexte graphique en paramètre. Pour le dessin, dessiner d'abord la grille puis ensuite chacune des cases. Pour que la position (x, y) des cases corresponde au bon (x, y) du *canvas* n'oubliez pas de les multiplier par la taille des cases. Pour leur couleur (*fillStyle*), choisissez la bonne en fonction de l'état de la cellule. Finalement, pour que vos cases ne recouvrent pas la grille, dessinez les cellules avec une marge externe de 1 [px]. Vous pouvez utiliser la méthode [
fillRect](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect)  pour le dessin des cellules (et de la grille).  Testez votre classe avec les étapes suivantes: 

 - Créez un automate cellulaire de taille identique au *canvas* divisé par la taille des cellules (fixée à 14px par exemple).
 - Initialisez l'automate aléatoirement en appelant sa méthode *randomize* avec une probabilité de 0.1  pour générer un bruit de test.
 - Dessinez l'automate sur le *canvas* grâce à sa méthode  *draw*.

## B3/S23, ou les règles du Jeu de la Vie

Nous allons maintenant mettre en place les changements d'état de notre automate cellulaire. C'est à dire les règles qui vont nous permettre de savoir si une cellule sera vivante ou morte à la prochaine "itération" de l'automate cellulaire. Il existe plusieurs notations pour ces règles. Nous allons utiliser la plus simple à lire. Cette notation permet de définir les règles de naissance et de survie d'une cellule par apport à son [voisinage de Moore](https://fr.wikipedia.org/wiki/Voisinage_de_Moore). Voilà un exemple de cette syntaxe :
```
B3/S23
```
Le **B** (*birth*) indique la règle provoquant la naissance d'une cellule par apport au nombre de ses voisins. Dans cet exemple, une cellule morte devient vivante (naît) si exactement 3 cellules adjacentes (selon le voisinage de Moore) sont actuellement vivantes. 

Le **S** (*survival*) indique la règle provoquant la survie (et donc réciproquement la mort) d'une cellule en fonction de ses voisins. Dans cet exemple, une cellule vivante le reste uniquement si 2 **ou** 3 cellules adjacentes sont actuellement vivantes (et elle meurt donc dans tous les autres cas).

Afin d'implémenter cette syntaxe, nous pourrions représenter ces deux règles par deux tableaux de neuf booléens chacun. Cela permettrait ainsi de représenter les 2^18 automates possibles.  La règle d'exemple pourrait-être représentée comme cela :

```js
[false, false, false, true, false, false, false, false, false] // Birth rule B3
[false, false,  true, true, false, false, false, false, false] // Survival  rule S23
```
Il y a bien sûr d'autres solutions pour représenter les 2^18 automates possibles.  Mais celle là a l'avantage d'être suffisamment explicite. L'algorithme permettant de savoir si une cellule à la position (x,y) sera vivante ou morte à la prochaine itération  est donc:

 - Calculer le nombre de cellules vivantes dans le voisinage de Moore de la cellule.
 - Si la cellule (x,y) est actuellement vivante, elle prend la valeur à l'indice équivalent aux nombres de voisins vivants dans la tableau de booléens de la règle de survie.
 - Si la cellule (x,y) est actuellement morte, elle prend la valeur à l'indice équivalent aux nombres de voisins vivants dans la tableau de booléens de la règle de naissance.
 
Rajoutez donc deux méthodes dans votre classe *LifeLikeAutomaton*:

- Une méthode qui retournera le nombre de cellules vivantes dans le voisinage de Moore d'une cellule. La position (x, y) de la cellule sera reçue en paramètre. Attention, pour les cellules en bord de tableau, ne prenez en compte que les cellules adjacentes présentes dans le tableau. (Nous utiliserons un tore plat par la suite.)  
- Une méthode qui applique les règles **B/S** à l’ensemble des cellules du tableau. Elle recevra en paramètre les deux tableaux de booléen représentant les règles **B** et **S** et appliquera l'algorithme décrit plus haut. Attention toutefois à ne pas modifier trop tôt le tableau des cellules de l'automate puisque cela provoquerait des erreurs dans le décompte des voisins vivants des cellules suivantes. Opérez donc les changements sur une copie.


## Animation

Il serait agréable de pouvoir modifier la fréquence de mise à jour de l'automate cellulaire. Ainsi nous pourrions examiner en détail le comportement de certaines règles en ralentissant cette fréquence, ou encore explorer leurs effets sur le long terme en l'augmentant. 

La plupart du temps, une boucle d'animation pour un *canvas* se fait avec la méthode *requestAnimationFrame* (cf. TP [canvas parallaxe](canvas_parallax.md)). Cela permet de déléguer au browser la gestion des *frames*. Le browser va faire de son mieux pour être proche de la fréquence de rafraîchissement de l'écran (la plupart du temps 60 [Hz]) afin de rendre l'animation fluide. Ainsi une itération d'une boucle classique d'animation peut se décrire ainsi: 

- Calculer le Δt avec la *frame* précédente
- Mettre à jour le monde selon le Δt. 
- Redessiner l'état du monde dans le *canvas*

L'étape "redessiner le monde" s'effectue souvent par un effacement total du *canvas* et le dessin de tous les éléments. On peut toutefois optimiser cette étape en ne redessinant que les parties du *canvas* où des changements ont eu lieu. C'est ce que nous allons faire dans ce TP.

Afin de diversifier les méthodes d'animation et de travailler sur les *timers*, nous n'allons pas utiliser *requestAnimationFrame*. Une des raisons est que nous n'avons pas besoin d'une grande précision dans la gestion du temps. Le *timer* nous permettra aussi de simplifier notre boucle d'animation. Voilà un exemple de code pour une animation basée sur un *timer*:

```js 
 let timer = setInterval(() => {   
	// Application des règles B/S et mise à jour du canvas
 }, 1000/fps);
```
Il est important de comprendre que le *fps* utilisé ici ne sera qu'un souhait et non le véritable *fps*.  Premièrement parce que les *timer* ne sont pas très précis, mais surtout parce que le traitement effectué à chaque *frame* peut-être suffisamment lent pour provoquer un délai pour l’exécution la prochaine *frame*.  

Testez cette méthode d'animation avec votre automate cellulaire. Choisissez  un *fps* de 2 afin de contrôler que les règles sont correctement appliquée à l'ensemble des cellules de votre automate. A chaque itération, effectuez les opérations suivantes:

 - Appliquez les régles **B/S** à votre automate.
 - Redessinez votre automate. Bien sûr, vous n'avez pas besoin de redessiner la grille.

Si vous utilisez les règles **B3/S23**, vous devriez normalement voir le Jeu de la Vie prendre vie grâce à votre boucle d'animation !

## Univers en tore plat
De la même manière que le TP sur l'effet parallaxe, ajoutez une nouvelle classe *InFlatTorus* dans le dossier *class/LifeLikeAutomaton* (à créer). Elle héritera (*extends*) de la classe *LifeLikeAutomaton* et surchargera la méthode qui retourne le nombre de cellules vivantes dans le voisinage de Moore. Afin de simuler un tore plat, il vous suffit en effet de modifier la manière de considérer les voisins d'une cellule. Une méthode souvent utilisée pour la gestion de cycle en informatique est l'utilisation du [modulo](https://en.wikipedia.org/wiki/Modulo_operation). Comme vous pouvez le lire sur la page Wikipédia, son implémentation dans les langages de programmation est très diversifiée. Dans notre cas, nous avons besoin du modulo euclidien couramment utilisé en mathématique. Voici une fonction  à rajouter dans votre bibliothèque mathématique *lib/Math* pour le calculer:

```js
export function moduloEuclidian(op1, op2) {
  return ((op1 % op2) + op2) % op2;
}
```
Cette fonction va nous éviter de nombreux formants algorithmiques de sélection (*if*) dans notre algorithme. En effet, si vous appliquez cette fonction sur un indice indiquant une cellule en dehors du tableau de l'automate, cette indice sera rectifié pour se situer à l'intérieur  du tableau. Par exemple, pour la cellule (0,0) du tableau, la position de son voisin de gauche indiqué par (-1,0) sera  rectifiée en (largeur du tableau - 1,0), ce qui correspondra bien à la position de la cellule de gauche dans un univers en tore plat.


## Gestion des touches du clavier

Nous avons vu dans le TP précédent comment détecter si des touches du clavier de l'utilisateur sont actuellement appuyées. Mais nous avons désormais un nouveau besoin, En effet, comme nous voulons pouvoir réduire les *fps* de notre animation, il ne serait pas souhaitable d’effectuer la détection des touches lors de notre boucle d'animation, car le délai de réaction serait trop grand en cas de *fps* bas. Nous allons donc légèrement améliorer la classe *Keyboard*. Premièrement, modifiez le constructeur en y ajoutant la ligne suivante:
```js
this.pubSub = $({});
```

Deuxièmement, modifiez la méthode *onKeyDown* pour y ajouter le code suivant en fin de méthode:
```js
this.pubSub.trigger(`keyboard:${key}`, this.keyPressed);
```

Troisièmement, ajoutez la nouvelle méthode *onKey* suivante:

```js
onKey(key, callback) {
   if (!this.caseSensitive) {
     key = key.toUpperCase();
   }
   this.pubSub.on(`keyboard:${key}`, callback);
 }
``` 

Ces ajouts vont nous permettre d'écouter la frappe d'une touche précise au clavier. Voilà un code d'exemple:

```js
const KEYBOARD = new Keyboard();
KEYBOARD.onKey('t', (event, keysPressed) => console.log(keysPressed));
```

### Modification du *frame rate*

Grâce à ces nouveautés, donnez le contrôle du *frame rate* désiré à l'utilisateur en écoutant deux touches de son clavier ('w', 's' par exemple). Le code lié à ces touches devra donc modifié les *fps* désirés, puis stopper et relancer votre boucle d'animation avec la valeur du *frame rate* modifié. Bornez les valeurs que peut prendre les *fps* désirés par 1 et 250.

### Autres modifications possibles par l'utilisateur
De la même manière, vous pouvez donner le contrôle à l'utilisateur sur différent paramètres de votre automate cellulaire. Implémentez au minimum les fonctionnalités suivantes: 

 - Pause de l'animation
 - Nouvelle génération aléatoire  pour l'automate cellulaire  (*reset* dans la demo)
 - Changement de la taille des cases (*tile size*) 
 - Changement de la probabilité qu'une cellule soit à l'état vivant lors de la génération aléatoire.
 - Changement des règles **B/S** (la démo offre ce changement via la souris, mais d'autres solutions plus ergonomiques sont possibles)
 
 Vous pouvez bien sûr implémenter les autres fonctionnalités présentes dans la démo si vous le souhaitez.

## Optimisation du dessin de l'automate

La simplicité de l'automate cellulaire va nous permettre d'optimiser l'étape de sa mise à jour sur le *canvas*. En effet, la seule étape qui provoque un changement de l'automate est l'application des règles **B/S**. Ainsi, il est possible de ne dessiner que les cellules où un changement s'est produit. Modifiez donc votre méthode d'application des règles pour qu'elle accepte un troisième paramètre *ctx* pour le contexte graphique. Mettez sa valeur par défaut à *null*, cela permettra de continuer à utiliser cette méthode sans forcément provoquer un effet sur le dessin. Par contre, si *ctx* est fournit et que la cellule a changé d'état, faites que ce changement soit répercuté sur le *canvas* en utilisant la méthode [fillRect](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillRect) . Modifiez votre boucle d'animation en conséquence et observer l'effet sur les *fps* ! 
 

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzEzNTU2MTE3LC0xOTM0NjE4NzU3LC01Nz
E3MzI1MjMsLTE0MTEyNDc3ODksNzc1MTkwMTRdfQ==
-->