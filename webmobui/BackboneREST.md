# Architecture REST  (avec backbone.js)

## Introduction 

La persistance des données d’une application Web est souvent faites "coté serveur". En effet, une centralisation des données sur le  *backend* permet, entre autres, la communication de ces données entre les différents clients ainsi que des systèmes de  *backup*  des données. Comme les *Models*  backbone sont la représentation des données "coté client", il faut les synchroniser avec le  *backend*  d’une manière ou d’une autre. Cette synchronisation peut se faire en suivant une architecture de communication [REST](http://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) . 

Si on applique l’architecture REST via HTTP afin de réaliser une gestion des données de type  [CRUD](http://en.wikipedia.org/wiki/CRUD)  (Create, read, update, delete) pour une collection, ce qui suit pourrait être une proposition d’[API](http://en.wikipedia.org/wiki/API):

```
VERB    URL                               RÔLE

GET     http://example.com/resources      Liste les ressources disponibles 
GET     http://example.com/resources/id   Fournit les données d'une ressource 
POST    http://example.com/resources      Crée une nouvelle ressource
PUT     http://example.com/resources/id   Modifie la ressource
DELETE  http://example.com/resources/id   Supprime la ressource

```

Où l’élément  _id_  des URL est à remplacer par l’identifiant d’une des ressources de la collection. En plus de cette architecture de communication, un format pour l’échange des données doit être choisit (le plus souvent, XML ou JSON).

Un exemple de WebService suivant cette proposition d’API (avec une transmission des données en JSON) se trouve ici:  [https://chabloz.eu/ws/api/v1/tasks/](https://chabloz.eu/ws/api/v1/tasks/). Il s'agit d'une api simple permettant l'accès à une collection de tâches dont les propriétés sont: **id** (l'identifiant technique), **task** (l’intitulé)  et **time** (un marqueur temporel au format [Unix timestamp](https://fr.wikipedia.org/wiki/Heure_Unix)). Afin de tester les fonctionnalités de l'api, vous pouvez utiliser l’application Web suivante: [Postwoman](https://postwoman.io/).

## Synchronisation via  _Backbone.js_

Backbone.js offre des méthodes pour réaliser la  [synchronisation](http://backbonejs.org/#Sync)  des  _Models_  avec le serveur. Et ceci aussi bien pour les modèles que pour les collections. La synchronisation offerte par défaut par le framework suit l’architecture REST avec une représentation en JSON des données. Si l’API du serveur respecte la même architecture, la seul chose à ajouter est l’url de base pour les accès REST grâce aux paramètres  [urlRoot](http://backbonejs.org/#Model-urlRoot)  pour les modèles, et  [url](http://backbonejs.org/#Collection-url)  pour les collections. (Si les modèles font partis d’une collection le paramètre urlRoot est optionnel).

## Outils collaboratif de gestion de tâches

En utilisant l'API d’exemple ([https://chabloz.eu/ws/api/v1/tasks/](https://chabloz.eu/ws/api/v1/tasks/)), réalisez un embryon d'application de gestions de tâches. Le système devra permettre le travail collaboratif (c.à.d. multi-utilisateurs) sur une liste de points à faire simplifiée. Chaque tâche possède un attribut obligatoire **task** indiquant la chose à faire et un attribut optionnel **time** indiquant la date butoir. L'API attribuera automatiquement un identifiant technique via un troisième attribut nommé **id**. Vous devez offrir aux utilisateurs les fonctionnalités de création, de modification et de suppression de tâches.

### Indications

Vous aurez sans doute besoins d'au moins trois _Views_,  une pour le formulaire d’ajout, une autre pour la liste des tâches, et une pour les tâches.

Pour l’ajout d’une tâche, votre *timestamp* doit être en seconde et non en microseconde. Voilà donc une aide pour la transformation d'un champ de type  *date*  en *timestamp* au format *Unix*.

```js
// Conversion d'un champ date en timestamp Unix (en seconde)
 let dateInput = this.$el.find("input[type='date']").val();
 let date = new Date(dateInput);
 let time = Math.round(date.getTime() / 1000);
```
Remarque: comme tout le monde travail avec la même collection coté serveur, l’ajout et la suppression de tâche impactera les listes de tâche de tous les étudiants. Vous pouvez utiliser le code ci-dessous pour maintenir votre collection à jour avec le serveur. Cela vous permettra de voir apparaître les ajouts et suppressions de tâches des autres étudiants de manière dynamique.

Synchronisation de la collection avec le serveur toutes les 10 secondes:

```js
setInterval(() => {    
    todoList.fetch(); // Changez todoList par le nom de votre collection
}, 10000);
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc5MTMxODc4NiwxNTI4NDk1MTA0LDExOT
YyNTk2MDcsLTcxMzE5Mjg3MF19
-->