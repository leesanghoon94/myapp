variable "vpc_id" {
  type = string
  default = "vpc-071c5dfaa1c59a89f"
}

variable "public-subnet" {
  type = list(string)
  default = [ "subnet-0517a869ebf7060e9" ]
}

variable "private-subnet" {
  type = list(string)
  default = [ "subnet-048c3413bbe09e0f2" ]
}