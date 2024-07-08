module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs = ["ap-northeast-2a", "ap-northeast-2c"]
  # private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets = ["10.0.101.0/24", "10.0.102.0/24"]

  # enable_nat_gateway     = true
  # single_nat_gateway     = true
  # one_nat_gateway_per_az = false
  map_public_ip_on_launch = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = 1
    "karpenter.sh/discovery"                      = local.cluster_name
    "karpenter.sh/discovery/${var.cluster_name}"  = "1"
  }

  # private_subnet_tags = {
  # "kubernetes.io/role/internal-elb" = 1
  # }

  tags = {
    "kubernetes.io/cluster/${var.cluster_name}"  = "shared"
    "karpenter.sh/discovery/${var.cluster_name}" = "1"
    Terraform                                    = "true"
  }
}


#NOTE:
#The usage of the specific kubernetes.io/cluster/* , "shared"
#resource tags below are required for EKS and Kubernetes to discover and manage networking resources.
