import express from 'express';
const app = express();
const port = 3000;
import dm from './pw.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.get('/fetch-daymap', async (req, res)  => {
    const assignments = await dm(process.env["DM_username"], process.env["DM_password"])
    res.json (assignments)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});