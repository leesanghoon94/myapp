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

# module "vpc" {
#     count = 2
#     source = "./vpc"
#     env = "vpc_${count.index}"
# }


#
# module "vpc-env" {
#     for_each = toset(var.env)
#     source = "./vpc"
#     env = "vpc_${each.key}"
#     }
#
#
variable "env" {
    description = "the environment name"
    type = list(string)
    default = ["dev","prod"]
}