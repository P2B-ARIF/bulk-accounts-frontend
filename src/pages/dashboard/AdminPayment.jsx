import React, { useEffect, useState } from "react";
import ApprovedAccounts from "../../components/dashboard/ApprovedAccounts";
import useCrud from "./../../hook/useCrud";
import AdminPaymentHistoryTable from "./views/AdminPaymentHistoryTable";

const AdminPayment = () => {
	const { get, loading, error, response } = useCrud();
	const [payments, setPayments] = useState(null);

	const fetching = async () => {
		await get("/api/withdraw");
	};

	useEffect(() => {
		// /api/withdraw
		if (!response) {
			fetching();
		}

		if (response) {
			setPayments(response.result);
		}

		if (error) {
			console.log(error);
		}
	}, [response, error]);

	const pending = payments?.filter(p => p.payment !== "success");

	return (
		<section>
			<h1 className='text-lg font-bold md:pl-5'>Admin Payment</h1>

			<div className='md:m-5 mt-5 p-3 md:p-5 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg'>
				<h4 className='text-lg font-semibold mb-3'>Pending Payments</h4>
				<div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
					<div className='rounded-lg bg-card text-card-foreground shadow-md p-5 transition-all duration-300 hover:shadow-lg'>
						<div className='flex flex-col gap-2'>
							<h3 className='uppercase text-xl font-bold'>
								Amount{" "}
								{pending
									?.reduce((prev, next) => prev + next.amount, 0)
									.toFixed(2)}
							</h3>
							<div className='flex flex-col gap-1'>
								<span>Total Order: {pending?.length || 0}</span>
								<span>
									Accounts:{" "}
									{pending?.reduce(
										(prev, next) => prev + next.totalAccounts,
										0,
									)}
								</span>
							</div>
						</div>
					</div>
					<ApprovedAccounts />

					{/* {orders?.map((order, i) => {
						return (
							<div
								key={i}
								className='rounded-lg bg-card text-card-foreground shadow-md p-5 transition-all duration-300 hover:shadow-lg'
							>
								<div className='flex flex-col gap-2'>
									<h3 className='uppercase text-xl font-bold'>
										{order.accountType}
									</h3>
									<div className='flex flex-col gap-1'>
										<span>Total Order: {order.count}</span>
										<span>Amount: {order.amount}</span>
									</div>
								</div>
							</div>
						);
					})} */}
				</div>
			</div>

			{payments && <AdminPaymentHistoryTable payments={payments} />}
		</section>
	);
};

export default AdminPayment;
