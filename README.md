# VideoProConnect - Uber for Videographers

![VideoProConnect Banner](https://images.unsplash.com/photo-1603123853880-a92fafb7809f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)

VideoProConnect is a platform that connects clients with professional videographers for various events and projects. This application allows videographers to showcase their skills and portfolio, while clients can easily find and book the right videographer for their needs.

## 🎥 Overview

VideoProConnect serves as a marketplace for video production services, focusing on sports, events, and wedding videography. The platform features a sleek, modern interface with dark mode as the default theme for a professional look that appeals to creative professionals.

## ✨ Features

### For Clients
- Browse and search for videographers specializing in sports, events, and weddings
- Filter by location, specialization, price range, and availability
- View detailed videographer profiles with portfolios and reviews
- Book videographers for specific dates and times
- Secure payment processing
- Leave reviews and ratings after project completion
- Track booking status through a personalized dashboard

### For Videographers
- Create professional profiles showcasing specializations and equipment
- Upload portfolio items (photos and videos)
- Set availability calendar and pricing
- Accept or decline booking requests
- Communicate with clients through in-app messaging
- Receive secure payments
- Build reputation through client reviews

### Platform Features
- Dark mode UI (default) with light mode option
- Responsive design for mobile and desktop
- Real-time notifications
- Admin dashboard for platform management
- Analytics and reporting tools

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** with Mongoose - NoSQL database
- **JWT Authentication** - Secure user authentication
- **RESTful API** - API architecture

### Frontend
- **React.js** - UI library
- **Redux** with Redux Toolkit - State management
- **React Router** - Navigation
- **Bootstrap & Custom CSS** - Styling and UI components
- **Axios** - API requests
- **React Icons** - Icon library

### DevOps & Deployment
- **Git & GitHub** - Version control
- **Replit** - Cloud deployment option

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rapid369/VideoProConnect.git
cd videographer-app
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
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
```bash
cd server
npm run dev
```

2. Start the frontend development server
```bash
cd ../client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Deployment on Replit

1. Create a Replit account at [replit.com](https://replit.com)
2. Create a new Repl and select "Import from GitHub"
3. Enter the repository URL: `https://github.com/Rapid369/VideoProConnect.git`
4. Create a `.replit` file in the root directory with:
```
language = "nodejs"
run = "cd videographer-app && npm run start"
```
5. Add environment variables in the Replit Secrets tab
6. Click Run to deploy your application

## 📚 API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Videographers Endpoints
- `GET /api/videographers` - Get all videographers
- `GET /api/videographers/:id` - Get videographer by ID
- `POST /api/videographers` - Create videographer profile
- `PUT /api/videographers/:id` - Update videographer profile
- `DELETE /api/videographers/:id` - Delete videographer profile

### Bookings Endpoints
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking (admin only)

### Reviews Endpoints
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 📱 Screenshots

### Football Game Videography
![Football Videographer](https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80)

### Basketball Game Videography
![Basketball Videographer](https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80)

### Soccer Match Videography
![Soccer Videographer](https://images.unsplash.com/photo-1517927033932-b3d18e61fb21?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Contact

Rapid369 - [GitHub Profile](https://github.com/Rapid369)

Project Link: [https://github.com/Rapid369/VideoProConnect](https://github.com/Rapid369/VideoProConnect)
