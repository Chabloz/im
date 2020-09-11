# Exercice JS - Fonctions

**Objectif**: Se familiariser avec la syntaxe JavaScript.

Implémentez les fonctionnalités  suivantes sous la forme de fonctions JavaScript:

**1**)  Retourne la plus grande valeur parmi les trois nombres fournis en paramètre.  

**2**)  Retourne un nombre entier pseudo-aléatoire entre une borne inférieure et une borne supérieure (bornes entières et comprises dans l'intervalle).   

**3**)  Indique si un nombre entier est un [nombre premier](https://fr.wikipedia.org/wiki/Nombre_premier) ou non. Testez votre fonction avec (au moins) les valeurs suivantes: 0, 1, 2, 11, 26, 87178291197, 87178291199.

**4**)  Ecrit dans la console, ligne après ligne, toutes les données fournies en paramètre. Exemple d'appel si votre fonction se nomme **cl**:
  ```js
cl(1, 2 ,"a", [3.1, 4, 159]);
  ```
  
**5**)  Retourne la somme de deux nombres.

**6**)  Retourne une fonction qui somme son unique paramètre au paramètre fournis en entrée. Il s'agit donc de faire une [curryfication](https://fr.wikipedia.org/wiki/Curryfication) de la fonction précédente. Exemples d'appels si votre fonction se nomme **curryAdd**:
```js
curryAdd(2)(40); // Retourne 42
const add2 = curryAdd(2);
add2(41); //retourne 43
```

**7**)  Retourne le carré (la puissance de 2) du nombre passé en paramètre. Appelez votre fonction **square**.

**8**)  Appelle la fonction passée en tant que premier paramètre sur le résultat de cette même fonction appelée avec le second paramètre comme argument. En plus simple: applique deux fois la même fonction sur le deuxième paramètre. Exemple d’appel si votre fonction se nomme **twice**:
```js
twice(square, 2); // square(square(2)) => 16
```
**9**)  Transformez votre fonction précédente en une  [fonction d'ordre supérieur](https://fr.wikipedia.org/wiki/Fonction_d%27ordre_sup%C3%A9rieur) retournant une fonction (un peu à la manière de la *curryfication*) afin de pouvoir faire des appels comme les suivants:
```js
const pow4 = twice(square);
const pow16 = twice(pow4);
pow4(2); // Retourne 16
pow16(2); // Retourne 65'536
``` 
**10**)  Identique à la question 8 mais effectue l'appel de fonction **n** fois. Exemple d’appel si votre fonction se nomme **times**:
```js
times(4, square, 2); 
```
Comme on peut le voir, l'appel de cette fonction peut porter à confusion. En effet l'ordre des arguments est important. On ne peut pas savoir, sans regarder la fonction **times**, si c'est la fonction  **square** qui sera appelée **4** fois avec comme valeur initiale **2** (ce qui nous donnerait  65'536), ou si c'est la fonction **square** qui sera appelée **2** fois avec comme valeur initiale **4** (ce qui nous donnerait  256). Modifiez alors votre fonction en utilisant la [décomposition](https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6) pour les paramètres afin de pouvoir faire des appels comme les suivants:
```js
times({times: 4, fct: square, value: 2}); // Retourne 65'536
times({fct: square, value: 4, times: 2}); // Retourne 256
```

**11**)  Transformez votre fonction précédente en une  fonction d'ordre supérieur afin de pouvoir faire des appels comme les suivants:

```js
const pow16 = times({times: 4, fct: square});
pow16(2); // Retourne 65'536
times({times: 2, fct: square})(2) // Retourne 16
```
