import {
	Box,
	chakra,
	Table,
	Tbody,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import Payment from "../../../components/dashboard/Payment";

const MotionBox = motion(chakra.div);

const AdminPaymentHistoryTable = ({ payments }) => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	console.log(payments, "payments");

	return (
		<Box
			borderWidth='1px'
			borderRadius='lg'
			overflow='auto'
			bg={bgColor}
			borderColor={borderColor}
			boxShadow='lg'
			m={{ base: 0, md: 5 }}
			p={{ base: 2, md: 5 }}
			mt={{ base: 5, md: 0 }}
		>
			<h4 className='text-slate-800 text-lg font-semibold'>Payment History</h4>
			<Table variant='simple' size='md'>
				<Thead>
					<Tr>
						<Th>Date</Th>
						<Th>User Info</Th>
						{/* <Th>Last Payment</Th> */}
						<Th>Gateway</Th>
						{/* <Th>Reference By</Th> */}
						<Th>Notes</Th>
						<Th>Total A</Th>
						<Th>Profit</Th>
						<Th>Amount</Th>
						<Th>Payment</Th>
					</Tr>
				</Thead>
				<Tbody>
					{payments
						?.sort(
							(a, b) => new Date(b.createdAt.date) - new Date(a.createdAt.date),
						)
						?.map((order, index) => (
							<Payment key={index} order={order} />
						))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default AdminPaymentHistoryTable;
