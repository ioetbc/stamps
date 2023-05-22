import React from "react";
import {Button, Text, View} from "react-native";
import {Stack} from "expo-router";
import {useAuthentication} from "../hooks/use-authentication";

export default function Login() {
  const {promptAsync} = useAuthentication();
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Stack.Screen options={{title: "Login"}} />
      <Text>this is the login screen</Text>
      <Button onPress={() => promptAsync()} title="login" />
    </View>
  );
}
