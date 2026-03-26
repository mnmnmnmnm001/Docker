#1: Build React application
FROM node:18-alpine AS builder

WORKDIR /app

#Copy dependency manifests (cache layer)
COPY package*.json ./
RUN npm ci

#Copy source and build
COPY . .
RUN npm run build

#2: Serve with Nginx
FROM nginx:1.25-alpine

LABEL maintainer="Group 4"
LABEL description="Task Manager Frontend - React SPA served by Nginx"

#Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

#Copy built React app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

#Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]