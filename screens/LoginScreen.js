import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={{
            marginBottom: 120,
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
