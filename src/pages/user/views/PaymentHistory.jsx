import {
	Badge,
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";

const MotionBox = motion(Box);

const PaymentHistory = () => {
	const { everything } = useSelector(state => state.everything);
	const withdraw = everything?.withdraw || [];

	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	// Open and Close Image Viewer
	const openImageViewer = useCallback(index => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);
	const closeImageViewer = () => setIsViewerOpen(false);

	// Dynamic styling based on theme
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const hoverBg = useColorModeValue("gray.50", "gray.700");

	// Badge Color Resolver
	const getBadgeColor = status => {
		const colorMap = {
			success: "green",
			pending: "yellow",
			default: "gray",
		};
		return colorMap[status] || colorMap.default;
	};

	if (withdraw.length === 0) {
		return (
			<Box textAlign='center' mt={10}>
				<Text>No payment history found.</Text>
			</Box>
		);
	}

	return (
		<Box
			borderWidth='1px'
			borderRadius='lg'
			bg={bgColor}
			borderColor={borderColor}
			boxShadow='lg'
			overflow='auto'
			mt={5}
		>
			<Box p={5}>
				<Heading
					size='md'
					mb={4}
					color={useColorModeValue("gray.700", "white")}
				>
					Payment History
				</Heading>
				<Table variant='simple' size='sm'>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Email</Th>
							<Th>Total Accounts</Th>
							<Th>Amount</Th>
							<Th>Account Info</Th>
							<Th>Payment Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{withdraw
							.slice() // Clone to prevent mutation
							.sort(
								(a, b) =>
									new Date(b.createdAt.date) - new Date(a.createdAt.date),
							)
							.map((item, index) => (
								<Tr key={index} _hover={{ bg: hoverBg }} transition='all 0.2s'>
									<Td>
										<Text fontWeight='medium'>{item.createdAt.date_fns}</Text>
									</Td>
									<Td>{item.userEmail}</Td>
									<Td>{item.totalAccounts}</Td>
									<Td>{item.amount.toFixed(2)}</Td>
									<Td>
										{item.accountNumber} <br />
										{item.accountName}
									</Td>
									<Td>
										{item.payment === "pending" ? (
											<Badge
												colorScheme={getBadgeColor(item.payment)}
												borderRadius='full'
												px={2}
												py={1}
												fontWeight='medium'
												textTransform='uppercase'
											>
												{item.payment}
											</Badge>
										) : item.payment === "success" ? (
											<>
												<Badge
													colorScheme={getBadgeColor(item.payment)}
													borderRadius='full'
													px={2}
													py={1}
													fontWeight='medium'
													textTransform='uppercase'
													cursor='pointer'
													display={"inline-flex"}
													alignItems={"center"}
													gap={"1"}
													onClick={() => openImageViewer(index)}
												>
													<Eye size={15} /> Completed
												</Badge>
												{isViewerOpen && item?.url && (
													<ImageViewer
														src={[item.url]}
														currentIndex={currentImage}
														disableScroll={false}
														closeOnClickOutside={true}
														onClose={closeImageViewer}
													/>
												)}
											</>
										) : (
											<Text fontWeight='medium'>Nothing</Text>
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

export default PaymentHistory;
