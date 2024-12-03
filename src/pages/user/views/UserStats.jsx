import React from "react";
import { useSelector } from "react-redux";
import LoadingPage from "../../LoadingPage";

const UserStats = () => {
	const { everything, loading, error } = useSelector(state => state.everything);

	if (loading) {
		return <LoadingPage />;
	}

	const totalStats = everything?.userStats;

	return (
		<section className='mt-5'>
			{/* <h2 className='text-xl font-bold'>Earning</h2> */}

			<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-5'>
				{/* last today statistics  */}
				<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-5'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg font-semibold tracking-tight'>
							Yesterday
						</span>
						<span className='text-3xl font-bold text-muted-foreground'>
							{totalStats?.lastDay?.reduce(
								(prev, next) => prev + next.totalRate,
								0,
							)}{" "}
							BDT
						</span>
						<span className='text-lg font-medium text-muted-foreground'>
							{totalStats?.lastDay?.reduce(
								(prev, next) => prev + next.count,
								0,
							)}{" "}
							Accounts
						</span>
					</div>
				</div>

				{/* total today statistics  */}
				<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-5'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg font-semibold tracking-tight'>
							Last 7 Days
						</span>
						<span className='text-3xl font-bold text-muted-foreground'>
							{totalStats?.last7Days?.reduce(
								(prev, next) => prev + next.totalRate,
								0,
							)}{" "}
							BDT
						</span>
						<span className='text-lg font-medium text-muted-foreground'>
							{totalStats?.last7Days?.reduce(
								(prev, next) => prev + next.totalCount,
								0,
							)}{" "}
							Accounts
						</span>
					</div>
				</div>

				{/* total today statistics  */}
				<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-5'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg font-semibold tracking-tight'>
							Last 30 Days
						</span>
						<span className='text-3xl font-bold text-muted-foreground'>
							{totalStats?.last30Days?.reduce(
								(prev, next) => prev + next.totalRate,
								0,
							)}{" "}
							BDT
						</span>
						<span className='text-lg font-medium text-muted-foreground'>
							{totalStats?.last30Days?.reduce(
								(prev, next) => prev + next.totalCount,
								0,
							)}{" "}
							Accounts
						</span>
					</div>
				</div>

				<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-5'>
					<div className='flex flex-col gap-1'>
						<span className='text-lg font-semibold tracking-tight'>
							Total Account
						</span>
						<span className='text-3xl font-bold text-muted-foreground'>
							{totalStats?.total?.reduce(
								(prev, next) => prev + next.totalRate,
								0,
							)}{" "}
							BDT
						</span>
						<span className='text-lg font-medium text-muted-foreground'>
							{totalStats?.total?.reduce(
								(prev, next) => prev + next.totalCount,
								0,
							)}{" "}
							Accounts
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserStats;
