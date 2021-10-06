import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  children: React.ReactNode;
};

const ActionButtons = ({ children }: Props) => {
  useDeviceContext(tw);

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-full flex-row justify-between p-4 bg-white`,
  },
});

export default ActionButtons;
