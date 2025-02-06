resource "aws_vpc" "asdf" {
  cidr_block = "10.0.0.0/16"

  tags = {
    "Name" = "asdf"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id            = aws_vpc.asdf.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-northeast-2a"
  tags = {
    "Name" = "public-subnet"
  }
}
resource "aws_subnet" "public_2" {
  vpc_id            = aws_vpc.asdf.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-northeast-2c"
  tags = {
    "Name" = "public-subnet"
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.asdf.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "ap-northeast-2a"
  tags = {
    "Name" = "private-subnet"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.asdf.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "ap-northeast-2c"
  tags = {
    "Name" = "private-subnet"
  }
}
