import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import NewFeedbackIcon from '../assets/newFeedbackIcon.svg'
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation()
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      const foregroundSubscrition = Location.watchPositionAsync(
        {
          // Tracking options
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
        },
        (location) => {
          const coordinates = {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          };
          setLocation(coordinates);
        }
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={false}
        //specify our coordinates.
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          longitude: 24.93626160750431,
          latitude: 60.179599016239166,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          location && {
            longitude: location.longitude,
            latitude: location.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
      >
        {location && (
          <Marker
            coordinate={{
              longitude: location ? location?.longitude : 24.93626160750431,
              latitude: location ? location?.latitude : 60.179599016239166,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )}
      </MapView>
      <View style={{ position: 'absolute', width: '100%', zIndex: 20, bottom: 30 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Camera', { location: location })
            }}
            style={{
              width: "85%",
              height: 60,
              backgroundColor: "#003380",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            {/* <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Report</Text> */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 20,
                    paddingRight: 10,
                  }}
                >
                  Make a report
                </Text>
                <NewFeedbackIcon width={30} height={30} />
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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

export default MapScreen;
