import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const covertToInvoice = createAsyncThunk(
  "/api/invoices/convertToInvoices",
  async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_APIPATH}/api/invoices/convertToInvoices/${id}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCovertedToInvoice = createAsyncThunk(
  "/api/invoices/getConvertToInvoices",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIPATH}/api/invoices/getInvoices`
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
  },

  extraReducers: (builder) => {
    builder.addCase(covertToInvoice.fulfilled, (state, action) => {
      state.invoices = [...(state?.invoices || []), action.payload.data];
    });
    builder.addCase(getCovertedToInvoice.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
  },
});

export default invoiceSlice.reducer;
