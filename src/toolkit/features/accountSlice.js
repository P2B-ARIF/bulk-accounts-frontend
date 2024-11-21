import { createSlice } from "@reduxjs/toolkit";

// Create the slice
const accountSlice = createSlice({
	name: "account",
	initialState: {
		account: {},
	},
	reducers: {
		accountStart: (state, action) => {
			state.account = {
				...state.account,
				...action.payload,
			};
		},

		// Action for updating account fields
		updateAccount: (state, action) => {
			state.account = {
				...state.account,
				...action.payload,
			};
		},
		clearAccount: (state, action) => {
			state.account = {};
		},
	},
});

export const { accountStart, updateAccount, clearAccount } =
	accountSlice.actions;
export default accountSlice.reducer;
