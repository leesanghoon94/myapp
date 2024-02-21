resource "aws_instance" "bastion" {
 ami = "ami-09296805c0d8f0af5"  
 subnet_id = "subnet-0594ea4e486419c91"
 instance_type = "t2.micro"
 security_groups = [aws_security_group.my_ec2_sg.id]
 key_name = local.key_pair_name
 
 
 tags = {
  Name = "bastion"
 }
}

resource "aws_eip" "bastion" {
  instance = aws_instance.bastion.id
  vpc      = true
  tags = {
    Name = "bastion-eip"
  }
}



resource "aws_instance" "privat_ec2" {
  ami = "ami-09296805c0d8f0af5"
  subnet_id = "subnet-07492508e3508802c"
  instance_type = "t2.micro"
  security_groups = [aws_security_group.private_ec2_sg.id]
  key_name = local.key_pair_name

  tags = {
    Name = "private"
  }
}

locals {
  key_pair_name = "asdf"
}