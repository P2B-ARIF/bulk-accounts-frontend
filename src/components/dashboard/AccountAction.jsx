import { Box, Textarea, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useCrud from "../../hook/useCrud";
import { fetchAccounts } from "../../toolkit/features/dashboard/accountsSlice";

const AccountAction = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	const { put, error, loading, response } = useCrud();
	const [accountUIDs, setAccountUID] = useState([]);
	const dispatch = useDispatch();
	const [actionName, setActionName] = useState("");

	const handleAccount = async action => {
		setActionName(action);
		await put(`/api/accounts?action=${action}`, accountUIDs.split(","));
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setAccountUID([]);
			dispatch(fetchAccounts());
		}
		if (error) {
			console.log(error, "error");
		}
	}, [response, error, dispatch]);

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			p={4}
			borderColor={borderColor}
			bg={bgColor}
			_hover={{ boxShadow: "lg" }}
			transition='all 0.3s'
		>
			<h3 className='text-lg font-medium mb-5 text-blue-800'>
				UPDATE APPROVED STATUS
			</h3>

			<Box className='space-y-3 '>
				<Textarea
					placeholder='Enter your message'
					value={accountUIDs}
					onChange={e => setAccountUID(e.target.value)}
					h={"150"}
					resize='none'
				/>

				<div className='flex flex-wrap items-center gap-3 mt-2'>
					<button
						onClick={() => handleAccount("approved")}
						className='text-md text-white hover:bg-green-400 font-medium shadow-sm px-3 bg-green-500 rounded-lg py-1.5'
					>
						{actionName === "approved" && loading ? "Loading.." : "Approved"}
					</button>
					<button
						onClick={() => handleAccount("attempt")}
						className='text-md text-slate-100 hover:bg-blue-400 font-medium shadow-sm px-3 bg-blue-500 rounded-lg py-1.5'
					>
						{actionName === "attempt" && loading ? "Loading.." : "Back"}
					</button>
					<button
						onClick={() => handleAccount("die")}
						className='text-md text-white hover:bg-red-400 font-medium shadow-sm px-3 bg-red-500 rounded-lg py-1.5'
					>
						{actionName === "die" && loading ? "Loading.." : "Disabled"}
					</button>
					<button
						onClick={() => handleAccount("sale_die")}
						className='text-md text-white hover:bg-purple-400 font-medium shadow-sm px-3 bg-purple-500 rounded-lg py-1.5'
					>
						{actionName === "sale_die" && loading
							? "Loading.."
							: "Sale & Disabled"}
					</button>

					<button
						onClick={() => handleAccount("sale_approved")}
						className='text-md text-white hover:bg-rose-400 font-medium shadow-sm px-3 bg-rose-500 rounded-lg py-1.5'
					>
						{actionName === "sale_approved" && loading
							? "Loading.."
							: "Sale & approved"}
					</button>
				</div>
			</Box>
		</Box>
	);
};

export default AccountAction;
