import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAccounts = createAsyncThunk(
	"accounts/fetchAccounts",
	async (endpoint, { rejectWithValue }) => {
		const serverUrl = import.meta.env.VITE_SERVER_LINK;

		try {
			const response = await axios.get(`${serverUrl}/api/accounts/all`, {
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
const accountsSlice = createSlice({
	name: "accounts",
	initialState: {
		accounts: null,
		loading: false,
		error: null,
	},
	reducers: {
		// addToUpdate: (state, action) => {
		// 	state.update = action.payload;
		// 	state.updateModel = true;
		// },
		// addToPackage: (state, action) => {
		// 	state.packages = [...state.packages, action.payload];
		// },
		// updateModelOpen: (state, action) => {
		// 	state.updateModel = action.payload;
		// },
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAccounts.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAccounts.fulfilled, (state, action) => {
				state.loading = false;
				state.accounts = action.payload;
			})
			.addCase(fetchAccounts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// export const { addToPackage, addToUpdate, updateModelOpen } =
// 	accountsSlice.actions;
export default accountsSlice.reducer;
