
module "eks" {
  # eks 모듈에서 사용할 변수 정의
  source          = "./modules/eks-cluster"
  cluster_name    = "fast-cluster"
  cluster_version = "1.24"
  vpc_id          = "vpc-032e5c292d54bc0fe"

  private_subnets = [
    "subnet-03828455f12d19d44",
    "subnet-08747d829fe476066",
  ]
  public_subnets = [
    "subnet-0a9345e0ae87c30a6",
    "subnet-0278da1e83ee428c6",
  ]
}

