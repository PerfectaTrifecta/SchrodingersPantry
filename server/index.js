const express = require('express');
const path = require('path');
const axios = require('axios');

require('dotenv').config();


const app = express();
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

const PORT = 4000;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

router(app);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
