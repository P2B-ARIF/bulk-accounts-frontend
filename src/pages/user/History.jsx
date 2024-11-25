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
import ResolvedAccount from "./model/ResolvedAccount";

export default function History() {
	const { everything, loading, error } = useSelector(state => state.everything);

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const stripedBg = useColorModeValue("gray.50", "gray.700");

	const accounts = everything?.allAccounts;

	if (loading) {
		return <div>Loading...</div>;
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
				<Box p={{ base: 3, md: 6 }}>
					<Heading size={{ base: "sm", md: "md" }} mb={4}>
						<span>Latest Accounts</span>
					</Heading>
					<Table variant='simple'>
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
										>
											<Td color='gray.600'>
												{format(item.createdAt.date, "dd-MM")}
											</Td>
											<Td fontWeight='medium' className='uppercase'>
												{item.accountType}
											</Td>
											<Td className='uppercase'>{item.accountFormat}</Td>
											<Td>{item.rate} BDT</Td>
											<Td>
												{item.die === true ? (
													<span className='text-red-500 px-2 py-1 rounded-xl text-sm bg-red-200'>
														Die
													</span>
												) : item.resolved === true ? (
													<ResolvedAccount account={item} />
												) : (
													<span className='text-green-500 px-2 py-1 rounded-xl text-sm bg-green-200'>
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
