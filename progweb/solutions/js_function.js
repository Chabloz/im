// 1) Ecrire une fonction qui retourne la plus grande valeur parmi les trois nombres fournis en paramètre.
function max(a, b, c) {
    if (a >= b && a >= c) return a;
    if (b >= a && b >= c) return b;
    return c;
}
// Mais il vaut mieux utiliser Math.max.

// 2) Ecrire une fonction qui retourne un nombre entier pseudo-aléatoire entre une borne inférieure et une borne supérieure (bornes entières et comprises dans l'intervalle).
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 3) Ecrire deux fonctions compareA et compareB qui retournent les mêmes résultats que dans les exemples suivant:
// Ces deux fonctions ont comme but pédagogique de comprendre la différence entre l'égalité "faible" == et l'égalité "stricte" ===
function compareA(a, b) {
    return a == b;
}

function compareB(a, b) {
    return a === b;
}


// 4) En fonction d'un nombre n (ou n > 0) donné en paramètre, écrire une fonction qui affiche dans la console :
// Les nombres entiers pairs compris entre 0 et n.
function showEvenNumbers(limit) {
    for (let nb = 0; nb <= limit; nb++) {
        if (nb % 2 == 0) console.log(nb);
    }
}
// Version plus performante mais moins évolutive
function showEvenNumbers_v2(limit) {
    for (let nb = 0; nb <= limit; nb+=2) {
        console.log(nb);
    }
}

// Les nombres entiers pairs et multiples de 7 compris entre 0 et n.
function showEvenAndMultipleOfSeven(limit) {
    for (let nb = 0; nb <= limit; nb++) {
        if (nb % 2 == 0 && nb % 7 == 0) console.log(nb);
    }
}
// Les nombres entiers pairs et multiples de 3, ainsi que les nombres entiers multiple de 7 compris entre 0 et n.
function showEvenAndMultipleOfThreeOrMultipleOfSeven(limit) {
    for (let nb = 0; nb <= limit; nb++) {
        if ((nb % 2 == 0 && nb % 3 == 0) || nb % 7 == 0) console.log(nb);
    }
}
// Les nombres entiers pairs et multiples de 3, mais non multiples de 7 compris entre 0 et n.
function showEvenAndMultipleOfThreeAndNotMultipleOfSeven(limit) {
    for (let nb = 0; nb <= limit; nb++) {
        if (nb % 2 == 0 && nb % 3 == 0 && nb % 7 != 0) console.log(nb);
    }
}

// 5) Ecrire deux fonctions retournant réciproquement:
// le nombre de piles obtenus sur un lancé de n pièces de monnaies simulées par l'utilisation du générateur de nombre aléatoire.
function numberOfHeads(nbOfTests) {
    let heads = 0;
    for (let i = 0; i < nbOfTests; i++) {
        if (Math.random() < 0.5) heads++;
    }
    return heads;
}
// le nombre de piles et de faces obtenus sur un lancé de n pièces de monnaies simulées par l'utilisation du générateur de nombre aléatoire.
function numberOfHeadsAndTails(nbOfTests) {
    const heads = numberOfHeads(nbOfTests);
    return {heads, tails: nbOfTests - heads};
}

// 6) Ecrire une fonction qui indique si un nombre entier est un nombre premier ou non. Tester la fonction avec les valeurs suivantes: 0, 1, 2, 3, 4, 9, 11, 26, 87178291197, 87178291199.
function isPrime(n) {
    if (isNaN(n) || !Number.isInteger(n)) throw 'Not an integer';
    if (n > Number.MAX_SAFE_INTEGER) throw 'Number too big';
    if (n <= 1) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    if (n == 3) return true;
    if (n % 3 == 0) return false;
    // On pourrait continuer avec le crible d'Ératosthène pour les multiples de 5, 7, 11, ...
    // mais cela rendrait la programmation de la boucle suivante très complexe
    // et il faudrait donc repenser la totalité de l'algorithme.
    let step = 2;
    let div = 5;
    while (div * div <= n && n % div != 0) {
        div += step;
        // Pas alterné (+2 +4 +2 +4 ...) pour ne pas parcourir les multiples de 2 ni de 3
        step = (step + 1) % 4 + 1;
    }
    // Si aucun diviseur n'a été trouvé avant la racine du nb, c'est un nombre premier
    return div * div > n;
}

// 7) Ecrire une fonction nommée cl qui affiche dans la console, ligne après ligne, toutes les données fournies en paramètre. Exemple d'appel:
function cl(...data) {
    data.forEach(val => console.log(val));
}

// 8) Ecrire une fonction qui retourne la somme de deux nombres.
function add(a, b) {
    return a + b;
}
// Version exercice 12)
const add_ex12 = (a, b) => a + b;

// 9) Ecrire une fonction qui retourne une fonction qui somme son unique paramètre au paramètre fournis en entrée. Il s'agit donc de faire une curryfication de la fonction précédente.
function curryAdd(a) {
    return function (b) {
        return a + b;
    }
}
// Version exercice 12)
const curryAdd_ex12 = a => b => a + b;

// 10) Ecrire une fonction square qui retourne le carré (la puissance de 2) du nombre passé en paramètre.
function square(n) { //on peut aussi utiliser math.pow(n, 2) ou "n ** 2"
    return n * n; // Attention: ne fonctionne pas pour les grands nombres !
 }
// Version exercice 12)
const square_ex12 = n => n * n;

// 11) Ecrire une fonction twice qui appelle la fonction passée en tant que premier paramètre sur le résultat de cette même fonction appelée avec le second paramètre comme argument. En plus simple: qui applique deux fois la même fonction sur le deuxième paramètre.
function twice(f, n){
    return f(f(n));
}
// Version exercice 12)
const twice_ex12 = (f, n) => f(f(n));
