import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const covertToInvoice = createAsyncThunk("/api/invoices/convertToInvoices", async (id) => {
  try {
    const response = await axios.patch(`http://localhost:8080/api/invoices/convertToInvoices/${id}`);
    return response.data
  } catch (error) {
    return error;
  }
});


export const getCovertedToInvoice = createAsyncThunk("/api/invoices/getConvertToInvoices", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/invoices/getInvoices`);
    return response.data.data
  } catch (error) {
    return error;
  }
});

 

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: []
  },
  reducers: {
   demoAction:(state,action)=>{

   }
  },
  extraReducers: (builder) => {
    builder.addCase(covertToInvoice.fulfilled,(state,action)=>{
      state.invoices = [...state?.invoices||[],action.payload.data]
    })
    builder.addCase(getCovertedToInvoice.fulfilled,(state,action)=>{
      state.invoices = action.payload
    })
  },
});

export const { demoAction } = invoiceSlice.actions;

export default invoiceSlice.reducer;
