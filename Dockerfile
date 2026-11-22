# 1. Build Stage: compile frontend assets
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests first for optimal Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy application files and generate production build
COPY . .
RUN npm run build

# 2. Production Stage: minimal, lightweight static file server (~25MB)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
