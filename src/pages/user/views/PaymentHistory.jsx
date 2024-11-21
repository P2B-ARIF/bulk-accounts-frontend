import {
	Badge,
	Box,
	chakra,
	Heading,
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
import { useSelector } from "react-redux";

const MotionBox = motion(chakra.div);

const PaymentHistory = () => {
	const { everything, loading, error } = useSelector(state => state.everything);

	const withdraw = everything?.withdraw;

	// console.log(withdraw, "withdraw");

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const hoverBg = useColorModeValue("gray.50", "gray.700");

	const getBadgeColor = status => {
		switch (status) {
			case "success":
				return "green";
			case "pending":
				return "yellow";
			default:
				return "gray";
		}
	};

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
				>
					Payment History
				</Heading>
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Email</Th>
							<Th>Total A</Th>
							<Th>Amount</Th>
							<Th>Number</Th>
							<Th>Payment</Th>
						</Tr>
					</Thead>
					<Tbody>
						{withdraw?.length > 0 &&
							[...withdraw] // Clone the array to avoid mutating the original
								.sort(
									(a, b) =>
										new Date(b.createdAt.date) - new Date(a.createdAt.date),
								)
								?.map((item, index) => (
									<Tr
										key={index}
										_hover={{ bg: hoverBg }}
										transition='all 0.2s'
									>
										<Td>
											<Text fontWeight='medium'>{item.createdAt.date_fns}</Text>
										</Td>
										<Td>{item.userEmail}</Td>
										<Td>{item.totalAccounts}</Td>
										<Td>{item.amount}</Td>
										<Td>
											{item.accountNumber} <br />
											{item.accountName}
										</Td>
										<Td>
											<Badge
												colorScheme={getBadgeColor(item.payment)}
												borderRadius='full'
												px={2}
												py={1}
												fontWeight='medium'
												className='uppercase'
											>
												{item.payment}
											</Badge>
										</Td>
									</Tr>
								))}
					</Tbody>
				</Table>
			</Box>
		</Box>
	);
};

export default PaymentHistory;
