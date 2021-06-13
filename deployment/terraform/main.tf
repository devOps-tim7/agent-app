terraform {
  required_providers {
    heroku = {
      source = "heroku/heroku"
    }
  }
  required_version = ">= 0.13"

  backend "pg" {
  }
}

provider "heroku" {}

## PRODUCTS
resource "heroku_app" "tim7-products" {
  name = var.stage + "-tim7-products"
  stack = "container"
  region = "eu"
}

resource "heroku_addon" "postgres" {
  app = heroku_app.tim7-products.id
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_build" "tim7-products-build" {
  app = heroku_app.tim7-products.id
  source {
    path = "products"
  }
}

## PURCHASES
resource "heroku_app" "tim7-purchases" {
  name = var.stage + "-tim7-purchases"
  stack = "container"
  region = "eu"
}

resource "heroku_addon_attachment" "postgres" {
  app_id  = heroku_app.tim7-products.id
  addon_id = heroku_addon.postgres.id
}

resource "heroku_build" "tim7-purchases-build" {
  app = heroku_app.tim7-purchases.id
  source {
    path = "purchases"
  }
}

## NGINX GATEWAY
resource "heroku_app" "tim7-gateway" {
  name = var.stage + "-tim7-gateway"
  stack = "container"
  region = "eu"

  config_vars = {
    STAGE = var.stage
  }
}

resource "heroku_build" "tim7-gateway-build" {
  app = heroku_app.tim7-gateway.id
  source {
    path = "gateway"
  }
}
