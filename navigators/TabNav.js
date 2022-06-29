import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import StackNavFactory from "./StackNavFactory";
import { View } from "react-native";

const Tabs = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.light,
        tabBarInactiveTintColor: colors.light,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: colors.light,
        },
      }}
    >
      <Tabs.Screen
        name="TabHome"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("CreateShop");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={"camera"} color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabMe"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
