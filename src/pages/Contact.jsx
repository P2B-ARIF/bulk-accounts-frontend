import React from "react";
import {
	FaCalendarAlt,
	FaFacebook,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaYoutube,
} from "react-icons/fa";
import ContactForm from "../components/ContactForm";

const Contact = () => {
	return (
		<div className='py-20 pt-40 container mx-auto'>
			<div className='text-center mx-auto'>
				<h2 className='text-3xl md:text-4xl font-secondary text-primary'>
					Contact Us
				</h2>
				<h3 className='text-lg mt-2 mb-3 md:mb-4 mx-auto w-full md:w-[70%]'>
				If you have any questions about this Privacy Policy or our data practices, please contact us at a2z.digitalimpact@gmail.com. We are committed to addressing any concerns you may have and to protecting your privacy.
				</h3>
				{/* <h3 className='text-2xl md:text-3xl mt-2 mb-3 md:mb-4'>
					Better yet, see us in person!
				</h3> */}

				<div className='flex flex-col items-center mb-8 lg:mb-0 justify-center space-y-3 mt-10'>
					<div className='flex items-center text-gray-700'>
						<FaMapMarkerAlt className='text-primary mr-2' size={20} />
						<p>
							Sheikh Jamal Software Technology Park (9th Floor), Agrabad,
							Chattogram., Chittagong, Bangladesh
						</p>
					</div>
					<div className='flex items-center text-gray-700'>
						<FaCalendarAlt className='text-primary mr-2' size={20} />
						<p>Mon–Sat: 9am–8pm, Sun: 11am–5pm</p>
					</div>
					<div className='flex items-center text-gray-700'>
						<FaPhoneAlt className='text-primary mr-2' size={20} />
						<p>+880 1814-224400</p>
					</div>
					<div className='flex space-x-1 text-primary'>
					<a
						href='https://www.facebook.com/a2zdigitalimpact/'
						target='_blank'
												className='text-xl text-gray_c hover:text-primary flex items-center justify-center w-8 h-8 p-1.5 hover:border border-primary rounded-full'

					>
						<FaFacebook />
					</a>
					{/* <FaPinterest /> */}
					{/* <FaLinkedin /> */}
					<a
						href='https://www.instagram.com/a2zdigitalimpact/'
						target='_blank'
												className='text-xl text-gray_c hover:text-primary flex items-center justify-center w-8 h-8 p-1.5 hover:border border-primary rounded-full'

					>
						<FaInstagram />
					</a>



						{/* <FaFacebook
							className='text-gray_c hover:text-primary flex items-center justify-center w-8 h-8 p-1.5 hover:border border-primary rounded-full'
							size={24}
						/>
						<FaInstagram
							className='text-gray_c hover:text-primary flex items-center justify-center w-8 h-8 p-1.5 hover:border border-primary rounded-full'
							size={24}
						/> */}
						{/* <FaYoutube
							className='text-gray_c hover:text-primary flex items-center justify-center w-8 h-8 p-1.5 hover:border border-primary rounded-full'
							size={24}
						/> */}
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-10 lg:flex-row justify-between items-center p-8 px-5 mt-10'>
				<div className='rounded-lg overflow-hidden w-full lg:w-1/2'>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1236.3620165297934!2d91.81025800123973!3d22.327248583570547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9754658edc3%3A0x460e191e0f84b414!2sHeroic%20Freedom%20Fighter%20Lieutenant%20Sheikh%20Jamal%20Software%20Technology%20Park%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1723544897186!5m2!1sen!2sbd'
						allowFullScreen=''
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						className='w-full h-[300px] md:h-[350px]'
					></iframe>
				</div>

				<div className='w-full lg:w-1/2'>
					<ContactForm />
				</div>
			</div>
		</div>
	);
};

export default Contact;
