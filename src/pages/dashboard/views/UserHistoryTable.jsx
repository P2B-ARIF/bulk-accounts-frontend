import {
	Box,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAccounts } from "../../../toolkit/features/dashboard/accountsSlice";

const UserHistoryTable = () => {
	const { accounts, loading, error } = useSelector(state => state.accounts);
	const { email } = useParams();
	const dispatch = useDispatch();

	// Fetch accounts if not already loaded
	useEffect(() => {
		if (!accounts || accounts.length === 0) {
			dispatch(fetchAccounts());
		}
	}, [dispatch, accounts]);

	// Filter accounts by user email
	const filterAccounts = useMemo(
		() => accounts?.filter(acc => acc.userEmail === email) || [],
		[accounts, email],
	);

	// Extract unique account formats and their counts
	const accountFormatCounts = useMemo(() => {
		const formatMap = {};
		filterAccounts.forEach(acc => {
			formatMap[acc.accountFormat] = (formatMap[acc.accountFormat] || 0) + 1;
		});
		return formatMap;
	}, [filterAccounts]);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (error) {
		return <Text color='red.500'>Error loading accounts: {error}</Text>;
	}

	if (!filterAccounts.length) {
		return <Text>No accounts found for this user.</Text>;
	}

	const hoverBg = useColorModeValue("gray.50", "gray.700");
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<div>
			<h3 className='text-lg font-semibold text-slate-700'>
				User History Table - {email}
			</h3>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
				{Object.entries(accountFormatCounts).map(([format, count], index) => (
					<div
						key={index}
						className='rounded-lg border bg-card text-card-foreground shadow-sm p-5'
					>
						<div className='flex items-center justify-between'>
							<div>
								<h3 className='text-xl font-medium mb-1'>{format}</h3>
								<Text className='text-2xl font-semibold'>{count}</Text>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* account history table */}
			<Box
				borderWidth='1px'
				borderRadius='lg'
				overflow='auto'
				bg={bgColor}
				borderColor={borderColor}
				boxShadow='lg'
				// m={{ base: 0, md: 5 }}
				// p={{ base: 2, md: 5 }}
				mt={5}
			>
				<Table variant='simple' size='sm'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Uid</Th>
							<Th>Email</Th>
							<Th>Pass</Th>
							<Th>Key</Th>
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filterAccounts
							?.sort(
								(a, b) =>
									new Date(b.createdAt.date) - new Date(a.createdAt.date),
							)
							?.map((account, index) => (
								<Tr key={index} _hover={{ bg: hoverBg }} transition='all 0.2s'>
									<Td fontSize='sm'>
										{format(account?.createdAt?.date_fns, "dd-MM")}
									</Td>
									<Td fontSize='sm'>{account.uid}</Td>
									<Td fontSize='sm'>{account.email}</Td>
									<Td fontSize='sm'>{account.password}</Td>
									<Td fontSize='sm'>{account.key}</Td>

									<Td>
										{account.die === true ? (
											<span className='text-white px-2 py-1 rounded-xl text-sm bg-red-400'>
												Die
											</span>
										) : account.resolved === true ? (
											<span className='text-white px-2 py-1 rounded-xl text-sm bg-blue-400'>
												Back
											</span>
										) : account.approved === true ? (
											<span className='text-white px-2 py-1 rounded-xl text-sm bg-green-400'>
												Approved!
											</span>
										) : account.downloaded === true ? (
											<span className='text-white px-2 py-1 rounded-xl text-sm bg-purple-400'>
												Processing!
											</span>
										) : account.resolved === false ? (
											<span className='text-white px-2 py-1 rounded-xl text-sm bg-orange-500'>
												Updated!
											</span>
										) : (
											<span className='text-white px-2 py-1 rounded-xl text-sm bg-yellow-500'>
												Progress!
											</span>
										)}
									</Td>
								</Tr>
							))}
					</Tbody>
				</Table>
			</Box>
		</div>
	);
};

export default UserHistoryTable;
