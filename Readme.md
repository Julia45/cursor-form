# React Authentication App with Node.js Backend

A full-stack authentication application built with React.js, Redux, Node.js, Express, and MongoDB. Features user registration, login, and Google OAuth authentication with comprehensive form validation.

## Features

### Frontend (React.js)
- ✅ User registration and login forms
- ✅ Form validation with React Hook Form and Yup
- ✅ Email validation (proper email format)
- ✅ Name validation (letters and spaces only)
- ✅ Password validation (lowercase, uppercase, numbers, special characters)
- ✅ Google OAuth authentication
- ✅ Redux state management for user data
- ✅ Modern, responsive UI with styled-components
- ✅ TypeScript support

### Backend (Node.js/Express)
- ✅ RESTful API endpoints
- ✅ MongoDB integration with Mongoose
- ✅ User registration and login
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Google OAuth verification
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ TypeScript support

## Project Structure

```
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AuthForm/    # Authentication form
│   │   │   └── Dashboard/   # User dashboard
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API and Google Auth services
│   │   ├── store/           # Redux store and slices
│   │   └── utils/           # Validation schemas
│   └── package.json
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Authentication utilities
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google OAuth credentials (for Google authentication)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd auth-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth_app
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_CLIENT_ID=your-google-client-id-here
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### 4. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000` to authorized origins
6. Copy the Client ID to your environment files

### 5. MongoDB Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- The app will connect to `mongodb://localhost:27017/auth_app`

**Option B: MongoDB Atlas**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get the connection string
- Update `MONGODB_URI` in your `.env` file

## Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

### Start the Frontend Application
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/google` | Google OAuth authentication |
| GET | `/api/health` | Health check |

### Request/Response Examples

**Register User:**
```json
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Response
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token"
}
```

## Validation Rules

### Name Validation
- Required field
- Only letters and spaces allowed
- Minimum 2 characters

### Email Validation
- Required field
- Must be a valid email format
- Converted to lowercase

### Password Validation
- Required field
- Minimum 8 characters
- Must contain at least one lowercase letter
- Must contain at least one uppercase letter
- Must contain at least one number
- Must contain at least one special character

## Technologies Used

### Frontend
- React.js 19 with TypeScript
- Redux Toolkit for state management
- React Hook Form for form handling
- Yup for validation schemas
- Styled Components for styling
- Axios for API calls
- Google Auth Library

### Backend
- Node.js with Express.js
- TypeScript
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken for JWT authentication
- Google Auth Library for OAuth
- CORS for cross-origin requests

## Development

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

### Available Scripts

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- Google OAuth integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.