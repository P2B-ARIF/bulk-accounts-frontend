import {
	Box,
	Button,
	Input,
	SimpleGrid,
	Textarea,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { ClipboardCheck, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import FactorCode from "../../../components/FactorCode";
import Mailvn from "../../../components/mailbox/mailvn/Mailvn";
import OneSecMailBox from "../../../components/mailbox/onesecmail/OneSecMailBox";
import CookieUrl from "../../../components/user/CookieUrl";
import PasteTempMail from "../../../components/user/PasteTempMail";
import useCrud from "../../../hook/useCrud";
import { updateAccount } from "../../../toolkit/features/accountSlice";
import { fetchPackages } from "../../../toolkit/features/packageSlice";
import {
	getRandomEmail,
	getRandomName,
	getRandomNumber,
} from "../../../utils/random";
import DetailCardCopy from "./../../../components/user/DetailCardCopy";
import AccountsStats from "./AccountsStats";

const TiktokCreate = ({ user }) => {
	const [details, setDetails] = useState({
		girlName: { fname: "", lname: "" },
		number: "",
		email: "",
	});

	const [isMailBoxOn, setIsMailBoxOn] = useState(false);

	const maintenance = useOutletContext();
	// console.log(user, maintenance.password, "userss");

	useEffect(() => {
		if (maintenance) {
			const getEmail = getRandomEmail(maintenance?.mailbox);
			const girlName = getRandomName();

			setIsMailBoxOn(maintenance?.mailboxToggle);

			const email =
				girlName.fname.toLowerCase() +
				getEmail.split("@")[0] +
				"@" +
				getEmail.split("@")[1];

			setDetails({
				girlName: girlName,
				pass: user.nickname + "gz@" + maintenance?.password, // Generate password based on user nickname and maintenance password
				number: getRandomNumber(),
				email: email,
			});
		}
	}, []);

	const chakraToast = useToast();
	const dispatch = useDispatch();
	const { account } = useSelector(state => state.account);

	const bgColor = useColorModeValue("white", "gray.800");
	const { get, post, loading, error, response } = useCrud();
	const { packages } = useSelector(state => state.packages);

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [packages, dispatch]);

	const tiktokPackages = packages?.packages?.filter(
		p => p.accountType === "tiktok",
	);

	const handleCopy = async field => {
		const text = await navigator.clipboard.readText();
		dispatch(updateAccount({ [field]: text }));
		chakraToast({
			title: "Copied! - " + text,
			status: "success",
			duration: 2000,
			isClosable: true,
		});
	};

	// Function to submit account creation request
	const handleSubmit = async () => {
		await post("/api/accounts/create", account);
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message || "TikTok Account created successfully");
			window.location.reload();
		}
		if (error) {
			toast.error(error);
		}
	}, [response, error]);

	return (
		<Box>
			<SimpleGrid columns={{ base: 1, lg: 5 }} spacing={6}>
				<VStack spacing={6} gridColumn={{ lg: "span 2" }}>
					{/* Display TikTok account statistics if packages are available */}
					{tiktokPackages?.length > 0 && (
						<AccountsStats accounts={tiktokPackages} />
					)}
					{/* Textarea to display combined account details */}
					<Textarea
						borderColor={"blue.400"}
						placeholder='Combined data will appear here'
						readOnly
						value={`${account?.email || " "}\n${account?.uid || " "}\n${
							account?.cookie || " "
						}\n${account?.password || " "}\n${account?.key || " "}`}
						minHeight='120px'
						resize='none'
					/>

					{/* Submit button to create TikTok account */}
					<Button
						onClick={handleSubmit}
						rounded={"lg"}
						fontWeight={"medium"}
						leftIcon={<UploadIcon size={18} />}
						isLoading={loading}
						isDisabled={!account?.email || !account?.password || !account?.uid}
						colorScheme='blue'
						mr='auto'
						px='20px'
						width={{ base: "full", sm: "auto" }}
					>
						Submit Account
					</Button>
				</VStack>
				{account?.accountType ? (
					<SimpleGrid
						columns={{ base: 1, sm: 2, md: 1, lg: 1, xl: 2 }}
						spacing={4}
						gridColumn={{ lg: "span 3" }}
					>
						{/* Display account details for copying */}
						{[
							{ title: "Password", value: details.pass },
							{
								title: "Name",
								value: details.girlName.fname + " " + details.girlName.lname,
							},
							// { title: "Number", value: details.number },
							{ title: "Email", value: details.email },
						].map((field, i) => {
							if (isMailBoxOn === false && field.title === "Email") {
								return null;
							}
							return <DetailCardCopy key={i} field={field} />;
						})}

						{maintenance?.mailboxToggle && details?.email ? (
							maintenance.mailbox === "1secmail" ? (
								<OneSecMailBox email={details.email} />
							) : maintenance.mailbox === "5smail" ? (
								<Mailvn email={details.email} />
							) : null
						) : null}

						{/* Show temporary mail paste component if enabled */}
						{maintenance?.tempmail && <PasteTempMail />}

						{/* Show Cookie URL or Factor Code based on account format */}
						{account?.accountFormat?.includes("cookie") ? (
							<CookieUrl />
						) : (
							<FactorCode />
						)}

						<Box
							borderWidth={1}
							borderRadius='lg'
							overflow='hidden'
							bg={bgColor}
						>
							<Box p={2} px={4} bg='gray.200'>
								<h3 className='font-medium'>Profile URL</h3>
							</Box>
							<Box p={4}>
								<VStack spacing={2}>
									<Input
										bg='gray.100'
										value={account.uid}
										placeholder='Enter profile URL'
									/>
									<Button
										onClick={() => {
											handleCopy("uid");
											window.scrollTo({
												top: 0,
												behavior: "smooth",
											});
										}}
										colorScheme='blue'
										leftIcon={<ClipboardCheck size={20} />}
										width='full'
									>
										<span className='font-medium'>Paste Username</span>
									</Button>
								</VStack>
							</Box>
						</Box>
					</SimpleGrid>
				) : (
					<div className='text-center font-semibold text-xl text-red-500'>
						You have to select one
					</div>
				)}
			</SimpleGrid>
		</Box>
	);
};

export default TiktokCreate;
