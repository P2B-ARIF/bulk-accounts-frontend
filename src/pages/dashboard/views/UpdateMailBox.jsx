import React, { useEffect, useState } from "react";
import {
	Box,
	Select,
	Button,
	VStack,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import useCrud from "../../../hook/useCrud";
import toast from "react-hot-toast";
import { Switch } from "@chakra-ui/react";

const UpdateMailBox = ({ getResponse, func }) => {
	const { put, response, error, loading } = useCrud();
	const [isTempMailOn, setIsTempMailOn] = useState(getResponse?.tempmail);
	const [isMailBoxOn, setIsMailBoxOn] = useState(getResponse?.mailboxToggle);

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

	const handleTempMailToggle = async () => {
		try {
			await put("/api/maintenance/mailbox", { tempmail: !isTempMailOn });
		} catch (err) {
			console.error(err.message);
			toast.error("Failed to update tempmail");
		}
	};

	const handleMailBoxToggle = async () => {
		try {
			await put("/api/maintenance/mailbox", { mailboxToggle: !isMailBoxOn });
		} catch (err) {
			console.error(err.message);
			toast.error("Failed to update tempmail");
		}
	};

	return (
		<div className='lg:ml-5 lg:mr-2.5 p-3 md:p-5 border rounded-md shadow-md'>
			<Box mx='auto'>
				<div className='flex flex-col items-start justify-between mb-2'>
					<h3 className='mb-2'>
						Email Selection | <b>{getResponse?.mailbox}</b>
					</h3>
					<div className='flex items-center justify-between gap-2 md:gap-5'>
						<div className='bg-slate-700 rounded-full text-slate-200 py-1 px-3 text-sm'>
							<FormControl display='flex' alignItems='center'>
								<FormLabel
									htmlFor='mailbox'
									mb='0'
									fontSize={"sm"}
									cursor={"pointer"}
								>
									MailBox{" "}
									<span
										className={isMailBoxOn ? "text-green-400" : "text-red-400"}
									>
										{isMailBoxOn ? "On" : "Off"}
									</span>
								</FormLabel>
								<Switch
									onChange={handleMailBoxToggle}
									id='mailbox'
									isChecked={isMailBoxOn}
								/>
							</FormControl>
						</div>
						<div className='bg-slate-700 rounded-full text-slate-200 py-1 px-3 text-sm'>
							<FormControl display='flex' alignItems='center'>
								<FormLabel
									htmlFor='tempmail'
									mb='0'
									fontSize={"sm"}
									cursor={"pointer"}
								>
									Tempmail{" "}
									<span
										className={isTempMailOn ? "text-green-400" : "text-red-400"}
									>
										{isTempMailOn ? "On" : "Off"}
									</span>
								</FormLabel>
								<Switch
									onChange={handleTempMailToggle}
									id='tempmail'
									isChecked={isTempMailOn}
								/>
							</FormControl>
						</div>
					</div>
				</div>
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
						width={"100%"}
						colorScheme='blue'
						onClick={handleUpdate}
						isLoading={loading} // Disable button while loading
						loadingText='Updating'
						isDisabled={selectedMail?.length > 0 ? false : true}
					>
						<span>Update</span>
					</Button>
				</VStack>
			</Box>
		</div>
	);
};

export default UpdateMailBox;
