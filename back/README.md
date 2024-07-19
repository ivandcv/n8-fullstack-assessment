<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Application with TypeORM

This project is a comprehensive backend application built using the [NestJS](https://nestjs.com/) framework, a progressive Node.js framework for building efficient and scalable server-side applications. It leverages TypeScript for writing clean and maintainable code, following several clean code practices.

## Key Features

- **TypeORM Integration**: Utilizes TypeORM as an ORM to interact with a PostgreSQL database, providing support for database transactions, migrations, and more.
- **Clean Code Practices**: Adheres to clean code principles such as Dependency Injection, and the separation of concerns into Controller, Service, and Repository layers. This structure enhances modularity and maintainability.
- **Validation**: Employs TypeScript types for validating entities, ensuring data integrity and reducing runtime errors.
- **Swagger Documentation**: The API is fully documented with Swagger, making it easier to test and integrate for frontend developers.
- **Environment Variables**: Configuration is managed via dotenv, allowing for flexible environment-specific settings without code changes.
- **Logger**: A robust logging mechanism is set up for monitoring and debugging, facilitating easier maintenance and support.
- **High Test Coverage**: Achieves over 80% test coverage through comprehensive unit testing, ensuring the reliability and quality of the application.

## Getting Started

To run this project locally:

```bash
# Running the Database

Start the database at the root folder
$ docker-compose up db

# Install dependencies
$ cd /back
$ npm install

# Set up environment variables
Create a .env.production(or .env.development) file on /back directory and add your environment variables:

DATABASE_HOST=your_db_host
DATABASE_PORT=your_db_port
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name

# Running Migrations

## Run migrations
$ npm run migration:run

# Running the Application

## Development mode
$ npm run start

## Watch mode
$ npm run start:dev

## Production mode
$ npm run build
$ npm run start:prod

# Testing

## Run unit tests
$ npm run test

## Test coverage
$ npm run test:cov
```

## API Documentation

Access the Swagger UI to view and interact with the API documentation by navigating to /api on the running application.