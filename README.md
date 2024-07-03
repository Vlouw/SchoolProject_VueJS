# Chat client

## Pré-requis

- Télécharger node ici : https://nodejs.org/en/download/
- Pour savoir si vous l'avez installé, exécutez dans un terminal:
````
node -v
````
Si cela vous retourne une version, alors nodejs est bien installé.

## Installation du projet

Suite à l'installation de nodejs, il faut ouvrir un terminal **dans le répertoire du projet**, puis exécuter cette commande : 

````
npm install
````
Cela installera les librairies nécessaires au fonctionnement interne du chat.

## Démarrer votre projet

Pour travailler sur votre projet, vous aurez besoin de démarrer le *backend*.

### Backend
Pour démarrer le *backend* de votre projet, faire :

````
npm run watch
````

Pour accéder au client dans votre navigateur, allez à : [http://localhost:3000]

## Et ensuite?...

Pour ce projet, ne travaillez que dans le dossier `client/`. Vous pouvez modifier tous les fichiers qui s'y trouvent, mais il est fortement déconseillé d'altérer les lignes de code déjà en place, car il est 100% fonctionnel avec le serveur de chat. Ajoutez des lignes, créez des fichiers et images, mais attention de ne pas *briser* l'accès au serveur (connexion, déconnexion, etc.).

Toutes les informations nécessaires à la réalisation du projet se trouvent ici : [https://notes-de-cours.com/webjs/travaux]

### Petites notes 
- Si vous spammez le seveur de message, vous serez déconnecté et bannis durant une minute ou deux.
- Le serveur vous déconnecte automatiquement après un certain temps d'inactivité. Vous aurez-donc à vous reconnecter souvent quand vous avez des erreurs dans le javascript par exemple.
  Afin d'accélérer la connexion, mettez votre nom d'usager et mot de passe dans les balises input de la page login avec l'attribut value 
  EX :`value="nom/mdp"`
- Je pourrai vous aider à comprendre ce que vous avez à faire pour le projet, mais je ne pourrai pas vous dire quoi coder et comment régler vos bugs.
  Je pourrai cependant vous donner des pistes de résolutions. Vous pourrez aussi demander à vos collègues de vous aider, il est fort possible qu'ils aient à   régler le même problème que vous.
- AUCUN plagiat. Tout code issu d'internet doit être cité (le lien de la page en haut des quelques lignes de code)
  De plus, vous devez utiliser internet avec retenue, si 30% de votre code provient de *stack overflow*, votre projet vaudra 0.
  Dans le doute, demandez à votre gentil professeur.

## Remise du projet

Vous devez remettre votre projet sur Léa. Si ça ne fonctionne pas, vous pouvez me l'envoyer sur discord en message privé.