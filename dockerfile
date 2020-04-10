FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 80
EXPOSE 443

CMD [ "npm","start" ]