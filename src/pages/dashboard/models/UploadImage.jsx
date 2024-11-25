import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import { FileSymlink, HandCoins } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const UploadImage = ({ order }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [file, setFile] = useState(null);
	const [image, setImage] = useState("");

	const { put, error, response, loading: serverLoading } = useCrud();

	// Handle image upload to Cloudinary
	const handleUpload = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "first_using_cloudinary"); // Corrected to use "upload_preset"
		formData.append("cloud_name", "dxgbvflqb");

		setLoading(true);
		try {
			const res = await axios.post(
				`https://api.cloudinary.com/v1_1/dxgbvflqb/image/upload`,
				formData,
			);
			setImage(res.data.url);

			if (res.data.url) {
				await put(`/api/withdraw/${order._id}`, { url: res.data.url });
			}
		} catch (error) {
			console.error("Error uploading file:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			window.location.reload();
		}
		if (error) {
			console.log(error, "error");
		}
	}, [response, error]);

	// Reset file and image when the modal is closed
	const closeModal = () => {
		setOpen(false);
		setFile(null);
		setImage("");
	};

	return (
		<>
			<Button
				size='sm'
				px={3}
				colorScheme='blue'
				onClick={() => setOpen(true)}
				isLoading={serverLoading}
				leftIcon={<HandCoins size={18} />}
			>
				Confirm Payment
			</Button>

			<Modal isOpen={open} onClose={closeModal}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{order?.userEmail}</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<Text>Amount: {order?.amount}</Text>
						<Text>Accounts: {order?.totalAccounts}</Text>
						<br />
						<Text>Account Number: {order?.accountNumber}</Text>
						<Text>Account Name: {order?.accountName}</Text>
						{order?.notes && <Text>Message: {order?.notes}</Text>}

						{/* Display uploaded image or file preview */}
						{image ? (
							<img src={image} alt='Uploaded File' width='200' />
						) : (
							file && (
								<img
									src={URL.createObjectURL(file)}
									alt='File Preview'
									width='200'
									className='border-2 border-blue-500'
								/>
							)
						)}
					</ModalBody>

					<ModalFooter>
						<Input
							type='file'
							variant='ghost'
							id='file-upload'
							onChange={e => setFile(e.target.files[0])}
							display='none' // Hide the input
						/>
						<Button
							as='label'
							htmlFor='file-upload'
							leftIcon={<FileSymlink size={18} />}
							variant='outline'
							colorScheme='blue'
							size='sm'
						>
							Upload Image
						</Button>

						<Button
							isLoading={loading}
							onClick={handleUpload}
							colorScheme='pink'
							size='sm'
							ml={3}
							isDisabled={!file} // Disable the button if no file is selected
						>
							Upload
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default UploadImage;
