import {
	Box,
	Button,
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
import { Trash2 } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../../../hook/useCrud";
import { fetchAccounts } from "../../../toolkit/features/dashboard/accountsSlice";

const UserHistoryTable = () => {
	const { accounts, loading, error } = useSelector(state => state.accounts);
	const { email } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { del, response, loading: gLoading } = useCrud();

	useEffect(() => {
		if (!accounts || accounts.length === 0) {
			dispatch(fetchAccounts());
		}
	}, [dispatch, accounts]);

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			navigate("/admin/accounts");
		}
	}, [response]);

	const filterAccounts = useMemo(
		() => accounts?.filter(acc => acc.userEmail === email) || [],
		[accounts, email],
	);

	const accountFormatCounts = useMemo(() => {
		return filterAccounts.reduce((acc, curr) => {
			acc[curr.accountFormat] = (acc[curr.accountFormat] || 0) + 1;
			return acc;
		}, {});
	}, [filterAccounts]);

	if (loading) return <Spinner size='xl' label='Loading...' />;
	if (error) return <Text color='red.500'>Error: {error}</Text>;

	const handleDeleteUser = async () => {
		if (!window.confirm("Are you sure?")) {
			return;
		}
		try {
			await del(`/api/auth/delete?email=${email}`);
		} catch (err) {
			console.error(err);
		}
	};

	if (!filterAccounts.length)
		return (
			<div className='flex items-center mb-5 gap-5'>
				<Text>No accounts found for {email}</Text>
				<Button
					onClick={handleDeleteUser}
					isLoading={gLoading}
					colorScheme='red'
					className='flex items-center gap-1'
					size={"sm"}
				>
					<Trash2 size={15} /> Delete
				</Button>
			</div>
		);

	const hoverBg = useColorModeValue("gray.50", "gray.700");
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Box>
			<div className='flex items-center mb-5 gap-5'>
				<Text fontSize='lg' fontWeight='semibold'>
					User History for {email}
				</Text>
				<Button
					onClick={handleDeleteUser}
					isLoading={gLoading}
					colorScheme='red'
					className='flex items-center gap-1'
					size={"sm"}
				>
					<Trash2 size={15} /> Delete
				</Button>
			</div>

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
