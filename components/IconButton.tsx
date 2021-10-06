import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  icon: string;
  onPress: void;
};

const IconButton = ({ icon, onPress }: Props) => {
  useDeviceContext(tw);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`justify-center items-center`,
    // width: 40,
    // height: 30,
  },
});

export default IconButton;
