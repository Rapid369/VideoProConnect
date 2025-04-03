const express = require('express');
const {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/videographerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getProfiles)
  .post(protect, authorize('videographer', 'admin'), createProfile);

router
  .route('/:id')
  .get(getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

module.exports = router;
