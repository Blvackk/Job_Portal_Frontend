import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
    },
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    requestForSingleJob(state) {
      state.loading = true;
      state.error = null;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.singleJob = action.payload;
    },
    failureForSingleJob(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    requestForPostJob(state,action) {
      state.loading = true;
      state.error = null;
    },
    successForPostJob(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    failureForPostJob(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    requestForDeleteJob(state) {
      state.loading = true;
      state.error = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    requestForMyJobs(state) {
      state.loading = true;
      state.error = null;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
    },
    failureForMyJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors(state) {
      state.error = null;
    },
    resetJobSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.singleJob = {};
    },
  },
});

// --------- THUNKS (API Calls) ---------

// Fetch all jobs
export const fetchJobs = (city, niche, searchKeyword = "") => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.requestForAllJobs());

    let queryParams = [];
    if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
    if (city && city !== "All") queryParams.push(`city=${city}`);
    if (niche && niche !== "All") queryParams.push(`niche=${niche}`);

    const link = `http://localhost:4000/api/v1/job/getall?${queryParams.join("&")}`;
    const { data } = await axios.get(link, { withCredentials: true });

    dispatch(jobSlice.actions.successForAllJobs(data.jobs));
  } catch (error) {
    dispatch(jobSlice.actions.failureForAllJobs(error.response?.data?.message || "Error fetching jobs"));
  }
};

// Fetch single job
export const fetchSingleJob = (jobId) => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.requestForSingleJob());
    const { data } = await axios.get(`http://localhost:4000/api/v1/job/get/${jobId}`, { withCredentials: true });
    dispatch(jobSlice.actions.successForSingleJob(data.job));
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response?.data?.message || "Error fetching job"));
  }
};

// Post job
export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/job/post`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
  }
};


// Get My Job
export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/getmyjobs`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
  }
};


export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/job/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(clearAllJobErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
  }
};



// Clear errors
export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

// Reset slice
export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
