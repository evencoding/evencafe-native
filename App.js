import AppLoading from "expo-app-loading";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, TOKEN, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromise, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <LoggedInNav />
      </NavigationContainer>
    </ApolloProvider>
  );
}
