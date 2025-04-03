# VideoProConnect Setup Guide

This document provides detailed instructions for setting up the VideoProConnect application for development and production environments.

## Development Environment Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/Rapid369/VideoProConnect.git
cd VideoProConnect
```

2. **Install backend dependencies**

```bash
cd server
npm install
```

3. **Install frontend dependencies**

```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/videographer-app
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

5. **Start the development servers**

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm start
```

The backend API will be available at `http://localhost:5000` and the frontend at `http://localhost:3000`.

## Database Setup

### Local MongoDB Setup

1. **Install MongoDB**

Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/) for your operating system.

2. **Start MongoDB service**

```bash
# On macOS/Linux
sudo service mongod start

# On Windows
net start MongoDB
```

3. **Create the database**

```bash
mongo
> use videographer-app
```

4. **Seed the database with sample data (optional)**

```bash
cd server
npm run seed
```

### MongoDB Atlas Setup (Production)

1. **Create a MongoDB Atlas account**

Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. **Create a new cluster**

Follow the Atlas UI to create a new cluster.

3. **Set up database access**

Create a database user with read/write privileges.

4. **Set up network access**

Add your IP address to the IP whitelist or allow access from anywhere for development.

5. **Get your connection string**

Navigate to "Connect" > "Connect your application" and copy the connection string.

6. **Update your .env file**

Replace the MONGODB_URI with your Atlas connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/videographer-app?retryWrites=true&w=majority
```

## Deployment

### Deploying to Replit

1. **Create a Replit account**

Sign up at [Replit](https://replit.com).

2. **Create a new Repl**

- Click on "Create" or "+" to create a new Repl
- Select "Import from GitHub"
- Enter your repository URL: https://github.com/Rapid369/VideoProConnect
- Click "Import from GitHub"

3. **Configure your Repl**

Create a `.replit` file in the root directory with the following content:

```
language = "nodejs"
run = "cd videographer-app && npm run start"
```

4. **Set up environment variables**

- Click on the lock icon in the left sidebar to open the Secrets panel
- Add your environment variables (MONGODB_URI, JWT_SECRET, etc.)

5. **Run your Repl**

Click the "Run" button at the top of the Replit interface.

### Deploying to Heroku

1. **Create a Heroku account**

Sign up at [Heroku](https://heroku.com).

2. **Install Heroku CLI**

```bash
npm install -g heroku
```

3. **Login to Heroku**

```bash
heroku login
```

4. **Create a new Heroku app**

```bash
heroku create videoproconnect
```

5. **Add MongoDB add-on or configure environment variables**

```bash
# If using Heroku's MongoDB add-on
heroku addons:create mongodb

# Or set environment variables manually
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production
```

6. **Deploy to Heroku**

```bash
git push heroku main
```

7. **Open the app**

```bash
heroku open
```

## Troubleshooting

### Common Issues

1. **MongoDB connection errors**

- Ensure MongoDB service is running
- Check your connection string
- Verify network access settings

2. **Node.js version issues**

- Use nvm to install the correct Node.js version:
  ```bash
  nvm install 14
  nvm use 14
  ```

3. **Port conflicts**

- Change the PORT environment variable if port 5000 is already in use
- For the React app, you can use `PORT=3001 npm start` to run on a different port

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/Rapid369/VideoProConnect/issues) for similar problems
2. Create a new issue with detailed information about your problem
3. Reach out to the project maintainers
