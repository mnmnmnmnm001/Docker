# School Management System (Dockerized)

## Project Overview
This project is a full-stack web application developed for the **Mid-term Assignment**. It illustrates how to leverage **Docker** to simplify deployment and ensure environment consistency between development and production.

### Key Learning Objectives:
* **Containerization:** Bundling an ASP.NET Core 8.0 app and a MySQL database into isolated environments.
* **Orchestration:** Using **Docker Compose** to manage multi-container connectivity.
* **Infrastructure as Code:** Defining networks, volumes, and services in a single YAML file.

## Tech Stack
* **Backend:** C# ASP.NET Core 8.0 (Razor Pages).
* **Database:** MySQL 8.0.
* **ORM:** Entity Framework Core with Pomelo MySQL provider.
* **DevOps:** Docker & Docker Compose.

## How to Run the Project

### Prerequisites
* Docker Desktop (https://www.docker.com/products/docker-desktop/) installed on Windows/Mac/Linux.
* Docker Compose >= 2.20 
* OS: Windows 10/11, macOS 12+, or Ubuntu 20.04+
* RAM: At least 4 GB free
* Ports: 8080 must be free on your machine
* MySQL: installed

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone -b dev https://github.com/mnmnmnmnm001/Docker.git
   ```
2. **Open a terminal in the project root (where docker-compose.yml is located).**
   ```bash
   cd Docker
   cd Docker_Mid_Term
   ```
3. **Build and start all containers:**
   ```bash
   docker compose up --build
   ```
   First run downloads base images and builds the app (~3-5 minutes).
4. **Open your browser and go to:**
   ```bash
   http://localhost:8080
   ```


### TROUBLESHOOTING
  Problem : Port 8080 already in use
  Fix     : Change "8080:80" to "8081:80" in docker-compose.yml

  Problem : Build fails due to network error
  Fix     : Check your internet connection; Docker needs to download base images

  Problem : Frontend shows "Failed to connect to backend"
  Fix     : Wait ~30 seconds for the backend to finish starting,
            then refresh the browser. Use `docker compose logs backend` to check.

  Problem : Old data persists after restarting
  Fix     : Docker named volumes persist across restarts by design.
            Run `docker compose down -v` to wipe the database.
