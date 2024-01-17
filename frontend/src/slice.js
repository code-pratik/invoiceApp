import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const getUsers = createAsyncThunk("/api/data/users", async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/data/users");
    return response.data.data.users;
  } catch (error) {
    return error;
  }
});

export const searchUsers = createAsyncThunk(
  "/api/data/searchUser",
  async (searchValue) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/data/searchUser/?search=${searchValue.value}`
      );
      return {data:response?.data?.data.users,flag:searchValue.flag}
    } catch (error) {
      return error;
    }
  }
);

export const createActiveChat = createAsyncThunk("/", async ({data,flag}) => {
  try {
    return {data,flag};
  } catch (error) {
    return error;
  }
});

export const createChat = createAsyncThunk(
  "/api/chat/createChat",
  async (req) => {
    try {
   
    } catch (error) {
      return error;
    }
  }
);








const demoSlice = createSlice({
  name: "demo",
  initialState: {
    
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    
  },
});

export const { } = demoSlice.actions;

export default demoSlice.reducer;
