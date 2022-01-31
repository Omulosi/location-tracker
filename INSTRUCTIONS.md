<!-- ABOUT THE PROJECT -->

# Speed Monitoring Application

### Built With

The project is divided is divided into the following modules:

- Client/Fronted (User interface display)
- Server/Backed (receives, process and stores data from a remote tracker)
- Test - contains code to simulate a tracker device in operation

Technologies and tools used on the Frontend:

- [JavaScript]() - Programming language
- [NodeJs]() - JavaScript runtime that makes it possible to run JavaScript code in non-browser environments.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

Technologies and tools used on the Backend:

- [Python]() - Programming language
- [Django](https://www.djangoproject.com/) - A Python Web framework for developing web applications
- [Django Rest Framework](https://www.django-rest-framework.org/) - A framework for developing web APIs
- [Django Channels](https://channels.readthedocs.io/en/stable/) - A Django extension that adds to it the capability to handle web sockets

Other technologies and tools used

- [Visual Studio Code](https://code.visualstudio.com/) - Code editor
- [Docker](https://www.docker.com/) - A tool to containerize/virtualize an application. Each module has been containerized as a separate service using the `docker-compose.yml` file.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

It is assumed that the following technologies are already installed in your system:

- docker
- docker-compose
- nodejs

### Running the application

Each of the separate modules that consist the entire application i.e (client, server and test) have been containerized using docker. (Configuration settings found in the `docker-compose.yml` file).

To start the application, simply run the follwing command on the terminal. Ensure you are on the root of the `location-tracker-project` folder.

```
$ docker-compose up
```

To access the client/Frontend, go to this URL: http://localhost:3000/
To access the Admin interface for the backed, go to this URL: http://localhost:8000/admin
To access the test page for simulating tracker, go to this URL: http://127.0.0.1:5000/

Login Details (for both frontend UI and Admin interface):
**email**: admin@admin.com
**password**: password
