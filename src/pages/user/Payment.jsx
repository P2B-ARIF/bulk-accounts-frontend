import React from "react";
import { useSelector } from "react-redux";
import WithdrawMoney from "./model/WithdrawMoney";
import PaymentHistory from "./views/PaymentHistory";

const Payment = () => {
	const { everything, loading, error } = useSelector(state => state.everything);

	const accounts = everything?.approved;

	const rateSummary = accounts?.reduce((acc, item) => {
		const { accountType, rate, count } = item;

		if (!acc[accountType]) {
			acc[accountType] = {
				accountType: accountType,
				rate: 0,
				count: 0,
			};
		}
		acc[accountType].rate += rate || 0;
		acc[accountType].count += 1;
		return acc;
	}, {});

	console.log(rateSummary, "accounts");
	const money = accounts?.reduce((prev, next) => prev + next.rate, 0);

	return (
		<section>
			<h1 className='text-lg font-bold pl-5'>Payment</h1>
			<div className='grid gap-4 md:grid-cols-4 px-5 mt-5'>
				{rateSummary?.facebook ? (
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 transition-all duration-300 hover:shadow-lg'>
						<div className='flex flex-col gap-2'>
							<span className='text-xl font-bold uppercase tracking-tight'>
								{rateSummary?.facebook?.accountType}
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								{rateSummary?.facebook?.rate}
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								{rateSummary?.facebook?.count}
							</span>
						</div>
					</div>
				) : (
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 transition-all duration-300 hover:shadow-lg'>
						<div className='flex flex-col gap-2'>
							<span className='text-xl font-bold uppercase tracking-tight'>
								Facebook
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								0
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								0
							</span>
						</div>
					</div>
				)}
				{rateSummary?.instagram ? (
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 transition-all duration-300 hover:shadow-lg'>
						<div className='flex flex-col gap-2'>
							<span className='text-xl font-bold uppercase tracking-tight'>
								{rateSummary?.instagram?.accountType}
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								{rateSummary?.instagram?.rate} BDT
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								{rateSummary?.instagram?.count} TOTAL
							</span>
						</div>
					</div>
				) : (
					<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 transition-all duration-300 hover:shadow-lg'>
						<div className='flex flex-col gap-2'>
							<span className='text-xl font-bold uppercase tracking-tight'>
								Instagram
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								0
							</span>
							<span className='text-md font-medium text-muted-foreground'>
								0
							</span>
						</div>
					</div>
				)}

				{/* Total Earnings Section */}
				<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-2 transition-all duration-300 hover:shadow-lg'>
					<span className='text-2xl font-bold tracking-tight'>
						Total Earn: {money} Taka
					</span>
					<div className='flex items-center gap-2 mt-2'>
						{money > 0 && (
							<WithdrawMoney approvedAccounts={accounts} amount={money} />
						)}
					</div>
				</div>
			</div>
			<PaymentHistory />
		</section>
	);
};

export default Payment;
