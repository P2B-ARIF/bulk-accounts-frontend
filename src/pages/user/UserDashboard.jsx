import React from "react";

const UserDashboard = () => {
	// const { get, loading, error, response } = useCrud();

	// const handleSubmit = async () => {
	// 	await get("/api/accounts/everything");
	// };

	// useEffect(() => {
	// 	if (response) {
	// 		console.log(response);

	// 		// toast.success(response.message);
	// 		// window.location.reload();
	// 	}
	// 	if (error) {
	// 		console.log(error);

	// 		toast.error(error);
	// 	}
	// }, [response, error]);

	// useEffect(() => {
	// 	handleSubmit();
	// }, []);

	// // everything

	return (
		<section className='space-y-5 md:m-3 lg:m-4 xl:m-5'>
			<h1 className='text-lg font-bold'>Dashboard</h1>
			{/* <UserStats /> */}
			{/* <MonthlyAnalysis /> */}
		</section>
	);
};

export default UserDashboard;
