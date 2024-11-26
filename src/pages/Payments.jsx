"use client";

import {
	Box,
	Flex,
	IconButton,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistanceToNow, isToday, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Payments() {
	const [currentPage, setCurrentPage] = useState(1);
	const [payments, setPayments] = useState([]);
	const [totalEntries, setTotalEntries] = useState(0);
	const itemsPerPage = 10;

	const [loading, setLoading] = useState(!false);
	const [error, setError] = useState(null);

	const url = import.meta.env.VITE_SERVER_LINK;

	// Fetch payments data
	const fetchPayments = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${url}/api/withdraw/user-withdraw?limit=${itemsPerPage}&page=${currentPage}`,
			);

			if (data) {
				setPayments(data?.result || []);
				setTotalEntries(data?.total || 0);
			}
		} catch (err) {
			setError(err.message || "Failed to fetch payments");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPayments();
	}, [currentPage]);

	// Format date to show relative time for today
	const formatDate = dateString => {
		const date = parseISO(dateString);
		if (isToday(date)) {
			return `${formatDistanceToNow(date, { addSuffix: true })}`;
		}
		return new Date(date).toLocaleDateString(); // Use standard date format for older dates
	};

	// Pagination handlers
	const nextPage = () =>
		setCurrentPage(prev =>
			Math.min(prev + 1, Math.ceil(totalEntries / itemsPerPage)),
		);
	const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
	const firstPage = () => setCurrentPage(1);

	return (
		<section className='my-20 mt-36'>
			<Box
				maxW={{ base: "100%", md: "4xl" }}
				mx='auto'
				bg='white'
				shadow='lg'
				rounded='lg'
				overflow='auto'
			>
				<Box
					p={4}
					bg='gray.50'
					borderBottom='1px'
					borderColor='gray.200'
					className='w-full'
				>
					<Text
						fontSize='xl'
						fontWeight='semibold'
						color='gray.800'
						className='w-full'
					>
						Payment History
					</Text>
				</Box>
				<Box p={4}>
					<Flex justify='space-between' align='center' mb={4}>
						<Text fontSize='sm' color='gray.500'>
							Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
							{Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
							{totalEntries} entries
						</Text>
					</Flex>
					<Table variant='simple' className='w-full'>
						<Thead>
							<Tr>
								<Th>Date</Th>
								<Th>Name</Th>
								<Th>Amount</Th>
								<Th>Account</Th>
								<Th>Status</Th>
							</Tr>
						</Thead>
						<Tbody>
							{loading ? (
								<Tr>
									<Td colSpan={5} textAlign='center'>
										<Spinner size='lg' />
									</Td>
								</Tr>
							) : error ? (
								<Tr>
									<Td colSpan={5} textAlign='center' color='red.500'>
										{error}
									</Td>
								</Tr>
							) : payments.length > 0 ? (
								payments.map((payment, i) => (
									<Tr key={i}>
										<Td>{formatDate(payment?.createdAt?.date)}</Td>
										<Td>{payment?.userName || "N/A"}</Td>
										<Td>{payment?.amount?.toFixed(2)} BDT</Td>
										<Td>{payment?.accountName || "N/A"}</Td>
										<Td>
											<Box
												px={1}
												py={0.5}
												rounded='full'
												fontSize='xs'
												fontWeight='semibold'
												className='text-center'
												bg={
													payment?.payment === "success"
														? "green.100"
														: payment?.payment === "Pending"
														? "yellow.100"
														: "red.100"
												}
												color={
													payment?.payment === "success"
														? "green.800"
														: payment?.payment === "Pending"
														? "yellow.800"
														: "red.800"
												}
											>
												{payment?.payment}
											</Box>
										</Td>
									</Tr>
								))
							) : (
								<Tr>
									<Td colSpan={5} textAlign='center'>
										No payments found
									</Td>
								</Tr>
							)}
						</Tbody>
					</Table>
					<Flex mt={4} justify='space-between' align='center'>
						<Text fontSize='sm' color='gray.500'>
							Page {currentPage} of {Math.ceil(totalEntries / itemsPerPage)}
						</Text>
						<Flex>
							<IconButton
								variant='outline'
								size='sm'
								onClick={firstPage}
								isDisabled={currentPage === 1}
								icon={<ChevronsLeft size={16} />}
								aria-label='First page'
							/>
							<IconButton
								variant='outline'
								size='sm'
								onClick={prevPage}
								isDisabled={currentPage === 1}
								icon={<ChevronLeft size={16} />}
								aria-label='Previous page'
							/>
							<IconButton
								variant='outline'
								size='sm'
								onClick={nextPage}
								isDisabled={
									currentPage === Math.ceil(totalEntries / itemsPerPage)
								}
								icon={<ChevronRight size={16} />}
								aria-label='Next page'
							/>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</section>
	);
}
