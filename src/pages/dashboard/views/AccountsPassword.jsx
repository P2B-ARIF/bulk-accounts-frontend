import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCrud from "../../../hook/useCrud";

const AccountsPassword = ({ getResponse, func }) => {
	const [password, setPassword] = useState("");

	const { put, response, error, loading } = useCrud();

	const handleUpdatePassword = async () => {
		await put("/api/maintenance/change-password", {
			password: password || getResponse.password,
		});
	};

	useEffect(() => {
		if (response) {
			func();
			toast.success("successfully updated password!");
		}
		if (error) {
			toast.error(error.message);
		}
	}, [response, error]);

	return (
		<div className='lg:ml-5 lg:mr-2.5 p-3 md:p-5 space-y-3 border rounded-md shadow-md'>
			<h3 className='font-medium'>Accounts Password</h3>

			<Input
				type='text'
				placeholder='Enter password'
				value={password || getResponse.password}
				onChange={e => setPassword(e.target.value)}
				isDisabled={loading}
				mb='4'
			/>
			<Button
				colorScheme='blue'
				onClick={handleUpdatePassword}
				isDisabled={loading}
				width='full'
				isLoading={loading}
			>
				Set Password
			</Button>
		</div>
	);
};

export default AccountsPassword;
