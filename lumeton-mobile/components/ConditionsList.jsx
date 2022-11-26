import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const ConditionsList = ({ conditions, setSelectedCondition, selectedCondition }) => {
  return (
    <View style={{ paddingVertical: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {conditions.map((cond, key) => {
          const isSelected = cond === selectedCondition
          return (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedCondition(cond)}
              style={{
                width: 110,
                height: 110,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                backgroundColor: "#e2e8f0",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: isSelected ? '#003380' : '#e2e8f0'
              }}
            >
              <Text
                style={{ color: "#003380", fontWeight: "600", fontSize: 16 }}
              >
                {cond}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ConditionsList;

const styles = StyleSheet.create({});
