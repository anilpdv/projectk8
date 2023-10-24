
# projectk8

projectk8 is an application for recognizing handwritten digits, translating them, and converting the text to speech.

## Services

The application is comprised of the following microservices:

-   **image-recognition** - Digit image recognition service built with Python, TensorFlow, and Keras
-   **text-translation** - Translation service built with Python and Flask
-   **text-to-speech** - Text-to-speech service built with Python and gTTS

## Architecture

The services communicate via REST APIs and are containerized using Docker and orchestrated on Kubernetes using Minikube. The frontend client provides the user interface and is built with React.

## Running Locally

To run the services locally:

1.  Install dependencies

-   Docker
-   Minikube
-   Node.js

2.  Start Minikube

Copy code

`minikube start`

3.  Build service images

Copy code

`docker build -t {image_name} {service_dir}`

4.  Deploy services to Minikube

Copy code

`kubectl create -f {service_yaml}`

5.  Access services via minikube IP and port
6.  Run frontend client

Copy code

`npm install npm start`

## Future Improvements

-   Add comprehensive testing at unit, integration, and e2e levels
-   Improve error handling and retry logic
-   Performance monitoring and optimization
-   Enhanced security measures including authentication and encryption
