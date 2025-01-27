import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	Textarea,
	useColorModeValue,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useCrud from "../../../hook/useCrud";
import {
	addToUpdate,
	fetchPackages,
	updateModelOpen,
} from "../../../toolkit/features/packageSlice";

const UpdateTypeFormat = ({ update, updateModel }) => {
	const [accountData, setAccountData] = useState(update || {});
	const { put, response, loading, error } = useCrud();

	const bgColor = useColorModeValue("white", "gray.800");
	const dispatch = useDispatch();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setAccountData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSelectChange = (name, value) => {
		setAccountData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		await put(`/api/packages/${update._id}`, accountData);
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			dispatch(updateModelOpen(false));
			dispatch(fetchPackages());
			dispatch(addToUpdate(null));
		}

		if (error) {
			toast.error(error);
		}
	}, [response, error, dispatch]);

	return (
		<>
			{updateModel && (
				<Box
					position='fixed'
					top='0'
					left='0'
					width='100vw'
					height='100vh'
					bg='rgba(0, 0, 0, 0.3)'
					display='flex'
					justifyContent='center'
					alignItems='center'
					zIndex={"30"}
				>
					<Box
						p={{ base: 3, md: 6 }}
						pt={6}
						bg={bgColor}
						borderRadius='lg'
						width={{ base: "95%", md: "80%" }}
						maxWidth='600px'
						boxShadow='xl'
						position='relative'
					>
						<Button
							position='absolute'
							top='10px'
							right='10px'
							onClick={() => {
								dispatch(updateModelOpen(false));
								dispatch(addToUpdate(null));
							}}
						>
							<X size={20} />
						</Button>
						<Heading size='md' mb={3}>
							Create Package
						</Heading>

						<FormControl mb={3} isRequired>
							<FormLabel>Account Type</FormLabel>
							<Select
								id='type'
								name='accountType'
								value={accountData.accountType}
								onChange={e =>
									handleSelectChange("accountType", e.target.value)
								}
								placeholder='Select type'
							>
								<option value='facebook'>Facebook</option>
								<option value='instagram'>Instagram</option>
							</Select>
						</FormControl>

						<FormControl mb={3} isRequired>
							<FormLabel>Account Format</FormLabel>
							<Input
								name='accountFormat'
								value={accountData.accountFormat}
								onChange={handleInputChange}
								placeholder='Enter Account Format (e.g., COOKIE_2FA_00+)'
							/>
						</FormControl>

						<div className='max-md:flex gap-2'>
							<FormControl mb={3} isRequired>
								<FormLabel>Rate (Taka)</FormLabel>
								<Input
									name='rate'
									type='number'
									value={accountData.rate}
									onChange={handleInputChange}
									placeholder='Enter Rate'
								/>
							</FormControl>

							<FormControl mb={3} isRequired>
								<FormLabel>Time</FormLabel>
								<Input
									name='time'
									type='number'
									value={accountData.time}
									onChange={handleInputChange}
									placeholder='Enter Time'
								/>
							</FormControl>
						</div>

						<FormControl mb={3} isRequired>
							<FormLabel htmlFor='active'>Account Status</FormLabel>
							<Select
								id='active'
								name='active'
								value={accountData.active}
								onChange={e =>
									handleSelectChange("active", e.target.value === "true")
								}
								placeholder='Select Mode'
							>
								<option value='true'>True</option>
								<option value='false'>False</option>
							</Select>
						</FormControl>

						<FormControl mb={3}>
							<FormLabel>Message</FormLabel>
							<Textarea
								name='message'
								value={accountData.message}
								onChange={handleInputChange}
								placeholder='Enter a brief message'
							/>
						</FormControl>

						<FormControl mb={3}>
							<FormLabel>File URL</FormLabel>
							<Input
								name='fileUrl'
								value={accountData.fileUrl}
								onChange={handleInputChange}
								placeholder='Enter Image URL'
							/>
						</FormControl>

						<Flex justify='flex-end' gap={4}>
							<Button
								colorScheme='red'
								onClick={() => {
									dispatch(updateModelOpen(false));
									dispatch(addToUpdate(null));
								}}
							>
								Cancel
							</Button>
							<Button
								isLoading={loading}
								isDisabled={loading}
								colorScheme='teal'
								onClick={handleSubmit}
							>
								Update
							</Button>
						</Flex>
					</Box>
				</Box>
			)}
		</>
	);
};

export default UpdateTypeFormat;
