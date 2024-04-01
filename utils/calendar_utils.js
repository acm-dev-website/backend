const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

async function loadSavedCredentials()
{
    try
    {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    }

    catch (err) 
    {
        return null;
    }
}

async function saveCredentials(client) 
{
    const content = await fs.readFile(CREDENTIALS_PATH);
    const creds = JSON.parse(content);
    const key = creds.installed || creds.web;

    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });

    await fs.writeFile(TOKEN_PATH, payload);
}

async function get_auth()
{
    let auth_client = await loadSavedCredentials();
    if (auth_client)
        return auth_client;

    auth_client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH
    });

    if (auth_client.credentials)
    {
        await saveCredentials(auth_client);
    }
    return auth_client;
}

async function listCalendarEvents(auth)
{
    const calendar = google.calendar({version: "v3", auth: auth});
    const res = await calendar.events.list(    
    {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    const events = res.data.items;

    if (!events || events.length === 0) {
        console.log('No upcoming events found.');
        return;
    }
    
    console.log('Upcoming 10 events:');

    events.map((event, _i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
    });
}

async function addCalendarEvent(auth, event)
{
    const calendar = google.calendar({version: "v3", auth: auth});
    const res = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event
        });

    console.log(res.data);
}

/**
 * 
 * @param {String} date 
 * @param {String} time 
 * @returns (String, String)
 */
function handleDateTime(date, start, end)
{
    const startDatetime = date + "T" + time + ":00";
    const endDateTime = date + "T" + time + ":00"; 
    return (startDatetime, endDatetime);
}

async function addEvent(name, date, time, description)
{
    const startDatetime = date + "T" + time + ":00";
    const endDatetime = date + "T" + time + ":00";
    const newEvent = 
    {
        summary: name,
        description: description,
        start: {
          dateTime: datetime,
          timeZone: "America/New_York",
        },
        end: {
          dateTime: "2024-03-29T17:00:00",
          timeZone: "America/New_York",
        },
        attendees: [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
    };

    addCalendarEvent(newEvent);
}

module.exports = 
{
    authorize: get_auth,
    addCalendarEvent: addCalendarEvent,
    listCalendarEvents: listCalendarEvents
};