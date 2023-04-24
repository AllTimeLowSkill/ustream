import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../api/auth.service";
import { ProfileService } from "../../api/profile.service";
import { FollowService } from "../../api/follow.service";

const initialState = {
  user: null,
  profile: null,
  follows: [],
  isLoading: false,
};

export const signIn = createAsyncThunk("user/signIn", async (data) =>
  AuthService.signIn(data)
);

export const signUp = createAsyncThunk("user/signUp", async (data) =>
  AuthService.signUp(data)
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (data) => ProfileService.updateAvatar(data)
);

export const addFollow = createAsyncThunk("user/addFollow", async (data) =>
  FollowService.addFollow(data)
);

export const getProfile = createAsyncThunk("user/getProfile", async ({ id }) =>
  ProfileService.getProfile(id)
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, data }) => ProfileService.updateProfile(id, data)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload.user);
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.follows = action.payload.follows;
    },
    clearUser(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (build) => {
    build.addCase(updateAvatar.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(updateAvatar.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    build.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.follows = action.payload.follows;
      state.isLoading = false;
    });
    build.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.follows = action.payload.follows;
      state.isLoading = false;
    });
    build.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    build.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    build.addCase(addFollow.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(addFollow.fulfilled, (state, action) => {
      state.follows.push(action.payload);
      state.isLoading = false;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
