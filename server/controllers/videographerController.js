const VideographerProfile = require('../models/VideographerProfile');
const User = require('../models/User');

// @desc    Create videographer profile
// @route   POST /api/videographers
// @access  Private (videographers only)
exports.createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await VideographerProfile.findOne({ user: req.user.id });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Profile already exists for this user'
      });
    }

    // Create profile
    const profileData = {
      ...req.body,
      user: req.user.id
    };

    const profile = await VideographerProfile.create(profileData);

    res.status(201).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all videographer profiles
// @route   GET /api/videographers
// @access  Public
exports.getProfiles = async (req, res) => {
  try {
    // Build query
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = VideographerProfile.find(JSON.parse(queryStr)).populate({
      path: 'user',
      select: 'name email profileImage'
    });

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await VideographerProfile.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const profiles = await query;

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
      count: profiles.length,
      pagination,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single videographer profile
// @route   GET /api/videographers/:id
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await VideographerProfile.findById(req.params.id).populate({
      path: 'user',
      select: 'name email profileImage'
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update videographer profile
// @route   PUT /api/videographers/:id
// @access  Private (owner or admin)
exports.updateProfile = async (req, res) => {
  try {
    let profile = await VideographerProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Make sure user is profile owner or admin
    if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    profile = await VideographerProfile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete videographer profile
// @route   DELETE /api/videographers/:id
// @access  Private (owner or admin)
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await VideographerProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Make sure user is profile owner or admin
    if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this profile'
      });
    }

    await profile.deleteOne();

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
