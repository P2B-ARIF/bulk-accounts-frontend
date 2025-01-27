import React, { useEffect, useState } from "react";
import { Box, Select, Button, VStack } from "@chakra-ui/react";
import useCrud from "../../../hook/useCrud";
import toast from "react-hot-toast";

const UpdateMailBox = ({ getResponse, func }) => {
	const { put, response, error, loading } = useCrud();

	const lists = [
		{ name: "1secMail", label: "1secmail" },
		{ name: "Mailvn", label: "mailvn" },
		{ name: "5smail", label: "5smail" },
	];

	const [selectedMail, setSelectedMail] = useState("");

	// Handle mailbox update
	const handleUpdate = async () => {
		if (!selectedMail) {
			toast.error("Please select a mailbox");
			return;
		}

		// Trigger PUT request
		try {
			await put("/api/maintenance/mailbox", { mailbox: selectedMail });
		} catch (err) {
			console.error(err);
			toast.error("Failed to update mailbox");
		}
	};

	useEffect(() => {
		if (response) {
			func(); // Call the passed `func` prop (e.g., refetch)
			toast.success("Mailbox updated successfully!");
		}
		if (error) {
			toast.error(error.message || "Something went wrong!");
		}
	}, [response, error]);

	return (
		<div className='lg:ml-5 lg:mr-2.5 p-3 md:p-5 border rounded-md shadow-md'>
			<Box mx='auto'>
				<h3 className='mb-2'>
					Email Selection | <b>{getResponse?.mailbox}</b>
				</h3>
				<VStack spacing={4}>
					<Select
						placeholder='Select a mailbox'
						onChange={e => setSelectedMail(e.target.value)}
						value={selectedMail}
					>
						{lists.map(list => (
							<option key={list.name} value={list.label}>
								{list.label}
							</option>
						))}
					</Select>
					<Button
						w='full'
						colorScheme='blue'
						onClick={handleUpdate}
						isLoading={loading} // Disable button while loading
						loadingText='Updating'
					>
						Update
					</Button>
				</VStack>
			</Box>
		</div>
	);
};

export default UpdateMailBox;
