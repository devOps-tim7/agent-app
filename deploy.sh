#!/bin/bash

VERSION=${1}
HEROKU_EMAIL=${2}
HEROKU_API_KEY=${3}
TERRAFORM_PG_BACKEND=${4}
TOKEN_SECRET=${5}

TOKEN_SECRET=${6}
TOKEN_SECRET=${7}
TOKEN_SECRET=${8}


STAGE=${9-staging}
DOCKERHUB_USERNAME=${10:-mmilovanovic}
CONTAINER_NAME=${11:-terraform-deploy}


GATEWAY_IMAGE=${DOCKERHUB_USERNAME}/gateway:${VERSION}
PRODUCTS_IMAGE=${DOCKERHUB_USERNAME}/products:${VERSION}
PURCHASES_IMAGE=${DOCKERHUB_USERNAME}/purchases:${VERSION}
REPORTS_IMAGE=${DOCKERHUB_USERNAME}/reports:${VERSION}

docker create \
  --workdir /deployment \
  --entrypoint sh \
  --env HEROKU_API_KEY="${HEROKU_API_KEY}" \
  --env HEROKU_EMAIL="${HEROKU_EMAIL}" \
  --env TERRAFORM_PG_BACKEND="${TERRAFORM_PG_BACKEND}" \
  --env STAGE="${STAGE}" \
  --env TOKEN_SECRET="${TOKEN_SECRET}" \
    --env TOKEN_SECRET="${TOKEN_SECRET}" \
    --env TOKEN_SECRET="${TOKEN_SECRET}" \
    --env TOKEN_SECRET="${TOKEN_SECRET}" \

  --env GATEWAY_IMAGE="${GATEWAY_IMAGE}" \
  --env PRODUCTS_IMAGE="${PRODUCTS_IMAGE}" \
  --env PURCHASES_IMAGE="${PURCHASES_IMAGE}" \
  --env REPORTS_IMAGE="${REPORTS_IMAGE}" \
  --name "$CONTAINER_NAME" \
  danijelradakovic/heroku-terraform \
  deploy.sh

docker cp deployment/. "${CONTAINER_NAME}":/deployment/
docker start -i "${CONTAINER_NAME}"
docker rm "${CONTAINER_NAME}"