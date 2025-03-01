import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import { DollarSign, Globe, Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import bg from "./../assets/images/bghero.png";

export default function Hero() {
	return (
		<Box
			as='section'
			position='relative'
			minH='90vh'
			bg='white' // Set the main background to white
			overflow='hidden'
		>
			{/* Hero Section with Gradient Overlay */}
			<Box
				as='section'
				position='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				bgGradient='radial(blue.600, purple.700, black)'
				color='white'
				opacity={0.6} // Reduced opacity for gradient effect
				zIndex={-1}
			></Box>

			{/* Background Shapes */}
			<Box
				position='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				opacity={0.3}
				zIndex={-2}
			>
				<svg
					viewBox='0 0 1440 320'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='absolute top-0'
				>
					<path
						fill='#FFFFFF'
						fillOpacity='0.1'
						d='M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,181.3C672,171,768,181,864,208C960,235,1056,277,1152,288C1248,299,1344,277,1392,266.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
					/>
				</svg>
			</Box>

			{/* Hero Content */}
			<Container
				maxW='container.xl'
				position='relative'
				zIndex={2}
				h='100%'
				className='mt-52'
			>
				<Flex
					alignItems='center'
					justifyContent='space-between'
					flexDirection={{ base: "column", md: "row" }}
					h='full'
				>
					{localStorage.getItem("authToken") && (
						<Link
							to='/user'
							className='bg-primary md:hidden text-white_c px-8 py-4 rounded-full text-sm'
						>
							Dashboard
						</Link>
					)}
					{/* Text Section */}
					<Stack
						spacing={6}
						textAlign={{ base: "center", md: "left" }}
						maxW='2xl'
					>
						<Heading
							as='h1'
							fontSize={{ base: "4xl", md: "6xl" }}
							fontWeight='extrabold'
							lineHeight='short'
						>
							<span>Empower Your Online Journey</span>{" "}
							<Rocket className='inline-block text-yellow-400' />
						</Heading>
						<Text
							fontSize={{ base: "lg", md: "xl" }}
							// lineHeight='tall'
							color='gray.800'
						>
							Your one-stop solution for social media growth, online earning,
							and personalized account management. We specialize in services
							like:
						</Text>
						<Stack spacing={4}>
							<Text
								as='span'
								display='flex'
								className='max-sm:flex-col'
								alignItems='center'
							>
								<Globe className='mr-2 text-blue-400' />
								<b>Social Media Strategy</b>: Tailored solutions to grow your
								brand on Facebook, Instagram, and beyond.
							</Text>
							<Text
								as='span'
								display='flex'
								className='max-sm:flex-col'
								alignItems='center'
							>
								<DollarSign className='mr-2 text-green-400' />
								<b>Online Earning Training</b>: Learn to monetize your skills
								with our step-by-step guidance.
							</Text>
							<Text
								as='span'
								display='flex'
								className='max-sm:flex-col'
								alignItems='center'
							>
								<Users className='mr-2 text-purple-400' />
								<b>Custom Account Creation</b>: Hassle-free Facebook, Gmail, and
								premium account setup.
							</Text>
						</Stack>
						<Flex
							gap={4}
							justifyContent={{ base: "center", md: "start" }}
							pt={4}
						>
							<Link to='/services'>
								<Button
									size='md'
									colorScheme='blue'
									variant='solid'
									_hover={{ transform: "scale(1.05)" }}
								>
									Explore Our Services
								</Button>
							</Link>

							<Link to='/contact-us'>
								<Button
									size='md'
									colorScheme='blue'
									variant='outline'
									_hover={{
										transform: "scale(1.05)",
										bg: "blue.500",
										textColor: "white",
									}}
								>
									Contact Us
								</Button>
							</Link>
						</Flex>
					</Stack>

					{/* Image Section */}
					<Box mt={{ base: 12, md: 0 }} maxW='md'>
						<Image
							// src='https://source.unsplash.com/800x800/?business,teamwork'
							src={bg}
							alt='Hero Image'
							className='w-full h-full '
							// borderRadius='lg'
							// boxShadow='2xl'
							// transform='scale(1.1)'
							// _hover={{ transform: "scale(1.15)" }}
							// transition='transform 0.3s ease'
						/>
					</Box>
				</Flex>
			</Container>
		</Box>
	);
}
