import { View, Text, TouchableOpacity } from "react-native";
import React, { createRef, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";

const CameraScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef()

  const takePicture = () => {
    if (!cameraRef.current) {
        console.log('asd')
        return
    }
    cameraRef.current.takePictureAsync()
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1, width: '100%' }}></Camera>
      <TouchableOpacity onPress={takePicture} style={{ height: 100, width: '100%' }}><Text>test</Text></TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
