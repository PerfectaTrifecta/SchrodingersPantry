const axios = require('axios').default;
const { Router } = require('express');
const dotenv = require('dotenv');
dotenv.config()

let spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const authRouter = Router();

authRouter.get('/login', (req, res) => {

});

authRouter.get('/callback', (req, res) => {

});

module.exports = { authRouter };