# POO,  canvas, animation

## Mise en place

La programmation orienté objet est une des manières de structurer un code. Une syntaxe proche de celle que vous avez utilisée en Java est disponible dans JavaScript. Consultez  la [documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes) pour une première prise en main. La POO peut être un bon paradigme associé à l'animation car les entités affichées sont souvent de même type, ainsi le principe d’encapsulation est structurant.  (Il est bien sûr possible d'utiliser d'autres paradigmes de programmation tout aussi efficacement.) 

Pour une première prise en main, essayons d'effectuer une animation avec un effet de parallaxe qui serait généré par le mouvement d'une caméra *virtuelle* manipulée par l'utilisateur. Nous allons créer des cercles dans un plan cartésien (modifié par la suite en tore plat) et les faire *bouger* selon les touches du clavier pressées par l'utilisateur.

## Canvas
Ajoutez une balise *canvas* dans le HTML de votre page. Vous pouvez la styliser en CSS selon votre bon vouloir. Voici un exemple pour lui donner la taille de la fenêtre d'affichage (*viewport* en anglais) :

```css
body { 
  margin: 0; 
} 
canvas { 
  background: black;
  /* remove scrollbar */
  display: block;
  /* 100% of viewport */
  width: 100vw; /* vw = viewport width */
  height: 100vh; /* vh = viewport height */
}
```
Ensuite, récupérez le **contexte** graphique dans votre programme principal (*index.js*) et donnez lui la même taille que la *viewport* avec le code suivant:
```js
let ctx = $("canvas").get(0).getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
```

## Cercles

Créez une classe *Circle* dans un dossier */class* dans vos sources. Ajoutez un constructeur pour vos cercles. Les cercles seront dans un plan (cartésien à deux dimensions). Ils auront les propriétés suivantes: x, y, radius, speed, color, colorBorder. Ajoutez une méthode *draw* qui prendra en paramètre un contexte de *canvas* (un paramètre nommé *ctx* par exemple). Utilisez la [méthode *arc* ](https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/arc) pour le dessin des cercles. Puis, ajoutez une méthode *move* pour faire une translation des cercles dans le plan selon sa vitesse, une direction (un angle en radian) et un intervalle de temps en milliseconde (la direction et l'intervalle de temps seront reçu en paramètre). 

## Génération de cercles aléatoires

Dans votre programme principal, créez un tableau pour le stockage des cercles. Générez 200 cercles de positions pseudo-aléatoires (mais incluse dans la *viewport*), et de couleurs pseudo-aléatoires. Pour que vos couleurs ne soient pas trop ternes, vous pouvez utiliser [randomcolor](https://github.com/davidmerfield/randomColor). Pour vos nombres pseudo-aléatoires, vous pouvez utilisez la méthode suivante (à mettre dans un module *Math* dans un dossier *lib* de votre projet):

```js
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
```
Pour les rayons, essayez de trouver une astuce pour que votre code génère plus de petits cercles que de grands cercles. Pour les vitesses, indiquez 0.1 [px/ms] pour le moment.

Afin de tester tout cela, dessinez tous les cercles dans le *canvas* grâce à la méthode *draw* codée au point précédent.

## Animation
La méthode [requestAnimationFrame](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame) va nous permettre de faire notre boucle d'animation. Comme nous l'avons vu en cours, pour que la vitesse des mouvements soit indépendante du taux de rafraîchissement (*framerate*), il nous faux calculer la différence de temps (Δt) entre deux rafraîchissements (*frames*).  Comme vous pouvez le lire dans la documentation, *requestAnimationFrame* nous donne déjà un *timestamp* en milliseconde. Il nous suffit donc de faire la différence avec le *timestamp* de la *frame* précédente. Pour la toute première *frame* faites que cette différence soit nulle.

Pour tester votre boucle d'animation, faites les opérations suivantes à chaque *frame*:

- Calculer le Δt
- Déplacer les cercles (méthode *move*) en fournissant un angle quelconque et le Δt
- Effacer le *canvas*
- Dessiner tous les cercles (méthode *draw*)

## Parallaxe

Deux choses simples vont nous permettre de créer l'illusion d'un effet de parallaxe. Premièrement, les cercles de grand rayon devraient être dans un plan plus proche de la "caméra" que ceux de petit rayon.  Deuxièmement, plus un cercle est loin du premier plan plus il devrait se déplacer lentement. Pour le premier point, il suffit de trier le tableau des cercles par ordre croissant de leur rayon. Pour le faire proprement, codez une nouvelle méthode dans la classe *Circle* permettant de comparer le rayon du cercle avec celui d'un autre. (Comme d'habitude cette méthode doit retourner un nombre négatif si le cercle *this* est plus petit que celui avec lequel on le compare, 0 s'il est de taille identique et un nombre positif s'il est plus grand.) Utilisez ensuite cette méthode pour faire un tri (méthode *sort*) du tableau des cercles après leur génération aléatoire.  Pour le deuxième point, il vous faut modifier votre code de génération aléatoire des cercles pour que leur vitesse soit proportionnelle à leur rayon. Testez à nouveau votre animation et observer l'effet *parallaxe* en action.

##  Univers en tore plat  
Vous l'avez certainement remarqué lors de votre test d'animation: au bout d'un certain temps plus aucun cercle n'est visible dans votre *canvas* puisque leur position dans le plan est en dehors de la limite du *canvas*. Pour évitez ce problème et donner l'illusion d'un translation *infinie*, nous pourrions changer le plan en *repliant* les cotés du *canvas* sur lui même dans un tore plat (ou tore bidimensionel, ou si vous préférer un référence ludique, à un niveau du jeu de Pacman). Pour le faire, créez un nouveau fichier *InFlatTorus.js* dans un sous-dossier *Circle* de votre dossier *class*. Puis créez une classe héritant de *Circle* (avec le mot clés *extends*).  Surchargez le constructeur pour qu'il accepte deux paramètre de plus, la largeur et la hauteur du tore plat. Surchargez aussi la méthode *move* pour faire que si le cercle venait à sortir des limites (haut, bas, gauche, droite), il reviendrait par l'autre bord associé (bas <-> haut, gauche <-> droite). 

Modifiez votre programme principal pour créer des cercles dans un tore plat à la place des cercles dans un plan "infini" et observez à nouveau votre animation.

## Détection des touches du clavier

Afin de pouvoir laisser l'utilisateur contrôler la caméra, il nous faut savoir quelles touches de direction (WASD  par exemple) sont actuellement appuyées. Afin d'en faire un module réutilisable, nous allons encapsuler la gestion du clavier dans une classe. Commencez donc par créer un nouveau fichier *Keyboard.js* dans votre dossier *class*.  Le constructeur de cette classe n'aura qu'un seul paramètre nommé caseSensitive qui aura la valeur booléenne *false* par défaut et qui permettra d'indiquer sur le gestionnaire sera sensible à la casse des lettres ou non. Le constructeur initialisera une structure de données qui permettra de stocker toutes les touches actuellement appuyées par l'utilisateur. Vous pouvez utiliser un tableau mais une [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) ferait aussi bien (même mieux) le travail. Le constructeur écoutera aussi deux événements sur l'élément DOM *window*,  *keydown* pour la détection de l'appui sur les touches, et *keyup* pour la détection des relâchements. Voila le code pour leur écoute:

```js
$(window).on("keydown", event => this.onKeyDown(event));
$(window).on("keyup", event => this.onKeyUp(event));
``` 
Il vous faut donc coder les méthodes *onKeyDown* et *onKeyUp*. Pour récupérer la touche actuellement appuyée par l'utilisateur, vous pouvez utiliser [
event.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) . Lors de l'appui d'une touche, stockez la dans votre structure de donnée et supprimer la lors de son relâchement. Si vous êtes en mode "insensible à la casse" (c'est le cas si le paramètre caseSensitive est à faux), vous pouvez transformer la lettre en majuscule avant de la stocker dans votre structure grâce à la méthode [toUpperCase](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/toUpperCase). 

Finalement, ajoutez une méthode *isKeyDown(key)* qui retournera *true* si la touche fournie en paramètre est présente dans votre structure des touches actuellement appuyées et *false* dans les autres cas.

## Mouvement de la "caméra" par l'utilisateur

Maintenant que nous somme capable de savoir la combinaison de touche actuellement appuyée, nous allons pouvoir simuler un déplacement de la caméra par l'utilisateur plutôt que le mouvement automatique actuellement programmé.  Comme nous n'avons pas réellement de caméra, nous allons simplement sélectionner  l'angle pour le mouvement des cercles. Ainsi, au lieu de faire bouger la caméra (ce qui ne provoquerait pas l'effet parallaxe que nous avons simulé), nous allons bouger tous les cercles (ce qui aura comme illusion de faire un travelling). Afin de simplifier les mouvements possibles, nous allons nous limiter aux 8 mouvements suivants, listé ici avec leurs touches et radians:

 - 'W' et 'D' simultanément appuyées: Nord-Est (1.75***π**)
 - 'W' et 'A' simultanément appuyées: Nord-Ouest (1.25***π**)
 - 'S' et 'D' simultanément appuyée: Sud-Est (0.25***π**)
 - 'S' et 'A' simultanément appuyée: Sud-Ouest (0.75***π**)
 - 'W' appuyé: Nord (1.5***π**)
 - 'D' appuyé: Est (0)
 - 'S' appuyé: Sud (0.5***π**)
 - 'A' appuyé: Ouest (**π**)

Il ne reste plus qu'à modifier l'angle par défaut du mouvement de vos cercles avec ces valeurs selon les touches appuyées par l'utilisateur. Si l'utilisateur n'a appuyé sur aucune de ces touches, ne bouger simplement pas les cercles. (Vous n'avez d'ailleurs ni besoin d'effacer, ni de redessiner tous vos cercles puisque rien ne bouge.)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5MzU0NzczNV19
-->