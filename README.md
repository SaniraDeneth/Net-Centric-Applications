# UniShowcase - MERN Stack Portfolio Platform

## Overview
UniShowcase is a comprehensive MERN (MongoDB, Express, React, Node.js) stack application designed for students to showcase their project portfolios to recruiters.

## Prerequisites
- Node.js (v16+)
- MongoDB (Local instance or MongoDB Atlas)

## Configuration and Sensitive Data (Important)
Before running the application, you must configure the environment variables. **Ensure that you never commit your `.env` files to version control.** The `.gitignore` files are already set up to ignore them.

### Backend Configuration
1. Navigate to the `Backend` directory.
2. Copy the example environment file to create a new `.env` file:
   ```bash
   cd Backend
   cp .env.example .env
   ```
3. Open `.env` and fill in your sensitive credentials:
   - `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/net_centric_app`).
   - `JWT_SECRET`: A secure random string for signing JSON Web Tokens.
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Your Google OAuth2 credentials for authentication.
   - `CLOUDINARY_*`: Cloudinary credentials (required for image uploads).
   - `SMTP_*`: SMTP email configuration for system emails.

### Frontend Configuration
1. Navigate to the `frontend` directory.
2. Copy the example environment file:
   ```bash
   cd frontend
   cp .env.example .env
   ```
3. Open `.env` and configure:
   - `VITE_BACKEND_URL`: URL to the backend server (use `http://localhost:5000` for local development).
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth2 Client ID.

## Database Creation & Seeding
MongoDB creates databases and collections dynamically when data is first inserted, so there is no strict SQL-like schema creation script needed. Ensure your `MONGODB_URI` points to your desired database name.

To initialize the application with an administrative user, we provide a database seeding script. 
Run the following from the `Backend` directory:
```bash
node seedAdmin.js
```
*This will create the default admin account. Please review the script to see the generated credentials and change them after your first login.*

## Running the Application Locally

1. **Start the Backend Server:**
   ```bash
   cd Backend
   npm install
   npm run dev
   ```
   The backend API will start on port 5000 (or the port defined in your `.env`).

2. **Start the Frontend Application:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend application will be accessible at `http://localhost:5173`.

## Deployment Instructions

### 1. Deploying the Backend (e.g., to Vercel or Render)
- Ensure your MongoDB database is hosted on a cloud provider like MongoDB Atlas and allows connections from your deployment server.
- In your hosting provider's dashboard, securely add all the environment variables from your `Backend/.env` file.
- Update the `FRONTEND_URL` environment variable to match the URL where your frontend will be deployed. This is critical for CORS security.
- The project includes a `vercel.json` file for easy deployment to Vercel.

### 2. Deploying the Frontend (e.g., to Vercel or Netlify)
- Set the build command to `npm run build` and the output directory to `dist`.
- In your hosting provider's dashboard, securely add the environment variables from your `frontend/.env` file.
- **CRITICAL:** Make sure `VITE_BACKEND_URL` is updated to point to the live URL of your deployed backend API.
- Deploy the application.