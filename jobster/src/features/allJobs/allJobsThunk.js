import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import SearchData from "../../types/SearchData";

export const getAllJobsThunk = async (a, thunkAPI) => {
  console.log({ a });
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (b, thunkAPI) => {
  console.log({ b });
  try {
    const resp = await customFetch.get("/jobs/stats");

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const handleSearchThunk = async (searchData, thunkAPI) => {
  console.log({ searchData });
  const { page, search, status, type, sort } = searchData;
  let url = `/jobs?status=${status}&jobType=${type}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return { responseData: resp.data, searchData };
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
