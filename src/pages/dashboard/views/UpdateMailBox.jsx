import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Switch,
	VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const UpdateMailBox = ({ getResponse, func }) => {
	const { put, response, error, loading } = useCrud();

	// Initialize states with fallback values
	const [isTempMailOn, setIsTempMailOn] = useState(
		getResponse?.tempmail || false,
	);
	const [isMailBoxOn, setIsMailBoxOn] = useState(
		getResponse?.mailboxToggle || false,
	);
	const [isEmbedMailOn, setEmbedMailOn] = useState(
		getResponse?.embedMailToggle || false,
	);
	const [embedmail, setEmbedMail] = useState(getResponse?.embedmail || "");
	const [selectedMail, setSelectedMail] = useState(getResponse?.mailbox || "");

	const lists = [
		{ name: "1secMail", label: "1secmail" },
		{ name: "Mailvn", label: "mailvn" },
		{ name: "5smail", label: "5smail" },
	];

	// Update state when getResponse changes
	useEffect(() => {
		setIsTempMailOn(getResponse?.tempmail || false);
		setIsMailBoxOn(getResponse?.mailboxToggle || false);
		setEmbedMailOn(getResponse?.embedMailToggle || false);
		setEmbedMail(getResponse?.embedmail || "");
		setSelectedMail(getResponse?.mailbox || "");
	}, [getResponse]);

	// Handle mailbox update
	const handleUpdate = async () => {
		if (!selectedMail) {
			toast.error("Please select a mailbox");
			return;
		}
		try {
			await put("/api/maintenance/mailbox", { mailbox: selectedMail });
			toast.success("Mailbox updated successfully!");
		} catch (err) {
			toast.error("Failed to update mailbox");
		}
	};

	// Toggle functions
	const handleToggle = async (field, value) => {
		try {
			await put("/api/maintenance/mailbox", { [field]: value });
			toast.success(`${field} updated successfully!`);
		} catch (err) {
			toast.error(`Failed to update ${field}`);
		}
	};

	// Handle Embed Mail Update
	const handleUpdateEmbed = async () => {
		if (!embedmail.trim()) {
			toast.error("Embed mail cannot be empty!");
			return;
		}
		try {
			await put("/api/maintenance/mailbox", { embedmail });
			toast.success("Embed mail updated successfully!");
		} catch (err) {
			toast.error("Failed to update embed mail");
		}
	};

	return (
		<div className='lg:ml-5 lg:mr-2.5 p-3 md:p-5 border rounded-md shadow-md'>
			<Box mx='auto'>
				<h3 className='mb-2'>
					Email Selection | <b>{getResponse?.mailbox}</b>
				</h3>

				<div className='flex items-center gap-3 mb-4'>
					{[
						{
							label: "MailBox",
							field: "mailboxToggle",
							value: isMailBoxOn,
							setValue: setIsMailBoxOn,
						},
						{
							label: "Tempmail",
							field: "tempmail",
							value: isTempMailOn,
							setValue: setIsTempMailOn,
						},
						{
							label: "Embedmail",
							field: "embedMailToggle",
							value: isEmbedMailOn,
							setValue: setEmbedMailOn,
						},
					].map(({ label, field, value, setValue }) => (
						<div
							key={field}
							className='bg-slate-700 rounded-full text-slate-200 py-1 px-3 text-sm'
						>
							<FormControl display='flex' alignItems='center'>
								<FormLabel
									htmlFor={field}
									mb='0'
									fontSize={"sm"}
									cursor={"pointer"}
								>
									{label}{" "}
									<span className={value ? "text-green-400" : "text-red-400"}>
										{value ? "On" : "Off"}
									</span>
								</FormLabel>
								<Switch
									id={field}
									isChecked={value}
									onChange={() => {
										setValue(!value);
										handleToggle(field, !value);
									}}
								/>
							</FormControl>
						</div>
					))}
				</div>

				<VStack spacing={4}>
					<div className='flex items-center gap-2 w-full'>
						<Input
							type='text'
							onChange={e => setEmbedMail(e.target.value)}
							placeholder='Enter embed mail'
							value={embedmail}
							w={"100%"}
						/>
						<Button
							colorScheme='blue'
							onClick={handleUpdateEmbed}
							isLoading={loading}
							isDisabled={embedmail === getResponse?.embedmail}
						>
							Set Embed
						</Button>
					</div>

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
						isLoading={loading}
						isDisabled={selectedMail === getResponse?.mailbox}
					>
						Update
					</Button>
				</VStack>
			</Box>
		</div>
	);
};

export default UpdateMailBox;
