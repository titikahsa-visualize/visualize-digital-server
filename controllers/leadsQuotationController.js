import LeadQuotation from "../models/leads-quotation.js"; // Update model name accordingly

export const getAllQuotations = async (req, res) => {
  try {
    const quotations = await LeadQuotation.find();
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getQuotationById = async (req, res) => {
  try {
    const quotation = await LeadQuotation.findById(req.params.id);
    if (!quotation) return res.status(404).json({ message: "Quotation not found" });
    res.json(quotation);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createQuotation = async (req, res) => {
  try {
    const quotation = new LeadQuotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateQuotation = async (req, res) => {
  try {
    const updatedQuotation = await LeadQuotation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedQuotation) return res.status(404).json({ message: "Quotation not found" });
    res.json(updatedQuotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteQuotation = async (req, res) => {
  try {
    await LeadQuotation.findByIdAndDelete(req.params.id);
    res.json({ message: "Quotation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting quotation" });
  }
};
