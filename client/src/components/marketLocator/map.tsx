import { Loader } from "@googlemaps/js-api-loader";
import { env } from 'process';


const Map = () => {
  let map: google.maps.Map
  const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };


  const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  loader.load().then(() => {
    console.log('loading');
    function initMap(): void {
      console.log('loading2');
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center,
        zoom: 8
      });
    
    }
    initMap();
  });
  return (

    
      <div id="map" style={{'height': 500, 'width': 500}}>
          Map
     </div>
  
  )

}

export default Map;
