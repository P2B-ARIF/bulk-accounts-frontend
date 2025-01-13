import React from "react";
import toast from "react-hot-toast";
import { SimpleGrid, Tooltip } from "@chakra-ui/react";

const InActiveStat = ({ account }) => {
	const handleToast = () => {
		toast.error(
			`দুঃখিত, ${account?.accountType} ${account?.accountFormat} কাজটি আপাতত অফ আছে. অনুগ্রহ করে অন্য কাজ করুন।`,
		);
	};

	return (
		<div onClick={handleToast}>
			<Tooltip
				// label={`Not available for ${account.accountType} ${account.accountFormat}. Please try another service or task.`}
				label={`দুঃখিত, ${account.accountType} ${account.accountFormat} কাজটি আপাতত অফ আছে. অনুগ্রহ করে অন্য কাজ করুন।`}
				aria-label='Account tooltip'
				bg='gray.700'
				color='white'
				fontSize='sm'
				borderRadius='md'
				px={2}
				py={1}
			>
				<div className='border rounded-lg bg-red-200 text-gray-700 p-4 py-2 shadow-sm hover:shadow-md transition-transform transform hover:scale-105'>
					<h3 className='text-md font-medium uppercase'>
						{account.accountType} {account.accountFormat}
					</h3>
				</div>
			</Tooltip>
		</div>
	);
};

export default InActiveStat;
