# API RESTful de Gestion des Point de vente (POS)

Cette API permet de gérer des collections pour la gestion des ventes, la gestion des receptions, la gestion des fournisseurs, la gestion des utilisateurs, la gestion des inventaires, la gestion de stock et la gestion des produits . Vous pouvez l'utiliser pour effectuer les actions CRUD pour la gestion de point de vente(POS).

### Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [PostgreSQL ](https://www.postgresql.org)
- [Prisma](https://www.prisma.io)
- [Express.js](https://www.npmjs.com/package/express) (version 4.21 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

   ```bash
       https://github.com/Ousmanly/point_of_sale_backend.git
   ```

2. **Accédez au dossier du projet :**

   ```bash
      cd point_of_sale_backend
   ```

3. **Installez les dépendances :**

   ```bash
     npm install
   ```

4. **Configurer la base de données**

- Assurez-vous que PostgreSQL est en cours d'exécution sur votre machine locale.
- Mettez les paramètres de connexion dans `schema.prisma`.
- Créez un fichier .env avec la configuration de votre base de données :
  ```js
    DATABASE_URL="postgresql://postgres:ousmanepost@localhost:5432/pos?schema=public"
    PORT=3005
  ```

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
  npm start
```

## Endpoints de l'API

**Exemple d'un Endpoint**

**Récupérer toutes les utilisateurs**

- URL : /users
- Méthode HTTP : GET
- Description : Récupère la liste de toutes les utilisateurs.
- Exemple : ` http://localhost:3005/api/users`
- Reponse :
  ```JSON
      [
        {
          "id": 7,
          "name": "Amadou",
          "password": "$2b$10$qtSiyR/FkLXx2xeGKQWshOi7F6/ohRaAazIPgUAYySPvQgnmzGRRa",
          "role": "CAISSIER",
          "email": "amadou@gmail.com",
          "status": true,
        },
        {
          "id": 8,
          "name": "Ousmane",
          "password": "$2b$10$qhJwW4DlZTSHaFL3tkNyJ.pB7hANFZvdJi5Hqz1VTCajCpeue57SG",
          "role": "ADMIN",
          "email": "lyousmaneibrahima@gmail.com",
          "status": true,
        }
      ]
  ```
  **Créer un nouveau utilisateur**
- URL : /users
- Méthode HTTP : POST
- Description : Crée une nouveau utilisateur.
- Exemple :
  `http://localhost:3005/api/users`
  - body
  ```JSON
      {
        "name": "Mariem",
        "password": "password123",
        "role": "CAISSIER",
        "email": "mariem@gmail.com"
      }
  ```
- Reponse :
  ```JSON
    {
      "message": "User has been created"
    }
  ```
  **Mettre à jour un utilisateur**
- URL : /users/:id
- Méthode HTTP : PUT
- Description : Met à jour un utilisateur existante.
- Exemple :
  `http://localhost:3005/api/users/1`
  - body
  ```JSON
    {
      "name": "New Name",
      "email": "exemple_email@example.com"
    }
  ```
- Reponse :
  ```JSON
    {
      "message": "User has been updated"
    }
  ```
  **Supprimer un utilisateur**
- URL : /users/:id
- Méthode HTTP : DELETE
- Description : Supprime un utilisateur par son ID.
- Exemple :
  `http://localhost:3005/api/users/1`
- Reponse :
  ```JSON
      {
        "message": "User has been deleted"
      }
  ```

# Collection Postman

    Vous pouvez importer la collection Postman fournie POS.postman_collection.json pour visualisé et tester facilement tous les endpoints de l'API.

## Comment exécuter les tests unitaires 

#### Exécuter les tests

- Assurez-vous que votre base de données est en cours d'exécution et que les models nécessaires sont configurées.
- dans index.spect.js mettez le token valide
- Ensuite, lancez les tests avec la commande suivante :

```bash
npm test
```

## Author

- **GitHub** : [Ousmane Ly](https://github.com/Ousmanly)
