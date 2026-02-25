# Cllient Meeting App

A modern, high-performance meeting scheduler builder (similar to Calendly) built with a focus on speed and developer experience. This project is organized as a monorepo containing both the backend API and the frontend client.

## 📦 Project Structure

- **[backend/](./backend)**: Node.js + GraphQL API with Prisma, MySQL, and Redis.
- **[frontend/](./frontend)**: React + Vite web application styled with Material UI.

## 🛠️ Global Tech Stack

### Backend
- **Core**: Node.js, Express, Apollo Server
- **Database**: MySQL (via Prisma ORM)
- **Concurrency/Locking**: Redis
- **Validation**: Zod
- **Auth**: JWT, bcrypt

### Frontend
- **Core**: React, Vite
- **UI**: Material UI (MUI)
- **State/Data**: TanStack React Query, GraphQL Request
- **Forms**: React Hook Form
- **DateTime**: Day.js

## 🚦 Quick Start

To get the entire project running locally, follow these steps:

### 1. Backend Setup
Navigate to the backend directory, install dependencies, and configure your environment:
```bash
cd backend
npm install
# Configure your .env file (see backend/README.md for details)
npx prisma db push
npm run dev
```

### 2. Frontend Setup
In a new terminal window, navigate to the frontend directory and start the development server:
```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

## 🤝 Contributing

We welcome contributions! Please see our **[CONTRIBUTING.md](./CONTRIBUTING.md)** for guidelines on how to get started.

## 📄 License

This project is licensed under the [MIT](./LICENSE) License.
