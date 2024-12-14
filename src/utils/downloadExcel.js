import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const downloadExcel = (data, accFormat) => {
	// Map the required fields
	const formattedData = data
		.map(item => ({
			uid: item.uid || "",
			email: item.email || "",
			password: item.password || "",
			key: item.key || "",
			cookie: item.cookie || "",
		}))
		.sort((a, b) => a.password.localeCompare(b.password));

	// Create a worksheet
	const worksheet = XLSX.utils.json_to_sheet(formattedData);

	const date = format(new Date(), "dd-MM-yyyy");

	// Create a workbook and append the worksheet
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, `Accounts`);

	// Write the workbook and trigger download
	const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
	const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
	saveAs(
		blob,
		`accounts ${accFormat || ""} (${
			formattedData.length || 0
		} pitch), ${date}.xlsx`,
	);
};

export default downloadExcel;
