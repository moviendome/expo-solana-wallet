import React, { memo } from "react";
import { Background, Button, Paragraph } from "../components";
import { Navigation } from "../types";

type Props = {
  navigation: Navigation;
};

const OnboardingScreen = ({ navigation }: Props) => (
  <Background position="bottom">
    <Paragraph bold>Social Wallet for Solana & SPL Tokens</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("Set Pin")}>
      Continue
    </Button>
  </Background>
);

export default memo(OnboardingScreen);
