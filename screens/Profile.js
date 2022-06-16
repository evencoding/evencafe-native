import React from "react";
import { View, Text } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Someone's Profile</Text>
    </View>
  );
}
