import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useAuth from "./hooks/useAuth";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ModalScreen from "./screens/ModalScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              // options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
