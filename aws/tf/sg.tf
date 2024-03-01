resource "aws_security_group" "app" {
  vpc_id = aws_vpc.my-vpc.id
  name = "app-sg"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
  
  tags = {
    "Name" = "app-sg"
  }
}

resource "aws_security_group" "jenkins" {
  vpc_id = aws_vpc.my-vpc.id
  name = "jenkins-sg"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
 
 tags = {
   "Name" = "jenkins-sg"
 }
  
}