import { format } from "date-fns";

const firstNames = [
	"Aliya",
	"Zara",
	"Aisha",
	"Noor",
	"Sara",
	"Amara",
	"Leila",
	"Maya",
	"Fatima",
	"Hana",
	"Naila",
	"Samira",
	"Yasmin",
	"Amina",
	"Lina",
	"Rania",
	"Tala",
	"Huda",
	"Safiya",
	"Asma",
	"Nour",
	"Reem",
	"Layla",
	"Nada",
	"Mariam",
	"Esra",
	"Zainab",
	"Areeba",
	"Iqra",
	"Ruqayyah",
	"Jasmine",
	"Sofia",
	"Naima",
	"Malak",
	"Bushra",
	"Tahira",
	"Eman",
	"Hafsa",
	"Imaan",
	"Sahar",
	"Rabia",
	"Anisa",
	"Amal",
	"Heba",
	"Sana",
	"Shazia",
	"Sidra",
	"Tania",
	"Zaira",
	"Sadia",
	"Afra",
	"Nida",
	"Fiza",
	"Huma",
	"Komal",
	"Kiran",
	"Mehwish",
	"Mahira",
	"Tina",
	"Anam",
	"Rida",
	"Faria",
	"Aqsa",
	"Salma",
	"Lubna",
	"Sobia",
	"Nimra",
	"Mahnoor",
	"Amber",
	"Ayesha",
	"Aleena",
	"Maha",
	"Sumaiya",
	"Shirin",
	"Fauzia",
	"Nargis",
	"Areej",
	"Alisha",
	"Tamanna",
	"Ayla",
	"Eliza",
	"Naila",
	"Farah",
	"Arfa",
	"Uzma",
	"Shaista",
	"Hira",
	"Fareeha",
	"Shabana",
	"Hania",
	"Anum",
	"Aqila",
	"Arisha",
	"Inaya",
	"Khadija",
	"Noorain",
	"Humaira",
	"Tahreem",
	"Mishal",
	"Wardah",
];

const lastNames = [
	"Khan",
	"Rahman",
	"Iqbal",
	"Hussain",
	"Ahmed",
	"Ali",
	"Chaudhry",
	"Sheikh",
	"Siddiqui",
	"Ansari",
	"Malik",
	"Shah",
	"Qureshi",
	"Javed",
	"Zafar",
	"Farooq",
	"Mirza",
	"Raza",
	"Bukhari",
	"Shaikh",
	"Hashmi",
	"Baig",
	"Dar",
	"Gillani",
	"Kazmi",
	"Naqvi",
	"Rizvi",
	"Hadi",
	"Syed",
	"Sultan",
	"Mujtaba",
	"Abidi",
	"Yousuf",
	"Tariq",
	"Mahmood",
	"Rashid",
	"Aziz",
	"Hameed",
	"Jamil",
	"Fazal",
	"Shahbaz",
	"Tanvir",
	"Kareem",
	"Sami",
	"Ibrahim",
	"Faisal",
	"Qasim",
	"Zahid",
	"Kamran",
	"Bilal",
	"Haq",
	"Anwar",
	"Imran",
	"Shafiq",
	"Waseem",
	"Saleem",
	"Asghar",
	"Saif",
	"Zubair",
	"Hamid",
	"Naseer",
	"Salman",
	"Naeem",
	"Bashir",
	"Aslam",
	"Feroz",
	"Hasan",
	"Khalid",
	"Munir",
	"Raheem",
	"Tahir",
	"Afzal",
	"Hassan",
	"Adnan",
	"Rashid",
	"Sabir",
	"Tariq",
	"Amin",
	"Nasir",
	"Danish",
	"Masood",
	"Nawaz",
	"Younas",
	"Zahid",
	"Farid",
	"Idrees",
	"Zeeshan",
	"Shahid",
	"Irfan",
	"Shafi",
];

// Helper function to get a random item from an array
const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

// Function to generate random data
export const getRandomName = () => ({
	fname: getRandomItem(firstNames),
	lname: getRandomItem(lastNames),
});

const generateRandomEmail = providers => {
	const randomName = Math.random().toString(36).substring(2, 7); // Use base 36 for better randomness
	const domain = providers[Math.floor(Math.random() * providers.length)];
	return `${randomName}@${domain}`;
};

export const getRandomEmail = mailbox => {
	const emailProviders = {
		"1secmail": ["1secmail.com", "1secmail.org", "1secmail.net"],
		mailvn: ["mailvn.site"],
		"5smail": ["1secmail.site", "5smail.site", "5smail.email"],
	};

	const providers = emailProviders[mailbox];

	if (!providers) {
		console.error(`Invalid mailbox type: ${mailbox}`);
		return null; // Return null for invalid mailbox types
	}

	const email = generateRandomEmail(providers);
	console.log(`Generated email for ${mailbox}: ${email}`);
	return email;
};

export const getRandomNumber = () => {
	const prefix = "018"; // First three digits
	const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Generates 8 random digits
	return prefix + randomNumber;
};

// export const getUSRandomNumber = () => {
// 	const countryCode = "001"; // US country code
// 	const areaCode = Math.floor(200 + Math.random() * 800); // Generate a random 3-digit area code (200-799)
// 	const centralOfficeCode = Math.floor(200 + Math.random() * 800); // Generate a random 3-digit central office code (200-799)
// 	const lineNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit line number
// 	return `${countryCode}-${areaCode}-${centralOfficeCode}-${lineNumber}`;
// };

export const getRandomPassword = () => {
	const date = format(new Date(), "dd");
	const fixPassword = import.meta.env.VITE_PASSWORD;
	return `${fixPassword}${date}`;
};
