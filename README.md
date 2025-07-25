# 🏠 Property Manager App

A simple and responsive property management system built with **Vue 3**, **TypeScript**, **Pinia**, and **Tailwind CSS**.

---

## 🚀 Setup Instructions

### ✅ Requirements

Before getting started, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v20 or later)
-   [pnpm](https://pnpm.io/) (recommended)

---

### 📦 Install Dependencies

Install all project dependencies by running:

```bash
pnpm install
pnpm dev
```

The application will be available at: http://localhost:5173

---

### 🧪 Run tests

```bash
pnpm test
```

## Project Overview

```bash
.
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, SVGs
│ ├── components
│ ├── interfaces
│ ├── router
│ ├── scss
│ ├── services
│ ├── stores
│ ├── utils
│ ├── views
│ ├── App.vue # Root component
│ └── main.js
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── index.html
```

## 📝 Assumptions & Additional Features

This project includes some enhancements beyond the core requirements:

-   **Form Validation**

    -   Required fields (e.g., `address`, `description`) are validated before submission.
    -   Users receive immediate feedback for missing or invalid input.

-   **Global Toast Notification System**

    -   Implemented using a global Pinia store.
    -   Supports `success`, `error`, and `info` types.
    -   Automatically shown on add, update, or delete actions.
    -   Toasts auto-dismiss or can be manually closed.

-   **Store & Component Testing**
    -   Tests implemented for modal behaviour, toast logic, and property store actions (`add`, `update`, `remove`).
