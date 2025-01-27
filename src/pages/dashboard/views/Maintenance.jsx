import { Box, Button, Switch, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const Maintenance = ({ getResponse, func }) => {
	const [isEnabled, setIsEnabled] = useState(getResponse?.enabled || false);
	const [message, setMessage] = useState(getResponse?.message || "");

	const { put, response, error, loading } = useCrud();

	useEffect(() => {
		if (response) {
			setIsEnabled(response.enabled);
			setMessage(response.message || "");
			func();
			toast.success("Successfully updated maintenance!");
		}
		if (error) {
			toast.error(error.message);
		}
	}, [response, error, func]);

	// Handle update of maintenance status
	const handleUpdate = async () => {
		await put("/api/maintenance", {
			enabled: isEnabled,
			message,
		});
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="border rounded-lg lg:mr-5">
			<Box padding='4' boxShadow='lg' borderRadius='lg' >
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

				<Button
					colorScheme='blue'
					onClick={handleUpdate} // Fix: Call the function here
					isDisabled={loading}
					width='full'
					isLoading={loading}
				>
					{isEnabled ? "Update Maintenance" : "Set Maintenance"}
				</Button>

				{getResponse && (
					<Box mt='4' p='3' bg='gray.100' borderRadius='md'>
						<h4 className='font-bold'>Current Status:</h4>
						<p>Maintenance Active: {getResponse.enabled ? "Yes" : "No"}</p>
						<p>Message: {getResponse.message || "No message set"}</p>
					</Box>
				)}
			</Box>
		</div>
	);
};

export default Maintenance;
