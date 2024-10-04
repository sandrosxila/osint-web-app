# Use the official OpenJDK 21 slim image as the base
FROM openjdk:21-slim AS build

# Set the working directory
WORKDIR /app

# Install curl, zip
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends curl zip unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Gradle
RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source /root/.sdkman/bin/sdkman-init.sh && sdk install gradle 8.2"

# Copy the Spring Boot project files into the container
COPY . .

# Build the Spring Boot app with Gradle
RUN ./gradlew bootJar

# Stage 2: Create the final image and run the Spring Boot app
FROM openjdk:21-slim

# Set the working directory
WORKDIR /app

# Copy the built Spring Boot JAR from the build stage
COPY --from=build /app/build/libs/osintapp-0.0.1-SNAPSHOT.jar /app/osintapp.jar

# Install Python, Git, theHarvester dependencies, and virtual environment tools
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends python3 python3-pip python3-venv git unzip ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Clone theHarvester repo
RUN git clone https://github.com/laramies/theHarvester.git /app/theHarvester

# Set up a Python virtual environment and activate it
RUN python3 -m venv /app/theHarvester/venv && \
    /app/theHarvester/venv/bin/pip install --upgrade pip && \
    /app/theHarvester/venv/bin/pip install -r /app/theHarvester/requirements/base.txt

# Create a file for json
RUN mkdir -p "theHarvester/output"
RUN touch "theHarvester/output/result.json"

# Expose the port for the Spring Boot application
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/osintapp.jar"]
