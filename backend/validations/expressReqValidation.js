import { body } from "express-validator";



const productValidationRules = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is empty")
      .isString()
      .withMessage("pls add string data only")
      .isLength({ min: 2 })
      .withMessage("min length must be 2"),
    body("description")
      .notEmpty()
      .withMessage("pls add description")
      .isString()
      .withMessage("pls add only string")
      .isLength({ min: 2 })
      .withMessage("plz add description atleast 2 characters"),
    body("price")
      .notEmpty()
      .withMessage("pls add price")
      .isNumeric()
      .withMessage("Price must be number"),
  ];
};


const jobValidationRules = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is empty")
      .isString()
      .withMessage("pls add string data only")
      .isLength({ min: 2 })
      .withMessage("min length must be 2"),
    body("notes")
      .notEmpty()
      .withMessage("pls add notes")
      .isString()
      .withMessage("pls add only string")
      .isLength({ min: 2 })
      .withMessage("plz add notes  atleast 2 characters"),
    body("tags")
      .notEmpty()
      .withMessage("pls select multiple tags or 1 atleast")
      .isArray()
      .withMessage("invlaid tags input"),
    body("products")
      .notEmpty()
      .withMessage("pls select multiple tags or 1 atleast")
      .isArray()
      .withMessage("invlaid products input"),
    body("tax")
      .notEmpty()
      .withMessage("pls add tax")
      .isNumeric()
      .withMessage("pls add number input"),
    body("subTotal") 
      .notEmpty()
      .withMessage("pls add subtotal")
      .isNumeric()
      .withMessage("pls add number input"), 
     body("total")
     .notEmpty()
     .withMessage("pls add totalamount")
     .isNumeric()
     .withMessage("pls add number input"),    
  ];
};




export const Validation = {
  productValidationRules,
  jobValidationRules
};
