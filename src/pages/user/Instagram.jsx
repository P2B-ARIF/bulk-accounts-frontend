import React from "react";
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";
import InstagramCreate from "./views/InstagramCreate";

const Instagram = () => {
	const { everything, loading, error } = useSelector(state => state.everything);
	const { packages } = useSelector(state => state.packages);
	const { user, loading: userLoading } = useSelector(state => state.user);

	const instagramPackages = packages?.packages?.filter(
		p => p.accountType === "instagram" && p.active === true,
	);

	if (loading) {
		return <LoadingPage />;
	}
	if (instagramPackages?.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center h-[90vh]'>
				<h3>
					Instagram services are temporarily unavailable. We&apos;re working to
					restore them as soon as possible.
					<br />
					<br />
					Thank you for your patience!
				</h3>
			</div>
		);
	}

	const instagram = everything?.accounts?.filter(
		acc => acc.accountType === "instagram",
	);

	// const approvedInstagram = everything?.approved?.filter(
	// 	acc => acc.accountType === "instagram",
	// );

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

	// const money = approvedInstagram?.reduce((prev, next) => prev + next.rate, 0);

	return (
		<section>
			<h1 className='text-lg font-bold md:pl-5 mb-3'>Instagram Work Station</h1>
			<div className='space-y-5 md:m-3 lg:m-4 xl:m-5'>
				<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 '>
					{rateSummary &&
						Object.values(rateSummary)?.map((item, i) => {
							return (
								<div
									key={i}
									className='relative rounded-lg border bg-card text-card-foreground shadow-sm p-3 md:p-5 transition-all duration-300 hover:shadow-lg'
								>
									<div className='flex flex-col md:gap-2'>
										<span className='text-md md:text-xl uppercase font-semibold md:font-bold tracking-tight'>
											{item.accountFormat}
										</span>
										<span className='text-md md:text-lg font-medium text-muted-foreground'>
											<b>{item.rate}</b> BDT
										</span>
										<span className='text-sm md:text-md font-medium text-muted-foreground'>
											Account <b>{item.count}</b>
										</span>

										<span className='absolute bottom-2 right-2 text-pink-500 px-1 md:px-2 py-0.5 md:py-1 rounded-xl text-xs md:text-sm bg-pink-200'>
											Progress!
										</span>
									</div>
								</div>
							);
						})}
				</div>

				{user?.nickname && <InstagramCreate user={user} />}
			</div>
		</section>
	);
};

export default Instagram;
