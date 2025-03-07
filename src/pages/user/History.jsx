import {
	Box,
	Heading,
	Table,
	Tbody,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";
import HistoryStatusModal from "./model/HistoryStatusModal";
import HistoryTable from "./views/HistoryTable";

export default function History() {
	const { everything, loading, error } = useSelector(state => state.everything);

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const accounts = everything?.allAccounts;

	console.log(accounts, "everything?.allAccounts");

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<section>
			<div className='flex items-center gap-3'>
				<h1 className='text-lg font-bold md:pl-5 mb-2'>History</h1>
				<HistoryStatusModal />
			</div>

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
								<Th>Type</Th>
								<Th>Format</Th>
								<Th>Password</Th>
								<Th>Rate</Th>
								<Th>Status</Th>
								{/* <Th>Action</Th> */}
							</Tr>
						</Thead>
						<Tbody>
							{accounts?.length > 0 &&
								[...accounts] // Create a shallow copy to avoid mutating the original array
									.sort(
										(a, b) =>
											new Date(b?.createdAt?.date) -
											new Date(a?.createdAt?.date),
									)
									.map((item, index) => (
										<HistoryTable item={item} key={index} />
									))}
						</Tbody>
					</Table>
				</Box>
			</Box>
		</section>
	);
}
