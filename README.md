# Mini_CRM_Frontend

A minimal CRM frontend built with Next.js, React, and Tailwind CSS. This app provides a user interface for authentication and lead management, connecting to the [Mini_CRM_Backend](../Mini_CRM_Backend/).

## Features
- User registration, login, and logout
- JWT-based authentication (via cookies)
- Lead creation, update, deletion, and retrieval
- Responsive UI with Tailwind CSS

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Mini_CRM_Backend](../Mini_CRM_Backend/) running locally or remotely (see backend README for setup)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Mini_CRM_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
   - `NEXT_PUBLIC_API_URL` should point to your backend API base URL (default: `http://localhost:3000`).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000) by default.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## Project Structure
```
Mini_CRM_Frontend/
  src/
    app/           # Next.js app directory (pages, layouts)
    components/    # Reusable UI components
    hooks/         # Custom React hooks
    lib/           # API and utility functions
```

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

## Environment Variables
- `NEXT_PUBLIC_API_URL` — Base URL for backend API (required)

## Backend Setup
You must have the [Mini_CRM_Backend](../Mini_CRM_Backend/) running. See its [README](../Mini_CRM_Backend/README.md) for setup instructions, environment variables, and API details.

## License
ISC
