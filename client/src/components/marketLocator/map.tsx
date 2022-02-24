import { Loader } from "@googlemaps/js-api-loader";



const Map = () =>{
  let map: google.maps.Map;
const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};


const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

loader.load().then(() => {
  function initMap(): void {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 8
    });
  }
});

  return (
    <div id='map'>
      Map
    </div>
  )

}

export default Map;
