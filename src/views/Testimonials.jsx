import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
	{
		name: "John Doe",
		title: "Entrepreneur",
		quote:
			"Thanks to their training, I started earning online with ease. Their support team is amazing!",
		image:
			"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?semt=ais_hybrid",
	},
	{
		name: "Jane Smith",
		title: "Digital Marketer",
		quote:
			"Their services helped me grow my social media presence dramatically. Highly recommended!",
		image:
			"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?semt=ais_hybrid",
	},
	{
		name: "Michael Lee",
		title: "Freelancer",
		quote:
			"Affordable, reliable, and always there to help. They truly understand their clients' needs.",
		image:
			"https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg",
	},
];

export default function TestimonialsSlider() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex(prev => (prev + 1) % testimonials.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			prev => (prev - 1 + testimonials.length) % testimonials.length,
		);
	};

	return (
		<section id='testimonials' className='py-20 bg-gray-50'>
			<div className='container mx-auto px-6'>
				<h2 className='text-xl md:text-2xl font-bold text-center text-gray-800 mb-12'>
					What Our Clients Say
				</h2>
				<div className='relative max-w-xl mx-auto'>
					{/* Slider Content */}
					<div className='overflow-hidden'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.5 }}
								className='bg-white shadow-lg rounded-lg p-6 text-center'
							>
								<img
									src={testimonials[currentIndex].image}
									alt={testimonials[currentIndex].name}
									className='w-24 h-24 mx-auto rounded-full mb-4'
								/>
								<h3 className='text-xl font-semibold text-gray-800'>
									{testimonials[currentIndex].name}
								</h3>
								<p className='text-sm text-gray-500 mb-4'>
									{testimonials[currentIndex].title}
								</p>
								<p className='text-gray-600 italic'>
									"{testimonials[currentIndex].quote}"
								</p>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation Arrows */}
					<div className='absolute inset-0 flex justify-between items-center px-4'>
						<button
							onClick={prevSlide}
							className='bg-gray-300 p-2 rounded-full shadow hover:bg-gray-400'
						>
							&#8592;
						</button>
						<button
							onClick={nextSlide}
							className='bg-gray-300 p-2 rounded-full shadow hover:bg-gray-400'
						>
							&#8594;
						</button>
					</div>

					{/* Pagination Dots */}
					<div className='flex justify-center mt-4 space-x-2'>
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full ${
									index === currentIndex ? "bg-blue-500" : "bg-gray-300"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
