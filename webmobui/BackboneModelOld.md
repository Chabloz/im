# *Frontend MVC* - Introduction aux  *Events*  et  *Models*  de backbone.js

## Mise en place

Dans ce TP, le framework  [Backbone.js](http://backbonejs.org/)  sera utilisé pour une gestion efficace des événements (_events_) ainsi qu’une manipulation aisée des modèles (_models_). L’objectif du TP est d’effectuer une première “prise en main” du design pattern MVC.

Commencez par installe backbone avec npm:
```bash
 npm install backbone --save
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
Finalement. créez un dossier nommé *models* dans votre dossier *app* de votre *PWA*, ainsi qu'un fichier *test1.js*. Les *models* des points suivants seront à créer dans le dossier *models*, tandis que *test1.js* contiendra votre code de test.

## Models Backbone.js

Les modèles du framework Backbone s’occupent de la gestion des données manipulées par l’application.  [La documentation des  _models_](http://backbonejs.org/#Model)  du framework nous indique que pour créer un constructeur pour nos modèles il faut utiliser la méthode  [extend](http://backbonejs.org/#Model-extend).

Créez un  _Model_  nommé  _Cours_, puis créez deux instances (nommée *item1* et *item2* par exemple) de ce  _Model_. Ces deux instances doivent avoir un attribut  _title_  valant respectivement ‘Item 1’ et ‘Item 2’. Puis faites un  _console.log_  de la propriété  _title_  des deux instances.

**1.b)**  Identique au point a) mais votre  _Model_  doit spécifier une valeur par  [défaut](http://backbonejs.org/#Model-defaults)  pour un nouvel attribut nommé  _createdAt_. La valeur par défaut devra être le timestamp unix en microseconde (indication: utilisé l’objet  [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)  en JS pour obtenir le timestamp actuel ou  [$.now()](http://api.jquery.com/jquery.now/)  en jquery). Créez vos deux instances à environ une microseconde d’intervalle en ne spécifiant que leur titre, puis faites un console.log de vos instances encodées en JSON pour vérification ([JSON.stringify](https://developer.mozilla.org/fr/docs/JavaScript/Reference/Objets_globaux/JSON/stringify)).

Pour attendre un changement d'une microseconde à l'autre, vous pouvez utilisez le code de test suivant:

```js
let now = $.now();
while (now == $.now());
```

Ce code n'a bien sûr de sens que pour aider à la compréhension du mécanisme des valeurs par défaut de Backbone et ne doit pas être utilisé dans des codes d'applications Web classiques.

**1.c)**  Backbone.js offre la possibilité d’utiliser  [une méthode pour la validation](http://backbonejs.org/#Model-validate)  des données des  _Models_, ainsi que des méthodes pour leur  [initialisation et construction](http://backbonejs.org/#Model-constructor). En reprenant votre code du point précédent, ajoutez une méthode  _validate_  qui contrôle qu’un attribut  _onLoan_  est bien définit et est un booléen. Vérifiez aussi que le titre est définit et est bien une  _string_.

Ajoutez aussi une méthode  _initialize_  faisant un simple  _console.log_  de ces deux paramètres (qui sont les attributs et les options spécifiés lors de la construction de l’instance).

Testez votre “validateur” avec deux instances, l’une sans spécifier de titre mais avec  _onLoan_  valide, puis l’autre avec un titre mais  _onLoan_  valant 1. Vous devez passez l’option  _{validate: true}_  lors de la construction des instances pour que Backbone valide vos paramètres (en appelant votre méthode validate). Faites ensuite un console.log de vos deux instances en JSON ainsi que de leur attribut  _validationError_. Observez aussi le console.log de votre méthode  _initialize_.

Indication: pour vérifier si un attribut existe (ou tester son type), vous pouvez utiliser  [les méthodes  _is_  du framework underscore](http://underscorejs.org/#isEqual)

**1.d)**  Une fois une instance d’un  _Model_  créée, il est conseillé de passer par les méthodes  _set_  et  _get_  pour modifier les attributs des instances (principe de l'encapsulation). Ainsi, Backbone.js peut gérer efficacement ces changements. Créer une troisième instance avec un titre ‘item 3’ et onLoan à  _true_, puis changer son attribut  _title_  pour ‘item 3 - changed’. Faites un console.log du JSON de cette nouvelle instance ainsi que du résultat de la méthode  [previousAttributes](http://backbonejs.org/#Model-previousAttributes).

Remarque: si vous voulez qu’un  _set_  d’un attribut passe par votre “validateur”, vous devez spécifier l’option  _{validate: true}_, comme lors de la construction de l’instance.

## 2)  _Events Backbone.js_

Nous avons déjà vu dans le cours de base l’utilité d’une bonne gestion des  _events_. Le framework  _Backbone.js_  va nous aider à gérer les événements de manière simple, en produire automatiquement quelques-uns, et nous fournir des outils pour transmettre et recevoir des informations additionnelles.

[La documentation des  _events_](http://backbonejs.org/#Events)  du framework nous indique que pour pouvoir bénéficier du système de gestion des  _events_  il faut “étendre” ([extend](http://underscorejs.org/#extend)) ou “cloner” ([clone](http://underscorejs.org/#clone)) l’objet  _Backbone.Events_. Les  _Models_  de Backbone.js bénéficie déjà de ce traitement.

**2.a)**  Créez une nouveau  _Model_  nommé  _Person_  avec une méthode nommée ‘log’ dont le code est un simple console.log du  _model_  (c.à.d. du  _this_) en JSON. Faite que les instances de ce  _Model_  écoutent les événements  _my:log_ grâce à la  [méthode  _on_  de Backbone.js](http://backbonejs.org/#Events-on)  (remarque: bien que proche elle n’est pas identique à la méthode  _on_  de jQuery) et exécute la méthode ‘log’ si l’événement se produit. Réfléchissez bien à où mettre ce code. Enfin, créez deux instances de  _Person_  avec un attribut  _name_  pour chacune, et lancez ([trigger](http://backbonejs.org/#Events-trigger)) l’_event_  ‘my:log’ sur les deux objets et observez le résultat dans la console.

**2.b)**  Backbone.js génère  [quelques events](http://backbonejs.org/#Events-catalog)  de manière automatique. Reprenez le code du point 2.a et rajoutez la gestion de l’événement ‘change’ dans votre  _Model_. Faites que cet événement appel une méthode  _logChange_  dont le code sera un console.log affichant les valeurs des attributs de l’objet avant et après le changement. Pour tester votre code, il vous suffit de changer le nom d’une des deux instances créées au point précédant grâce à la méthode  _set_.

**2.c)**  Comme vous l’avez constaté, les événements ne sont pas “globaux”, le  _trigger_  doit se produire sur l’objet en question. Il peut être intéressant d’implémenter un mécanisme plus malléable en s’inspirant par exemple du  [design pattern Pub Sub](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern). Essayez d’implémenter ce  _design pattern_  avec Backbone.js pour les  _models_  du point précédent. La méthode  [listenTo](http://backbonejs.org/#Events-listenTo)  vous sera peut être utile.

**Remarque finale:** Bien que ces exercices mettent en oeuvre la gestion des événements dans les  _Models_, c’est uniquement pour ne pas complexifier ce TP. Nous verrons que les  _events_  seront plutôt à gérer dans les  _Views_  de *Backbone.js*
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyODcyNzYyNzldfQ==
-->