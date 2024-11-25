import {
	Box,
	Container,
	Grid,
	Heading,
	Icon,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import {
	FaFacebook,
	FaMoneyBillAlt,
	FaUserFriends,
	FaYoutube,
} from "react-icons/fa";

const services = [
	{
		title: "Social Media Management",
		description:
			"Expert SMM to grow your online presence with tailored strategies.",
		icon: FaFacebook,
		color: "blue.500",
	},
	{
		title: "Online Earning Training",
		description: "Master the art of online earning with step-by-step guidance.",
		icon: FaMoneyBillAlt,
		color: "green.500",
	},
	{
		title: "Account Creation",
		description: "Simplify your digital needs with professional account setup.",
		icon: FaUserFriends,
		color: "purple.500",
	},
	{
		title: "Subscription Services",
		description:
			"Affordable access to Netflix, YouTube, and premium platforms.",
		icon: FaYoutube,
		color: "red.500",
	},
];

export default function Services() {
	return (
		<Box
			as='section'
			id='services'
			py={{ base: 10, md: 20 }}
			mt={32}
			bg={useColorModeValue("gray.50", "gray.900")}
			position='relative'
		>
			{/* Background Shapes */}
			<Box
				position='absolute'
				top='-100px'
				left='-100px'
				h='300px'
				w='300px'
				bgGradient='radial(blue.300, transparent)'
				rounded='full'
				zIndex={-1}
			/>
			<Box
				position='absolute'
				bottom='-150px'
				right='-150px'
				h='400px'
				w='400px'
				bgGradient='radial(pink.300, transparent)'
				rounded='full'
				zIndex={-1}
			/>

			{/* Content */}
			<Container maxW='container.xl' position='relative'>
				<Heading
					as='h2'
					size='2xl'
					textAlign='center'
					fontWeight='bold'
					mb={16}
					color={useColorModeValue("gray.700", "white")}
				>
					<span> Our Services</span>
				</Heading>

				<Grid
					templateColumns={{
						base: "1fr",
						md: "repeat(2, 1fr)",
						lg: "repeat(4, 1fr)",
					}}
					gap={8}
				>
					{services.map((service, index) => (
						<Stack
							key={index}
							bg={useColorModeValue("white", "gray.800")}
							boxShadow='xl'
							rounded='lg'
							p={8}
							spacing={5}
							transition='transform 0.3s ease, box-shadow 0.3s ease'
							_hover={{
								transform: "scale(1.05)",
								boxShadow: "2xl",
							}}
						>
							<Icon
								as={service.icon}
								boxSize={14}
								color={service.color}
								bg={useColorModeValue("gray.100", "gray.700")}
								p={3}
								rounded='full'
							/>
							<Heading size='md' color={useColorModeValue("gray.800", "white")}>
								<span>{service.title}</span>
							</Heading>
							<Text
								fontSize='sm'
								color={useColorModeValue("gray.600", "gray.300")}
							>
								{service.description}
							</Text>
						</Stack>
					))}
				</Grid>
			</Container>
		</Box>
	);
}
