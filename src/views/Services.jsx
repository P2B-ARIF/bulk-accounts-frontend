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
		color: "text-blue-500",
		bgColor: "bg-blue-100",
	},
	{
		title: "Online Earning Training",
		description: "Master the art of online earning with step-by-step guidance.",
		icon: FaMoneyBillAlt,
		color: "text-green-500",
		bgColor: "bg-green-100",
	},
	{
		title: "Account Creation",
		description: "Simplify your digital needs with professional account setup.",
		icon: FaUserFriends,
		color: "text-purple-500",
		bgColor: "bg-purple-100",
	},
	{
		title: "Subscription Services",
		description:
			"Affordable access to Netflix, YouTube, and premium platforms.",
		icon: FaYoutube,
		color: "text-red-500",
		bgColor: "bg-red-100",
	},
];

export default function Services() {
	return (
		<section
			id='services'
			className='relative py-16 bg-gray-50 overflow-hidden'
		>
			{/* Background Shapes */}
			<div className='absolute -top-32 -left-32 w-80 h-80 bg-blue-300 bg-opacity-30 rounded-full filter blur-3xl z-0'></div>
			<div className='absolute -bottom-36 -right-36 w-96 h-96 bg-pink-300 bg-opacity-30 rounded-full filter blur-3xl z-0'></div>

			<div className='container mx-auto px-6 relative z-10'>
				<h2 className='text-4xl font-bold text-center text-gray-800 mb-12'>
					Our Services
				</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{services.map((service, index) => (
						<div
							key={index}
							className='bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2'
						>
							<div
								className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center ${service.bgColor} rounded-full`}
							>
								<service.icon className={`w-8 h-8 ${service.color}`} />
							</div>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								{service.title}
							</h3>
							<p className='text-gray-600 text-sm'>{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
