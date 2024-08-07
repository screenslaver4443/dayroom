import express from 'express';
import {exec} from 'child_process';
const app = express();
const port = 3000;
import dm from './pw.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// app.use(cors)
app.use(express.json())

app.get('/fetch-daymap', async (req, res)  => {
    console.log(req)
    res.json (await dm(process.env["DM_username"], process.env["DM_password"]))

    //
    // exec(command, (error, stdout, stderr) => {
    //     if (error) {
    //         return res.status(500).send(`Error: ${error.message}`);
    //     }
    //     if (stderr) {
    //         return res.status(500).send(`Stderr: ${stderr}`);
    //     }
    //     res.send(stdout);
    // });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});