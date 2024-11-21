import React from "react";
import FacebookAccountsTable from "./views/FacebookAccountsTable";
import FacebookPieChart from "./views/FacebookPieChart";

const AdminFacebook = () => {
	const account = [
		{
			accountType: "facebook",
			accountFormat: "2fa_30",
			accounts: 10,
			date: {
				from: "2020-01-01",
				to: "2020-01-31",
			},
		},
		{
			accountType: "facebook",
			accountFormat: "2fa_30",
			accounts: 10,
			date: {
				from: "2020-01-01",
				to: "2020-01-31",
			},
		},
		{
			accountType: "facebook",
			accountFormat: "2fa_30",
			accounts: 10,
			date: {
				from: "2020-01-01",
				to: "2020-01-31",
			},
		},
		{
			accountType: "facebook",
			accountFormat: "2fa_30",
			accounts: 10,
			date: {
				from: "2020-01-01",
				to: "2020-01-31",
			},
		},
	];

	return (
		<section>
			<h1 className='text-lg font-bold pl-5'>Handle Facebook </h1>

			<div className='space-y-5 md:m-5'>
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
			</div>

			<div className='p-5 grid grid-cols-3 gap-5'>
				<FacebookPieChart />
			</div>

			<FacebookAccountsTable />
		</section>
	);
};

export default AdminFacebook;
