module "eks" {
  # eks 모듈에서 사용할 변수 정의
  source          = "./modules/eks-cluster"
  cluster_name    = "fast-cluster"
  cluster_version = "1.24"
  vpc_id          = "vpc-069cc7880ba23710f"

  private_subnets = [
    "subnet-0d11f460cc2bb8e4a",
    "subnet-0cd55b9b175329a66",
  ]
  public_subnets = [
    "subnet-04065f89bf6a64334",
    "subnet-0444c4c95dc9fb633",
  ]
}

