#!/bin/sh

ALL_HEROKU_APPS=$(heroku apps) && export ALL_HEROKU_APPS

case $ALL_HEROKU_APPS in (*"$TERRAFORM_PG_BACKEND"*)
    echo "EXISTING BACKEND FOUND"
    ;;
(*)
   heroku create $TERRAFORM_PG_BACKEND
   heroku addons:create heroku-postgresql:hobby-dev --app $TERRAFORM_PG_BACKEND
   ;;
esac

cd terraform || exit

rm -rf ./gateway/Dockerfile
rm -rf ./products/Dockerfile
rm -rf ./purchases/Dockerfile

echo "FROM $GATEWAY_IMAGE" >> ./gateway/Dockerfile
cat ./gateway/Dockerfile

echo "FROM $PRODUCTS_IMAGE" >> ./products/Dockerfile
cat ./gateway/Dockerfile

echo "FROM $PURCHASES_IMAGE" >> ./purchases/Dockerfile
cat ./gateway/Dockerfile

DATABASE_URL=$(heroku config:get DATABASE_URL --app "$TERRAFORM_PG_BACKEND") && export DATABASE_URL
terraform init -backend-config="conn_str=$DATABASE_URL"
terraform apply -auto-approve -var stage=${STAGE}