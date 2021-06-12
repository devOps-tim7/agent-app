FROM node:15-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install 
COPY . .
RUN npm run build

FROM node:15-alpine
WORKDIR /usr/src/app
RUN npm install --production
COPY --from=build /usr/src/app/build .
CMD node index.js