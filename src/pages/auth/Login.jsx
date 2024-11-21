import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "../../hook/useLogin";

export default function Login() {
	const { login, loading, error, response } = useLogin("/api/auth/login");

	const navigate = useNavigate();
	const location = useLocation();

	let form = location.state?.from?.pathname || "/";

	const handleSubmit = async e => {
		e.preventDefault();

		// Extract email and password using `name` attributes
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");

		// Ensure both email and password are present
		if (!email || !password) {
			toast.error("Please fill in both email and password.");
			return;
		}

		await login({ email, password });
	};

	if (response) {
		toast.success("Login successful! Redirecting...");
		if (response.success) {
			localStorage.setItem("authToken", JSON.stringify(response.token));
		}

		navigate(form, { replace: true });
	} else if (error) {
		toast.error(`Login failed: ${error}`);
	}

	return (
		<Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
			<Box
				borderRadius='lg'
				m={{ base: 5, md: 16, lg: 10 }}
				p={{ base: 5, lg: 16 }}
			>
				<Flex>
					{/* Left Column - Login Form */}
					<Box
						bg={useColorModeValue("white", "gray.800")}
						p={8}
						maxWidth='md'
						borderWidth={1}
						borderRadius='lg'
						boxShadow='lg'
					>
						<Box textAlign='center'>
							<Heading fontSize={"4xl"}>Welcome back</Heading>
							<Text mt={4} color={useColorModeValue("gray.600", "gray.400")}>
								Enter your email and password to access your account
							</Text>
						</Box>

						<Box my={8} textAlign='left'>
							<form onSubmit={handleSubmit}>
								<FormControl isRequired>
									<FormLabel>Email address</FormLabel>
									<Input
										type='email'
										name='email' // Added name attribute
										placeholder='your-email@example.com'
									/>
								</FormControl>

								<FormControl mt={4} isRequired>
									<FormLabel>Password</FormLabel>
									<Input
										type='password'
										name='password' // Added name attribute
										placeholder='Enter your password'
									/>
								</FormControl>

								<Stack spacing={10} mt={10}>
									<Button
										bg={"blue.400"}
										color={"white"}
										_hover={{
											bg: "blue.500",
										}}
										type='submit'
										isDisabled={loading}
										isLoading={loading}
									>
										Log in
									</Button>
								</Stack>
							</form>
						</Box>
						{/* Display Error */}
						{error && <p style={{ color: "red" }}>{error}</p>}

						<Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link color={"blue.400"} href='/register'>
									Register
								</Link>
							</Text>
						</Stack>
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
}
