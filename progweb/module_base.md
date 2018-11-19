# Programmation Modulaire en JS

## Mise en place

Pour architecturer une application, il est possible d'utiliser de multiples paradigmes ainsi que divers outils de conception. Un de ces outils est la programmation modulaire. Depuis ECMAScript 2015, JavaScript possède quelques outils syntaxiques pour la conception et l'utilisation de modules. Malheureusement, ces outils ne sont pas supporté par les browsers actuels. Comme certaines autres fonctionnalités des dernières versions d'ECMAScript ne le sont pas non-plus, nous allons mettre en place des outils permettant de pallier à cette problèmatique.

**NPM**


Npm (node module manager), est un des gestionnaires de module le plus utilisé pour JS. Il va entre autre nous servir à installer des modules, les mettre à jour et gérer leurs dépendances. Nous l'avons déjà installé en début de cours. 

**Webpack**

Webpack va être notre *packager*. En simplifié, il va nous premettre de rassembler nos modules en un seul fichier JS qui sera notre *produit* finit  (une distribution de notre application). Webpack peut aussi nous permettre de *packager* les CSS, les templates HTML, ou d'autres ressources si besoin. Webpack étant lui-même un module, nous pouvons l'installer avec *npm*. Créez un nouveau dossier pour ce TP, initialisez le comme projet modulaire et installez le module Webpack. Voilà les commandes pour le faire (à executer dans votre nouveau dossier):

```js
npm init -y
npm install webpack webpack-cli --save-dev
```

**Babel**

Afin de pouvoir utiliser les dernières syntaxes JavaScript, même celles non supportées par les *browsers* cibles de notre application, nous pouvons utiliser un outils de *transpilage*, c'est à dire un outils capable de compiler du JS vers un JS accepté par les browsers actuels. Afin d'effectuer ce *transpilage* lors de notre *packaging* Webpack, nous allons utiliser *babel-loader*. Pour  installer ce module:

```js
npm install babel-loader @babel/core @babel/preset-env webpack --save-dev
```
**Des modules globaux ? Exemple avec jQuery.**
Certains modules seraient pratiques s'ils étaient accessibles à la totalité de nos autres modules. Nous allons le faire avec jQuery comme exemple. Attention toutefois, les *modules globaux* (appelés **plugins** dans l'outils Webpack) peuvent créer une dépendance forte entre votre code et le plugin. Essayez donc de créer le moins de dépendance possible pour que ne pas casser une des philosophies de base de la programmation modulaire qui est la portabilité des modules via leur indépendance. Pour installer jQuery en plugin, commencez par l'ajouter à vos modules via npm, puis nous configurerons Webpack pour l'utiliser comme plugin.

```js
npm install jquery --save
```

**Configuration WebPack - Babel**

Afin d'organiser notre code, créez deux dossiers nommés respectivement *src* (pour les sources de notre app.) et *dist* (pour la distribution de notre app). Puis configurez Webpack pour utiliser ces deux dossiers et intégrer Babel. Pour ce faire créez un fichier nommé *webpack.config.js* à la racine de votre projet. Il contiendra le code suivant:

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
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
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
```
Il est possible d'aller plus loin dans la configuration en rajoutant un fichier nommé *.browserslistrc* à la racine de votre projet. Vous pouvez y mettre les lignes suivantes:

```text
> 0.25%
not dead
```
Ce fichier de configuration indique à Babel les *browsers* cibles de notre application. Pour comprendre cette syntaxe, je vous laisse consulter [la documentation](https://github.com/browserslist/browserslist#readme).

**NPM scripts**
Finalement, il serait utile *d'industrialiser* un peu les commandes qui vont nous permettre de créer une nouvelle distribution, et de faire nos tests de développement. Pour ce faire nous allons modifier le fichier *package.json* (fichier de configuration de npm) pour y ajouter 3 scripts. L'un permettra de faire une distribution en mode "développement", l'autre en mode "production" et la denière nous permettra de lancer *live-server* pour faire nos tests de développement.  Voila le code qui viendra remplacer la partie **scripts** du fichier *package.json*:

```js
"scripts": {
    "preview": "live-server dist/",
    "build": "webpack",
    "watch": "webpack --mode=development --watch"
},
```
Pour executer ces scripts, il suffira d'uiliser la commande npm suivante:

```js 
npm run nom_du_script 
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MTQ3MDg5MjEsODgzNDI0ODIsMTQzMz
A4MDYyOF19
-->