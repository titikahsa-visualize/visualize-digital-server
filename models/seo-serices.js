import mongoose from 'mongoose';

const seoPackageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true
  },
  features: {
    type: [String], // Array of strings (feature list)
    required: true
  },
  priceType: {
    type: String,
    required: true,
    enum: ['monthly', 'yearly', 'one-time']
  },
  cost: {
    type: Number,
    required: true
  },
  ctaButton: {
    type: String,
    default: 'Get Started',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SEOPackage', seoPackageSchema);
