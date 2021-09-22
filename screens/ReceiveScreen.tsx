import React, { memo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Background3 as Background,
  BackButton,
  Button,
  Title,
} from "../components";
import { Avatar, Card, Menu, useTheme } from "react-native-paper";
import { Navigation } from "../types";

import { useStoreState } from "../hooks/storeHooks";

import QRCode from "react-native-qrcode-svg";

import { accountFromSeed, maskedAddress } from "../utils";

type Props = {
  navigation: Navigation;
};

const ReceiveScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  const wallet = useStoreState((state) => state.wallet);
  const accounts = useStoreState((state) => state.accounts);

  const [account, setAccount] = useState({});

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

  // Menu
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeAccount = (index: number) => {
    const currentAccount = accounts[index];
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
    closeMenu();
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Dashboard")} />
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>{`${account?.title} address`}</Button>
          }
        >
          {accounts.map((account) => (
            <Menu.Item
              key={account.index}
              onPress={() => changeAccount(account.index)}
              title={account.title}
              titleStyle={{ color: colors.primary }}
            />
          ))}
        </Menu>
        <Card
          style={styles.card}
          onPress={() => console.log(account.keyPair.publicKey.toString())}
        >
          <Card.Title
            title={maskedAddress(account?.keyPair?.publicKey?.toString())}
            left={(props) => <Avatar.Icon {...props} icon="content-copy" />}
          />
        </Card>
      </View>

      <View style={styles.container}>
        <Title>QR Code</Title>
        <View style={styles.qr}>
          <QRCode value={account?.keyPair?.publicKey?.toString()} size={150} />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  qr: { padding: 10, backgroundColor: "#ffffff" },
});

export default memo(ReceiveScreen);
