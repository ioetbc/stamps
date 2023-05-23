import {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../context/auth-context";
import {collection, doc, onSnapshot} from "firebase/firestore";
import {useRouter} from "expo-router";

import type {ICard} from "../types";
import {db} from "../firebase-config";
import {Wallet} from "../components/wallet";

export default function Home() {
  const {user} = useContext(AuthenticationContext);
  const [cards, setCards] = useState<ICard[]>([]);
  const router = useRouter();

  console.log("wtf user", user);

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

  return <Wallet cards={cards} />;
}
