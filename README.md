# Ezy Rent

## Project Overview

**Ezy Rent** is a comprehensive platform for online car booking and rentals. Users can easily browse, book, and manage vehicle rentals, including private cars, buses, and other vehicle types. The platform provides an end-to-end experience, from selecting a vehicle to making secure payments and receiving booking confirmations via email.

The project is built using a **Monorepo Microservices Architecture**, where each service is isolated by its own codebase and dependencies, yet all services are managed in a single repository. This structure enhances modularity, scalability, and maintainability.

---

## Features for Users

- Book various types of vehicles: private cars, buses, and more.
- Real-time booking status tracking.
- Secure online payment system.
- Insurance approval required before booking.
- Receive booking and update notifications via email.
- Social login via Google and Facebook.
- Fast search functionality powered by ElasticSearch.
- User-friendly interface for managing bookings.

---

## Architecture

The project follows a **Monorepo Architecture** with the following structure:

- `apps/` – Contains isolated services:
  - `auth-service`
  - `car-service`
  - `elastic-service`
  - `payment-service`
- `shared/` – Contains shared utilities, DTOs, validation logic, and logging. Published as an internal npm package.
- `nginx/` – Handles reverse proxy and load balancing.
- Root configuration files:
  - Docker, docker-compose (dev and prod)
  - Linting, testing, TypeScript configuration

---

## Technologies Used

### Infrastructure & DevOps

- **Docker** – Containerization of each service with isolated dependencies.
- **Docker Compose** – Manage and run multi-container applications.
- **Nginx** – Reverse proxy and load balancer to distribute traffic across service replicas.
- **MongoDB Replica Set** – High availability and fault tolerance.
- **Redis** – Caching frequent queries and storing temporary data (e.g., verification tokens).
- **Kafka + Zookeeper** – Asynchronous communication between services using producer/consumer pattern.
- **Kafka UI** – Monitoring Kafka events and debugging message flow.
- **Mongo Express GUI** – Browser-based interface to inspect MongoDB data.
- **ElasticSearch** – Fast and efficient search indexing.
- **Kibana** – Visualize and analyze data stored in ElasticSearch.
- **PM2** – Process manager to monitor and manage Node.js services.
- **GitHub Actions** – Automated CI/CD pipeline for testing, linting, building, and deployment.
- **Slack Webhooks & Email Alerts** – Real-time notifications for pipeline success/failure.
- **GitHub Auto Merge** – Automatically merges pull requests when all required checks (tests, lint, type-checks) pass successfully. Sends status notifications to Slack and email.

### Backend Stack

- **Node.js + Express.js** – REST API and core service logic.
- **TypeScript** – Type safety, code structure, and scalability.
- **Zod + DTO Pattern** – Data validation and transformation for incoming/outgoing requests.
- **Express Validator** – Request validation middleware.
- **Multer + AWS S3** – Upload and store documents and images on the cloud.
- **Winston** – Centralized and structured logging.
- **Firebase Authentication** – Secure user authentication using email/password and OAuth.
- **Firebase OAuth (Google/Facebook)** – Social authentication integration.
- **Nodemailer** – Send verification and password reset emails.

### Testing & Quality Assurance

- **Jest** – Unit and integration testing with +85% code coverage.
- **ESLint** – Linting to enforce coding standards.
- **Prettier** – Auto-formatting for code consistency.
- **Husky + lint-staged** – Pre-commit hooks to ensure clean code and prevent pushing errors.

---

## Firebase Email Verification Flow

1. User registers from the frontend.
2. A new account is created using Firebase Authentication.
3. Firebase generates an `idToken` and sends it to the backend.
4. Backend verifies the token and temporarily stores user data in Redis (expires after 10 minutes).
5. A verification email is sent containing a secure token.
6. Once verified, the backend matches the token and moves the user data from Redis to MongoDB.
7. If token mismatch or expiration, data is deleted.

---

## API Documentation

You can preview and test each service's API using Swagger: in docker

- Auth Service: `http://localhost:80/auth/api-docs/auth`
- Car Service: `http://localhost:80/car/api-docs/car`
- Elastic Service: `http://localhost:80/elastic/api-docs/car`
  
- <img width="1306" height="3255" alt="localhost_auth_api-docs_auth_" src="https://github.com/user-attachments/assets/3a9cfb48-b97b-4813-816f-b6c7fca1dcee" />

- <img width="1484" height="3445" alt="localhost_car_api-docs_car_" src="https://github.com/user-attachments/assets/65d84fd4-2af1-48bc-8926-39db9431d34b" />
  
- <img width="1306" height="797" alt="localhost_elastic_api-docs_car_" src="https://github.com/user-attachments/assets/424b02c2-fe97-4e34-9894-d018232296d0" />



---

## Scripts

```json
"scripts": {
  "prepare": "husky install",
  "lint-staged": "lint-staged",
  "lint": "eslint \"apps/**/src/**/*.{ts,js}\"",
  "lint:fix": "eslint \"apps/**/src/**/*.{ts,js}\" --fix",
  "format": "prettier --write \"**/*.{ts,js,json,md}\"",
  "check-format": "prettier --check '**/*.{ts,js,json,md}'",
  "type-check": "tsc --noEmit",
  "build": "tsc",
  "test": "jest --verbose --testTimeout=30000",
  "test:auth": "jest --config ./apps/auth-service/jest.config.ts",
  "test:car": "jest --config ./apps/car-service/jest.config.ts",
  "test:elastic": "jest --config ./apps/elastic-service/jest.config.ts",
  "test:payment": "jest --config ./apps/payment-service/jest.config.ts"
}
```

---

## How to Run the Project

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run in development mode

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### 3. Run in production mode

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4. Build the project

```bash
pnpm build
npm build
```

### 5. Run tests

```bash
pnpm test
npm test
```

---

## Deployment

Deployment is automated using GitHub Actions:

- Validates the codebase using ESLint, Prettier, Jest, and TypeScript.
- Builds Docker images for each service.
- Pushes images to DockerHub.
- Deploys containers to EC2 using `docker-compose`.
- Sends notifications via email and Slack webhook.
- Automatically merges pull requests using GitHub Auto Merge if all checks succeed.

---

> This README is a comprehensive overview of the Ezy Rent system and its components. The structure ensures scalability, testability, and maintainability across all services.

