import { Button, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { HandCoins } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import useCrud from "../../hook/useCrud";

const Payment = ({ order }) => {
	const hoverBg = useColorModeValue("gray.50", "gray.700");
	const { put, error, response, loading } = useCrud();

	console.log(order, "order");
	const handlePayment = async () => {
		await put(`/api/withdraw/${order._id}`);
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			window.location.reload();
		}
		if (error) {
			console.log(error, "error");
		}
	}, [response, error]);

	return (
		<Tr _hover={{ bg: hoverBg }} transition='all 0.2s'>
			<Td>{order?.createdAt?.date_fns}</Td>
			<Td fontSize='sm'>
				<Text color='gray.500' fontSize='xs'>
					{order.userEmail}
				</Text>
				<Text color='gray.500' fontSize='xs'>
					{order.accountNumber}
				</Text>
			</Td>
			<Td>
				<span>{order.accountNumber}</span> <br />
				<span>{order.accountName}</span>
			</Td>
			<Td>{order.notes}</Td>
			<Td>{order.totalAccounts}</Td>
			<Td>{order.amount} BDT</Td>
			<Td>
				{order?.payment === "pending" ? (
					<Button
						size='sm'
						px={3}
						colorScheme='blue'
						onClick={handlePayment}
						isLoading={loading}
						isDisabled={loading}
						leftIcon={<HandCoins size={18} />}
					>
						Confirm Payment
					</Button>
				) : (
					<span className='text-green-500'>{order?.payment}</span>
				)}
			</Td>
		</Tr>
	);
};

export default Payment;
