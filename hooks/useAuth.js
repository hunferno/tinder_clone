import React, { createContext, useContext } from "react";
import * as Google from "expo-google-app-auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    await Google.logInAsync();
  };

  // children représente tous les enfants de AuthProvider dans App.js
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
