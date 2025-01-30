import { Td, Tr, useColorModeValue } from "@chakra-ui/react";
import { formatDistanceToNow, isToday } from "date-fns";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import SeeDisabledModel from "../model/SeeDisabledModel";

const HistoryTable = ({ item, index }) => {
	const stripedBg = useColorModeValue("gray.50", "gray.700");

	// Format date to show relative time for today
	const formatDate = dateString => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
				throw new Error("Invalid date");
			}

			// Check if the date is today
			if (isToday(date)) {
				return `${formatDistanceToNow(date, { addSuffix: true })}`;
			}

			// Format for older dates
			return new Intl.DateTimeFormat("en-US", {
				// year: "numeric",
				month: "short",
				day: "numeric",
			}).format(date);
		} catch (error) {
			console.error("Invalid date string:", dateString, error.message);
			return "Invalid Date";
		}
	};

	return (
		<Tr
			// key={index}
			bg={index % 2 === 0 ? "transparent" : stripedBg}
			className='text-sm md:text-md'
		>
			<Td color='gray.600'> {formatDate(item?.createdAt?.date ?? "N/A")}</Td>
			<Td
				fontWeight='medium'
				className={`uppercase ${
					item.accountType === "facebook"
						? "text-blue-500"
						: item.accountType === "instagram"
						? "text-pink-500"
						: "text-pink-900"
				}`}
			>
				{item.accountType === "facebook" ? (
					<FaFacebook size={20} />
				) : item.accountType === "instagram" ? (
					<FaInstagram size={20} />
				) : (
					<FaTiktok size={20} />
				)}
			</Td>
			<Td className='uppercase'>{item.accountFormat}</Td>
			<Td className='uppercase'>{item.password}</Td>
			<Td>{item.rate.toFixed(2)} BDT</Td>
			<Td>
				{item.die === true ? (
					<div className='md:flex items-center space-y-2 md:space-y-0 md:gap-3'>
						<a
							href={
								item.accountType === "facebook"
									? `https://www.facebook.com/profile.php?id=${item.uid}`
									: item.accountType === "instagram"
									? `https://www.instagram.com/${item.uid}/`
									: item.accountType === "tiktok"
									? `https://www.tiktok.com/@${item.uid}`
									: "#"
							}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 underline'
						>
							Check ID
						</a>

						<SeeDisabledModel account={item} />
					</div>
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
