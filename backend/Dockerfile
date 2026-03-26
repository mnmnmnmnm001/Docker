#1: Build / Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

#Copy dependency manifests first (leverages layer cache)
COPY package*.json ./

#Install production dependencies only
RUN npm ci --omit=dev

#2: Production image
FROM node:18-alpine

LABEL maintainer="Group 4"
LABEL description="Task Manager Backend API"

#Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

#Copy installed modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

#Copy application source
COPY . .

#Set ownership
RUN chown -R appuser:appgroup /app

#Switch to non-root user
USER appuser

#Expose API port
EXPOSE 5000

#Health check instruction
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

#Start the application
CMD ["node", "server.js"]