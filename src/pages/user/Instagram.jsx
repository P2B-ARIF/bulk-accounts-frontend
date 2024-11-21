import React from "react";
import { useSelector } from "react-redux";
import WithdrawMoney from "./model/WithdrawMoney";
import InstagramCreate from "./views/InstagramCreate";

const Instagram = () => {
	const { everything, loading, error } = useSelector(state => state.everything);

	if (loading) {
		return <div>Loading...</div>;
	}

	const instagram = everything?.accounts?.filter(
		acc => acc.accountType === "instagram",
	);

	const approvedInstagram = everything?.approved?.filter(
		acc => acc.accountType === "instagram",
	);

	const rateSummary = instagram?.reduce((acc, item) => {
		const { accountFormat, rate, count } = item;
		const formattedAccountFormat = accountFormat.toLowerCase();
		if (!acc[formattedAccountFormat]) {
			acc[formattedAccountFormat] = {
				accountFormat: formattedAccountFormat,
				rate: 0,
				count: 0,
			};
		}
		acc[formattedAccountFormat].rate += rate || 0;
		acc[formattedAccountFormat].count += 1;
		return acc;
	}, {});

	const money = approvedInstagram?.reduce((prev, next) => prev + next.rate, 0);

	return (
		<section>
			<h1 className='text-lg font-bold md:pl-5 mb-3'>Facebook Work Station</h1>
			<div className='space-y-5 md:m-3 lg:m-4 xl:m-5'>
				<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 '>
					{rateSummary &&
						Object.values(rateSummary)?.map((item, i) => {
							return (
								<div
									key={i}
									className='rounded-lg border bg-card text-card-foreground shadow-sm p-3 md:p-5 transition-all duration-300 hover:shadow-lg'
								>
									<div className='flex flex-col gap-2'>
										<span className='text-xl uppercase font-bold tracking-tight'>
											{item.accountFormat}
										</span>
										<span className='text-lg font-medium text-muted-foreground'>
											{item.rate} BDT
										</span>
										<span className='text-md font-medium text-muted-foreground'>
											Account {item.count}
										</span>
									</div>
								</div>
							);
						})}

					{/* Total Earnings Section */}
					<div className='col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1 rounded-lg border bg-pink-50 bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-2 transition-all duration-300 hover:shadow-lg'>
						<span className='text-pink-500 text-2xl font-bold tracking-tight'>
							Balance: {money} Taka
						</span>
						<div className='flex items-center gap-2 mt-2'>
							{/* <button className='text-md text-pink-100 hover:text-pink-200 font-medium shadow-sm px-3 bg-pink-600 rounded-lg py-1.5'>
								Withdraw Money
							</button> */}
							{money > 0 && (
								<WithdrawMoney
									approvedAccounts={approvedInstagram}
									amount={money}
								/>
							)}
						</div>
					</div>
				</div>

				<InstagramCreate />
			</div>
		</section>
	);
};

export default Instagram;
