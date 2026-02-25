# Frontend - Cllient Meeting App

The frontend for the **Cllient Meeting App** is a fast, modern React application built using Vite and MUI.

## 🚀 Tech Stack

- **React**: Core library
- **Vite**: Modern build tool and dev server
- **MUI (Material UI)**: UI component library
- **MUI X Date Pickers**: For scheduling inputs
- **TanStack React Query**: Data fetching and state management
- **GraphQL Request**: Lightweight GraphQL client
- **React Router Dom**: Client-side routing
- **React Hook Form**: Performant form management
- **Day.js**: Date and time manipulation
- **TypeScript**: Static typing

## 🛠️ Project Structure

```text
frontend/
├── src/
│   ├── api/            # API services and custom hooks (using React Query)
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page-level components (Routes)
│   ├── lib/            # Shared libraries/clients
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main application component and routing
│   ├── main.tsx        # Application entry point
│   └── theme.ts        # MUI theme configuration
└── package.json        # Dependencies and scripts
```

## 🚦 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

## 🎨 Theme and Styling

The app uses **Material UI** for a consistent and professional look. Theme overrides and custom tokens are located in `src/theme.ts`.

## 📡 API Integration

API calls are centralized in the `src/api/` directory. We use **TanStack React Query** for efficient caching, synchronization, and error handling.
