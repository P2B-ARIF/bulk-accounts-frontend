import React, { useEffect } from "react";
import Message from "../../components/dashboard/Message";
import useCrud from "../../hook/useCrud";
import LoadingPage from "../LoadingPage";

const Messages = () => {
	const { get, response, error, loading } = useCrud();

	const fetchMessages = async () => {
		await get(`/api/messages`);
	};

	useEffect(() => {
		if (!response) {
			console.log("hello");
			fetchMessages();
		}
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<div>
			<h3 className='text-slate-800 font-semibold text-lg'>Messages</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
				{response?.data &&
					response?.data?.map((sms, i) => <Message key={i} sms={sms} />)}
			</div>
		</div>
	);
};

export default Messages;
