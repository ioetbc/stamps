import React, {useContext, useEffect, useState} from "react";
import {Button, Text, View} from "react-native";
import {Stack} from "expo-router";
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
import {Card} from "../components/card";
import {Wallet} from "../components/wallet";

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
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Stack.Screen options={{title: "Home"}} />
      <View style={{flex: 1}}>
        {cards.map((card: ICard) => (
          <Card
            username={user.displayName}
            count={card.count}
            merchant={card.merchant}
          />
        ))}
        <Button title="add stamp" onPress={handleStamp}></Button>
      </View>
      {/* <Wallet /> */}
    </View>
  );
}
