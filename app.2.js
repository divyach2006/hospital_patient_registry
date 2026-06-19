const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"patient.index.html"));
}); 

app.post("/register", (req,res) => {
 const patientData = `Patient Name:${req.body.patientName}, Date of Admission:${req.body.admissionDate}, Illness:${req.body.illness}\n`;
 console.log(patientData);
fs.appendFileSync("patient_registry.txt",patientData);
res.send(`<h3>${req.body.patientName} has been saved. Go back to main page`)
});


 app.get("/patients",(req,res)=>{
    let patients = "";

    if(fs.existsSync("patient_registry.txt")){
        patients = fs.readFileSync("patient_registry.txt","utf8");

        res.send(`<h2>Registered Patients:</h2><pre>${patients}</pre>`);
    }
});

app.listen(3000, ()=>{
 console.log("Server is running on 3000");
})