import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hook/useRegister";

export default function Register() {
	const [show, setShow] = useState(false);
	const { register, loading, error, response } =
		useRegister("/api/auth/register");

	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		const name = e.target.name.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const number = e.target.number.value;
		const gender = e.target.gender.value;
		const data = { name, email, password, number, gender };
		await register(data);
	};

	if (response) {
		toast.success(response.message);
		navigate("/login");
	}

	if (error) {
	}

	return (
		<Container
			maxW='xl'
			mt={"10"}
			py={{ base: "12", md: "24" }}
			px={{ base: "0", sm: "8" }}
		>
			<Box
				py={{ base: "8", sm: "8" }}
				px={{ base: "4", sm: "10" }}
				bg={{ base: "transparent", sm: "bg-surface" }}
				boxShadow={{ base: "none", sm: "md" }}
				borderRadius={{ base: "none", sm: "xl" }}
			>
				<VStack spacing='8'>
					<Heading size={{ base: "md", md: "xl" }}>Create an account</Heading>
					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<VStack spacing='6'>
							<FormControl isRequired>
								<FormLabel htmlFor='name'>Full Name</FormLabel>
								<Input id='name' type='text' />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='email'>Email address</FormLabel>
								<Input id='email' type='email' />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='number'>Phone Number</FormLabel>
								<Input id='number' type='number' />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='gender'>Gender</FormLabel>
								<Select id='gender' placeholder='Select gender'>
									<option value='male'>Male</option>
									<option value='female'>Female</option>
									<option value='other'>Other</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<InputGroup>
									<Input id='password' type={show ? "text" : "password"} />
									<InputRightElement width='4.5rem'>
										<Button
											h='1.75rem'
											size='sm'
											onClick={() => setShow(!show)}
										>
											{show ? <EyeClosed /> : <Eye />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							{error && <p className='text-red-500'>{error}</p>}

							<Button
								type='submit'
								colorScheme='blue'
								// size='lg'
								fontSize='md'
								isDisabled={loading}
								isLoading={loading}
								w={"180px"}
							>
								Register
							</Button>
						</VStack>
					</form>
				</VStack>
				<Text mt='6' textAlign='center'>
					Already have an account?{" "}
					<Link color='blue.500' href='/login'>
						Sign in
					</Link>
				</Text>
			</Box>
		</Container>
	);
}
