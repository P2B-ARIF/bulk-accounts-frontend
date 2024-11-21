"use client";

import React from "react";
import {
	Box,
	Flex,
	Text,
	Avatar,
	Icon,
	Container,
	useColorModeValue,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
	{
		name: "Sarah Johnson",
		position: "CEO, TechCorp",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
		text: "This product has transformed our business operations. It's intuitive, powerful, and the customer support is outstanding.",
	},
	{
		name: "Michael Chen",
		position: "CTO, InnovateTech",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
		text: "I've never seen a tool so comprehensive yet easy to use. It's become an integral part of our daily workflow.",
	},
	{
		name: "Emily Rodriguez",
		position: "Marketing Director, GrowthCo",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
		text: "he analytics capabilities are unparalleled. We've gained insights that have directly contributed to our growth.",
	},
];

export default function TestimonialsCarousel() {
	const bgColor = useColorModeValue("gray.100", "gray.700");
	const textColor = useColorModeValue("gray.600", "gray.200");
	const quoteColor = useColorModeValue("blue.500", "blue.300");

	return (
		<Box bg={bgColor} py={16}>
			<Container maxW='6xl'>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 5000 }}
					loop={true}
				>
					{testimonials.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<Flex
								direction='column'
								alignItems='center'
								textAlign='center'
								px={4}
							>
								<Avatar
									src={testimonial.avatar}
									size='xl'
									mb={6}
									border='4px solid'
									borderColor={quoteColor}
								/>
								<Icon as={FaQuoteLeft} w={8} h={8} color={quoteColor} mb={4} />
								<Text
									fontSize='xl'
									fontWeight='medium'
									mb={4}
									color={textColor}
								>
									{testimonial.text}
								</Text>
								<Text fontWeight='bold' fontSize='lg'>
									{testimonial.name}
								</Text>
								<Text color={textColor}>{testimonial.position}</Text>
							</Flex>
						</SwiperSlide>
					))}
				</Swiper>
			</Container>
		</Box>
	);
}
