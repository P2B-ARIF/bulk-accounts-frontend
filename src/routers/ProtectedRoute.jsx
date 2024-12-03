import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const ProtectedRoute = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			const authToken = localStorage.getItem("authToken");
			setIsAuthenticated(!!authToken);
			setIsLoading(false);
		}, 300);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return children;
};

export default ProtectedRoute;
