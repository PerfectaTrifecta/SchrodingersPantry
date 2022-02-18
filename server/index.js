const express = require('express');
const path = require('path');
const { sql } = require('./db/index.js');

const axios = require('axios');
const router = require('./routes/index.js');
require('dotenv').config();

const app = express();
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

const PORT = 4000;

app.use(express.json());

router(app);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
sql.authenticate()
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));
