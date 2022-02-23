const {google} = require('googleapis');
const calendar = google.calendar('v3');

async function main() {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  // Acquire an auth client, and bind it to all future calls
  const authClient = await auth.getClient();
  google.options({auth: authClient});

  // Do the magic
  const res = await calendar.calendars.patch({
    // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
    calendarId: 'placeholder-value',

    // Request body metadata
    requestBody: {
      // request body parameters
      // {
      //   "conferenceProperties": {},
      //   "description": "my_description",
      //   "etag": "my_etag",
      //   "id": "my_id",
      //   "kind": "my_kind",
      //   "location": "my_location",
      //   "summary": "my_summary",
      //   "timeZone": "my_timeZone"
      // }
    },
  });
  console.log(res.data);

  // Example response
  // {
  //   "conferenceProperties": {},
  //   "description": "my_description",
  //   "etag": "my_etag",
  //   "id": "my_id",
  //   "kind": "my_kind",
  //   "location": "my_location",
  //   "summary": "my_summary",
  //   "timeZone": "my_timeZone"
  // }
}

main().catch(e => {
  console.error(e);
  throw e;
});

let event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },

  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  appendPre('Event created: ' + event.htmlLink);
});
