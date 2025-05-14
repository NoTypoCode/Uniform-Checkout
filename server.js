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

    const { lastname, mothersname, childsname, phone, shirt, shirtsize, skirt, skirtsize, jumper, jumpersize, sweatshirt, sweatshirtsize, totalPrice, paid, partialPayment } = req.body;

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:O",
        insertDataOption: "OVERWRITE",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [lastname, mothersname, childsname, phone, shirt, shirtsize, skirt, skirtsize, jumper, jumpersize, sweatshirt, sweatshirtsize, totalPrice, paid ? "TRUE" : "FALSE", partialPayment]
            ]
        },
    });


    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:O",
    });

    if (paid !== "" || totalPrice !== "" || partialPayment !== "") {
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1!A:O",
        });

        const newRowIndex = getRows.data.values.length - 1;

        await googleSheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [
                    {
                        updateBorders: {
                            range: {
                                sheetId: 0, // usually 0 for the first sheet
                                startRowIndex: newRowIndex,
                                endRowIndex: newRowIndex + 1,
                                startColumnIndex: 0,
                                endColumnIndex: 15
                            },
                            bottom: {
                                style: "SOLID_THICK",
                                width: 2,
                                color: { red: 0, green: 0, blue: 0 }
                            }
                        }
                    }
                ]
            }
        });
    }


    res.send();
});


const PORT = process.env.PORT;
app.listen(PORT || 8080, (req, res) => { console.log(`We are up and running.\nDO NOT CLOSE THIS BLACK WINDOW UNTIL READY TO CLOSE THE WHOLE PROGRAM`); });