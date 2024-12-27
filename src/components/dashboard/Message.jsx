import { Button } from "@chakra-ui/react";
import { formatDistanceToNow, isToday } from "date-fns";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import useCrud from "../../hook/useCrud";

const Message = ({ sms }) => {
	const { del, response, error, loading } = useCrud();

	const formatDate = dateString => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
				throw new Error("Invalid date");
			}

			if (isToday(date)) {
				return `${formatDistanceToNow(date, { addSuffix: true })}`;
			}

			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}).format(date);
		} catch (error) {
			console.error("Invalid date string:", dateString, error.message);
			return "Invalid Date";
		}
	};

	const handleDelete = async id => {
		console.log(id, "id");
		if (!window.confirm("Are you sure?")) await del(`/api/messages/${id}`);
	};

	useEffect(() => {
		console.log(response, "response");
		if (response?.message) {
			toast.success(response.message);
			window.location.reload();
		}
	}, [response]);

	return (
		<div className='bg-white rounded-lg shadow-md p-5'>
			<h4 className='text-slate-600'>Seen By {sms?.seenBy?.length}</h4>
			<p className='text-slate-900'>{sms?.text}</p>
			<span className='text-sm text-slate-700'>
				{formatDate(sms?.createdAt ?? "N/A")}
			</span>
			<br />
			<div className='flex justify-end'>
				<Button
					onClick={() => handleDelete(sms._id)}
					size={"xs"}
					colorScheme='red'
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default Message;
