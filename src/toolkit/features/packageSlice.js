import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPackages = createAsyncThunk(
	"package/fetchPackages",
	async (endpoint, { rejectWithValue }) => {
		const serverUrl = import.meta.env.VITE_SERVER_LINK;

		try {
			const response = await axios.get(`${serverUrl}/api/packages`, {
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
const packageSlice = createSlice({
	name: "packages",
	initialState: {
		packages: null,
		loading: false,
		error: null,
		update: null,
		updateModel: false,
	},
	reducers: {
		addToUpdate: (state, action) => {
			state.update = action.payload;
			state.updateModel = true;
		},
		addToPackage: (state, action) => {
			state.packages = [...state.packages, action.payload];
		},
		updateModelOpen: (state, action) => {
			state.updateModel = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPackages.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPackages.fulfilled, (state, action) => {
				state.loading = false;
				state.packages = action.payload;
			})
			.addCase(fetchPackages.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { addToPackage, addToUpdate, updateModelOpen } =
	packageSlice.actions;
export default packageSlice.reducer;
