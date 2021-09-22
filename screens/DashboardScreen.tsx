import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Background2 as Background, PriceHeader, Button } from "../components";
import { Avatar, Card, Menu, useTheme } from "react-native-paper";
import { Navigation } from "../types";
import { useFocusEffect } from "@react-navigation/native";

import { useStoreState } from "../hooks/storeHooks";

import { accountFromSeed } from "../utils";
import { getBalance, getHistory, getSolanaPrice } from "../api";

type Props = {
  navigation: Navigation;
};

import { maskedAddress } from "../utils";

const DashboardScreen = ({ navigation }: Props) => {
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

  const [balance, setBalance] = useState({
    usd: 0.0,
    sol: 0,
  });

  // const [history, setHistory] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function getAsyncBalance() {
        if (account?.keyPair?.publicKey?.toString()) {
          const sol = await getBalance(account.keyPair.publicKey.toString());
          const usdPrice = await getSolanaPrice();

          setBalance({
            sol,
            usd: (sol * usdPrice).toFixed(2),
          });
        }
      }

      getAsyncBalance();
    }, [account])
  );

  // useEffect(() => {
  //   async function generate() {
  //     const _history = await getHistory(wallet.account);
  //     console.log(_history);
  //   }
  //
  //   generate();
  // }, []);

  // console.log(account.keyPair.publicKey.toString());

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
    <Background navigation={navigation}>
      <PriceHeader usd={balance.usd} sol={balance.sol} />

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
          onPress={() => navigation.navigate("Receive")}
        >
          <Card.Title
            title={maskedAddress(account?.keyPair?.publicKey?.toString())}
            left={(props) => <Avatar.Icon {...props} icon="qrcode" />}
          />
        </Card>
      </View>

      {/*
      <View style={styles.container}>
        <Title>Activity</Title>
      </View>
      */}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
});

export default DashboardScreen;
