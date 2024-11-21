import { Button, Textarea } from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const Message = () => {
	const [text, setText] = useState("");
	const { post, response, loading, error } = useCrud();

	const handleUpdateMessage = async () => {
		if (!text) {
			return toast.error("Please enter a message");
		}
		await post("/api/messages", { text });
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setText("");
		}
	}, [response]);

	return (
		<div className='md:p-5 space-y-3'>
			<h3 className='font-medium'>Message</h3>

			<Textarea
				placeholder='Enter your message'
				value={text}
				onChange={e => setText(e.target.value)}
				minHeight='120px'
				resize='none'
			/>
			<Button
				onClick={handleUpdateMessage}
				leftIcon={<UploadIcon size={18} />}
				isDisabled={loading}
				isLoading={loading}
				colorScheme='blue'
				mr='auto'
				px='20px'
				width={{ base: "full", sm: "auto" }}
			>
				Update Message
			</Button>
		</div>
	);
};

export default Message;
