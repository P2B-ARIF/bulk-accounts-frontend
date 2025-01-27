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
import UpdateMailBox from "./views/UpdateMailBox";

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
			<h1 className='text-lg font-bold lg:pl-5 mb-3'>Controller </h1>

				{response && (
			<div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 max-sm:space-y-5 gap-3 items-start'>
						<div className='space-y-5'>
							<AccountsPassword
								getResponse={response}
								func={fetchMaintenance}
							/>
							<UpdateMailBox getResponse={response} func={fetchMaintenance} />
						</div>
						<Maintenance getResponse={response} func={fetchMaintenance} />
			</div>
				)}

			<div className='sm:flex justify-around gap-3 md:gap-5 pt-5 lg:p-5 max-sm:space-y-5'>
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
