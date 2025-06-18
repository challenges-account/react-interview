# React Todo Lists Application

A Todo List application built with React, TypeScript, and TanStack Query. Users can create multiple todo lists, add items to lists, mark items as completed, and delete lists and items.

## Features

- Create and manage multiple todo lists
- Add, complete, and delete todo items within lists
- View todo completion status

## Architecture

- **UI**: Built with Tailwind CSS
- **Error Handling**: API error handling with retries
- **Data Management**: Data fetching with React Query

## Technology Stack

- **React 19**: React framework
- **TypeScript**: Static typing
- **React Router v7**: Client-side routing
- **TanStack Query v5**: Data fetching and state management
- **Axios**: API requests
- **Tailwind CSS v4**: CSS framework
- **Phosphor Icons**: Icon library
- **shadcn/ui**: Component library built on Radix UI
- **Vitest**: Testing framework

## Project Structure

```
src/
├── api/                 # API client and service layer
│   ├── client.ts        # Axios instance
│   ├── queryClient.ts   # Query configuration
│   ├── todoList/        # Todo list services
│   │   └── items/       # Todo list items services
├── components/          # UI components
│   ├── ui/              # Base components
│   └── error-handling/  # Error handling components
├── layouts/             # Layouts
│   └── TodoLists/       # TodoLists layout
├── lib/                 # Utils
├── pages/               # Pages
│   ├── TodoListItems/   # Items page
│   └── TodoLists/       # Lists pages
└── Routes.tsx           # Routes
```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application runs at `http://localhost:5173`.

## Development

### Scripts

- `pnpm dev`: Start dev server
- `pnpm build`: Build for production
- `pnpm typecheck`: Run type checking
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code
- `pnpm test`: Run Vitest tests
- `pnpm test:watch`: Watch Vitest tests

## Error Handling

- Retries for API requests in `queryClient.ts`
- Error messages for users
- Error states in UI
