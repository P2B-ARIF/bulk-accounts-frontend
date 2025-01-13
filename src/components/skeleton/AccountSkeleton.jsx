import React from "react";
import ContentLoader from "react-content-loader";

const AccountSkeleton = props => {
	return (
		<div className='border border-slate-200 rounded-lg p-3'>
			<ContentLoader
				speed={2}
				width={400}
				height={140}
				viewBox='0 0 400 120'
				backgroundColor='#f3f3f3'
				foregroundColor='#ecebeb'
				{...props}
			>
				<rect x='0' y='7' rx='3' ry='3' width='93' height='6' />
				<rect x='0' y='23' rx='3' ry='3' width='52' height='6' />
				<rect x='0' y='75' rx='3' ry='3' width='200' height='6' />
				<rect x='0' y='90' rx='3' ry='3' width='150' height='6' />
				<rect x='0' y='105' rx='3' ry='3' width='150' height='6' />
				<circle cx='580' cy='222' r='20' />
				<rect x='0' y='55' rx='5' ry='5' width='73' height='7' />
				<rect x='200' rx='0' ry='0' width='27' height='23' />
			</ContentLoader>
		</div>
	);
};

export default AccountSkeleton;
