# Google Cloud Run Deployment Plan

This document outlines the strategy for containerizing and deploying "System: Ascension" to Google Cloud Run.

## 1. Containerization Strategy

We will use a **multi-stage Docker build** to optimize the image size.
1.  **Build Stage**: Uses a Node.js image to install dependencies and build the static assets (Vite build).
2.  **Serve Stage**: Uses a lightweight Nginx image to serve the static files generated in the build stage.

### Proposed `Dockerfile`

```dockerfile
# Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config if needed for SPA routing (React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

### Proposed `.dockerignore`

```text
node_modules
dist
.git
.env.local
```

## 2. Nginx Configuration (Optional but Recommended)

Since this is a Single Page Application (SPA), we need to ensure all routes redirect to `index.html` so React Router can handle them.

### Proposed `nginx.conf`

```nginx
server {
    listen 8080;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

## 3. Deployment Steps

### Prerequisites
*   Google Cloud Project created.
*   Billing enabled.
*   Artifact Registry API and Cloud Run API enabled.
*   `gcloud` CLI installed and authenticated.

### Commands

1.  **Initialize gcloud (if not done):**
    ```bash
    gcloud init
    ```

2.  **Set Project:**
    ```bash
    gcloud config set project [PROJECT_ID]
    ```

3.  **Build and Submit Image:**
    We will use Cloud Build to build the image and push it to Google Container Registry (GCR) or Artifact Registry.
    ```bash
    gcloud builds submit --tag gcr.io/[PROJECT_ID]/system-ascension .
    ```

4.  **Deploy to Cloud Run:**
    ```bash
    gcloud run deploy system-ascension \
      --image gcr.io/[PROJECT_ID]/system-ascension \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
    ```

## 4. Next Steps
1.  Create `Dockerfile` in the project root.
2.  Create `.dockerignore` in the project root.
3.  Create `nginx.conf` in the project root.
4.  Run the deployment commands.
