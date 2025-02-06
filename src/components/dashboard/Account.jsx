import { formatDistanceToNow, isToday } from "date-fns";
import React from "react";
import { FaPhoneAlt, FaUserClock } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = ({ account }) => {
	const { accounts } = useSelector(state => state.accounts);

	const counts = accounts?.filter(acc => acc.userEmail === account.email);
	const navigate = useNavigate();

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
				year: "numeric",
				month: "short",
				day: "numeric",
			}).format(date);
		} catch (error) {
			console.error("Invalid date string:", dateString, error.message);
			return "Invalid Date";
		}
	};

	return (
		<div
			onClick={() => navigate(`/admin/user/${account?.email}`)}
			className={`cursor-pointer border rounded-lg p-2 md:p-4 transition-all duration-300 ${
				account?.isBlocked
					? "bg-red-400"
					: account?.gender === "male"
					? "bg-blue-100"
					: "bg-pink-100"
			} hover:shadow-lg border-gray-200`}
		>
			<h3 className='text-md md:text-lg flex justify-between font-medium text-slate-800'>
				<span>{account?.name}</span>
				<b>{counts?.length}</b>
			</h3>
			<div className='text-xs md:text-sm flex items-center gap-1 text-blue-500 mt-1'>
				{account?.email}
			</div>

			<hr className='my-1 border-gray-300' />
			<div className='text-xs md:text-sm flex items-center gap-1 text-slate-700'>
				<RiLockPasswordFill /> {account?.nickname}
			</div>
			<div className='text-xs md:text-sm flex items-center gap-1 text-slate-700'>
				<FaPhoneAlt />{" "}
				{account?.number.toString().length === 10
					? "0" + account?.number
					: account?.number}
			</div>
			<div className='text-xs md:text-sm flex items-center gap-1 text-slate-700'>
				{/* <IoMdTime /> {account?.createdAt?.date} */}
				<IoMdTime /> Registered- {formatDate(account?.createdAt?.date ?? "N/A")}
				{/* {format(account?.createdAt?.date, "dd-MM-yyyy")} */}
			</div>
			<div className='text-xs md:text-sm flex items-center gap-1 text-slate-700'>
				<FaUserClock /> Last Login- {formatDate(account?.lastLogin ?? "N/A")}
				{/* <FaUserClock /> Last Login- {format(account?.lastLogin, "dd-MM-yyyy")} */}
			</div>
		</div>
	);
};

export default Account;
