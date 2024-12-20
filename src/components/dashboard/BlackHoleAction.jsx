import { Box, Textarea, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../hook/useCrud";

const BlackHoleAction = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const { put, error, loading, response } = useCrud();
	const [accountUIDs, setAccountUIDs] = useState([]);

	const handleDeleteAccounts = async () => {
		if (!accountUIDs) {
			return toast.error("Select at least one account");
		}
		await put("/api/accounts/black-hole/sold", accountUIDs.split(","));
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
			<h3 className='text-lg font-medium mb-5 text-red-800'>
				DELETE BLACK HOLE ACCOUNTS
			</h3>

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

export default BlackHoleAction;
