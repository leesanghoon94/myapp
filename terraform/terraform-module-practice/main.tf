terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5"
    }
  }
}

provider "aws" {
  region = "ap-northeast-2"
}

module "my-vpc" {
  source = "./vpc"
}
