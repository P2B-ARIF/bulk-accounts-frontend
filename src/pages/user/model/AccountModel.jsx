import { Box, useColorModeValue } from "@chakra-ui/react";
import { FileSymlink, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	accountStart,
	clearAccount,
} from "../../../toolkit/features/accountSlice";

const AccountModel = ({ account }) => {
	const [isShowing, setIsShowing] = useState(false);
	const { account: accountStat } = useSelector(state => state.account);

	const wrapperRef = useRef(null);

	const borderColor = useColorModeValue("gray.200", "gray.700");

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

		if (html) {
			if (isShowing && html) {
				html.style.overflowY = "hidden";

				const focusableElements =
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

				const modal = document.querySelector("#modal"); // select the modal by it's id

				const firstFocusableElement =
					modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

				const focusableContent = modal.querySelectorAll(focusableElements);

				const lastFocusableElement =
					focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

				document.addEventListener("keydown", function (e) {
					if (e.keyCode === 27) {
						setIsShowing(false);
					}

					let isTabPressed = e.key === "Tab" || e.keyCode === 9;

					if (!isTabPressed) {
						return;
					}

					if (e.shiftKey) {
						// if shift key pressed for shift + tab combination
						if (document.activeElement === firstFocusableElement) {
							lastFocusableElement.focus(); // add focus for the last focusable element
							e.preventDefault();
						}
					} else {
						// if tab key is pressed
						if (document.activeElement === lastFocusableElement) {
							// if focused has reached to last focusable element then focus first focusable element after pressing tab
							firstFocusableElement.focus(); // add focus for the first focusable element
							e.preventDefault();
						}
					}
				});

				firstFocusableElement.focus();
			} else {
				html.style.overflowY = "visible";
			}
		}
	}, [isShowing]);

	// console.log(accountStat);

	const bgColor = useColorModeValue("white", "gray.800");
	const dispatch = useDispatch();

	return (
		<>
			<Box
				onClick={() => setIsShowing(true)}
				borderWidth={1}
				borderRadius='lg'
				p={2}
				borderColor={borderColor}
				bg={bgColor}
				_hover={{ boxShadow: "sm" }}
				transition='all 0.2s'
				cursor={"pointer"}
				backgroundColor={
					accountStat.accountFormat === account.accountFormat
						? "blue.500"
						: "white"
				}
				color={
					accountStat.accountFormat === account.accountFormat
						? "white"
						: "blue.500"
				}
			>
				<h3 className='text-md md:text-lg font-medium uppercase sm:pl-3 md:pl-5'>
					{account.accountType} {account.accountFormat}
				</h3>
			</Box>

			{isShowing && typeof document !== "undefined"
				? ReactDOM.createPortal(
						<div
							className='fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm'
							aria-labelledby='header-2a content-2a'
							aria-modal='true'
							tabIndex='-1'
							role='dialog'
						>
							{/*    <!-- Modal --> */}
							<div
								className='flex max-h-[90vh] w-11/12 max-w-md flex-col gap-6 overflow-hidden rounded-lg bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10'
								ref={wrapperRef}
								id='modal'
								role='document'
							>
								{/*        <!-- Modal header --> */}
								<header id='header-2a' className='flex items-center gap-4'>
									<h3 className='flex-1 text-xl font-medium text-pink-700 uppercase'>
										{account.accountType} || {account.accountFormat}
									</h3>
									<button
										onClick={() => setIsShowing(false)}
										className='text-pink-500'
										aria-label='close dialog'
									>
										<X />
									</button>
								</header>
								{/*        <!-- Modal body --> */}
								<div id='content-2a' className='flex-1 overflow-auto space-y-1'>
									<h4>
										This Working Rate: <b>{account.rate} BDT</b>
									</h4>
									<h4>
										Estimated Time: <b>{account.time} Minute</b>
									</h4>
									<br />
									<p>{account.message}</p>
								</div>
								{/*        <!-- Modal actions --> */}
								<div className='flex items-center justify-end gap-2'>
									{/*            <!-- base basic button --> */}
									<a
										href={account.fileUrl}
										target='_blank'
										className='text-sm text-white bg-blue-500 h-10 inline-flex items-center px-5 rounded-lg font-medium gap-2'
									>
										<FileSymlink size={"18"} /> File Link
									</a>

									<button
										onClick={() => {
											dispatch(clearAccount({}));
											dispatch(
												accountStart({
													accountType: account.accountType,
													accountFormat: account.accountFormat,
													rate: account.rate,
												}),
											);
											setIsShowing(false);
										}}
										className='inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded-lg whitespace-nowrap bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-pink-300 disabled:bg-pink-300 disabled:shadow-none'
									>
										<span>Continue</span>
									</button>
								</div>
							</div>
						</div>,
						document.body,
				  )
				: null}
		</>
	);
};
export default AccountModel;
