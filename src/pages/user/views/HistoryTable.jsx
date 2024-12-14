import { Td, Tr, useColorModeValue } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import SeeDisabledModel from "../model/SeeDisabledModel";

const HistoryTable = ({ item, index }) => {
	const stripedBg = useColorModeValue("gray.50", "gray.700");

	return (
		<Tr
			// key={index}
			bg={index % 2 === 0 ? "transparent" : stripedBg}
			className='text-sm md:text-md'
		>
			<Td color='gray.600'>{format(item.createdAt.date, "dd-MM")}</Td>
			<Td
				fontWeight='medium'
				className={`uppercase ${
					item.accountType === "facebook" ? "text-blue-500" : "text-pink-500"
				}`}
			>
				{item.accountType}
			</Td>
			<Td className='uppercase'>{item.accountFormat}</Td>
			<Td>{item.rate} BDT</Td>
			<Td>
				{item.die === true ? (
					<SeeDisabledModel account={item} />
				) : // <span
				//  className='text-white px-2 py-1 rounded-xl text-sm bg-red-400'>
				// 	Disabled
				// </span>
				item.resolved === true ? (
					<span className='text-white px-2 py-1 rounded-xl text-sm bg-blue-400'>
						Back
					</span>
				) : item.approved === true ? (
					<span className='text-white px-2 py-1 rounded-xl text-sm bg-green-400'>
						Approved!
					</span>
				) : item.downloaded === true ? (
					<span className='text-white px-2 py-1 rounded-xl text-sm bg-purple-400'>
						Processing!
					</span>
				) : item.resolved === false ? (
					<span className='text-white px-2 py-1 rounded-xl text-sm bg-orange-500'>
						Updated!
					</span>
				) : (
					<span className='text-white px-2 py-1 rounded-xl text-sm bg-yellow-500'>
						Progress!
					</span>
				)}
			</Td>

			{/* <Td>
    </Td> */}
		</Tr>
	);
};

export default HistoryTable;
