import { resConstants } from "../constants/errorMessages.js";
import { jobModel } from "../models/jobsModel.js";
import { sendResponse, sendResponseError } from "../utils/errorHandlers.js";


// craete a jobs
export const createJob = async (req, res) => {
  try {
    const { title, notes, tags, products, tax, subTotal, total, createdBy } = req.body;
    const job = {
      title,
      notes,
      tags,
      products,
      tax,
      subTotal,
      total,
      createdBy
    };
    const jobData = new jobModel(job)
    await jobData.save();
    const data = await jobData.populate(
      {
        path: 'products', 
        model: 'product',
      }
    );
    sendResponse(
      res,
      201,
      data,
      resConstants.JOB_CREATED_SUCCESSFULLY
    );
  } catch (error) {
    sendResponseError(res, 500, `${"JOB"}${resConstants.FAILED_TO_CREATE}`);
  }
};

// getjobs api
export const getJobs = async (req, res) => {
  try {
    const jobsData = await jobModel.aggregate([
      { $match: { isDeleted: false } },
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
      resConstants.PRODUCT_RETRIEVED_SUCCESSFULL
    );  
  } catch (error) {
    sendResponseError(res, 500, resConstants.INTERNAL_ERROR);
  }
};


//delete jobs api
export const deleteJobs = async (req, res) => {
  try {
    const { id } = req.params;
 
    const deletedData = await jobModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedData) {
      sendResponseError(res, 400, resConstants.NOT_FOUND);
      return;
    }
    sendResponse(res, 200, deletedData, resConstants.DELETED_SUCCESSFULLY);
  } catch (error) {
    sendResponseError(res, 500, resConstants.FAILED_TO_DELETE);
  }
};


// updatejobs api
export const updateJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const {title,tags,products,notes,tax,subTotal,total,updatedBy=""} = req.body;

    const updatedData = await jobModel
    .findByIdAndUpdate(id, { title, tags, products, notes, tax, subTotal, total, updatedBy }, { new: true })
    .populate(
      {
        path: 'products', 
        model: 'product',
      }
    );
    const {} = updatedData
    if (!updatedData) {
      sendResponseError(res, 400, resConstants.NOT_FOUND);
      return;
    }
    sendResponse(res, 200, updatedData, resConstants.UPDATED_SUCCESSFULLY);
  } catch (error) {
    sendResponseError(res, 500, resConstants.FAILED_TO_UPDATE);
  }
};
