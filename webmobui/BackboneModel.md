
# *Frontend MVC* - Introduction aux  *Events*  et  *Models*  de backbone.js

## Mise en place

Dans ce TP, le framework  [Backbone.js](http://backbonejs.org/)  sera utilisé pour une gestion efficace des événements (_events_) ainsi qu’une manipulation aisée des modèles (_models_). L’objectif du TP est d’effectuer une première “prise en main” du design pattern MVC.

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
Finalement. créez un dossier nommé *models* dans votre dossier *app* de votre *PWA*. Les *models* des points suivants seront à créer dans le dossier *models*.

## Models Backbone.js

#### Création et valeurs par défaut

Les modèles du framework Backbone s’occupent de la gestion des données manipulées par l’application.  [La documentation des  _models_](http://backbonejs.org/#Model)  du framework nous indique que pour créer un constructeur pour nos modèles il faut utiliser la méthode  [extend](http://backbonejs.org/#Model-extend). Mais nous pouvons aussi utiliser une syntaxe plus récente en utilisant l'héritage. Voilà un exemple de fichier JavaScript permettant de créer un nouveau _Model_:

```js
import Backbone from 'Backbone';

export default class extends Backbone.Model {

}
```

Créez un  _Model_  nommé  _Course_ qui permettra de représenter les cours pour l'affichage des horaires des cours COMEM+. Réfléchissez aux propriétés de ce   _Model_, puis créez deux cours avec des données de test, puis faites un console.log de vos instances. Pour ne voir que vos attributs et non tous les attributs internes à Backbone, utilisé la méthode [toJSON](https://backbonejs.org/#Model-toJSON) de backbone sur vos instances :

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

_Backbone.js_ offre aussi la possibilité d’utiliser  [une méthode pour la validation](http://backbonejs.org/#Model-validate)  des données des  _Models_, ainsi que des méthodes pour leur  [initialisation et construction](http://backbonejs.org/#Model-constructor). En reprenant votre _Model_, ajoutez une méthode  _validate_  qui contrôle que les attributs sont correctes. Pour vérifier si un attribut existe (ou tester son type), vous pouvez utiliser  [les méthodes  _is](http://underscorejs.org/#isEqual)  du framework underscore

Testez votre “validateur” avec vos deux cours de test. Vous devez passez l’option  _{validate: true}_  lors de la construction des instances pour que Backbone valide vos paramètres en appelant votre méthode _validate_. Faites ensuite un console.log de vos deux instances en JSON ainsi que de leur attribut  _validationError_. Observez aussi le console.log de votre méthode  _initialize_.



#### Accesseurs et modificateurs

Une fois une instance d’un  _Model_  créée, il est conseillé de passer par les méthodes  [_set_  et  _get_](https://backbonejs.org/#Model-get)  pour modifier les attributs des instances (principe de l'encapsulation). Testez ceci en changeant un des attributs de vos deux cours. Faites un console.log du cours avant et après le changement, puis afficher aussi dans la console le résultat de la méthode  [previousAttributes](http://backbonejs.org/#Model-previousAttributes).

**Remarque**: si vous voulez qu’un  _set_  d’un attribut passe par votre “validateur”, vous devez spécifier l’option  _{validate: true}_, comme lors de la construction de l’instance.

## Events Backbone.js

Nous avons déjà vu dans le cours de base l’utilité d’une bonne gestion des  _events_. Le framework  _Backbone.js_  va nous aider à gérer les événements de manière simple, en produire automatiquement quelques-uns, et nous fournir des outils pour transmettre et recevoir des informations additionnelles.

[La documentation des  _events_](http://backbonejs.org/#Events)  du framework nous indique que pour pouvoir bénéficier du système de gestion des  _events_  il faut “étendre” ([extend](http://underscorejs.org/#extend)) ou “cloner” ([clone](http://underscorejs.org/#clone)) l’objet  _Backbone.Events_. Les  _Models_  de Backbone.js bénéficie déjà de ce traitement.

Faite que les instances de votre  _Model_  écoutent automatiquement les changement de leur attribut grâce à la  [méthode  _on_  de Backbone.js](http://backbonejs.org/#Events-on)  (**remarque**: bien que proche elle n’est pas identique à la méthode  _on_  de jQuery). Lorsqu'un changement se produit, votre model doit effectuer un _console.log_ de ses attributs. Désormais, vous pouvez suivre tous les changements de vos instances directement dans votre console. 

**Remarque:** Bien que ces exercices mettent en oeuvre la gestion des événements dans les  _Models_, c’est uniquement pour ne pas complexifier ce TP. Nous verrons que les  _events_  seront plutôt à gérer dans les  _Views_  de *Backbone.js*
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE2ODAzMjQ0NiwtMTIyMzY2MDc0MywtMT
Q1MzgxMTU5LDc4NzU3MTk0MSwtMTI4NzI3NjI3OSwtNTIxNTg2
MDUsMjA5MzMyMzIyNV19
-->