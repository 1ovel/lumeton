import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ConditionsList from "../components/ConditionsList";
import { iceConditions, snowConditions } from "../constants/conditions";

const FeedbackScreen = ({ route }) => {
  const { photo, location } = route.params;
  const [selectedSnowCondition, setSelectedSnowCondition] = useState(null);
  const [selectedIceCondition, setSelectedIceCondition] = useState(null);
  const [description, setDescription] = useState("");

  console.log(photo);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={{ paddingHorizontal: 20, paddingTop: 20, flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleText}>Photo</Text>
            <View
              style={{
                width: "100%",
                height: 300,
                marginTop: 10,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image source={{ uri: photo.uri }} style={{ flex: 1, resizeMode: 'cover' }} />
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.titleText}>Location</Text>
            <View
              style={{
                width: "100%",
                height: 100,
                marginTop: 10,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <MapView
                scrollEnabled={false}
                style={{ flex: 1 }}
                //specify our coordinates.
                provider={PROVIDER_GOOGLE}
                region={{
                  longitude: location.longitude,
                  latitude: location.latitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    longitude: location.longitude,
                    latitude: location.latitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </MapView>
            </View>
          </View>

          <View>
            <Text style={styles.titleText}>
              Snow Level
            </Text>
            <ConditionsList
              conditions={snowConditions}
              setSelectedCondition={setSelectedSnowCondition}
              selectedCondition={selectedSnowCondition}
            />
          </View>
          <View>
            <Text style={styles.titleText}>
              Ice
            </Text>
            <ConditionsList
              conditions={iceConditions}
              setSelectedCondition={setSelectedIceCondition}
              selectedCondition={selectedIceCondition}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Description</Text>
            <TextInput
              style={{
                width: "100%",
                height: 110,
                backgroundColor: "#e2e8f0",
                marginTop: 20,
                borderRadius: 10,
                padding: 20,
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#003380",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 20,
                paddingRight: 10,
              }}
            >
              Send
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#003380",
    width: "100%",
    height: 70,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "600",
  },
});
