import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountSkeleton from "../../components/skeleton/AccountSkeleton";
import { fetchAccounts } from "../../toolkit/features/dashboard/accountsSlice";
import Account from "./../../components/dashboard/Account";
import useCrud from "./../../hook/useCrud";

const Accounts = () => {
	const { get, response, loading } = useCrud();

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

	// if (loading) {
	// 	return <LoadingPage />;
	// }

	console.log(response && response[0]);

	return (
		<section>
			<h1 className='text-lg font-bold mb-5'>
				ALL Accounts {response?.length}
			</h1>

			<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2'>
				{loading && [1, 2, 3, 4, 5].map(acc => <AccountSkeleton key={acc} />)}
				{response &&
					!loading &&
					response
						?.sort((a, b) => new Date(b?.lastLogin) - new Date(a?.lastLogin))
						?.map((account, i) => <Account key={i} account={account} />)}
			</div>
		</section>
	);
};

export default Accounts;
