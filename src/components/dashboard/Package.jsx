import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useCrud from "../../hook/useCrud";
import {
	addToUpdate,
	fetchPackages,
} from "../../toolkit/features/packageSlice";

const Package = ({ pack }) => {
	const bgColor = useColorModeValue("white", "gray.800");
	const fbborderColor = useColorModeValue("blue.200", "blue.700");
	const instaborderColor = useColorModeValue("pink.200", "pink.700");
	const tikborderColor = useColorModeValue("pink.500", "pink.800");
	// const borderColor = useColorModeValue("gray.200", "gray.700");

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
			borderColor={
				pack?.accountType === "facebook"
					? fbborderColor
					: pack?.accountType === "instagram"
					? instaborderColor
					: tikborderColor
			}
			// borderColor={borderColor}
			bg={bgColor}
			_hover={{ boxShadow: "lg" }}
			transition='all 0.3s'
			backgroundColor={pack?.active === false && "pink.100"}
		>
			<h3 className={`uppercase font-medium mb-2 text-center`}>
				<span
					className={`flex items-center gap-1 text-center mx-auto rounded-full justify-center py-1 capitalize ${
						pack.accountType === "facebook"
							? "bg-blue-800 text-white"
							: pack.accountType === "instagram"
							? "bg-pink-700 text-white"
							: "bg-pink-900 text-white"
					}`}
				>
					{pack.accountType === "facebook" ? (
						<FaFacebook />
					) : pack.accountType === "instagram" ? (
						<FaInstagram />
					) : (
						<FaTiktok />
					)}
					{pack.accountType}
				</span>

				{pack.accountFormat}
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
