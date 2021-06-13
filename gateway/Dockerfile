FROM node:15-alpine AS build
COPY ./frontend .
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
COPY ./gateway/config/prod.conf /etc/nginx/conf.d/default.conf.template
CMD /bin/sh -c "envsubst '\$PORT,\$STAGE' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
COPY --from=build /build /usr/src/app/build
EXPOSE $PORT
