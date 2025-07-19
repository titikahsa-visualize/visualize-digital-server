import Portfolio from '../models/Portfolio.js';

// @desc    Get the only portfolio document
// @route   GET /api/portfolio
// @access  Public
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne(); // get the first document
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(updatedPortfolio);
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
