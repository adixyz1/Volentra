
# Volentra — Smart Resource Allocation Platform

**Data-Driven Volunteer Coordination for Social Impact**

Volentra is a centralized NGO/volunteer management platform designed to aggregate community issue reports, prioritize urgent needs, intelligently match volunteers to tasks, and provide real-time operational analytics.

Designed for hackathons and rapid deployment, it features a polished, modern SaaS dashboard with real-time updates and interactive mapping.

## Features

- **📊 Real-time Dashboard:** Built with Socket.io to provide live updates as reports are submitted and tasks are completed.
- **🗺️ Interactive Mapping:** Dual-mode map component. Auto-detects network connectivity to display either a real Leaflet + OpenStreetMap or a beautiful CSS-based interactive heatmap fallback.
- **📱 Responsive UI:** Fully responsive for desktop, tablet, and mobile with a built-in mobile drawer and hamburger menu.
- **📁 Cloud Storage:** Backend configured with Multer and Cloudinary for seamless image uploads in serverless environments.
- **🔑 Secure Auth:** Robust JWT (JSON Web Tokens) based authentication with secure cookie management for persistent sessions and role-based access control.
- **📈 Advanced Analytics:** Embedded Chart.js for data visualization, displaying system statistics and priority breakdown.

## Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Vanilla CSS (Glassmorphism, custom design system, dark mode)
- **Mapping:** window.L / Leaflet (Auto-detects Tile Server connectivity)
- **Charts:** Chart.js
- **Real-time:** Socket.io-client

### Backend
- **Server:** Node.js + Express
- **Real-time:** Socket.io
- **Storage:** Cloudinary (via multer-storage-cloudinary)
- **Database:** In-memory Database (Ready to connect to MongoDB/PostgreSQL)
- **Authentication:** JWT (JSON Web Tokens) with standard cookie-parser middleware

## Getting Started

Because of strict network environments or proxies, you may need to use an NPM mirror to install dependencies.

### 1. Start the Backend API

Open a terminal window and navigate to the `backend` folder:

```bash
cd backend
# Install dependencies (using npm mirror to bypass network blocks)
npm install --registry https://registry.npmmirror.com

# Start the server (runs on port 5000)
node server.js
```

### 2. Start the Frontend Application

Open a second terminal window and navigate to the `frontend` folder:

```bash
cd frontend
# Install dependencies (using npm mirror to bypass network blocks)
npm install --registry https://registry.npmmirror.com

# Start the development server (runs on port 5173)
npm run dev
```

### 3. Log In

Once both servers are running, access the application at **http://localhost:5173/**

Use any of the demo accounts to test the different views:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@ngo.org` | `password` |
| **Volunteer** | `john@vol.org` | `password` |
| **Field Worker** | `mike@field.org` | `password` |

## Troubleshooting

- **Map is blank or grey:** Your network is blocking OpenStreetMap tile servers (`tile.openstreetmap.org`). The application will automatically detect this on the first load and gracefully degrade to a beautiful fallback CSS heatmap. If you still see a grey box, try hard-refreshing (`Ctrl+Shift+R`).
- **Nodemon / Server Errors:** If you see `MODULE_NOT_FOUND`, ensure you successfully ran the `npm install` command. If normal npm fails with `ETIMEDOUT`, always append `--registry https://registry.npmmirror.com` to the command.

## Deployment Guide (Vercel & Render)

This application is architected for a split-deployment model to fully support WebSockets and cloud storage.

1. **Backend (Render):**
   - Create a Web Service on Render pointing to the `backend/` directory.
   - **Environment Variables Required:** `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
2. **Frontend (Vercel):**
   - Import the `frontend/` directory as a Vite project on Vercel.
   - **Environment Variables Required:** `VITE_BACKEND_URL` (set to your Render URL).
   - *Note:* The repository includes a `vercel.json` file to ensure React Router handles SPA routing perfectly without 404 errors.
