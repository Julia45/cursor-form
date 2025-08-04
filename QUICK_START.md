# Quick Start Guide

This guide will help you get the React Authentication App running in just a few minutes.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

## Quick Setup (5 minutes)

### 1. Install MongoDB (if not already installed)

**Option A: Local MongoDB**
```bash
# On Ubuntu/Debian
sudo apt-get install mongodb

# On macOS with Homebrew
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb/brew/mongodb-community  # macOS
```

**Option B: Use MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free cluster
- Get your connection string

### 2. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd auth-app

# Setup Backend
cd backend
npm install

# Setup Frontend  
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env with your settings (MongoDB URI, etc.)
```

**Frontend (.env):**
```bash
cd frontend  
cp .env.example .env
# Edit .env with your API URL
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Test the Application

1. **Register a new user:**
   - Name: `John Doe` (letters only)
   - Email: `john@example.com`
   - Password: `SecurePass123!` (must include uppercase, lowercase, number, special char)

2. **Login with the registered user**

3. **View the dashboard** with user information stored in Redux

## Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000` to authorized origins
6. Copy Client ID to both `.env` files

## Troubleshooting

**MongoDB Connection Issues:**
- Make sure MongoDB is running
- Check the connection string in backend/.env
- For Atlas, whitelist your IP address

**Port Already in Use:**
- Backend: Change PORT in backend/.env
- Frontend: It will prompt to use a different port

**Build Issues:**
- Delete node_modules and package-lock.json
- Run `npm install` again
- Make sure you're using Node.js v16+

## Project Features Verified ✅

- [x] User registration with validation
- [x] User login authentication  
- [x] Email validation (proper format)
- [x] Name validation (letters and spaces only)
- [x] Password validation (complex requirements)
- [x] Redux state management for email storage
- [x] MongoDB user storage
- [x] JWT token authentication
- [x] Google OAuth integration (setup required)
- [x] Modern React UI with styled-components
- [x] TypeScript support
- [x] Input sanitization and security

## Need Help?

Check the main README.md for detailed documentation and API endpoints.