import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
} from "@chakra-ui/react";
import { BellRing } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const ProfessionalModal = ({ user, message, isOpen, onClose }) => {
	const bgColor = useColorModeValue("white", "gray.800");
	const textColor = useColorModeValue("black", "white");
	const { post, response } = useCrud();

	const handleSeen = async () => {
		try {
			await post(`/api/messages/seen/${user?.email}`);
		} catch (err) {
			// console.log(err.message);
		} finally {
			onClose();
		}
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			onClose();
		}
	}, [response]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={bgColor} color={textColor} borderRadius='lg'>
				<ModalHeader fontSize='xl' fontWeight='semibold'>
					{user?.name}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box p={4} fontSize='md' lineHeight='tall'>
						{message}
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button variant='ghost' onClick={handleSeen}>
						দেখেছি
					</Button>
					<Button variant='ghost' onClick={onClose}>
						পরে দেখব
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

const ShowMessage = ({ message, user }) => {
	const [open, setOpen] = useState(true);

	return (
		<Box
			onClick={() => setOpen(true)}
			p={5}
			className='absolute top-0 right-0 flex items-center justify-center text-white h-[20px] w-[20px] bg-green-500 rounded-full'
		>
			<span>
				<BellRing size={20} />
			</span>

			<ProfessionalModal
				user={user}
				message={message}
				isOpen={open}
				onClose={() => setOpen(false)}
			/>
		</Box>
	);
};

export default ShowMessage;
