
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
_Backbone.js_ utilisera alors automatiquement cette méthode pour créer les entités de la collection avec le bon _Model_.  Utilisons tous cela  pour notre collection de cours en créant un nouveau fichier nommé _collection.js_ dans le dossier _course/entities_.

#### _Collections_: tri

Il est rare que les collections ne soient pas triée par un critère quelconque. _Backbone.js_ offre alors un manière simplifiée pour maintenir une collection triée grâce à [comparator](http://backbonejs.org/#Collection-comparator). Nous pouvons

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc3MDg4NDEzOSwxOTcxMTgyNTA0LDI5MD
QxMjk0MCwxNDEwNjMxNjA2LC0xNzUyMTMzODk4LC0xODY4Nzkw
MDQ2LC0yOTE5MTMsNjg5NDg5MTcsMjM0NDAzOTg3LDY2MDAzMz
I3MSwxOTEyNTEwNTQyLC0xMjIzNjYwNzQzLC0xNDUzODExNTks
Nzg3NTcxOTQxLC0xMjg3Mjc2Mjc5LC01MjE1ODYwNSwyMDkzMz
IzMjI1XX0=
-->