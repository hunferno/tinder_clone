import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

// Fake data

// const data = [
//   {
//     firstName: "sonny",
//     lastName: "Sangha",
//     job: "Software Developer",
//     photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
//     age: 27,
//   },
//   {
//     firstName: "Elon",
//     lastName: "Musk",
//     job: "Software Developer",
//     photoURL:
//       "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg",
//     age: 40,
//   },
//   {
//     firstName: "sonny",
//     lastName: "Sangha",
//     job: "Software Developer",
//     photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
//     age: 27,
//   },
// ];

// Fin fake data

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (await getDoc(db, "users", user.uid)).data();

    //check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you matched with them...
          //Create a MATCH
          console.log(`Hooray, You MATCHED with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          //CREATE A MATCH
          getDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usesMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          // user has swiped at first interaction between the two or didn't get swiped on...
          console.log(
            `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
          );

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );

    // const loogedInProfile = await (
    //   await getDoc(doc(db, "uses", user.uid))
    // ).data();
  };

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
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
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
          renderCard={(card, index) =>
            card ? (
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
            ) : (
              <View
                style={{
                  position: "relative",
                  backgroundColor: "white",
                  height: "75%",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
              >
                <Text style={{ fontWeight: "bold", paddingBottom: 10 }}>
                  No more profiles
                </Text>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
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
