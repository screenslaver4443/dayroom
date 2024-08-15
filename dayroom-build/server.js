import express from 'express';
const app = express();
const port = 3000;
import dm from './pw.js'
import cors from 'cors'
import dotenv from 'dotenv'
import {generateAuthUrl, fetchClassroom, fetchToken} from './clssrm.js';


dotenv.config()

const __dirname = import.meta.dirname;
app.use(express.static(__dirname + '/dist'));

app.use(cors({
    origin: '*'
}))

app.use(express.json())

var code = null;
var token = null;

app.post('/fetch-daymap', async (req, res)  => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "Missing username or password"})
    }
    try {const assignments = await dm(username, password)
        res.json (assignments)
    }
    catch{return res.status(400).json({message: "Error Fetching"})}
    
});

app.get('/', function (req, res) {
    res.sendFile( __dirname + '/dist/index.html');
});

app.get('/generate-auth-url', async (req, res) => {
    let url = await generateAuthUrl();
    res.json({message: 'success', url: url});
});

app.get('/oauth2callback', async (req, res) => {
    code = req.query.code;
    token = await fetchToken(code);
    res.end('you may now close this window');
});

app.get('/fetch-classroom', async (req, res) => {
    const key = token;
    if (!key) {
        return res.status(400).json({message: 'No key found'});
    }
    const courses = await fetchClassroom(key);
    res.json(courses);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});