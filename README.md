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

-   The deployment of the terraform scripts would automate the creation of Kubernetes cluster on Azure as well as AWS.
-   Continous Integration is done using Code Build. With each `Git Push` a new Frontend as well as Backend image will get pushed into Docker Hub (Frontend) and AWS Elastic container Service (Backend).
-   Continous Deployment is also done using Code Build. This Code Build Pipeline will deploy the application on Kubernetes Cluster by using the updated image from AWS Elastic container Service (Backend).
-   Pod AutoScaling is achieved using Horizontal Pod Autoscaler which would create the pod replicas between 1 - 10 pods based on the target CPU utilization (50%).
-   Load testing to check the autoscaling of the pods is done using Apace Benchmark.
-   Monitoring of the metrics like CPU Utilization and Memory Usage is done using Prometheus and Graffana.

## Features:

Application Features

1. Login into the Uber-app as a User or Admin
2. User can book a bus
3. User can view all bookings.
4. User can cancel a booking.
5. Admin can Add Buses.
6. Admin can view all buses.
7. Admin can view all bookings.
8. Admin can delete a bus as well as a booking.

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

## Dependancies

We need [Terraform](https://www.terraform.io/downloads.html)

## Initial set up

Clone the project, and open the Terminal(Linux/Mac) or Git bash(Windows) into the infrastructure directory (aws_terraform & azure_terraform) of the project and run the command:

1. `Terraform init`
2. `Terraform plan`
3. `Terraform apply`

After creation of the EKS as well as Azure Cluster, run the code build to deploy the backend application on EKS cluster.
Run the following commands to deploy the Frontend code on Azure Kubernetes Cluster.
` `
` `
