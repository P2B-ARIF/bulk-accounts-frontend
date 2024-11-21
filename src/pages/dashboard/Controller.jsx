import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountAction from "../../components/dashboard/AccountAction";
import AccountDownload from "../../components/dashboard/AccountDownload";
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
		<section className='mb-10'>
			<h1 className='text-lg font-bold pl-5'>Controller </h1>

			<div className='grid grid-cols-2'>
				<Message />
				<Maintenance />
			</div>

			<div className='p-5 space-y-5'>
				<SocialPackage />
			</div>

			<div className='flex justify-around gap-2 p-5'>
				<UpdatePassword />
				<UserBlock />
			</div>

			<div className='grid grid-cols-2 gap-5 lg:m-5'>
				<AccountDownload />
				<AccountAction />
			</div>
		</section>
	);
};

export default Controller;
