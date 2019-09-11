# Exercice JS - Tableaux

Les exercices suivants non aucun sens algorithmique. Ils sont proposés afin de vous familiariser avec la syntaxe JavaScript et le paradigme de [programmation fonctionnelle](https://fr.wikipedia.org/wiki/Programmation_fonctionnelle). 

## Tableaux de nombres
A partir du tableau de nombres suivant:
```js
const numbers = Object.freeze([3, 14, 15, 92 ,65, 35, 89, 79, 32, 38]);
```
réalisez les fonctionnalités ci-dessous. La structure de données initiale ne doit pas être modifiée ( structure [immutable](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/freeze) ). *Vos solutions se doivent de rester fonctionnelles même si le tableau initial était différent.*

 1. Afficher tous les nombres dans la console
 2. Retourner un tableau avec les valeurs doublées
 3. Retourner un tableau ne contenant que les valeurs impairs
 4. Retourner un tableau ne contenant pas le premier élément
 5. Retourner un tableau ne contenant pas le dernier élément
 6. Retourner la somme des nombres
 7. Retourner le plus grand nombre
 8. Indiquer si le tableau contient au moins un nombre multiple de 9
 9. Indiquer si le tableau ne contient que des nombres positifs
 10. Retourner un tableau contenant les nombres pairs dans les premiers indices et les nombres impairs dans les indices restants  

## Tableaux de chaînes de caractères
A partir du tableau de mots suivant:

```js
const strings = Object.freeze(["Sator", "Arepo", "Tenet", "Opera", "Rotas"]);
```
Réalisez les fonctionnalités ci-dessous. La structure de données initiale ne doit pas être modifiée.

 1. Retourner tous les mots contenant au moins un  **r**
 2. Indiquer si tous les mots font 5 lettres
 3. Retourner un tableau avec un mot de plus en début du tableau
 4. Retourner un tableau avec un mot de plus en fin de tableau
 5. Retourner un tableau en remplaçant le mot du milieu par le mot **radar** (si le tableau à un nombre de mots pair, remplacer le mot qui se situe à l'indice juste avant le milieu) 
 6. Retourner la concaténation de tous les mots 
 7. Retourner le mot qui vient en premier selon l'ordre alphabétique
 8. Retourner tous les mots contenant au moins deux **e**
 9. Indiquer si les chaines du tableau forment un palindrome (si elle sont lues dans l'ordre des indices du tableau). 

## Tableaux d'objets
A partir du tableau représentant des cercles dans un plan suivant:
```js
const circles = Object.freeze([
  {x: 20, y: 10 , r: 10, color: "red"},
  {x: 10, y: 10 , r: 20, color: "green"},
  {x: 30, y: 25 , r: 15, color: "blue"},
  {x: 10, y:5 , r: 5, color: "red"}
]);
circles.forEach(Object.freeze);
```
Réalisez les fonctionnalités ci-dessous. La structure de données initiale ne doit pas être modifiée.

1. Retourner toutes les aires des cercles
2. Retourner tous les cercles de couleur rouge
3. Retourner tous les centres des cercles
4. Retourner tous les cercles en opérant une translation de 10 unités sur l'axe des abscisses 

## Ressources
[map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map)
[filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter)
[reduce](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/TypedArray/reduce)
[slice](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/slice)
[sort](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/TypedArray/sort)
[some](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/some)
[every](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/every)
[indexof](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/indexOf)
[foreach](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach)
[destructuring](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzUzMTg4MjgxLC01MjUwODI2MDksNzM1Nz
Q1MjUxLDE0NDU5OTMyMjcsMTcyNDEyNjk4MywtMTI4NTk4MTIz
M119
-->