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
import { useSelector } from "react-redux";
import ResolvedAccount from "./model/ResolvedAccount";

export default function History() {
	const { everything, loading, error } = useSelector(state => state.everything);

	const data = [
		{
			date: "2024-11-01",
			accountType: "Facebook",
			accountFormat: "Personal",
			rate: 15,
			status: "Opened",
		},
		{
			date: "2024-11-01",
			accountType: "Instagram",
			accountFormat: "Business",
			rate: 20,
			status: "Approved",
		},
		{
			date: "2024-11-02",
			accountType: "Facebook",
			accountFormat: "Business",
			rate: 18,
			status: "Approved",
		},
		{
			date: "2024-11-02",
			accountType: "Instagram",
			accountFormat: "Personal",
			rate: 25,
			status: "Opened",
		},
		{
			date: "2024-11-03",
			accountType: "Facebook",
			accountFormat: "Business",
			rate: 17,
			status: "Opened",
		},
	];

	const getBadgeColor = status => {
		switch (status.toLowerCase()) {
			case "die":
				return "red";
			case "resolved":
				return "yellow";
			default:
				return "gray";
		}
	};

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const stripedBg = useColorModeValue("gray.50", "gray.700");

	const accounts = everything?.allAccounts;

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<section>
			<h1 className='text-lg font-bold pl-5'>History</h1>

			<Box
				borderWidth='1px'
				borderRadius='lg'
				ml={5}
				mt={5}
				overflow='hidden'
				bg={bgColor}
				borderColor={borderColor}
			>
				<Box p={6}>
					<Heading size='md' mb={4}>
						Latest Accounts
					</Heading>
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th>Date</Th>
								<Th>Account Type</Th>
								<Th>Format</Th>
								<Th>Rate</Th>
								<Th>Status</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{accounts &&
								accounts?.map((item, index) => {
									console.log(item);

									return (
										<Tr
											key={index}
											bg={index % 2 === 0 ? "transparent" : stripedBg}
										>
											<Td color='gray.600'>{item.createdAt.date_fns}</Td>
											<Td fontWeight='medium' className='uppercase'>
												{item.accountType}
											</Td>
											<Td className='uppercase'>{item.accountFormat}</Td>
											<Td>{item.rate} BDT</Td>
											<Td>
												{/* <Badge
											colorScheme={getBadgeColor(item.status)}
											borderRadius='full'
											px={2}
										>
											{item.status}
										</Badge> */}

												{item.die === true ? (
													<span className='text-red-500'>Die</span>
												) : item.resolved === true ? (
													<span className='text-yellow-500'>Resolved</span>
												) : (
													<span className='text-green-500'>Posted!</span>
												)}
											</Td>
											<Td>
												{item.resolved && <ResolvedAccount account={item} />}
											</Td>
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
