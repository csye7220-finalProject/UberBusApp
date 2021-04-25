## To run app on EKS cluster

### To create infrastructure

`terraform plan`

`terraform apply --auto-approve`

-   Extract the value of an output variable from the state file to config-terraform-eks-demo file

`terraform output kubeconfig> ~/.kube/config-terraform-eks-demo`

-   Configures kubectl so that you can connect to an Amazon EKS cluster

`aws eks update-kubeconfig --name terraform-eks-demo`

-   Extract the value of an output variable config_map_aws_auth from the state file to config-map-aws-auth.yml file and then remove extra spaces with EOT
-   `terraform output config_map_aws_auth > config-map-aws-auth.yml`

`kubectl apply -f config-map-aws-auth.yml`

-   check EKS nodes

`kubectl get nodes`

(nodes should be in ready state in about 5 mins)

`cd k8s`

`kubectl apply -f lyrics-frontend-deployment.yml`

`kubectl create -f service-lyrics-frontend-lb.yml`

`kubect get pods`

-   App will work on DNS of load balancer in AWS EC2
