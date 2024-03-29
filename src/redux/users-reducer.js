const { createSlice } = require("@reduxjs/toolkit");
const {
  createUserThunk,
  deleteUserThunk,
  updateUserThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
} = require("../services/users/users-thunks");

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    [createUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.currentUser = action.payload;
    },
    [deleteUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    [profileThunk.pending]: (state) => {
      state.loading = true;
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [profileThunk.rejected]: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = action.error;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
  },
});

export default usersSlice.reducer;
