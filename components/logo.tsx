import {Image} from "react-native";

export const Logo = () => {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={{uri: "https://reactnative.dev/img/tiny_logo.png"}}
    />
  );
};
