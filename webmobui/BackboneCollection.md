# *Frontend MVC*  _Collections_  (backbone.js)

## Introduction
Dans la plupart des applications, un traitement est souvent effectué sur un regroupement de données de même type. Il devient alors logique d’utiliser une structure de données complexe afin d’encapsuler la totalité des données du même type. Appliqué au  _design pattern_ MVC, les modèles représentant des entités de même type sont donc logiquement regroupés dans une collection de modèles.

## 1)  _Collections Backbone.js_

[La documentation des  _collections_](http://backbonejs.org/#Collection)  indique que la création d’une collection est très proche de celle d’un modèle. En effet, il suffit de faire un  _extend_  de  _Backbone.Collection_. Il est possible de définir une méthode  _initialize_  ainsi que deux attributs spécifiques optionnels:  _model_  et  _comparator_. Le premier permet de spécifier la  _class_  des  _models_  que la collection contiendra ( ou autrement dit, le type des models de la collection). Le deuxième permet de spécifier une méthode de comparaison des éléments de la collection afin que celle-ci soit ordonnée.

**1.a)**  En reprenant vos codes des TP précédents, créez une  classe héritant de _Collection_  nommée  _ModelItems_  dont l’attribut  _model_  doit être fixé à  _ModelItem_. Spécifiez aussi un attribut  [comparator](http://backbonejs.org/#Collection-comparator)  permettant d’ordonner la collection des  _items_  par ordre chronologique inverse des dates de création.

Créez ensuite une instance de votre classe *ModelItems* nommée  _myItems_  et ajoutez y, grâce à la méthode  [add](http://backbonejs.org/#Collection-add), un  _item_  en spécifiant l’attribut  _createdAt_  valant 0 et des attributs  _title_  et  _onLoan_  quelconques. Puis ajoutez-y deux autres  _items_  en ne spécifiant cette fois que les attributs  _title_  et  _onLoan_. Enfin, faites un  _console.log_  du JSON de  _myItems_  et vérifiez l’ordre des éléments dans la collection.

**1.b)**  Les collections de *Backbone.js* joue un rôle proche du  _design pattern PubSub_  vu au TP sur les *Models* et *Events*. En effet, elles écoutent tous les événements  _change_  sur les modèles internes afin de faire un  _trigger_  du même événement. Ainsi les modèles publient (_publish_) leur événement  _change_  via la collection et il est possible de s’inscrire (_subscribe_) grâce à la méthode  _listenTo_  afin d’écouter tout changement d'attribut sur les modèles de la collections. De plus, des événements  _add_  et  _remove_  sont lancés par la collection lorsque des modèles sont ajoutés (_add_) ou retirés (_remove_) de la collection.

Ajoutez dans votre code un objet qui fera un  _log_  de tous les ajouts et changements dans les modèles de la collection  _myItems_. Rajoutez dans votre code un changement du titre d’un  _item_de la collection. Pour ce faire, vous pouvez utilisez la méthode  [at](http://backbonejs.org/#Collection-at)  ou  [get](http://backbonejs.org/#Collection-get)  afin de récupérer un modèle existant dans votre collection. Puis vérifiez les  _logs_  de votre console.

**1.c)**  Réalisez la vue nécessaire à l'affichage de la collection d'_items_. Indications : liez votre vue à une collection plutôt qu'à un model. Au lieu d'écouter uniquement les événements  _change_, écoutez en plus les événements  _add_  et  _remove_  afin de provoquer le rendu de la vue. La méthode de rendu (_render_) s'occupera alors de générer le DOM nécessaire.

**1.d)**  Il est parfois utile d’avoir des attributs pour une collection. Par exemple, une collection  _ModelItemsList_  pourrait contenir un attributs 'type' pour représenter le type d'_item_  qu'elle contient (par exemple: une collection de livres, de films, ...). Malheureusement les collections de  _Backbone.js_  n’offre pas cette fonctionnalité.

Une solution serait d’encapsuler la collection dans un attribut (nommée par exemple  _items_) d’un  _Model_  (nommé  _ModelItemsList_  par exemple). Cette solution à l’avantage de faire bénéficier le  _Model_  de toutes les fonctionnalités du framework. Par contre, les événements de changement, d’ajout, et autres qui affecte la collection en interne ne seront pas propagés par  _Backbone.js_sur le modèle qui la contient. De même, le framework n'est pas capable de faire une sérialisation JSON de modèles (ou de collections) imbriqués l'un dans l'autre. En résumé, l'encapsulation d'une collection à l'intérieur d'un model n'est pas si intuitif que ça.

La gestion d’une collection interne à un modèle demande un travail additionnel au programmeur. Pour pallier à ce problème,  [la documentation](http://backbonejs.org/#FAQ-nested)  nous indique qu’une pléthore de  _plugins_  existent. Avant d'utiliser ceux-ci, essayez de mettre un place un modèle  _ModelItemsList_  ayant comme collection interne une collection d'_items_  (modèle  _ModelItems_). Pour vos tests, créez une instance de ce modèle afin de représenter une collection de livre. Enfin, réaliser la vue adéquate et effectuez un affichage de la collection sur votre page.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU4MzkzOTY3M119
-->