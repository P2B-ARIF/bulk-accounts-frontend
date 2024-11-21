import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEverything = createAsyncThunk(
	"everything/fetchEverything",
	async (endpoint, { rejectWithValue }) => {
		const serverUrl = import.meta.env.VITE_SERVER_LINK;

		try {
			const response = await axios.get(`${serverUrl}/api/accounts/everything`, {
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
				error.response?.data?.message || "Error fetching package data",
			);
		}
	},
);

// Create the slice
const everythingSlice = createSlice({
	name: "everything",
	initialState: {
		everything: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchEverything.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEverything.fulfilled, (state, action) => {
				state.loading = false;
				state.everything = action.payload;
			})
			.addCase(fetchEverything.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default everythingSlice.reducer;
