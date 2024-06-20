# WebApp multi-utilisateur 

## Mise en place

**Objectifs**: créer une application Web simple avec gestion multi-utilisateurs sous la forme d'un système de *chat* simple. Pour des raisons pédagogiques, le chat ne sera pas fait via SSE ou WebSocket, mais via des pull du frontend vers le backend. Ceci est bien sûr déconseillé pour une application à forte charge, mais il me semble important de voir tout d'abord un fonctionnement plus classique d'une application Web en utilisant une communication HTTP (via un système "pull").

Un backend d'exemple est accessible via un Web Service en JSON disponible en HTTPS. Il comporte cinq *services*, un fournit tous les nouveaux messages du chat pour un utilisateur, un autre permet l’ajout d’un message au chat, un permet de se « connecter », un dernier permet de se déconnecter et, finalement, un liste les utilisateurs connectés. Ces services d'exemple sont respectivement disponibles via : 

https://chabloz.eu/api/chat/msg/get

https://chabloz.eu/api/chat/msg/add?msg=XXX (Pour votre app, changez ceci en POST)

https://chabloz.eu/api/chat/user/login?user=XXX  (Pour votre app, changez ceci en POST)

https://chabloz.eu/api/chat/user/logout

https://chabloz.eu/api/chat/user/online

Pour éviter le problème *stateless* de HTTP, l'application utilisera le concept de session.

Vous pouvez utiliser ces services de test pour votre front-end avant de développer les votres ou vous pouvez directement réaliser les mêmes services vous-même. Comme l'api de test n'est pas sur la même origine (domaine différent), il est nécessaire d'utiliser un proxy. Puisque nous utilisons Vite, vous pouvez le faire avec la configuration suivante dans le fichier vite.config.js :

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy : {
      '/api/chat/': {
        target: 'https://chabloz.eu/api/chat/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/chat/, '')
      }
    }
  }
});
```

Vous pourrez alors utiliser les url de l'API comme si elle était local. C'est à dire que dans votre code l'url https://chabloz.eu/api/chat/user/login?user=XXX deviendra /api/chat/user/login?user=XXX par exemple.

## Etape du *Login*

Les utilisateurs du chat devraient se connecter avec un compte utilisateur avant de pouvoir accéder au chat. Pour des raisons de simplification de la gestion des comptes utilisateurs, l’application ne procédera pas à un véritable login, mais demandera un simple "username" à l’utilisateur. (Bien sûr, un vrai système d'authentification peut être mis en place si vous le souhaiter.) Par défaut, l'utilisateur arrivera sur la partie *login*. Une fois "authentifié", il verra alors la partie *chat*.

La partie *login* sera composée d'un formulaire d’un champ de saisie pour le « username » de l’utilisateur (20 caractères maximum) et d’un bouton de « login ».
Vous devez vérifier que le username n'est composé que de caractères alphabétiques (entre a et Z uniquement). En cas d’erreur, vous devez afficher un message adéquat sur la page de login pour en informer l’utilisateur. Pour tester qu’une chaine ne contient pas que des caractères entre 'A' et 'z', vous pouvez utiliser le code JS suivant:

```js
if (!username.value.match(/^[a-z]+$/i)) { 
   // le username ne contient pas que des lettres [a-Z]
}
```

Ou directement avec une [validation en HTML](https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation):

```html
<input type="text" required pattern="[A-Za-z]+">
```

Les noms des utilisateurs doivent être unique. Dans le cas où il serait déjà pris par une autre personne, essayez de mettre en place cette gestion d'erreur et le feedback utilisateur associé. Cette partie de l'application peut être fait en "full backend classique" ou en VueJS. Si vous choissisez l'option "backend", les routes API de login et logout ne seront pas necessaire puisqu'elles seront des routes classiques de votre application backend.

##  Partie *chat*

La page de chat doit contenir :
- Un emplacement pour l’affichage des messages
- Un emplacement pour l’affichage de la liste des utilisateurs connectés
- Un formulaire pour la saisie des messages du chat
- Un bouton de déconnexion.

Cette partie sera faites en VueJS en consommant votre API backend.

## Gestion de l'ajout de message

Lorsque l'utilisateur soumet le formulaire (*submit*), il vous faut récupérer son message et l’envoyer au *backend*. Puis, pour une meilleure ergonomie, il faut vider le champ de saisie et y mettre remettre le *focus*.
Avant l'envoit, vérifiez que le message n'est pas vide (il doit contenir entre 1 et 200 caractères). 

## Affichage des messages du *chat*

Toutes les secondes (ou pour vos tests, toutes les 5 secondes), effectuez un appel au backend pour recevoir les nouveaux messages du *chat*. Pour exécuter une fonction toutes les 5 secondes vous pouvez utiliser le code suivant:

```js
const timerFetchNewMsg = setInterval(fetchNewMsg, 5000); 
``` 

Afin d’éviter que l’utilisateur « scroll » vers le bas pour voir les nouveaux messages, voilà un code pour effectuer un scroll automatique : 

```js
chatMsg.value.scrollTop = chatMsg.value.scrollHeight;
```

Où chatMsg est une [template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs)


## Affichage des utilisateurs connectés

Toutes les 5 secondes, vous devez rafraichir la liste des utilisateurs connectés. Utilisez la même technique qu'au point précédent.

## *logout*

Lors d’un clic sur le bouton de déconnexion, il vous faut envoyer un message de déconnexion au backend puis rediriger l'utilisateur sur la partie "login" du chat.

Si vous avez géré votre authentification en VueJS, n'oubliez pas de stopper les *timers*. Pour cela utilisez la fonction *clearInterval* en lui passant le *timer*. Exemple:

```js
clearInterval(timerFetchNewMsg); 
```

Vous pouvez le faire durant la phase "unmounted" du cycle de vie du composant: https://vuejs.org/api/composition-api-lifecycle.html#onunmounted

## Débuggage et sécurité

Reflechissez au système de session utilisé et essayez de trouver ce que cela pourrait engendrer comme bug. **Indication**: que se passera-t-il lorsque deux onglets sont connectés au serveur de chat ? Comment pourrait-on résoudre ce bug ? 

Reflechissez aussi à la sécurité de votre application. Est-ce que les bases sont ok ?
