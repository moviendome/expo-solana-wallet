import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Background2 as Background, Title, PriceHeader } from "../components";
import { Avatar, Card, useTheme } from "react-native-paper";
import { Navigation } from "../types";
import { useFocusEffect } from "@react-navigation/native";

import { useStoreState } from "../hooks/storeHooks";

import { getBalance, getHistory, getSolanaPrice } from "../api";

type Props = {
  navigation: Navigation;
};

import { maskedAddress } from "../utils";

const DashboardScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  const wallet = useStoreState((state) => state.wallet);

  const [balance, setBalance] = useState({
    usd: 0.0,
    sol: 0,
  });

  // const [history, setHistory] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function getAsyncBalance() {
        const sol = await getBalance(wallet.account);
        const usdPrice = await getSolanaPrice();

        setBalance({
          sol,
          usd: (sol * usdPrice).toFixed(2),
        });
      }

      getAsyncBalance();
    }, [])
  );

  // useEffect(() => {
  //   async function generate() {
  //     const _history = await getHistory(wallet.account);
  //     console.log(_history);
  //   }
  //
  //   generate();
  // }, []);

  return (
    <Background navigation={navigation}>
      <PriceHeader usd={balance.usd} sol={balance.sol} />

      <View style={styles.container}>
        <Title>Wallet Address</Title>

        <Card
          style={styles.card}
          onPress={() => navigation.navigate("Receive")}
        >
          <Card.Title
            title={maskedAddress(wallet.account)}
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
