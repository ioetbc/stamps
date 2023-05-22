import React from "react";
import {Stack} from "expo-router";
import {Image, Text, View} from "react-native";

export default function Layout() {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
}
