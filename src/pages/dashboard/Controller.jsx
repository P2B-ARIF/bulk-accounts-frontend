import React, { useEffect } from "react";

import AccountAction from "../../components/dashboard/AccountAction";
import AccountDownload from "../../components/dashboard/AccountDownload";
import AccountFixing from "../../components/dashboard/AccountFixing";
import AttemptDownload from "../../components/dashboard/AttemptDownload";
import useCrud from "../../hook/useCrud";
import AccountsPassword from "./views/AccountsPassword";
import Maintenance from "./views/Maintenance";
import UpdatePassword from "./views/UpdatePassword";
import UserBlock from "./views/UserBlock";

const Controller = () => {
	const { get, response, error, loading } = useCrud();

	const fetchMaintenance = async () => {
		await get("/api/maintenance");
	};

	useEffect(() => {
		if (!response) {
			fetchMaintenance();
		}
	}, []);

	return (
		<section className='mb-8'>
			<h1 className='text-lg font-bold md:pl-5'>Controller </h1>

			<div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 max-sm:space-y-5 gap-3'>
				{/* <Message /> */}
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
