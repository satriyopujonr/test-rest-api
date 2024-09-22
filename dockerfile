# Menggunakan image Node.js
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Mengekspos port aplikasi
EXPOSE 9000

# Menjalankan aplikasi
CMD ["npm", "run", "start:prod"]
