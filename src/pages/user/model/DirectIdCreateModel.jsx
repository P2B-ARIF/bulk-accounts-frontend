import { Button, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { IoIosSwitch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import FactorCode from "../../../components/FactorCode";
import useCrud from "../../../hook/useCrud";
import { updateAccount } from "../../../toolkit/features/accountSlice";
import { profileUrlGenerator } from "../../../utils/profile_url";

const DirectIdCreateModel = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { account } = useSelector(state => state.account);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className={`bg-gradient-to-r ${
					account?.accountType
						? "from-violet-600 to-indigo-600"
						: "from-violet-200 to-indigo-200"
				} text-white font-medium px-4 py-2 rounded-lg whitespace-nowrap hover:opacity-90 transition-opacity`}
				disabled={!account?.accountType}
			>
				Direct
			</button>
			<SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
};

const SpringModal = ({ isOpen, setIsOpen }) => {
	const { account } = useSelector(state => state.account);
	const { user, loading: userLoading } = useSelector(state => state.user);
	const [switch2fa, setSwitch2fa] = useState(false);
	const dispatch = useDispatch();
	const maintenance = useOutletContext();
	const toast = useToast();
	const [urlLoading, setUrlLoading] = useState(false);
	const { get, post, loading, error, response } = useCrud();

	// Update account password when maintenance or user changes
	useEffect(() => {
		if (maintenance && user && isOpen) {
			dispatch(
				updateAccount({ password: user.nickname + maintenance?.password }),
			);
		}
	}, [maintenance, user, dispatch, isOpen]);

	// Handle copying and validation for different fields
	const handleCopy = async (field, value) => {
		if (field === "email" && (!value.includes("@") || !value.includes("."))) {
			return toast({
				description: "Invalid email address.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}

		if (field === "key") {
			const secret = value.match(/[a-zA-Z0-9]/g)?.join("");
			if (!secret || secret.length < 20) {
				return toast({
					description:
						"আপনি সঠিক ভাবে ২ ফেক্টর কোড দিচ্ছেন না। অনুগ্রহ করে পুনরায় চেক করুন।",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		}

		if (field === "uid") {
			const uidCode = value.match(/id=(\d+)/)?.[1];
			if (uidCode) {
				if (uidCode.length < 10) {
					return toast({
						title: "Error",
						description: "Invalid UID.",
						status: "error",
					});
				}

				dispatch(updateAccount({ [field]: uidCode }));
			} else if (value.includes("share")) {
				try {
					setUrlLoading(true);
					const data = await profileUrlGenerator(value);
					// console.log(data, "data");

					if (data.uid.length < 10) {
						return toast({
							title: "Error",
							description: "Invalid UID.",
							status: "error",
						});
					}

					dispatch(updateAccount({ [field]: data.uid }));
				} catch (err) {
					toast({
						title: "Error",
						description: "Invalid UID" + err.message,
						status: "error",
					});
				} finally {
					setUrlLoading(false);
				}
			} else {
				toast({
					title: "Error",
					description: "Invalid UID",
					status: "error",
				});
			}
		} else {
			dispatch(updateAccount({ [field]: value }));
		}

		toast({
			description: `Copied! - ${value}`,
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	useEffect(() => {
		if (response) {
			// toast.success(response.message);
			toast({
				description: response.message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			window.location.reload();
		}
		if (error) {
			console.log(error);
			toast({
				description: error,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [response, error]);

	const handleSubmit = async () => {
		await post("/api/accounts/create", account);
	};

	if (userLoading) {
		return <div>Loading...</div>;
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='bg-slate-900/20 backdrop-blur p-4 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
				>
					<motion.div
						initial={{ scale: 0, rotate: "12.5deg" }}
						animate={{ scale: 1, rotate: "0deg" }}
						exit={{ scale: 0, rotate: "0deg" }}
						onClick={e => e.stopPropagation()}
						className='bg-gradient-to-br from-violet-600 to-indigo-600 text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
					>
						<FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />
						<div className='relative z-10 space-y-2'>
							<p className='text-white'>
								ওয়েবসাইট বার বার রিলোড হয়ে যাওয়া সমস্যার জন্য যারা আইডি সাবমিট
								দিতে পারছেন না। শুধু মাত্র তারায় এখানে সাবমিট করবেন।
							</p>

							{/* Password Input */}
							<Text mb='0px' color={"white"}>
								Password
							</Text>
							<Input
								bg='gray.100'
								value={account.password}
								readOnly
								placeholder='Enter Password'
							/>

							{/* Temp Mail Input */}
							<Text mb='0px' color={"white"}>
								Temp Mail
							</Text>
							<Input
								bg='gray.100'
								value={account.email}
								onChange={e => handleCopy("email", e.target.value)}
								placeholder='Enter Temp Mail'
							/>

							{/* Profile URL Input */}
							<Text mb='0px' color={"white"}>
								Profile URL
							</Text>
							{urlLoading ? (
								<div className='bg-slate-100 py-2 px-4 rounded-lg flex items-center gap-2'>
									<Spinner size={"sm"} /> Loading...
								</div>
							) : (
								<Input
									bg='gray.100'
									value={account.uid}
									onChange={e => handleCopy("uid", e.target.value)}
									placeholder='Enter profile URL'
								/>
							)}

							{/* Two Factor Verification */}
							{switch2fa ? (
								<>
									<div className='flex items-center gap-2'>
										<Text mb='0px' color={"white"}>
											Two Factor Verification
										</Text>
										<Button
											size={"sm"}
											onClick={() => setSwitch2fa(false)}
											colorScheme='teal'
											gap={2}
										>
											<IoIosSwitch />
											Switch
										</Button>
									</div>
									<Input
										bg='gray.100'
										value={account.key}
										onChange={e => handleCopy("key", e.target.value)}
										placeholder='Enter Two Factor Verification Code'
									/>
								</>
							) : (
								<FactorCode setSwitch2fa={setSwitch2fa} />
							)}
						</div>

						{/* Action Buttons */}
						<div className='flex items-center gap-2 md:gap-5 mt-5'>
							<Button
								colorScheme='red'
								onClick={() => setIsOpen(false)}
								size={"sm"}
							>
								Close
							</Button>
							{/* <Button
								onClick={() => setIsOpen(false)}
								size={"sm"}
								colorScheme='blue'
							>
								Submit Account
							</Button> */}
							<Button
								onClick={handleSubmit}
								rounded={"lg"}
								fontWeight={"medium"}
								leftIcon={<UploadIcon size={18} />}
								isLoading={loading}
								isDisabled={!account?.email || !account?.uid}
								colorScheme='blue'
								mr='auto'
								px='20px'
								width={{ base: "full", sm: "auto" }}
							>
								Submit Account
							</Button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DirectIdCreateModel;
