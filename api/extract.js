import ExcelJS from "exceljs";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {

try {

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("Voters");

sheet.columns = [
{ header:"Serial No", key:"serial", width:10 },
{ header:"Name", key:"name", width:30 },
{ header:"Guardian Name", key:"guardian", width:30 },
{ header:"House No", key:"house", width:15 },
{ header:"Gender", key:"gender", width:10 },
{ header:"Age", key:"age", width:10 }
];

/* TEST DATA (so Excel always works) */

sheet.addRow({
serial:1,
name:"Test Name",
guardian:"Guardian",
house:"12",
gender:"M",
age:45
});

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

} catch(err){

console.error(err);
res.status(500).json({error:"Server error"});

}

}
