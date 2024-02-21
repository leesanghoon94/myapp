resource "aws_security_group" "my_ec2_sg" {
  vpc_id = aws_vpc.my-vpc.id
  name = "my_ec2_sg"
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
  
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "my_ec2_sg"
  }
}

resource "aws_security_group" "private_ec2_sg" {
  name = "private_ec2_sg"
  vpc_id = aws_vpc.my-vpc.id
  
  tags = {
    Name = "private_ec2_sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "name1" {
  security_group_id = aws_security_group.private_ec2_sg.id
  cidr_ipv4 = aws_vpc.my-vpc.cidr_block
  from_port = 22
  to_port = 22
  ip_protocol = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "name" {
  security_group_id = aws_security_group.private_ec2_sg.id
  cidr_ipv4 = aws_vpc.my-vpc.cidr_block
  ip_protocol = "tcp"
  from_port = 0
  to_port = 0


}