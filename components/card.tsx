import {View, Text, StyleSheet} from "react-native";

export const Card = ({merchant, username, count}) => (
  <View style={styles.card}>
    <Text style={styles.cardBrand}>{merchant}</Text>
    <View style={styles.cardInfoContainer}>
      <View>
        <Text style={styles.cardInfoLabel}>Card Holder</Text>
        <Text style={styles.cardInfoValue}>{username}</Text>
      </View>
      <View>
        <Text style={styles.cardInfoLabel}>Points</Text>
        <Text style={styles.cardInfoValue}>{count}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    width: 350,
    height: 200,
    padding: 20,
    marginBottom: 12,
  },
  cardBrand: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  cardInfoLabel: {
    color: "black",
    fontSize: 10,
  },
  cardInfoValue: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
