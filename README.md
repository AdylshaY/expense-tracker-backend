# Expense Tracker API

A RESTful API for managing personal expenses and income, built with Node.js, Express, and Prisma ORM with SQL Server.

## Features

- User authentication (register, login)
- User profile management
- Category management for expenses/income
- Budget creation and tracking
- Transaction management with categorization
- Secure API with JWT authentication
- Database persistence with Prisma ORM
- API documentation with Swagger UI

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQL Server with Prisma ORM
- **Authentication:** JWT, bcryptjs
- **Security:** Helmet, Express Rate Limiter
- **Documentation:** Swagger/OpenAPI 3.1.0
- **Language:** TypeScript
- **Containerization:** Docker

## Prerequisites

- Node.js (v18 or higher recommended)
- SQL Server database
- NPM
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/AdylshaY/expense-tracker-backend
   cd expense-tracker-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env.development.local` for development
   - Copy `.env.example` to `.env.production.local` for production
   - Update the database connection string and other settings

4. Push the database schema:
   ```
   npm run prisma:push-dev
   ```

## Running the Application

### Development mode
```
npm run dev
```

### Production mode
```
npm run build
npm run start:prod
```

## Docker Support

### Prerequisites
- Docker
- Docker Compose

### Docker Configuration
The application includes a Docker setup for easy deployment:
- `Dockerfile` for containerizing the application
- `docker-compose.yml` for orchestrating the application and database

### Running with Docker

Simply use Docker Compose to start both the application and database:
```
docker-compose up
```

This will automatically build the image (if needed) and start both the application and the SQL Server database in containers.

### Run in detached mode
```
docker-compose up -d
```

### Environment Variables for Docker
When using Docker, you can configure the environment variables in the `docker-compose.yml` file or use environment files.

### Accessing the Containerized Application
The application will be available at:
```
http://localhost:3000
```

### Stopping Docker Containers
```
docker-compose down
```

## API Documentation

The API is fully documented using Swagger/OpenAPI 3.1.0. After starting the application, you can access the interactive documentation at:

```
http://localhost:3000/api-docs
```

This interactive documentation provides:
- Complete details of all API endpoints
- Request and response schemas
- The ability to test API endpoints directly from the browser
- Authentication support for testing protected endpoints

## API Endpoints

### Authentication
- `POST /auth/sign-up` - Register a new user
- `POST /auth/sign-in` - Login to get access token
- `POST /auth/sign-out` - Logout user (requires authentication)

### Users
- `GET /users` - Get all users (requires authentication)
- `GET /users/:id` - Get user by ID (requires authentication)
- `PUT /users/:id` - Update user (requires authentication)
- `DELETE /users/:id` - Delete user (requires authentication)

### Categories
- `GET /categories` - Get all categories for current user (requires authentication)
- `GET /categories/:id` - Get a specific category (requires authentication)
- `POST /categories` - Create a new category (requires authentication)
- `PUT /categories/:id` - Update a category (requires authentication)
- `DELETE /categories/:id` - Delete a category (requires authentication)

### Budgets
- `GET /budgets` - Get all budgets for current user (requires authentication)
- `GET /budgets/:id` - Get a specific budget (requires authentication)
- `POST /budgets` - Create a new budget (requires authentication)
- `PUT /budgets/:id` - Update a budget (requires authentication)
- `DELETE /budgets/:id` - Delete a budget (requires authentication)

### Transactions
- `GET /transactions` - Get all transactions for current user (requires authentication)
- `GET /transactions/:id` - Get a specific transaction (requires authentication)
- `POST /transactions` - Create a new transaction (requires authentication)
- `PUT /transactions/:id` - Update a transaction (requires authentication)
- `DELETE /transactions/:id` - Delete a transaction (requires authentication)

## Project Structure

```
expense-tracker-api/
├── src/
│   ├── config/       # Configuration files
│   │   └── swagger.ts # Swagger configuration
│   │   └── env.ts     # Env configuration 
│   ├── docs/         # API documentation
│   │   └── swagger.yaml # OpenAPI specification
│   ├── lib/          # Library files
│   ├── middleware/   # Express middleware
│   ├── routes/       # API routes
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── category.routes.ts
│   │   ├── budget.routes.ts
│   │   └── transaction.routes.ts
│   ├── services/     # Business logic
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── app.ts        # Main application file
├── prisma/
│   └── schema.prisma # Database schema with User, Category, Budget and Transaction models
├── .env.example      # Example environment variables
├── .env.development.local # Development environment variables
├── .env.production.local  # Production environment variables
├── Dockerfile        # Docker configuration for containerization
├── docker-compose.yml # Docker Compose configuration
└── package.json      # Project dependencies
```
