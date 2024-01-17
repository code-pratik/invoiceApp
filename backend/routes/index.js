import express from 'express';
import { productRoutes } from './productRoute.js';
import { jobsRoutes } from './jobRoutes.js';
import { inVoicesRoutes } from './invoiceRoute.js';

const router = express.Router();

router.use("/products",productRoutes)
router.use("/jobs",jobsRoutes)
router.use("/invoices",inVoicesRoutes)

export const routes = router