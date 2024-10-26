# Utiliser une image Node.js de base
FROM node:18

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel ton application va s'exécuter
EXPOSE 3005

# Commande pour démarrer l'application
CMD ["npm", "start"]
