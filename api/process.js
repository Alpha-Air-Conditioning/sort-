import ExcelJS from "exceljs";
import { transliterateMalayalam } from "../lib/gemini.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    let { rows } = req.body;

    // Use Gemini transliteration
    const processedRows = await transliterateMalayalam(rows);

    // Sort names
    processedRows.sort((a,b)=> a.Name.localeCompare(b.Name));

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sorted Data");

    sheet.columns = [
      {header:'Serial No', key:'SerialNo'},
      {header:'Name', key:'Name'},
      {header:'Guardian Name', key:'GuardianName'},
      {header:'House No', key:'HouseNo'},
      {header:'Gender', key:'Gender'},
      {header:'Age', key:'Age'}
    ];

    processedRows.forEach(row => sheet.addRow(row));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
