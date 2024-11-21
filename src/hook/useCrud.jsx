import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCrud = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	const navigate = useNavigate();
	const serverUrl = import.meta.env.VITE_SERVER_LINK;

	const fetchData = async (method, endpoint, data = null) => {
		setLoading(true);
		setError(null); // Clear previous errors
		setResponse(null); // Clear previous responses

		try {
			const res = await axios({
				method,
				url: `${serverUrl}${endpoint}`,
				data,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				},
			});

			setResponse(res.data); // Store response data
		} catch (err) {
			if (
				err.response?.status === 401 &&
				err.response?.data?.message === "Session expired. Please log in again."
			) {
				localStorage.removeItem("authToken");
				navigate("/login");
			} else {
				setError(err.response?.data?.message || "An error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	const get = endpoint => fetchData("get", endpoint);
	const post = (endpoint, data) => fetchData("post", endpoint, data);
	const put = (endpoint, data) => fetchData("put", endpoint, data);
	const del = endpoint => fetchData("delete", endpoint);

	return { get, post, put, del, loading, error, response };
};

export default useCrud;
