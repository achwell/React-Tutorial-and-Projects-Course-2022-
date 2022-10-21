import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use(
  function (config: any) {
    const user = getUserFromLocalStorage();
    config.headers.Authorization = "Bearer " + user?.token;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore("Unauthorized! Logging Out..."));
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
export default customFetch;
