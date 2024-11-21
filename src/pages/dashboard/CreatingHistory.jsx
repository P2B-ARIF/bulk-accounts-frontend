import {
	Box,
	chakra,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const MotionBox = motion(chakra.div);

const CreatingHistory = () => {
	const data = [
		{
			createdAt: {
				date: "2024-11-01",
				date_fns: "10:00:00",
			},
			accountType: "Facebook",
			accountFormat: "Personal",
			rate: 15,
			profile: {
				name: "Maria Lopez",
				email: "maria.lopez@example.com",
				number: "01710000002",
			},
		},
		{
			createdAt: {
				date: "2024-11-01",
				date_fns: "10:00:00",
			},
			accountType: "Facebook",
			accountFormat: "Personal",
			rate: 15,
			profile: {
				name: "Maria Lopez",
				email: "maria.lopez@example.com",
				number: "01710000002",
			},
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
				<h4 className='text-lg font-bold mb-3 text-slate-800'>
					Creating History
				</h4>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Time</Th>
							<Th>Account</Th>
							<Th>Format</Th>
							<Th>Rate</Th>
							<Th>Profile</Th>
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
											year: "numeric",
										})}
									</Text>
								</Td>
								<Td>{item.accountType}</Td>
								<Td>{item.accountType}</Td>
								<Td>{item.accountFormat}</Td>
								<Td>{item.rate}</Td>
								<Td fontSize='sm'>
									<Text fontWeight='bold'>{item.profile.name}</Text>
									<Text color='gray.500' fontSize='xs'>
										{item.profile.email}
									</Text>
									<Text color='gray.500' fontSize='xs'>
										{item.profile.number}
									</Text>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default CreatingHistory;
