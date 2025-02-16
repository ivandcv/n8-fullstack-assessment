# n8-fullstack-assessment

This project is structured to facilitate a full-stack application development environment using Docker. It includes a `docker-compose` file at the root of the project, which orchestrates the setup and running of the database, backend, and frontend servers seamlessly.

## Project Structure

- **/front**: Contains the Vite frontend application. For more details and specific instructions related to the frontend, please refer to the README.md file located in the `/front` folder.
- **/back**: Houses the NestJS backend API. For backend-specific instructions, check out the README.md file in the `/back` folder.
- **database-diagram.png**: Contains the ER diagram for the database. This diagram was generated using pgadmin.

```
employee-management-app/
├── back/
│   ├── src/
│   ├── package.json
│   ├── nest-cli.json
│   ├── api.postman_collection.json
│   └── README.md
├── front/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── docker-compose.yml
├── database-diagram.png
└── README.md
```


## Getting Started with Docker Compose

To start the entire stack (database, backend, and frontend) using Docker Compose, follow these steps:

1. Ensure Docker and Docker Compose are installed on your system.
2. `git clone https://github.com/ivandcv/n8-fullstack-assessment`
3. `cd n8-fullstack-assessment`
4. Run the following command to build and start the containers in the background:
```bash
docker-compose up --build -d
```
5. Bash into the backend container to run the migrations and seed the database:
```bash
docker exec -it back bash
```
6. Run the following commands to run the migrations and seed the database:
```bash
npm run migration:run
```
7. Optional: Import the postman collection at `/back.api.postman-collection.json` to load a few departments and employees in. A pre request script is baked in for departments and employees. Run it a few times and it will load random data into the tables.

To stop and remove the containers, networks, and volumes associated with the stack, you can run:
```bash
docker-compose down
```

## Accessing the Application
- The frontend application will be accessible at http://localhost:8080 (or another port if configured differently in the docker-compose file).
- The backend API can be accessed at http://localhost:3000 (or another port if specified differently in the docker-compose file).

**Note: For specific details about the frontend and backend projects, including available scripts and environment configuration, please refer to the respective README.md files in the /front and /back directories.