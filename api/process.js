import { GoogleGenerativeAI } from "@google/generative-ai";
import ExcelJS from "exceljs";

export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const { rows } = req.body;

const sorted = rows.sort((a,b)=> a.Name.localeCompare(b.Name));

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("Sorted Data");

sheet.columns = [
{header:'Serial No', key:'serial', width:10},
{header:'Name', key:'name', width:25},
{header:'Guardian Name', key:'guardian', width:25},
{header:'House No', key:'house', width:10},
{header:'Gender', key:'gender', width:10},
{header:'Age', key:'age', width:10},
{header:'Group', key:'group', width:15}
];

sorted.forEach((row,index)=>{

let start = Math.floor(index/100)*100+1;
let end = start+99;

sheet.addRow({
serial: row.SerialNo,
name: row.Name,
guardian: row.GuardianName,
house: row.HouseNo,
gender: row.Gender,
age: row.Age,
group: `${start}-${end}`
});

});

res.setHeader(
"Content-Type",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);

res.setHeader(
"Content-Disposition",
"attachment; filename=sorted_data.xlsx"
);

await workbook.xlsx.write(res);
res.end();

}
catch(err){
res.status(500).json({error:err.message});
}

}
