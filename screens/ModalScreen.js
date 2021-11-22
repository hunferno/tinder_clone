import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, paddingTop: 25, alignItems: "center" }}>
      {/* MODAL HEADER */}
      <TouchableOpacity
        style={{ width: "100%", height: 80 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          source={{ uri: "https://links.papareact.com/2pf" }}
          style={{ height: "100%", width: "100%" }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 25,
          color: "gray",
          opacity: 0.5,
          padding: 10,
          fontWeight: "bold",
        }}
      >
        Welcome {user.displayName}
      </Text>
      {/* End MODAL HEADER */}

      {/* UPDATE FORM */}
      <Text
        style={{ textAlign: "center", padding: 10, color: "red", opacity: 0.4 }}
      >
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={{ textAlign: "center", fontSize: 20, paddingBottom: 8 }}
        placeholder="Enter a profile Pic URL"
      />

      <Text
        style={{ textAlign: "center", padding: 10, color: "red", opacity: 0.4 }}
      >
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={{ textAlign: "center", fontSize: 20, paddingBottom: 8 }}
        placeholder="Enter your occupation"
      />

      <Text
        style={{ textAlign: "center", padding: 10, color: "red", opacity: 0.4 }}
      >
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={{ textAlign: "center", fontSize: 20, paddingBottom: 8 }}
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="numeric"
      />

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={[
          {
            width: "70%",
            padding: 10,
            position: "absolute",
            bottom: 30,
            borderRadius: 15,
          },
          incompleteForm
            ? { backgroundColor: "rgba(217, 217, 217,0.4)" }
            : { backgroundColor: "rgba(255,0,0,0.4)" },
        ]}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
          Update Profile
        </Text>
      </TouchableOpacity>
      {/* End UPDATE FORM */}
    </View>
  );
};

export default ModalScreen;
