import * as React from "react";
import { StyleSheet, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

const StatusBox = ({ children }) => {
  useDeviceContext(tw);

  return (
    <View style={styles.container}>
      <View style={styles.box}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-full p-4`,
  },
  box: {
    ...tw`w-full h-20 flex-row bg-gray-200 rounded-lg items-center`,
  },
});

export default StatusBox;
