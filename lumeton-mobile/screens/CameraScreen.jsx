import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { createRef, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import CameraIcon from "../assets/cameraIcon.svg";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = ({ route }) => {
  const { location } = route.params
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef();
  const navigation = useNavigation()
  
	requestPermission()

  const takePicture = () => {
    if (!cameraRef.current) {
      console.log("asd");
      return;
    }
    cameraRef.current.takePictureAsync({ onPictureSaved: (photo) => {
      navigation.navigate('Feedback', { photo: photo, location: location })
    }});
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1, width: "100%" }}>
        <View style={{ height: "87%" }} />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={takePicture}
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
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 20,
                    paddingRight: 10,
                  }}
                >
                  Capture Snow
                </Text>
                <CameraIcon width={25} height={25} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
