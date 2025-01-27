import {
	Box,
	Button,
	Input,
	Menu,
	MenuItem,
	MenuList,
	useColorModeValue,
} from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlinePassword } from "react-icons/md";
import useCrud from "../../../hook/useCrud";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../../toolkit/features/userSlice";

const UpdatePassword = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { put, response, loading, error } = useCrud();
	const dispatch = useDispatch();

	const { allUsers } = useSelector(state => state.user);

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

		if (!allUsers) {
			dispatch(fetchAllUser());
		}
	}, [response, error]);

	console.log(allUsers, "all");

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
				<div className='relative w-full'>
					<Input
						bg='gray.100'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Enter user email'
					/>

					{/* Dropdown for matching emails */}
					{!allUsers?.find(e => e.email === email) &&
						email.trim().length > 0 && (
							<div className='absolute bg-slate-700 z-10 text-white border rounded shadow-md mt-1 w-full max-h-60 overflow-y-auto'>
								{/* Filtered users */}
								{allUsers
									?.filter(user =>
										user.email.toLowerCase().includes(email.toLowerCase()),
									)
									.map((user, i) => (
										<button
											key={user.id || i} // Use user.id if available; fallback to index
											className='block w-full text-left px-3 py-2 hover:bg-gray-600'
											onClick={() => setEmail(user.email)} // Set email when clicked
										>
											{user.email}
										</button>
									))}

								{/* No match fallback */}
								{!allUsers?.some(user =>
									user.email.toLowerCase().includes(email.toLowerCase()),
								) && (
									<div className='px-3 py-2 text-gray-500'>
										No matching users found.
									</div>
								)}
							</div>
						)}
				</div>

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
