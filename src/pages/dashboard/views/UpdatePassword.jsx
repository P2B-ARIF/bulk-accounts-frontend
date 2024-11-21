import { Box, Button, Input, useColorModeValue } from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlinePassword } from "react-icons/md";
import useCrud from "../../../hook/useCrud";

const UpdatePassword = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { put, response, loading, error } = useCrud();

	const handlePassword = async () => {
		if (!email || !password) {
			return toast.error("Please enter a message");
		}
		await put("/api/auth/forgot-password", { email, password });
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setEmail("");
			setPassword("");
		}

		if (error) {
			toast.error(error);
		}
	}, [response, error]);

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			p={4}
			borderColor={borderColor}
			bg={bgColor}
			_hover={{ boxShadow: "lg" }}
			w={"full"}
			transition='all 0.3s'
		>
			<h3 className='mb-2 pl-1 font-medium flex items-center gap-1 text-blue-500 uppercase'>
				<MdOutlinePassword size={22} />
				Update Password
			</h3>

			<div className='flex flex-col items-center gap-2'>
				<Input
					bg='gray.100'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Enter user email'
				/>
				<Input
					bg='gray.100'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Enter user new password'
				/>

				<Button
					isLoading={loading}
					isDisabled={loading}
					onClick={handlePassword}
					leftIcon={<UploadIcon size={18} />}
					colorScheme='blue'
					mr='auto'
					px='20px'
					width={{ base: "full", sm: "auto" }}
				>
					Update Password
				</Button>
			</div>
		</Box>
	);
};

export default UpdatePassword;
