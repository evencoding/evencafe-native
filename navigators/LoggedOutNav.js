import { useReactiveVar } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isLoggedInVar } from "../apollo";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Me from "../screens/Me";
import Welcome from "../screens/Welcome";
import TabNav from "./TabNav";

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
