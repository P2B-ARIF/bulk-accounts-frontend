import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../assets/images/ImageWrap";

const Navbar = () => {
	const [navShow, setNavShow] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [show, setShow] = useState("translate-y-0");
	const [blur, setBlur] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			document.body.style.overflow = navShow ? "hidden" : "auto";
			return () => {
				document.body.style.overflow = "auto";
			};
		}, 200);
	}, [navShow]);

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			setShow(
				window.scrollY > lastScrollY && !navShow
					? "-translate-y-[100px]"
					: "shadow-sm",
			);
		} else {
			setShow("translate-y-0");
		}
		setBlur(window.scrollY > 40);
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	const navLinks = [
		{ path: "/", name: "Home" },
		{ path: "/services", name: "Services" },
		{ path: "/about-us", name: "About Us" },
		{ path: "/blog", name: "Blog" },
		{ path: "/contact-us", name: "Contact Us" },
		{ path: "/payments", name: "Payments" },
	];

	return (
		<div
			className={`fixed h-[85px] md:h-[95px] z-50 top-0 left-0 right-0 transition-transform duration-300 ${show} ${
				blur && "backdrop-blur-md bg-[#ffffff76] py-6"
			} py-7`}
		>
			<nav className='container mx-auto md:flex items-center justify-between w-full relative'>
				<div className='flex items-center justify-between max-md:w-full max-md:px-5'>
					<Link to={"/"} className='flex items-center gap-1'>
						<img
							src={logo}
							alt=''
							className='w-[50px] rounded-full object-cover'
						/>
						<h2 className='text-xl font-bold'>GameTopUp Zone</h2>
					</Link>
					<div className='md:hidden'>
						{!navShow ? (
							<FiMenu
								size={30}
								onClick={() => setNavShow(true)}
								className='text-primary'
							/>
						) : (
							<IoClose
								size={30}
								onClick={() => setNavShow(false)}
								className='text-primary'
							/>
						)}
					</div>
				</div>

				<div
					className={`md:hidden relative z-[7] backdrop-blur-sm flex flex-col items-center gap-10 mt-20 transition-all duration-300 ease-linear bg-white/90 h-screen ${
						navShow ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className='text-lg font-semibold flex flex-col gap-7 items-center'>
						{navLinks?.map((link, index) => (
							<div key={index}>
								{["#services", "#about"].includes(link?.path) ? (
									<a
										href={link.path}
										onClick={() => handleNavLinkClick(link.path)}
									>
										{link.name}
									</a>
								) : (
									<Link to={link?.path} key={index}>
										{link?.name}
									</Link>
								)}
							</div>
						))}
						{/* {navLinks?.map((link, index) => (
							<div key={index}>
								{["#services", "#about"].includes(link?.path) ? (
									<a
										key={index}
										href={link?.path}
										// href={
										// 	location?.pathname === "/"
										// 		? link.path.split("/")[1]
										// 		: link?.path
										// }
									>
										{link?.name}
									</a>
								) : (
									<Link to={link?.path} key={index}>
										{link?.name}
									</Link>
								)}
							</div>
						))} */}
					</div>

					<Link
						to={"/login"}
						className='bg-primary text-white_c px-8 py-4 rounded-full text-sm'
					>
						LOGIN
					</Link>
				</div>

				<div className='text-lg font-medium hidden md:flex gap-7 items-center'>
					{/* {navLinks.map(link => (
						<li key={link?.path}>
							{["#services", "#about"].includes(link?.path) ? (
								<a href={link?.path} onClick={handleScroll}>
									{link?.name}
								</a>
							) : (
								<Link to={link?.path}>{link?.name}</Link>
							)}
						</li>
					))} */}
					{/* {navLinks.map((link, index) => (
						<div key={index}>
							<a href={link.path} onClick={() => handleNavLinkClick(link.path)}>
								{link.name}
							</a>
						</div>
					))} */}

					{navLinks?.map((link, index) => (
						<div key={index}>
							{["#services", "#about"].includes(link?.path) ? (
								<a
									href={link.path}
									onClick={() => handleNavLinkClick(link.path)}
								>
									{link.name}
								</a>
							) : (
								<Link to={link?.path} key={link?.path}>
									{link?.name}
								</Link>
							)}
						</div>
					))}
				</div>
				<div className='flex items-center gap-3'>
					{localStorage.getItem("authToken") ? (
						<Link
							to={"/user"}
							className='uppercase max-md:hidden bg-primary text-white_c px-8 py-4 rounded-full text-sm'
						>
							Dashboard
						</Link>
					) : (
						<>
							<Link
								to={"/register"}
								className='bg-black text-white_c px-7 md:px-8 py-3 md:py-4 rounded-full text-sm'
							>
								REGISTER
							</Link>

							<Link
								to={"/login"}
								className='max-md:hidden bg-primary text-white_c px-8 py-4 rounded-full text-sm'
							>
								LOGIN
							</Link>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
