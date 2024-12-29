import { Button, Textarea } from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const CreateMessage = () => {
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
		<div className='space-y-3 max-w-[500px]'>
			<h3 className='font-medium'>Create Message</h3>

			<Textarea
				placeholder='Enter your message'
				value={text}
				onChange={e => setText(e.target.value)}
				minHeight='120px'
				resize='none'
			/>
			<Button
				onClick={handleUpdateMessage}
				leftIcon={<UploadIcon size={16} />}
				isDisabled={loading}
				isLoading={loading}
				colorScheme='blue'
				size={"sm"}
				mr='auto'
				px='20px'
				width={{ base: "full", sm: "auto" }}
			>
				Create Message
			</Button>
		</div>
	);
};

export default CreateMessage;
