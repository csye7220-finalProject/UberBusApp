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
-   Continous Integration is done using Code Build. With each `Git Push` a new Frontend as well as Backend image will get pushed into Docker Hub (Frontend) and AWS Elastic Container Registry (Backend).
-   Continous Deployment is also done using Code Build. This Code Build Pipeline will deploy the application on Kubernetes Cluster by using the updated image from AWS Elastic Container Registry (Backend).
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

## PreReq tools that you need

1. `aws-cli`
2. `git`
3. `terraform`
4. `aws-iam-authenticator`
5. `azure-cli`
6. `metric-server`
7. `Docker`
8. `Apache Benchmark`

## Dependancies

We need [Terraform](https://www.terraform.io/downloads.html)

## Initial set up

Clone the project, and open the Terminal(Linux/Mac) or Git bash(Windows) into the infrastructure directory (aws_terraform & azure_terraform) of the project and run the command:

1. `Terraform init`
2. `Terraform plan`
3. `Terraform apply`

After creation of the EKS as well as Azure Cluster, Run the code build to deploy the backend application on EKS cluster.

Run the following commands to deploy the Frontend code on Azure Kubernetes Cluster.

`terraform output kube_config > c:/Users/vidhi/.kube/config-terraform-aks-demo`

`cp C:/Users/vidhi/.kube/config C:/Users/vidhi/.kube/config.bak`

`cp C:/Users/vidhi/.kube/config-terraform-aks-demo C:/Users/vidhi/.kube/config`

`kubectl apply -f frontend-deployment.yaml`

Access the application on Service IP by running the command
`kubectl get svc`

# Load Testing:

Run the command `ab -n 50000 -c 100 <backend-loadbalancer-dns>:5000/app/getbookings` to create load on backend server.

The above command will auto scale the pods from 1 to >=10 based on the CPU load on Pods.

Check the number of pods using `kubectl get pods`

Check the load on Nodes using `kubectl get hpa`

# Monitoring:

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
