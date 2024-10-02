# Use the official OpenJDK 22 slim image as the base
FROM openjdk:22-slim

# Set the working directory
WORKDIR /app

# Install Python, Git, theHarvester dependencies, and virtual environment tools
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends python3 python3-pip python3-venv git curl unzip ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Clone theHarvester repo
RUN git clone https://github.com/laramies/theHarvester.git /app/theHarvester

# Set up a Python virtual environment and activate it
RUN python3 -m venv /app/theHarvester/venv && \
    /app/theHarvester/venv/bin/pip install --upgrade pip && \
    /app/theHarvester/venv/bin/pip install -r /app/theHarvester/requirements/base.txt

# Install Kotlin manually by downloading the latest release from GitHub
RUN curl -LO https://github.com/JetBrains/kotlin/releases/download/v1.9.0/kotlin-compiler-1.9.0.zip && \
    unzip kotlin-compiler-1.9.0.zip -d /usr/local && \
    ln -s /usr/local/kotlinc/bin/kotlinc /usr/local/bin/kotlinc && \
    ln -s /usr/local/kotlinc/bin/kotlin /usr/local/bin/kotlin

# Copy the Spring Boot application JAR to the container
COPY build/libs/osintapp-0.0.1-SNAPSHOT.jar /app/osintapp.jar

# Create a file for json
RUN mkdir -p "theHarvester/output"
RUN touch "theHarvester/output/result.json"

# Expose the port for the Spring Boot application
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/osintapp.jar"]
