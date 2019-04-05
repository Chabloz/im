# *Frontend MVC* - Introduction aux  *Views*   de backbone.js

## Mise en place
 Les vues de  _Backbone.js_  ne sont pas de vraies  _views_  au sens du  _design pattern MVC_. Une “_view_” de  _Backbone.js_  va s’occuper de la génération de la vue, de sa synchronisation avec le modèle associé et de la gestion des événements. Ces  _views_  remplissent donc plutôt un rôle de contrôleur  de vues (et font donc office de *controller* du MVC).  
 
 Les “vraies”  _view_  seront les éléments du DOM représentant les données d’un  _Model_  à l’utilisateur. Celles-ci seront générées grâce à un moteur de *templates*. Nous utiliserons [Handlebars](https://handlebarsjs.com/). Commencez donc par l'installer: 
 ```bash
 npm install handlebars --save
 npm install handlebars-loader --save-dev
```

Puis modifiez la configuration webpack pour que tous les fichiers  avec l'extension *.handlebars* soient *packagés* correctement par *webpack*. Ajouter la règle suivante dans la partie *rules* du fichier *webpack.config.js* :

```js
{
  test: /\.handlebars$/,
  use: 'handlebars-loader'
}
``` 
Finalement, créez deux nouveaux dossiers dans votre dossier *app*, un nommé *views* et un autre nommé *templates*.  Vous y mettrez les codes des points suivants.

## 1)  _Views Backbone.js_

[La documentation des  _views_](http://backbonejs.org/#View)  indique que les vues sont plus des conventions que du code. Effectivement, le système des vues de  _Backbone.js_  est souple et laisse ouvert la manière dont une  _view_  génère le HTML ainsi que la gestion de sa synchronisation avec le modèle associé. La gestion des  _events_  (voir TP1) combinée aux  _views_  et  _models_  va permettre d’avoir une architecture logicielle bien structurée et respectant les bonnes pratiques.

Le framework nous indique que pour créer un constructeur pour nos vues il faut utiliser la méthode  [extend](http://backbonejs.org/#View-extend)  de manière identique à la création de constructeur pour les modèles (voir TP1). Lors de la création d’une  _view_, la  [documentation](http://backbonejs.org/#View-constructor)  montre qu’il est possible de passer en paramètre le  _model_  qui est associé à la vue.

**1.a)**  Créez une  _View_  nommée  _ViewItem_. Faites que les vues écoutent les changements des attributs du modèle associé, et effectuent un rendu (méthode  [render](http://backbonejs.org/#View-render)) de la vue lorsque cela se produit. Votre méthode  _render_  ne devra faire qu’un  _console.log_  du  _model_ associé (pour le moment).

Créez ensuite une instance de  _ModelItem_  nommé  **item1**  et deux instances de  _ViewItem_  nommée **view1Item1** et **view2Item1** en leur fournissant le  _model_  **item1**(deux vues pour représenter le même modèle). Puis, effectuez un  _set_  sur **item1** pour lui ajouter un attribut  _title_  et observez combien de fois votre méthode  _render_  est exécutée (deux fois si tout est juste).

**1.b)**  Les  _views_  de backbone sont en tout temps rattachées à un élément DOM. Cet élément est accessible via l’attribut  [el](http://backbonejs.org/#View-el)  de la vue et son équivalent jQuery  [$el](http://backbonejs.org/#View-%24el). Il est possible de spécifier l’attribut  _el_  d’une vue comme étant un élément DOM existant lors de la création de la vue, mais cela ne sera pas le cas de cet exercice. Si on ne le spécifie pas à la création, l’attribut  _el_  est un simple _div_ sans attribut.

Reprenez votre code de l’exercice  **1.a)**  et modifiez la fonction  _render_  afin qu’elle insert l’attribut  _title_  du modèle associé comme texte du noeud DOM  _$el_. Ajoutez au  _body_  les éléments DOM  _view1Item1.$el_  et  _view2Item1.$el_  des vues. Modifiez l’attribut  _title_  de item1, et changez le  _title_  de item1 à nouveau deux secondes plus tard (grâce à la fonction *setTimeout* par exemple). Observez que les deux vues se mettent à jour automatiquement lors des changements de l’attribut  _title_.

## 2)  _Templating handlebars_

La mise à jour du DOM est grandement facilitée grâce aux vues, mais il reste le travail fastidieux de l’insertion des données du  _Model_  dans l’élément DOM concerné (le code de votre méthode  _render_). Pour faciliter ce travail, un système de template peut être utilisé.  _Backbone.js_  ne s’occupe pas du templating, il est donc possible de choisir n’importe quel moteur de template JavaScript.

Comme  _Underscore.js_  est un pré requis de  _Backbone.js_, il est déjà possible d’utiliser le  [moteur de template](http://underscorejs.org/#template)  inclut dans ce framework, mais rien ne nous empêche d’en utiliser un autre. Pour avoir un peu plus de souplesse, nous allons prendre un moteur de template d'un plus "haut niveau" nommé  [Handlebars](http://handlebarsjs.com/). 

**2)**  Reprenez le code de l’exercice  **1.b**  et ajoutez un  [attribut  _template_](http://backbonejs.org/#View-template)  à ViewItem représentant la template  _Handelbars_  suivante:

```html
<article>
  <h1>{{title}}</h1>
  <p>{{description}}</p>
</article>
```

Modifiez la fonction render afin d’utiliser cette template en y injectant les attributs du  _Model_associé à la vue. Enfin, testez le tout avec un code identique à l’exercice  **1.b**  en rajoutant simplement un attribut  _description_  lors de la création de votre  _ModelItem item1_.


## 3)  _Model - View - Template_

Réalisez le model, la vue, la template ainsi que la CSS nécessaires pour l'affichage d'un menu contenant les entrées suivantes:

-   Accueil
-   Info
-   Contacts

Faites que lorsqu'une nouvelle entrée au menu est ajouté au  _Model_, le menu de la page se mets automatiquement à jour. Imaginez par exemple une entrée "Administration" qui ne serait accessible que lorsque l'on est loggé sur la page en tant qu'administrateur.

Vous verrez sans doute qu'il nous manque une pièce pour faciliter le développement du menu. En effet, il serait plus simple d'utiliser une collection plutôt qu'un unique module pour représenter toutes les entrées du menu. Nous verrons ceci au TP suivant.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3ODM3NDU4NzZdfQ==
-->
