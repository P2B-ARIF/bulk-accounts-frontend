import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useCrud from "../../hook/useCrud";

const MaintenancePage = () => {
	const [maintenance, setMaintenance] = useState(null);
	const [loading, setLoading] = useState(true);
	const { get, response, error } = useCrud();

	// Fetch maintenance status on load
	useEffect(() => {
		const fetchMaintenanceStatus = async () => {
			setLoading(true);
			await get("/api/maintenance");
			setLoading(false);
		};
		fetchMaintenanceStatus();
	}, []);

	// Handle response and error
	useEffect(() => {
		if (response) {
			setMaintenance(response);
		}
		if (error) {
			console.error("Error fetching maintenance status:", error.message);
		}
	}, [response, error]);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
				bg='gray.50'
			>
				<Spinner size='xl' color='blue.500' />
			</Box>
		);
	}

	// If no maintenance is active
	if (!maintenance?.enabled) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
				bg='white'
				textAlign='center'
				p='6'
			>
				<VStack>
					<Text fontSize='2xl' fontWeight='bold'>
						We're Open!
					</Text>
					<Text fontSize='md' color='gray.600'>
						Everything is running smoothly. Enjoy your experience!
					</Text>
				</VStack>
			</Box>
		);
	}

	// Maintenance mode active
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			minHeight='100vh'
			bg='gray.800'
			color='white'
			textAlign='center'
			p='6'
		>
			<VStack>
				<Text fontSize='3xl' fontWeight='bold'>
					Scheduled Maintenance
				</Text>
				<Text fontSize='lg' mt='2'>
					{maintenance.message || "We'll be back shortly."}
				</Text>
				{maintenance.endTime && (
					<Text fontSize='md' mt='2' color='gray.400'>
						Estimated End Time: {new Date(maintenance.endTime).toLocaleString()}
					</Text>
				)}
				<Text fontSize='sm' mt='4' color='gray.500'>
					Thank you for your patience!
				</Text>
			</VStack>
		</Box>
	);
};

export default MaintenancePage;
