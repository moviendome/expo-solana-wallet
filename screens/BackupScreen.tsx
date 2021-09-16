import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Background3 as Background,
  BackButton,
  Header,
  NumberKeyboard,
  Paragraph,
} from "../components";

import { Text } from "react-native-paper";

import { Navigation } from "../types";

import { useStoreState } from "../hooks/storeHooks";

type Props = {
  navigation: Navigation;
};

const BackupScreen = ({ navigation }: Props) => {
  const initialMessage = "Enter your passcode";
  const [headerMessage, setHeaderMessage] = useState(initialMessage);
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPin] = useState([]);
  const [pinOk, setPinOk] = useState(false);

  const [mnemonic, setMnemoic] = useState([]);

  const wallet = useStoreState((state) => state.wallet);

  useEffect(() => {
    if (pin.length === 4) {
      setPinOk(true);
    }
  }, [pin]);

  const _onPressNumber = (n: number) => {
    setPin([...pin, n]);
  };

  useEffect(() => {
    async function getMnemonic() {
      if (pin.join("") === wallet.passcode) {
        setMnemoic(wallet.mnemonic.split(" "));
        setErrorMessage("");
        setHeaderMessage("Your recovery phrase");
      } else {
        setErrorMessage("Wrong passcode, try again!");
        setPin([]);
        setPinOk(false);
      }
    }
    if (pinOk) {
      getMnemonic();
    }
  }, [pinOk]);

  const words = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {mnemonic.slice(0, 12).map((word, index) => (
            <Text key={index + 1}>{`${index + 1}. ${word}`}</Text>
          ))}
        </View>
        <View style={styles.row}>
          {mnemonic.slice(12, 24).map((word, index) => (
            <Text key={index + 13} style={{ textAlign: "right" }}>{`${
              index + 13
            }. ${word}`}</Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Settings")} />
      <Header>{headerMessage}</Header>
      <Paragraph>{errorMessage}</Paragraph>

      {mnemonic.length === 0 ? (
        <NumberKeyboard onPress={_onPressNumber} pin={pin} />
      ) : (
        words()
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignContent: "space-between",
    paddingHorizontal: 40,
  },
  row: {
    flex: 1,
  },
});

export default memo(BackupScreen);
