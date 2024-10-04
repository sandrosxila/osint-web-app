# Stage 1: Build the Vite app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the app's source code
COPY . .

# Build the Vite app
RUN pnpm run build

# Stage 2: Serve the built app
FROM nginx:1.25.4-alpine-slim as prod

# Copy the build output to Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf  /etc/nginx/conf.d

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
