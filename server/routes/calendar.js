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