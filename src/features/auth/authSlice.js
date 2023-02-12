import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: {},
  success: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.credentials = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    }
  }
})

export const { setCredentials, setSuccess } = authSlice.actions

export default authSlice.reducer