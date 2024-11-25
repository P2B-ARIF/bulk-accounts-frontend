import { FaAward, FaCheckCircle, FaHistory, FaUsers } from "react-icons/fa";

const highlights = [
	{
		icon: FaAward,
		title: "1+ Years of Excellence",
		description:
			"Providing top-notch services in social media management, online training, and account creation.",
		bgColor: "bg-yellow-100",
		iconColor: "text-yellow-500",
	},
	{
		icon: FaUsers,
		title: "100+ Happy Clients",
		description:
			"Helping individuals and businesses achieve their goals online.",
		bgColor: "bg-blue-100",
		iconColor: "text-blue-500",
	},
	{
		icon: FaHistory,
		title: "24/7 Support",
		description:
			"Our dedicated team is always ready to assist you with your queries and issues.",
		bgColor: "bg-green-100",
		iconColor: "text-green-500",
	},
	{
		icon: FaCheckCircle,
		title: "Verified Services",
		description: "Trusted by thousands for authentic and reliable solutions.",
		bgColor: "bg-purple-100",
		iconColor: "text-purple-500",
	},
];

export default function AboutUs() {
	return (
		<section id='about-us' className='relative py-20 bg-gray-50 my-20'>
			{/* Background Accents */}
			<div className='absolute -top-20 -left-20 w-80 h-80 bg-indigo-200 bg-opacity-40 rounded-full filter blur-3xl z-0'></div>
			<div className='absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200 bg-opacity-40 rounded-full filter blur-3xl z-0'></div>

			<div className='container mx-auto px-6 relative z-10'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>About Us</h2>
					<p className='text-gray-600 text-lg max-w-2xl mx-auto'>
						At **GameTopup Zone**, we specialize in delivering the best social
						media account creation, online earning training, and
						customer-focused services.
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
					{highlights.map((highlight, index) => (
						<div
							key={index}
							className='flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2'
						>
							<div
								className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${highlight.bgColor}`}
							>
								<highlight.icon className={`w-8 h-8 ${highlight.iconColor}`} />
							</div>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								{highlight.title}
							</h3>
							<p className='text-gray-600 text-sm'>{highlight.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
