import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../assets/images/ImageWrap";

const Navbar = () => {
	const [navShow, setNavShow] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [show, setShow] = useState("translate-y-0");
	const [blur, setBlur] = useState(false);

	const navLinks = [
		{ path: "/", name: "Home" },
		{ path: "/services", name: "Services" },
		{ path: "/about-us", name: "About Us" },
		// { path: "/blog", name: "Blog" },
		{ path: "/contact-us", name: "Contact Us" },
		{ path: "/payments", name: "Payments" },
	];

	// Handle scroll behavior for navbar
	useEffect(() => {
		const handleScroll = () => {
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

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, navShow]);

	// Toggle body overflow on mobile menu open/close
	useEffect(() => {
		document.body.style.overflow = navShow ? "hidden" : "auto";
		return () => (document.body.style.overflow = "auto");
	}, [navShow]);

	const { pathname } = useLocation();
	// console.log(pathname, "params");

	const renderNavLinks = isMobile =>
		navLinks.map((link, index) => (
			<Link
				to={link.path}
				key={index}
				className={`${
					pathname === link.path && "text-primary"
				} hover:text-primary whitespace-nowrap ${
					isMobile ? "text-center block text-xl" : "inline-block"
				}`}
				onClick={() => isMobile && setNavShow(false)}
			>
				{link.name}
			</Link>
		));

	return (
		<div
			className={`fixed h-[75px] md:h-[95px] z-40 top-0 left-0 right-0 transition-transform duration-300 ${show} ${
				blur ? "backdrop-blur-md bg-[#ffffff76] py-5" : "py-7"
			}`}
		>
			<nav className='container mx-auto md:flex items-center justify-between w-full relative'>
				{/* Logo Section */}
				<div className='flex items-center justify-between w-full px-5 md:px-0'>
					<Link to='/' className='flex items-center gap-2'>
						<img
							src={logo}
							alt='GameTopUp Zone logo'
							className='w-[40px] md:w-[50px] rounded-full object-cover'
						/>
						<h2 className='text-lg md:text-xl font-bold'>GameTopUp Zone</h2>
					</Link>
					{/* Mobile Menu Toggle */}
					<div className='md:hidden absolute top-1.5 right-5 z-60'>
						{navShow ? (
							<IoClose
								size={25}
								onClick={() => setNavShow(false)}
								className='text-primary cursor-pointer'
								aria-label='Close navigation'
							/>
						) : (
							<FiMenu
								size={25}
								onClick={() => setNavShow(true)}
								className='text-primary cursor-pointer'
								aria-label='Open navigation'
							/>
						)}
					</div>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`fixed top-0 left-0 right-0 h-screen flex flex-col items-center justify-center bg-white z-50 transition-transform duration-300 ease-in-out ${
						navShow ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className='flex flex-col gap-3'>{renderNavLinks(true)}</div>

					<div className='md:hidden absolute top-5 right-5 z-60'>
						<IoClose
							size={30}
							onClick={() => setNavShow(false)}
							className='text-primary cursor-pointer'
							aria-label='Close navigation'
						/>
					</div>

					<div className='mt-10 flex flex-col items-center gap-5'>
						{localStorage.getItem("authToken") ? (
							<Link
								to='/user'
								className='bg-primary text-white_c px-8 py-4 rounded-full text-sm'
								onClick={() => setNavShow(false)}
							>
								Dashboard
							</Link>
						) : (
							<>
								<Link
									to='/register'
									className='bg-black text-white_c px-7 py-3 rounded-full text-sm'
									onClick={() => setNavShow(false)}
								>
									REGISTER
								</Link>
								<Link
									to='/login'
									className='bg-primary text-white_c px-8 py-4 rounded-full text-sm'
									onClick={() => setNavShow(false)}
								>
									LOGIN
								</Link>
							</>
						)}
					</div>
				</div>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center gap-7'>
					{renderNavLinks(false)}
					<div className='flex items-center gap-3'>
						{localStorage.getItem("authToken") ? (
							<Link
								to='/user'
								className='uppercase bg-primary text-white_c px-8 py-4 rounded-full text-sm'
							>
								Dashboard
							</Link>
						) : (
							<>
								<Link
									to='/register'
									className='bg-black text-white_c px-7 py-3 rounded-full text-sm'
								>
									REGISTER
								</Link>
								<Link
									to='/login'
									className='bg-primary text-white_c px-8 py-4 rounded-full text-sm'
								>
									LOGIN
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
