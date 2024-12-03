import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingPage = () => {
	return (
		<div className='h-[90vh] flex items-center justify-center'>
			<BeatLoader color='#0fa0ee' size={10} />
		</div>
	);
};

export default LoadingPage;
