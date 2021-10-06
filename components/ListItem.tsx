import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  amount: string;
};

const ListItem = ({ icon, iconColor, title, subtitle, amount }: Props) => {
  useDeviceContext(tw);
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`w-full flex-row items-center border-b border-gray-200 pb-4 mb-6`,
  },
  iconContainer: {
    ...tw`w-1/5 h-full justify-center`,
  },
  iconCircle: {
    ...tw`rounded-full h-12 w-12 items-center justify-center bg-gray-100`,
  },
  content: {
    ...tw`w-3/5 h-full`,
  },
  title: {
    ...tw`text-base font-bold`,
  },
  subtitle: {
    ...tw`text-xs text-gray-400`,
  },
  right: {
    ...tw`w-1/5 h-full items-end`,
  },
  amount: {
    ...tw`text-lg font-bold`,
  },
});

export default memo(ListItem);
