# Expense Tracker API

A RESTful API for managing personal expenses and income, built with Node.js, Express, and Prisma ORM with SQL Server.

## Features

- User authentication (register, login)
- User management
- Category management for expenses/income
- Secure API with JWT authentication
- Database persistence with Prisma ORM

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQL Server with Prisma ORM
- **Authentication:** JWT, bcryptjs
- **Language:** TypeScript

## Prerequisites

- Node.js (v18 or higher recommended)
- SQL Server database
- NPM

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

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login to get access token

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

## Project Structure

```
expense-tracker-api/
├── src/
│   ├── config/       # Configuration files
│   ├── middleware/   # Express middleware
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── app.ts        # Main application file
├── prisma/
│   └── schema.prisma # Database schema
├── .env.example      # Example environment variables
└── package.json      # Project dependencies
```
