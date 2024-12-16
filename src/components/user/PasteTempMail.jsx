import {
	Box,
	Button,
	Input,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateAccount } from "../../toolkit/features/accountSlice";

const PasteTempMail = () => {
	const [cookie, setCookie] = useState("");
	const dispatch = useDispatch();

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			if (!text.includes("@")) {
				toast.error("Invalid email address.");
				return;
			}

			setCookie(text);
			dispatch(updateAccount({ email: text }));
			toast.success("Temp Mail has been pasted.");
		} catch (error) {
			toast.error("Failed to read clipboard.");
		}
	};

	const bgColor = useColorModeValue("white", "gray.800");

	return (
		<Box borderWidth={1} borderRadius='lg' overflow='hidden' bg={bgColor}>
			<Box p={2} px={4} bg='gray.200'>
				<h3 className='font-medium'>Paste Temp Mail</h3>
			</Box>
			<Box p={4}>
				<VStack spacing={2}>
					<Input
						bg='gray.100'
						placeholder='Paste Temp Mail'
						readOnly
						value={cookie} // Controlled input value
					/>
					<Button
						onClick={handlePaste}
						colorScheme='blue'
						leftIcon={<MdMailOutline size={22} />}
						width='full'
					>
						<span className='font-medium'>Paste Temp Mail</span>
					</Button>
				</VStack>
			</Box>
		</Box>
	);
};

export default PasteTempMail;
