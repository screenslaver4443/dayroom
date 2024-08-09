const {google} = require('googleapis')
const dotenv = require('dotenv')
dotenv.config()


async function authenticate() {
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
    await console.log(url)
// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
}
// const classroom = google.classroom({
//     version: 'v1',
//     auth: process.env.CR_ID
// })

authenticate()