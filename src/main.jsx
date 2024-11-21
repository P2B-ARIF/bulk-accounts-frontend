import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./toolkit/store";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ChakraProvider>
			<Provider store={store}>
				<App />
			</Provider>
			<Toaster />
		</ChakraProvider>
	</StrictMode>,
);
