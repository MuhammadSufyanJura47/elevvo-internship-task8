# Task 8 — Job Application Tracker (React) + LocalStorage + Import/Export + Three.js Background

## Introduction
This is **Task 8** of my **Elevvo Front-End Web Development Tasks** series.  
It’s a **Job Application Tracker** (local-first) built with **React + React Router**, designed to help track job applications directly in the browser. The app supports **CRUD operations**, filtering/search, **persistent storage using localStorage**, and **JSON export/import** (with validation + confirmation).

For a modern UI experience, it also includes smooth page transitions using **Framer Motion** and a subtle animated **Three.js background** using **React Three Fiber**.

**Repository:** https://github.com/MuhammadSufyanJura47/elevvo-internship-task8/tree/main

## Key Features / Functions
### 1) Multi‑Page Routing (React Router)
Routes handled in `src/App.jsx`:
- `/` → **Dashboard** (list + stats + filters)
- `/add` → **Add Job** (create new application)
- `/jobs/:id` → **Job Details** (view/edit/delete one application)
- Unknown routes redirect back to `/`

### 2) Local‑First State Management (Context + Reducer)
- Global state is managed using:
  - `JobContext` + `useReducer`
  - reducer actions: **HYDRATE, ADD, UPDATE, DELETE, IMPORT_REPLACE**
- On app load it **hydrates state from localStorage**.
- On every change it **auto-saves to localStorage**.

### 3) CRUD: Create / Read / Update / Delete
- **Create:** Add new application from the Add Job page (generates unique ID + timestamps).
- **Read:** Dashboard displays all applications + details page shows one application.
- **Update:** Edit mode on Job Details page updates `updatedAt`.
- **Delete:** Delete flow uses a confirmation modal, then removes the application and returns to dashboard.

### 4) Dashboard Stats + Search/Filter
Dashboard features:
- Search by **company name** or **job title**
- Filter by status:
  - Applied / Interviewing / Offer / Rejected
- Quick stats cards:
  - Total, Applied, Interviewing, Offers

### 5) Import / Export JSON (Backup & Restore)
From the Navbar:
- **Export:** downloads a JSON file like `job-applications-YYYY-MM-DD.json`
- **Import:** uploads JSON, validates/normalizes it, and asks confirmation before replacing existing data
- Import errors show clear feedback to the user

### 6) UI Enhancements
- **Tailwind CSS** for styling (glass panels + responsive layout)
- **Framer Motion** for smooth route transitions (fade/slide + blur)
- **Three.js background** via `@react-three/fiber` + `@react-three/drei`

## Tech Stack / Tools Used
From `package.json`:
- **React (Vite)**
- **React Router DOM**
- **Tailwind CSS**
- **Framer Motion**
- **Three.js**
- **@react-three/fiber** + **@react-three/drei**

## Notes
This project is front-end only and stores all data locally in the browser (localStorage).
Import/Export is included so users can back up or move their data.
Built to demonstrate routing, reducer-based state, CRUD flows, persistence, validation, and modern UI polish.

✅ Completed as part of the Elevvo internship front-end task set.

## How to Run Locally
```bash
npm install
npm run dev
