import { format } from "date-fns";
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

	return (
		<div
			onClick={() => navigate(`/admin/user/${account?.email}`)}
			className={`cursor-pointer border rounded-lg p-2 md:p-4 transition-all duration-300 ${
				account?.gender === "male" ? "bg-blue-100" : "bg-pink-100"
			} hover:shadow-lg border-gray-200`}
		>
			<h3 className='text-md md:text-lg flex justify-between font-medium text-slate-800'>
				<span>{account?.name}</span>
				<b>{counts?.length}</b>
			</h3>
			<div className='text-xs md:text-sm flex items-center gap-1 text-blue-500 mt-2'>
				{account?.email}
			</div>

			<hr className='my-2 border-gray-300' />
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
				<IoMdTime /> Registered-{" "}
				{format(account?.createdAt?.date, "dd-MM-yyyy")}
			</div>
			<div className='text-xs md:text-sm flex items-center gap-1 text-slate-700'>
				<FaUserClock /> Last Login- {format(account?.lastLogin, "dd-MM-yyyy")}
			</div>
		</div>
	);
};

export default Account;
