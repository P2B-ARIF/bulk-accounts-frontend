import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";
import everythingReducer from "./features/everythingSlice";
import packagesReducer from "./features/packageSlice";
import userReducer from "./features/userSlice";
// dashboard
import accountsReducer from "./features/dashboard/accountsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		packages: packagesReducer,
		account: accountReducer,
		everything: everythingReducer,
		accounts: accountsReducer,
	},
});
