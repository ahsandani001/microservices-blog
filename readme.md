# Microservices-Blog

This is a very straightforward and simple blog application. It is built using microservices architecture. The application is built using the following technologies:

- Node.js
- Express
- React
- Docker
- Kubernetes
- Skaffold

![Architecture Diagram] ./project-diagram.jpg

## Prerequisites

Make sure you have the following tools installed on your local machine:

- Node.js
- Docker
- Kubernetes (for local development)

## Getting Started

To get the application up and running locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ahsandani001/microservices-blog.git`
2. Navigate to the project directory: `cd microservices-blog`
3. Install dependencies of all services: `npm install`
4. Start the server for all services in separate terminals: `npm run start`
5. Open your browser and visit: `http://localhost:3000`

## Docker and Kubernetes

The application is containerized using Docker and can be deployed to a Kubernetes cluster using Skaffold. To deploy the application, follow these steps:

1. Make sure you have Docker and Kubernetes installed and configured on your machine.
2. Build the Docker image for all services: `docker build -t your-username/{service} .`
3. Deploy the application to Kubernetes using Skaffold: `skaffold dev`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open a GitHub issue or submit a pull request.