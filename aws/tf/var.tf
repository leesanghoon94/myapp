variable "vpc_id" {
  type = string
  default = "vpc-0aff28fe1b97da9de"
}

variable "public-subnet" {
  type = list(string)
  default = [ "subnet-01e6e172e18669f8c" ]
}

variable "private-subnet" {
  type = list(string)
  default = [ "subnet-000e1982db8d4479f" ]
}