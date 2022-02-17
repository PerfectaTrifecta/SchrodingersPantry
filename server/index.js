const express = require('express');
const path = require('path');
const { connectDB } = require('./db/index.js');

const app = express();
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));
const router = require('./routes/index.js');

const PORT = 4000;

router(app);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
connectDB();
