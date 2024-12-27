import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../toolkit/features/dashboard/accountsSlice";
import FacebookAccountsTable from "./views/FacebookAccountsTable";

const AdminFacebook = () => {
	const { accounts } = useSelector(state => state.accounts);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!accounts) {
			dispatch(fetchAccounts());
		}
	}, [dispatch]);

	return (
		<section>
			<FacebookAccountsTable />
		</section>
	);
};

export default AdminFacebook;
