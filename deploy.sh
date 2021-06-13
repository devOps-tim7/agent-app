#!/bin/bash

VERSION=${1}
HEROKU_EMAIL=${2}
HEROKU_API_KEY=${3}
TERRAFORM_PG_BACKEND=${4}
STAGE=${5-staging}
DOCKERHUB_USERNAME=${6:-mmilovanovic}
CONTAINER_NAME=${7:-terraform-deploy}

GATEWAY_IMAGE=${DOCKERHUB_USERNAME}/gateway:${VERSION}
PRODUCTS_IMAGE=${DOCKERHUB_USERNAME}/products:${VERSION}
PURCHASES_IMAGE=${DOCKERHUB_USERNAME}/purchases:${VERSION}

docker create \
  --workdir /deployment \
  --entrypoint sh \
  --env HEROKU_API_KEY="${HEROKU_API_KEY}" \
  --env HEROKU_EMAIL="${HEROKU_EMAIL}" \
  --env TERRAFORM_PG_BACKEND="${TERRAFORM_PG_BACKEND}" \
  --env STAGE="${STAGE}" \
  --env GATEWAY_IMAGE="${GATEWAY_IMAGE}" \
  --env PRODUCTS_IMAGE="${PRODUCTS_IMAGE}" \
  --env PURCHASES_IMAGE="${PURCHASES_IMAGE}" \
  --name "$CONTAINER_NAME" \
  danijelradakovic/heroku-terraform \
  deploy.sh

docker cp deployment/. "${CONTAINER_NAME}":/deployment/
docker start -i "${CONTAINER_NAME}"
docker rm "${CONTAINER_NAME}"