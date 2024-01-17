import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
      require: true,
    },
    tags: {
      type: [String],
      require: true,
      default: [],
    },
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "products"}],
      require: true,
      default: [],
    },
    tax: {
      type: Number,
      require: true,
    },
    subTotal:{
       type:Number,
       require:true
    },
    total:{
        type:Number,
        require:true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isCovertedToInvoice:{
      type: Boolean,
      default: false
    },
    createdBy: {
      type: String,
      require: true,
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const jobModel = mongoose.model("jobs", jobSchema);
