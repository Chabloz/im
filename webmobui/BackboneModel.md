
# *Frontend MVC* - Une introduction à l'aide de Backbone.js

## Mise en place

Dans cette introduction, le framework  [Backbone.js](http://backbonejs.org/)  sera utilisé pour une gestion efficace des événements (_events_) ainsi qu’une manipulation aisée des modèles (_models_). L’objectif est d’effectuer une première “prise en main” du design pattern MVC.

Commencez par installer backbone avec npm:
```bash
 npm install backbone
```
Comme le framework backbone à une dépendence avec la librairie [underscore.js](https://underscorejs.org/), il vous faut aussi modifier votre fichier de configuration *webpack.config.js* pour ajouter *underscore.js* comme plugin. Modifiez donc la partie *plugins* comme ceci :

```js
plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new webpack.ProvidePlugin({
    _: 'underscore'
  })
]
```
Finalement, créez un dossier nommé *entities* dans votre dossier *src* de votre *PWA*.

## Models Backbone.js

#### Création et valeurs par défaut

Les modèles du framework Backbone s’occupent de la gestion des données manipulées par l’application.  [La documentation des  _models_](http://backbonejs.org/#Model)  du framework nous indique que pour créer un constructeur pour nos modèles il faut utiliser la méthode  [extend](http://backbonejs.org/#Model-extend). Mais nous pouvons aussi utiliser une syntaxe plus récente en utilisant l'héritage. Voilà un exemple de fichier JavaScript permettant de créer un nouveau _Model_:

```js
import Backbone from 'Backbone';

export default class extends Backbone.Model {

}
```

Créez un  nouveau sous-dossier nommé  _course_ dans le dossier _entities_. Puis un nouveau fichier nommé _model.js_ qui permettra de représenter les cours pour l'affichage des horaires.  Réfléchissez aux propriétés de ce   _Model_, puis créez deux cours avec des données de test, puis faites un console.log de vos instances. Pour ne voir que vos attributs et non tous les attributs internes à Backbone, utilisez la méthode [toJSON](https://backbonejs.org/#Model-toJSON) de backbone sur vos instances :

```js
console.log(course1.toJSON());
```

Ajoutez à votre _Model_  une valeur par  [défaut](http://backbonejs.org/#Model-defaults)  pour un nouvel attribut nommé  _createdAt_. La valeur par défaut devra être le timestamp unix en microseconde (indication: utilisé l’objet  [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)  en JS pour obtenir le timestamp actuel ou  [$.now()](http://api.jquery.com/jquery.now/)  en jquery). Pour le faire avec une syntaxe récente, vous pouvez adapter l'exemple suivant:

```js
import Backbone from 'Backbone';

export default class extends Backbone.Model {

  defaults() {
    return {
	  // Vos attributs par défaut
    }
  }
  
}
```

Faites à nouveau un test en affichant vos deux cours dans votre console.

#### Initialisation et validation

_Backbone.js_ offre aussi la possibilité d’utiliser  [une méthode pour la validation](http://backbonejs.org/#Model-validate)  des données des  _Models_, ainsi que des méthodes pour leur  [initialisation et construction](http://backbonejs.org/#Model-constructor). En reprenant votre _Model_, ajoutez une méthode  _validate_  qui contrôle que les attributs sont correctes. Pour utiliser un syntaxe moderne,  ajoutez la méthode _validate_ comme ceci dans votre _Model_: 

```js
validate() {
  // Cette méthode doit retourner les erreurs avec un "return" 
}
```

Pour vérifier si un attribut existe (ou tester son type), vous pouvez utiliser  [les méthodes  _is](http://underscorejs.org/#isEqual)  du framework underscore. Pour tester votre _validateur_ avec vos deux cours, vous pouvez utiliser la méthode [isValid](https://backbonejs.org/#Model-isValid). 

#### Accesseurs et modificateurs

Une fois une instance d’un  _Model_  créée, il est conseillé de passer par les méthodes  [_set_  et  _get_](https://backbonejs.org/#Model-get)  pour modifier leurs attributs (principe de l'encapsulation). Testez ceci en changeant un des attributs de vos deux cours. Faites un console.log du cours avant et après le changement, puis afficher aussi dans la console le résultat de la méthode  [previousAttributes](http://backbonejs.org/#Model-previousAttributes). 

#### _Events_ et amélioration du framework

Nous avons déjà vu dans le cours de base l’utilité d’une bonne gestion des  _events_. Le framework  _Backbone.js_  va nous aider à gérer les événements de manière simple, en produire automatiquement quelques-uns, et nous fournir des outils pour transmettre et recevoir des informations additionnelles.

[La documentation des  _events_](http://backbonejs.org/#Events)  du framework nous indique que pour pouvoir bénéficier du système de gestion des  _events_  il faut “étendre” ([extend](http://underscorejs.org/#extend)) ou “cloner” ([clone](http://underscorejs.org/#clone)) l’objet  _Backbone.Events_. Les  _Models_  de Backbone.js bénéficie déjà de ce traitement.

Vous pouvez remarquer que la construction d'une instance et les appels  à _set_  ne passent pas automatiquement par votre “validateur”, vous devez spécifier l’option _{validate: true}_ pour le faire.  Avoir un système de validation automatique des données semble intéressant. Comme _Backbone_ ne l'offre pas, mais que toutes les pièces sont présentes pour le faire,  nous allons étendre le _framework_ afin d'offrir cette nouvelle fonctionnalité.  Pour le faire, nous allons ajoutez une méthode d'initialisation dans le  _Model_. Comme vous pouvez le lire dans la documentation, l’échec de la validation des données lance l'événement _invalid_. Nous pouvons donc écouter cet événement : 

```js
this.on('invalid', (model, error) => console.error(error));
```

Toutefois, la méthode d'initialisation est appelée après la construction de l'instance, et donc votre code intervient trop tard. Vous devez donc aussi détecter une erreur de validation qui aurait été provoquée par le constructeur.  _Backbone_ stocke les erreurs dans la propriétés [validationError](https://backbonejs.org/#Model-validationError), il vous suffit donc de la tester dans votre méthode d'initialisation. 

Enfin, nous devons aussi faire une réécriture de la méthode _set_. Le code est un peu _technique_ car la méthode _set_ de _Backbone_ accepte un nombre de paramètre variable. Je vous le fournis donc la solution finale ici :

```js
initialize(attrs, options) {
  this.on('invalid', (model, error) => console.error(error));
  if (this.validationError != '') console.error(this.validationError);
}

set(key, val, options) {
  if (typeof key === 'object') {
    super.set(key, _.extend({validate: true}, val));
  } else {
    super.set(key, val, _.extend({validate: true}, options));
  }
}
```

Maintenant, au lieu de faire toutes ces modifications directement dans notre _Model Course_, nous pourrions le faire dans une classe plus générique que nous spécialiserons via un héritage. Essayez de mettre en place cette structure.

## _Collections_ Backbone.js

#### Introduction

Dans la plupart des applications, un traitement est souvent effectué sur un regroupement de données de même type. Il devient alors logique d’utiliser une structure de données complexe afin d’encapsuler la totalité des données du même type. Appliqué au  _design pattern_ MVC, les modèles représentant des entités de même type sont donc logiquement regroupés dans une collection de modèles.

#### _Collections_: lien avec les models

[La documentation des  _collections_](http://backbonejs.org/#Collection)  indique que la création d’une collection est très proche de celle d’un modèle. En effet, il suffit de faire un  _extend_  de  _Backbone.Collection_. Voilà comment le faire avec une syntaxe moderne:

```js
import Backbone  from 'Backbone';
export default class extends Backbone.Collection {

}
```
Comme l'indique l'introduction de cette partie, les _Collections_ sont intimement liés aux _Models_ qui les composent. Ainsi, il nous faut indiquer à _Backbone.js_, quel _Model_ utilisé pour cette _Collection_. Nous pouvons le faire comme dans l'exemple suivant, en rajoutant simplement une méthode à notre _Collection_:
```js
model(attrs, options) {
  return new Course(attrs, options);
}
```
_Backbone.js_ utilisera alors automatiquement cette méthode pour créer les entités de la collection avec le bon _Model_.  Utilisons tout cela  pour notre collection de cours en créant un nouveau fichier nommé _collection.js_ dans le dossier _course/entities_. Mettez-y ensuite le code nécessaire pour une _Collection_ de cours. Enfin, faites un test en créant une collection avec quelques cours. Voilà un exemple de code pour vos tests:
```js
import Courses from 'entities/course/collection';
let collection = new Courses([
  {}, // <=== mettre les attributs  d'un cours de test entre les  {}
  {}  // <=== mettre les données d'un autre cours de test
]);
console.log(collection.toJSON());
```

#### _Collections_: tri

Il est rare que les collections ne soient pas triée par un critère quelconque. _Backbone.js_ offre alors un manière simplifiée pour maintenir une collection triée grâce à [comparator](http://backbonejs.org/#Collection-comparator). Pour l'utiliser, il suffit d'ajouter une méthode _comparator_ à notre collection comme ceci:
```js
comparator(course) {
  return course.get('xxxxx'); // où xxxxx est à remplacer par l'attribut contenant la date du début du cours
}
```
Pour des critères de tri plus complexe (par exemple si vous voulez que deux cours qui possèdent la même date de début soit trié par ordre alphabétique), vous pouvez utiliser une méthode avec deux paramètres (comme pour la méthode [sort](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort) de JS):

```js
comparator(course1, course2) {
  // doit retourner un nb négatif si course1 < course2
  // un nombre null (0) si course1 == course2
  // et un nombre positif si course1 > course2
}
```
Dans cette introduction, nous utiliseront la première variante (comparaison à l'aide d'un seul paramètre). Mettez en place cette méthode de comparaison dans votre collection et refaites un test en vérifiant votre console pour voir si vous cours sont correctement triés.

#### _Collections_: les _events_ et un exemple avec le tri de la collection

Par soucis de performance, _Backbone_ ne retrie pas la collection automatiquement lorsqu'un attribut d'un modèle change (car il ne peut pas savoir lequel provoque un changement d'ordre). Toutefois, _Backbone_ propage les événements de changement des attributs d'un modèle sur la collection elle-même. Ainsi, il est possible d'écouter très simplement le changement de l'attribut de la date de début d'un cours et forcer le tri de la collection lorsque le changement se produit en appelant directement la méthode [sort](https://backbonejs.org/#Collection-sort). A l'instar des modèles, les collections _Backbone_ peuvent avoir une méthode d'initialisation, nous pouvons donc y mettre le code nécessaire à cette écoute. Essayez d'y implémenter la chose, puis faites un test en modifiant la date de début d'un cours entre deux _console.log_ afin d'y observer si l'ordre est respecté. 


## _View_ Backbone.js

#### Introduction

Les vues de  _Backbone.js_  ne sont pas de vraies  _views_  au sens du  _design pattern MVC_. Une _View Backbone_  va s’occuper de la génération de la vue, de sa synchronisation avec le modèle associé et de la gestion des événements. Ces  _views_  remplissent donc plutôt un rôle de contrôleur UI.  
 
 Les “vraies”  _view_  (au sens MVC) seront les éléments DOM représentant les données d’un  _Model_  à l’utilisateur.  Ce sont donc les éléments DOM générés par notre moteur de template _handlebar_.

[La documentation des  _Views_](http://backbonejs.org/#View)  indique que les vues sont plus des conventions que du code. Effectivement, le système des vues de  _Backbone_  est souple et laisse ouvert la manière dont une  _View_  génère le HTML ainsi que la gestion de sa synchronisation avec le modèle associé. La gestion des  _events_ combinée aux  _Views_  et  _Models_  va permettre d’avoir une architecture logicielle bien structurée dans le respect des bonnes pratiques.

#### _View_ adaptée pour un _Model_

Avant de voir comment gérer les vues d'une collection, mettons en place une _View_ pour l'affichage d'un cours. Commencez donc par créer un nouveau fichier nommé _viewModel.js_ dans le dossier _course/entities_. 

```js
import Backbone  from 'Backbone';
export default class extends Backbone.View {

}
```

A l'instar des modèles et collections, les vues  _Backbone_ peuvent avoir une méthode d'initialisation. C'est dans cette méthode que nous allons faire le lien avec le modèle. En effet, si on applique le _design pattern MVC_, les changements des attributs d'un modèle doivent provoquer la mise à jour du DOM associé. Les _events_ de _Backbone_ vont donc venir nous aider pour réaliser cette prouesse:
```js
initialize() {
  this.listenTo(this.model, 'change', this.render);
}
```
Si vous analysez cette simple et puissante ligne de code, vous verrez qu'elle fait exactement ce que l'on désire. La seul partie difficile est le  **this.model**. Pour la comprendre, il faut savoir qu'à la construction d'une _view_, nous allons fournir une référence au modèle associé. _Backbone_ va alors automatiquement sauvegarder cette référence dans **this.model**. Pour bien comprendre, voilà un exemple de code avec la création d'un _Model_ et sa vue correspondante:

```js
import  Course  from  'entities/course/model';
import  CourseView  from  'entities/course/viewModel';
let  model = new  Course({}); // Les attributs sont à mettre dans les {}
let  view = new  CourseView({model});
```

Il nous faut maintenant nous intéresser à la méthode _render_ un peu plus complexe : 

```js
// importation de la template handlebars
import  tmpl  from  "entities/course/tmpl.handlebars";

// ... plus loin dans le code ...

  render() {
    let  dom = $(tmpl(this.model.toJSON()));
    this.$el.replaceWith(dom);
    this.setElement(dom);
    return  this;
  }
```
La première ligne de _render_ et la génération du DOM. En effet, elle utilise la _template handlerbars_ en y injectant les attributs du model. Ensuite, ce morceau de DOM doit être sauvegardé quelque-part. Pour le faire, _Backbone_ crée automatiquement un élément DOM représantant un **&lt;div&gt;** via l'attribut _this.el_ (ou  _this.$el_ pour sa version _jquerisée_). Comme ce comportement par défaut ne nous convient pas, nous allons le remplacer par le DOM généré par notre _template_. Ceci se fait en deux lignes car nous devons non seulement remplacé le  **&lt;div&gt;** par notre template, mais aussi modifier l'élément _el_ lui même (grâce à la méthode [setElement](https://backbonejs.org/#View-setElement)). Finalement, la dernière ligne permet simplement de retourner la vue elle-même pour faire de l'enchaînement. Ainsi, nous pouvons rajouter ceci à notre code de test afin de faire un premier rendu du DOM de notre cours de test:

```js
import  Course  from  'entities/course/model';
import  CourseView  from  'entities/course/viewModel';
let  model = new  Course({}); // Les attributs sont à mettre dans les {}
let  view = new  CourseView({model});
view.render().$el.appendTo("selecteur CSS ici"); 
```
Tous les futurs changements des attributs du  _model _ provoqueront alors une mise à jour automatique du DOM. 

#### _View_ adaptée pour une _Collection_

Maintenant que la vue pour un cours est en place, nous pouvons réaliser celle de la collection de cours. Commencez par créer un nouveau fichier nommé _viewCollection.js_ dans le dossier _course/entities_.  Vous trouverez ci-dessous un code de départ. Le code n'y est toutefois pas optimisé afin qu'il reste simple.

```js
import Backbone  from 'Backbone';

export default class extends Backbone.View {

  initialize() {
    if (!this.collection.comparator) {
      this.listenTo(this.collection, 'add remove', this.render);
    }
    this.listenTo(this.collection, 'reset sort', this.render);
  }
  
  render() {
    this.$el.empty();
    let  models = this.collection.models;
    for (let  model  of  models) {
      let  view = new  View({model});
      view.render().$el.appendTo(this.$el);
    }
    return  this;
  }
}
```






<!--stackedit_data:
eyJoaXN0b3J5IjpbNzY0MDI4NDA4LDQyOTcyODU2MywzNTk3MD
YzNjEsMTMxNjQzNjk4LDExNzI2NjYzODMsLTE0NjMxNTAyMDEs
ODMzNDI4Mzk2LDY1NTQ5NjMwMywxOTcxMTgyNTA0LDI5MDQxMj
k0MCwxNDEwNjMxNjA2LC0xNzUyMTMzODk4LC0xODY4NzkwMDQ2
LC0yOTE5MTMsNjg5NDg5MTcsMjM0NDAzOTg3LDY2MDAzMzI3MS
wxOTEyNTEwNTQyLC0xMjIzNjYwNzQzLC0xNDUzODExNTldfQ==

-->