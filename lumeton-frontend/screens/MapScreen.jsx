import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';


const MapScreen = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Error loading location')
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coordinates = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      }
      setLocation(coordinates);
    })();
  }, []);

  console.log(location)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //specify our coordinates.
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          // longitude: location ? 24.93626160750431 : location?.longitude, 
          // latitude: location ? 60.179599016239166 : location?.latitude,
          longitude: 24.93626160750431, 
          latitude: 60.179599016239166,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && <Marker coordinate={location}/>}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default MapScreen