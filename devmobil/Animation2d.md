# Exercice de révision

Développez un jeu d’adresse où le joueur doit atteindre des cibles le plus rapidement possible. Voici les étapes à suivre pour sa réalisation :

## Boucle d'Animation et Canvas
- Implémentez une boucle d’animation avec `requestAnimationFrame` ou `mainloop.js` pour permettre l’arrêt à la fin du jeu.
- La méthode de gestion des frames doit calculer le Δt entre chaque frame et le temps total écoulé depuis le début de l'animation.
- Récupérez le contexte 2D du canvas et adaptez sa taille à celle de son élément DOM.

## Classe Shooter (Canon)
- Créez une classe `Shooter` dans un dossier `/class` pour représenter le canon du joueur. 
  - **Propriétés** : `x`, `y` (position), `r` (rayon), `turnSpeed` (vitesse de rotation), `fireRate` (cadence de tir), `angle` (angle initial), `color` (couleur par défaut).
- **Méthode de Dessin** : Créez une méthode `draw` pour afficher le canon en demi-cercle, en recevant le contexte graphique en paramètre.
  - Placez le centre du cercle au milieu en bas du canvas, avec un rayon de 30px. 

## Ajout du Canon
- Ajoutez une ligne pour représenter le canon : 
  - Utilisez `ctx.beginPath()`, `ctx.strokeStyle = color`, `ctx.lineWidth = 5`, puis déplacez le début de la ligne au centre du cercle (`x1, y1`) et l’extrémité calculée (`x2, y2`) à l’aide de l’angle du canon.
  - Utilisez les formules : `x2 = x1 + 2 * r * cos(angle)`, `y2 = y1 + 2 * r * sin(angle)`. 

## Contrôle de Rotation
- Permettez au joueur de tourner le canon en utilisant les touches A (gauche) et D (droite).
  - Calculez la rotation du canon avec `Δt` et `turnSpeed` et assurez que l’angle reste entre π et 2π pour éviter que le canon ne sorte de l’écran.

## Classe Bullet (Projectiles)
- Créez une classe `Bullet` héritant de `Circle`. Son constructeur prend en paramètres : `x`, `y`, `angle`, `r` (rayon, par défaut 3), `speed` (par défaut 0.5), et `color` (par défaut null).
- **Mouvement** : Redéfinissez la méthode `move` pour calculer la nouvelle position du projectile avec `cos(angle)` et `sin(angle)`.

## Tir et Dessin des Projectiles
- Ajoutez une méthode `fire` dans `Shooter` pour générer un projectile à la position de la bouche du canon (`x2, y2`), avec l’angle du canon.
- Conservez les projectiles dans une structure de données (ex. Map ou tableau) et dessinez-les dans la méthode `draw`.
- Ajoutez `updateBullets` pour animer les projectiles, puis appelez cette méthode dans la boucle d’animation.

## Contrôle de la Cadence de Tir
- Limitez la cadence de tir avec `fireRate` en utilisant le temps total de l’animation et en comparant la différence de temps depuis le dernier tir.

## Génération des Cibles
- Toutes les secondes, créez une nouvelle cible avec un rayon de 20px, positionnée en haut de l’écran à une position `x` aléatoire.
  - Stockez les cibles dans une Map ou un tableau, déplacez-les vers le bas, et dessinez-les.
  - Arrêtez la boucle d’animation si une cible atteint le bas de l’écran.

## Gestion des Collisions entre Projectiles et Cibles
- Supprimez les cibles touchées par les projectiles en ajoutant `checkCollisions` dans `Shooter`.
  - Cette méthode parcourt chaque projectile et chaque cible pour détecter les collisions avec `isCollidingWith` de la classe `Circle`. En cas de collision, retirez la cible et le projectile de leurs structures respectives.

## Gestion des Cibles Bonus
- Chaque 15 secondes, générez une cible bonus, plus grande (rayon de 40px).
- Modifiez `checkCollision` pour qu’une collision avec cette cible déclenche un tir bonus, créant une série de projectiles sur un arc de cercle entre π et 2π avec un angle variant de 0,05 radian.
