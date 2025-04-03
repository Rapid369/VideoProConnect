const Booking = require('../models/Booking');
const VideographerProfile = require('../models/VideographerProfile');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (clients only)
exports.createBooking = async (req, res) => {
  try {
    // Add client to req.body
    req.body.client = req.user.id;

    // Check if videographer exists
    const videographer = await User.findById(req.body.videographer);
    if (!videographer || videographer.role !== 'videographer') {
      return res.status(404).json({
        success: false,
        message: 'Videographer not found'
      });
    }

    // Check if videographer profile exists
    const profile = await VideographerProfile.findById(req.body.videographerProfile);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Videographer profile not found'
      });
    }

    // Check if the profile belongs to the videographer
    if (profile.user.toString() !== req.body.videographer) {
      return res.status(400).json({
        success: false,
        message: 'Profile does not belong to this videographer'
      });
    }

    // Create booking
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query;

    // If user is not admin, show only their bookings
    if (req.user.role !== 'admin') {
      if (req.user.role === 'client') {
        query = Booking.find({ client: req.user.id });
      } else if (req.user.role === 'videographer') {
        query = Booking.find({ videographer: req.user.id });
      }
    } else {
      query = Booking.find();
    }

    // Populate with user and profile info
    query = query.populate([
      { path: 'client', select: 'name email profileImage' },
      { path: 'videographer', select: 'name email profileImage' },
      { path: 'videographerProfile', select: 'hourlyRate specializations' }
    ]);

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Booking.countDocuments(query);

    query = query.skip(startIndex).limit(limit);

    // Sort by date
    query = query.sort('-createdAt');

    // Execute query
    const bookings = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      pagination,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate([
      { path: 'client', select: 'name email profileImage' },
      { path: 'videographer', select: 'name email profileImage' },
      { path: 'videographerProfile', select: 'hourlyRate specializations' }
    ]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is booking owner or admin
    if (
      booking.client.toString() !== req.user.id &&
      booking.videographer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check who is updating the booking
    if (req.user.role === 'client' && booking.client.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    if (req.user.role === 'videographer' && booking.videographer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Restrict what fields can be updated based on role
    let updateData = {};
    
    if (req.user.role === 'client') {
      // Clients can only cancel their bookings or update special requirements
      if (req.body.status && req.body.status === 'cancelled') {
        updateData.status = 'cancelled';
      }
      if (req.body.specialRequirements) {
        updateData.specialRequirements = req.body.specialRequirements;
      }
    } else if (req.user.role === 'videographer') {
      // Videographers can confirm, complete or cancel bookings
      if (req.body.status && ['confirmed', 'completed', 'cancelled'].includes(req.body.status)) {
        updateData.status = req.body.status;
      }
    } else if (req.user.role === 'admin') {
      // Admins can update any field
      updateData = req.body;
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private (admin only)
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Only admin can delete bookings
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete bookings'
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
