import { Box, Button, Input, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MailCode from "./MailCode";
// { email }
const MailInbox = ({ email }) => {
	const [loading, setLoading] = useState(false);
	const [mailbox, setMailbox] = useState([]);

	// let email = "zfvlvxrlpa@1secmail.org";
	// console.log(email);

	const fetchMailbox = useCallback(async () => {
		setLoading(true);
		try {
			const [username, domain] = email.split("@");
			if (!username || !domain) {
				toast.error("Invalid email format");
				return;
			}

			const url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`;
			const { data } = await axios.get(url);
			setMailbox(data);
		} catch (err) {
			toast.error("Failed to load messages. Try again later.");
			console.error("Error fetching mailbox:", err.message);
		} finally {
			setLoading(false);
		}
	}, [email]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchMailbox();
		}, 5000);

		return () => clearInterval(intervalId);
	}, [fetchMailbox]);

	const handleManualReload = () => {
		if (!loading) fetchMailbox();
	};

	const bgColor = useColorModeValue("white", "gray.800");
	return (
		<Box borderWidth={1} borderRadius='lg' overflow='hidden' bg={bgColor}>
			<Box p={2} px={4} bg='gray.200'>
				<h3 className='font-medium flex justify-between items-center'>
					Email Verify Code
					<Button
						onClick={handleManualReload}
						variant='ghost'
						size='sm'
						_hover={bgColor === "transparent"}
						leftIcon={!loading && <RefreshCcw />}
					>
						{loading ? "Loading..." : "Reload"}
					</Button>
				</h3>
			</Box>

			<div className='bg-white text-slate-800 p-4 flex flex-col gap-2'>
				{mailbox.length > 0 ? (
					mailbox?.map((mail, i) => (
						<MailCode key={i} email={email} mail={mail} />
					))
				) : (
					<Box bg='gray.100' p={2} borderRadius='md'>
						<Input
							value='Wait for verification code'
							readOnly
							variant='unstyled'
							bg='transparent'
							color='gray.500'
						/>
					</Box>
				)}
			</div>
		</Box>
	);
};

export default MailInbox;
