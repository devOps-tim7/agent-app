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

variable "stage" {
  description = "Stage of the app (staging or production)"
}

variable "token_secret" {
  description = "Secret needed for JWT"
}

variable "cloud_name" {
  description = "Cloudinary name"
}

variable "cloud_api_key" {
  description = "Cloudinary api key"
}

variable "cloud_api_secret" {
  description = "Cloudinary api secret"
}

## PRODUCTS
resource "heroku_app" "tim7-products" {
  name = "${var.stage}-tim7-products"
  stack = "container"
  region = "eu"

  config_vars = {
    TOKEN_SECRET = var.token_secret
    CLOUD_NAME = var.cloud_name
    CLOUD_API_KEY = var.cloud_api_key
    CLOUD_API_SECRET = var.cloud_api_secret
    IMAGE_DIR = "/var/tmp"
  }
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
  name = "${var.stage}-tim7-purchases"
  stack = "container"
  region = "eu"
}

resource "heroku_addon_attachment" "postgres-purchases" {
  app_id  = heroku_app.tim7-purchases.id
  addon_id = heroku_addon.postgres.id
}

resource "heroku_build" "tim7-purchases-build" {
  app = heroku_app.tim7-purchases.id
  source {
    path = "purchases"
  }
}

## REPORTS
resource "heroku_app" "tim7-reports" {
  name = "${var.stage}-tim7-reports"
  stack = "container"
  region = "eu"
}

resource "heroku_addon_attachment" "postgres-reports" {
  app_id  = heroku_app.tim7-reports.id
  addon_id = heroku_addon.postgres.id
}

resource "heroku_build" "tim7-reports-build" {
  app = heroku_app.tim7-reports.id
  source {
    path = "reports"
  }
}

## NGINX GATEWAY
resource "heroku_app" "tim7-gateway" {
  name = "${var.stage}-tim7-gateway"
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
