import React, { useState } from "react";
import {
	Box,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Textarea,
	Button,
	useToast,
} from "@chakra-ui/react";

const ContactForm = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		return;
		const sendContactEmail = httpsCallable(functions, "sendContactEmail");

		try {
			const result = await sendContactEmail({ name, phone, email, message });
			if (result.data.success) {
				toast({
					title: "Email sent successfully.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				// Reset form fields
				setName("");
				setPhone("");
				setEmail("");
				setMessage("");
			} else {
				throw new Error(result.data.error);
			}
		} catch (error) {
			toast({
				title: "Error sending email.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='w-full'>
			<Box p={4} mx='auto'>
				<Grid templateColumns='repeat(2, 1fr)' gap={4}>
					<FormControl>
						<FormLabel>
							<span className='font-normal'>Full name</span>
						</FormLabel>
						<Input
							type='text'
							placeholder='name'
							value={name}
							onChange={e => setName(e.target.value)}
							className='focus:outline-none'
							focusBorderColor='purple.400'
							required
						/>
					</FormControl>
					<FormControl>
						<FormLabel>
							<span className='font-normal'>Phone</span>
						</FormLabel>
						<Input
							type='text'
							placeholder='phone'
							value={phone}
							onChange={e => setPhone(e.target.value)}
							className='focus:outline-none'
							focusBorderColor='purple.400'
							required
						/>
					</FormControl>
				</Grid>
				<FormControl mt={4}>
					<FormLabel>
						<span className='font-normal'>Work email</span>
					</FormLabel>
					<Input
						type='email'
						placeholder='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='focus:outline-none'
						focusBorderColor='purple.400'
						required
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>
						<span className='font-normal'>Message</span>
					</FormLabel>
					<Textarea
						rows={4}
						placeholder='Message...'
						value={message}
						onChange={e => setMessage(e.target.value)}
						focusBorderColor='purple.400'
						required
					/>
				</FormControl>

				<button className='w-full bg-gradient-to-r from-primary to-secondary text-white_c py-2 px-10 rounded-lg mt-5 font-medium text-md hover:from-white_c hover:to-white_c transition-all duration-200 ease-linear border-2 border-transparent hover:border-primary hover:text-primary'>
					Send Mail
				</button>
			</Box>
		</form>
	);
};

export default ContactForm;
