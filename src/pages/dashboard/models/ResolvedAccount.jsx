import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { MousePointerClick, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import MailInbox from "../../../components/MailBox";
import useCrud from "../../../hook/useCrud";
import { fetchEverything } from "../../../toolkit/features/everythingSlice";

const ResolvedAccount = ({ account, fetchAccounts }) => {
	const [isShowing, setIsShowing] = useState(false);
	const [formData, setFormData] = useState({
		uid: account.uid,
		password: account.password,
	});
	const wrapperRef = useRef(null);
	const { put, loading, response, error } = useCrud();
	const dispatch = useDispatch();
	const [text, setText] = useState("");

	// Close modal on outside click
	useEffect(() => {
		const handleClickOutside = event => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsShowing(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Lock scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = isShowing ? "hidden" : "auto";
	}, [isShowing]);

	// Handle input changes
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await put(`/api/accounts/resolved/${account._id}`, {
				uid: formData.uid || account.uid,
				password: formData.password || account.password,
			});
			setIsShowing(false);
		} catch (err) {
			console.error("Error updating account:", err);
		} finally {
			fetchAccounts();
		}
	};

	// Handle account deletion (soft/hard)
	const handleDie = async actionType => {
		if (
			!window.confirm(`Are you sure you want to ${actionType} this account?`)
		) {
			return;
		}

		setText(actionType);

		try {
			await put(`/api/accounts/resolved/${account._id}?action=${actionType}`);
			toast.success(
				`${
					actionType === "die" ? "Account deactivated" : "Account deleted"
				} successfully.`,
			);
			dispatch(fetchEverything());
		} catch (err) {
			console.error("Error deleting account:", err);
		} finally {
			fetchAccounts();
			setIsShowing(false);
		}
	};

	// Handle copy to clipboard
	const handleCopy = value => {
		if (value) {
			navigator.clipboard.writeText(value).then(() => {
				toast.success(`Copied: ${value}`);
			});
		}
	};

	// Handle API response
	useEffect(() => {
		if (response) {
			toast.success(response.message);
			dispatch(fetchEverything());
			console.log(response, "response");
		}
		if (error) {
			toast.error("Something went wrong. Please try again.");
			console.error("API error:", error);
		}
	}, [response, error, dispatch]);

	return (
		<>
			<button
				onClick={() => setIsShowing(true)}
				className={`text-md text-white hover:text-orange-500 hover:bg-transparent transition-all duration-150 ease-linear border border-transparent hover:border-orange-500 font-medium shadow-sm px-3 bg-orange-500 rounded-lg py-1.5`}
			>
				Update
			</button>

			{isShowing &&
				ReactDOM.createPortal(
					<div
						className='fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm'
						aria-labelledby='update-account-header'
						aria-modal='true'
						role='dialog'
					>
						<div
							className='flex flex-col max-w-lg w-11/12 p-6 bg-white rounded shadow-xl gap-6'
							ref={wrapperRef}
						>
							<header className='flex justify-between items-center'>
								<h3 className='text-xl font-medium text-gray-700'>
									Update Account
								</h3>
								<button
									onClick={() => setIsShowing(false)}
									className='text-pink-500 hover:bg-pink-100 rounded-full p-2'
								>
									<X />
								</button>
							</header>

							<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
								{/* UID */}
								<FormControl>
									<FormLabel htmlFor='uid'>UID</FormLabel>
									<div className='flex items-center gap-2'>
										<Input
											id='uid'
											name='uid'
											value={formData.uid}
											onChange={handleChange}
											placeholder='Enter UID'
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

								{/* Email */}
								<FormControl>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<div className='flex items-center gap-2'>
										<Input
											id='email'
											value={account.email}
											variant={"filled"}
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
								{/* Password */}
								<FormControl>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<div className='flex items-center gap-2'>
										<Input
											id='password'
											name='password'
											value={formData.password}
											onChange={handleChange}
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

								{/* Two-Factor Key */}
								<FormControl>
									<FormLabel htmlFor='key'>Two Factor Key</FormLabel>
									<div className='flex items-center gap-2'>
										<Input id='key' value={account.key} variant={"filled"} />
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

								{/* Actions */}
								<div className='flex flex-wrap gap-2'>
									<Button
										variant='outline'
										size={"sm"}
										colorScheme='gray'
										onClick={() => setIsShowing(false)}
									>
										Cancel
									</Button>
									<Button
										isLoading={loading}
										size={"sm"}
										type='submit'
										colorScheme='blue'
									>
										Save Changes
									</Button>
									<Button
										isLoading={text === "approved" && loading}
										size={"sm"}
										colorScheme='green'
										onClick={() => handleDie("approved")}
									>
										Approved
									</Button>
									<Button
										isLoading={text === "die-move" && loading}
										size={"sm"}
										colorScheme='red'
										onClick={() => handleDie("die-move")}
									>
										Die & Move
									</Button>
									<Button
										isLoading={text === "permanent-die" && loading}
										size={"sm"}
										colorScheme='red'
										onClick={() => handleDie("permanent-die")}
									>
										Permanent Die
									</Button>
								</div>
							</form>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
};

export default ResolvedAccount;
