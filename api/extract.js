import ExcelJS from "exceljs";

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"POST only"});
}

try{

const rows = req.body;

rows.sort((a,b)=> a.Name.localeCompare(b.Name));

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("Voters");

sheet.columns = [
{header:"Serial No", key:"SerialNo"},
{header:"Name", key:"Name"},
{header:"Guardian Name", key:"GuardianName"},
{header:"House No", key:"HouseNo"},
{header:"Gender", key:"Gender"},
{header:"Age", key:"Age"}
];

rows.forEach(r=> sheet.addRow(r));

res.setHeader(
"Content-Type",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);

await workbook.xlsx.write(res);

res.end();

}
catch(err){

res.status(500).json({error:err.message})

}

}
