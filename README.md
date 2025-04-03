# VideoProConnect - Uber for Videographers

VideoProConnect is a platform that connects clients with professional videographers for various events and projects. This application allows videographers to showcase their skills and portfolio, while clients can easily find and book the right videographer for their needs.

## Features

- User authentication (client and videographer roles)
- Videographer profiles with portfolio showcase
- Search and filter videographers by location, specialization, and price
- Booking system with availability calendar
- Review and rating system
- Secure payment processing
- Real-time notifications
- Dashboard for managing bookings and profile

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Bootstrap for UI components
- Axios for API requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
```
git clone <repository-url>
cd videographer-app
```

2. Install backend dependencies
```
cd server
npm install
```

3. Install frontend dependencies
```
cd ../client
npm install
```

4. Create a .env file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/videographer-app
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Running the Application

1. Start the backend server
```
cd server
npm run dev
```

2. Start the frontend development server
```
cd ../client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user profile

### Videographers
- GET /api/videographers - Get all videographers
- GET /api/videographers/:id - Get videographer by ID
- POST /api/videographers - Create videographer profile
- PUT /api/videographers/:id - Update videographer profile
- DELETE /api/videographers/:id - Delete videographer profile

### Bookings
- GET /api/bookings - Get all bookings
- GET /api/bookings/:id - Get booking by ID
- POST /api/bookings - Create a new booking
- PUT /api/bookings/:id - Update booking status
- DELETE /api/bookings/:id - Delete booking (admin only)

### Reviews
- GET /api/reviews - Get all reviews
- GET /api/reviews/:id - Get review by ID
- POST /api/reviews - Create a new review
- PUT /api/reviews/:id - Update review
- DELETE /api/reviews/:id - Delete review

## License

This project is licensed under the MIT License.
