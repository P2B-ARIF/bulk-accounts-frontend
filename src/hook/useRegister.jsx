import axios from "axios";
import { useState } from "react";

const useRegister = endpoint => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	const serverUrl = import.meta.env.VITE_SERVER_LINK;

	const register = async data => {
		setLoading(true);
		setError(null); // Clear any previous errors
		setResponse(null); // Clear previous response

		// const countryCode = data?.number?.startsWith("880");

		try {
			// if (!countryCode) {
			// 	return setError("Please enter a valid Bangladeshi number.");
			// }
			const res = await axios.post(`${serverUrl}${endpoint}`, data);

			setResponse(res.data); // Store response data
		} catch (err) {
			setError(
				err.response?.data?.message || "An error occurred during registration.",
			);
		} finally {
			setLoading(false); // Ensure loading stops
		}
	};

	return { register, loading, error, response };
};

export default useRegister;
