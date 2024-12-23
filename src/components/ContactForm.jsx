import { useState } from "react";

const ContactForm = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setIsSubmitting(true);

		// Call the onSubmit handler passed as a prop
		onSubmit(formData);

		// Reset form
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white md:shadow-lg rounded-lg p-2 md:p-6 space-y-4 w-full'
		>
			<div>
				<label
					htmlFor='name'
					className='text-gray-700 font-semibold block mb-2'
				>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					value={formData.name}
					onChange={handleChange}
					className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
					required
				/>
			</div>

			<div>
				<label
					htmlFor='email'
					className='text-gray-700 font-semibold block mb-2'
				>
					Email
				</label>
				<input
					type='email'
					name='email'
					id='email'
					value={formData.email}
					onChange={handleChange}
					className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
					required
				/>
			</div>

			<div>
				<label
					htmlFor='message'
					className='text-gray-700 font-semibold block mb-2'
				>
					Message
				</label>
				<textarea
					name='message'
					id='message'
					value={formData.message}
					onChange={handleChange}
					className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
					rows='4'
					required
				/>
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300'
			>
				{isSubmitting ? "Sending..." : "Send Message"}
			</button>
		</form>
	);
};

export default ContactForm;
