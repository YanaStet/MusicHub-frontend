MusicHub Frontend

![License: MIT (https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript (https://img.shields.io/badge/--blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![React (https://img.shields.io/badge/--20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
![Vite (https://img.shields.io/badge/--646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

A modern web application for discovering, sharing, and interacting with musical notes and compositions. Built with React, Vite, and a strong focus on a great user experience.

!MusicHub Screenshot (https://via.placeholder.com/800x450.png?text=Add+a+Screenshot+of+Your+App+Here)
A brief caption for the screenshot.

✨ Features

- User Authentication: Secure sign-up and login functionality.
- Profile Management: Users can view and edit their profiles.
- Music Note Management: Create, Read, Update, and Delete (CRUD) musical notes.
- Interactive UI: A modern, responsive interface built with shadcn/ui.
- Efficient Data Fetching: Utilizes TanStack Query for robust server-state management.
- File Uploads: Integrated with Cloudinary for handling image and PDF uploads.
- Advanced Filtering: Easily find notes by tags, time signatures, and more.

🛠️ Tech Stack

- Framework: React (https://reactjs.org/)
- Build Tool: Vite (https://vitejs.dev/)
- Language: TypeScript (https://www.typescriptlang.org/)
- Styling: Tailwind CSS (https://tailwindcss.com/) (via shadcn/ui)
- UI Components: shadcn/ui (https://ui.shadcn.com/)
- State Management: TanStack Query (https://tanstack.com/query/latest) for server state
- Routing: React Router DOM (https://reactrouter.com/)
- Linting: ESLint (https://eslint.org/)

🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites

- Node.js (https://nodejs.org/) (v18 or newer recommended)
- npm (https://www.npmjs.com/) (or your package manager of choice)

Installation

1.  Clone the repository:
    1 git clone https://github.com/your-username/musichub-frontend.git
    2 cd musichub-frontend

2.  Install dependencies:
    1 npm install

3.  Set up environment variables:
    Create a .env file in the root of the project and add the necessary environment variables. You can use the .env.example (if you create one) as a template.

1 # Base URL for the backend API
2 VITE_API_BASE_URL=http://localhost:5000/api
3
4 # Cloudinary credentials for file uploads  
 5 VITE_CLOUDINARY_CLOUD_NAME=<YOUR_CLOUD_NAME>
6 VITE_CLOUDINARY_API_KEY=<YOUR_API_KEY>  
 7 VITE_CLOUDINARY_API_SECRET=<YOUR_API_SECRET>

Running the Application

To start the development server, run:

1 npm run dev

The application will be available at http://localhost:5173 (or another port if 5173 is busy).

📜 Available Scripts

In the project directory, you can run:

- npm run dev: Runs the app in development mode.
- npm run build: Builds the app for production to the dist folder.
- npm run lint: Lints the project files using ESLint.
- npm run preview: Serves the production build locally to preview it.
- node scripts/generate-icons.cjs: A custom script to process and generate icon components.

📂 Folder Structure

The project follows a feature-sliced design methodology to keep the codebase organized and scalable.

    1 src/
    2 ├── app/         # Global app setup (Router, Layouts, main entry)
    3 ├── entities/    # Business entities (e.g., Note, Tag) - models, API, hooks
    4 ├── features/    # Pieces of business logic (e.g., Header with auth state)
    5 ├── lib/         # Low-level utility functions, framework agnostic
    6 ├── pages/       # Application pages, composed of features and entities
    7 └── shared/      # Reusable code used across the project (UI kits, assets, utils)
    8     ├── api/     # Base API setup (e.g., Axios instance)
    9     ├── assets/  # SVGs, images, etc.

10 ├── custom-ui/# Custom-built UI components
11 ├── hooks/ # Global reusable hooks
12 ├── shadcn-ui/# Auto-generated shadcn components
13 └── utils/ # Shared utility functions

📄 License

This project is licensed under the MIT License - see the LICENSE.md (LICENSE.md) file for details.

---
