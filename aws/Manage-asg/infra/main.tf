terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.39.1"
    }
  }
}

provider "aws" {
  region = "ap-northeast-2"

  default_tags {
    tags = {
      "hashicorp" = "aws-asg"
    }
  }
}
locals {
  key_name = "asdf"
}
data "aws_availability_zones" "available" {
  state = "available"
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"

  name = "main-vpc"
  cidr = "10.0.0.0/16"

  azs = ["ap-northeast-2a", "ap-northeast-2c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
  single_nat_gateway = true
  enable_vpn_gateway = false
  
  enable_dns_hostnames = true
  enable_dns_support = true

}

data "aws_ami" "amazon-liunux" {
  most_recent = true
  owners = ["amazon"]

  filter {
    name = "name"
    values = ["amzn-ami-hvm-*-x86_64-ebs"]
  }
}

resource "aws_launch_template" "name" {
  name = "acg_launch_template"
  image_id = "ami-04599ab1182cd7961"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.inastance.id]
  key_name = local.key_name
  user_data = filebase64("userdata.sh")
  
  # network_interfaces {
  #   associate_public_ip_address = true
  #   delete_on_termination = true
  #   subnet_id = module.vpc.public_subnets[0]

  # }
}


# resource "aws_launch_configuration" "name" {
#   name_prefix = "aws-asg"
#   image_id = data.aws_ami.amazon-liunux.id
#   instance_type = "t2.micro"
#   user_data = file("userdata.sh")
#   security_groups = [aws_security_group.inastance.id]

#   lifecycle {
#     create_before_destroy = true
#   }
# }

resource "aws_autoscaling_group" "asg" {
  name = "asg"
  min_size = 1
  max_size = 3
  desired_capacity = 2
  
  launch_template {
    id = aws_launch_template.name.id
    version = "$Latest"
    
  }
  vpc_zone_identifier = [module.vpc.private_subnets[0], module.vpc.private_subnets[1]]
  health_check_grace_period = 10
  health_check_type = "ELB"

  lifecycle { 
      ignore_changes = [desired_capacity, target_group_arns]
    }
  
  tag {
    key = "Name"
    value = "ec2-tf"
    propagate_at_launch = true
  } 
}

resource "aws_lb" "name" {
  name = "asg-lb"
  internal = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb.id]
  subnets = module.vpc.public_subnets
}

resource "aws_lb_target_group" "name" {
  name = "tf-80"
  port = 80
  protocol = "HTTP"
  
  vpc_id = module.vpc.vpc_id

  health_check {
    path = "/"
    port = 80
  }
}

resource "aws_lb_listener" "name" {
  load_balancer_arn = aws_lb.name.arn
  port = "80"
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.name.arn
  }
}

resource "aws_autoscaling_attachment" "name" {
  autoscaling_group_name = aws_autoscaling_group.asg.id
  lb_target_group_arn = aws_lb_target_group.name.arn

}

resource "aws_security_group" "inastance" {
  name = "ec2-sg"
  vpc_id = module.vpc.vpc_id
  
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
}

resource "aws_security_group" "lb" {
  name = "lb-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
}