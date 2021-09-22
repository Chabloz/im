// 1) Retourne la plus grande valeur parmi les trois nombres fournis en paramètre
const max = (a, b, c) => a >= b && a >= c ? a : (b >= a && b >= c) ? b : c;
// Mais il vaut mieux utiliser Math.max !

// 2) Retourne un nombre entier pseudo-aléatoire entre une borne inférieure et une borne supérieure (bornes entières et comprises dans l'intervalle).
const alea = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

// 3) Indique si un nombre entier est un nombre premier ou non. Testez votre fonction avec au moins les valeurs suivantes: 0, 1, 2, 11, 26, 87178291197, 87178291199.
const isPrime = n => {    
    if (isNaN(n) || !Number.isInteger(n)) throw 'Not an integer';
    if (n > Number.MAX_SAFE_INTEGER) throw 'Number too big';
    if (n <= 1) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    if (n == 3) return true;
    if (n % 3 == 0) return false;    
    // On pourrait continuer avec le crible d'Ératosthène pour les multiples de 5, 7, 11, ...
    // mais cela rendrait la programmation de la boucle suivante impossible
    // et il faudrait donc repenser la totalité de l'algorithme !
    let step = 2;
    let div = 5;
    while (div * div <= n && n % div != 0) {
        div += step;
        step = (step + 1) % 4 + 1;        
    }
    return div * div > n;
}

// 4) Ecrit dans la console, ligne après ligne, toutes les données fournies en paramètre.
const cl = (...data) => data.forEach(v => console.log(v));

// 5) Retourne la somme de deux nombres.
const add = (a, b) => a + b;

// 6) Retourne une fonction qui somme son unique paramètre au paramètre fournis en entrée. Il s'agit donc de faire une curryfication de la fonction précédente.
const curryAdd = a => b => a + b;

// 7) Retourne le carré (la puissance de 2) du nombre passé en paramètre. Appelez votre fonction square.
const square = n => n * n; // Attention: ne fonctionne pas pour les grands nombres !

// 8) Appelle la fonction passée en tant que premier paramètre sur le résultat de cette même fonction appelée avec le second paramètre comme argument. En plus simple: applique deux fois la même fonction sur le deuxième paramètre.
const twice = (f, n) => f(f(n));

// 9) Transformez votre fonction précédente en une fonction d'ordre supérieur retournant une fonction (un peu à la manière de la curryfication).
const curryTwice = f => n => f(f(n));
const pow4 = curryTwice(square);
const pow16 = curryTwice(pow4);
cl(pow4(2)); // Retourne 16
cl(pow16(2)); // Retourne 65'536

// 10) Identique à la question 8 mais effectue l'appel de fonction n fois. 
const times = ({times = 2, fct, value = times}) => {
    for (let i = 0; i < times; i++) {
        value = fct(value);
    }
    return value;
}

// 11) Transformez votre fonction précédente en une fonction d'ordre supérieur
const ho_times = ({times = 2, fct}) => value => {
    for (let i = 0; i < times; i++) {
        value = fct(value);
    }
    return value;
}

const pow16bis = ho_times({times: 4, fct: square});
pow16bis(2); // Retourne 65'536
ho_times({times: 2, fct: square})(2) // Retourne 16
