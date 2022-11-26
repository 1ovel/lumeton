import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import TopFlowBg from "../assets/TopFlowBg.svg";
import BottomFlowBg from "../assets/BottomFlowBg.svg";
import Logo from "../assets/Logo.svg";
import ContinueIcon from "../assets/ContinueIcon.svg";

// You use views for styling and positioning your components.
// And you use text for displaying text.
const RegistrationScreen = () => {
  const [username, onChangeUsername] = React.useState("");
  const navigation = useNavigation()

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
          <TextInput style={s.input} onChangeText={onChangeUsername} value={username} />
        </View>
        <View style={s.continueArea}>
          <Text>Let's start our snowy adventure!</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Map")} style={[s.continueButton, username!="" ? s.allowContinue : '']}>
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
    width: 180,
    height: 140,
    backgroundColor: "#003380",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20,
    opacity:0.2
  },
  allowContinue:{
    opacity:1
  }
});

export default RegistrationScreen;
