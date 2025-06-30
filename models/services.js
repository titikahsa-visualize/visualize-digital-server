import mongoose from 'mongoose';
import slugify from 'slugify';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'performance-marketing',
      'seo-content',
      'social-media-marketing',
      'email-sms-marketing',
      'analytics-cro',
      'web-app-services',
      'strategy-consultant',
      'industry-packages',
      'tools-integrations',
      'client-portal'
    ],
    default: 'performance-marketing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate slug from name
serviceSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Service', serviceSchema);
