import { Box, Button, Input, useClipboard, useToast } from "@chakra-ui/react";
import axios from "axios";
import { MousePointerClick } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const MailvnMailCode = ({ mail }) => {
	const [code, setCode] = useState(mail.code);

	// useEffect(() => {
	// 	if (mail?.subject) {
	// 		const match = mail.subject.match(/\d+/); // Extract the first numeric sequence
	// 		if (match) {
	// 			setCode(match[0]);
	// 		}
	// 	}
	// }, [mail]);

	// const fetchSecurityCode = useCallback(async () => {
	// 	try {
	// 		const [username, domain] = email.split("@");
	// 		if (!username || !domain) {
	// 			return toast.error("Invalid email format");
	// 		}

	// 		const url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=${domain}&id=${mail.id}`;
	// 		const { data } = await axios.get(url);

	// 		const securityCodeMatch = data.textBody.match(
	// 			/Your security code is: (\d{8})/,
	// 		);
	// 		const securityCode = securityCodeMatch ? securityCodeMatch[1] : null;

	// 		if (securityCode) {
	// 			setCode(securityCode);
	// 		} else {
	// 			toast.error("No security code found in the email body");
	// 		}
	// 	} catch (err) {
	// 		toast.error("Failed to load messages. Try again later.");
	// 		console.error("Error fetching mailbox:", err.message);
	// 	}
	// }, [mail]);

	// useEffect(() => {
	// 	if (!code) {
	// 		fetchSecurityCode();
	// 	}
	// }, [code, fetchSecurityCode]);

	const toast = useToast();

	// Function to handle copying to clipboard
	const handleCopy = () => {
		navigator.clipboard.writeText(code).then(() => {
			toast({
				title: `Copied! - ${code}`,
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		});
	};

	return (
		<Box
			bg='gray.100'
			p={2}
			borderRadius='md'
			className='flex items-center justify-between'
		>
			<Input
				readOnly
				value={`${mail.code} ----`}
				variant='unstyled'
				bg='transparent'
				color='gray.800'
			/>

			<Button
				size='sm'
				px={3}
				colorScheme='blue'
				onClick={handleCopy} // Corrected here
				leftIcon={<MousePointerClick size={18} />}
			>
				Copy
			</Button>
		</Box>
	);
};

export default MailvnMailCode;
