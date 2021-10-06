import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  onPress: void;
};

const AccountNew = ({ onPress }: Props) => {
  useDeviceContext(tw);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="plus-thick" size={28} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`rounded-lg bg-gray-200 p-4 justify-center items-center`,
    width: 80,
    height: 120,
  },
});

export default AccountNew;
