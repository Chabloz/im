
# Interpolation, teinte et interaction 
  

## Mise en place  

L' objectif de ce TP est de pratiquer une première fois les concepts d'interpolation, de manipulation des couleurs et de l'interaction à la souris sur un *canvas* via une détection de collision.

Afin de bien comprendre l'avantage d'un code modulaire, nous allons reprendre la classe *CircleBouncing* (et donc aussi sa classe parente *Circle*) que nous avons créée dans un TP précédent. Enfin, afin de simplifier la gestion des animations, vous pouvez utiliser la classe "Tweens" que nous avons vu en partie théorique. 

Vous trouverez une [démo ici](https://chabloz.eu/files/tweening/particules/) de l'effet final que l'on souhaite réaliser.

### Système de particules
  
Commencez par reprendre un code HTML d'un TP précédent avec un *canvas* pleine page et sa CSS associée. Ensuite récupérez le contexte graphique 2D puis créez un tableau de particules (par exemple de 1500 éléments). Créez le nombre de particules nécessaire en choisissant des valeurs aléatoires dans des intervalles qui vous semblent donner de bon résultats. Enfin dessinez votre système de particules dans une boucle d'animation (avec *MainLoop* par exemple).

### *Tracking* de la souris et détection de collision
 Il n'y a pas de méthode directe pour obtenir la position de la souris de l'utilisateur. Vous pouvez par contre récupérer sa position lors de son mouvement grâce à l'événement [mousemove](https://developer.mozilla.org/fr/docs/Web/API/Element/mousemove_event). Mémorisez la position de la souris dans un structure de données que vous utiliserez dans votre *update* de l'animation. Pour avoir la position relative de la souris dans le *canvas*,  il vous faudra utiliser [getBoundingClientRect](https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect) (bien quand ici ce n'est pas forcément nécessaire car le *canvas* est en plein page, mais il est bon de connaître la méthode).

Pour détecter les collision entre la souris et les cercles, vous devez utiliser la formule trigonométrique du cercle ( x^2  +  y^2 = r^2. En la modifiant légèrement,  vous serez capable de facilement détecter tous les cercles actuellement en collision avec la souris. Pour vous aidez voilà un exemple de code:
```js
Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2 <= Math.abs(r1 + r2) ** 2;
```
Finalement, pour tout les cercles en collisions avec la souris, récupérez l'angle entre la position  de la souris et le centre du cercle grâce à:

```js
Math.atan2(x1 - x2, y1 - y2); // angle entre la pos. (x2,y2) et (x1,y1) 
```
et modifiez les vélocités (x et y) des cercles en collision.

### Animation de la couleur des cercles

En utilisant HSL , créez une simple transition des couleurs entre 0 et 360  en changeant la teinte de tous les cercles  via une *tween* qui boucle à l'infini.

