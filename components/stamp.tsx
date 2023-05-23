import {StyleSheet, View} from "react-native";

interface StampProps {
  checked: boolean;
}

export const Stamp = ({checked}: StampProps) => {
  return (
    <View
      style={[styles.stamp, {backgroundColor: checked ? "green" : "inherit"}]}
    />
  );
};

const styles = StyleSheet.create({
  stamp: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
  },
});
