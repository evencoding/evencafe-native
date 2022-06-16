import { useReactiveVar } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";
import { isLoggedInVar, logUserOut } from "../apollo";
import AuthButton from "../components/auth/AuthButton";

export default function Home({ navigation }) {
  const isLoggedin = useReactiveVar(isLoggedInVar);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Home</Text>
      {isLoggedin ? (
        <AuthButton text="Log Out" disabled={false} onPress={logUserOut} />
      ) : null}
    </View>
  );
}
