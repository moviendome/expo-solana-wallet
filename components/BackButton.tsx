import React, { memo } from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
    <Text style={styles.text}>Account</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    ...tw`w-full flex-row items-center p-4`,
  },
  text: {
    ...tw`text-lg font-bold`,
  },
});

export default memo(BackButton);
