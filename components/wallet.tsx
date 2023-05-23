import {useRef} from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  Dimensions,
  View,
} from "react-native";
import type {ICard} from "../types";
import {CARD_HEIGHT} from "../constants";
import {Card} from "./card";

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
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
      >
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {cards.map((card, i) => {
              const inputRange = [-CARD_HEIGHT, 0];
              const outputRange = [
                CARD_HEIGHT * i,
                (CARD_HEIGHT - cardTitle) * -i,
              ];

              if (i > 0) {
                inputRange.push(cardPadding * i);
                outputRange.push((CARD_HEIGHT - cardPadding) * -i);
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
                  <Card merchant={card.merchant} count={card.count} />
                </Animated.View>
              );
            })}
          </View>
        </View>
      </Animated.ScrollView>
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
  merchant: {
    fontSize: 24,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
