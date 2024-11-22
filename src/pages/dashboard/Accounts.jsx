import React, { useEffect } from "react";
import Account from "./../../components/dashboard/Account";
import useCrud from "./../../hook/useCrud";

const Accounts = () => {
	const { get, response, error, loading } = useCrud();

	const fetchAccounts = async () => {
		await get("/api/auth/get-allUsers");
	};

	useEffect(() => {
		fetchAccounts();
	}, []);

	useEffect(() => {
		if (response) {
			console.log(response);
		}
	}, [response]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<section>
			<h1 className='text-lg font-bold mb-5'>
				ALL Accounts {response?.length}
			</h1>

			<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2'>
				{response &&
					response.map((account, i) => <Account key={i} account={account} />)}
			</div>
		</section>
	);
};

export default Accounts;
