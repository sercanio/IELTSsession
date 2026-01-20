# IELTS Session

A React-based application designed to help manage and time IELTS exam sessions. Built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **Timer Management**: dedicated controls for IELTS exam sections.
- **Modern UI**: Styled with Tailwind CSS and accessible components.
- **State Management**: Powered by Zustand for efficient state handling.

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

## Getting Started

You can run this application locally using Node.js or via Docker.

### Prerequisites

- **Node.js** (v22 or later recommended)
- **npm**
- **Docker** & **Docker Compose** (for containerized execution)

---

### 🚀 Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd IELTSsession
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The app will likely be available at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

5.  **Preview the production build:**
    ```bash
    npm run preview
    ```

---

### 🐳 Run with Docker

You can easily run the application using Docker Compose.

#### Using Docker Compose (Recommended)

1.  **Build and start the container:**
    ```bash
    docker-compose up -d --build
    ```

2.  **Access the application:**
    Open your browser and navigate to:
    [http://localhost:8194](http://localhost:8194)

3.  **Stop the container:**
    ```bash
    docker-compose down
    ```

#### Using Docker Manually

If you prefer to build the image manually without Compose:

1.  **Build the Docker image:**
    ```bash
    docker build -t ielts-session .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 8080:80 ielts-session
    ```
    Access the app at `http://localhost:8080`.