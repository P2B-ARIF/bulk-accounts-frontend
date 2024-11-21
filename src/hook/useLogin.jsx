import { useState } from "react";
import axios from "axios";

const useLogin = endpoint => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	const serverUrl = import.meta.env.VITE_SERVER_LINK;

	const login = async data => {
		setLoading(true);
		setError(null);

		try {
			const res = await axios.post(`${serverUrl}${endpoint}`, data);
			setResponse(res.data);
		} catch (err) {
			setError(
				err.response?.data?.message || "An error occurred during registration.",
			);
		} finally {
			setLoading(false);
		}
	};

	return { login, loading, error, response };
};

export default useLogin;
