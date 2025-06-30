import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  metaTitle: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // ensure consistency
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['seo', 'marketing', 'technology', 'business']
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Blog', blogSchema);
