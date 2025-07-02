import SEOPackage from '../models/seo-serices.js';

// GET all SEO packages
export const getSeoServices = async (req, res) => {
  try {
    const packages = await SEOPackage.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO services', error });
  }
};

// GET single SEO package by ID
export const getSeoServiceById = async (req, res) => {
  try {
    const packageItem = await SEOPackage.findById(req.params.id);
    if (!packageItem) return res.status(404).json({ message: 'SEO service not found' });
    res.status(200).json(packageItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO service', error });
  }
};

// POST create new SEO package
export const createSeoService = async (req, res) => {
  try {
    const newPackage = new SEOPackage(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating SEO service', error });
  }
};

// PUT update existing SEO package
export const updateSeoService = async (req, res) => {
  try {
    const updatedPackage = await SEOPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedPackage) return res.status(404).json({ message: 'SEO service not found' });
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating SEO service', error });
  }
};

// DELETE remove SEO package
export const deleteSeoService = async (req, res) => {
  try {
    const deletedPackage = await SEOPackage.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: 'SEO service not found' });
    res.status(200).json({ message: 'SEO service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting SEO service', error });
  }
};
