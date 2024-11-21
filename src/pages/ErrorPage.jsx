import { Button, Heading, Text, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FaFlag } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const navigate = useNavigate();

	// Function to handle back to home navigation
	const handleBackHome = () => {
		navigate("/"); // Adjust the path as per your home route
	};

	return (
		<Box
			pos="absolute"
			top={0}
			left={0}
			w="full"
			h="100vh"
			bg="white"
			display="flex"
			alignItems="center"
			justifyContent="center"
            zIndex={50}
		>
			<Flex direction="column" align="center" textAlign="center" p={8}>
				<FaFlag size={50} className="mx-auto text-primary" />
				<Heading
					as="h2"
					color="blue.400"
					mt={10}
					fontSize={{ base: "2xl", md: "3xl" }}
					lineHeight="shorter"
				>
					Error 404 <br /> It looks like something went wrong.
				</Heading>
				<Text
					mt={8}
					mb={14}
					fontSize="lg"
					color="gray.500"
					maxW="sm"
					mx="auto"
				>
					Don&apos;t worry, our team is already on it. Please try refreshing the
					page or come back later.
				</Text>
				<Button
					colorScheme="blue"
					onClick={handleBackHome}
					w={{ base: "full", md: "8rem" }}
					px={4}
				>
					Back Home
				</Button>
			</Flex>
		</Box>
	);
};

export default ErrorPage;
