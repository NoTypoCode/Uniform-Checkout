const { configDotenv } = require('dotenv');
const express = require('express');
const { google } = require('googleapis');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('./public'));

const spreadsheetId = process.env.SPREADSHEET_ID;

const sheetData = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "secrets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    return { auth, client, googleSheets, spreadsheetId }
};

app.post("/", async (req, res) => {
    const { auth, client, googleSheets, spreadsheetId } = await sheetData();
   
    const { lastname, mothersname, childsname, phone, shirt, shirtsize, skirt, skirtsize, jumper, jumpersize, sweatshirt, sweatshirtsize, paid } = req.body;

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:M",
        insertDataOption: "OVERWRITE",
        valueInputOption: "USER_ENTERED",
        resource: {
            values:[
                [lastname, mothersname, childsname, phone, shirt, shirtsize, skirt, skirtsize, jumper, jumpersize, sweatshirt, sweatshirtsize, paid? "TRUE": "FALSE"]
            ]
        },
    });

    
    res.send();
});


const PORT = process.env.PORT;
app.listen(PORT || 8080, (req, res) => { console.log(`We are up and running.\nDO NOT CLOSE THIS BLACK WINDOW UNTIL READY TO CLOSE THE WHOLE PROGRAM`); });