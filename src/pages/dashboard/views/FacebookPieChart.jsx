import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const FacebookPieChart = () => {
	// Data example
	const data = {
		labels: [
			"Facebook Accounts",
			"Instagram Accounts",
			"Pending Actions",
			"Failed Actions",
		],
		datasets: [
			{
				label: "Actions",
				data: [35, 30, 20, 15], // Example values: Customize based on your project
				backgroundColor: [
					"rgba(54, 162, 235, 0.6)", // Facebook Accounts
					"rgba(255, 99, 132, 0.6)", // Instagram Accounts
					"rgba(255, 205, 86, 0.6)", // Pending Actions
					"rgba(75, 192, 192, 0.6)", // Failed Actions
				],
				borderColor: [
					"rgba(54, 162, 235, 1)",
					"rgba(255, 99, 132, 1)",
					"rgba(255, 205, 86, 1)",
					"rgba(75, 192, 192, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	// Chart options
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			tooltip: {
				enabled: true,
			},
		},
	};

	return (
		<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5 w-full'>
			<h2 className='text-2xl font-bold text-center mb-6'>
				Account Actions Overview
			</h2>
			<div className='w-full h-[300px] flex justify-center items-center'>
				<Pie data={data} options={options} />
			</div>
		</div>
	);
};

export default FacebookPieChart;
