import React, { useState } from "react";
import {
	FaCalendarAlt,
	FaFacebook,
	FaMapMarkerAlt,
	FaPhoneAlt,
} from "react-icons/fa";
import ContactForm from "../components/ContactForm";

const Contact = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	const handleFormSubmit = event => {
		event.preventDefault();
		setIsSubmitting(true);
		setMessage("Sending your message...");

		// Email sending logic will go here (e.g., using Nodemailer or EmailJS)
		setTimeout(() => {
			setIsSubmitting(false);
			setMessage("Message sent successfully!");
		}, 2000);
	};

	return (
		<div className='py-20 pt-40 container mx-auto px-3 md:px-6'>
			<div className='text-center mx-auto'>
				<h2 className='text-2xl md:text-4xl font-bold  text-blue-500'>
					Contact Us
				</h2>
				<h3 className='text-md md:text-lg mt-2 mb-3 md:mb-4 mx-auto w-full md:w-[70%]'>
					If you have any questions about this Privacy Policy or our data
					practices, please contact us at <br />
					<span className='text-primary font-semibold'>
						p2b.business.info@gmail.com
					</span>
					.
				</h3>
				<div className='flex flex-col items-center mb-8 lg:mb-0 justify-center space-y-3 mt-10 text-sm md:text-md'>
					<div className='flex items-center text-gray-700'>
						<FaMapMarkerAlt className='text-primary md:mr-2' size={18} />
						<p>Agrabad, Chattogram, Chittagong, Bangladesh</p>
					</div>
					<div className='flex items-center text-gray-700'>
						<FaCalendarAlt className='text-primary mr-2' size={18} />
						<p>Sat–Thu: 10am–11pm, Fri: 2pm–11pm</p>
					</div>
					<div className='flex items-center text-gray-700'>
						<FaPhoneAlt className='text-primary mr-2' size={18} />
						<p>+880 1953424319</p>
					</div>
					<div className='flex space-x-3 text-primary'>
						<a
							href='https://www.facebook.com/profile.php?id=61565884427270'
							target='_blank'
							rel='noopener noreferrer'
							className='text-md md:text-xl bg-blue-600 hover:bg-blue-700 text-white h-[30px] md:h-[40px] aspect-square flex items-center justify-center text-center rounded-full transition'
						>
							<FaFacebook />
						</a>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-10 lg:flex-row justify-between items-center md:p-8 md:px-5 mt-10'>
				<div className='rounded-lg overflow-hidden w-full lg:w-1/2'>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1236.3620165297934!2d91.81025800123973!3d22.327248583570547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9754658edc3%3A0x460e191e0f84b414!2sHeroic%20Freedom%20Fighter%20Lieutenant%20Sheikh%20Jamal%20Software%20Technology%20Park%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1723544897186!5m2!1sen!2sbd'
						allowFullScreen
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						className='w-full h-[250px] md:h-[350px] shadow-xl rounded-lg'
					></iframe>
				</div>

				<div className='w-full lg:w-1/2'>
					<ContactForm onSubmit={handleFormSubmit} />
					{isSubmitting && (
						<div className='text-center mt-4 text-primary font-semibold'>
							{message}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Contact;
