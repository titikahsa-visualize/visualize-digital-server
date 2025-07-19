import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Our Work"
  },
  description: {
    type: String,
    required: true,
    default: "Discover how we've transformed businesses across industries with innovative digital solutions that drive real results."
  },
  callToActionTitle: {
    type: String,
    required: true,
    default: "Ready to Start Your Project?"
  },
  callToActionDesc: {
    type: String,
    required: true,
    default: "Join our portfolio of successful clients and transform your business with our digital solutions."
  },
  startProjectButton: {
    type: String,
    required: true,
    default: "Start Your Project"
  },
  caseStudyButton: {
    type: String,
    required: true,
    default: "Download Case Studies"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Portfolio', portfolioSchema);
