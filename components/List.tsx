import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  children: React.ReactNode;
};

const List = ({ children }: Props) => {
  useDeviceContext(tw);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent transactions</Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-full max-w-sm pt-4`,
  },
  title: {
    ...tw`text-lg font-bold mb-4`,
  },
  items: {
    ...tw`mt-4`,
  },
});

export default List;
