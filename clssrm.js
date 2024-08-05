const {google} = require('googleapis')
const dotenv = require('dotenv')
dotenv.config()



const oauth2Client = new google.auth.OAuth2(
    process.env.CR_ID,
    process.env.CR_SECRET,
    'http://localhost:3000/oauth2callback'
  );
const scope = 'https://www.googleapis.com/auth/classroom.coursework.me.readonly'

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
})

// const classroom = google.classroom({
//     version: 'v1',
//     auth: process.env.CR_ID
// })


console.log(url)