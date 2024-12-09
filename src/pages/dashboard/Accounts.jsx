import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../toolkit/features/dashboard/accountsSlice";
import LoadingPage from "../LoadingPage";
import Account from "./../../components/dashboard/Account";
import useCrud from "./../../hook/useCrud";

const Accounts = () => {
	const { get, response, error, loading } = useCrud();

	const { accounts: allAccounts } = useSelector(state => state.accounts);
	const dispatch = useDispatch();

	const fetchUsers = async () => {
		await get("/api/auth/get-allUsers");
	};

	useEffect(() => {
		fetchUsers();

		if (!allAccounts) {
			dispatch(fetchAccounts());
		}
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<section>
			<h1 className='text-lg font-bold mb-5'>
				ALL Accounts {response?.length}
			</h1>

			<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2'>
				{response &&
					response?.map((account, i) => <Account key={i} account={account} />)}
			</div>
		</section>
	);
};

export default Accounts;
