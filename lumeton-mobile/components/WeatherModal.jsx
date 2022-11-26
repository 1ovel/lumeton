import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React from "react";

const WeatherModal = ({ isVisible, setIsVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: "80%",
            borderRadius: 10,
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={{ width: "100%", paddingBottom: 30 }}>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "700" }}
              >
                Chose all the applicable conditions
              </Text>
            </View>
            <View>
              <Text>Snow</Text>
            </View>
            <View>
              <Text>Slippery Ice</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WeatherModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#003380",
  },
  buttonText: {
    color: "#003380",
    fontWeight: "600",
    fontSize: 16,
    paddingRight: 10,
  },
});
