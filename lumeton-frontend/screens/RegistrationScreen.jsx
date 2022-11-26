import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SvgUri } from "react-native-svg";
import React from "react";
import TopFlowBg from "../assets/TopFlowBg.svg";
import BottomFlowBg from "../assets/BottomFlowBg.svg";
import Logo from "../assets/Logo.svg";
import ContinueIcon from "../assets/ContinueIcon.svg";

// You use views for styling and positioning your components.
// And you use text for displaying text.
const RegistrationScreen = () => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={{ justifyContent: "space-between", height:"100%"}}>
      <TopFlowBg width={"100%"} />
      <View >
        <View style={s.logo}>
          <Logo width={68} height={82} />
          <Text style={s.greeting}>Welcome to Lumeton!</Text>
        </View>
        <View style={s.registerArea}>
          <Text>Tell us your username:</Text>
          <TextInput style={s.input} onChangeText={onChangeText} value={text} />
        </View>
        <View style={s.continueArea}>
          <Text>Let's start our snowy adventure!</Text>
          <TouchableOpacity style={s.continueButton}>
            {/* <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>Report</Text> */}

            <ContinueIcon />
            <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomFlowBg width={"100%"} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  greeting: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  registerArea: {
    marginVertical: 30,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    minWidth: "60%",
    paddingHorizontal: 20,
    fontSize: 20,
    borderRadius: 24,
    backgroundColor: "#ECECEC",
  },
  continueArea: {
    marginVertical: 20,
    alignItems: "center",
  },
  continueButton: {
    width: 150,
    height: 120,
    backgroundColor: "#003380",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default RegistrationScreen;
