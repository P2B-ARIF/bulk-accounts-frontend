import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { bg1, icon1, img4, img5, shape6 } from "../assets/images/ImageWrap";

const AboutUs = ({ about }) => {
	const { images, mission, points, title, whoweare } = about || {};
	const baseURL = import.meta.env.VITE_SERVER_URL;

	return (
		<div
			id='about'
			className='mt-20 py-20 pb-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-md:px-5'
		>
			<div className='grid grid-cols-2 gap-5'>
				<div className='relative self-end'>
					<img
						src={shape6}
						alt=''
						className='h-[110px] md:h-[140px] relative left-0 z-[2] mb-5 -rotate-[122deg] ml-auto pl-5'
					/>

					<div className='absolute top-5 left-0 z-[-1] w-[358px] h-[200px] md:h-[280px]'>
						<div className='relative w-full h-full'>
							<div
								className='absolute inset-0 bg-cover bg-center opacity-30'
								style={{ backgroundImage: `url(${bg1})` }}
							></div>
							<div className='absolute inset-0 bg-gradient-to-l from-[#fff0] to-[#fff]'></div>
						</div>
					</div>

					<img
						src={`${baseURL}/${images?.[0]}`}
						alt=''
						className='h-[300px] md:h-[393px] object-cover rounded-xl'
					/>
				</div>
				<div className='relative self-end'>
					<img
						src={`${baseURL}/${images?.[1]}`}
						alt=''
						className='h-[350px] md:h-[466px] object-cover rounded-xl'
					/>
					<div className='flex items-center gap-3 md:gap-6 w-full bg-primary rounded-xl py-3 md:py-4 px-4 md:px-10 -translate-y-2'>
						<img src={icon1} alt='' className='w-[48px] aspect-square' />
						<div>
							<h1 className='text-xl md:text-2xl font-medium text-white_c'>
								6 Years +
							</h1>
							<h6 className='whitespace-nowrap font-medium text-white_c'>
								Of Experience
							</h6>
						</div>
					</div>
				</div>
			</div>

			<div className='max-md:w-[90%]'>
				<h1 className='text-4xl md:text-5xl font-bold leading-[40px] md:leading-[62px] max-md:mt-10'>
					{title?.split(" ").map((t, i) =>
						t.toLowerCase() === "digital" ? (
							<span key={i} className='text-primary'>
								{t}{" "}
							</span>
						) : (
							<span key={i}>{t} </span>
						),
					)}

					{/* Creating Value Through <span className='text-primary'>Digital</span>{" "}
					Solutions */}
				</h1>
				<h4 className='mt-8 text-lg md:text-xl font-bold text-gray'>
					Who We Are:
				</h4>
				<div className='text-gray text-base md:text-lg'>
					{whoweare?.includes("n/")
						? whoweare?.split("n/").map((line, i) => (
								<p key={i} className='mb-3'>
									{line}
								</p>
						  ))
						: whoweare}
				</div>
				<h4 className='mt-4 text-lg md:text-xl font-bold text-gray'>
					Our Mission:
				</h4>
				<p className='text-gray text-base md:text-lg'>{mission}</p>

				{points?.map((point, i) => (
					<h5
						key={i}
						className='flex items-center gap-2 md:gap-3 text-lg md:text-xl text-gray my-3 font-medium'
					>
						<FaCircleCheck className='text-primary' />
						{point}
					</h5>
				))}

				{/* <h5 className='flex items-center gap-2 md:gap-3 mt-6 text-lg md:text-xl text-gray my-3 font-medium'>
					<FaCircleCheck className='text-primary' />
					Where Design Meets Technology:
				</h5>
				<h5 className='flex items-center gap-2 md:gap-3 text-lg md:text-xl text-gray my-3 font-medium'>
					<FaCircleCheck className='text-primary' />
					Beyond Aesthetics, Towards Impact:
				</h5>
				<h5 className='flex items-center gap-2 md:gap-3 text-lg md:text-xl text-gray my-3 font-medium'>
					<FaCircleCheck className='text-primary' />A Story Untold in Every
					Pixel:
				</h5> */}

				<button className='bg-black text-white_c px-8 py-4 rounded-full mt-6'>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default AboutUs;
