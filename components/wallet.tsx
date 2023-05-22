import {useRef} from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  Dimensions,
  View,
  Text,
} from "react-native";
import {ICard} from "../types";
import {Stamp} from "./stamp";
import {STAMPS_PER_CARD} from "../constants";
import {getPoints} from "../utils/stamps";

const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 45;
const {height} = Dimensions.get("window");

interface WalletProps {
  cards: ICard[];
}

export const Wallet = ({cards}: WalletProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          {cards.map((card, i) => {
            const inputRange = [-cardHeight, 0];
            const outputRange = [cardHeight * i, (cardHeight - cardTitle) * -i];

            if (i > 0) {
              inputRange.push(cardPadding * i);
              outputRange.push((cardHeight - cardPadding) * -i);
            }

            const translateY = scrollY.interpolate({
              inputRange,
              outputRange,
              extrapolateRight: "clamp",
            });

            return (
              <Animated.View
                key={card.merchant}
                style={{transform: [{translateY}]}}
              >
                <View style={[styles.card]}>
                  <Text style={styles.merchant}>{card.merchant}</Text>
                  <Text style={styles.merchant}>{card.count}</Text>
                  <View style={styles.stamps}>
                    {Array.from({length: STAMPS_PER_CARD}, (_, i) => (
                      <Stamp checked={i <= getPoints(card.count)} />
                    ))}
                  </View>
                </View>
              </Animated.View>
            );
          })}
        </View>

        <Animated.ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true}
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16,
  },
  stamps: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 16,
  },
  container: {
    flex: 1,
  },
  content: {
    height: height * 2,
  },
  card: {
    height: cardHeight,
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
