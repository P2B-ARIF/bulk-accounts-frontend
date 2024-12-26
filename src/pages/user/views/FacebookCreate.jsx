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
import MailInbox from "../../../components/MailBox";
import CookieUrl from "../../../components/user/CookieUrl";
import DetailCardCopy from "../../../components/user/DetailCardCopy";
import PasteTempMail from "../../../components/user/PasteTempMail";
import useCrud from "../../../hook/useCrud";
import { updateAccount } from "../../../toolkit/features/accountSlice";
import {
	getRandomEmail,
	getRandomName,
	getRandomNumber,
} from "../../../utils/random";
import { fetchPackages } from "./../../../toolkit/features/packageSlice";
import AccountsStats from "./AccountsStats";

const FacebookCreate = ({ user }) => {
	const [details, setDetails] = useState({
		girlName: { fname: "", lname: "" },
		// pass: "",
		number: "",
		email: "",
	});

	const maintenance = useOutletContext();

	useEffect(() => {
		const getEmail = getRandomEmail();
		const girlName = getRandomName();

		const email =
			girlName.fname.toLowerCase() +
			getEmail.split("@")[0] +
			"@" +
			getEmail.split("@")[1];

		setDetails({
			girlName: girlName,
			pass: user.nickname + maintenance?.password,
			number: getRandomNumber(),
			email: email,
		});
	}, []);

	const chakraToast = useToast();
	const dispatch = useDispatch();
	const { account } = useSelector(state => state.account);

	const bgColor = useColorModeValue("white", "gray.800");
	const { post, loading, error, response } = useCrud();
	const { packages } = useSelector(state => state.packages);

	useEffect(() => {
		if (!packages) {
			dispatch(fetchPackages());
		}
	}, [packages, dispatch]);

	const facebookPackages = packages?.packages?.filter(
		p => p.accountType === "facebook" && p.active === true,
	);

	const handleCopy = async field => {
		const text = await navigator.clipboard.readText();

		// if (field === "uid") {
		// 	// Regular expression to match the UID from Facebook URLs
		// 	const facebookUrlPattern =
		// 		/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:profile\.php\?id=|share\/p\/)(\d+)/;

		// 	// Match the UID using the pattern
		// 	const match = text.match(facebookUrlPattern);
		// 	const uid = match ? match[1] : null;
		// 	console.log(uid, "uid ht");
		// }

		if (field === "uid") {
			const uidCode = text.match(/id=(\d+)/)?.[1];
			if (uidCode) {
				dispatch(updateAccount({ [field]: uidCode }));
			} else {
				chakraToast({
					title: "Error",
					description: "Invalid UID",
					status: "error",
				});
			}
		} else {
			dispatch(updateAccount({ [field]: text }));
			chakraToast({
				title: "Copied! -" + text,
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		}
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

	// console.log(facebookPackages);

	return (
		<Box>
			<SimpleGrid columns={{ base: 1, lg: 5 }} spacing={6}>
				{/* Left Section */}
				<VStack spacing={6} gridColumn={{ lg: "span 2" }}>
					{facebookPackages?.length > 0 && (
						<AccountsStats accounts={facebookPackages} />
					)}
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
						].map((field, i) => (
							<DetailCardCopy key={i} field={field} />
						))}

						{details?.email && <MailInbox email={details?.email} />}

						{account.accountFormat.includes("00fnd+2fa") && <PasteTempMail />}
						{account.accountFormat.includes("cookie") ? (
							<>
								<PasteTempMail />
								<CookieUrl />
							</>
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
										<span className='font-medium'>Paste URL</span>
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
export default FacebookCreate;
