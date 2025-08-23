Documentation du Projet : RESSOURCES DOCUMENTAIRE ENEO

Ce projet est une application web simple et légère, conçue pour naviguer, visualiser et télécharger des fichiers et des dossiers à partir d'un système de fichiers local ou d'un partage réseau. Son objectif est de fournir une interface utilisateur conviviale et professionnelle pour accéder aux ressources documentaires.

Technologies et Architecture

- Frontend : L'interface est construite avec des technologies web standard, HTML5, CSS3 et JavaScript. Elle utilise des appels d'API asynchrones pour communiquer avec le backend, garantissant une expérience de navigation fluide sans rechargement de page.

- Backend : Le serveur est développé en Node.js en utilisant le framework Express.js. Il est chargé de gérer les requêtes du frontend, de lire les informations du système de fichiers et de servir les fichiers pour le téléchargement.

API : Le backend expose deux points d'accès (endpoints) principaux :

- /api/files : pour lister le contenu d'un dossier.
- /api/download : pour télécharger un fichier spécifique.

Fonctionnalités Principales

- Navigation : Explorez les dossiers et sous-dossiers de manière intuitive via un double-clic.
- Fil d'Ariane : Un fil d'Ariane dynamique vous permet de naviguer facilement vers les dossiers parents.
- Tri du contenu : Triez les fichiers par nom, date de modification, type ou taille.
- Téléchargement : Téléchargez n'importe quel fichier en double-cliquant dessus.
- Compatibilité réseau : Conçu pour accéder à des dossiers partagés via un intranet en utilisant un mappage de lecteur réseau.

Configuration et Variables d'Environnement
Pour garantir la flexibilité de l'application, les paramètres de configuration ne sont pas codés en dur. Ils sont gérés via des variables d'environnement, ce qui permet de les ajuster facilement sans modifier le code source.

Le fichier .env et Git :
Pour des raisons de sécurité et de portabilité, le fichier .env n'est pas envoyé sur le dépôt Git. Il contient des informations de configuration spécifiques à l'environnement de chaque utilisateur. Toute personne qui clone le dépôt devra créer son propre fichier .env.

Création du fichier .env :
À la racine du projet, créez un fichier nommé .env et ajoutez-y les lignes suivantes :

- PORT=5000
- UPLOAD_FOLDER=fichiers_test

PORT : Le port sur lequel le serveur Node.js sera accessible. La valeur par défaut est 5000.
UPLOAD_FOLDER : Le chemin du dossier que l'application affichera.

Mappage du Lecteur Réseau pour l'Intranet
Pour accéder à un dossier partagé sur l'intranet, vous devez le mapper en tant que lecteur réseau local. Cela permet à l'application web de le traiter comme un dossier sur votre propre machine.

Exemple de mappage sur Windows :

1. Ouvrez l'Explorateur de fichiers.
2. Faites un clic droit sur "Ce PC" et sélectionnez "Connecter un lecteur réseau...".
3. Choisissez une lettre de lecteur (généralement "Z:").
4. Dans le champ "Dossier", entrez le chemin du dossier de l'intranet (par exemple, \\serveur_intranet\dossiers_documentaires).
5. Cliquez sur "Terminer".

Une fois le mappage effectué, mettez à jour la variable UPLOAD_FOLDER dans votre fichier .env pour qu'elle pointe vers ce nouveau lecteur, par exemple : UPLOAD_FOLDER=Z:\.

Prérequis

- Node.js (version 14+) : Le runtime JavaScript pour exécuter le serveur.
- npm (Node Package Manager) : Pour installer les dépendances du projet.

Installation et Démarrage

1. Cloner le dépôt Git avec la commande : git clone <URL_du_dépôt>

2. Installer les dépendances : Naviguez vers le dossier du projet dans votre terminal et exécutez la commande suivante pour installer Express et d'autres modules nécessaires avec "npm install"
3. Démarer le serveur avec la commande : node server.js

Le serveur sera alors accessible à l'adresse http://localhost:5000 (ou au port que vous avez spécifié).

Structure du projet :

/ENEO1
├─── fichiers_test/           # Contient les fichiers et dossiers de test.
├─── node_modules/            # Dépendances du projet (installées via 'npm install').
├─── .env                     # Fichier de variables d'environnement (non inclus dans le dépôt Git).
├─── .gitignore               # Spécifie les fichiers à ne pas inclure dans Git.
├─── index.html               # Interface utilisateur (Frontend).
├─── logo                     # logo utilisé sur le frontend
├─── package-lock.json        # Enregistre la version exacte de chaque dépendance installée.
├─── package.json             # Liste les dépendances du projet et les scripts.
├─── README.md                # Documentation du projet.  
└─── server.js                # Serveur Node.js (Backend).
