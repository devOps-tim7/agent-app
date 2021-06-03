terraform {
  backend "remote" {
    organization = "devOps-tim7"

    workspaces {
      name = "agent-gh-pipeline"
    }
  }

  required_providers {
    heroku = {
      source = "heroku/heroku"
    }
  }
  required_version = ">= 0.13"
}

provider "heroku" {
}

resource "heroku_app" "agent1" {
  name   = "agent-app"
  region = "eu"
  stack  = "container"
}

resource "heroku_build" "agent1" {
  app = heroku_app.agent1.id

  source {
    path = "."
  }
}

output "agent1_app_url" {
  value = "https://${heroku_app.agent1.name}.herokuapp.com"
}