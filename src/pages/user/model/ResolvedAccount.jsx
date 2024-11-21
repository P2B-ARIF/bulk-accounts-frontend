import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import useCrud from "../../../hook/useCrud";
import { fetchEverything } from "../../../toolkit/features/everythingSlice";

const ResolvedAccount = ({ account }) => {
	const [isShowing, setIsShowing] = useState(false);
	const [newUid, setUid] = useState("");

	const wrapperRef = useRef(null);

	const { put, loading, response, error } = useCrud();

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

	useEffect(() => {
		let html = document.querySelector("html");
		if (html) html.style.overflowY = isShowing ? "hidden" : "visible";
	}, [isShowing]);

	// // Handle form input changes
	// const handleChange = e => {
	// 	const { name, value } = e.target;
	// 	setFormData({ ...formData, [name]: value });
	// };

	const dispatch = useDispatch();

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault();
		await put(`/api/accounts/${account._id}`, { uid: newUid || account.uid });
		dispatch(fetchEverything());
		setIsShowing(false);
	};

	if (response) {
		console.log(response, "response");
	}
	if (error) {
		console.log(error, "error");
	}

	return (
		<>
			<button
				onClick={() => setIsShowing(true)}
				className='text-md text-pink-100 hover:text-pink-200 font-medium shadow-sm px-3 bg-yellow-600 rounded-lg py-1.5'
			>
				Resolved
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
										Resolved Accounts
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
									<FormControl>
										<FormLabel htmlFor='uid' fontSize='sm' color='gray.900'>
											UID
										</FormLabel>
										<Input
											id='uid'
											value={newUid || account.uid}
											onChange={e => setUid(e.target.value)}
											placeholder='Enter uid | username'
											bg='gray.100'
										/>
									</FormControl>

									{/* Account Number */}
									<FormControl>
										<FormLabel htmlFor='email' fontSize='sm' color='gray.700'>
											Account Number
										</FormLabel>
										<Input
											id='email'
											name='email'
											type='email'
											value={account.email}
											bg='gray.100'
										/>
									</FormControl>

									{/* Bank Name */}
									<FormControl>
										<FormLabel
											htmlFor='password'
											fontSize='sm'
											color='gray.700'
										>
											Password
										</FormLabel>
										<Input
											id='password'
											name='password'
											type='text'
											placeholder='Enter password '
											value={account.password}
											bg='gray.100'
										/>
									</FormControl>

									<FormControl>
										<FormLabel htmlFor='key' fontSize='sm' color='gray.700'>
											Two Factor Key
										</FormLabel>
										<Input
											id='key'
											name='key'
											type='text'
											placeholder='Enter Two Factor Key'
											value={account.key}
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
												setUid("");
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

export default ResolvedAccount;