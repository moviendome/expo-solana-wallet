import * as React from "react";
import { StyleSheet, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

const Container = ({ children }) => {
  useDeviceContext(tw);

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...tw`flex-1 w-full bg-white items-center pt-8`,
  },
});

export default Container;
