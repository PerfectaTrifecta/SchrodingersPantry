import { Loader } from "@googlemaps/js-api-loader";
import { env } from 'process';
import TextField from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from 'axios';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  

  // const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
  //   lat: 0,
  //   lng: 0,
  // });
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // const useDeepCompareEffectForMaps = (() => {
  //   if (map) {
  //     map.setOptions(options);
  //   }
  // }, [map, options]);
  

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
  
      if (onClick) {
        map.addListener("click", onClick);
      }
  
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  // const loader = new Loader({
  //   apiKey: process.env.GOOGLE_MAPS_API_KEY,
  //   version: "weekly",
  // });

  // loader.load().then(() => {
  //   function initMap(): void {
  //     let map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
  //       center,
  //       zoom: 5
  //     });

  //   }
  //   initMap()

  // });

  /////////////////////////////////////////////////////////////////////////////////////////

  // const searchMarkets = (zip) => {
  //   const addresses = []
  //   axios
  //     .get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`)
  //     .then(({ data }) => {
  //       console.log(data.results);
  //       const top3 = data.results.slice(0, 3)

  //       for (let i = 0; i < top3.length; i++) {

  //         return axios.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${top3[i].id}`)
  //           .then(response => {
  //             addresses.push(response.data.marketdetails.Address);
  //         })
  //       })
  //     .then(res => {
  //       return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addresses[0]}&key=${process.env.GOOGLE_MAPS_API_KEY}`)


  //     }).then(res => {
  //       console.log(res.data.results[0].geometry)
  //       setCenter(res.data.results[0].geometry.location);
  //       // setZoom(8);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });




  // };

  // const handleInput = (e: any) => {
  //   e.preventDefault();
  //   setZip(e.target.value);

  // };
  // const onSearch = (e: any) => {
  //   searchMarkets(zip);
  //   e.target.reset;
  // };


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

    <div ref={ref} style={{ 'height': 500, 'width': 500 }}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })} */}
      {/* <div>
        <TextField id="outlined-basic" onChange={handleInput} value={zip} />
        <Button onClick={onSearch}>Zip Code</Button>
      </div>
      <div id="map" style={{ 'height': 500, 'width': 500 }}>
      </div> */}



    </div>

  )

}

export default Map;
