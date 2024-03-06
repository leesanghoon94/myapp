resource "aws_cloud9_environment_ec2" "example" {
  instance_type = "t2.micro"
  name          = "cloud9"
  image_id      = "resolve:ssm:/aws/service/cloud9/amis/amazonlinux-2-x86_64"
  connection_type = "CONNECT_SSM"
  subnet_id = module.vpc.public_subnets[0]
  owner_arn = "arn:aws:iam::992382792232:root"

}