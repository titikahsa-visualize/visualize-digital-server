import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Lead', leadSchema);
