import React, { useState } from "react";
import Account from "./../../components/dashboard/Account";

const Accounts = () => {
	const [userInfo, setUserInfo] = useState({});
	return (
		<section>
			<h1 className='text-lg font-bold mb-5'>ALL Accounts </h1>

			<div className='grid grid-cols-5 gap-2'>
				<Account />
			</div>
		</section>
	);
};

export default Accounts;
