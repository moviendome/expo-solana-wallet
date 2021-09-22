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
  Menu,
} from "react-native-paper";
import { Navigation } from "../types";

import { useStoreState } from "../hooks/storeHooks";

import { useFocusEffect, useRoute } from "@react-navigation/native";

import { getBalance, getSolanaPrice, transaction } from "../api";

import { accountFromSeed, maskedAddress } from "../utils";

type Props = {
  navigation: Navigation;
};

const SendScreen = ({ navigation }: Props) => {
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
    const tx = await transaction(account, toAddress, Number(amount.solana));
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
      if (account?.keyPair?.publicKey?.toString()) {
        setBalance(await getBalance(account?.keyPair?.publicKey?.toString()));
        setSolanaPrice(await getSolanaPrice());
      }
    }

    getAsync();
  }, [account]);

  // Menu
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
        <View style={styles.block}>
          <Title>From</Title>

          <Menu
            visible={menuVisible}
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

          <Card style={styles.card} onPress={() => console.log("copy")}>
            <Card.Title
              title={maskedAddress(account?.keyPair?.publicKey?.toString())}
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
