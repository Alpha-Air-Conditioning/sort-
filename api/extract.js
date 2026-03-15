import ExcelJS from "exceljs";

export default async function handler(req, res) {

if (req.method !== "POST") {
  return res.status(405).json({ error: "POST only" });
}

try {

const rows = req.body;

// sort
rows.sort((a,b)=> a.Name.localeCompare(b.Name));

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("Voters");

sheet.columns = [
{header:"Serial No", key:"SerialNo", width:10},
{header:"Name", key:"Name", width:30},
{header:"Guardian Name", key:"GuardianName", width:30},
{header:"House No", key:"HouseNo", width:15},
{header:"Gender", key:"Gender", width:10},
{header:"Age", key:"Age", width:10}
];

rows.forEach(r => sheet.addRow(r));

res.setHeader(
"Content-Type",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);

res.setHeader(
"Content-Disposition",
"attachment; filename=voters.xlsx"
);

await workbook.xlsx.write(res);

res.end();

} catch(err) {

res.status(500).json({error: err.message});

}

}
