import {
	Badge,
	Box,
	chakra,
	Flex,
	Heading,
	Icon,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

const MotionBox = motion(chakra.div);

const FacebookAccountsTable = () => {
	const data = [
		{
			date: "2024-11-01",
			accountFormat: "Facebook",
			rate: 15,
			createdAt: "10:00 AM",
			attempt: 1,
		},
		{
			date: "2024-11-01",
			accountFormat: "Instagram",
			rate: 20,
			createdAt: "10:30 AM",
			attempt: 2,
		},
		{
			date: "2024-11-01",
			accountFormat: "Facebook",
			rate: 25,
			createdAt: "11:00 AM",
			attempt: 3,
		},
		{
			date: "2024-11-01",
			accountFormat: "Instagram",
			rate: 18,
			createdAt: "11:30 AM",
			attempt: 1,
		},
		{
			date: "2024-11-01",
			accountFormat: "Facebook",
			rate: 30,
			createdAt: "12:00 PM",
			attempt: 2,
		},
		{
			date: "2024-11-01",
			accountFormat: "Instagram",
			rate: 22,
			createdAt: "12:30 PM",
			attempt: 1,
		},
		{
			date: "2024-11-01",
			accountFormat: "Facebook",
			rate: 28,
			createdAt: "01:00 PM",
			attempt: 1,
		},
		{
			date: "2024-11-01",
			accountFormat: "Instagram",
			rate: 26,
			createdAt: "01:30 PM",
			attempt: 2,
		},
		{
			date: "2024-11-01",
			accountFormat: "Facebook",
			rate: 35,
			createdAt: "02:00 PM",
			attempt: 3,
		},
		{
			date: "2024-11-01",
			accountFormat: "Instagram",
			rate: 32,
			createdAt: "02:30 PM",
			attempt: 1,
		},
	];

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const hoverBg = useColorModeValue("gray.50", "gray.700");

	return (
		<Box
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			bg={bgColor}
			borderColor={borderColor}
			boxShadow='lg'
			ml={5}
			mt={5}
		>
			<Box p={6}>
				<Heading
					size='md'
					mb={4}
					color={useColorModeValue("gray.700", "white")}
					className='font-lato'
				>
					Facebook Attempt History
				</Heading>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Format</Th>
							<Th>Rate</Th>
							<Th>Attempt</Th>
							<Th>CreatedAt</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map((item, index) => (
							<Tr key={index} _hover={{ bg: hoverBg }} transition='all 0.2s'>
								<Td>
									<Text fontWeight='medium'>
										{new Date(item.date).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											// year: "numeric",
										})}
									</Text>
								</Td>

								<Td>{item.accountFormat}</Td>
								<Td>{item.rate}</Td>
								<Td>{item.attempt}</Td>
								<Td>{item.createdAt}</Td>
								<Td>
									<Tooltip label='Click for details' aria-label='Rate details'>
										Resolved
									</Tooltip>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default FacebookAccountsTable;
