terraform {
  backend "remote" {
    organization = "devOps-tim7"

    workspaces {
      name = "agent-gh-pipeline"
    }
  }
}