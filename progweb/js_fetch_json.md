# Exercice JS Fetch - Json

## Mise en place

**Objectifs**:  Intégrer deux WebServices distincts, un en JSON et l'autre fournissant une image,  en utilisant les sorties de l'un comme entrées de l'autre.

A partir du [code HTML donné](resources/jsFetchJson.html) , ajoutez la balise "script" pour le fichier javascript qui contiendra votre code.

## WebService pour les localités

Afin de faciliter la saisie de la localité (en Suisse uniquement) du formulaire, vous devez récupérer une liste des localités correspondantes au code postal entré par l'utilisateur. Pour ce faire, écoutez les changements de la valeur du champ code postal (événement *input*).  Si le code postal est bien **un nombre dans l'intreval [1000,9999]**, effectuez une requête au WebService de *geonames.org* afin que celui-ci vous fournisse la liste des localités. Voici un exemple d'URL du WebService (vous n'avez qu'à y remplacer 1401 par le code postal du formulaire):

http://api.geonames.org/postalCodeLookupJSON?username=comem&country=CH&postalcode=1401

Une fois la liste reçue, il faut peupler le champ « localité » du formulaire avec les données reçues du WebService. La première *option* sera sélectionnée par défaut.

## WebService pour la carte statique de la localité

 Afin de centrer la carte sur la localité choisie par l'utilisateur, vous devez écouter les changements dans la liste déroulante des localités (événement *input* ou *change*). Dès qu'un changement a lieu, vous devez modifier la source de l'image afin d'y mettre les bonnes coordonnées. Aidez-vous des longitudes et latitudes fournies par le WebService précédent. Il vous faut donc les avoir sauvées précédemment (par exemple dans des attributs data-*). Le WebService pour les cartes est le suivant (il suffit d'y remplacer la latitude et la longitude en fin d'url par celle voulue):

https://chabloz.eu/map/staticmap.php?zoom=14&size=512x512&maptype=mapnik&center=46.7833333,6.65

**remarque**: ce WebService peut être très lent si les cartes n'ont pas déjà été générées. Utilisez donc des codes postaux de grand ville de Suisse romande pour qu'il vous fournisse une image plus rapidement. Si la localité n'est pas trouvée, il génère une image entièrement noire.
