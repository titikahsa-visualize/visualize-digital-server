// models/media.js
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Image', 'Video', 'Document']
  },
  gridFsId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Media', mediaSchema);