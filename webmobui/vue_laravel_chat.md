# WebApp multi-utilisateur 

## Mise en place

**Objectifs**: créer une application Web simple avec gestion multi-utilisateurs sous la forme d'un système de *chat* simple.

Le backend est accessible via un Web Service en JSON disponible en HTTPS. Ce WS comporte cinq *services*, un fournissant tous les messages du chat pour un utilisateur, un autre permettant l’ajout d’un message au chat, un permettant de se « connecter », un dernier permettant de se déconnecter et, finalement, un listant les utilisateurs connectés. Ces services sont respectivement disponibles via les url suivantes : 

https://chabloz.eu/ws/chat/msg/get

https://chabloz.eu/ws/chat/msg/add?msg=XXX 

https://chabloz.eu/ws/chat/user/login?user=XXX

https://chabloz.eu/ws/chat/user/logout

https://chabloz.eu/ws/chat/user/online


Pour éviter le problème *stateless* de HTTP, l'application utilisera le concept de session. Par défaut, l' API *fetch* ne passe pas les cookies lors d'une requête [*CORS*](https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing). Pour le forcer à le faire, il vous faut rajouter le code suivant comme deuxième paramètre au *fetch*:
```js
fetch(url, {
  credentials: 'include'
});
```

## Etape du *Login*

Normalement, les utilisateurs du chat devraient se connecter avec un compte utilisateur avant de pouvoir accéder au chat. Pour des raisons de simplification de la gestion des comptes utilisateurs, l’application ne procédera pas à un véritable login, mais demandera un simple "username" à l’utilisateur.
Par défaut, l'utilisateur arrivera sur la partie *login*. Une fois authentifié, il verra alors la partie *chat*.

La partie *login* sera composée d'un formulaire d’un champ de saisie pour le « username » de l’utilisateur (20 caractères maximum) et d’un bouton de « login ».
Vous devez vérifier que le champ ne contient que des caractères alphabétiques (entre a et Z uniquement). En cas d’erreur, vous devez afficher un message adéquat sur la page de login pour en informer l’utilisateur. Pour tester qu’une chaine ne contient pas que des caractères entre 'A' et 'z', vous pouvez utiliser le code suivant:

```js
if (!username.value.match(/^[a-z]+$/i)) { 
   // username ne contient pas que des lettres [a-Z]
}
```
 
 Une fois le "username" validé, lors du *submit* du formulaire, réalisez un fetch pour l'authentification sur le backend puis afficher le chat en cas de succès.
 Il est possible que le backend refuse le nom d'utilisateur dans le cas où il serait déjà pris par une autre personne, essayez de mettre en place cette gestion d'erreur.

##  Partie *chat*

La page de chat doit contenir :
- Un emplacement pour l’affichage des messages
- Un emplacement pour l’affichage de la liste des utilisateurs connectés
- Un formulaire pour la saisie des messages du chat
- Un bouton de déconnexion.

## Gestion de l'ajout de message

Lorsque l'utilisateur soumet le formulaire (*submit*), il vous faut récupérer son message et l’envoyer au *backend*. Puis, pour une meilleure ergonomie, il faut vider le champ de saisie et y mettre remettre le *focus*.
Pour cette partie, vous n'avez pas besoin de faire de vérification du message envoyé. 

## Affichage des messages du *chat*

Toutes les secondes (**pour vos tests, toutes les 5 secondes afin de ne pas surcharger le serveur !**), exécutez un appel au backend pour recevoir les nouveaux messages du *chat* et ajoutez les au chat. Pour exécuter une fonction toutes les 5 secondes vous pouvez utiliser le code suivant:

```js
const timerFetchNewMsg = setInterval(fetchNewMsg, 5000); 
``` 

Afin d’éviter que l’utilisateur « scroll » vers le bas pour voir les nouveaux messages, voilà un code pour effectuer un scroll automatique : 

```js
chatMsg.value.scrollTop = chatMsg.value.scrollHeight;
```

Où chatMsg est un (template ref)[https://vuejs.org/guide/essentials/template-refs.html#template-refs]


## Affichage des utilisateurs connectés

Toutes les 5 secondes, vous devez rafraichir la liste des utilisateurs connectés. Utilisez la même technique qu'au point précédent.

## *logout*

Lors d’un clic sur le bouton de déconnexion, il vous faut envoyer un message de déconnexion au backend puis: 

- Stoppez les *timers* de la mise à jour des nouveaux messages et des utilisateurs connectés.
- Basculer sur la partie "login" du chat

Pour stopper les *timers*, utilisez la fonction *clearInterval* en lui passant le *timer*. Exemple:

```js
clearInterval(timerFetchNewMsg); 
```

Vous pouvez le faire durant la phase "unmounted" du cycle de vie du composant: https://vuejs.org/api/composition-api-lifecycle.html#onunmounted

## Débuggage

Reflechissez au système de session utilisé et essayez de trouver ce que cela pourrait engendrer comme bug. **Indication**: que se passera-t-il lorsque deux onglets sont connectés au serveur de chat ? Comment pourrait-on résoudre ce bug ?
