#! bin/sh

VERSION=${1}
DOCKERHUB_USERNAME=${2}
DOCKERHUB_PASSWORD=${3}
NAME=${4:-staging}

GATEWAY=${DOCKERHUB_USERNAME}/gateway:${VERSION}
PRODUCTS=${DOCKERHUB_USERNAME}/products:${VERSION}
PURCHASES=${DOCKERHUB_USERNAME}/purchases:${VERSION}

DOCKER_BUILDKIT=1 docker build -t ${GATEWAY} --no-cache -f ./gateway/Dockerfile .

cd products
DOCKER_BUILDKIT=1 docker build -t ${PRODUCTS} --no-cache .

cd ../purchases
DOCKER_BUILDKIT=1 docker build -t ${PURCHASES} --no-cache .


docker login --username ${DOCKERHUB_USERNAME} --password=${DOCKERHUB_PASSWORD}
docker push ${GATEWAY}
docker push ${PRODUCTS}
docker push ${PURCHASES}
