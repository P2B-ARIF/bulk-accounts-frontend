import { Box, Divider, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Account = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			p={4}
			borderColor={borderColor}
			bg={bgColor}
			_hover={{ boxShadow: "lg" }}
			transition='all 0.3s'
		>
			<h3 className='text-lg flex justify-between font-medium text-blue-800'>
				<span>Md Arif</span>

				<b>Total: 100</b>
			</h3>
			<Box className='text-sm flex items-center gap-1 text-blue-500 mt-2'>
				<FaFacebook /> Created: 50 | Approved: 20
			</Box>
			<Divider />
			<Box className='text-sm flex items-center gap-1 text-pink-500'>
				<FaInstagram /> Created: 50 | Approved: 20
			</Box>
		</Box>
	);
};

export default Account;
