import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  balance: object;
};

const TotalBalance = ({ balance }: Props) => {
  useDeviceContext(tw);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Balance</Text>
      <Text style={styles.usd}>{balance.usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-1/2 ml-4`,
  },
  title: {
    ...tw`text-2xl font-bold`,
  },
  usd: {
    ...tw`text-3xl font-extrabold`,
  },
});

export default TotalBalance;
