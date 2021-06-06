FROM node:15-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV DATABASE_TYPE: postgres
ENV DATABASE_USERNAME: postgres
ENV DATABASE_PASSWORD: root
ENV DATABASE_HOST: postgres
ENV DATABASE_PORT: 5432
ENV DATABASE: postgres
ENV IMAGE_DIR: /var/tmp
CMD ["npm", "start"]
