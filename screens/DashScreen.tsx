import React, { memo } from "react";
import { View } from "react-native";
import { Navigation } from "../types";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

type Props = {
  navigation: Navigation;
};

const DashScreen = ({ navigation }: Props) => {
  useDeviceContext(tw);

  return (
    <View
      style={tw`flex-1 flex-row bg-white justify-center items-center`}
    ></View>
  );
};

export default memo(DashScreen);
