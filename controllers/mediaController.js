import dotenv from 'dotenv';
dotenv.config();

import Media from '../models/media.js';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import mongoose from 'mongoose';
import { gfs } from '../config/db.js';

// Use memory storage instead of GridFS storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, and PDFs are allowed.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export const uploadMedia = (req, res) => {
  const uploadSingle = upload.single('file');

  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    try {
      // Generate unique filename
      const filename = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname);
      
      // Create GridFS upload stream
      const uploadStream = gfs.openUploadStream(filename, {
        contentType: req.file.mimetype,
        metadata: {
          originalname: req.file.originalname
        }
      });
      
      // Get the file ID before uploading
      const fileId = uploadStream.id;
      
      // Write file to GridFS
      uploadStream.end(req.file.buffer);
      
      // Create file URL for GridFS
      const fileUrl = `/api/service/media/file/${filename}`;      
      // Get media type
      const fileType = req.file.mimetype.split('/')[0];
      let mediaType = 'Document';
      if (fileType === 'image') mediaType = 'Image';
      if (fileType === 'video') mediaType = 'Video';
      
      // Calculate file size
      const fileSizeMB = (req.file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = `${fileSizeMB} MB`;
      
      // Save metadata to the Media model
      const media = new Media({
        name: req.file.originalname,
        url: fileUrl,
        size: sizeStr,
        type: mediaType,
        gridFsId: fileId // Store the GridFS file ID
      });
      
      await media.save();
      
      return res.status(200).json({
        success: true,
        file: {
          id: media._id,
          name: media.name,
          size: media.size,
          type: media.type,
          url: media.url
        }
      });
    } catch (error) {
      console.error('Error saving media:', error);
      return res.status(500).json({
        success: false,
        message: 'Error saving media to database'
      });
    }
  });
};

export const getAllMedia = async (req, res) => {
  try {
    // Get media from database
    const mediaItems = await Media.find().sort({ createdAt: -1 });
    
    const formattedMedia = mediaItems.map(item => ({
      id: item._id,
      name: item.name,
      size: item.size,
      type: item.type,
      url: item.url
    }));
    
    return res.status(200).json({
      success: true,
      media: formattedMedia
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching media from database'
    });
  }
};

// New endpoint to serve files from GridFS
export const getFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Find file by filename
    const files = await gfs.find({ filename: filename }).toArray();
    
    // Check if file exists
    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    // Set content type header
    res.set('Content-Type', files[0].contentType);
    
    // Create read stream
    const readstream = gfs.openDownloadStreamByName(filename);
    
    // Handle stream errors
    readstream.on('error', (err) => {
      console.error('Read stream error:', err);
      return res.status(500).json({
        success: false, 
        message: 'Error reading file stream'
      });
    });
    
    // Pipe file to response
    readstream.pipe(res);
    
  } catch (error) {
    console.error('Error retrieving file:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving file from database'
    });
  }
};

// Add with your other export functions
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the media item first to get GridFS ID
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Delete the file from GridFS
    if (media.gridFsId) {
      try {
        await gfs.delete(new mongoose.Types.ObjectId(media.gridFsId));
      } catch (err) {
        console.error('Error deleting file from GridFS:', err);
        // Continue execution even if file deletion fails
      }
    }

    // Delete the media metadata from the database
    await Media.findByIdAndDelete(id);

    return res.status(200).json({ 
      success: true, 
      message: 'Media deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error deleting media' 
    });
  }
};