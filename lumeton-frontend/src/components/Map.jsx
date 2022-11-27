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
    });
  }, []);

  return summary && isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {summary.map(item=>
      <Marker
        onClick={() => setSelectedItem(item.feedback_id)}
        position={{
          lng: item.lon,
          lat: item.lat,
        }} 
             icon={{
          url: `https://strona.agency/photos/circ_${String(item.final_urgency).slice(0,3)}.png`
        }}

        label={{ text: `${item.final_urgency}`.slice(0,3), color: "#ffffff" }}
      />
        )}
      
      <SelectedItem summary={summary.find(obj => {
  return obj.feedback_id === selectedItem
})} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapComponent);
