# WebApp multi-utilisateur 

## Mise en place

**Objectifs**: créer une application Web simple (Single Page App) avec gestion multi-utilisateurs sous la forme d'un système de *chat* simple.

Le backend est accessible via un Web Service (WS) en JSONP disponible en HTTPS. Ce WS comporte cinq *services*, un fournissant tous les messages du chat pour un utilisateur, un autre permettant l’ajout d’un message au chat, un permettant de se « connecter », un dernier permettant de se déconnecter et, finalement, un listant les utilisateurs connectés. Ces services sont respectivement disponibles via les url suivantes : 

https://chabloz.eu/ws/chat/msg/get

https://chabloz.eu/ws/chat/msg/add?msg=XXX 

https://chabloz.eu/ws/chat/user/login?user=XXX

https://chabloz.eu/ws/chat/user/logout

https://chabloz.eu/ws/chat/user/online


Pour éviter le problème *stateless* de HTTP, l'application utilisera le concept de session. Par défaut, la méthode *$.ajax* de jQuery  ne passe pas les cookies lors d'une requête [*CORS*](https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing). Pour le forcer à le faire, il vous faut rajouter le code suivant (à mettre tout au début de votre code):
```js
$.ajaxSetup({          
  xhrFields: {
    withCredentials: true
  }
});
```

## Etape du *Login*

Normalement, les utilisateurs du chat devraient se connecter avec un compte utilisateur avant de pouvoir accéder au chat. Pour des raisons de simplification de la gestion des comptes utilisateurs, l’application ne procédera pas à un véritable login, mais demandera un simple « nickname » à l’utilisateur. Réalisez une page HTML dont la balise comprendra les deux div suivants: 
```html
<div id="login"></div>
<div id="chat"></div>
```
Puis réalisez le HTML et la CSS associée nécessaire à l’affichage d’un champ de saisie pour le « nickname » de l’utilisateur (20 caractères maximum) et d’un bouton de « login » (dans le *div #login*).

A l’aide de la CSS, faites que le *div #chat* ne soit pas affiché sur la page. Puis réalisez le JavaScript nécessaire à la gestion du click sur le bouton de « login ». 

Lors du click, vous devez vérifier que le champ ne contient que des caractères alphabétiques (entre a et z uniquement) et faire un appel au WS adéquat pour y connecter l’utilisateur. En cas d’erreur, vous devez afficher un message adéquat sur la page de login pour en informer l’utilisateur. Pour tester qu’une chaine ne contient pas que des caractères entre 'A' et 'z', vous pouvez utiliser le code suivant:

```js
if (!username.match(/^[a-z]+$/i)) { 
   // username ne contient pas que des lettres [a-Z]
}
```
 Si la phase de « login » c’est bien déroulée, cachez le *div #login*et affichez le *div #chat*.

##  page de *chat*

La page de chat doit contenir :
- Un emplacement pour l’affichage des messages (avec une hauteur maximum fixée). Donnez à cet élément un id *#messages*.
- Un emplacement pour l’affichage de la liste des utilisateurs connectés (idem)
- Un formulaire pour la saisie des messages du chat
- Un bouton de déconnexion.

Réalisez le HTML et la CSS nécessaire.

## Gestion de l'ajout de message

Lorsque l'utilisateur soumet le formulaire (*submit*), il vous faut récupérer son message et l’envoyer au *backend*. Puis, pour une meilleure ergonomie, il faut vider le champ de saisie et y mettre remettre le *focus*.
Pour tester que votre message a bien été transmis au serveur, vous pouvez simplement accéder à l'url https://chabloz.eu/ws/chat/msg/get

## Affichage des messages du *chat*

Toutes les secondes (pour vos tests, toutes les 5 secondes afin de ne pas surcharger le serveur), exécutez un appel au bon WS pour recevoir les nouveaux messages du *chat* et ajoutez les au chat. Pour exécuter une fonction toutes les 5 secondes vous pouvez utiliser le code suivant:
```js
let timerGetMsg = setInterval(getNewMsg, 5000); 
``` 
Puisque l'élément DOM contenant les messages a une hauteur maximum, il est possible que celui-ci soit déjà plein et qu’un ascenseur apparaisse. Afin d’éviter que l’utilisateur « scroll » vers le bas pour voir les nouveaux messages, voilà un code pour effectuer ce scroll automatique : 

```js
$("#messages").scrollTop($("#messages").prop('scrollHeight'));
``` 

## Affichage des utilisateurs connectés

Toutes les 5 secondes, vous devez rafraichir la liste des utilisateurs connectés. Utilisez la même technique qu'au point précédent.

## *logout*

Lors d’un clic sur le bouton de « logout », il vous faut envoyer un message de déconnexion au serveur puis: 

- Cachez la page du chat
- Stoppez les *timers* de la mise à jour des nouveaux messages et des utilisateurs connectés.
- Affichez la page de login

Pour stopper les *timers*, utilisez la fonction *clearInterval* en lui passant le *timer*. Exemple:

```js
clearInterval(timerGetMsg); 
```

## Débuggage

Reflechissez au système de session utilisé et essayez de trouver ce que cela pourrait engendrer comme bug. **Indication**: que se passera-t-il lorsque deux onglets sont connectés au serveur de chat ? Comment pourrait-on résoudre ce bug ?


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MTY1MjA2NSw3ODk5MTQ2NjJdfQ==
-->
