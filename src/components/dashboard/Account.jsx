import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useSelector } from "react-redux";

const Account = ({ account }) => {
	const { accounts } = useSelector(state => state.accounts);

	const counts = accounts?.filter(acc => acc.userEmail === account.email);

	return (
		<div
			className={`border rounded-lg p-2 md:p-4 transition-all duration-300 ${
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
				<FaPhoneAlt /> {account?.number}
			</div>
			<div className='text-xs md:text-sm flex items-center gap-1 text-slate-700'>
				<IoMdTime /> {account?.createdAt?.date}
			</div>
		</div>
	);
};

export default Account;
