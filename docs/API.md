# VideoProConnect API Documentation

This document provides detailed information about the VideoProConnect API endpoints, request/response formats, and authentication requirements.

## Base URL

All API endpoints are relative to the base URL:

```
https://api.videoproconnect.com/api
```

For local development:

```
http://localhost:5000/api
```

## Authentication

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### Register User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "123-456-7890",
    "role": "client" // or "videographer"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "role": "client",
      "token": "jwt_token_here"
    }
  }
  ```

#### Login User

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "client",
      "token": "jwt_token_here"
    }
  }
  ```

#### Get Current User

- **URL**: `/auth/me`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "role": "client"
    }
  }
  ```

### Videographers

#### Get All Videographers

- **URL**: `/videographers`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**:
  - `location`: City or state
  - `specialization`: Type of videography (e.g., "Sports", "Football")
  - `minRate`: Minimum hourly rate
  - `maxRate`: Maximum hourly rate
  - `page`: Page number (default: 1)
  - `limit`: Results per page (default: 10)
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "count": 2,
    "pagination": {
      "current": 1,
      "total": 1
    },
    "data": [
      {
        "_id": "60d0fe4f5311236168a109ce",
        "user": {
          "_id": "60d0fe4f5311236168a109ca",
          "name": "John Doe",
          "profileImage": "https://randomuser.me/api/portraits/men/1.jpg"
        },
        "specializations": ["Sports", "Football", "Basketball"],
        "hourlyRate": 100,
        "location": {
          "city": "New York",
          "state": "NY"
        },
        "rating": 4.8,
        "reviewCount": 24
      },
      {
        "_id": "60d0fe4f5311236168a109cf",
        "user": {
          "_id": "60d0fe4f5311236168a109cb",
          "name": "Jane Smith",
          "profileImage": "https://randomuser.me/api/portraits/women/1.jpg"
        },
        "specializations": ["Sports", "Soccer", "Event"],
        "hourlyRate": 85,
        "location": {
          "city": "Los Angeles",
          "state": "CA"
        },
        "rating": 4.5,
        "reviewCount": 18
      }
    ]
  }
  ```

#### Get Videographer by ID

- **URL**: `/videographers/:id`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d0fe4f5311236168a109ce",
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "john@example.com",
        "profileImage": "https://randomuser.me/api/portraits/men/1.jpg"
      },
      "bio": "Professional sports videographer with over 10 years of experience...",
      "specializations": ["Sports", "Football", "Basketball", "Soccer"],
      "equipment": [
        "Sony A7S III",
        "DJI Ronin Gimbal",
        "Professional Audio Equipment",
        "Drone - DJI Mavic Pro 2"
      ],
      "hourlyRate": 100,
      "location": {
        "city": "New York",
        "state": "NY",
        "formattedAddress": "123 Main St, New York, NY 10001"
      },
      "portfolio": [
        {
          "_id": "p1",
          "title": "NFL Game Highlights",
          "description": "Highlights from the Giants vs. Eagles game",
          "mediaUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          "thumbnailUrl": "/images/GameFilming-min.jpg",
          "mediaType": "video"
        }
      ],
      "availability": [
        {
          "date": "2023-05-15T00:00:00.000Z",
          "startTime": "09:00",
          "endTime": "17:00",
          "isBooked": false
        }
      ],
      "rating": 4.8,
      "reviewCount": 24,
      "reviews": [
        {
          "_id": "60d0fe4f5311236168a109d2",
          "reviewer": {
            "name": "Mike Johnson",
            "profileImage": "https://randomuser.me/api/portraits/men/2.jpg"
          },
          "rating": 5,
          "comment": "John did an amazing job capturing our football game...",
          "createdAt": "2023-06-20T00:00:00.000Z"
        }
      ]
    }
  }
  ```

#### Create Videographer Profile

- **URL**: `/videographers`
- **Method**: `POST`
- **Auth Required**: Yes (role: videographer)
- **Request Body**:
  ```json
  {
    "bio": "Professional sports videographer with over 10 years of experience...",
    "specializations": ["Sports", "Football", "Basketball"],
    "equipment": [
      "Sony A7S III",
      "DJI Ronin Gimbal",
      "Professional Audio Equipment",
      "Drone - DJI Mavic Pro 2"
    ],
    "hourlyRate": 100,
    "location": {
      "city": "New York",
      "state": "NY",
      "formattedAddress": "123 Main St, New York, NY 10001"
    }
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d0fe4f5311236168a109ce",
      "user": "60d0fe4f5311236168a109ca",
      "bio": "Professional sports videographer with over 10 years of experience...",
      "specializations": ["Sports", "Football", "Basketball"],
      "equipment": [
        "Sony A7S III",
        "DJI Ronin Gimbal",
        "Professional Audio Equipment",
        "Drone - DJI Mavic Pro 2"
      ],
      "hourlyRate": 100,
      "location": {
        "city": "New York",
        "state": "NY",
        "formattedAddress": "123 Main St, New York, NY 10001"
      },
      "portfolio": [],
      "availability": [],
      "rating": 0,
      "reviewCount": 0
    }
  }
  ```

### Bookings

#### Create Booking

- **URL**: `/bookings`
- **Method**: `POST`
- **Auth Required**: Yes (role: client)
- **Request Body**:
  ```json
  {
    "videographerProfile": "60d0fe4f5311236168a109ce",
    "eventType": "Football Game",
    "eventDetails": "High school championship game that needs professional coverage",
    "location": "789 Stadium Way, New York, NY 10001",
    "startTime": "2023-06-15T14:00:00Z",
    "endTime": "2023-06-15T20:00:00Z",
    "specialRequirements": "Need drone footage of the stadium and crowd"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d0fe4f5311236168a109d0",
      "client": "60d0fe4f5311236168a109cc",
      "videographer": "60d0fe4f5311236168a109ca",
      "videographerProfile": "60d0fe4f5311236168a109ce",
      "eventType": "Football Game",
      "eventDetails": "High school championship game that needs professional coverage",
      "location": "789 Stadium Way, New York, NY 10001",
      "startTime": "2023-06-15T14:00:00.000Z",
      "endTime": "2023-06-15T20:00:00.000Z",
      "status": "pending",
      "price": 600,
      "specialRequirements": "Need drone footage of the stadium and crowd",
      "createdAt": "2023-04-03T12:00:00.000Z"
    }
  }
  ```

#### Get All Bookings

- **URL**: `/bookings`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "60d0fe4f5311236168a109d0",
        "eventType": "Football Game",
        "startTime": "2023-06-15T14:00:00.000Z",
        "endTime": "2023-06-15T20:00:00.000Z",
        "location": "789 Stadium Way, New York, NY 10001",
        "status": "confirmed",
        "price": 600,
        "client": {
          "_id": "60d0fe4f5311236168a109cc",
          "name": "Mike Johnson"
        },
        "videographer": {
          "_id": "60d0fe4f5311236168a109ca",
          "name": "John Doe"
        }
      },
      {
        "_id": "60d0fe4f5311236168a109d1",
        "eventType": "Soccer Match",
        "startTime": "2023-06-20T09:00:00.000Z",
        "endTime": "2023-06-20T17:00:00.000Z",
        "location": "123 Soccer Field, Los Angeles, CA 90028",
        "status": "pending",
        "price": 680,
        "client": {
          "_id": "60d0fe4f5311236168a109cd",
          "name": "Sarah Williams"
        },
        "videographer": {
          "_id": "60d0fe4f5311236168a109cb",
          "name": "Jane Smith"
        }
      }
    ]
  }
  ```

### Reviews

#### Create Review

- **URL**: `/reviews`
- **Method**: `POST`
- **Auth Required**: Yes (role: client)
- **Request Body**:
  ```json
  {
    "booking": "60d0fe4f5311236168a109d0",
    "rating": 5,
    "comment": "John did an amazing job capturing our football game. The footage was professional and he delivered it promptly."
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d0fe4f5311236168a109d2",
      "booking": "60d0fe4f5311236168a109d0",
      "reviewer": "60d0fe4f5311236168a109cc",
      "videographer": "60d0fe4f5311236168a109ca",
      "rating": 5,
      "comment": "John did an amazing job capturing our football game. The footage was professional and he delivered it promptly.",
      "createdAt": "2023-04-03T12:00:00.000Z"
    }
  }
  ```

## Error Responses

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:

- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Not authorized to access the resource
- `404 Not Found`: Resource not found
- `500 Server Error`: Internal server error
