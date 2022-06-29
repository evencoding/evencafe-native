import React from "react";
import { View, Text } from "react-native";
import { logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

export default function Me({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Me</Text>
      <AuthButton text="Log Out" disabled={false} onPress={logUserOut} />
    </View>
  );
}
