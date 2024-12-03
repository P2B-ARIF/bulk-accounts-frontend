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
			{/* <h1 className='text-lg font-bold pl-5'>Handle Facebook </h1> */}

			{/* <div className='space-y-5 md:m-5'>
				<div className='grid gap-4 md:grid-cols-4'>
					{account?.map((stat, i) => {
						const { accountType, accountFormat, accounts, date } = stat;
						return (
							<div
								key={i}
								className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 transition-all duration-300 hover:shadow-lg'
							>
								<div className='flex flex-col gap-2'>
									<span className='text-3xl font-bold tracking-tight'>
										{accounts}
									</span>
									<span className='text-md font-medium text-muted-foreground'>
										{accountType} | {accountFormat}
									</span>

									<span className={`text-sm text-blue-600`}>
										From {date.from} - To {date.to}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div> */}

			<FacebookAccountsTable />
		</section>
	);
};

export default AdminFacebook;
