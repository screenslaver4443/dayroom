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

app.post('/fetch-daymap', async (req, res)  => {
    const {username, password} = req.body;
    console.log(username)
    console.log(password)
    if (!username || !password) {
        return res.status(400).json({message: "Missing username or password"})
    }
    const assignments = await dm(username, password)
    res.json (assignments)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});