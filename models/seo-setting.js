import mongoose from 'mongoose';

const seoSettingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  metaKeywords: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SEOSetting', seoSettingSchema);
