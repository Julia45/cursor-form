import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  email: null,
  name: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.email = null;
      state.name = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearError, logout } = userSlice.actions;
export default userSlice.reducer;