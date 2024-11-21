import React from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import {
	FiActivity,
	FiDollarSign,
	FiShoppingCart,
	FiUsers,
} from "react-icons/fi";
import StatCard from "../../../components/dashboard/StatCard";

const AdminStats = () => {
	const dashboardStatDetails = [
		{
			title: "Revenue",
			count: "$56,790",
			icon: FiDollarSign,
			increase: "8.36%",
		},

		{ title: "Total Users", count: "00", icon: FiUsers, increase: "23%" },

		{ title: "Orders", count: "928", icon: FiShoppingCart, decrease: "3.02%" },

		{
			title: "Total Facebook Account",
			count: "00",
			icon: FiUsers,
			increase: "23%",
		},
		{
			title: "Total Instagram Account",
			count: "00",
			icon: FiUsers,
			increase: "23%",
		},

		{
			title: "Resolved Facebook",
			count: "$61.20",
			icon: FiActivity,
			increase: "5.4%",
		},
		{
			title: "Resolved Instagram",
			count: "3.42%",
			icon: AiOutlinePercentage,
			increase: "1.2%",
		},
		{ title: "Facebook Die", count: "42", icon: BiTask },
		{ title: "Instagram Die", count: "42", icon: BiTask },
	];

	return (
		<div className='grid gap-4 md:grid-cols-5'>
			{dashboardStatDetails.map((s, i) => (
				<StatCard key={i} stat={s} />
			))}
		</div>
	);
};

export default AdminStats;
