import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { FileSymlink } from "lucide-react";
import React, { useState } from "react";

const AccountModel = () => {
	const [open, setOpen] = useState(false);

	const [file, setFile] = useState("");

	const handleUpload = () => {};

	return (
		<Modal isOpen={open} onClose={() => setOpen(false)}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>testing</ModalHeader>
				<ModalBody>
					<Text>This Working Rate: BDT</Text>
					<Text>Estimated Time: Minute</Text>
					<br />
					<Text>testing message</Text>
				</ModalBody>

				<ModalFooter>
					<Button
						variant='ghost'
						onClick={e => setFile(e.target.files[0])}
						leftIcon={<FileSymlink size={18} />}
					>
						Upload Image
					</Button>

					<Button onClick={() => setOpen(false)} colorScheme='pink' ml={3}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AccountModel;
