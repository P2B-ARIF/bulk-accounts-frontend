import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const AdminDailyBar = () => {
	// Get the current month and number of days
	const currentMonth = new Date().getMonth(); // 0-11 (Jan-Dec)
	const currentYear = new Date().getFullYear();
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get number of days in the current month

	// Generate labels for each day in the current month
	const labels = Array.from({ length: daysInMonth }, (_, index) => index + 1); // Days from 1 to the last day of the month

	// Example data (Revenue and Expenses) for each day
	const revenueData = Array.from(
		{ length: daysInMonth },
		() => Math.floor(Math.random() * 200) + 100,
	); // Random revenue data between 100 and 300
	const expenseData = Array.from(
		{ length: daysInMonth },
		() => Math.floor(Math.random() * 150) + 50,
	); // Random expenses data between 50 and 200

	// Chart data
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Revenue ($)",
				data: revenueData,
				backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
				borderColor: "rgba(54, 162, 235, 1)", // Border color
				borderWidth: 1,
			},
			{
				label: "Expenses ($)",
				data: expenseData,
				backgroundColor: "rgba(255, 99, 132, 0.6)", // Bar color
				borderColor: "rgba(255, 99, 132, 1)", // Border color
				borderWidth: 1,
			},
		],
	};

	// Chart options
	const options = {
		responsive: true,
		maintainAspectRatio: false, // Allow chart to grow with container
		plugins: {
			legend: {
				position: "top", // Legend position
			},
			title: {
				display: true,
				text: `Daily Revenue and Expenses for ${new Date().toLocaleString(
					"default",
					{ month: "long" },
				)} ${currentYear}`, // Dynamic chart title
			},
		},
		scales: {
			y: {
				beginAtZero: true, // Start y-axis at zero
			},
		},
	};

	return (
		<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-2 md:p-5 w-full'>
			<h2 className='text-2xl font-bold text-center mb-6'>Daily Analysis</h2>
			<div className='h-[350px] w-full md:h-[500px]'>
				<Bar data={data} options={options} />
			</div>
		</div>
	);
};

export default AdminDailyBar;
