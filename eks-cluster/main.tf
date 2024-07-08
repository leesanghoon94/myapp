module "eks" {
  source       = "./modules"
  cluster_name = "my-cluster"

  # vpc_id = module.vpc.vpc_id

  # private_subnets = module.vpc.private_subnets
  # public_subnets = module.vpc.public_subnets

}
