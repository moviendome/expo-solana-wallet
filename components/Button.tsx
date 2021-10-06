import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  mode?: "text" | "outlined" | "contained";
  color: string;
  children: React.ReactNode;
  size: number;
  onPress: void;
} & typeof defaultProps;

const defaultProps = {
  mode: "contained",
};

const Button = (props: Props) => {
  const { children, mode, color, size, onPress } = props;

  const _mode = () => {
    switch (mode) {
      case "text": {
        return [styles.textContainer];
        break;
      }
      case "outlined": {
        if (color)
          return [
            { width: `${size}%` },
            styles.outlinedContainer,
            { borderColor: color },
          ];
        return styles.outlinedContainer;
        break;
      }
      default: {
        if (color)
          return [
            { width: `${size}%` },
            styles.containedContainer,
            { backgroundColor: color },
          ];
        return styles.containedContainer;
        break;
      }
    }
  };

  const _text = () => {
    switch (mode) {
      case "text": {
        return styles.text;
        break;
      }
      case "outlined": {
        return styles.text;
        break;
      }
      default: {
        return styles.textContained;
        break;
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={_mode()}>
      <Text style={_text()}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    ...tw`px-4 py-2`,
  },
  containedContainer: {
    ...tw`rounded-lg py-2`,
  },
  outlinedContainer: {
    ...tw`rounded-lg border py-2`,
  },
  text: {
    ...tw`text-lg font-semibold text-center text-black`,
  },
  textContained: {
    ...tw`text-white text-lg font-semibold text-center`,
  },
});

export default memo(Button);
