# Ambil Versi NodeJS
FROM node:16

# Directory docker Image
WORKDIR /disinibale/src/app

# Copy JSON File
COPY package*.json ./

# Install Dependency
RUN npm install

# Copy seluruh file kedalam Docker Image Directory
COPY . .

# Build aplikasi (Command berasal dari NestJs)
RUN npm run build

# Mirror Port agar Berjalan di Port 8080
EXPOSE 8080

# Jalankan Aplikasi!
CMD [ "node", "dist/main" ]