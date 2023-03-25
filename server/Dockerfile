FROM node:16.13.1

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["cd", "server"]

CMD ["npm", "run", "dev"]