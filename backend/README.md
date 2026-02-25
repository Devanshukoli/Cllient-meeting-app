# Backend - Cllient Meeting App

The backend for the **Cllient Meeting App** is a GraphQL-based API built with Node.js, Express, Apollo Server, and Prisma.

## 🚀 Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **Apollo Server**: GraphQL server integration
- **Prisma**: ORM for database modeling and access
- **MySQL (MariaDB)**: Primary database
- **Redis**: For locking and caching
- **TypeScript**: Typed JavaScript development
- **Zod**: Schema validation
- **JWT & bcrypt**: Authentication and password hashing

## 🛠️ Project Structure

```text
backend/
├── prisma/             # Prisma schema and migrations
├── src/
│   ├── graphql/        # Global GraphQL context and shared types
│   ├── lib/            # Initialization for Prisma and Redis clients
│   ├── modules/        # Domain-driven modules (Auth, Availability, BookingLink)
│   │   ├── [module]/
│   │   │   ├── [module].resolvers.ts
│   │   │   ├── [module].schema.ts
│   │   │   └── [module].service.ts
│   ├── services/       # Shared services across modules
│   ├── utils/          # Helper utilities
│   ├── app.ts          # Express app configuration
│   └── server.ts       # Entry point for the server
└── .env                # Environment variables
```

## ⚙️ Prerequisites

- **Node.js** (v18 or higher recommended)
- **MySQL / MariaDB** server
- **Redis** server

## 🚦 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory and add your configuration:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your_secret_key"
HASH_SALT_ROUNDS=10
PORT=4000
NODE_ENV="development"
```

### 3. Database Setup

Using Prisma to sync the schema with your database:

```bash
# Sync schema
npx prisma db push

# (Optional) Generate prisma client
npx prisma generate
```

### 4. Run the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production
npm run prod
```

The server will be available at `http://localhost:4000/graphql`.

## 📡 GraphQL Endpoints

You can explore the API using the Apollo Sandbox by visiting `http://localhost:4000/graphql` when the server is running.
