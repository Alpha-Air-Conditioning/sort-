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
{ header:"Serial No", key:"serial" },
{ header:"Name", key:"name" },
{ header:"Guardian Name", key:"guardian" },
{ header:"House No", key:"house" },
{ header:"Gender", key:"gender" },
{ header:"Age", key:"age" }
];

sheet.addRow({
serial:1,
name:"Test Person",
guardian:"Test Guardian",
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

}catch(err){

console.error(err);
res.status(500).json({error:"Server error"});

}

}
