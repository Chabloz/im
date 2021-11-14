# Animation

## Mise en place

Un des "hello world" de l'animation est celui de la balle qui rebondit sur les bords de l'écran. Nous allons réaliser la chose en ajoutant une simulation de la gravité et du frottement. Nous pourrions reprendre les équations physiques pour ce mouvement,  mais nous allons plutôt utiliser des simplifications permettant toutefois d'obtenir un bon résultat.

## Rebondir sur les bords du *canvas*
Créez un nouveau fichier nommé *Bouncing.js* dans *class/Circle/* et codez une classe héritant de la classe *Circle*.  Dans cette nouvelle classe, nous allons étendre la classe de base en remplaçant la vitesse par deux *vélocités*, une pour les X et une pour les Y (ce qui formera notre vecteur de *vélocité*). Créez donc le constructeur adéquat pour prendre en compte ces modifications.

### Méthode *move*
Surcharger la méthode *move* de la classe parente pour calculer les (x,y) du cercle en prenant en compte les deux vélocités X et Y. N'oubliez pas de multiplier par Δt. 

### Boucle d'animation
Dans votre programme principal, testez votre nouvelle classe en créant un cercle. Puis créez une *boucle* d'animation (grâce à *requestAnimationFrame* ou en utilisant (MainLoop.js)[https://github.com/IceCreamYou/MainLoop.js]), et faites bouger votre cercle. 

### Méthode *bounceOffTheWalls*

Rajoutez une méthode *bounceOffTheWalls* dans votre classe. Lorsque le cercle touche (ou déborde) des bords du *canvas*, inversez la vélocité associée.  Appelez cette nouvelle méthode dans votre boucle d'animation juste après le mouvement de votre cercle pour la tester.

### Méthode *applyGravity*: simulation de la gravité et de l'élasticité (coefficient de restitution)

Rajoutez une méthode *applyGravity* dans votre classe. Cette méthode recevra le Δt et une gravité et modifiera la vélocité Y en conséquence. Appelez cette nouvelle méthode dans votre boucle d'animation juste après le mouvement de votre cercle pour la tester. Si vous n'avez pas pris des équations physiques pour la gravité, vous vous apercevrez que votre balle n'aura pas un mouvement très naturel.  Pour l'améliorer (tout en restant dans la simplification), nous pourrions rajouter un coefficient de restitution (élasticité) lors du rebond sur le bord bas du *canvas*. Pour le faire, modifiez la méthode *bounceOffTheWalls* pour y ajouter un paramètre *withElasticity* de type booléen. Modifiez ensuite le code du rebond sur le bas du *canvas* pour que celui ci applique une réduction de la vélocité Y.  Testez quelques idées afin d'obtenir un mouvement suffisamment réaliste dans votre animation.

### Méthode *applyFloorFriction* : simulation du frottement avec le sol
Rajoutez une méthode *applyFloorFriction* dans votre classe. Cette méthode recevra en paramètre Δt, ctx ainsi qu'une valeur de simulation pour le frottement. Son code modifiera la vélocité X en conséquence. Appelez cette nouvelle méthode dans votre boucle d'animation juste après le mouvement de votre cercle pour la tester. N'oubliez pas que le frottement n'a lieu que si le cercle est en contacte avec le sol. Testez à nouveau votre animation et ajustez les paramètres de friction pour que le mouvement vous paraisse adéquat.

### Timer
Dans votre bouble d'animation, essayez de rajouter un minuteur pour faire apparaître toutes les 100 [ms] un nouveau cercle à une position fixe mais avec une couleur, un rayon et une vélocité aléatoire (mais dont la direction sera toujours entre le nord-ouest et le nord-est). Essayez aussi de supprimer les "vieux" cercles pour qu'un maximum de 100 cercles soient visibles à l'écran.
