import TextField from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
import React from "react";
import axios from 'axios';
import Marker from './marker';


interface MapProps extends google.maps.MapOptions {

  style: { [key: string]: string };
  onIdle?: (map: google.maps.Map) => void;
  setCenter?:(map: google.maps.LatLngLiteral) =>void;
  setZoom?: (number: number)=> void;

}

const Map: React.FC<MapProps> = ({
  onIdle,
  setCenter,
  setZoom,
  children,
  style,
  ...options
}) => {
  


  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [zip, setZip] = React.useState<string>('');

  

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}),);
    }  
  }, [ref, map]);

  
  React.useEffect(() => {
      
    if (map) {
       map.setOptions(options);
      ["idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName),
      );      
    }
  }, [map, onIdle]);

  

  /////////////////////////////////////////////////////////////////////////////////////////

  const searchMarkets = (zip: string) => {
    const addresses = []
    axios
      .get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`)
      .then(({ data }) => {
        console.log(data.results);
        const top3 = data.results.slice(0, 3)

        for (let i = 0; i < top3.length; i++) {

          return axios.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${top3[i].id}`)
            .then(response => {
              addresses.push(response.data.marketdetails.Address);
          })
        })
      .then(res => {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addresses[0]}&key=${process.env.GOOGLE_MAPS_API_KEY}`)


      }).then(res => {
        const latLng = new google.maps.LatLng(res.data.results[0].geometry.location);

        new google.maps.Marker({
          position: latLng,
          map: map,
        });
        console.log(res.data.results[0]);
        setCenter(res.data.results[0].geometry.location);
        setZoom(15);
      })
      .catch((err) => {
        console.error(err);
      });




  };

  const handleInput = (e: any) => {
    e.preventDefault();
    setZip(e.target.value);

  };
  const onSearch = (e: any) => {
    searchMarkets(zip);
    e.target.reset;
  };


  ///////////////////////////////////

  
  return (
    <div>
      <div>
        <TextField id="outlined-basic" onChange={handleInput} value={zip}/>
        <Button onClick={onSearch}>Zip Code</Button>
      </div>
      <div ref={ref} style={style}/>
      {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { map });
      }
    })}
    </div>
    
  )

}

export default Map;
