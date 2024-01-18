import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("/api/data/users", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_APIPATH}/api/products/getProducts`
    );
    console.log(response.data.data, "asda");
    return response.data;
  } catch (error) {
    return error;
  }
});

export const createProduct = createAsyncThunk(
  "api/products/createProduct",
  async (data) => {
    console.log(data, "adsajsres");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIPATH}/api/products/createProduct`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "api/products/deleteProduct",
  async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_APIPATH}/api/products/deleteProduct/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "api/products/updateProduct",
  async ({ id, data }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_APIPATH}/api/products/updateProduct/${id}`,
        data
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    menuState: false,
  },
  reducers: {
    toggleMenu: (state, action) => {
      state.menuState =
        action.payload === undefined ? !state.menuState : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload.data];
    });
  },
});

export const { toggleMenu } = productSlice.actions;

export default productSlice.reducer;
