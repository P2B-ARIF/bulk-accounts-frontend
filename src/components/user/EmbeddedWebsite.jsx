import React from "react";
import Iframe from "react-iframe";

const EmbeddedWebsite = ({ href }) => {
	return (
		<div
			style={{
				width: "100%",
				height: "350px",
				border: "1px solid #ccc",
				borderRadius: "5px",
			}}
		>
			<Iframe
				url={href}
				width='100%'
				height='100%'
				id='myId'
				className='myClassname'
				display='initial'
				position='relative'
				allowFullScreen
			/>
		</div>
	);
};

export default EmbeddedWebsite;
