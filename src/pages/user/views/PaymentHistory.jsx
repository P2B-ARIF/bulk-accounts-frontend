import {
	Badge,
	Box,
	chakra,
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
import React, { useCallback, useState } from "react";

import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";

const MotionBox = motion(chakra.div);

const PaymentHistory = () => {
	const { everything, loading, error } = useSelector(state => state.everything);

	const withdraw = everything?.withdraw;

	// console.log(withdraw, "withdraw");

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const hoverBg = useColorModeValue("gray.50", "gray.700");

	const getBadgeColor = status => {
		switch (status) {
			case "success":
				return "green";
			case "pending":
				return "yellow";
			default:
				return "gray";
		}
	};

	// Handle image viewer state
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	// Open image viewer function
	const openImageViewer = useCallback(() => {
		setCurrentImage(0); // Open the first (and only) image
		setIsViewerOpen(true);
	}, []);

	// Close image viewer function
	const closeImageViewer = () => {
		setIsViewerOpen(false);
	};

	return (
		<Box
			borderWidth='1px'
			borderRadius='lg'
			overflow='auto'
			bg={bgColor}
			borderColor={borderColor}
			boxShadow='lg'
			ml={{ base: 0, md: 5 }}
			mt={5}
		>
			<Box p={{ base: 0, md: 5 }}>
				<Heading
					size={{ base: "sm", md: "md" }}
					mb={4}
					color={useColorModeValue("gray.700", "white")}
					pt={{ base: 3, md: 5 }}
					pl={{ base: 3, md: 5 }}
				>
					Payment History
				</Heading>
				<Table variant='simple' size={"sm"}>
					<Thead>
						<Tr>
							<Th>Date</Th>
							<Th>Email</Th>
							<Th>Total A</Th>
							<Th>Amount</Th>
							<Th>Number</Th>
							<Th>Payment</Th>
						</Tr>
					</Thead>
					<Tbody>
						{withdraw?.length > 0 &&
							[...withdraw] // Clone the array to avoid mutating the original
								.sort(
									(a, b) =>
										new Date(b.createdAt.date) - new Date(a.createdAt.date),
								)
								?.map((item, index) => (
									<Tr
										key={index}
										_hover={{ bg: hoverBg }}
										transition='all 0.2s'
									>
										<Td>
											<Text fontWeight='medium'>{item.createdAt.date_fns}</Text>
										</Td>
										<Td>{item.userEmail}</Td>
										<Td>{item.totalAccounts}</Td>
										<Td>{item.amount}</Td>
										<Td>
											{item.accountNumber} <br />
											{item.accountName}
										</Td>
										{/* <Td>
											<Badge
												colorScheme={getBadgeColor(item.payment)}
												borderRadius='full'
												px={2}
												py={1}
												fontWeight='medium'
												className='uppercase'
											>
												{item.payment}
											</Badge>
										</Td> */}
										<Td>
											{item?.payment === "pending" ? (
												<Badge
													colorScheme={getBadgeColor(item.payment)}
													borderRadius='full'
													px={2}
													py={1}
													fontWeight='medium'
													className='uppercase'
												>
													{item.payment}
												</Badge>
											) : item?.payment === "success" ? (
												<>
													<Badge
														colorScheme={getBadgeColor(item.payment)}
														borderRadius='full'
														px={2}
														py={1}
														fontWeight='medium'
														className='uppercase'
														onClick={openImageViewer}
														style={{ cursor: "pointer" }}
													>
														<span className='flex items-center gap-1'>
															<Eye size={15} /> {item.payment}
														</span>
													</Badge>

													{isViewerOpen && item?.url && (
														<ImageViewer
															src={[item?.url]} // Pass the single image URL inside an array
															currentIndex={currentImage}
															disableScroll={false}
															closeOnClickOutside={true}
															onClose={closeImageViewer}
														/>
													)}
												</>
											) : (
												<h3>Nothing</h3>
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
