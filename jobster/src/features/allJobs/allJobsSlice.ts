import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllJobsThunk,
  handleSearchThunk,
  showStatsThunk,
} from "./allJobsThunk";
import IJob, { JobStatus, JobType } from "../../types/IJob";
import SearchData from "../../types/SearchData";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export type SortOptions = "latest" | "oldest" | "a-z" | "z-a";

export interface AllJobsState {
  isLoading: boolean;
  jobs: IJob[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: { pending: number; interview: number; declined: number };
  monthlyApplications: IJob[];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
  lastSearchData?: SearchData;
}

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: AllJobsState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: { pending: 0, interview: 0, declined: 0 },
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

interface SearchResponse {
  responseData: {
    jobs: IJob[];
    totalJobs: number;
    numOfPages: number;
  };
  searchData: SearchData;
}

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);

export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

export const handleSearch = createAsyncThunk(
  "allJobs/handleSearch",
  handleSearchThunk
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state: AllJobsState) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllJobs.fulfilled,
      (state, action: PayloadAction<AllJobsState>) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.numOfPages = action.payload.numOfPages;
        state.totalJobs = action.payload.totalJobs;
      }
    );
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload as string);
    });
    builder.addCase(showStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(showStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stats = action.payload.defaultStats;
      state.monthlyApplications = action.payload.monthlyApplications;
    });
    builder.addCase(showStats.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload as string);
    });
    builder.addCase(handleSearch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = (action.payload as SearchResponse).responseData.jobs;
      state.numOfPages = (
        action.payload as SearchResponse
      ).responseData.numOfPages;
      state.totalJobs = (
        action.payload as SearchResponse
      ).responseData.totalJobs;
      state.lastSearchData = (action.payload as SearchResponse).searchData;
    });
    builder.addCase(handleSearch.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload as string);
    });
  },
});

export const {
  showLoading,
  hideLoading,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
