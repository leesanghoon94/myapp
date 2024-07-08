# resource "aws_cloud9_environment_ec2" "example" {
#   instance_type = "t2.micro"
#   name          = "cloud9"
#   image_id      = "resolve:ssm:/aws/service/cloud9/amis/amazonlinux-2-x86_64"
#   connection_type = "CONNECT_SSM"
#   subnet_id = module.vpc.private_subnets[0]
#   owner_arn = "arn:aws:iam::992382792232:root"

# }

# data "aws_instance" "cloud9_instance" {
#   filter {
#     name = "tag:aws:cloud9:environment"
#     values = [
#     aws_cloud9_environment_ec2.example.id]
#   }
# }

# output "cloud9_url" {
#   value = "https://${var.region}.console.aws.amazon.com/cloud9/ide/${aws_cloud9_environment_ec2.example.id}"
# }

# variable "region" {
#   default = "ap-northeast-2"
# }