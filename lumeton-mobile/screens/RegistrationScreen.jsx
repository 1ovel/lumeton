import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { SvgUri } from "react-native-svg";
import React from "react";
import TopFlowBg from "../assets/TopFlowBg.svg";
import BottomFlowBg from "../assets/BottomFlowBg.svg";
import Logo from "../assets/Logo.svg";

// You use views for styling and positioning your components.
// And you use text for displaying text.
const RegistrationScreen = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  return (
    <View>
      <TopFlowBg width={"100%"} />
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
        <Button style={s.continueButton} title="Continue" color="#F2F2F2" onPress={() => console.log('pressed')}/>
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
    marginVertical: 20,
    alignItems: "center",
  },
  input:{
      height: 40,
      margin: 12,
      borderBottomColor: "black",
      borderBottomWidth: 1,
      minWidth:"60%",
      paddingHorizontal: 20,
      fontSize: 20, 
      borderRadius: 24,
      backgroundColor: "#ECECEC",
  },
  continueArea:{
    marginVertical:20,
    alignItems: "center",
  }
});

export default RegistrationScreen;
