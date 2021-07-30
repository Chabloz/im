# *Frontend Framework* - Une introduction à Vue.js


## Mise en place

Dans cette introduction, c'est la version 3 du framework  [Vue.js v3](https://v3.vuejs.org/) qui sera utilisé. L’objectif est d’effectuer une première “prise en main” du framework en explorant tout d'abord ses concepts sous jacents. Pour bien comprendre le fonctionnement du framework, nous n'allons pas utiliser d'outils de plus "haut niveau" (comme par exemple Vue CLI, vuex ou autre) pour sa mise en place. Nous allons donc faire l'installation et la configuration du framework "à la main". Comme dans les parties précédentes de ce cours, nous utiliserons toutefois **npm** pour l'installation et la gestion des dépendance , ainsi que **Webpack** pour le packaging et d'autres fonctionnalités. 

Commencez donc par créer un nouveau projet (sous la forme d'un dossier) et ouvrez le avec VS Code. Ensuite, commencez l'installation des outils. Vous devriez être désormais à l'aise avec les lignes de commandes suivantes:

```bash
 npm init -y
 npm install webpack webpack-cli --save-dev
 npm install css-loader mini-css-extract-plugin --save-dev
 npm install vue@next
 npm install vue-loader@next @vue/compiler-sfc --save-dev 
```
La dernière ligne installe le "loader" *Vue 3* pour Webpack avec la gestion des *Single File Components* (sfc) que nous verrons plus tard. Vous devriez savoir ce que les lignes précédentes font sans problème. Nous pouvons maintenant passer à la configuration de Webpack en créant un fichier webpack.config.js contenant les choses suivantes:

```js
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test:/\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {url: false}
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }
  return config;
};
```

Editez maintenant le fichier *package.json* pour y ajouter les 3 scripts suivants:
```json
"scripts": {
  "preview": "live-server dist/",
  "build": "webpack",
  "watch": "webpack --mode=development --watch"
},
```

Finalement, créez les dossiers *src* et *dist*, un fichier *index.js* dans *./src*, un fichier *index.html* dans *./dist* avec le code HTML adéquat. Par exemple:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>IM Vue 3</title>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="main.css">
    <script src="bundle.js"></script>
  </head>
  <body>
    <div id="app"></div>    
  </body>
</html>
```
Testez le tout avec en lancant *live-server* et *webpack* en mode *dev* avec *watch*:
```bash
 npm run watch
```
```bash
 npm run preview
```


## Prise en main du comportement réactif du framework

*Avant de faire l'exercices suivant,  il est conseillé de lire la documentation Vue.js suivante: https://v3.vuejs.org/guide/reactivity.html#what-is-reactivity*

Le but de l'exercice est de comprendre le mécanisme qui permet à Vue.js de mettre à jour automatiquement les vues lorsque les modèles changent en réalisant un petit convertisseur de température nous permettant de convertir des valeurs entre degrés Celsius (°C), degrés Fahrenheit (°F) et Kelvin (K).

### Version "console"

Nous allons choisir le Kelvin comme unité de base (puisque c'est l'unité SI),  et réactivement calculer les températures en °C et °F. Pour ce faire, utilisez la fonction [ref](https://v3.vuejs.org/guide/composition-api-introduction.html#reactive-variables-with-ref) pour stocker la valeur en Kelvin dans une variable réactive. Puis utilisez la fonction [computed](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values) pour que les °C et °F se calculent automatiquement à partir de la valeur en Kelvin. Pour vérifier que tout fonctionne bien, utilisez un [watchEffect](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect) afin qu'à chaque changement de la valeur en Kelvin, on affiche dans la console les trois valeurs. Si l'on modifie la valeur en °C par exemple, il faudrait que les deux autres se mettent à jour automatiquement. Modifiez votre code pour que cela soit le cas en utilisant des *get* et *set* dans vos fonctions *computed*.

### Version Web simple

Une fois cette première prise en main du comportement réactive du framework, réalisez votre premier composant Web "monofichier" [Single File Component](https://v3.vuejs.org/guide/single-file-component.html#introduction)  (abrégé en SFC par la suite). Pour cet exercice, nous allons tout coder dans un unique composant (sans utilisez de sous composant). Codez donc le nécessaire pour que votre application Web ressemble à cette [démo](https://chabloz.eu/files/temperatures/).

Remarque: il peut être complexe d'effectuer la gestion des arrondis. Vous pourriez peut être faire une première version sans cette gestion puis les rajouter par la suite. Faites de même pour la gestion des champs vides et les valeurs de bornes des températures possibles.  

### Autres convertisseurs

Essayez de mettre en place quelques autres convertisseurs. Quelques idées: Bytes / bits,  timestamp / date, ...). Le but est double: pratiquer et réfléchir à la réutilisation de vos composants.  Essayez donc de mettre en place un composant qui s'occuperait de la gestion et de la mise en forme (design) des saisies de l'utilisateur. Réfléchissez à sa souplesse de configuration, par exemple grâce à l'utilisation des propriétés du composant.

### Version finale

Ajouter un nouveau composant pour l'entièreté de votre application de convertisseurs. Ce composant ce chargera de la navigation (via un routage avec l'API history par exemple), et de l'affichage du bon composant  en fonction de celle-ci. Essayez d'aller vers l'essentiel et de ne pas trop le complexifier car il existe bien sûr un router pour Vue3 déjà existant comme on peut le lire ici : https://v3.vuejs.org/guide/routing.html#official-router . L'idée de cette partie est de pratiquer *Vue 3* plutôt que de mettre en place un vrai système de routage efficace.
