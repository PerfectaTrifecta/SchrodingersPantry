import TextField from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
import React from "react";
import axios from 'axios';


interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onIdle,
  children,
  style,
  ...options
}) => {
  


  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  
  console.log(map, 24);

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

  const searchMarkets = (zip) => {
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
        console.log(res.data.results[0].geometry)
        // setCenter(res.data.results[0].geometry.location);
        // setZoom(8);
      })
      .catch((err) => {
        console.error(err);
      });




  };

  const handleInput = (e: any) => {
    e.preventDefault();
    // setZip(e.target.value);

  };
  const onSearch = (e: any) => {
    // searchMarkets(zip);
    e.target.reset;
  };


  ///////////////////////////////////

  // const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  //   const [marker, setMarker] = React.useState<google.maps.Marker>();

  //   React.useEffect(() => {
  //     if (!marker) {
  //       setMarker(new google.maps.Marker());
  //     }

  //     // remove marker from map on unmount
  //     return () => {
  //       if (marker) {
  //         marker.setMap(null);
  //       }
  //     };
  //   }, [marker]);

  //   React.useEffect(() => {
  //     if (marker) {
  //       marker.setOptions(options);
  //     }
  //   }, [marker, options]);

  //   return null;
  // };
  return (
    <div>
      <div>
        <TextField id="outlined-basic" onChange={handleInput} />
        <Button onClick={onSearch}>Zip Code</Button>
      </div>
      <div ref={ref} style={style}/>

    </div>
    
  )

}

export default Map;
