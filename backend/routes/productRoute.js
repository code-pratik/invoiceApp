import express from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productController.js';
import { validate } from '../middlewares/validateData.js';
import { Validation } from '../validations/expressReqValidation.js';

const router = express.Router();

router.post("/createProduct",Validation.productValidationRules(), validate,createProduct)
      .get("/getProducts",getProduct)
      .patch("/deleteProduct/:id",deleteProduct)
      .patch("/updateProduct/:id",updateProduct)

export const productRoutes = router