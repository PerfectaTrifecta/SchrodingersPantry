# SchrodingersPantry
You name the ingredients, we suggest a recipe. There both is and isn't a ready meal in your kitchen.

## Initialization
On your first startup, run npm i to install dependencies. You should only need to do this once in the beginning of development.
```
npm i 
```

In separate terminals:

Start you server
``` 
npm start
```
Run the webpack compiler
```
npm run build
```
Create a database with PostgreSQL named 'pantry'. The models in server/db/index will sync when the server starts.

## Server Side

## Tech Stack

1. Express Server (4.17.2)
2. PostgreSQL (1.0.2)
3. Sequelize ()
4. Typescript (4.5.5)
5. React (17.0.2)
6. Passport/Google oAuth2.0 (0.5.2, 0.2.0)

## APIs

1. Fetch RSS ([Fetch RSS Docs](https://fetchrss.com/api)) 
2. The Meal DB ([Rapid API Docs](https://rapidapi.com/thecocktaildb/api/themealdb/))
3. Youtube ([Youtube API Docs](https://developers.google.com/youtube/v3))
4. Spotify ([Spotify API Docs](https://developer.spotify.com/documentation/web-playback-sdk/))

## Add to you .env

1. In the Google Developers Console, generate a GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
2. For Spotify create a Premium Account (if you don't already have one), go to Spotify For Developers and create a CLIENT_SECRET & CLIENT_ID
3. For Fetch RSS, create a free account, and create an RSS_API key
4. For The Meal DB, create a free account and generate a key called THE_MEAL_DB_API_KEY


## How to Contribute
[Contribute to Schrodinger's Pantry](/CONTRIBUTING.md)


