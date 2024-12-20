import { Divider } from "@chakra-ui/react";
import React from "react";
import BlackHoleAccDownload from "../../components/dashboard/BlackHoleAccDownload";
import BlackHoleAction from "../../components/dashboard/BlackHoleAction";
import SaleAccountsDownload from "../../components/dashboard/SaleAccountsDownload";
import SaleAction from "../../components/dashboard/SaleAction";

const SaleHole = () => {
	return (
		<div>
			<section>
				<h3 className='text-lg font-semibold md:pl-5'>Sale Accounts</h3>
				<div className='grid md:grid-cols-2 gap-5 max-sm:space-y-5 mt-5 lg:m-5'>
					<SaleAccountsDownload />
					<SaleAction />
				</div>
			</section>
			<Divider />
			<br />
			<section>
				<h3 className='text-lg font-semibold md:pl-5'>Black Hole Accounts</h3>
				<div className='grid md:grid-cols-2 gap-5 max-sm:space-y-5 mt-5 lg:m-5'>
					<BlackHoleAccDownload />
					<BlackHoleAction />
				</div>
			</section>
		</div>
	);
};

export default SaleHole;
