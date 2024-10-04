# Use an official node image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app for production
RUN pnpm run build

# Expose port 3000 (or whatever port your Vite app runs on)
EXPOSE 3000

# Command to run the app
CMD ["pnpm", "run", "dev", "--mode", "production"]
