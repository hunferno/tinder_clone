import { useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const MatchScreen = ({ navigation }) => {
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "rgb(255,0,0)",
        paddingTop: 20,
        opacity: 0.89,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      >
        <Image
          style={{ height: "20%", width: "100%" }}
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>

      <Text style={{ color: "white", textAlign: "center", marginTop: 5 }}>
        You an {userSwiped.displayName} have liked each other.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 5,
        }}
      >
        <Image
          style={{ height: "32%", width: "32%", borderRadius: 100 }}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={{ height: "32%", width: "32%", borderRadius: 100 }}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          margin: 5,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text>Send a message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
