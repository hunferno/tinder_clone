import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

// Fake data

const data = [
  {
    firstName: "sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    job: "Software Developer",
    photoURL:
      "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg",
    age: 40,
  },
  {
    firstName: "sonny",
    lastName: "Sangha",
    job: "Software Developer",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
  },
];

// Fin fake data

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity onPress={logout}>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 45, height: 45, borderRadius: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={require("../logo.png")}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff5864" />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      {/* CARD */}
      <View
        style={{
          flex: 1,
          marginTop: -15,
        }}
      >
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={data}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4ded30",
                },
              },
            },
          }}
          renderCard={(card, index) => (
            <View
              key={index}
              style={{
                position: "relative",
                backgroundColor: "white",
                height: "75%",
                borderRadius: 20,
              }}
            >
              <Image
                source={{ uri: card.photoURL }}
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
              />
              <View
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 70,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
              >
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {card.age}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      {/* End of CARD */}

      {/* BUTTONS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={{
            width: 75,
            height: 75,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(225, 0, 0, 0.2)",
            borderRadius: 80,
          }}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={{
            width: 75,
            height: 75,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80,
            backgroundColor: "rgba(0, 255, 0, 0.2)",
          }}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
      {/* End BUTTONS */}
    </SafeAreaView>
  );
};

export default HomeScreen;
