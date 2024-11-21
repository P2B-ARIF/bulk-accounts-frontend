import React from "react";
import AdminStats from "./views/AdminStats";

const AdminDashboard = () => {
	return (
		<section className='space-y-5 md:m-5 '>
			<h1 className='text-lg font-bold'>Dashboard</h1>
			<AdminStats />
			{/* <AdminDailyBar /> */}
			{/* <AdminMonthlyAnalysis /> */}
		</section>
	);
};
export default AdminDashboard;
