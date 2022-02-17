const { createConnection } = require('typeorm');

const connectDB = async () => {
  await createConnection().then(() => console.log('Connected to db'))
};

module.exports = {
  connectDB
}