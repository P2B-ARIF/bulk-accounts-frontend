import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useCrud from "../../../hook/useCrud";
import { fetchEverything } from "../../../toolkit/features/everythingSlice";

const WithdrawMoney = ({ approvedAccounts, amount }) => {
	const [isShowing, setIsShowing] = useState(false);
	const [formData, setFormData] = useState({
		accountNumber: "",
		accountName: "",
		notes: "",
	});
	const [errors, setErrors] = useState({});
	const wrapperRef = useRef(null);

	const { user } = useSelector(state => state.user);

	const accountIDs = approvedAccounts?.map(f => f._id);

	const { post, loading, response, error } = useCrud();

	// console.log(facebook.map(f => f._id));

	// Close modal on outside click
	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsShowing(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);

	// Prevent background scroll when modal is open
	useEffect(() => {
		let html = document.querySelector("html");
		if (html) html.style.overflowY = isShowing ? "hidden" : "visible";
	}, [isShowing]);

	// Handle form input changes
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const dispatch = useDispatch();

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault();

		// // Simple validation
		let validationErrors = {};
		if (!formData.accountNumber)
			validationErrors.accountNumber = "Account number is required.";
		if (!formData.accountName)
			validationErrors.accountName = "Account name is required.";
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			// Submit logic here (e.g., API call)
			console.log("Form submitted successfully:", formData);
			const newData = { ...formData, amount, userName: user?.name };

			// console.log({ ...formData, amount, accountIDs });
			await post("/api/withdraw", { newData, accountIDs });
			// window.location.reload();
			dispatch(fetchEverything());

			setIsShowing(false); // Close modal on successful submission
		}
	};

	if (response) {
		toast.success(response.message);
		console.log(response, "response");
	}
	if (error) {
		console.log(error, "error");
	}

	return (
		<>
			<button
				onClick={() => setIsShowing(true)}
				className='text-md text-pink-100 hover:text-pink-200 font-medium shadow-sm px-3 bg-pink-600 rounded-lg py-1.5'
			>
				Withdraw Money
			</button>

			{isShowing && typeof document !== "undefined"
				? ReactDOM.createPortal(
						<div
							className='fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm'
							aria-labelledby='withdraw-header'
							aria-modal='true'
							tabIndex='-1'
							role='dialog'
						>
							<div
								className='flex max-h-[90vh] w-11/12 max-w-md flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10'
								ref={wrapperRef}
								id='modal'
								role='document'
							>
								<header
									id='withdraw-header'
									className='flex items-center gap-4'
								>
									<h3 className='flex-1 text-xl font-medium text-slate-700'>
										Withdraw Money
									</h3>
									<button
										onClick={() => setIsShowing(false)}
										className='text-pink-500 hover:bg-pink-100 rounded-full p-2'
										aria-label='close dialog'
									>
										<X />
									</button>
								</header>

								<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
									{/* Amount */}
									<FormControl isInvalid={errors.amount}>
										<FormLabel htmlFor='amount' fontSize='sm' color='gray.900'>
											Amount
										</FormLabel>
										<Input
											id='amount'
											value={amount.toFixed(2)}
											type='number'
											readOnly
											placeholder='Enter withdrawal amount'
											bg='gray.100'
										/>
										<FormErrorMessage>{errors.amount}</FormErrorMessage>
									</FormControl>

									{/* Account Number */}
									<FormControl isInvalid={errors.accountNumber}>
										<FormLabel
											htmlFor='accountNumber'
											fontSize='sm'
											color='gray.700'
										>
											Account Number
										</FormLabel>
										<Input
											id='accountNumber'
											name='accountNumber'
											type='number'
											placeholder='Enter account number'
											value={formData.accountNumber}
											onChange={handleChange}
											bg='gray.100'
										/>
										<FormErrorMessage>{errors.accountNumber}</FormErrorMessage>
									</FormControl>

									{/* Bank Name */}
									<FormControl isInvalid={errors.accountName}>
										<FormLabel
											htmlFor='accountName'
											fontSize='sm'
											color='gray.700'
										>
											Account Name
										</FormLabel>
										<Input
											id='accountName'
											name='accountName'
											type='text'
											placeholder='Bkash/ Nagod/ Rocket'
											value={formData.accountName}
											onChange={handleChange}
											bg='gray.100'
										/>
										<p className='flex items-start gap-1 text-red-500 text-sm mt-1'>
											<IoIosWarning size={18} /> লিমিটের কারণে যদি VAT কাটা হয়,
											তবে সেই পরিমাণ আপনার কাছ থেকে কর্তন করা হবে।
										</p>
										<FormErrorMessage>{errors.accountName}</FormErrorMessage>
									</FormControl>

									{/* Notes */}
									<FormControl>
										<FormLabel htmlFor='notes' fontSize='sm' color='gray.700'>
											Notes (Optional)
										</FormLabel>
										<Textarea
											id='notes'
											name='notes'
											placeholder='Additional notes (optional)'
											value={formData.notes}
											onChange={handleChange}
											rows={3}
											bg='gray.100'
										/>
									</FormControl>

									{/* Actions */}
									<div className='flex justify-end gap-2'>
										<Button
											type='button'
											colorScheme='pink'
											variant='outline'
											onClick={() => {
												setFormData({
													accountNumber: "",
													accountName: "",
													notes: "",
												});
												setIsShowing(false);
											}}
										>
											Cancel
										</Button>
										<Button
											isDisabled={loading}
											isLoading={loading}
											type='submit'
											colorScheme='pink'
											onClick={handleSubmit}
										>
											Submit
										</Button>
									</div>
								</form>
							</div>
						</div>,
						document.body,
				  )
				: null}
		</>
	);
};

export default WithdrawMoney;
