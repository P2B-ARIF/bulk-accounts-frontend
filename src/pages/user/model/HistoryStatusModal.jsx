import React, { useState } from "react";
import { TbEyeExclamation } from "react-icons/tb";
import { LuMousePointerClick } from "react-icons/lu";

import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Text,
} from "@chakra-ui/react";

const HistoryStatusModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box mb={2}>
			<Button
				size={{ base: "xs", md: "sm" }}
				colorScheme='blue'
				variant={"outline"}
				onClick={onOpen}
				className='flex gap-3 items-center'
			>
				<LuMousePointerClick size={18} /> Status Message
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size='lg'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>History Status</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box>
							<Box mb={4}>
								<Text fontWeight='bold' fontSize='lg' color='red.500'>
									Die / Disabled
								</Text>
								<Text>যদি অ্যাকাউন্ট নষ্ট বা ডিজেবল হয়ে যায়।</Text>
							</Box>

							<Box mb={4}>
								<Text fontWeight='bold' fontSize='lg' color='yellow.500'>
									Progress
								</Text>
								<Text>
									যখন আপনি ওয়েবসাইটে অ্যাকাউন্ট সাবমিট করেন, তখন এই স্ট্যাটাস
									দেখাবে।
								</Text>
							</Box>

							<Box mb={4}>
								<Text fontWeight='bold' fontSize='lg' color='orange.500'>
									Updated
								</Text>
								<Text>
									Back হওয়া আইডি এডমিন চেক করে বাইয়ার কে আবার দেওয়ার জন্য রেডি
									করার পর।
								</Text>
							</Box>

							<Box mb={4}>
								<Text fontWeight='bold' fontSize='lg' color='blue.500'>
									Back
								</Text>
								<Text>যখন অ্যাকাউন্ট বাইয়ার থেকে ফেরত আসে।</Text>
							</Box>

							<Box mb={4}>
								<Text fontWeight='bold' fontSize='lg' color='green.500'>
									Approved
								</Text>
								<Text>যখন আইডি approved হয়।</Text>
							</Box>

							<Box mb={4}>
								<Text fontWeight='bold' fontSize='lg' color='purple.400'>
									Processing
								</Text>
								<Text>আপনার আইডি বাইয়ার কাছে পাঠানোর পর।</Text>
							</Box>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' size={"sm"} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default HistoryStatusModal;
