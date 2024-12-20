import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import {
	MdBusAlert,
	MdManageHistory,
	MdOutlineManageAccounts,
	MdPayments,
} from "react-icons/md";
import { TbLayoutDashboard, TbPackages } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
	const { user, loading, error } = useSelector(state => state.user);

	const [show, setShow] = useState(false);
	const location = useLocation();

	const navLists = [
		{ url: "/admin", icon: TbLayoutDashboard, name: "Dashboard" },
		{ url: "/admin/controller", icon: IoMdSettings, name: "Controller" },
		{ url: "/admin/accounts", icon: MdOutlineManageAccounts, name: "Accounts" },
		{ url: "/admin/facebook", icon: FaFacebook, name: "Facebook" },
		{ url: "/admin/instagram", icon: FaInstagram, name: "Instagram" },
		{ url: "/admin/history", icon: MdManageHistory, name: "History" },
		{ url: "/admin/payment", icon: MdPayments, name: "Payment" },
		{ url: "/admin/sale-hole", icon: MdBusAlert, name: "Sale & BlackHole" },
		{ url: "/admin/packages", icon: TbPackages, name: "Packages" },
	];

	return (
		<div>
			<button
				onClick={() => setShow(!show)}
				aria-controls='default-sidebar'
				type='button'
				className='absolute top-0 right-4 z-[50] bg-white inline-flex items-center p-1.5 mt-3 ms-3 text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
			>
				<span className='sr-only'>Open sidebar</span>
				{show ? <CgClose size={30} /> : <HiMenuAlt2 size={30} />}
			</button>

			<aside
				className={`fixed top-0 left-0 z-[20] h-full w-64 bg-white transition-transform md:translate-x-0 ${
					show !== true && "-translate-x-full"
				}`}
				aria-label='Sidebar'
			>
				<div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 border-r border-gray-400 pt-5 relative'>
					<div className='py-5'>
						<h2 className='text-center font-bold text-black_c text-lg'>
							{user?.name}
						</h2>
						<p className='text-center text-black_c text-sm pt-1'>
							{user?.email}
						</p>
					</div>

					<div className='flex flex-col'>
						<ul className='space-y-2 font-medium'>
							{navLists?.map((nav, index) => (
								<li key={index} onClick={() => setShow(false)}>
									<Link
										to={nav.url}
										className={`flex items-center p-2 rounded-lg transition-all duration-300 ease-linear group ${
											location.pathname === nav.url
												? "bg-primary text-white" // Active styling
												: "text-gray-700 hover:bg-gray-200" // Default styling
										}`}
									>
										<nav.icon size={22} />
										<span className='ms-3'>{nav.name}</span>
									</Link>
								</li>
							))}
						</ul>

						<button
							onClick={() => {
								localStorage.removeItem("authToken");
								window.location.reload();
							}}
							className='absolute bottom-5 left-5 right-5 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center py-2 rounded-lg transition-all duration-300 w-[200px]'
						>
							<IoLogOut size={24} />
							<span className='ms-3 whitespace-nowrap'>Log Out</span>
						</button>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default SideBar;
