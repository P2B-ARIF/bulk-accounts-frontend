import React from "react";
import HeroSection from "../views/HeroSection";
import HowItWorks from "../views/HowItWorks";
import Services from "../views/Services";
import TestimonialsCarousel from "../views/Testimonials";
import Faq from "../views/Faq";

const Home = () => {
	// console.log(controller, "co");

	return (
		<div className='space-y-16'>
			<HeroSection />
			<HowItWorks />
			<Services />
			<TestimonialsCarousel />
			<Faq />
		</div>
	);
};

export default Home;
