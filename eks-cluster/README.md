│ Error: creating EKS Access Entry (my-cluster:arn:aws:iam::992382792232:role/something): operation error EKS: CreateAccessEntry, https response error StatusCode: 400, RequestID: d8f19198-889c-4c59-91bb-f0a63602fd94, InvalidParameterException: The specified principalArn is invalid: invalid principal.
│
│ with module.eks.module.eks.aws_eks_access_entry.this["example"],
│ on .terraform/modules/eks.eks/main.tf line 191, in resource "aws_eks_access_entry" "this":
│ 191: resource "aws_eks_access_entry" "this" {
│
╵
╷
│ Error: waiting for EKS Node Group (my-cluster:worker-node-2-20240703173548074600000015) create: unexpected state 'CREATE_FAILED', wanted target 'ACTIVE'. last error: subnet-09adb0ad02df7fc24, subnet-07b76fcba55b4330a: Ec2SubnetInvalidConfiguration: One or more Amazon EC2 Subnets of [subnet-09adb0ad02df7fc24, subnet-07b76fcba55b4330a] for node group worker-node-2-20240703173548074600000015 does not automatically assign public IP addresses to instances launched into it. If you want your instances to be assigned a public IP address, then you need to enable auto-assign public IP address for the subnet. See IP addressing in VPC guide: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html#subnet-public-ip
│
│ with module.eks.module.eks.module.eks_managed_node_group["worker-node-2"].aws_eks_node_group.this[0],
│ on .terraform/modules/eks.eks/modules/eks-managed-node-group/main.tf line 385, in resource "aws_eks_node_group" "this":
│ 385: resource "aws_eks_node_group" "this" {
│
╵
╷
│ Error: waiting for EKS Node Group (my-cluster:worker-node-1-20240703173548077900000017) create: unexpected state 'CREATE_FAILED', wanted target 'ACTIVE'. last error: subnet-09adb0ad02df7fc24, subnet-07b76fcba55b4330a: Ec2SubnetInvalidConfiguration: One or more Amazon EC2 Subnets of [subnet-09adb0ad02df7fc24, subnet-07b76fcba55b4330a] for node group worker-node-1-20240703173548077900000017 does not automatically assign public IP addresses to instances launched into it. If you want your instances to be assigned a public IP address, then you need to enable auto-assign public IP address for the subnet. See IP addressing in VPC guide: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html#subnet-public-ip
│
│ with module.eks.module.eks.module.eks_managed_node_group["worker-node-1"].aws_eks_node_group.this[0],
│ on .terraform/modules/eks.eks/modules/eks-managed-node-group/main.tf line 385, in resource "aws_eks_node_group" "this":
│ 385: resource "aws_eks_node_group" "this" {
│

# module.eks.module.eks.aws_eks_access_entry.this["example"] will be created

- resource "aws_eks_access_entry" "this" {
  - access_entry_arn = (known after apply)
  - cluster_name = "my-cluster"
  - created_at = (known after apply)
  - id = (known after apply)
  - kubernetes_groups = (known after apply)
  - modified_at = (known after apply)
  - principal_arn = "arn:aws:iam::992382792232:root/eksview"
  - tags = {
    - "Environment" = "dev"
    - "Terraform" = "true"
      }
  - tags_all = {
    - "Environment" = "dev"
    - "Terraform" = "true"
      }
  - type = "STANDARD"
  - user_name = (known after apply)
    }

# module.eks.module.eks.aws_eks_access_policy_association.this["cluster_creator_admin"] will be created

- resource "aws_eks_access_policy_association" "this" {

  - associated_at = (known after apply)
  - cluster_name = "my-cluster"
  - id = (known after apply)
  - modified_at = (known after apply)
  - policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  - principal_arn = "arn:aws:iam::992382792232:user/admin"

  - access_scope { + type = "cluster"
    }
    }

# module.eks.module.eks.aws_eks_access_policy_association.this["example_example"] will be created

- resource "aws_eks_access_policy_association" "this" {

  - associated_at = (known after apply)
  - cluster_name = "my-cluster"
  - id = (known after apply)
  - modified_at = (known after apply)
  - policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSViewPolicy"
  - principal_arn = "arn:aws:iam::992382792232:root/eksview"

  - access_scope { + type = "cluster"
    }
    }

# module.eks.module.vpc.aws_subnet.public[0] will be updated in-place

instanceprifile

{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "VisualEditor0",
"Effect": "Allow",
"Action": [
"ec2:DescribeInstanceTypeOfferings",
"ec2:DescribeAvailabilityZones",
"ec2:DescribeImages",
"ec2:DescribeSpotPriceHistory",
"ec2:DescribeLaunchTemplates",
"ec2:CreateLaunchTemplate",
"ec2:CreateTags",
"ec2:CreateFleet",
"ec2:DeleteLaunchTemplate",
"ec2:RunInstances",
"ec2:TerminateInstances",
"pricing:GetProducts"
],
"Resource": "\*"
}
]
}

---

````json
{
    "Statement": [
        {
            "Action": [
                "ec2:RunInstances",
                "ec2:CreateFleet"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*::snapshot/*",
                "arn:aws:ec2:*::image/*",
                "arn:aws:ec2:*:*:subnet/*",
                "arn:aws:ec2:*:*:spot-instances-request/*",
                "arn:aws:ec2:*:*:security-group/*",
                "arn:aws:ec2:*:*:launch-template/*"
            ],
            "Sid": "AllowScopedEC2InstanceActions"
        },
        {
            "Action": [
                "ec2:RunInstances",
                "ec2:CreateLaunchTemplate",
                "ec2:CreateFleet"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:RequestTag/kubernetes.io/cluster/my-cluster": "owned"
                },
                "StringLike": {
                    "aws:RequestTag/karpenter.sh/nodepool": "*"
                }
            },
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:volume/*",
                "arn:aws:ec2:*:*:spot-instances-request/*",
                "arn:aws:ec2:*:*:network-interface/*",
                "arn:aws:ec2:*:*:launch-template/*",
                "arn:aws:ec2:*:*:instance/*",
                "arn:aws:ec2:*:*:fleet/*"
            ],
            "Sid": "AllowScopedEC2InstanceActionsWithTags"
        },
        {
            "Action": "ec2:CreateTags",
            "Condition": {
                "StringEquals": {
                    "aws:RequestTag/kubernetes.io/cluster/my-cluster": "owned",
                    "ec2:CreateAction": [
                        "RunInstances",
                        "CreateFleet",
                        "CreateLaunchTemplate"
                    ]
                },
                "StringLike": {
                    "aws:RequestTag/karpenter.sh/nodepool": "*"
                }
            },
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:volume/*",
                "arn:aws:ec2:*:*:spot-instances-request/*",
                "arn:aws:ec2:*:*:network-interface/*",
                "arn:aws:ec2:*:*:launch-template/*",
                "arn:aws:ec2:*:*:instance/*",
                "arn:aws:ec2:*:*:fleet/*"
            ],
            "Sid": "AllowScopedResourceCreationTagging"
        },
        {
            "Action": "ec2:CreateTags",
            "Condition": {
                "ForAllValues:StringEquals": {
                    "aws:TagKeys": [
                        "karpenter.sh/nodeclaim",
                        "Name"
                    ]
                },
                "StringEquals": {
                    "aws:ResourceTag/kubernetes.io/cluster/my-cluster": "owned"
                },
                "StringLike": {
                    "aws:ResourceTag/karpenter.sh/nodepool": "*"
                }
            },
            "Effect": "Allow",
            "Resource": "arn:aws:ec2:*:*:instance/*",
            "Sid": "AllowScopedResourceTagging"
        },
        {
            "Action": [
                "ec2:TerminateInstances",
                "ec2:DeleteLaunchTemplate"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:ResourceTag/kubernetes.io/cluster/my-cluster": "owned"
                },
                "StringLike": {
                    "aws:ResourceTag/karpenter.sh/nodepool": "*"
                }
            },
            "Effect": "Allow",
            "Resource": [
                "arn:aws:ec2:*:*:launch-template/*",
                "arn:aws:ec2:*:*:instance/*"
            ],
            "Sid": "AllowScopedDeletion"
        },
        {
            "Action": [
                "ec2:DescribeSubnets",
                "ec2:DescribeSpotPriceHistory",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeLaunchTemplates",
                "ec2:DescribeInstances",
                "ec2:DescribeInstanceTypes",
                "ec2:DescribeInstanceTypeOfferings",
                "ec2:DescribeImages",
                "ec2:DescribeAvailabilityZones"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:RequestedRegion": "ap-northeast-2"
                }
            },
            "Effect": "Allow",
            "Resource": "*",
            "Sid": "AllowRegionalReadActions"
        },
        {
            "Action": "ssm:GetParameter",
            "Effect": "Allow",
            "Resource": "arn:aws:ssm:ap-northeast-2::parameter/aws/service/*",
            "Sid": "AllowSSMReadActions"
        },
        {
            "Action": "pricing:GetProducts",
            "Effect": "Allow",
            "Resource": "*",
            "Sid": "AllowPricingReadActions"
        },
        {
            "Action": [
                "sqs:ReceiveMessage",
                "sqs:GetQueueUrl",
                "sqs:GetQueueAttributes",
                "sqs:DeleteMessage"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:sqs:ap-northeast-2:992382792232:Karpenter-my-cluster",
            "Sid": "AllowInterruptionQueueActions"
        },
        {
            "Action": "iam:PassRole",
            "Condition": {
                "StringEquals": {
                    "iam:PassedToService": "ec2.amazonaws.com"
                }
            },
            "Effect": "Allow",
            "Resource": "arn:aws:iam::992382792232:role/sex-20240706113415365300000003",
            "Sid": "AllowPassingInstanceRole"
        },
        {
            "Action": "iam:CreateInstanceProfile",
            "Condition": {
                "StringEquals": {
                    "aws:RequestTag/kubernetes.io/cluster/my-cluster": "owned",
                    "aws:RequestTag/topology.kubernetes.io/region": "ap-northeast-2"
                },
                "StringLike": {
                    "aws:RequestTag/karpenter.k8s.aws/ec2nodeclass": "*"
                }
            },
            "Effect": "Allow",
            "Resource": "*",
            "Sid": "AllowScopedInstanceProfileCreationActions"
        },
        {
            "Action": "iam:TagInstanceProfile",
            "Condition": {
                "StringEquals": {
                    "aws:RequestTag/kubernetes.io/cluster/my-cluster": "owned",
                    "aws:ResourceTag/kubernetes.io/cluster/my-cluster": "owned",
                    "aws:ResourceTag/topology.kubernetes.io/region": "ap-northeast-2"
                },
                "StringLike": {
                    "aws:RequestTag/karpenter.k8s.aws/ec2nodeclass": "*",
                    "aws:ResourceTag/karpenter.k8s.aws/ec2nodeclass": "*"
                }
            },
            "Effect": "Allow",
            "Resource": "*",
            "Sid": "AllowScopedInstanceProfileTagActions"
        },
        {
            "Action": [
                "iam:RemoveRoleFromInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:AddRoleToInstanceProfile"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:ResourceTag/kubernetes.io/cluster/my-cluster": "owned",
                    "aws:ResourceTag/topology.kubernetes.io/region": "ap-northeast-2"
                },
                "StringLike": {
                    "aws:ResourceTag/karpenter.k8s.aws/ec2nodeclass": "*"
                }
            },
            "Effect": "Allow",
            "Resource": "*",
            "Sid": "AllowScopedInstanceProfileActions"
        },
        {
            "Action": "iam:GetInstanceProfile",
            "Effect": "Allow",
            "Resource": "*",
            "Sid": "AllowInstanceProfileReadActions"
        },
        {
            "Action": "eks:DescribeCluster",
            "Effect": "Allow",
            "Resource": "arn:aws:eks:ap-northeast-2:992382792232:cluster/my-cluster",
            "Sid": "AllowAPIServerEndpointDiscovery"
        }
    ],
    "Version": "2012-10-17"
}```


 policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ec2:CreateLaunchTemplate",
          "ec2:CreateFleet",
          "ec2:RunInstances",
          "ec2:CreateTags",
          "ec2:TerminateInstances",
          "ec2:DescribeLaunchTemplates",
          "ec2:DescribeInstances",
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:DescribeInstanceTypes",
          "ec2:DescribeInstanceTypeOfferings",
          "ec2:DescribeAvailabilityZones",
          "ssm:GetParameter"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action = [
          "iam:PassRole",
        ]
        Effect   = "Allow"
        Resource = aws_iam_role.karpenter_node.arn
      }
    ]
  })
}
resource "aws_iam_role" "karpenter_node" {
  name = "karpenter-node-${var.cluster_name}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
    "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  ]
}

## Instance profile for nodes to pull images, networking, SSM, etc
resource "aws_iam_instance_profile" "karpenter_node" {
  name = "karpenter-node-${var.cluster_name}"
  role = aws_iam_role.karpenter_node.name
}
````

message":"ec2 api connectivity check failed","commit":"490ef94","error":"AccessDenied: User: arn:aws:sts::992382792232:assumed-role/KarpenterController-2024070717394039650000000d/eks-my-cluster-karpenter--d094f2c0-66bd-4695-8761-96a08fa8f3aa is not authorized to perform: sts:AssumeRole on resource: arn:aws:iam::992382792232:instance-profile/Karpenter-my-cluster-20240707173942407000000014\

---

module.eks.data.aws_eks_cluster_auth.cluster: Read complete after 0s [id=my-cluster]
module.eks.data.aws_eks_cluster.cluster: Read complete after 0s [id=my-cluster]
╷
│ Error: creating IAM Role (KarpenterController-20240708111044279500000001): operation error IAM: CreateRole, https response error StatusCode: 400, RequestID: 97f363a0-687b-463b-8c13-e97d987f9a2c, MalformedPolicyDocument: Federated principals must be valid domain names or SAML metadata ARNs
│
│ with module.eks.module.karpenter.aws_iam_role.controller[0],
│ on .terraform/modules/eks.karpenter/modules/karpenter/main.tf line 68, in resource "aws_iam_role" "controller":
│ 68: resource "aws_iam_role" "controller" {
│
╵
╷
│ Error: Null value found in list
│
│ with module.eks.module.karpenter.data.aws_iam_policy_document.controller[0],
│ on .terraform/modules/eks.karpenter/modules/karpenter/main.tf line 283, in data "aws_iam_policy_document" "controller":
│ 283: resources = ["*"]
│
│ Null values are not allowed for this attribute value.
╵

```hcl

module "karpenter" {
  source       = "terraform-aws-modules/eks/aws//modules/karpenter"
  version      = "20.17.2"
  cluster_name = module.eks.cluster_name

  create_node_iam_role            = false
  create_access_entry             = false
  enable_pod_identity             = true
  create_pod_identity_association = true
  enable_irsa                     = true
  irsa_oidc_provider_arn          = module.eks.oidc_provider_arn

  # Used to attach additional IAM policies to the Karpenter node IAM role
  node_iam_role_additional_policies = {
    AmazonSSMManagedInstanceCore = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  }


}

```
