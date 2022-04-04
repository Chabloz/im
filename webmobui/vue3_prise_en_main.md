# *Frontend Framework* - Une introduction à Vue.js


## Mise en place

L’objectif est d’effectuer une première “prise en main” du framework en explorant tout d'abord ses concepts sous jacents. Pour bien comprendre le fonctionnement du framework, nous n'allons pas utiliser d'outils de plus "haut niveau" (comme des gestionnaires de routage, de gestion d'états, ... ) . Nous utiliserons **npm** pour l'installation et la gestion des dépendances, ainsi que [**Vite JS**](https://vitejs.dev/) pour le packaging et d'autres fonctionnalités. 

Commencez donc par créer un nouveau projet *Vue* via *Vite*:
```bash
npm create vite@latest webmobui -- --template vue
cd webmobui
npm install
npm run dev
```
Remplacez la première commande par la suivante si votre version de npm est < 7 :
```bash
npm create vite@latest webmobui --template vue
```

La dernière ligne lance un serveur HTTP de dev (sur le port 3000 par défaut). C'est la seule qu'il faudra donc refaire de temps en temps.

## Prise en main du comportement réactif du framework

*Avant de faire l'exercices suivant,  il est conseillé de lire la documentation Vue.js suivante: https://vuejs.org/guide/extras/reactivity-in-depth.html*

Le but de l'exercice est de comprendre le mécanisme qui permet à Vue.js de mettre à jour automatiquement les vues lorsque les données changent en réalisant un petit convertisseur de température nous permettant de convertir des valeurs entre degrés Celsius (°C), degrés Fahrenheit (°F) et Kelvin (K).

### Version *console*

Nous allons choisir le Kelvin comme unité de base (puisque c'est l'unité du [SI](https://fr.wikipedia.org/wiki/Syst%C3%A8me_international_d%27unit%C3%A9s),  et *réactivement* calculer les températures en °C et °F. Utilisez la fonction [ref](https://vuejs.org/api/reactivity-core.html#ref) pour stocker la valeur en Kelvin dans une variable réactive. Puis utilisez la fonction [computed](https://vuejs.org/api/reactivity-core.html#computed) pour que les °C et °F se calculent automatiquement à partir de la valeur en Kelvin. Pour vérifier que tout fonctionne bien, utilisez un [watchEffect](https://vuejs.org/api/reactivity-core.html#watcheffect) afin qu'à chaque changement de la valeur en Kelvin, on affiche dans la console les trois valeurs. Si l'on modifie la valeur en °C par exemple, il faudrait que les deux autres se mettent à jour automatiquement. Modifiez votre code pour que cela soit le cas en utilisant des *get* et *set* dans vos fonctions *computed*.

### Version Web simple

Une fois cette première prise en main du comportement réactive du framework, nous allons utiliser la syntaxe [Single File Component](https://vuejs.org/api/sfc-spec.html)  (abrégé en SFC par la suite) pour faire notre Web App de conversion de température. Codez donc le nécessaire pour que votre application Web ressemble à cette [démo](https://chabloz.eu/files/temperatures/).

Remarque: il peut être complexe d'effectuer la gestion des arrondis. Vous pourriez peut être faire une première version sans cette gestion puis les rajouter par la suite. Faites de même pour la gestion des champs vides et les valeurs de bornes des températures possibles.  

### Autres convertisseurs

Essayez de mettre en place quelques autres convertisseurs. Quelques idées: Bytes / bits,  timestamp / date, ...). Le but est double: pratiquer et réfléchir à la réutilisation de vos composants.  Essayez donc de mettre en place un composant qui s'occuperait de la gestion et de la mise en forme (design) des saisies de l'utilisateur. Réfléchissez à sa souplesse de configuration, par exemple grâce à l'utilisation des propriétés du composant.

### Version finale

Ajouter un nouveau composant pour l'entièreté de votre application de convertisseurs. Ce composant ce chargera de la navigation (via un routage avec l'API History par exemple), et de l'affichage du bon composant  en fonction de celle-ci. Essayez d'aller vers l'essentiel et de ne pas trop le complexifier car il existe bien un outils de routage pour Vue (https://router.vuejs.org/) . L'idée de cette partie est de pratiquer *Vue* plutôt que de mettre en place un vrai système de routage efficace.
