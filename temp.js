import {
	Box,
	Button,
	Grid,
	IconButton,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorMode,
} from "@chakra-ui/react";
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { FiRefreshCw, FiTrash } from "react-icons/fi";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const Maintenance = () => {
	const { colorMode } = useColorMode();

	// Example Data
	const backupData = [
		{ id: 1, date: "2024-11-17", status: "Success" },
		{ id: 2, date: "2024-11-16", status: "Failed" },
		{ id: 3, date: "2024-11-15", status: "Success" },
	];

	const errorLogs = [
		{
			id: 1,
			message: "Database connection timeout",
			date: "2024-11-16",
			severity: "Critical",
		},
		{
			id: 2,
			message: "Memory usage exceeded 80%",
			date: "2024-11-15",
			severity: "Warning",
		},
	];

	const chartData = {
		labels: ["CPU", "Memory", "Network"],
		datasets: [
			{
				label: "Usage (%)",
				data: [45, 70, 60],
				backgroundColor: colorMode === "light" ? "#3182ce" : "#90cdf4",
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: true, position: "top" },
			title: { display: true, text: "Server Performance Metrics" },
		},
	};

	return (
		<Box p={4}>
			<Grid
				templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
				gap={4}
				mb={4}
			>
				{/* Server Status */}
				<Stat shadow='md' p={4} borderRadius='lg' bg='gray.50'>
					<StatLabel>Server Uptime</StatLabel>
					<StatNumber>99.98%</StatNumber>
					<StatHelpText>Last Downtime: 5 mins</StatHelpText>
				</Stat>

				{/* Backups */}
				<Stat shadow='md' p={4} borderRadius='lg' bg='gray.50'>
					<StatLabel>Last Backup</StatLabel>
					<StatNumber>2024-11-17</StatNumber>
					<Button
						size='sm'
						mt={2}
						colorScheme='blue'
						leftIcon={<FiRefreshCw />}
					>
						Run Backup
					</Button>
				</Stat>

				{/* Logs */}
				<Stat shadow='md' p={4} borderRadius='lg' bg='gray.50'>
					<StatLabel>Error Logs</StatLabel>
					<StatNumber>{errorLogs.length} Issues</StatNumber>
					<StatHelpText>Check logs for details</StatHelpText>
				</Stat>
			</Grid>

			{/* Performance Chart */}
			<Box shadow='md' p={4} borderRadius='lg' bg='gray.50' mb={4}>
				<Text fontSize='xl' fontWeight='bold' mb={2}>
					Performance Metrics
				</Text>
				<Box height='300px'>
					<Bar data={chartData} options={chartOptions} />
				</Box>
			</Box>

			<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
				{/* Backup Logs */}
				<Box shadow='md' p={4} borderRadius='lg' bg='gray.50'>
					<Text fontSize='xl' fontWeight='bold' mb={2}>
						Backup Logs
					</Text>
					<Table size='sm'>
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Date</Th>
								<Th>Status</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{backupData.map(backup => (
								<Tr key={backup.id}>
									<Td>{backup.id}</Td>
									<Td>{backup.date}</Td>
									<Td>
										<Text
											color={
												backup.status === "Success" ? "green.500" : "red.500"
											}
										>
											{backup.status}
										</Text>
									</Td>
									<Td>
										<IconButton
											size='sm'
											icon={<FiTrash />}
											aria-label='Delete Backup'
											colorScheme='red'
											variant='ghost'
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>

				{/* Error Logs */}
				<Box shadow='md' p={4} borderRadius='lg' bg='gray.50'>
					<Text fontSize='xl' fontWeight='bold' mb={2}>
						Error Logs
					</Text>
					<Table size='sm'>
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Message</Th>
								<Th>Date</Th>
								<Th>Severity</Th>
							</Tr>
						</Thead>
						<Tbody>
							{errorLogs.map(log => (
								<Tr key={log.id}>
									<Td>{log.id}</Td>
									<Td>{log.message}</Td>
									<Td>{log.date}</Td>
									<Td>
										<Text
											color={
												log.severity === "Critical" ? "red.500" : "yellow.500"
											}
										>
											{log.severity}
										</Text>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			</Grid>
		</Box>
	);
};

export default Maintenance;

const UserDailyStatsSchema = new mongoose.Schema({
	// Reference to the user
	userID: { type: String, required: true }, // Link to the user

	// Date-specific stats
	date: { type: Date, required: true }, // Unique per user and day
	date_fns: { type: String }, // Readable date (e.g., "2024-11-18")

	// Aggregated data for each account type
	accounts: [
		{
			accountType: { type: String, required: true }, // e.g., "facebook"
			accountFormat: { type: String }, // e.g., "premium", "standard"
			totalRate: { type: Number, default: 0 }, // Sum of rates for the day
			count: { type: Number, default: 0 }, // Number of accounts for this type
		},
	],
});

const updateUserDailyStats = async (account, userID) => {
	const { accountType, accountFormat, rate } = account;

	// Get the current date
	const today = new Date();
	const dateString = today.toISOString().split("T")[0]; // e.g., "2024-11-18"

	try {
		// Check if stats for today already exist for the user
		let userDailyStats = await UserDailyStatsModel.findOne({
			userID,
			date: dateString,
		});

		if (!userDailyStats) {
			// If no stats exist for today, create a new document
			userDailyStats = new UserDailyStatsModel({
				userID,
				date: dateString,
				date_fns: today.toLocaleDateString(), // Human-readable date
				accounts: [],
			});
		}

		// Find the accountType within today's stats
		const accountIndex = userDailyStats.accounts.findIndex(
			a => a.accountType === accountType && a.accountFormat === accountFormat,
		);

		if (accountIndex > -1) {
			// If accountType exists, update the count and totalRate
			userDailyStats.accounts[accountIndex].count += 1;
			userDailyStats.accounts[accountIndex].totalRate += rate;
		} else {
			// Otherwise, add a new accountType entry
			userDailyStats.accounts.push({
				accountType,
				accountFormat,
				totalRate: rate,
				count: 1,
			});
		}

		// Save the updated stats
		await userDailyStats.save();
		console.log("User daily stats updated successfully!");
	} catch (error) {
		console.error("Error updating user daily stats:", error);
	}
};

const account = {
	accountType: "facebook",
	accountFormat: "premium",
	rate: 100,
};

const userID = "user123"; // The specific user's ID

updateUserDailyStats(account, userID);

const userStats = await UserDailyStatsModel.findOne({
	userID: "user123",
	date: "2024-11-18",
});
console.log(userStats);

const rangeStats = await UserDailyStatsModel.find({
	userID: "user123",
	date: { $gte: "2024-11-01", $lte: "2024-11-18" },
});
console.log(rangeStats);
// const rateSummary = accounts.reduce((acc, item) => {
// 	const { userID, rate } = item;
// 	if (!acc[userID]) {
// 		acc[userID] = { userID, totalRate: 0, userEmail: item.userEmail };
// 	}
// 	acc[userID].totalRate += rate;
// 	return acc;
// }, {});

<div className='flex items-center gap-1 text-sm'>
	{/* Conditional rendering for trend icon and color */}
	{change.trend === "up" ? (
		<IoIosArrowUp className='h-4 w-4 text-emerald-600' />
	) : (
		<IoIosArrowDown className='h-4 w-4 text-red-600' />
	)}
	<span className={`text-${change.trend === "up" ? "emerald" : "red"}-600`}>
		{change.value} {change.label}
	</span>
</div>;
