# Backbone & Animation : synthèse

## Mise en place
 
 L'objectif de ce TP est de faire la synthèse des points principaux des cours de programmation Web (coté client) de deuxième année. En particulier : l'architecture de code (via les design patterns et la programmation modulaire), l'animation, et la programmation événementielle. 
 
 Pour la gestion de la boucle principale d'animation, nous allons utiliser une "librairie" afin de nous faciliter la tâche. Commencez donc par installer [
MainLoop.js](https://github.com/IceCreamYou/MainLoop.js): 
 ```bash
 npm install mainloop.js
```

Il vous suffira alors de l'importer et de l'utiliser comme dans cet exemple:

```js
import MainLoop from  "mainloop.js";
MainLoop
  .setUpdate(deltaT => ...)
  .setDraw(deltaT => ...)
  .start();
``` 
Où les **...** sont à remplacer par des fonctions adéquates.

## Animation
Pour rappel, l'animation se produit principalement par l’enchaînement de deux phases. La première est la mise à jour du monde (*update*) et la deuxième et le rendu du monde (*render*). Ces deux phases sont appelées régulièrement par la boucle d'animation. Nous allons déléguer ce travail à *MainLoop.js* (voir l'exemple dans la mise en place).

Commencez par créer un code HTML pour votre animation. Il s'agira d'une simple page HTML contenant une balise *canvas*.  Ensuite, nous allons essayez de donner le contrôle des mouvements de différentes entités à l'utilisateur via les touches du clavier (wasd).  

#### Model
Créez un nouveau Model (nommé **Mob** par exemple) qui permettra de représenter les entités contrôlées par l'utilisateur. Une entité sera un simple cercle. Vous devez réaliser les méthodes qui permettront son déplacement. l'entité pourra: tourner à droite, tourner à gauche, accélérer et freiner.  Vous pouvez utilisez les valeurs par défauts suivantes lors de vos traitements:

```js
{
  y: 100,
  x: 100,
  r: 16,
  angle: 0,
  acceleration: 0.0005,
  maxSpeed: 0.5,
  speed: 0,
  turnSpeed: 0.005,
  friction: 0.0001,
  color: "red"
}
```

De plus, l'entité devra être capable de se mettre à jour en fonction d'un Δt. Vous pouvez utilisez le code ci-dessous:

```js
update (deltaT) {
  // Calculate the destination from angle and actual position
  let distX =  this.get("speed") * deltaT * Math.cos(this.get("angle"));
  let distY =  this.get("speed") * deltaT * Math.sin(this.get("angle"));
  let x =  this.get("x") + distX;
  let y =  this.get("y") + distY;
  // apply some friction
  let deltaSpeed =  this.get("friction") * deltaT;
  let speed =  this.get("speed") - deltaSpeed;
  speed = Math.max(0, speed);
  this.set({x, y, speed});
}
```

Testez votre code en créant une instance de ce Model et en le faisant déplacer et en l'affichant dans la console.

#### View

Réalisez la View associée. Elle comportera donc deux méthodes: une méthode *render* et une méthode *update*.  La méthode *render* devra simplement dessiner un cercle à la position (x,y) du modèle associé. La méthode *update* devra, en fonction des touches du clavier appuyées, appeler les bonnes méthodes du modèle pour son déplacement et réaliser sa mise à jour (*update*). 

Testez votre code en créant une instance de cette *View* et en y associant le modèle précédemment créé. 

#### Collection et View associée 

Essayez à partir des éléments existants de créer les pièces manquantes pour que l'utilisateur puisse déplacer plusieurs entités en même temps. Regroupez toutes vos entités dans une collection puis réalisez la *view* associée qui appellera les deux méthodes *update* et *render* des *sous views*.  

#### Et au delà  ...
vous pouvez essayer d'enrichir votre application pour obtenir un mini jeu. Voila un [exemple](https://chabloz.eu/files/game/) de ce que l'on pourrait obtenir assez rapidement. 

  
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU1MDM0MjQ5MiwtMTcyMDM2ODcxOSwtMT
I5ODUzODMxNywtMTY5NzExNjgxOF19
-->