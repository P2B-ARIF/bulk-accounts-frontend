import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountAction from "../../components/dashboard/AccountAction";
import AccountDownload from "../../components/dashboard/AccountDownload";
import AccountFixing from "../../components/dashboard/AccountFixing";
import AttemptDownload from "../../components/dashboard/AttemptDownload";
import useCrud from "../../hook/useCrud";
import { fetchPackages } from "../../toolkit/features/packageSlice";
import AccountsPassword from "./views/AccountsPassword";
import Maintenance from "./views/Maintenance";
import Message from "./views/Message";
import UpdatePassword from "./views/UpdatePassword";
import UserBlock from "./views/UserBlock";

const Controller = () => {
	const { packages } = useSelector(state => state.packages);
	const { get, response, error, loading } = useCrud();
	const dispatch = useDispatch();

	const fetchMaintenance = async () => {
		await get("/api/maintenance");
	};

	useEffect(() => {
		if (!response) {
			fetchMaintenance();
		}
	}, []);

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [dispatch, packages]);

	return (
		<section className='mb-8'>
			<h1 className='text-lg font-bold md:pl-5'>Controller </h1>

			<div className='grid md:grid-cols-3 max-sm:space-y-5'>
				<Message />
				{response && (
					<>
						<AccountsPassword getResponse={response} func={fetchMaintenance} />
						<Maintenance getResponse={response} func={fetchMaintenance} />
					</>
				)}
			</div>

			<div className='md:flex justify-around gap-2 md:p-5 max-sm:space-y-5'>
				<UpdatePassword />
				<UserBlock />
			</div>

			<div className='grid md:grid-cols-2 gap-5 max-sm:space-y-5 mt-5 lg:m-5'>
				<AccountDownload />
				<AttemptDownload />
				<AccountAction />
				<AccountFixing />
			</div>
		</section>
	);
};

export default Controller;
