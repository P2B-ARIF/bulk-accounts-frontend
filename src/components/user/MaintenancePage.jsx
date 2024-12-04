import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

const MaintenancePage = ({ data, loading }) => {
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
	if (!data?.enabled) {
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
					{data.message || "We'll be back shortly."}
				</Text>
				{data.endTime && (
					<Text fontSize='md' mt='2' color='gray.400'>
						Estimated End Time: {new Date(data.endTime).toLocaleString()}
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
