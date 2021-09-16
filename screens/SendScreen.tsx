import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  Background3 as Background,
  BackButton,
  Button,
  Title,
} from "../components";
import {
  Avatar,
  Card,
  Text,
  TextInput,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { Navigation } from "../types";

import { useStoreState } from "../hooks/storeHooks";

import { useFocusEffect, useRoute } from "@react-navigation/native";

import { getBalance, getSolanaPrice, transaction } from "../api";

import { maskedAddress } from "../utils";

type Props = {
  navigation: Navigation;
};

const SendScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  const wallet = useStoreState((state) => state.wallet);

  const route = useRoute();

  const [balance, setBalance] = useState(0);

  const [solanaPrice, setSolanaPrice] = useState(0);

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState({ solana: 0, usd: 0 });

  const [transferText, setTransferText] = useState("");
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const amountToSend = (amount: string) => {
    const usd = Number(amount) * solanaPrice;
    setAmount({ solana: Number(amount), usd });
  };

  const sendTransaction = async () => {
    setTransferText("Sending transfer...");
    setVisible(true);
    const tx = await transaction(wallet, toAddress, Number(amount.solana));
    setTransferText("Transfer completed!");
    setAmount({ solana: 0, usd: 0 });
    setToAddress("");
  };

  useFocusEffect(
    useCallback(() => {
      setToAddress(route.params?.data);
    }, [])
  );

  useEffect(() => {
    async function getAsync() {
      setBalance(await getBalance(wallet.account));
      setSolanaPrice(await getSolanaPrice());
    }

    getAsync();
  }, []);

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Dashboard")} />
      <View style={styles.container}>
        <View style={styles.block}>
          <Title>From</Title>

          <Card style={styles.card} onPress={() => console.log("copy")}>
            <Card.Title
              title={maskedAddress(wallet.account)}
              left={(props) => <Avatar.Icon {...props} icon="wallet" />}
            />
          </Card>
        </View>

        <View style={styles.toContainer}>
          <Title>To</Title>
          <View style={styles.toInput}>
            <TextInput
              mode="outlined"
              value={toAddress}
              right={
                <TextInput.Icon
                  name={(props) => (
                    <Avatar.Icon
                      {...props}
                      icon="qrcode"
                      size={50}
                      color={colors.text}
                    />
                  )}
                  onPress={() => {
                    navigation.navigate("QR");
                  }}
                />
              }
              placeholder="Enter address"
              onChangeText={(text) => setToAddress(text)}
              style={styles.card}
              theme={{
                colors: {
                  placeholder: colors.text,
                },
              }}
            />
          </View>
          <View style={styles.priceContainer}>
            <Text>Current Price</Text>
            <Text style={styles.priceAmount}>{`$${solanaPrice} per SOL`}</Text>
          </View>
          <View style={styles.block}>
            <TextInput
              mode="outlined"
              value={amount.solana}
              placeholder={"0"}
              onChangeText={(text) => amountToSend(text)}
              style={[{ textAlign: "right" }, styles.card]}
              theme={{
                colors: {
                  placeholder: colors.text,
                },
              }}
            />
          </View>
          <View style={styles.priceContainer}>
            <Text>{`Available: ${balance} SOL`}</Text>
            <Text style={styles.priceAmount}>{`$${amount.usd}`}</Text>
          </View>
        </View>

        <View style={styles.block}>
          <Button
            mode="contained"
            // disabled={toAddress ? false : true}
            onPress={() => sendTransaction()}
          >
            Send
          </Button>
        </View>
      </View>

      <Snackbar
        visible={visible}
        duration={15000}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            // Do something
          },
        }}
        style={{ backgroundColor: colors.primary }}
      >
        {transferText}
      </Snackbar>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 200,
    alignItems: "center",
  },
  block: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },
  toContainer: {
    width: "100%",
    alignItems: "center",
  },
  toInput: {
    width: "100%",
  },
  priceContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    paddingTop: 20,
    paddingBottom: 40,
  },
  priceAmount: {
    fontWeight: "bold",
    paddingLeft: 20,
  },
});

export default SendScreen;
