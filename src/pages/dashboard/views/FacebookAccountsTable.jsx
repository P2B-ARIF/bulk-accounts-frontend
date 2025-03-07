import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import NorApprovedDownload from "../../../components/dashboard/NorApprovedDownload";
import useCrud from "../../../hook/useCrud";
import LoadingPage from "../../LoadingPage";
import ResolvedAccount from "../models/ResolvedAccount";

const FacebookAccountsTable = () => {
	const { get, response, error, loading } = useCrud();
	const [accounts, setAccounts] = useState([]);

	const fetchAccounts = async () => {
		await get(`/api/accounts/nor-approved`);
	};

	useEffect(() => {
		fetchAccounts();
	}, []);

	// console.log(accounts, "acounts");

	useEffect(() => {
		if (response) {
			// Filter and sort accounts
			const uniqueFormats = response
				?.filter(acc => acc.accountType === "facebook")
				?.sort((a, b) => {
					// Sorting in ascending order
					if (a.accountFormat < b.accountFormat) return -1;
					if (a.accountFormat > b.accountFormat) return 1;
					return 0;
				});

			setAccounts(uniqueFormats);
		}

		if (error) {
			console.error("Error fetching accounts:", error);
		}
	}, [response, error]);

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const stripedBg = useColorModeValue("gray.50", "gray.700");

	if (loading) {
		return <LoadingPage />;
	}

	if (!loading && accounts?.length === 0) {
		return (
			<div>
				<h1 className='text-center text-xl font-semibold'>No accounts found</h1>
			</div>
		);
	}
	return (
		<div>
			{accounts && <NorApprovedDownload allAccounts={accounts} />}
			<br />
			<Box
				borderWidth='1px'
				borderRadius='lg'
				overflow='auto'
				bg={bgColor}
				borderColor={borderColor}
			>
				<Box p={{ base: 0, md: 6 }}>
					<Heading
						size={{ base: "sm", md: "md" }}
						mb={4}
						className='px-3 md:px-5 pt-3'
					>
						<span>Fixing Accounts</span>
					</Heading>
					<Table variant='simple' size={"sm"}>
						<Thead>
							<Tr>
								<Th>Date</Th>
								<Th>Account Type</Th>
								<Th>Format</Th>
								<Th>Attempt</Th>
								<Th>Email</Th>
								<Th>Password</Th>
								<Th>Status</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{accounts &&
								accounts?.map((item, index) => {
									return (
										<Tr
											key={index}
											bg={index % 2 === 0 ? "transparent" : stripedBg}
											className='text-sm md:text-md'
										>
											<Td color='gray.600'>
												{format(item.createdAt.date, "dd-MM")}
											</Td>
											<Td
												fontWeight='medium'
												className={`uppercase ${
													item.accountType === "facebook"
														? "text-blue-500"
														: "text-pink-500"
												}`}
											>
												{item.accountType}
											</Td>
											<Td className='uppercase'>{item.accountFormat}</Td>
											<Td>{item.attempt}</Td>
											<Td>{item.email}</Td>
											<Td>{item.password}</Td>
											<Td>
												{item.die === true ? (
													<span className='text-white px-2 py-1 rounded-xl text-sm bg-red-400'>
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
												<ResolvedAccount
													account={item}
													fetchAccounts={fetchAccounts}
												/>
											</Td>
										</Tr>
									);
								})}
						</Tbody>
					</Table>
				</Box>
			</Box>
		</div>
	);
};

export default FacebookAccountsTable;
