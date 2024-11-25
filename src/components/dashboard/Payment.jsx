import { Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import UploadImage from "../../pages/dashboard/models/UploadImage";

const Payment = ({ order }) => {
	const hoverBg = useColorModeValue("gray.50", "gray.700");

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
		<Tr _hover={{ bg: hoverBg }} transition='all 0.2s'>
			<Td>{order?.createdAt?.date_fns}</Td>
			<Td fontSize='sm'>
				<Text color='gray.500' fontSize='xs'>
					{order.userEmail}
				</Text>
				<Text color='gray.500' fontSize='xs'>
					{order.accountNumber}
				</Text>
			</Td>
			<Td>
				<span>{order.accountNumber}</span> <br />
				<span>{order.accountName}</span>
			</Td>
			<Td>{order.notes}</Td>
			<Td>{order.totalAccounts}</Td>
			<Td>{order.amount} BDT</Td>

			{/* Render Upload Image Component if payment is pending */}
			<Td>
				{order?.payment === "pending" ? (
					<UploadImage order={order} />
				) : order?.payment === "success" ? (
					<>
						<h3
							className='text-green-500'
							onClick={openImageViewer}
							style={{ cursor: "pointer" }}
						>
							{order?.payment}
						</h3>
						{/* Conditionally render the ImageViewer if payment is successful */}
						{isViewerOpen && order?.url && (
							<ImageViewer
								src={[order?.url]} // Pass the single image URL inside an array
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

			{/* Render Payment status with image viewer if payment is successful */}
			{/* {order?.payment === "success" && (
			
			)} */}
		</Tr>
	);
};

export default Payment;
