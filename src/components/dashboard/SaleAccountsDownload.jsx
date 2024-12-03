import { Box, Select, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useCrud from "../../hook/useCrud";
import downloadExcel from "../../utils/downloadExcel";

const SaleAccountsDownload = () => {
	const { get, loading, error, response } = useCrud();

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const [type, setType] = useState("");
	const [formats, setFormats] = useState([]);
	const [selectedFormat, setSelectedFormat] = useState("");
	const [filteredCount, setFilteredCount] = useState(0);

	const [accounts, setAccounts] = useState(null);

	const fetchingAccounts = async () => {
		await get("/api/accounts/sale");
	};

	// Fetch accounts on component mount
	useEffect(() => {
		fetchingAccounts();
	}, []);

	useEffect(() => {
		if (response) {
			// console.log(response, "response");
			setAccounts(response);
		}
	}, [response]);

	// Extract unique account types
	const uniqueAccountTypes = [
		...new Set(accounts?.map(acc => acc.accountType)),
	];

	// Update available formats based on selected type
	useEffect(() => {
		if (type) {
			const uniqueFormats = [
				...new Set(
					accounts
						?.filter(acc => acc.accountType === type)
						.map(acc => acc.accountFormat),
				),
			];
			setFormats(uniqueFormats);
			setSelectedFormat(""); // Reset format when type changes
		} else {
			setFormats([]);
			setSelectedFormat("");
		}
	}, [type, accounts]);

	// Update filtered account count based on type and format
	useEffect(() => {
		if (type && selectedFormat) {
			const filteredAccounts = accounts.filter(
				acc => acc.accountType === type && acc.accountFormat === selectedFormat,
			);
			setFilteredCount(filteredAccounts.length);
		} else {
			setFilteredCount(0);
		}
	}, [type, selectedFormat, accounts]);

	// Handle file download
	const handleDownload = () => {
		if (!accounts || accounts.length === 0) {
			alert("No accounts available to download!");
			return;
		}
		const filteredAccounts = accounts.filter(
			acc => acc.accountType === type && acc.accountFormat === selectedFormat,
		);

		if (filteredAccounts.length === 0) {
			alert("No accounts match the selected criteria.");
			return;
		}

		downloadExcel(filteredAccounts);
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
			<h3 className='text-lg font-medium mb-5 text-blue-800'>
				DOWNLOAD SALE ACCOUNTS ---- Available <b>{accounts?.length || 0}</b>{" "}
				accounts
			</h3>

			<Box maxW='sm' className='space-y-3'>
				<h4 className='p-2'>
					Filtered Accounts: <b>{filteredCount}</b>
				</h4>
				<Select
					placeholder='Select account type'
					value={type}
					onChange={e => setType(e.target.value)}
				>
					{uniqueAccountTypes.map((option, i) => (
						<option key={i} value={option}>
							{option}
						</option>
					))}
				</Select>
				<Select
					placeholder='Select format'
					value={selectedFormat}
					onChange={e => setSelectedFormat(e.target.value)}
					disabled={!formats.length}
				>
					{formats.map((format, i) => (
						<option key={i} value={format}>
							{format}
						</option>
					))}
				</Select>

				<div className='flex items-center gap-2 mt-2'>
					<button
						onClick={handleDownload}
						className='text-md text-blue-500 hover:text-blue-700 font-medium shadow-sm px-3 bg-blue-100 rounded-lg py-1.5'
					>
						Download File
					</button>
				</div>
			</Box>
		</Box>
	);
};

export default SaleAccountsDownload;
