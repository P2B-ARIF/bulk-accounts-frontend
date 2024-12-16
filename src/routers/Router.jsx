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

import NotFoundPage from "../pages/NotFoundPage";
import Payments from "../pages/Payments";
import Services from "../pages/Services";
import Accounts from "../pages/dashboard/Accounts";
import AdminFacebook from "../pages/dashboard/AdminFacebook";
import AdminHistory from "../pages/dashboard/AdminHistory";
import AdminInstagram from "../pages/dashboard/AdminInstagram";
import AdminPayment from "../pages/dashboard/AdminPayment";
import Controller from "../pages/dashboard/Controller";
import UserHistoryTable from "../pages/dashboard/views/UserHistoryTable";
import Contact from "./../pages/Contact";
import AboutUs from "./../views/AboutUs";
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
			{ path: "services", element: <Services /> },
			{ path: "about-us", element: <AboutUs /> },
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
			// {
			// 	index: true,
			// 	element: <UserDashboard />,
			// }, // Default route for "/user"
			{ index: true, element: <Facebook /> },
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
			{ path: "user/:email", element: <UserHistoryTable /> },
			{ path: "facebook", element: <AdminFacebook /> },
			{ path: "instagram", element: <AdminInstagram /> },
			{ path: "history", element: <AdminHistory /> },
			{ path: "payment", element: <AdminPayment /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
	{ path: "*", element: <NotFoundPage /> },
]);
