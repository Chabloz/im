# Progressive Web App 

## Mise en place

L'objectif principal de ce TP est la réalisation d'une "Progressive Web App" ([PWA](https://fr.wikipedia.org/wiki/Progressive_web_app)) à partir de zéro (*from scratch*).

Nous allons utiliser les mêmes outils de développement que ceux du cours [
ProgWeb](https://chabloz.eu/progweb). Si vous devez refaire les installations, référez-vous au document sur la [programmation modulaire en JS](../progweb/module_base.md).

## HTML5

Créez le code HTML5 d’une futur  PWA  en utilisant des balises sémantiquement proches des besoins suivants:

-   L’application possède un haut de page contenant son titre.
-   Un menu offre à l’utilisateur le choix parmi 3 fonctionnalités , une gestion de liste des choses à faire (*todo list*), une gestion de favoris Web (*bookmarks*) et un agrégateur de flux Rss/Atom.
-   La fonctionnalité *Todo List* sera composée pour le moment d’un unique formulaire comprenant deux champs de saisie, un champ pour la  *chose à faire*  et un champ (facultatif) pour la date limite pour faire la chose.
-   Les deux autres fonctionnalités seront pour le moment uniquement composés d’un formulaire avec un champ de saisie pour l’url du favoris Web ou du flux Rss/Atom.
-   L’application possédera un bas de page reprenant le nom de la  PWA  et un numéro de version.
-   De plus la partie *Todo List* devra déjà contenir la tâche à faire suivante: “Finir les parties HTML5 et Responsive du TP du cours WebMobUi. A faire pour le mardi 26.02.2019”

## *Responsive*

### *layout*

Afin de rendre l'application disponible sur le maximum de périphérique, réalisez la *css* adéquate pour un *responsive design*.  Pour simplifier, essayez un design *vertical* comme proposé ci-après :

```ascii
 +----------------------------------+
 |      Header                      |
 +----------------------------------+
 |      Navigation                  |
 +----------------------------------+
 |                                  |
 |      Contenu principal           |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 |                                  |
 +----------------------------------+
 |      Footer                      |
 +----------------------------------+
 ```
 
 Pour le faire, vous pouvez utiliser [CSS Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout/Les_concepts_de_base)  et/ou [CSS Flexible Box Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Flexible_Box_Layout/Concepts_de_base_flexbox).

### Media-queries

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA5NTk4MTIxMiwtMjgwNTcxNzMwLDEwOT
U1MjU5NjQsLTE3MzQyNTY4MzEsNjAxNzY4MTQyLDMwNTg5MDUz
XX0=
-->