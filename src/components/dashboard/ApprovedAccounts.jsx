import React, { useEffect, useState } from "react";
import useCrud from "../../hook/useCrud";

const ApprovedAccounts = () => {
	const { get, loading, error, response } = useCrud();
	const [approved, setApproved] = useState(null);

	const fetching = async () => {
		await get("/api/accounts/approved");
	};

	useEffect(() => {
		// /api/withdraw
		if (!response) {
			fetching();
		}

		if (response) {
			setApproved(response);
			console.log(response, "response");
		}

		if (error) {
			console.log(error);
		}
	}, [response, error]);

	return (
		<div className='rounded-lg bg-card text-card-foreground shadow-md p-5 transition-all duration-300 hover:shadow-lg'>
			<div className='flex flex-col gap-2'>
				<h3 className='uppercase text-xl font-bold'>
					Amount{" "}
					{approved?.reduce((prev, next) => prev + next.rate, 0).toFixed(2)}
				</h3>
				<div className='flex flex-col gap-1'>
					<span>Total Accounts: {approved?.length || 0}</span>
				</div>
			</div>
		</div>
	);
};

export default ApprovedAccounts;
