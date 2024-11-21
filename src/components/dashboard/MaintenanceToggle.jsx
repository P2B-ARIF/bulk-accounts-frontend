import React from "react";

const MaintenanceToggle = () => {
	return (
		<div className='flex items-center gap-2'>
			<span className='font-bold text-green-500'>OFF</span>
			{/* <span className='font-bold text-red-500'>ON</span> */}

			<label className='relative flex cursor-pointer flex-wrap items-center gap-2 text-slate-500'>
				<input
					className='peer relative h-6 w-12 cursor-pointer appearance-none rounded-xl ring-2 ring-inset ring-slate-300 transition-colors after:absolute after:left-0 after:top-0 after:h-6 after:w-6 after:rounded-full after:bg-white after:ring-2 after:ring-inset after:ring-slate-500 after:transition-all checked:bg-emerald-200 checked:ring-emerald-500 checked:after:left-6 checked:after:bg-white checked:after:ring-emerald-500 hover:ring-slate-400 after:hover:ring-slate-600 checked:hover:bg-emerald-300 checked:hover:ring-emerald-600 checked:after:hover:ring-emerald-600 checked:focus:bg-emerald-400 checked:focus:ring-emerald-700 checked:after:focus:ring-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:after:ring-slate-300'
					type='checkbox'
					value=''
				/>
				<div className='absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center text-slate-500 opacity-100 transition-opacity peer-checked:opacity-0 peer-hover:text-slate-600 peer-focus:text-slate-700'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
						fill='currentColor'
						className='h-4 w-4'
					>
						<path d='M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z' />
					</svg>
				</div>
				<div className='absolute left-[1.625rem] top-0.5 flex h-5 w-5 items-center justify-center text-emerald-500 opacity-0 transition-opacity peer-checked:opacity-100 peer-hover:text-emerald-600 peer-focus:text-emerald-700'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
						fill='currentColor'
						className='h-4 w-4'
					>
						<path d='M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z' />
					</svg>
				</div>
			</label>
			{/*<!-- End Lg sized secondary toggle button with toggle icon -->*/}
		</div>
	);
};

export default MaintenanceToggle;
