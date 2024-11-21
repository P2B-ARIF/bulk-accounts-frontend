import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchCheckUser } from "../toolkit/features/userSlice";

const ProtectedAdminRoute = ({ children }) => {
	const { user, loading, error } = useSelector(state => state.user);

	const location = useLocation();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (!user) {
			dispatch(fetchCheckUser("/api/auth"));
		}

		const timer = setTimeout(() => {
			const authToken = localStorage.getItem("authToken");
			setIsAuthenticated(!!authToken);
			setIsLoading(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [dispatch, user]);

	if (isLoading || loading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	if (user?.role !== "admin") {
		return <Navigate to='/user' replace />;
	}

	return children;
};

export default ProtectedAdminRoute;
