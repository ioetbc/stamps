import {Stack, useNavigation, useSearchParams} from "expo-router";
import {doc, onSnapshot} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {StyleSheet, Switch, Text, View} from "react-native";

import {db} from "../../firebase-config";
import {AuthenticationContext} from "../../context/auth-context";
import type {ICard} from "../../types";
import {Card} from "../../components/card";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Title} from "../../components/title";

export default function Merchant() {
  const {user} = useContext(AuthenticationContext);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const {merchant} = useSearchParams();
  const [card, setCard] = useState<ICard>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const merchantDocRef = doc(userDocRef, "merchants", merchant as string);

        const unsubscribe = onSnapshot(merchantDocRef, (snapshot) => {
          if (snapshot.exists()) {
            const fetchedCard = {
              merchant: snapshot.id,
              ...snapshot.data(),
            } as ICard;
            setCard(fetchedCard);
          } else {
            console.log("Merchant not found");
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching merchant:", error);
      }
    };

    fetchMerchant();
  }, [user.uid]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  if (!card) return null;

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerLeft: () => <Title text="Merchant" />, // Custom header left component
        }}
      />
      <Card merchant={card.merchant} count={card.count} />
      <View style={styles.shit}>
        <View style={styles.section}>
          <Text style={styles.heading}>Tip</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("add a tip")}
          >
            <Text style={styles.buttonText}>Add tip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Subscribe</Text>
          <Switch
            trackColor={{false: "red", true: "green"}}
            thumbColor="yellow"
            ios_backgroundColor="red"
            onValueChange={() => setHasSubscribed(!hasSubscribed)}
            value={hasSubscribed}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>No. orders to date</Text>
          <Text>{card.count}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  shit: {
    flex: 1,
  },
  heading: {
    color: "black",
    fontSize: 14,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
