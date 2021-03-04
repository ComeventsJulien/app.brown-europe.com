# Plaquette Dynamique

### Configuration requise
* Ionic Cli
* Firebase Tools Cli
* Npm et NodeJS

### Installation en mode de production local

```sh
$ cd app.la-degustation-box.fr
$ npm install
```

Pour lancer le serveur Ionic 5 :
```sh
$ ionic serve
```

### Configuration

Pour modifier tous les paramètres de base de l'application aller dans le fichier
environnments/environnment.ts
```
export const environment = {
  production: false,
  apiBase   : 'http://localhost:8000',
  apiFolder : '/api',
  uploadFileFolder: '/uploads/images/',
  storageKey: 'base'
};
```

Pour rajouter une couleur qui n'est pas la palette de tailwind, il faut:
 - Editer le fichier tailwind.config.js (brown_europe_primary, brown_europe_secondary)
 - Lancer ngtw build

### Installation en mode de production prod

Les configurations des différents textes se trouvent dans ```src/assets/i18n/``` et le langage correspondant : fr.json ou en.json, suivant le multilangage souhaité.

Pour lancer la compilation du projet :
```sh
$ ionic build --prod
```

Pour le publier (compte google firebase : web3@comevents.fr), si le projet Hosting n'est pas créer il faut le créer (https://console.firebase.google.com/) et suivre le tutoriel (https://ionicframework.com/docs/native/firebase)
