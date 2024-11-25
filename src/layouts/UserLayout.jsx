import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../pages/user/SideBar";
import { fetchEverything } from "../toolkit/features/everythingSlice";
import { fetchCheckUser } from "../toolkit/features/userSlice";

const UserLayout = () => {
	const { user, loading, error } = useSelector(state => state.user);
	const { everything } = useSelector(state => state.everything);
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);

	useEffect(() => {
		if (!user) {
			dispatch(fetchCheckUser("/api/auth"));
		}
		if (!everything) {
			dispatch(fetchEverything());
		}
	}, [dispatch, user, everything]);

	if (loading) {
		return <div>Loading...</div>;
	}

	// console.log(everything);

	return (
		<main className='flex'>
			<div className='bg-blue-500'>
				<SideBar />
			</div>
			<div className='mt-10 md:mt-5 p-3 md:p-5 w-full relative md:ml-64'>
				<Outlet />
			</div>
		</main>
	);
};

export default UserLayout;
