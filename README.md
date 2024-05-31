# M2 Assignment App

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
# Contributeurs
- 55: ROBSONA Tsiory Andriantsoa
- 58: ZAFITSIARENDRIKA Tommy

# Descriptions


# Prérequis

- NodeJS >= 20.111
- MongoDB

# Installation

```bash 
git clone https://github.com/890Tom/m2_mbds_assignment.git
```

```bash 
cd m2_mbds_assignment
```

```bash 
npm install
```

# Démarrage

```bash
ng serve
```

# Structure du projet 
```bash
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── assignments
│   │   │   ├── assignments.component.css
│   │   │   ├── assignments.component.html
│   │   │   ├── assignments.component.ts
│   │   │   ├── add-assignment/
│   │   │   ├── details-assignment/
│   │   │   ├── edit-assignment/
│   │   │   ├── list-assignment/
│   │   │   └── return-assignment/
│   │   ├── shared
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── guard
│   │   │   │   ├── admin.guard.ts
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interface
│   │   │   │   ├── assignment.interface.ts
│   │   │   │   └── user.interface.ts
│   │   │   └── service
│   │   │       ├── assignment.service.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── loader.service.ts
│   │   │       ├── matiere.service.ts
│   │   │       └── user.service.ts
│   │   ├── signin
│   │   │   ├── signin.component.css
│   │   │   ├── signin.component.html
│   │   │   └── signin.component.ts
│   │   └── spinner
│   │       ├── spinner.component.css
│   │       ├── spinner.component.html
│   │       └── spinner.component.ts
│   ├── assets
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

```

# Lien
- Front : https://m2-mbds-assignment.onrender.com/
- API : https://m2-mbds-api-assignment.onrender.com/api/

# Lien Git
- Front : https://github.com/890Tom/m2_mbds_assignment
- API : https://github.com/Lacoste27/m2_mbds_api_assignment

# Fonctionnalites
- Authentifications :
    - Pour accéder à l'application, il faudra s'authentifié
    - Utilise Token JWT pour la session de connexion
- Assignments : 
    - Affiche la liste des devoirs avec système de pagination pour la navigation
    - Affiche la liste en deux colonnes `Rendu` et `Non rendu`
    - Affiche un dévoir dans la liste dans un `Card`
    - L'ajout d'un nouveau devoir avec un stepper
        1. Informations générale :
            - La saisie de la description du devoir
            - Le choix de la date de rendu
        2. Choix de l'étudiant :
            - La page pour pouvoir chosir l'étudiant
        3. Choix de la matière :
            - Le troisième onglets est pour choisir la matière
        4. Récupitulation des données
    - Peut voir la détails d'un devoir et voir son état
    - Modifier un devoir
    - Suppression d'un devoir non rendu
    - Rendre un devoir , un devoir non noté ne peut pas être rendu

# Contributions

## 58 - Zafitsiarendika Tommy
- Mise en place de la template
- Configuration du déploiement sur render
- Mise en place de l'authentification
- L'assignment :
    - Création :
        - Mise en place de la page d'ajout avec un stepper qui utilise `mat-stepper`
    - Liste :
        - Utilisations des cards pours l'affichage des assignments
        - Affiche des devoirs 
        - Ajout d'un système de paginations
        - Le système de drag and drop
    - Rendre : 
        - Affiche une fênetre de saise des nôtes lors de la drop de l'assignment dans la liste des assignment rendu en utilisant un modal et `drag-and-drop` d'angular

## 55 - Robsona Tsiory Andriantsoa
- Affiche de la page détails d'un assignment
- Affiche la page de modifications et la fonctionnalité de modifications
- Affiche les messages d'erreur et de succès avec `SwalAlert`
- Réajuster la design dans l'ajout assignment
- L'ajout de la badge `Rendu` ou `Non rendu` sur la page liste
- Convertir la liste en deux colonnes `Rendu` et `Non rendu`
- Changer la layout de l'applications

## Comptes Test
1. Professeur 
    - Email : professeur@itu-mbds.com
    - Password : `professeurPass`

2. Etudiant 
    - Email : etudiant@eitu-mbds.com
    - Password : `etudiantPass`

## Contraintes

- [x] 1000 assignments minimum dans la base dans la base
- [x] Rendre sur github le projet
- [x] Déployer dans render
- [x] Ajout toolbar et sidebar
- [x] Authentification JWT
- [x] Ajout des nouvelles proproité (note, remarque, ...)
- [x] Amélioration de l'affichage de l'assignment
- [x] Affichage de la liste dans deux onglets séparé
- [x] Formulaire de type Stepper
- [x] Ajout de message de notification
- [x] Drag and drop