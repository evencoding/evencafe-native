import React from "react";
import { View, Text } from "react-native";

export default function Search({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Search</Text>
    </View>
  );
}
