import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigation from "./StackNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        {/* Passe toute info d'auth aux enfants ci dessous */}
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
