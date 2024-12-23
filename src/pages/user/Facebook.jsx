import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../toolkit/features/packageSlice";
import LoadingPage from "../LoadingPage";
import FacebookCreate from "./views/FacebookCreate";

const Facebook = () => {
	const { everything, loading, error } = useSelector(state => state.everything);
	const { user, loading: userLoading } = useSelector(state => state.user);
	const { packages } = useSelector(state => state.packages);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [packages, dispatch]);

	if (loading) {
		return <LoadingPage />;
	}

	const facebook = everything?.accounts?.filter(
		acc => acc.accountType === "facebook",
	);

	// const approvedFacebook = everything?.approved?.filter(
	// 	acc => acc.accountType === "facebook",
	// );

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

	if (
		!packages?.packages?.some(p => p.accountType === "facebook" && p.active)
	) {
		return (
			<div className='flex flex-col h-screen items-center justify-center bg-gray-50 text-center'>
				<h1 className='text-lg md:text-xl font-bold text-gray-800 mb-2'>
					No Active Facebook Packages Available
				</h1>
				<p className='text-gray-600 mb-4'>
					Please check other tasks or contact your administrator for assistance.
				</p>
			</div>
		);
	}

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

										<span className='absolute bottom-2 right-2 text-green-500 px-1 md:px-2 py-0.5 md:py-1 rounded-xl text-xs md:text-sm bg-green-200'>
											Progress!
										</span>
									</div>
								</div>
							);
						})}
				</div>

				{user?.nickname && <FacebookCreate user={user} />}
			</div>
		</section>
	);
};

export default Facebook;
