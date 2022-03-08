import React, { useState } from "react";
import axios from "axios";
import TimeOfDayMenu from "./TimeOfDayMenu";
import { TextField, Button } from '@mui/material';
import { gapi } from 'gapi-script';


const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

const MealPrep: React.FC = () => {
  const [nameOfRecipe, setNameOfRecipe] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('Breakfast');
  const [timeToEatStart, setTimeToEatStart] = useState<string>('');
  const [timeToEatEnd, setTimeToEatEnd] = useState<string>('');
  const dateArr = date.split('/');

  
  const addMealToCalendar = () => {
      console.log(process.env.CALENDAR_API, "HERE");
      if(timeOfDay === 'Breakfast') {
        setTimeToEatStart('2022-' + dateArr[0] + '-' + dateArr[1]+'8:00:00.000');
        setTimeToEatEnd('2022-' + dateArr[0] + '-' + dateArr[1]+'8:30:00.000');
      } else if(timeOfDay === 'Lunch') {
        setTimeToEatStart('2022-' + dateArr[0] + '-' + dateArr[1]+'12:00:00.000');
        setTimeToEatEnd('2022-' + dateArr[0] + '-' + dateArr[1]+'12:30:00.000');
      } else if(timeOfDay === 'Dinner') {
        setTimeToEatStart('2022-' + dateArr[0] + '-' + dateArr[1]+'20:00:00.000');
        setTimeToEatEnd('2022-' + dateArr[0] + '-' + dateArr[1]+'20:30:00.000');
      }

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: `${process.env.CALENDAR_API}`,
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load('calendar', 'v3', () => console.log('calendar loading now'));

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          const event = {
            summary: `${timeOfDay}`,
            description: `About to eat ${nameOfRecipe}? Sounds delicious!`,
            start: {
              date: `${timeToEatStart}`,
              timeZone: 'America/Chicago',
            },
            end: {
              date: `${timeToEatEnd}`,
              timeZone: 'America/Chicago',
            },
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            sendNotifications: true,
          });
          request.execute((event: any) => {
            window.open(event.htmlLink);
          });
        });
    });
  };


  return(
    <div>
      <TimeOfDayMenu timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} />
      <TextField label='What Meal Are You Cooking?' onChange={(e) => {
        setNameOfRecipe(e.target.value);
      }} />
      <TextField label='MM/DD' onChange={(e) => {
        setDate(e.target.value);
      }}/>
      <Button color='primary' onClick={addMealToCalendar} >Add This Meal To Calendar</Button>
    </div>
  )
}

export default MealPrep;