import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import icon from "../pin.svg";
import SelectedItem from "./SelectedItem";
import { useState } from "react";
import axios from "axios"
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 60.179599016239166,
  lng: 24.93626160750431,
};

function val2heat(perc) {
  var r, g, b = 0;
  if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
  }
  else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  console.log(('000000' + h.toString(16)).slice(-6))
  return  ('000000' + h.toString(16)).slice(-6);
}

function MapComponent() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAlzeDJz0lwH4NdmBTUfjLCFMJ7ZPjXJ8o",
  });
  const [summary, setSummary] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/summary').then((response) => {
      setSummary(response.data);
      console.log(response.data)
    });
  }, []);

  return summary && isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {summary.map(item=>
      <Marker
        onClick={() => setSelectedItem()}
        position={{
          lng: item.lon,
          lat: item.lat,
        }}
        icon={{
          url: `https://api.iconify.design/ic/round-circle.svg?color=%23${val2heat(item.final_urgency)}&width=30&height=30`,
        }}
        label={{ text: `${item.final_urgency}`.slice(0,3), color: "#ffffff" }}
      />
        )}
      
      <SelectedItem selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapComponent);
