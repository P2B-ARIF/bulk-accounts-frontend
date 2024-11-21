import React from "react";

const Stat = ({ stat }) => {
	// console.log(stat);

	return (
		<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-5'>
			<div className='flex flex-col gap-1'>
				{/* <span className='text-2xl font-bold tracking-tight'>{value}</span>
				<span className='text-sm text-muted-foreground'>{label}</span>
				<div className='flex items-center gap-1 text-sm text-emerald-600'>
					<IoIosArrowUp className='h-4 w-4' />
					<span>
						{change.value} {change.label}
					</span>
				</div> */}
			</div>
		</div>
	);
};

export default Stat;
