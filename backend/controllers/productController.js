import { resConstants } from "../constants/errorMessages.js";
import { productModel } from "../models/productModel.js";
import { sendResponse, sendResponseError } from "../utils/errorHandlers.js";


// create a product api
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, createdBy } = req.body;
    const product = {
      name,
      description,
      price,
      createdBy,
    };
    const productData = new productModel(product);
    await productData.save();
    sendResponse(
      res,
      201,
      productData,
      resConstants.PRODUCT_CREATED_SUCCESSFULLY
    );
  } catch (error) {
    sendResponseError(res, 500, `${"product"}${resConstants.FAILED_TO_CREATE}`);
  }
};


// get product api
export const getProduct = async (req, res) => {
  try {
    const productData = await productModel.aggregate([
      { $match: { isDeleted: false } },
    ]);
    if (productData.length > 0) {
      sendResponse(
        res,
        200,
        productData,
        resConstants.PRODUCT_RETRIEVED_SUCCESSFULL
      );
      return
    }
    sendResponseError(res, 400, resConstants.NO_PRODUCT_FOUND);
  } catch (error) {
    sendResponseError(res, 500, resConstants.INTERNAL_ERROR);
  }
};


// delete a product api
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await productModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedData) {
      sendResponseError(res, 400, resConstants.NOT_FOUND);
      return
    }
    sendResponse(res, 200, deletedData, resConstants.DELETED_SUCCESSFULLY);
  } catch (error) {
    sendResponseError(res, 500, resConstants.FAILED_TO_DELETE);
  }
};

// update product api
export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const {name,description,price,updatedBy} = req.body;
      const updatedData = await productModel.findByIdAndUpdate(
        id,
        {name,description,price,updatedBy},
        { new: true }
      );
      if (!updatedData) {
        sendResponseError(res, 400, resConstants.NOT_FOUND);
        return
      }
      sendResponse(res, 200, updatedData, resConstants.UPDATED_SUCCESSFULLY);
    } catch (error) {
      sendResponseError(res, 500, resConstants.FAILED_TO_UPDATE);
    }
  };
