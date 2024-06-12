FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install  && mkdir -p /var/log/express

COPY . .

EXPOSE 3000

# ENV MONGODB_URI=mongodb://mongo:27017/vdt2024

CMD ["node", "src/index.js"]