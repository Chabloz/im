# Exercice Ajax - Json

## Mise en place

**Objectifs**:  Intégrer deux WebServices distincts, un en JSON et l'autre fournissant une image,  en utilisant les sorties de l'un comme entrées de l'autre. 

A partir du [code HTML donné](resources/jqueryAjaxJson.html) , ajoutez les balises "script" pour jQuery et un fichier javascript pour votre code. 

## WebService pour les localités

Afin de faciliter la saisie de la localité (en Suisse uniquement) du formulaire, vous devez récupérer une liste des localités correspondantes au code postal  entré par l'utilisateur. Pour ce faire, écoutez les frappes au clavier de l'utilisateur lors de la saisie du code postal (événement *keyup*).  Si le code postal est bien **composé de 4 chiffres**, effectuez une requête au WebService de *geonames.org* afin que celui-ci vous fournisse la liste des localités. Voici un exemple d'url du WebService (vous n'avez qu'à y remplacer 1401 par le code postal du formulaire):

http://api.geonames.org/postalCodeLookupJSON?username=comem&country=CH&postalcode=1401

Une fois la liste reçue, il faut peupler le champ « localité » du formulaire avec les données reçues du WebService. La première *option* sera sélectionnée par défaut.

## WebService pour la carte statique de la localité

 Afin de centrer la carte sur la localité choisie par l'utilisateur, vous devez écouter les changements dans la liste déroulante des localités (événement *change*). Dès qu'un changement a lieu, vous devez modifier la source de l'image afin d'y mettre les bonnes coordonnées. Aidez-vous des longitudes et latitudes fournies par le WebService précédent. Il vous faut donc les avoir sauvées précédemment (par exemple avec la méthode [data](https://api.jquery.com/data/) de jQuery). Le WebService pour les cartes est le suivant (il suffit d'y remplacer la latitude et la longitude en fin d'url par celle voulue):
 
http://staticmap.openstreetmap.de/staticmap.php?zoom=14&size=512x512&maptype=mapnik&center=46.7833333,6.65

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYxMjE3MTM3NCw3MDMzMzMxMCw3ODM1OT
c1OTZdfQ==
-->