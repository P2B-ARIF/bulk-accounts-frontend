import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const NicknameModel = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [nickname, setNickname] = useState("");
	const [error, setError] = useState("");

	const { put, loading, response, error: apiError } = useCrud();

	// Handle input change
	const handleChange = e => {
		setNickname(e.target.value.trim()); // Trim input to remove unnecessary spaces
		setError(""); // Clear local validation errors on change
	};

	// Validate nickname
	const validateNickname = name => {
		if (name.length < 4 || name.length > 6) {
			return "Nickname must be between 4 and 6 characters.";
		}
		if (!/^[a-z]+$/.test(name)) {
			return "Nickname must contain only lowercase English letters.";
		}
		return null;
	};

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault();

		const validationError = validateNickname(nickname);
		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			await put("/api/auth/nickname", { nickname });

			if (response?.result?.nickname) {
				toast.success("Nickname submitted successfully!");
				window.location.reload();
			}
		} catch {
			toast.error(apiError?.message || "Something went wrong.");
		}
	};

	return (
		<Modal isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Enter Your Nickname</ModalHeader>
				<form onSubmit={handleSubmit}>
					<ModalBody>
						<FormControl isInvalid={!!error}>
							<FormLabel>Nickname</FormLabel>
							<Input
								type='text'
								placeholder='Enter your nickname'
								value={nickname}
								onChange={handleChange}
							/>
							<FormErrorMessage>{error}</FormErrorMessage>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme='pink'
							type='submit'
							isLoading={loading}
							isDisabled={loading}
						>
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default NicknameModel;
