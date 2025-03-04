import axios from "axios";

export const profileUrlGenerator = async profileUrl => {
	if (!profileUrl) {
		return { success: false, error: "Profile URL is required." };
	}

	const profile_url_server = import.meta.env.VITE_PROFILE_UID; // Ensure this is set in .env
	const url = `${profile_url_server}api?url=${encodeURIComponent(profileUrl)}`;

	try {
		const { data } = await axios.get(url, { timeout: 20000 }); // 10s timeout
		return data;
	} catch (err) {
		console.error("API Error:", err?.response?.data || err.message);
		return { success: false, error: err?.response?.data?.error || err.message };
	}
};
