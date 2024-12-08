import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import MaintenancePage from "../components/user/MaintenancePage";
import useCrud from "../hook/useCrud";
import LoadingPage from "../pages/LoadingPage";
import SideBar from "../pages/user/SideBar";
import { fetchEverything } from "../toolkit/features/everythingSlice";
import { fetchCheckUser } from "../toolkit/features/userSlice";

const UserLayout = () => {
	const { user, loading: userLoading } = useSelector(state => state.user);
	const { everything, loading: everythingLoading } = useSelector(
		state => state.everything,
	);
	const location = useLocation();
	const dispatch = useDispatch();

	const [isMaintenance, setIsMaintenance] = useState(false);
	const [maintenanceData, setMaintenanceData] = useState(null);
	const { get, response, loading, error: maintenanceError } = useCrud();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);

	// Fetch user and everything data
	useEffect(() => {
		if (!user) {
			dispatch(fetchCheckUser("/api/auth"));
		}
		if (!everything) {
			dispatch(fetchEverything());
		}
	}, [dispatch, user, everything]);

	const fetchMaintenanceStatus = async () => {
		try {
			await get("/api/maintenance");
		} catch (err) {
			console.error("Error fetching maintenance status:", err.message);
		}
	};
	// Fetch maintenance status on app load
	useEffect(() => {
		if (!maintenanceData) {
			fetchMaintenanceStatus();
		}
	}, []);

	// Update maintenance state when response is received
	useEffect(() => {
		if (response) {
			setIsMaintenance(response.enabled);
			setMaintenanceData(response);
		}
		if (maintenanceError) {
			console.error("Maintenance Error:", maintenanceError.message);
		}
	}, [response, maintenanceError]);

	// Show LoadingPage if user or everything data is loading
	if (userLoading || everythingLoading) {
		return <LoadingPage />;
	}

	// Show MaintenancePage if maintenance is active
	if (isMaintenance) {
		return <MaintenancePage loading={loading} data={maintenanceData} />;
	}

	return (
		<main className='flex'>
			<div className='bg-blue-500'>
				<SideBar />
			</div>

			<div className='mt-10 md:mt-5 p-3 md:p-5 w-full relative md:ml-64'>
				{maintenanceData && <Outlet context={maintenanceData} />}
			</div>
		</main>
	);
};

export default UserLayout;
