import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Facebook from "../pages/user/Facebook";
import History from "../pages/user/History";
import Instagram from "../pages/user/Instagram";
import Payment from "../pages/user/Payment";
import UserDashboard from "../pages/user/UserDashboard";

import NotFoundPage from "../pages/NotFoundPage";
import Payments from "../pages/Payments";
import Accounts from "../pages/dashboard/Accounts";
import AdminFacebook from "../pages/dashboard/AdminFacebook";
import AdminInstagram from "../pages/dashboard/AdminInstagram";
import AdminPayment from "../pages/dashboard/AdminPayment";
import Controller from "../pages/dashboard/Controller";
import CreatingHistory from "../pages/dashboard/CreatingHistory";
import Contact from "./../pages/Contact";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ index: true, element: <Home /> }, // Use 'index' for the default route
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{ path: "contact-us", element: <Contact /> },
			{ path: "payments", element: <Payments /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
	{
		path: "/user",
		element: (
			<ProtectedRoute>
				<UserLayout />
			</ProtectedRoute>
		),
		children: [
			{
				index: true,
				element: <UserDashboard />,
			}, // Default route for "/user"
			{ path: "facebook", element: <Facebook /> },
			{ path: "instagram", element: <Instagram /> },
			{ path: "history", element: <History /> },
			{ path: "payment", element: <Payment /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
	{
		path: "/admin",
		element: (
			<ProtectedAdminRoute>
				<AdminLayout />
			</ProtectedAdminRoute>
		),
		children: [
			{ index: true, element: <AdminDashboard /> }, // Default route for "/admin"
			{ path: "controller", element: <Controller /> },
			{ path: "accounts", element: <Accounts /> },
			{ path: "facebook", element: <AdminFacebook /> },
			{ path: "instagram", element: <AdminInstagram /> },
			{ path: "history", element: <CreatingHistory /> },
			{ path: "payment", element: <AdminPayment /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
	{ path: "*", element: <NotFoundPage /> },
]);
