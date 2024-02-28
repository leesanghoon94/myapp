variable "vpc_id" {
  type = string
  default = "vpc-01280e74e795d9175"
}

variable "public-subnet" {
  type = list(string)
  default = [ "subnet-0e745a1268de4f71c" ]
}

variable "private-subnet" {
  type = list(string)
  default = [ "subnet-0713f5d87f8aa8945" ]
}