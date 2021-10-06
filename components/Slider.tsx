import * as React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

const Slider = ({ children }) => {
  useDeviceContext(tw);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      <View style={styles.ScollContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.sc}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-full pl-4 pb-4 mb-2`,
  },
  scrollContainer: {
    ...tw`flex-1 w-full flex-row`,
  },
  title: {
    ...tw`text-lg font-bold mb-4`,
  },
  sc: {},
});

export default Slider;
