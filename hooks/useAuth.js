import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});
const config = {
  androidClientId:
    "244827901881-siju8gii3sr7srji29ksf1pv14grgv0t.apps.googleusercontent.com",
  iosClientId:
    "244827901881-p719qta1a3ptgnj32bn1hpbrifg2codm.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        console.log("dans await");
        if (logInResult.type === "success") {
          console.log(logInResult.type);
          //login...
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error));
  };

  // children représente tous les enfants de AuthProvider dans App.js
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
