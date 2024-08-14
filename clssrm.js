import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();


export async function generateAuthUrl() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.CR_ID,
        process.env.CR_SECRET,
        'http://localhost:3000/oauth2callback'
    );
    const scopes = [
        'https://www.googleapis.com/auth/classroom.coursework.me', 
        'https://www.googleapis.com/auth/classroom.courses.readonly'	]
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        response_type: 'code',
    })
    
    return url
}

export async function fetchToken(code) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.CR_ID,
        process.env.CR_SECRET,
        'http://localhost:3000/oauth2callback'
    );
    const {tokens} = await oauth2Client.getToken(code);
    return tokens
}

export async function fetchClassroom(key) {
    const oauth2Client = new google.auth.OAuth2(        
        process.env.CR_ID,
        process.env.CR_SECRET,
        'http://localhost:3000/oauth2callback');
    oauth2Client.setCredentials(key);
    const classroom = await google.classroom({
        version: 'v1',
        auth: oauth2Client
    })
    const courses = await classroom.courses.list()
    let assignments = []
    
    for (let i=0; i < courses.data.courses.length; i++) {
        try {
            assignments.push(await classroom.courses.courseWork.list({courseId: courses.data.courses[i].id}))
        }
        catch{
        }
    }
    return assignments
}