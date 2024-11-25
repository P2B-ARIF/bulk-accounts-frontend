import React from "react";
import Faq from "../views/Faq";
import HeroSection from "../views/HeroSection";
import Services from "../views/Services";
import TestimonialsCarousel from "../views/Testimonials";

const Home = () => {
	// console.log(controller, "co");

	return (
		<div className='space-y-16'>
			<HeroSection />
			{/* <HowItWorks /> */}
			<Services />
			<TestimonialsCarousel />
			<Faq />
		</div>
	);
};

export default Home;
