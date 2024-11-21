import { Icon, Text } from "@chakra-ui/react";
import React from "react";

const StatCard = ({ stat }) => {
	return (
		<div className='rounded-lg border bg-card text-card-foreground shadow-sm p-5'>
			<div className='flex items-center justify-between'>
				<div>
					<h3 className='text-xl font-medium mb-1'>{stat?.title}</h3>
					<Text className='text-2xl font-semibold'>{stat?.count}</Text>
				</div>
				<div className='text-gray-600' color='gray.600'>
					<Icon as={stat?.icon} boxSize={8} />
				</div>
			</div>
		</div>
	);
};

export default StatCard;
