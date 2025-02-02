import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Package from "../../components/dashboard/Package";
import { fetchPackages } from "../../toolkit/features/packageSlice";
import LoadingPage from "./../LoadingPage";
import CreateTypeFormat from "./models/CreateTypeFormat";
import UpdateTypeFormat from "./models/UpdateTypeFormat";

const AdminPackages = () => {
	const { packages, loading, update, updateModel } = useSelector(
		state => state.packages,
	);
	const dispatch = useDispatch();

	const [items, setItems] = useState(null);

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [dispatch, packages]);

	useEffect(() => {
		if (packages) {
			const sortedByAccountType = [...packages?.packages]?.sort((a, b) =>
				a.accountType.localeCompare(b.accountType),
			);

			setItems(sortedByAccountType);
		}
	}, [packages]);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<aside>
			<div className='flex items-center gap-5 mb-2'>
				<h3 className='text-lg mb-2 pl-1 font-medium flex items-center gap-1 text-blue-500 uppercase'>
					{/* <FaFacebook /> */}
					Packages
				</h3>
				<CreateTypeFormat />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 '>
				{items && items?.map((pack, i) => <Package key={i} pack={pack} />)}
			</div>
			{update && <UpdateTypeFormat update={update} updateModel={updateModel} />}
		</aside>
	);
};

export default AdminPackages;
