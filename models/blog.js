import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  featuredImage: { type: String, required: false, trim: true  },
  metaTitle: { type: String, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, required: true, enum: ['SEO', 'Marketing', 'Technology', 'Business'] },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', blogSchema);
