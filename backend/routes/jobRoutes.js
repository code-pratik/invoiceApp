import express from "express";
import {
  createJob,
  deleteJobs,
  getJobs,
  updateJobs,
} from "../controllers/jobsController.js";
import { Validation } from "../validations/expressReqValidation.js";
import { validate } from "../middlewares/validateData.js";

const router = express.Router();

router
  .post("/createJob", Validation.jobValidationRules(), validate, createJob)
  .get("/getJobs", getJobs)
  .patch("/deleteJobs/:id", deleteJobs)
  .patch("/updateJobs/:id", updateJobs);

export const jobsRoutes = router;
