import React, { useEffect } from "react";
import Navbar from "../views/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../views/Footer";

const MainLayout = () => {

	return (
		<div className='flex flex-col justify-between min-h-screen relative'>
			<Navbar />
			<div className='flex-1'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
