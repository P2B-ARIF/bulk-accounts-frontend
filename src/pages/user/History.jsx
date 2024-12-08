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
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";

export default function History() {
	const { everything, loading, error } = useSelector(state => state.everything);

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const stripedBg = useColorModeValue("gray.50", "gray.700");

	const accounts = everything?.allAccounts;

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<section>
			<h1 className='text-lg font-bold md:pl-5 mb-2'>History</h1>

			<Box
				ml={{ base: 0, md: 5 }}
				mt={{ base: 0, md: 5 }}
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
						<span>Latest Accounts</span>
					</Heading>
					<Table variant='simple' size={{ base: "sm", md: "md" }}>
						<Thead>
							<Tr>
								<Th>Date</Th>
								<Th>Account Type</Th>
								<Th>Format</Th>
								<Th>Rate</Th>
								<Th>Status</Th>
								{/* <Th>Action</Th> */}
							</Tr>
						</Thead>
						<Tbody>
							{accounts &&
								accounts?.map((item, index) => {
									// console.log(item);

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
											<Td>{item.rate} BDT</Td>
											<Td>
												{item.die === true ? (
													<span className='text-white px-2 py-1 rounded-xl text-sm bg-red-400'>
														Die
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

											{/* <Td>
											</Td> */}
										</Tr>
									);
								})}
						</Tbody>
					</Table>
				</Box>
			</Box>
		</section>
	);
}
