const { createConnection } = require('typeorm');

const connectDB = async () => {
  await createConnection()
  .then(() => console.log('Connected to db'))
  .catch(err => console.log('Problem connecting to db', err));
};

module.exports = {
  connectDB
}