#AWS Load Balancer Controller v2.5.0+ requires Kubernetes 1.22+
# Download an IAM policy for the LBC using one of the following commands:
# If your cluster is in any other region:
# curl -o iam-policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.8.1/docs/install/iam_policy.json
# cert-manager kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.12.3/cert-manager.yaml
# Optionally download the default ingressclass and ingressclass params
#wget https://github.com/kubernetes-sigs/aws-load-balancer-controller/releases/download/v2.8.1/v2_8_1_ingclass.yaml

module "iam_assumable_role_with_oidc" {
  source = "terraform-aws-modules/iam/aws//modules/iam-assumable-role-with-oidc"

  create_role                   = true
  role_name                     = "lb-controller-role"
  provider_url                  = module.eks.oidc_provider_url
  oidc_fully_qualified_subjects = ["system:serviceaccount:kube-system:aws-load-balancer-controller"]


}


data "http" "iam_policy" {
  url = "https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.8.1/docs/install/iam_policy.json"
}

resource "aws_iam_role_policy" "lb_controller" {
  name_prefix = "AWSLoadBalancerControllerIAMPolicy"
  policy      = data.http.iam_policy.body
  role        = module.iam_assumable_role_alb_controller.iam_role_name
}
