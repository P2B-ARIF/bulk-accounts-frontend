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

const AdminMonthlyAnalysis = () => {
	// Monthly data for the chart
	const data = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		datasets: [
			{
				label: "Revenue ($)",
				data: [
					4500, 3700, 5200, 6100, 7500, 8900, 9300, 8500, 7700, 6800, 7200,
					8000,
				], // Example revenue data
				backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
				borderColor: "rgba(54, 162, 235, 1)", // Border color
				borderWidth: 1,
			},
			{
				label: "Expenses ($)",
				data: [
					3000, 2900, 3500, 4000, 4500, 5000, 5200, 5100, 4800, 4600, 4900,
					5200,
				], // Example expenses data
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
				text: "Monthly Revenue and Expenses Analysis", // Chart title
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
			<h2 className='text-2xl font-bold text-center mb-6'>Monthly Analysis</h2>
			<div className='h-[350px] w-full md:h-[500px]'>
				<Bar data={data} options={options} />
			</div>
		</div>
	);
};

export default AdminMonthlyAnalysis;
