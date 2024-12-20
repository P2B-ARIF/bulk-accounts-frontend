import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useCrud from "../../hook/useCrud";
import {
	addToUpdate,
	fetchPackages,
} from "../../toolkit/features/packageSlice";

const Package = ({ pack }) => {
	const bgColor = useColorModeValue("white", "gray.800");
	const bgColorFalse = useColorModeValue("red", "red.300");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const { del, response, loading, error } = useCrud();

	const dispatch = useDispatch();

	const handleDelete = async () => {
		await del(`/api/packages/${pack._id}`);
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			dispatch(fetchPackages());
		}

		if (error) {
			toast.error(error);
		}
	}, [response, error, dispatch]);

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			p={4}
			borderColor={borderColor}
			bg={bgColor}
			_hover={{ boxShadow: "lg" }}
			transition='all 0.3s'
			backgroundColor={pack?.active === false && "red.100"}
		>
			<h3 className='text-lg uppercase font-medium mb-2 text-blue-800'>
				{pack.accountType} {pack.accountFormat}
			</h3>
			<Text fontSize='sm' color='gray.600'>
				<Text as='span' fontWeight='medium'>
					Today Rate:
				</Text>{" "}
				{pack.rate} Taka
			</Text>
			<Text fontSize='sm' color='gray.600'>
				<Text as='span' fontWeight='medium'>
					Estimated Time:
				</Text>{" "}
				{pack.time} Minute
			</Text>
			<Text fontSize='sm' color='gray.600'>
				{pack.message}
			</Text>

			<div className='flex items-center gap-2 mt-3'>
				<Button
					onClick={() => {
						dispatch(addToUpdate(pack));
					}}
					leftIcon={<UploadIcon size={18} />}
					colorScheme='blue'
					px='10px'
					width={{ base: "full", sm: "auto" }}
					size={"sm"}
				>
					Update
				</Button>
				<Button
					onClick={handleDelete}
					leftIcon={<UploadIcon size={18} />}
					colorScheme='red'
					px='10px'
					width={{ base: "full", sm: "auto" }}
					size={"sm"}
				>
					Delete
				</Button>
			</div>
		</Box>
	);
};

export default Package;
