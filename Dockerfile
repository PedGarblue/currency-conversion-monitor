FROM node:20.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3050

CMD [ "npm", "run", "start:dev" ]