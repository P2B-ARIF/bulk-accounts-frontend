import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import FactorCode from "../FactorCode";
import MailInbox from "../MailBox";

const AccountFixing = () => {
	// const [password, setPassword] = useState('')
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleMailbox = async () => {
		setLoading(true);
	};

	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

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
				FIXING ACCOUNTS
			</h3>

			<Box className='space-y-3 '>
				<FactorCode />

				<Input
					id='uid'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Enter email address'
					// bg='gray.100'
				/>

				{email && <MailInbox email={email} />}

				{/* <button
					onClick={handleMailbox}
					className='text-md text-slate-100 hover:bg-blue-400 font-medium shadow-sm px-3 bg-blue-500 rounded-lg py-1.5'
				>
					{loading ? "Loading.." : "Check"}
				</button> */}
			</Box>
		</Box>
	);
};

export default AccountFixing;
