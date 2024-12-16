import {
	Box,
	Grid,
	GridItem,
	Spinner,
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

	// Fetch accounts from Redux store if not already available
	useEffect(() => {
		if (!accounts || accounts.length === 0) {
			dispatch(fetchAccounts());
		}
	}, [dispatch, accounts]);

	// Filter accounts for the specific user
	const filterAccounts = useMemo(
		() => accounts?.filter(acc => acc.userEmail === email) || [],
		[accounts, email],
	);

	// Count unique account formats and their occurrences
	const accountFormatCounts = useMemo(() => {
		return filterAccounts.reduce((acc, curr) => {
			acc[curr.accountFormat] = (acc[curr.accountFormat] || 0) + 1;
			return acc;
		}, {});
	}, [filterAccounts]);

	// Error and loading states
	if (loading) return <Spinner size='xl' label='Loading...' />;
	if (error) return <Text color='red.500'>Error: {error}</Text>;
	if (!filterAccounts.length) return <Text>No accounts found for {email}</Text>;

	// Table hover styles
	const hoverBg = useColorModeValue("gray.50", "gray.700");
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Box>
			<Text fontSize='lg' fontWeight='semibold' mb={5}>
				User History for {email}
			</Text>

			{/* Account format stats */}
			<Grid
				templateColumns='repeat(auto-fill, minmax(150px, 1fr))'
				gap={5}
				mb={5}
			>
				{Object.entries(accountFormatCounts).map(([format, count], index) => (
					<GridItem
						key={index}
						p={4}
						borderWidth='1px'
						borderRadius='lg'
						bg={bgColor}
						boxShadow='sm'
					>
						<Text fontWeight='medium' mb={2}>
							{format}
						</Text>
						<Text fontSize='lg' fontWeight='bold'>
							{count}
						</Text>
					</GridItem>
				))}
			</Grid>

			{/* Account history table */}
			<Box
				borderWidth='1px'
				borderRadius='lg'
				overflowX='auto'
				bg={bgColor}
				borderColor={borderColor}
			>
				<Table variant='simple' size='sm'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>UID</Th>
							<Th>Email</Th>
							<Th>Password</Th>
							<Th>Key</Th>
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filterAccounts?.length > 0 &&
							filterAccounts
								.sort(
									(a, b) =>
										new Date(b.createdAt?.date_fns) -
										new Date(a.createdAt?.date_fns),
								)
								.map((account, index) => (
									<Tr key={index} _hover={{ bg: hoverBg }} transition='0.2s'>
										<Td>
											{account?.createdAt?.date ||
											account?.createdAt?.date_fns ? (
												format(
													new Date(
														account?.createdAt?.date ||
															account?.createdAt?.date_fns,
													),
													"dd-MM",
												)
											) : (
												<Text color='gray.500'>N/A</Text>
											)}
										</Td>
										<Td>{account.uid}</Td>
										<Td>{account.email}</Td>
										<Td>{account.password}</Td>
										<Td>{account.key}</Td>
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
		</Box>
	);
};

export default UserHistoryTable;
