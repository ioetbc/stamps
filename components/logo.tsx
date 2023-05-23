import React from "react";
import Svg, {Circle, Path} from "react-native-svg";

interface HandlePressProps {
  handlePress: () => void;
}

export const Plus = ({handlePress}: HandlePressProps) => {
  return (
    <Svg height={34} width={34} viewBox="0 0 100 100" onPress={handlePress}>
      <Circle cx="50" cy="50" r="45" strokeWidth="2.5" fill="green" />
      <Path
        d="M 50,30 L 50,70 M 30,50 L 70,50"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
