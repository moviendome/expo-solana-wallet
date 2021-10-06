import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  icon: string;
  iconColor: string;
  label: string;
  amount: string;
};

const StatusItem = ({ icon, iconColor, label, amount }: Props) => {
  useDeviceContext(tw);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} size={48} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-1/2 h-full flex-row items-center p-2`,
  },
  icon: {
    ...tw`w-1/3 h-full justify-center`,
  },
  content: {
    ...tw`w-2/3 h-full justify-center`,
  },
  label: {
    ...tw`text-gray-400 mb-1`,
  },
  amount: {
    ...tw`text-2xl text-black font-extrabold`,
  },
});

export default memo(StatusItem);
