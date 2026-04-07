import { createSlice } from "@reduxjs/toolkit";
const initialState: AuthInitialStates = {
  token: null,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData(prevState) {
      prevState.token = null;
      prevState.userData = null;
    },
    setUserToken: function (prevState, action) {
      prevState.token = action.payload;
    },
    setUserData: function (prevState, action) {
      prevState.userData = action.payload;
    },
  },
});
export default authSlice.reducer;
export const { setUserToken, clearUserData, setUserData } = authSlice.actions;
