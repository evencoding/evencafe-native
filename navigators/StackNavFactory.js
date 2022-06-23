import { useReactiveVar } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isLoggedInVar } from "../apollo";
import { colors } from "../colors";
import Logo from "../components/Logo";
import CoffeeShop from "../screens/CoffeeShop";
import Home from "../screens/Home";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import LoggedOutNav from "./LoggedOutNav";

const Stack = createNativeStackNavigator();

export default function StackNavFactory({ screenName }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const myProfile = () => {
    if (screenName == "Me") {
      if (isLoggedIn) {
        return <Stack.Screen name="Me" component={Me} />;
      } else {
        return <Stack.Screen name="goToLogin" component={LoggedOutNav} />;
      }
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: true,
        headerShown: false,
        headerTintColor: colors.light,
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name="Home"
          options={{
            headerShown: true,
            headerTitle: () => <Logo />,
          }}
          component={Home}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen
          name={"Search"}
          component={Search}
          options={{
            headerShown: true,
            headerTitle: () => <Logo />,
          }}
        />
      ) : null}
      {myProfile()}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CoffeeShop" component={CoffeeShop} />
    </Stack.Navigator>
  );
}
