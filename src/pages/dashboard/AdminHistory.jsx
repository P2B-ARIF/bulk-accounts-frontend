import {
	Box,
	Button,
	Input,
	Select,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import useCrud from "../../hook/useCrud";
import ResolvedAccount from "./models/ResolvedAccount";

const AdminHistory = () => {
	const [filter, setFilter] = useState({
		accountType: "",
		accountFormat: "",
		approved: "",
		downloaded: "",
		correction: "",
		resolved: "",
		die: "",
		search: "",
	});

	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 50;

	const { get, loading, response, error } = useCrud();

	// Fetch all accounts
	const fetchAllAccounts = async () => {
		await get("/api/accounts/all-accounts");
	};

	useEffect(() => {
		fetchAllAccounts();
	}, []);

	useEffect(() => {
		if (response) {
			setData(response.data || []);
		}
		if (error) {
			console.error("Error fetching accounts:", error);
		}
	}, [response, error]);

	// Filtered and Paginated Data
	const filteredData = data.filter(item => {
		return (
			(filter.accountType ? item.accountType === filter.accountType : true) &&
			(filter.accountFormat
				? item.accountFormat === filter.accountFormat
				: true) &&
			(filter.approved !== ""
				? item.approved === (filter.approved === "true")
				: true) &&
			(filter.downloaded !== ""
				? item.downloaded === (filter.downloaded === "true")
				: true) &&
			(filter.correction !== ""
				? item.correction === (filter.correction === "true")
				: true) &&
			(filter.resolved !== ""
				? item.resolved === (filter.resolved === "true")
				: true) &&
			(filter.die !== "" ? item.die === (filter.die === "true") : true) &&
			(filter.search
				? item.email.toLowerCase().includes(filter.search.toLowerCase()) ||
				  item.uid.toLowerCase().includes(filter.search.toLowerCase())
				: true)
		);
	});

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	// Generate unique options for dropdowns
	const generateOptions = field =>
		[...new Set(data.map(item => item[field]))]
			.filter(Boolean)
			.sort()
			.map(value => (
				<option key={value} value={value}>
					{value}
				</option>
			));

	return (
		<Box p={4} bg='gray.50'>
			<Text fontSize='lg' fontWeight='semibold' mb={5}>
				All Accounts History
			</Text>

			{/* Filters */}
			<Box
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5'
				p={3}
				bg='white'
				borderRadius='md'
				shadow='sm'
			>
				<Select
					placeholder='Filter by Account Type'
					onChange={e =>
						setFilter(prev => ({ ...prev, accountType: e.target.value }))
					}
				>
					{generateOptions("accountType")}
				</Select>
				<Select
					placeholder='Filter by Account Format'
					onChange={e =>
						setFilter(prev => ({ ...prev, accountFormat: e.target.value }))
					}
				>
					{generateOptions("accountFormat")}
				</Select>
				<Select
					placeholder='Filter by Approved'
					onChange={e =>
						setFilter(prev => ({ ...prev, approved: e.target.value }))
					}
				>
					<option value='true'>Approved</option>
					<option value='false'>Not Approved</option>
				</Select>
				<Select
					placeholder='Filter by Downloaded'
					onChange={e =>
						setFilter(prev => ({ ...prev, downloaded: e.target.value }))
					}
				>
					<option value='true'>Downloaded</option>
					<option value='false'>Not Downloaded</option>
				</Select>
				<Select
					placeholder='Filter by Correction'
					onChange={e =>
						setFilter(prev => ({ ...prev, correction: e.target.value }))
					}
				>
					<option value='true'>Correction</option>
					<option value='false'>No Correction</option>
				</Select>
				<Select
					placeholder='Filter by Resolved'
					onChange={e =>
						setFilter(prev => ({ ...prev, resolved: e.target.value }))
					}
				>
					<option value='true'>Resolved</option>
					<option value='false'>Not Resolved</option>
				</Select>
				<Select
					placeholder='Filter by Die'
					onChange={e => setFilter(prev => ({ ...prev, die: e.target.value }))}
				>
					<option value='true'>Die</option>
					<option value='false'>Not Die</option>
				</Select>
				<Input
					placeholder='Search by Email or UID'
					onChange={e =>
						setFilter(prev => ({ ...prev, search: e.target.value }))
					}
				/>
			</Box>

			{/* Data Table */}
			{loading ? (
				<Spinner size='lg' />
			) : error ? (
				<Text color='red.500'>Error: {error.message}</Text>
			) : (
				<Table variant='striped' colorScheme='gray' size='sm'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>UID</Th>
							<Th>Email</Th>
							<Th>Type</Th>
							<Th>Approved</Th>
							<Th>Downloaded</Th>
							{/* <Th>Correction</Th> */}
							<Th>Resolved</Th>
							<Th>Die</Th>
							<Th>Rate</Th>
							<Th>Status</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{paginatedData?.map(item => (
							<Tr key={item.uid}>
								<Td>{format(new Date(item.createdAt.date), "dd/MM")}</Td>
								<Td>{item.uid}</Td>
								<Td>{item.email}</Td>
								<Td>{item.accountType}</Td>
								<Td>{item.approved ? "Yes" : "No"}</Td>
								<Td>{item.downloaded ? "Yes" : "No"}</Td>
								{/* <Td>{item.correction ? "Yes" : "No"}</Td> */}
								<Td>{item.resolved ? "Yes" : "No"}</Td>
								<Td>{item.die ? "Yes" : "No"}</Td>
								<Td>{item.rate}</Td>
								<Td>
									{item.die === true ? (
										<span className='text-white flex items-center gap-1 px-2 py-1 rounded-xl text-sm bg-red-400'>
											Disabled
										</span>
									) : item.resolved === true ? (
										<span className='text-white px-2 py-1 rounded-xl text-sm bg-blue-400'>
											Back
										</span>
									) : item.approved === true ? (
										<span className='text-white px-2 py-1 rounded-xl text-sm bg-green-400'>
											Approved!
										</span>
									) : item.downloaded === true ? (
										<span className='text-white px-2 py-1 rounded-xl text-sm bg-purple-400'>
											Processing!
										</span>
									) : item.resolved === false ? (
										<span className='text-white px-2 py-1 rounded-xl text-sm bg-orange-500'>
											Updated!
										</span>
									) : (
										<span className='text-white px-2 py-1 rounded-xl text-sm bg-yellow-500'>
											Progress!
										</span>
									)}
								</Td>
								<Td>
									<ResolvedAccount account={item} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			)}

			{/* Pagination */}
			<Box className='flex justify-between items-center mt-4'>
				<Button
					onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
					isDisabled={currentPage === 1}
				>
					Previous
				</Button>
				<Text>
					Page {currentPage} of {totalPages}
				</Text>
				<Button
					onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
					isDisabled={currentPage === totalPages}
				>
					Next
				</Button>
			</Box>
		</Box>
	);
};

export default AdminHistory;
