import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../pages/dashboard/views/SideBar";
import { fetchCheckUser } from "../toolkit/features/userSlice";

const AdminLayout = () => {
	const { user, loading, error } = useSelector(state => state.user);
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);

	console.log(user);

	useEffect(() => {
		if (!user) {
			dispatch(fetchCheckUser("/api/auth"));
		}

		if (user) {
			if (user.role !== "admin") {
				window.location.href = "/";
			}
		}
	}, [dispatch, user]);

	return (
		<main className='flex'>
			<SideBar />
			<div className='mt-14 md:mt-5 p-3 md:p-5 w-full relative md:ml-64'>
				<Outlet />
			</div>
		</main>
	);
};

export default AdminLayout;
