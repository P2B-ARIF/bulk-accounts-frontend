import {
	Box,
	Button,
	HStack,
	Input,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { MousePointerClick } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateAccount } from "../../toolkit/features/accountSlice";

const DetailCardCopy = ({ field }) => {
	const bgColor = useColorModeValue("white", "gray.800");

	const toast = useToast();
	const dispatch = useDispatch();

	const { title, value } = field;

	const handleCopy = () => {
		if (title === "Password" || title === "Email") {
			dispatch(updateAccount({ [title.toLowerCase()]: value }));
		}

		navigator.clipboard.writeText(field.value).then(() => {
			toast({
				title: "Copied! -" + field.value,
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		});
	};

	return (
		<Box borderWidth={1} borderRadius='lg' overflow='hidden' bg={bgColor}>
			<Box p={2} px={4} bg='gray.200'>
				<h3 className='font-medium'>{field.title}</h3>
			</Box>
			<Box p={4}>
				<HStack spacing={2} bg='gray.100' p={2} px={2} borderRadius='md'>
					<Input
						value={field.value}
						readOnly
						variant='unstyled'
						bg='transparent'
					/>
					<Button
						size='sm'
						px={3}
						colorScheme='blue'
						onClick={handleCopy}
						leftIcon={<MousePointerClick size={18} />}
					>
						Copy
					</Button>
				</HStack>
			</Box>
		</Box>
	);
};

export default DetailCardCopy;
