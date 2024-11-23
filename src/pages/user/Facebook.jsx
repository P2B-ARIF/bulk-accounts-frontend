import React from "react";
import { useSelector } from "react-redux";
import WithdrawMoney from "./model/WithdrawMoney";
import FacebookCreate from "./views/FacebookCreate";

const Facebook = () => {
	const { everything, loading, error } = useSelector(state => state.everything);

	if (loading) {
		return <div>Loading...</div>;
	}

	const facebook = everything?.accounts?.filter(
		acc => acc.accountType === "facebook",
	);

	const approvedFacebook = everything?.approved?.filter(
		acc => acc.accountType === "facebook",
	);

	const rateSummary = facebook?.reduce((acc, item) => {
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

	const money = approvedFacebook?.reduce((prev, next) => prev + next.rate, 0);

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
									<div className='flex flex-col md:gap-2'>
										<span className='text-lg md:text-xl uppercase font-semibold md:font-bold tracking-tight'>
											{item.accountFormat}
										</span>
										<span className='text-lg font-medium text-muted-foreground'>
											<b>{item.rate}</b> BDT
										</span>
										<span className='text-md font-medium text-muted-foreground'>
											Account <b>{item.count}</b>
										</span>
									</div>
								</div>
							);
						})}

					{/* Total Earnings Section */}
					<div
						className={`col-span-${
							rateSummary && Object.values(rateSummary).length % 2
						} sm:col-span-1 lg:col-span-2 xl:col-span-1 rounded-lg border bg-blue-50 bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-2 transition-all duration-300 hover:shadow-lg`}
					>
						<span className='text-blue-500 text-xl md:text-2xl font-semibold'>
							Balance: {money} <small>Taka</small>
						</span>
						<div className='flex items-center gap-2 mt-2'>
							{money > 0 && (
								<WithdrawMoney
									approvedAccounts={approvedFacebook}
									amount={money}
								/>
							)}
						</div>
					</div>
				</div>

				<FacebookCreate />
			</div>
		</section>
	);
};

export default Facebook;
