import { resConstants } from "../constants/errorMessages.js";
import { jobModel } from "../models/jobsModel.js";
import { sendResponse, sendResponseError } from "../utils/errorHandlers.js";


//get all jobs invoices
export const getInvoices = async (req, res) => {
    try {
      const jobsData = await jobModel.aggregate([
        { $match: { isDeleted: false,isCovertedToInvoice:true } },
        { "$lookup": {
          "from": "products",
          "localField": "products",
          "foreignField": "_id",
          "as": "jobsData"
       }},{
          $project:{
           products:0
          }
       }
      ]);
        sendResponse(
          res,
          200,
          jobsData,
          resConstants.INVOICE_RETRIEVED_SUCCESSFULL
        )   
    } catch (error) {
      sendResponseError(res, 500, resConstants.INTERNAL_ERROR);
    }
  };

export const convertToInvoice =  async(req,res)=>{
  try {
    const { id } = req.params;
    const convertedInvoiceData = await jobModel.findByIdAndUpdate(
      id,
      { isCovertedToInvoice: true },
      { new: true }
    );
    if (!convertedInvoiceData) {
      sendResponseError(res, 404, resConstants.NOT_FOUND);
      return;
    }
    sendResponse(res, 200, convertedInvoiceData, resConstants.CONVERTED_SUCCESSFULLY);
  } catch (error) {
    sendResponseError(res, 500, resConstants.FAILED_TO_CONVERT);
  }
} 
