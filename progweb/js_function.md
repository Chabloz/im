# Exercice JS - Fonctions

**Objectif**: Se familiariser avec la syntaxe JavaScript et reviser les bases de l'algo prog


**1**)  Ecrire une fonction qui retourne la plus grande valeur parmi les trois nombres fournis en paramètre. 

**2**)  Ecrire une fonction qui retourne un nombre entier pseudo-aléatoire entre une borne inférieure et une borne supérieure (bornes entières et comprises dans l'intervalle).

**3**)  Ecrire deux fonctions **compareA** et **compareB** qui retournent les mêmes résultats que dans les exemples suivant:
```js
compareA(4, '4'); // true 
compareA(4.0, '4'); // true
compareA(4, 'quatre'); // false

compareB(8, '8'); // false
compareB(8, 'huit'); // false
```

**4**) En fonction d'un nombre n (ou n > 0) donné en paramètre, écrire une fonction qui affiche dans la console :
  - Les nombres entiers pairs compris entre 0 et n.
  - Les nombres entiers pairs et multiples de 7 compris entre 0 et n.
  - Les nombres entiers pairs et multiples de 3, ainsi que les nombres entiers multiple de 7 compris entre 0 et n.
  - Les nombres entiers pairs et multiples de 3, mais non multiples de 7 compris entre 0 et n.

**5**) Ecrire deux fonctions retournant réciproquement:
  - le nombre de piles obtenus sur un lancé de n pièces de monnaies simulées par l'utilisation du générateur de nombre aléatoire.
  - le nombre de piles et de faces obtenus sur un lancé de n pièces de monnaies simulées par l'utilisation du générateur de nombre aléatoire.

**6**)  Ecrire une fonction qui indique si un nombre entier est un [nombre premier](https://fr.wikipedia.org/wiki/Nombre_premier) ou non. Tester la fonction avec les valeurs suivantes: 0, 1, 2, 3, 4, 9, 11, 26, 87178291197, 87178291199.

**4**)  Ecrire une fonction nommée **cl** qui affiche dans la console, ligne après ligne, toutes les données fournies en paramètre. Exemple d'appel:

```js
cl(1, 2 ,"a", [3.1, 4, 159]);
```
  
**5**)  Ecrire une fonction qui etourne la somme de deux nombres.

**6**)  Ecrire une fonction qui retourne une fonction qui somme son unique paramètre au paramètre fournis en entrée. Il s'agit donc de faire une [curryfication](https://fr.wikipedia.org/wiki/Curryfication) de la fonction précédente. Exemples d'appels si votre fonction se nomme **curryAdd**:
```js
curryAdd(2)(40); // Retourne 42
const add2 = curryAdd(2);
add2(41); //retourne 43
```

**7**)  Ecrire une fonction **square** qui retourne le carré (la puissance de 2) du nombre passé en paramètre.

**8**)  Appelle la fonction passée en tant que premier paramètre sur le résultat de cette même fonction appelée avec le second paramètre comme argument. En plus simple: applique deux fois la même fonction sur le deuxième paramètre. Exemple d’appel si votre fonction se nomme **twice**:
```js
twice(square, 2); // square(square(2)) => 16
```
