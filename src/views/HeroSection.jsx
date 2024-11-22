import React from "react";

const HeroSection = () => {
	return (
		<section className='bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24 mt-20'>
			<div className='container px-4 mx-auto'>
				<div className='grid items-center grid-cols-1 gap-12 lg:grid-cols-2'>
					{/* Hero Content */}
					<div>
						<p className='text-base font-semibold tracking-wider text-blue-600 uppercase'>
							A social media for learners
						</p>
						<h1 className='mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl'>
							Connect & learn from the experts
						</h1>
						<p className='mt-4 text-base text-black lg:mt-8 sm:text-xl'>
							Grow your career fast with the right mentor.
						</p>

						{/* Call to Action Button */}
						<a
							href='#'
							title='Join for free'
							className='inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400'
							role='button'
						>
							Join for free
							<svg
								className='w-6 h-6 ml-8 -mr-2'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='1.5'
									d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</a>

						<p className='mt-5 text-gray-600'>
							Already joined us?{" "}
							<a
								href='#'
								title='Log in'
								className='text-black transition-all duration-200 hover:underline'
							>
								Log in
							</a>
						</p>
					</div>

					{/* Hero Image */}
					<div>
						<img
							className='w-full'
							src='https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png'
							alt='Hero'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
