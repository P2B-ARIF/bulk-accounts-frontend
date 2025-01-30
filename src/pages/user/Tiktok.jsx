import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../toolkit/features/packageSlice";
import LoadingPage from "../LoadingPage";
import TiktokCreate from "./views/TiktokCreate";

const TikTok = () => {
	// Extracting necessary state values from Redux store
	const { packages, loading: uLoading } = useSelector(state => state.packages);
	const { everything, loading, error } = useSelector(state => state.everything);
	const { user, loading: userLoading } = useSelector(state => state.user);
	const dispatch = useDispatch();

	// Fetch packages if not available
	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [packages, dispatch]);

	// Show loading page while data is being fetched
	if (loading || uLoading) {
		return <LoadingPage />;
	}

	// Filtering TikTok accounts from the retrieved data
	const tiktok = everything?.accounts?.filter(
		acc => acc.accountType === "tiktok",
	);

	// Summarizing rates and counts for different TikTok account formats
	const rateSummary = tiktok?.reduce((acc, item) => {
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

	return (
		<section>
			<h1 className='text-lg font-bold md:pl-5 mb-3'>TikTok Work Station</h1>
			<div className='space-y-5 md:m-3 lg:m-4 xl:m-5'>
				<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
					{rateSummary &&
						Object.values(rateSummary)?.map((item, i) => (
							<div
								key={i}
								className='relative rounded-lg border bg-card text-card-foreground shadow-sm p-3 md:p-5 transition-all duration-300 hover:shadow-lg'
							>
								<div className='flex flex-col md:gap-2'>
									<span className='text-md md:text-xl uppercase font-semibold md:font-bold tracking-tight'>
										{item.accountFormat}
									</span>
									<span className='text-md md:text-lg font-medium text-muted-foreground'>
										<b>{item.rate.toFixed(2)}</b> BDT
									</span>
									<span className='text-sm md:text-md font-medium text-muted-foreground'>
										Account <b>{item.count}</b>
									</span>
									<span className='absolute bottom-2 right-2 text-[#ff0050] px-1 md:px-2 py-0.5 md:py-1 rounded-xl text-xs md:text-sm bg-[#ff0050]/20'>
										Progress!
									</span>
								</div>
							</div>
						))}
				</div>

				{/* Render TikTokCreate component if user has a nickname */}
				{user?.nickname && <TiktokCreate user={user} />}
			</div>
		</section>
	);
};

export default TikTok;
