import {
	Box,
	Button,
	HStack,
	Input,
	useClipboard,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { GiClick } from "react-icons/gi";
import { IoIosSwitch } from "react-icons/io";
import { SiPastebin } from "react-icons/si";
import { useDispatch } from "react-redux";
import { updateAccount } from "../toolkit/features/accountSlice";

const FactorCode = ({ setSwitch2fa }) => {
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState(""); // Initialize with email

	const toast = useToast();
	const dispatch = useDispatch();

	const handleFactorCode = async () => {
		const url = import.meta.env.VITE_SERVER_LINK;
		const secret = inputValue.match(/[a-zA-Z0-9]/g).join("");

		if (secret.length < 20) {
			return toast({
				description:
					"আপনি সঠিক ভাবে ২ ফেক্টর কোড দিচ্ছেন না। অনুগ্রহ করে পুনরায় চেক করুন।",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}

		// console.log(secret, secret.length, "secret");

		dispatch(updateAccount({ ["key"]: inputValue }));

		try {
			setCode("");
			setLoading(true);
			const res = await axios.get(`${url}/api/auth/secret?key=${secret}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			// console.log(res, "response");

			setInputValue(res.data);
			setCode(res.data);
		} catch (err) {
			toast({
				title: "Error",
				description: "Failed to fetch 2FA code.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			console.error("Error fetching details", err.message);
		} finally {
			setLoading(false);
		}
	};

	const { hasCopied: hasCopiedFactorCode, onCopy: onCopyFactorCode } =
		useClipboard(code);

	const handlePaste = async () => {
		const text = await navigator.clipboard.readText();
		setInputValue(text); // Paste the copied text
		toast({
			title: "Pasted! 2Factor Code",
			description: "Text has been pasted successfully.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};
	const bgColor = useColorModeValue("white", "gray.800");

	return (
		<Box borderWidth={1} borderRadius='lg' overflow='hidden' bg={bgColor}>
			<Box
				p={3}
				px={4}
				bg='gray.200'
				className={`${setSwitch2fa && "flex items-center gap-2"}`}
			>
				<h3 className='font-medium'>Two Factor Verification</h3>
				{setSwitch2fa && (
					<Button
						size={"sm"}
						onClick={() => setSwitch2fa(true)}
						colorScheme='teal'
						gap={2}
					>
						<IoIosSwitch />
						Switch
					</Button>
				)}
			</Box>

			<Box p={4}>
				<Box
					borderWidth={1}
					borderRadius='md'
					p={2}
					bg='white'
					color='gray.800'
					mb={4}
				>
					<Input
						type='text'
						readOnly
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						variant='unstyled'
						bg='transparent'
					/>
				</Box>

				<HStack spacing={3}>
					<Button
						colorScheme='blue'
						onClick={handlePaste}
						leftIcon={<SiPastebin />}
						fontWeight={"medium"}
						size='sm'
					>
						Paste
					</Button>
					{inputValue && (
						<Button
							colorScheme='teal'
							onClick={handleFactorCode}
							isLoading={loading}
							loadingText='Submitting'
							size={"sm"}
							fontWeight={"medium"}
						>
							Submit
						</Button>
					)}
					{inputValue && inputValue?.length <= 8 && (
						<Button
							colorScheme='green'
							onClick={onCopyFactorCode}
							leftIcon={<GiClick />}
							size={"sm"}
							fontWeight={"medium"}
						>
							{hasCopiedFactorCode ? "Copied" : "Copy"}
						</Button>
					)}
				</HStack>
			</Box>
		</Box>
	);
};

export default FactorCode;
