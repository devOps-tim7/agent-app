terraform {
  backend "remote" {
    organization = "devOps-tim7"

    workspaces {
      name = "agent-gh-pipeline"
    }
  }
}

provider "heroku" {
}

resource "heroku_app" "agent1" {
  name   = "Agent app"
  region = "eu"
  stack  = "container"
}

resource "heroku_build" "servers1" {
  app = heroku_app.agent1.id
}

output "agent1_app_url" {
  value = "https://${heroku_app.agent1.name}.herokuapp.com"
}