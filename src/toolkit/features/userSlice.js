// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching user data
export const fetchCheckUser = createAsyncThunk(
	"user/fetchCheckUser",
	async (endpoint, { rejectWithValue }) => {
		const serverUrl = import.meta.env.VITE_SERVER_LINK;

		try {
			const response = await axios.get(`${serverUrl}/api/auth`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				},
			});
			return response.data;
		} catch (error) {
			if (!error.response.data.access) {
				localStorage.removeItem("authToken");
			}

			return rejectWithValue(
				error.response?.data?.message || "Error fetching user data",
			);
		}
	},
);

// Create the slice
const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null, // Initially, no user data is set
		loading: false, // Track loading state
		error: null, // Track any errors during the fetch
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCheckUser.pending, state => {
				state.loading = true; // Set loading to true when request is in progress
				state.error = null; // Clear previous errors
			})
			.addCase(fetchCheckUser.fulfilled, (state, action) => {
				state.loading = false; // Set loading to false when request is successful
				state.user = action.payload; // Store the fetched user data
			})
			.addCase(fetchCheckUser.rejected, (state, action) => {
				state.loading = false; // Set loading to false when the request fails
				state.error = action.payload; // Set the error message from the rejected action
			});
	},
});

export default userSlice.reducer;
