import { Box, Button, Input, Switch, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const Maintenance = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const [message, setMessage] = useState("");
	const [duration, setDuration] = useState("");
	const [currentStatus, setCurrentStatus] = useState(null);

	const { get, put, response, error, loading } = useCrud();

	// Fetch current maintenance status on mount
	useEffect(() => {
		const fetchDataAfterDelay = () => {
			setTimeout(async () => {
				await get("/api/maintenance");
			}, 10000);
		};

		fetchDataAfterDelay();
	}, []);

	// Handle response from GET request
	useEffect(() => {
		if (response) {
			setCurrentStatus(response.maintenance);
			setIsEnabled(response.enabled || false);
			setMessage(response.message || "");
			setDuration(
				response.endTime
					? Math.round(
							(new Date(response.endTime).getTime() - Date.now()) / 60000,
					  )
					: "",
			);
		}

		if (error) {
			toast.error(error.message);
		}
	}, [response, error, toast]);

	// Handle update of maintenance status
	const handleUpdate = async () => {
		try {
			await put("/api/maintenance", {
				enabled: isEnabled,
				message,
				duration: duration || 0,
			});

			if (response) {
				setCurrentStatus(response); // Update with the new status from the server
				toast.success(
					`Maintenance is now ${response.enabled ? "enabled" : "disabled"}.`,
				);
			}
		} catch (err) {
			toast.error(err.message || "Unable to update maintenance status.");
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			padding='4'
			// maxWidth='500px'
			// margin='auto'
			boxShadow='lg'
			borderRadius='lg'
		>
			<h3 className='font-medium text-xl mb-4'>Maintenance Settings</h3>

			<div className='flex items-center justify-between mb-4'>
				<span>Enable Maintenance:</span>
				<Switch
					isChecked={isEnabled}
					onChange={e => setIsEnabled(e.target.checked)}
					colorScheme='blue'
					isDisabled={loading}
				/>
			</div>

			<Textarea
				placeholder='Enter maintenance message'
				value={message}
				onChange={e => setMessage(e.target.value)}
				isDisabled={loading}
				minHeight='120px'
				resize='none'
				mb='4'
			/>

			<Input
				type='number'
				placeholder='Duration (minutes)'
				value={duration}
				onChange={e => setDuration(e.target.value)}
				isDisabled={loading}
				mb='4'
			/>

			<Button
				colorScheme='blue'
				onClick={handleUpdate}
				isDisabled={loading}
				width='full'
				isLoading={loading}
			>
				{isEnabled ? "Update Maintenance" : "Set Maintenance"}
			</Button>

			{currentStatus && (
				<Box mt='4' p='3' bg='gray.100' borderRadius='md'>
					<h4 className='font-bold'>Current Status:</h4>
					<p>Active: {currentStatus.enabled ? "Yes" : "No"}</p>
					<p>Message: {currentStatus.message || "No message set"}</p>
					<p>
						Ends at:{" "}
						{currentStatus.endTime
							? new Date(currentStatus.endTime).toLocaleString()
							: "Not set"}
					</p>
				</Box>
			)}
		</Box>
	);
};

export default Maintenance;
