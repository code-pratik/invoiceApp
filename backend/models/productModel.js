import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   description:{
    type:String,
    require:true
   },
   price:{
    type: Number,
    require:true
   },
   isDeleted:{
    type:Boolean,
    default:false
   },
   createdBy:{
    type:String,
    require:true
   },
   updatedBy:{
    type: String,
    default:""
   }
},{timestamps:true});

export const productModel  = mongoose.model('product', productSchema)
