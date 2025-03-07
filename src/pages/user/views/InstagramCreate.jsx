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
import DetailCardCopy from "../../../components/user/DetailCardCopy";
import PasteTempMail from "../../../components/user/PasteTempMail";
import useCrud from "../../../hook/useCrud";
import { updateAccount } from "../../../toolkit/features/accountSlice";
import { fetchPackages } from "../../../toolkit/features/packageSlice";
import {
	getRandomEmail,
	getRandomName,
	getRandomNumber,
} from "../../../utils/random";
import DirectIdCreateModel from "../model/DirectIdCreateModel";
import AccountsStats from "./AccountsStats";

const InstagramCreate = ({ user }) => {
	const [details, setDetails] = useState({
		girlName: { fname: "", lname: "" },
		pass: "",
		number: "01953424319",
		email: "",
	});

	const [isMailBoxOn, setIsMailBoxOn] = useState(false);

	const maintenance = useOutletContext();

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
				pass: user?.nickname + maintenance?.password,
				// pass: getRandomPassword(),
				number: getRandomNumber(),
				email: email,
			});
		}

		// setDetails({
		// 	girlName: getRandomName(),
		// 	pass: getRandomPassword(),
		// 	number: getRandomNumber(),
		// 	email: getRandomEmail(),
		// });
	}, []);

	const bgColor = useColorModeValue("white", "gray.800");

	const chakraToast = useToast();
	const dispatch = useDispatch();
	const { account } = useSelector(state => state.account);
	const { packages } = useSelector(state => state.packages);

	const { post, loading, error, response } = useCrud();

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [packages, dispatch]);

	const instagramPackages = packages?.packages?.filter(
		p => p.accountType === "instagram",
	);
	// const instagramPackages = packages?.packages?.filter(
	// 	p => p.accountType === "instagram" && p.active === true,
	// );

	const handleCopy = async field => {
		const text = await navigator.clipboard.readText();

		if (field === "uid") {
			if (text.includes("@")) {
				return chakraToast({
					title: "Error",
					description: "Invalid UID.",
					status: "error",
				});
			}
			if (text.length < 8) {
				return chakraToast({
					title: "Error",
					description: "Invalid UID.",
					status: "error",
				});
			}
			return dispatch(updateAccount({ [field]: text }));
		}

		dispatch(updateAccount({ [field]: text }));
		chakraToast({
			title: "Copied! -" + field.value,
			status: "success",
			duration: 2000,
			isClosable: true,
		});
	};

	const handleSubmit = async () => {
		await post("/api/accounts/create", account);
	};

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			window.location.reload();
		}
		if (error) {
			console.log(error);
			toast.error(error);
		}
	}, [response, error]);

	return (
		<Box>
			<SimpleGrid columns={{ base: 1, lg: 5 }} spacing={6}>
				{/* Left Section */}
				<VStack spacing={6} gridColumn={{ lg: "span 2" }}>
					{instagramPackages?.length > 0 && (
						<AccountsStats accounts={instagramPackages} />
					)}

					<Textarea
						borderColor={"pink.400"}
						placeholder='Combined data will appear here'
						readOnly
						value={`${account?.email || " "}\n${
							account?.uid || account?.cookie || " "
						}\n${account?.password || " "}\n${account?.key || " "}`}
						minHeight='120px'
						resize='none'
					/>

					<div className='flex items-center mr-auto gap-2 md:gap-5'>
						<DirectIdCreateModel />

						<Button
							onClick={handleSubmit}
							rounded={"lg"}
							fontWeight={"medium"}
							leftIcon={<UploadIcon size={18} />}
							isLoading={loading}
							isDisabled={
								!account?.email || !account?.password || !account?.uid
							}
							colorScheme='pink'
							mr='auto'
							px='20px'
							width={{ base: "full", sm: "auto" }}
						>
							Submit Account
						</Button>
					</div>
				</VStack>

				{/* Right Section */}
				{account?.accountType ? (
					<SimpleGrid
						columns={{ base: 1, sm: 2, md: 1, lg: 1, xl: 2 }}
						spacing={4}
						gridColumn={{ lg: "span 3" }}
					>
						{[
							{ title: "Password", value: details.pass },
							{
								title: "Name",
								value: details.girlName.fname + " " + details.girlName.lname,
							},
							{ title: "Number", value: details.number },
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

						{/* {details?.email && <MailInbox email={details?.email} />} */}

						<FactorCode />

						{maintenance?.tempmail && <PasteTempMail />}

						{/* <PasteTempMail /> */}
						<Box
							borderWidth={1}
							borderRadius='lg'
							overflow='hidden'
							bg={bgColor}
						>
							<Box p={2} px={4} bg='gray.200'>
								<h3 className='font-medium'>Instagram Username</h3>
							</Box>
							<Box p={4}>
								<VStack spacing={2}>
									<Input
										bg='gray.100'
										value={account.uid}
										placeholder='Enter username'
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
										<span className='font-medium'> Paste Username</span>
									</Button>
								</VStack>
							</Box>
						</Box>
					</SimpleGrid>
				) : (
					<div className='text-center font-bold text-xl text-red-500'>
						You have to select one
					</div>
				)}
			</SimpleGrid>
		</Box>
	);
};
export default InstagramCreate;
