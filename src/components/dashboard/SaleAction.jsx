import { Box, Textarea, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../hook/useCrud";

const SaleAction = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const { put, error, loading, response } = useCrud();
	const [accountUIDs, setAccountUIDs] = useState([]);
	const [accLength, setAccLength] = useState(0);

	const handleDeleteAccounts = async () => {
		if (!accountUIDs) {
			return toast.error("Select at least one account");
		}
		await put("/api/accounts/sale/sold", accountUIDs.split(","));
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message || "Accounts deleted successfully!");
			setAccountUIDs([]); // Clear input after successful deletion
			window.location.reload();
		}
		if (error) {
			toast.error(error.message || "Failed to delete accounts!");
		}
	}, [response, error]);

	useEffect(() => {
		// console.log(accountUIDs.split(",").length, "asd");
		if (accountUIDs.length > 0) {
			setAccLength(accountUIDs?.split(",").length);
		}
	}, [accountUIDs]);

	const handlePasteUIDs = async () => {
		const ids = await navigator.clipboard.readText();
		const normalizedIds = [
			...new Set(ids.split(/[\s,]+/).filter(id => id.trim() !== "")),
		].join(",");

		setAccountUIDs(normalizedIds);
		toast.success("Paste UIDs");
	};

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			p={4}
			borderColor={borderColor}
			bg={bgColor}
			_hover={{ boxShadow: "lg" }}
			transition='all 0.3s'
		>
			<h3 className='text-lg font-medium mb-5 text-red-800'>DELETE ACCOUNTS</h3>

			<div className='flex items-center gap-5 mb-3'>
				<button
					onClick={handlePasteUIDs}
					className='text-md text-white hover:bg-blue-400 font-medium shadow-sm px-3 bg-blue-500 rounded-lg py-1'
				>
					Paste
				</button>
				<span className='ml-3 text-lg font-medium'>{accLength} IDs</span>
			</div>
			<Box className='space-y-3'>
				<Textarea
					placeholder='Enter Account UIDs (comma-separated)'
					value={accountUIDs}
					onChange={e => setAccountUIDs(e.target.value)}
					h='150'
					resize='none'
				/>

				<div className='flex items-center gap-2 mt-2'>
					<button
						onClick={handleDeleteAccounts}
						className='text-md text-white hover:bg-red-400 font-medium shadow-sm px-3 bg-red-500 rounded-lg py-1.5'
						disabled={loading}
					>
						{loading ? "Deleting..." : "Delete Accounts"}
					</button>
				</div>
			</Box>
		</Box>
	);
};

export default SaleAction;
