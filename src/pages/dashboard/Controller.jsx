import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountAction from "../../components/dashboard/AccountAction";
import AccountDownload from "../../components/dashboard/AccountDownload";
import AccountFixing from "../../components/dashboard/AccountFixing";
import { fetchPackages } from "../../toolkit/features/packageSlice";
import SocialPackage from "./views/FacebookPackage";
import Maintenance from "./views/Maintenance";
import Message from "./views/Message";
import UpdatePassword from "./views/UpdatePassword";
import UserBlock from "./views/UserBlock";

const Controller = () => {
	const { packages } = useSelector(state => state.packages);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
		// dispatch(fetchAccounts());
	}, [dispatch, packages]);

	useEffect(() => {
		// dispatch(fetchAccounts(`/api/accounts?type=${}&format=${}`))
	}, []);

	return (
		<section className='mb-8'>
			<h1 className='text-lg font-bold md:pl-5'>Controller </h1>

			<div className='grid md:grid-cols-2 max-sm:space-y-5'>
				<Message />
				<Maintenance />
			</div>

			<div className='md:p-5 mt-5 space-y-5'>
				<SocialPackage />
			</div>

			<div className='md:flex justify-around gap-2 md:p-5 max-sm:space-y-5'>
				<UpdatePassword />
				<UserBlock />
			</div>

			<div className='grid md:grid-cols-2 gap-5 max-sm:space-y-5 mt-5 lg:m-5'>
				<AccountDownload />
				<AccountAction />
				<AccountFixing />
			</div>
		</section>
	);
};

export default Controller;
