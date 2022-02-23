const { calendar } = require('@googleapis/calendar');

const cal = calendar({
  version: 'v3',
  auth: process.env.GOOGLE
});