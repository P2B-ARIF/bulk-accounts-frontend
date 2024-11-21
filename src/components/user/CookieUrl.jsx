import {
	Box,
	Button,
	Input,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { ClipboardCheck } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateAccount } from "../../toolkit/features/accountSlice";

const CookieUrl = () => {
	const [cookie, setCookie] = useState(""); // State to hold the pasted cookie
	const dispatch = useDispatch();

	// Handle pasting from the clipboard
	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setCookie(text); // Update state with the pasted text
			dispatch(updateAccount({ cookie: text })); // Dispatch to update Redux store

			toast.success("Text has been pasted successfully.", {
				title: "Pasted! 2Factor Code",
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			toast.error("Failed to read clipboard.", {
				title: "Error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const bgColor = useColorModeValue("white", "gray.800");

	return (
		<Box borderWidth={1} borderRadius='lg' overflow='hidden' bg={bgColor}>
			<Box p={2} px={4} bg='gray.200'>
				<h3 className='font-medium'>Cookie</h3>
			</Box>
			<Box p={4}>
				<VStack spacing={2}>
					<Input
						bg='gray.100'
						placeholder='Enter profile URL'
						value={cookie} // Controlled input value
						onChange={e => setCookie(e.target.value)} // Update state with input change
					/>
					<Button
						onClick={handlePaste}
						colorScheme='blue'
						leftIcon={<ClipboardCheck size={20} />}
						width='full'
					>
						Paste Cookie
					</Button>
				</VStack>
			</Box>
		</Box>
	);
};

export default CookieUrl;
