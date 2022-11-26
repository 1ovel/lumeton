import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedbackScreen = () => {
  return (
    <SafeAreaView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text>Photo</Text>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "red",
            marginTop: 10,
          }}
        ></View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Location</Text>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "red",
            marginTop: 10,
          }}
        ></View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Your assesment of the conditions</Text>
        <TouchableHighlight
          style={styles.button}
        >
          <Text>asdas</Text>
        </TouchableHighlight>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Your assesment of the conditions</Text>
        <TouchableHighlight
          style={styles.button}
        >
          <Text>asdas</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#003380",
    width: "100%",
    height: 70,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
