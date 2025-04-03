const mongoose = require('mongoose');

const VideographerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  specializations: {
    type: [String],
    required: [true, 'Please add at least one specialization'],
    enum: [
      'Wedding',
      'Corporate',
      'Music Video',
      'Documentary',
      'Commercial',
      'Event',
      'Real Estate',
      'Drone',
      'Sports',
      'Fashion',
      'Other'
    ]
  },
  equipment: [{
    type: String,
    required: [true, 'Please add your equipment']
  }],
  hourlyRate: {
    type: Number,
    required: [true, 'Please add your hourly rate']
  },
  portfolio: [{
    title: String,
    description: String,
    mediaUrl: String,
    thumbnailUrl: String,
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    }
  }],
  availability: {
    type: [Date],
    default: []
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('VideographerProfile', VideographerProfileSchema);
