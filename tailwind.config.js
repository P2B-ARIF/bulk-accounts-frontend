/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				sm: "600px",
				md: "768px",
				lg: "992px",
				xl: "1100px",
				"2xl": "1280px",
			},
			colors: {
				primary: "var(--sky)",
				secondary: "var(--black)",
				lightSmoke: "var(--lightSmoke)",
				white_c: "var(--white)",
				smoke: "var(--smoke)",
				gray: "var(--gray)",
				dark: "var(--dark)",
			},
			fontFamily: {
				lato: ["Lato", "sans-serif"],
			},
		},
	},
	plugins: [],
};
