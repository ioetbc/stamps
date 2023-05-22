import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../context/auth-context";
import {
  collection,
  doc,
  increment,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import type {ICard} from "../types";
import {db} from "../firebase-config";
import {MERCHANT} from "../constants";
import {Wallet} from "../components/wallet";
import {Button} from "react-native";
import {Stack} from "expo-router";
import {Logo} from "../components/logo";

export default function Home() {
  const {user} = useContext(AuthenticationContext);
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    const userDocRef = doc(db, "users", user.uid);
    const merchantCollectionRef = collection(userDocRef, "merchants");

    const unsubscribe = onSnapshot(merchantCollectionRef, (snapshot) => {
      const fetchedCards: ICard[] = snapshot.docs.map(
        (doc) => ({merchant: doc.id, ...doc.data()} as ICard)
      );
      setCards(fetchedCards);
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleStamp = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const merchantDocRef = doc(collection(userDocRef, "merchants"), MERCHANT);

    try {
      await updateDoc(merchantDocRef, {
        count: increment(1),
      });
    } catch (e) {
      console.log("error updating document", e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <Logo />,
        }}
      />
      <Wallet cards={cards} />
      <Button title="Stamp" onPress={handleStamp} />
    </>
  );
}
