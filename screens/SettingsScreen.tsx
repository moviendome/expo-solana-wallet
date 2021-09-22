import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BackButton,
  Background3 as Background,
  Paragraph,
} from "../components";
import {
  Avatar,
  Card,
  IconButton,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { Navigation } from "../types";

import { requestAirDrop } from "../api";

import { useStoreState } from "../hooks/storeHooks";

import { accountFromSeed } from "../utils";

type Props = {
  navigation: Navigation;
};

const SettingsScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  const wallet = useStoreState((state) => state.wallet);
  const accounts = useStoreState((state) => state.accounts);
  const [account, setAccount] = useState({});

  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [airdropText, setAirdropText] = useState("");

  useEffect(() => {
    async function generate() {
      const currentAccount = accounts[0];
      setAccount({
        index: currentAccount.index,
        title: currentAccount.title,
        keyPair: accountFromSeed(
          wallet.seed,
          currentAccount.index,
          currentAccount.derivationPath,
          0
        ),
      });
      // }
    }

    generate();
  }, []);

  const _requestAirdrop = async () => {
    setAirdropText("Requesting Airdrop...");
    setVisible(true);
    const signature = await requestAirDrop(
      account.keyPair.publicKey.toString()
    );
    setAirdropText("Airdrop completed!");
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Dashboard")} />

      <View style={{ width: "100%" }}>
        <Card style={styles.card} onPress={() => navigation.navigate("Backup")}>
          <Card.Title
            title="Backup"
            left={(props) => <Avatar.Icon {...props} icon="shield" />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
          />
          <Card.Content>
            <Paragraph>
              Your secret 12-word recovery phrase is the ONLY way to recover
              your funds if you lose acceess to your wallet.
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card} onPress={() => _requestAirdrop()}>
          <Card.Title
            title="Request Airdrop"
            left={(props) => <Avatar.Icon {...props} icon="cash-usd" />}
            right={(props) => (
              <IconButton {...props} icon="chevron-right" onPress={() => {}} />
            )}
          />
          <Card.Content>
            <Paragraph>Get funds for your Default Dev Account.</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <Snackbar
        visible={visible}
        duration={30000}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            // Do something
          },
        }}
        style={{ backgroundColor: colors.primary }}
      >
        {airdropText}
      </Snackbar>
    </Background>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
});

export default memo(SettingsScreen);
