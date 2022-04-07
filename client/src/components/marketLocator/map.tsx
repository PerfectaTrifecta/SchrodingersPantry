import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import axios from 'axios';
import useTheme from '@mui/material/styles/useTheme';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onIdle?: (map: google.maps.Map) => void;
  setCenter?: (map: google.maps.LatLngLiteral) => void;
  setZoom?: (number: number) => void;
}

const Map: React.FC<MapProps> = ({
  onIdle,
  setCenter,
  setZoom,
  children,
  style,
  ...options
}) => {
  const theme = useTheme();

  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [zip, setZip] = React.useState<string>('');
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = React.useState<google.maps.InfoWindow>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions(options);
      ['idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
    }
  }, [map, onIdle]);
  React.useEffect(() => {
    if (marker) {
      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    }
  }, [marker, infoWindow]);

  /////////////////////////////////////////////////////////////////////////////////////////

  const searchMarkets = (zip: string) => {
    const markets: any = [];
    axios
      .get(
        `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`
      )
      .then(({ data }) => {
        const top3 = data.results.slice(0, 3);

        for (let i = 0; i < top3.length; i++) {
          return axios
            .get(
              `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${top3[i].id}`
            )
            .then((response) => {
              markets.push(response.data.marketdetails);
            });
        }
      })
      .then(() => {
        return axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${markets[0].Address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
      })
      .then((res) => {
        setInfoWindow(
          new google.maps.InfoWindow({
            content: `${markets[0].Address}
          ${markets[0].Schedule}`,
          })
        );
        setMarker(
          new google.maps.Marker({
            position: res.data.results[0].geometry.location,
            map: map,
          })
        );

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
  const onSearch = () => {
    searchMarkets(zip);
  };

  ///////////////////////////////////

  return (
    <div>
      <div
        style={{
          color: theme.palette.primary.contrastText,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <header>Find a Farmers' Market near you!</header>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            id='outlined-basic'
            onChange={handleInput}
            value={zip}
            placeholder='Enter Zip Code'
            style={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              borderRadius: '5px',
            }}
            sx={{
              '& .MuiOutlinedInput-input': {
                color: theme.palette.primary.contrastText,
              },
            }}
          />
          <Button
            style={{ color: theme.palette.primary.contrastText }}
            onClick={onSearch}
          >
            Search
          </Button>
        </div>
      </div>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
};

export default Map;
