// MongoDB initialization script - runs once on first container start
db = db.getSiblingDB('taskmanager');
db.tasks.insertMany([
  {
    title: "Set up Docker environment",
    description: "Install Docker Desktop and Docker Compose on development machine.",
    status: "done",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Write Docker Compose configuration",
    description: "Define all services: MongoDB, backend API, React frontend, and Nginx reverse proxy.",
    status: "done",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Create multi-stage Dockerfiles",
    description: "Implement multi-stage builds to minimize final image sizes for production.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Configure Nginx reverse proxy",
    description: "Route /api requests to Node.js backend and all other requests to the React frontend.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Write unit and integration tests",
    description: "Test all REST API endpoints and verify MongoDB operations are correct.",
    status: "todo",
    priority: "medium",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Deploy to production server",
    description: "Push images to Docker Hub and deploy on a cloud VPS using Docker Compose.",
    status: "todo",
    priority: "low",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
print("Seed data inserted: " + db.tasks.countDocuments() + " tasks");