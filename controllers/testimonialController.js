import Testimonial from '../models/testimonials.js';

// @desc    Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error });
  }
};

// @desc    Get a single testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonial', error });
  }
};

// @desc    Create a new testimonial
export const createTestimonial = async (req, res) => {
  const { name, company, testimonial, rating } = req.body;

  try {
    const newTestimonial = new Testimonial({
      name,
      company,
      testimonial,
      rating
    });

    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create testimonial', error });
  }
};

// @desc    Update an existing testimonial
export const updateTestimonial = async (req, res) => {
  const { name, company, testimonial, rating } = req.body;

  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, company, testimonial, rating },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update testimonial', error });
  }
};

// @desc    Delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete testimonial', error });
  }
};
