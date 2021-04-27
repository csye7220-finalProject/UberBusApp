# Uber Bus App

# Team 6

| Name          | Email Address              |
| ------------- | -------------------------- |
| Vidhi Nagda   | nagda.v@northeastern.edu   |
| Leena Daryani | daryani.l@northeastern.edu |

## Introduction:

Uber Bus App is an the modern service that allows users to book a bus between source location and destination location. Users can view the all their bookings as well as cancel any booking .

Frontend of the application is deloyed on Azure K8S Cluster and Backend of the Application is on AWS Elastic Kubernetes Service.

## Scope:

-   Implemented user Authorization using JSON Web Token.
-   The deployment of the terraform scripts would automate the creation of Kubernetes cluster on Azure as well as AWS.
-   Continous Integration is done using Code Build. With each `Git Push` a new Frontend as well as Backend image will get pushed into Docker Hub (Frontend) and AWS Elastic Container Registry (Backend) after running the Python Unit Test Cases Successfully .
-   Continous Delivery is also done using Code Build. This Code Build Pipeline will deploy the application on Kubernetes Cluster by using the updated image from AWS Elastic Container Registry (Backend).
-   Pod AutoScaling is achieved using Horizontal Pod Autoscaler which would create the pod replicas between 1 - 10 pods based on the target CPU utilization (50%).
-   Load testing to check the autoscaling of the pods is done using Apace Benchmark.
-   Monitoring of the metrics like CPU Utilization and Memory Usage is done using Prometheus and Graffana.

## Features:

Application Features

1. User can create an account (sign-up)
2. Login into the Uber-app as a User or Admin.
3. User can book a bus
4. User can view all bookings.
5. User can cancel a booking.
6. Admin can Add Buses.
7. Admin can view all buses.
8. Admin can view all bookings.
9. Admin can delete a bus.
10. Admin can cancel a user booking.

## Infrastructure:

The project has the following components:

### Components:

    - Frontend:
    -   1. React JS
    -   2. Nginx server
    - Backend:
    -   1. Python
    -   2. Gunicorn Server
    - Database:
    -   1. MongoDB

Application Deployment

1. Terraform to provision infrastructure

### PreReq tools that you need

1. `aws-cli`
2. `git`
3. `terraform`
4. `aws-iam-authenticator`
5. `azure-cli`
6. `metric-server`
7. `Docker`
8. `Apache Benchmark`

### Dependancies

We need [Terraform](https://www.terraform.io/downloads.html)

### Project set-up:

#### Project Repository:

Oraganization: https://github.com/csye7220-finalProject has two Repos:

UberBusApp

-   contains Uber Frontend
-   Uber Backend
-   Azure Terraform
-   AWS Terraform
-   Buildspec.yml ( FOR CONTINOUS INTEGRATION)

UberAppCICD

-   contains Buildspec.yml (FOR CONTINOUS DELIVERY)
-   Backend-deployment.yml , Frontend-deploymnet.yml (FOR Deployment, Service as well as Monitoring with HPA)
-   Metrics-Server.yml

#### SETUP ON AWS:

Build the 2 roles for CI/CD pipeline: `eks-cd-role` and `flask-react-build-role` using https://github.com/DaryaniLeena/DevopsIAMRolePolicy

#### For Continous Integration & Continous Delivery : [ONE TIME SETUP]

Set up the Code Build Pipeline for Continous Integration by following the below steps:

Within the AWS Console, navigate to the CodeBuild dashboard and click Create Build project.

Name: uber-image-deployment

Description: build and test uber docker images

Build badge: Check the flag to enable

Use GitHub for the Source provider . Select Connect using OAuth , and click Connect to Github and allow access to your GitHub repo for twtr jwt After authenticating, under Repository , select Repository in my GitHub account. Then, add the GitHub repository `csye7220-finalProject\UberBusApp` for this project.

Add source webhook events , when you check Rebuild every time a code change is pushed to this repository , any time code

Under Additional configuration , set the Timeout to 10 minutes and add two environment variables:

AWS_ACCOUNT_ID with your AWS account ID
AWS_REGION us-west-2
dockerhub_password with your dockerhub password
dockerhub_username with your dockerhub username

Environment:
Environment image: use the Managed image
Operating system: Ubuntu
Runtime: Standard
Image: aws/codebuild/standard:4.0
Image version: Always use the latest image for this runtime version
Privileged: check the flag

Service role: Existing Role
Role name: flask-react-build-role

Under Additional configuration: set the Timeout to 10 minutes
Buildspec , Artifacts, and Logs: Under Build specifications , select Use a buildspec
file
Skip the Artifacts section , CloudWatch.

Repeat the above steps with another github Repo `csye7220-finalProject\UberAppCICD` for another code build pipeline for continous delivery and give it a name: `uber-service-deployment` and Service Role as `eks-cd-role`

#### SET UP AWS INFRASTRUCTURE FOR BACKEND:

Clone the project, and open the Terminal(Linux/Mac) or Git bash(Windows) into the infrastructure directory (aws_terraform) of the project and run the command:
`cd UberBusApp\aws_terraform`

`Terraform init`
`Terraform plan`
`Terraform apply`

Once apply is complete , Run the following commands:

`terraform output kubeconfig> ~/.kube/config-terraform-eks-demo`
(After this edit config-terraform-eks-demo remove EOT)

`aws eks update-kubeconfig --name terraform-eks-demo`

`terraform output config_map_aws_auth > config-map-aws-auth.yml`
(After this edit yaml remove EOT and spaces)

`kubectl apply -f config-map-aws-auth.yml`
(This will output configmap/aws-auth created)

Start the `uber-service-deployment` code build pipeline from AWS code build console for deploying backend code to the EKS Cluster.

Run the command `kubectl get svc` and copy the service loadbalancer URL for backed-service and pass this to the frontend code in UberBusApp\uberfrontend\URL.js file so that frontend can call the backend services. Do a new npm run build and commit this code. This would trigger `uber-image-deployment` build on code build and new docker image will be pushed to docker hub for frontend.

#### AZURE SETUP FOR FRONTEND SERVICE:

Clone the project, and open the Terminal(Linux/Mac) or Git bash(Windows) into the infrastructure directory (azure_terraform) of the project and run the command:

`cd UberBusApp\azure_terraform`

`Terraform init`
`Terraform plan`
`Terraform apply`

After creation of the Azure Cluster, Run the code build to deploy the backend application on EKS cluster.

Run the following commands to deploy the Frontend code on Azure Kubernetes Cluster.

`terraform output kube_config > c:/Users/vidhi/.kube/config-terraform-aks-demo`

`cp C:/Users/vidhi/.kube/config C:/Users/vidhi/.kube/config.bak`

`cp C:/Users/vidhi/.kube/config-terraform-aks-demo C:/Users/vidhi/.kube/config`

cd ..

cd ..

cd UberAppCICD

`kubectl apply -f frontend-deployment.yaml`

Access the application on Service IP by running the command
`kubectl get svc`

### Load Testing:

Run the command `ab -n 50000 -c 100 <backend-loadbalancer-dns>:5000/app/getbookings` to create load on backend server.

The above command will auto scale the pods from 1 to >=10 based on the CPU load on Pods.

Check the number of pods using `kubectl get pods`

Check the load on Nodes using `kubectl get hpa`

### Monitoring:

Run the following commands to monitor the metrics

Prometheus

`kubectl create namespace monitoring`

`kubectl create -f clusterRole.yaml`

`kubectl create -f config-map.yaml`

`kubectl create -f prometheus-deployment.yaml --namespace=monitoring`

`kubectl get deployments --namespace=monitoring`

`kubectl get deployments --all-namespaces`

`kubectl create -f prometheus-service.yaml --namespace=monitoring`

`kubectl get svc --namespace=monitoring`

`kubectl get pods --namespace=monitoring`

Grafana

`kubectl create -f grafana-datasource-config.yaml`

`kubectl create -f grafana-datasource-deploy.yaml`

`kubectl create -f grafana-datasource-service.yaml`

`kubectl get svc --namespace=monitoring`

This gives you the URL to access Grafana and Promethus Dashboard.
