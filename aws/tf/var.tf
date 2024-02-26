variable "vpc_id" {
  type = string
  default = "vpc-0cf774caa0df40d9c"
}

variable "public-subnet" {
  type = list(string)
  default = [ "subnet-06b0fdb9ac3cef045" ]
}

variable "private-subnet" {
  type = list(string)
  default = [ "subnet-0cc17070f1ff3b558" ]
}