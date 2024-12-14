import { format } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const downloadExcel = async (data, accFormat) => {
	// Map and sort the required fields
	const formattedData = data
		.map(item => ({
			uid: item.uid || "",
			email: item.email || "",
			password: item.password || "",
			key: item.key || "",
			cookie: item.cookie || "",
		}))
		.sort((a, b) => a.password.localeCompare(b.password));

	// Create a workbook and worksheet
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Accounts");

	// Add header row
	worksheet.columns = [
		{ header: "UID", key: "uid", width: 20 },
		{ header: "Email", key: "email" },
		{ header: "Password", key: "password", width: 15 },
		{ header: "Key", key: "key", width: 20 },
		{ header: "Cookie", key: "cookie", width: 40 },
	];

	// Add data rows
	formattedData.forEach(item => worksheet.addRow(item));

	// Apply font size 10 to all cells
	worksheet.eachRow(row => {
		row.eachCell(cell => {
			cell.font = { size: 10 }; // Set font size to 10
		});
	});

	// Generate Excel file
	const buffer = await workbook.xlsx.writeBuffer();

	// Trigger download
	const date = format(new Date(), "dd-MM-yyyy");
	const blob = new Blob([buffer], { type: "application/octet-stream" });
	saveAs(
		blob,
		`accounts ${accFormat || ""} (${
			formattedData.length || 0
		} pitch), ${date}.xlsx`,
	);
};

export default downloadExcel;
