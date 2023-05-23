import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Stamp} from "./stamp";
import {getPoints} from "../utils";
import {CARD_HEIGHT, STAMPS_PER_CARD} from "../constants";
import {useRouter} from "expo-router";

export const Card = ({merchant, count}) => {
  const router = useRouter();
  return (
    <View style={[styles.card]}>
      <TouchableOpacity onPress={() => router.push(`/card/${merchant}`)}>
        <Text style={styles.merchant}>{merchant}</Text>
        <Text style={styles.merchant}>{count}</Text>
        <View style={styles.stamps}>
          {Array.from({length: STAMPS_PER_CARD}, (_, i) => (
            <Stamp key={i} checked={i <= getPoints(count)} />
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stamps: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 16,
  },
  card: {
    height: CARD_HEIGHT,
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
  },
  merchant: {
    fontSize: 24,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
