import express from "express";
import { convertToInvoice, getInvoices } from "../controllers/invoiceController.js";

const router = express.Router();

router
  .get("/getInvoices", getInvoices)
  .patch("/convertToInvoices/:id",convertToInvoice)


export const inVoicesRoutes = router;
