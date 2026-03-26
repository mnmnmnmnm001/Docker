=====================================
  TASKMANAGER - DOCKER DEMO PROJECT
=====================================

A full-stack Task Manager web application fully containerized using Docker and
Docker Compose. The application consists of 4 services:
  - MongoDB 6.0     : Database
  - Node.js/Express : REST API backend
  - React           : Frontend SPA
  - Nginx           : Reverse proxy

SYSTEM REQUIREMENTS
-------------------
  - Docker Desktop >= 24.0  (https://www.docker.com/products/docker-desktop/)
  - Docker Compose >= 2.20
  - OS: Windows 10/11, macOS 12+, or Ubuntu 20.04+
  - RAM: At least 4 GB free
  - Ports: 8080 must be free on your machine

QUICK START
-----------
1. Clone / extract the project folder.

2. Open a terminal in the project root (where docker-compose.yml is located).

3. Build and start all containers:

       docker compose up --build

   First run downloads base images and builds the app (~3-5 minutes).

4. Open your browser and go to:

       http://localhost:8080

5. The app will load with 6 sample tasks pre-seeded in the database.

USEFUL COMMANDS
---------------
  Start in background:       docker compose up -d --build
  View running containers:   docker compose ps
  View all logs:             docker compose logs -f
  View backend logs only:    docker compose logs -f backend
  Stop all containers:       docker compose down
  Stop + delete volumes:     docker compose down -v   (WARNING: deletes data)
  Rebuild a single service:  docker compose build backend

API ENDPOINTS (accessible via http://localhost:8080)
----------------------------------------------------
  GET    /health              Health check (all services)
  GET    /api/tasks           List all tasks (filter: ?status=todo&priority=high)
  GET    /api/tasks/:id       Get a single task
  POST   /api/tasks           Create a new task
  PUT    /api/tasks/:id       Update a task
  DELETE /api/tasks/:id       Delete a task
  GET    /api/stats           Dashboard statistics

ADMIN / CREDENTIALS
-------------------
  No authentication required (demo application).
  MongoDB does not have a password set (development mode).
  To access MongoDB directly:
      docker exec -it taskmanager_mongo mongosh taskmanager

PROJECT STRUCTURE
-----------------
  docker-project/
  ├── docker-compose.yml        Main Compose configuration
  ├── mongo-init.js             Database seed data
  ├── README.txt                This file
  ├── backend/
  │   ├── Dockerfile            Multi-stage Node.js image
  │   ├── package.json
  │   ├── server.js             Express REST API
  │   └── .env
  ├── frontend/
  │   ├── Dockerfile            Multi-stage React + Nginx image
  │   ├── nginx.conf            Nginx config for SPA routing
  │   ├── package.json
  │   └── src/
  │       ├── index.js
  │       └── App.js            Main React component
  └── nginx/
      └── default.conf          Reverse proxy configuration

TROUBLESHOOTING
---------------
  Problem : Port 8080 already in use
  Fix     : Change "8080:80" to "8081:80" in docker-compose.yml

  Problem : Build fails due to network error
  Fix     : Check your internet connection; Docker needs to download base images

  Problem : Frontend shows "Failed to connect to backend"
  Fix     : Wait ~30 seconds for the backend and MongoDB to finish starting,
            then refresh the browser. Use `docker compose logs backend` to check.

  Problem : Old data persists after restarting
  Fix     : Docker named volumes persist across restarts by design.
            Run `docker compose down -v` to wipe the database.