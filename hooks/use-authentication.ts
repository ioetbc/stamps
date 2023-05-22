import {useEffect, useContext} from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import {AuthenticationContext} from "../context/auth-context";
import {
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {db} from "../firebase-config";
import Constants from "expo-constants";

import {MERCHANT} from "../constants";

const auth = getAuth();

const {IOS_CLIENT_ID, ANDROID_CLIENT_ID, WEB_CLIENT_ID, EXPO_CLIENT_ID} =
  Constants.manifest?.extra;

export function useAuthentication() {
  const {user, setUser} = useContext(AuthenticationContext);

  const [_, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      if (response?.authentication?.accessToken) {
        login(response.authentication.accessToken);
      }
    }
  }, [response]);

  const login = async (accessToken: string) => {
    const credential = GoogleAuthProvider.credential(null, accessToken);
    const {user} = await signInWithCredential(auth, credential);

    try {
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        username: user.displayName,
        email: user.email,
      });

      const merchantDocRef = doc(collection(userDocRef, "merchants"), MERCHANT);

      await updateDoc(merchantDocRef, {
        count: increment(1),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setUser(user);
  };

  return {user, promptAsync};
}
