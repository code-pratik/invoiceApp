import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobs = createAsyncThunk("/api/jobs/getJobs", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_APIPATH}/api/jobs/getJobs`
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
});

export const createJob = createAsyncThunk(
  "api/jobs/createJob",
  async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIPATH}/api/jobs/createJob`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteJob = createAsyncThunk("api/job/deletejob", async (id) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_APIPATH}/api/jobs/deleteJobs/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
});

export const updateJobs = createAsyncThunk(
  "api/jobs/updateJobs",
  async ({ id, data }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_APIPATH}/api/Jobs/updateJobs/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
  },
  reducers: {
    demoAction: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.fulfilled, (state, action) => {
      const data = {
        ...action.payload.data,
        jobsData: action.payload.data.products,
      };
      state.jobs = [...state?.jobs, data];
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
    });
    builder.addCase(updateJobs.fulfilled, (state, action) => {
      const data = {
        ...action.payload.data,
        jobsData: action.payload.data.products,
      };
      const index = state.jobs.findIndex(
        (item) => item["_id"] === action.payload.data["_id"]
      );
      state.jobs.splice(index, 1, data);
    });
  },
});

export const { demoAction } = jobSlice.actions;

export default jobSlice.reducer;
