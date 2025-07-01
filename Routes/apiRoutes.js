// routes/serviceRoutes.js
import express from "express";
import {
  getAllServices,
  getServiceBySlug,
  updateService,
  createService,
  deleteService,
} from "../controllers/service.js";

import {
  getAllQuotations,
  getQuotationById,
  createQuotation,
  updateQuotation,
  deleteQuotation,
} from '../controllers/leadsQuotationController.js';

const router = express.Router();
router.get("/service/", getAllServices);
router.post("/service/", createService);
router.delete("/service/:id", deleteService);
router.put("/service/:id", updateService);


// quotations and leads 
router.get('/leads-quotations', getAllQuotations);
router.get('/leads-quotations/:id', getQuotationById);
router.post('/leads-quotations', createQuotation);
router.put('/leads-quotations/:id', updateQuotation);
router.delete('/leads-quotations/:id', deleteQuotation);

export default router;
