const Review = require('../models/Review');
const Booking = require('../models/Booking');
const VideographerProfile = require('../models/VideographerProfile');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    // Add reviewer to req.body
    req.body.reviewer = req.user.id;

    // Check if booking exists and is completed
    const booking = await Booking.findById(req.body.booking);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot review a booking that is not completed'
      });
    }

    // Check if user is part of the booking
    if (booking.client.toString() !== req.user.id && booking.videographer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to review this booking'
      });
    }

    // Set the reviewed user based on who is creating the review
    if (req.user.id === booking.client.toString()) {
      // Client is reviewing videographer
      req.body.reviewedUser = booking.videographer;
    } else {
      // Videographer is reviewing client
      req.body.reviewedUser = booking.client;
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      booking: req.body.booking,
      reviewer: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this booking'
      });
    }

    // Create review
    const review = await Review.create(req.body);

    // If this is a review for a videographer, update their profile rating
    if (req.user.id === booking.client.toString()) {
      // Get all reviews for this videographer
      const allReviews = await Review.find({ reviewedUser: booking.videographer });
      
      // Calculate average rating
      const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = totalRating / allReviews.length;
      
      // Update videographer profile
      await VideographerProfile.findOneAndUpdate(
        { user: booking.videographer },
        { 
          rating: averageRating,
          reviewCount: allReviews.length
        },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    let query;

    // If user ID is provided, get reviews for that user
    if (req.query.user) {
      query = Review.find({ reviewedUser: req.query.user });
    } else {
      query = Review.find();
    }

    // Populate with user info
    query = query.populate([
      { path: 'reviewer', select: 'name profileImage' },
      { path: 'reviewedUser', select: 'name role' },
      { path: 'booking', select: 'eventType startTime' }
    ]);

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Review.countDocuments(query);

    query = query.skip(startIndex).limit(limit);

    // Sort by date
    query = query.sort('-createdAt');

    // Execute query
    const reviews = await query;

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
      count: reviews.length,
      pagination,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate([
      { path: 'reviewer', select: 'name profileImage' },
      { path: 'reviewedUser', select: 'name role' },
      { path: 'booking', select: 'eventType startTime' }
    ]);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (owner only)
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Make sure user is review owner
    if (review.reviewer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    // Update only rating and comment
    const updateData = {
      rating: req.body.rating || review.rating,
      comment: req.body.comment || review.comment
    };

    review = await Review.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    }).populate([
      { path: 'reviewer', select: 'name profileImage' },
      { path: 'reviewedUser', select: 'name role' },
      { path: 'booking', select: 'eventType startTime' }
    ]);

    // If this is a review for a videographer, update their profile rating
    const booking = await Booking.findById(review.booking);
    
    if (req.user.id === booking.client.toString()) {
      // Get all reviews for this videographer
      const allReviews = await Review.find({ reviewedUser: booking.videographer });
      
      // Calculate average rating
      const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = totalRating / allReviews.length;
      
      // Update videographer profile
      await VideographerProfile.findOneAndUpdate(
        { user: booking.videographer },
        { 
          rating: averageRating,
          reviewCount: allReviews.length
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (owner or admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Make sure user is review owner or admin
    if (review.reviewer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await review.deleteOne();

    // If this was a review for a videographer, update their profile rating
    const booking = await Booking.findById(review.booking);
    
    if (booking && booking.client.toString() === review.reviewer.toString()) {
      // Get all remaining reviews for this videographer
      const allReviews = await Review.find({ reviewedUser: booking.videographer });
      
      // Calculate average rating or set to 0 if no reviews
      let averageRating = 0;
      if (allReviews.length > 0) {
        const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
        averageRating = totalRating / allReviews.length;
      }
      
      // Update videographer profile
      await VideographerProfile.findOneAndUpdate(
        { user: booking.videographer },
        { 
          rating: averageRating,
          reviewCount: allReviews.length
        },
        { new: true }
      );
    }

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
