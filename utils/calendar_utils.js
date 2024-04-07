const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const mongo_utils = require("./mongo_utils");
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

async function getEmails() {
    const db = mongo_utils.get_client().db();
    const collection = db.collection("people");
    const result = collection.find({});

    let emails = [];
    while (await result.hasNext())
    {
        const current = (await result.next()).email;
        const person = {
            email: current
        };

        emails.push(person);
    }

    console.log(emails);
    return emails;
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

async function deleteCalendarEvent(auth, eventId)
{
    const calendar = google.calendar({version: "v3", auth: auth});
    const res = await calendar.events.delete({
        calendarId: "primary",
        eventId: eventId
    });

    console.log(res.data);
}

module.exports = {
    authorize: async function ()
    {
        let authClient = await loadSavedCredentials();
        if (authClient)
            return authClient;

        authClient = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH
        });

        if (authClient.credentials)
        {
            await saveCredentials(authClient);
        }
        return authClient;
    },

    addEvent: async function(name, date, start, end, description)
    {
        const emailList = await getEmails();
        const startDatetime = date + "T" + start + ":00";
        const endDatetime = date + "T" + end + ":00";
        const newEvent = 
        {
            summary: name,
            description: description,
            start: {
              dateTime: startDatetime,
              timeZone: "America/New_York",
            },
            end: {
              dateTime: endDatetime,
              timeZone: "America/New_York",
            },
            attendees: emailList,
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
            guestsCanSeeOtherGuests: false,
        };

        this.authorize()
            .then((authClient) => addCalendarEvent(authClient, newEvent));
    },

    deleteEvent: async function(eventId)
    {
        this.authorize().then((auth) => deleteCalendarEvent(auth, eventId));
        return;
    },

    get: getEmails
};