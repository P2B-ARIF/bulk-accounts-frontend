import { useState, useEffect } from "react";
import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
} from "@chakra-ui/react";

const CountdownTimer = ({ targetDate }) => {
	const calculateTimeLeft = () => {
		const difference = +new Date(targetDate) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	const addLeadingZero = value => {
		return value < 10 ? `0${value}` : value;
	};

	return (
		<HStack spacing={4}>
			{["days", "hours", "minutes", "seconds"].map(interval => (
				<Box key={interval} textAlign='center'>
					<Text fontSize='4xl' fontWeight='bold'>
						{addLeadingZero(timeLeft[interval])}
					</Text>
					<Text fontSize='sm' textTransform='uppercase'>
						{interval}
					</Text>
				</Box>
			))}
		</HStack>
	);
};

export default function MaintenancePage() {
	// Set the target date for the countdown (e.g., 24 hours from now)
	const targetDate = new Date(
		new Date().getTime() + 24 * 60 * 60 * 1000,
	).toISOString();

	return (
		<Container maxW='4xl' centerContent height='100vh' justifyContent='center'>
			<VStack spacing={8} align='center'>
				<img
					src='/placeholder.svg?height=200&width=200'
					alt='Maintenance Illustration'
					width={200}
					height={200}
				/>
				<Heading as='h1' size='2xl' textAlign='center'>
					We&apos;ll be back soon!
				</Heading>
				<Text fontSize='xl' textAlign='center'>
					Our site is currently undergoing scheduled maintenance. We&apos;ll be
					back online shortly.
				</Text>
				<CountdownTimer targetDate={targetDate} />
				<Button
					colorScheme='blue'
					size='lg'
					onClick={() => window.location.reload()}
				>
					Refresh Page
				</Button>
			</VStack>
		</Container>
	);
}
