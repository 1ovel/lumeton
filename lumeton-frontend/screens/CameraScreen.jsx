import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { createRef, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import cameraIcon from '../assets/cameraIcon.svg'

const CameraScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef();

  const takePicture = () => {
    if (!cameraRef.current) {
      console.log("asd");
      return;
    }
    cameraRef.current.takePictureAsync();
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
              flexDirection: 'row'
            }}
          >
            {/* <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Report</Text> */}
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View>
              <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
                Capture Snow
              </Text>
              <cameraIcon />
              </View>

            )}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
