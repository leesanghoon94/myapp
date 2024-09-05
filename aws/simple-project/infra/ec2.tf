resource "aws_instance" "app" {
  ami = "ami-04599ab1182cd7961"
  instance_type = "t2.micro"
  subnet_id = aws_subnet.my-private-subnet-app-a.id
  security_groups = [aws_security_group.app.id]
  iam_instance_profile = "session-manager"
  key_name = local.key_pair_name

  tags = {
    Name = "app"
  }
}

resource "aws_instance" "jenkins" {
  ami = "ami-04599ab1182cd7961"
  instance_type = "t2.large"
  subnet_id = aws_subnet.my-private-subnet-app-a.id
  iam_instance_profile = "session-manager"
  security_groups = [aws_security_group.jenkins.id]
  key_name = local.key_pair_name
  tags = {
    Name = "jenkins"
  }
}

resource "aws_instance" "openvpn" {
  ami = "ami-0ba7b69b8b03f0bf1"
  instance_type = "t2.micro"
  subnet_id = aws_subnet.my-public-subnet-a.id
  security_groups = [ aws_security_group.openvpn.id ]
  key_name = local.key_pair_name
  
  associate_public_ip_address = true
  
  
  tags = {
    "Name" = "openvpn"
  }
}

locals {
  key_pair_name = "asdf"
}