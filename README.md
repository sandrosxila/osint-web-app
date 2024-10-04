# OSINT Web Application

---

Simple OSINT web application based on React-Vite Frontend, Kotlin-Spring Backend, and Mysql Database.

## Requirements

- **node** >= 20
- **npm** >= 10.7
- **pnpm** >= 9
- **openjdk** >= 21
- **gradle** >= 8.10
- **docker** >= 27.2

## Start the app in development mode

### Starting Backend Services
In **dev mode**, the frontend is not containerized. TheHarvester tool lives within the same container where
backend the Spring boot server is located. To start up backend services for backend, we need to build the spring app
and run the docker compose file for dev.
```shell
cd ./osintapp
./gradlew bootJar
cd ..
docker compose -f compose-dev.yaml up
```
### Starting Frontend
To run the frontend app we just navigate to the `osint-clinet` directory and start it in **dev mode**.
```shell
cd ./osint-client
pnpm install
pnpm run dev
```

## Start the app in production mode
To run the app in **prod mode** you just need to use `compose.yml` file after building the spring app. 
```shell
cd ./osintapp
./gradlew bootJar
cd ..
docker compose -f compose.yaml up
```