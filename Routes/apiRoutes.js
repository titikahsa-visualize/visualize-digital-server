// routes/serviceRoutes.js
import express from "express";
import {
  getAllServices,
  getServiceBySlug,
  createService,
  deleteService,
} from "../controllers/service.js";

const router = express.Router();
router.get("/", getAllServices);
router.post("/", createService);
// router.get("/:slug", getServiceBySlug);
router.delete("/:id", deleteService);

export default router;
