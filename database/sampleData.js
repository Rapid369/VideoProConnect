/**
 * VideoProConnect Sample Data
 * 
 * This file contains sample data for testing and development purposes.
 */

const bcrypt = require('bcryptjs');

// Sample Users
const users = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '123-456-7890',
    role: 'videographer',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '123-456-7891',
    role: 'videographer',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '123-456-7892',
    role: 'client',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    _id: '60d0fe4f5311236168a109cd',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '123-456-7893',
    role: 'client',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  }
];

// Sample Videographer Profiles
const videographerProfiles = [
  {
    _id: '60d0fe4f5311236168a109ce',
    user: '60d0fe4f5311236168a109ca',
    bio: 'Professional sports videographer with over 10 years of experience specializing in football, basketball, and soccer events. I bring a cinematic approach to every project and ensure high-quality deliverables.',
    specializations: ['Sports', 'Football', 'Basketball', 'Soccer'],
    equipment: [
      'Sony A7S III',
      'DJI Ronin Gimbal',
      'Professional Audio Equipment',
      'Drone - DJI Mavic Pro 2'
    ],
    hourlyRate: 100,
    location: {
      city: 'New York',
      state: 'NY',
      formattedAddress: '123 Main St, New York, NY 10001',
      coordinates: [-74.0060, 40.7128]
    },
    portfolio: [
      {
        title: 'NFL Game Highlights',
        description: 'Highlights from the Giants vs. Eagles game',
        mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/images/GameFilming-min.jpg',
        mediaType: 'video'
      },
      {
        title: 'NBA Basketball Coverage',
        description: 'Full game coverage of Knicks vs. Nets',
        mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/images/cameraman-filming-sporting-event-with-large-crowd-background_950481-5819.jpg',
        mediaType: 'video'
      }
    ],
    availability: [
      {
        date: new Date('2023-05-15'),
        startTime: '09:00',
        endTime: '17:00',
        isBooked: false
      },
      {
        date: new Date('2023-05-16'),
        startTime: '09:00',
        endTime: '17:00',
        isBooked: false
      }
    ],
    rating: 4.8,
    reviewCount: 24
  },
  {
    _id: '60d0fe4f5311236168a109cf',
    user: '60d0fe4f5311236168a109cb',
    bio: 'Experienced videographer specializing in soccer matches and sporting events. I provide high-quality video production services for teams, leagues, and sports organizations.',
    specializations: ['Sports', 'Soccer', 'Event'],
    equipment: [
      'Canon EOS C300 Mark III',
      'Steadicam',
      'Sennheiser Wireless Microphones',
      'DJI Inspire 2 Drone'
    ],
    hourlyRate: 85,
    location: {
      city: 'Los Angeles',
      state: 'CA',
      formattedAddress: '456 Hollywood Blvd, Los Angeles, CA 90028',
      coordinates: [-118.3232, 34.0928]
    },
    portfolio: [
      {
        title: 'MLS Soccer Match',
        description: 'LA Galaxy vs LAFC derby match',
        mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/images/videographer-captures-game-stockcake.jpg',
        mediaType: 'video'
      },
      {
        title: 'High School Football Championship',
        description: 'State championship game coverage',
        mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '/images/live-sports-broadcasting-stockcake.jpg',
        mediaType: 'video'
      }
    ],
    availability: [
      {
        date: new Date('2023-05-15'),
        startTime: '10:00',
        endTime: '18:00',
        isBooked: false
      },
      {
        date: new Date('2023-05-16'),
        startTime: '10:00',
        endTime: '18:00',
        isBooked: false
      }
    ],
    rating: 4.5,
    reviewCount: 18
  }
];

// Sample Bookings
const bookings = [
  {
    _id: '60d0fe4f5311236168a109d0',
    client: '60d0fe4f5311236168a109cc',
    videographer: '60d0fe4f5311236168a109ca',
    videographerProfile: '60d0fe4f5311236168a109ce',
    eventType: 'Football Game',
    eventDetails: 'High school championship game that needs professional coverage',
    location: '789 Stadium Way, New York, NY 10001',
    startTime: new Date('2023-06-15T14:00:00Z'),
    endTime: new Date('2023-06-15T20:00:00Z'),
    status: 'confirmed',
    price: 600,
    specialRequirements: 'Need drone footage of the stadium and crowd'
  },
  {
    _id: '60d0fe4f5311236168a109d1',
    client: '60d0fe4f5311236168a109cd',
    videographer: '60d0fe4f5311236168a109cb',
    videographerProfile: '60d0fe4f5311236168a109cf',
    eventType: 'Soccer Match',
    eventDetails: 'Local soccer club match that needs video coverage',
    location: '123 Soccer Field, Los Angeles, CA 90028',
    startTime: new Date('2023-06-20T09:00:00Z'),
    endTime: new Date('2023-06-20T17:00:00Z'),
    status: 'pending',
    price: 680,
    specialRequirements: 'Focus on individual player highlights'
  }
];

// Sample Reviews
const reviews = [
  {
    _id: '60d0fe4f5311236168a109d2',
    booking: '60d0fe4f5311236168a109d0',
    reviewer: '60d0fe4f5311236168a109cc',
    videographer: '60d0fe4f5311236168a109ca',
    rating: 5,
    comment: 'John did an amazing job capturing our football game. The footage was professional and he delivered it promptly.',
    createdAt: new Date('2023-06-20T00:00:00Z')
  },
  {
    _id: '60d0fe4f5311236168a109d3',
    booking: '60d0fe4f5311236168a109d1',
    reviewer: '60d0fe4f5311236168a109cd',
    videographer: '60d0fe4f5311236168a109cb',
    rating: 4,
    comment: 'Jane provided excellent coverage of our soccer match. The video quality was great and she was very professional.',
    createdAt: new Date('2023-06-25T00:00:00Z')
  }
];

module.exports = {
  users,
  videographerProfiles,
  bookings,
  reviews
};
