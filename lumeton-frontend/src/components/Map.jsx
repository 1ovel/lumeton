import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import icon from '../pin.svg'
import SelectedItem from "./SelectedItem";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 60.179599016239166,
  lng: 24.93626160750431,
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAlzeDJz0lwH4NdmBTUfjLCFMJ7ZPjXJ8o",
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Marker
        position={{
          lng: 24.93026160750431,
          lat: 60.176599016239166,
        }}
        icon={{
            url: 'https://api.iconify.design/ic/round-circle.svg?color=red&width=40&height=40'
        }}
        label={{text: '3', color: 'white' }}
      />
      <Marker
        position={{
          lng: 24.93626160750431,
          lat: 60.178599016339166,
        }}
        icon={{
            url: 'https://api.iconify.design/ic/round-circle.svg?color=yellow&width=40&height=40'
        }}
        label={{text: '2', color: 'black' }}
      />
      <Marker
        position={{
          lng: 24.93626160750431,
          lat: 60.177599016239166,
        }}
        icon={{
            url: 'https://api.iconify.design/ic/round-circle.svg?color=%23003380&width=40&height=40'
        }}
        label={{text: '1', color: 'white' }}
      />
      <SelectedItem />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapComponent);
