import React, { useState, useEffect } from 'react';



declare global {
    interface Window { 
        onSpotifyWebPlaybackSDKReady: any,
        Spotify: any
    }
}
interface WebProps {
    token: String
}

const WebPlayback: React.FC<WebProps> = (props) : JSX.Element => {
  const [player, setPlayer] = useState(undefined);


  useEffect(() => {
    console.log(props,20);
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    
    window.onSpotifyWebPlaybackSDKReady = () => {

        const player : any = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: (cb: any) => { cb(props.token); },

        });

        setPlayer(player);

        player.addListener('ready', ( device_id : any) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', (device_id : any) => {
            console.log('Device ID has gone offline', device_id);
        });


        player.connect();

    };
}, []);
   return (
      
        <div className="container">
           <div className="main-wrapper">
                Yep
            </div>
        </div>
      
    );
}

export default WebPlayback;