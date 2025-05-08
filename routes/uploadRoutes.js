// server/routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const path = require('path');

// Handle single file upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Create URL for the uploaded file
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    return res.status(200).json({ 
      message: 'File uploaded successfully',
      fileUrl: fileUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error uploading file', error });
  }
});

module.exports = router;