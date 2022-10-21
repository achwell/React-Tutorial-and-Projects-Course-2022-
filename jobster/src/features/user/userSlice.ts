import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import IUser from "../../types/IUser";
import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { store } from "../../app/store";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

interface State {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user?: IUser;
}

const initialState: State = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  // if you type your function argument here
  async (user: IUser) => {
    const resp = await customFetch.post("/auth/register", user);
    return resp.data;
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  // if you type your function argument here
  async (user: IUser) => {
    const resp = await customFetch.post("/auth/login", user);
    return resp.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: IUser) => {
    const resp = await customFetch.patch("/auth/updateUser", user);
    return resp.data;
  }
);

export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (message: string) => {
    try {
      store.dispatch(logoutUser(message));
      store.dispatch(clearAllJobsState());
      store.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = undefined;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        toast.error(action.payload as string);
      }
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        toast.error(action.payload as string);
      }
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);

      toast.success(`User Updated!`);
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        toast.error(action.payload as string);
      }
    });
    builder.addCase(clearStore.rejected, () => {
      toast.error("There was an error..");
    });
  },
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
