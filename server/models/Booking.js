const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videographerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VideographerProfile',
    required: true
  },
  eventType: {
    type: String,
    required: [true, 'Please specify the event type'],
    enum: [
      'Wedding',
      'Corporate',
      'Music Video',
      'Documentary',
      'Commercial',
      'Event',
      'Real Estate',
      'Sports',
      'Fashion',
      'Other'
    ]
  },
  eventDetails: {
    type: String,
    required: [true, 'Please provide event details']
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  startTime: {
    type: Date,
    required: [true, 'Please specify the start time']
  },
  endTime: {
    type: Date,
    required: [true, 'Please specify the end time']
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
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  specialRequirements: {
    type: String
  },
  deliverables: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
