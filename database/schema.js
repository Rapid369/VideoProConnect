/**
 * VideoProConnect Database Schema
 * 
 * This file defines the MongoDB schema for the VideoProConnect application.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['client', 'videographer', 'admin'],
    default: 'client'
  },
  profileImage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Videographer Profile Schema
const videographerProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  specializations: [{
    type: String,
    enum: [
      'Sports', 'Football', 'Basketball', 'Soccer',
      'Wedding', 'Corporate', 'Music Video', 
      'Documentary', 'Commercial', 'Event'
    ]
  }],
  equipment: [{
    type: String
  }],
  hourlyRate: {
    type: Number,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    formattedAddress: {
      type: String
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  portfolio: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    mediaUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  availability: [{
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Booking Schema
const bookingSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videographer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videographerProfile: {
    type: Schema.Types.ObjectId,
    ref: 'VideographerProfile',
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  eventDetails: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true
  },
  specialRequirements: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Review Schema
const reviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videographer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create models
const User = mongoose.model('User', userSchema);
const VideographerProfile = mongoose.model('VideographerProfile', videographerProfileSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  User,
  VideographerProfile,
  Booking,
  Review
};
