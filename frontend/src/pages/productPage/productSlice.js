import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("/api/data/users", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/products/getProducts"
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
        `http://localhost:8080/api/products/createProduct`,
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
        `http://localhost:8080/api/products/deleteProduct/${id}`
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return error;
    }
  }
);


export const updateProduct =  createAsyncThunk(
  "api/products/updateProduct",
  async ({id,data}) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/products/updateProduct/${id}`,data
      );
      console.log(response)
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
    theme: "dark"
  },
  reducers: {
    demoAction: (state, action) => {},
    setTheme: (state, action) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = [...state.products  , action.payload.data];
    });
  },
});

export const { demoAction,setTheme } = productSlice.actions;

export default productSlice.reducer;
