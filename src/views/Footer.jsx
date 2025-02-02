import {
	Box,
	Container,
	HStack,
	Icon,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
	const navigation = ["About", "Features", "Works", "Support", "Help"];
	const socialLinks = [
		{ icon: FaTwitter, label: "Twitter", href: "#" },
		{
			icon: FaFacebook,
			label: "Facebook",
			href: "https://www.facebook.com/profile.php?id=61565884427270",
		},
		{ icon: FaInstagram, label: "Instagram", href: "#" },
		{ icon: FaGithub, label: "GitHub", href: "#" },
	];

	return (
		<footer className='bg-slate-200'>
			<Box as='footer' py={10}>
				<Container maxW='6xl'>
					<Stack spacing={{ base: 5, md: 8 }} align='center'>
						{/* Logo */}
						<Link
							href='#'
							fontSize={{ base: "md", md: "xl" }}
							fontWeight='bold'
							letterSpacing='wider'
							color='gray.800'
						>
							/GAMETOPUP ZONE
						</Link>

						{/* Navigation */}
						<HStack spacing={{ base: 4, md: 8 }} color='gray.600'>
							{navigation.map(item => (
								<Link
									key={item}
									href='#'
									fontSize='sm'
									_hover={{ color: "gray.800" }}
									transition='color 0.2s ease'
								>
									{item}
								</Link>
							))}
						</HStack>

						{/* Social Links */}
						<HStack spacing={{ base: 4, md: 6 }}>
							{socialLinks.map(social => (
								<Link
									key={social.label}
									href={social.href}
									aria-label={social.label}
									color='gray.600'
									_hover={{ color: "gray.800" }}
									transition='color 0.2s ease'
								>
									<Icon as={social.icon} boxSize={5} />
								</Link>
							))}
						</HStack>

						{/* Copyright */}
						<Text fontSize='sm' color='gray.600'>
							© Copyright {new Date().getFullYear()}. All Rights Reserved
						</Text>
					</Stack>
				</Container>
			</Box>
		</footer>
	);
}
