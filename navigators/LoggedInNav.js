import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateShop from "../screens/CreateShop";
import TabNav from "./TabNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="Tabs" component={TabNav} />
      <Stack.Screen
        name="CreateShop"
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "black" },
        }}
        component={CreateShop}
      />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
}
