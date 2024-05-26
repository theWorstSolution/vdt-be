FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# ENV MONGODB_URI=mongodb://mongo:27017/vdt2024

CMD ["node", "src/server.js"]