import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { MousePointerClick } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { GiClick } from "react-icons/gi";
import { useDispatch } from "react-redux";
import MailInbox from "../../../components/MailBox";
import useCrud from "../../../hook/useCrud";
import { fetchEverything } from "../../../toolkit/features/everythingSlice";

const SeeDisabledModel = ({ account }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { del, loading, response, error } = useCrud();
	const dispatch = useDispatch();

	// Copy to clipboard
	const handleCopy = value => {
		if (!value) return;
		navigator.clipboard.writeText(value).then(() => {
			toast.success(`Copied: ${value}`);
		});
	};

	// Handle API response
	useEffect(() => {
		if (response) {
			toast.success(response.message);
			dispatch(fetchEverything());
			onClose();
		}
		if (error) {
			toast.error("Something went wrong. Please try again.");
			console.error("API error:", error);
		}
	}, [response, error, dispatch]);

	// Delete account
	const handleDelete = async id => {
		// console.log(id, "ids");
		// return;
		try {
			await del(`/api/accounts/delete/${id}`);
		} catch (err) {
			console.error("Delete failed:", err);
		}
	};

	return (
		<>
			<button
				onClick={onOpen}
				className='text-white flex items-center gap-1 px-2 py-1 rounded-xl text-sm bg-red-400'
			>
				Disabled <GiClick />
			</button>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Check Account Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb={4}>
							<FormLabel htmlFor='uid'>UID</FormLabel>
							<div style={{ display: "flex", gap: "0.5rem" }}>
								<Input
									id='uid'
									name='uid'
									defaultValue={account.uid}
									size={"sm"}
									rounded={"5"}
								/>
								<Button
									size='sm'
									colorScheme='blue'
									onClick={() => handleCopy(account.uid)}
									leftIcon={<MousePointerClick size={18} />}
								>
									Copy
								</Button>
							</div>
						</FormControl>

						<FormControl mb={4}>
							<FormLabel htmlFor='email'>Email</FormLabel>
							<div style={{ display: "flex", gap: "0.5rem" }}>
								<Input
									id='email'
									defaultValue={account.email}
									size={"sm"}
									rounded={"5"}
								/>
								<Button
									size='sm'
									colorScheme='blue'
									onClick={() => handleCopy(account.email)}
									leftIcon={<MousePointerClick size={18} />}
								>
									Copy
								</Button>
							</div>
						</FormControl>

						{account.email && <MailInbox email={account.email} />}

						<FormControl mb={4}>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<div style={{ display: "flex", gap: "0.5rem" }}>
								<Input
									id='password'
									name='password'
									defaultValue={account.password}
									size={"sm"}
									rounded={"5"}
									placeholder='Enter Password'
								/>
								<Button
									size='sm'
									colorScheme='blue'
									onClick={() => handleCopy(account.password)}
									leftIcon={<MousePointerClick size={18} />}
								>
									Copy
								</Button>
							</div>
						</FormControl>
						{account?.key && (
							<FormControl mb={4}>
								<FormLabel htmlFor='key'>Two Factor Key</FormLabel>
								<div style={{ display: "flex", gap: "0.5rem" }}>
									<Input
										id='key'
										defaultValue={account.key}
										size={"sm"}
										rounded={"5"}
									/>
									<Button
										size='sm'
										colorScheme='blue'
										onClick={() => handleCopy(account.key)}
										leftIcon={<MousePointerClick size={18} />}
									>
										Copy
									</Button>
								</div>
							</FormControl>
						)}
					</ModalBody>

					<ModalFooter>
						<Button variant='ghost' size={"sm"} onClick={onClose} mr={3}>
							Cancel
						</Button>
						<Button
							colorScheme='red'
							size={"sm"}
							onClick={() => handleDelete(account._id)}
							isLoading={loading}
						>
							Delete Account
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SeeDisabledModel;
