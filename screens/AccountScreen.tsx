import React, { memo, useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Navigation } from "../types";

import { useRoute } from "@react-navigation/native";

// import { View as MotiView } from "moti";
// import { Skeleton } from "@motify/skeleton";

import { Text, View, StyleSheet } from "react-native";
import { Paragraph, Dialog, Portal } from "react-native-paper";
import { TextInput } from "../components";

import { useStoreActions, useStoreState } from "../hooks/storeHooks";

import {
  ActionButtons,
  Button,
  Container,
  Slider,
  Account,
  AccountNew,
  Header,
  IconButton,
  List,
  ListItem,
  StatusBox,
  StatusItem,
  TotalBalance,
  BackButton,
} from "../components";

import { accountFromSeed } from "../utils";

import {
  LAMPORTS_PER_SOL,
  getBalance,
  getConfirmedTransaction,
  getHistory,
  getSolanaPrice,
  requestAirDrop,
  transaction,
} from "../api";

type Props = {
  navigation: Navigation;
};

const AccountScreen = ({ navigation }: Props) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const sendTransaction = async () => {
    const from = accountFromSeed(
      wallet.seed,
      account.index,
      account.derivationPath
    );

    const to = "Go7GjGnyg6MVPjhh1DPkVstdz9e8t21HwhKHsqSHhzc4";

    const tx = await transaction(from, to, 0.5);
    console.log(tx);
  };

  const route = useRoute();

  const accountIndex = 0; //route.params.id;
  // const accountIndex = route.params.id;

  const wallet = useStoreState((state) => state.wallet);
  const account = useStoreState(
    (state) =>
      state.accounts.filter((account) => account.index === accountIndex)[0]
  );

  const [transactions, setTransations] = useState([]);

  const [totalBalance, setTotalBalance] = useState(0);

  const [accountWithDetails, setAccountWithDetails] = useState([]);
  const [accountReady, setAccountReady] = useState(false);

  const [accountLabel, setAccountLabel] = useState("");

  const address = (account) => {
    return accountFromSeed(
      wallet.seed,
      account.index,
      account.derivationPath
    ).publicKey.toString();
  };

  useFocusEffect(
    useCallback(() => {
      async function prepareAccount() {
        const solanaPrice = await getSolanaPrice();
        // await requestAirDrop(address(accounts[1]));

        const balanceSOL = await getBalance(address(account));
        const balanceUSD = (balanceSOL * solanaPrice).toFixed(2);

        const details = {
          ...account,
          balance: { usd: balanceUSD, sol: balanceSOL },
          // address: maskedAddress(address(account)),
          address: address(account),
        };

        const history = await getHistory(address(account));

        let trxs = history.map(async (trx) => {
          const _trx = await getConfirmedTransaction(trx.signature);
          return _trx;
        });
        trxs = await Promise.all(trxs);

        // console.log(trxs);

        setTransations(trxs);

        // const signature =
        //   "5CJrwreZLvq4XUSr9ey9m4YAkw4d2zPSvZP8noDs9rHFNGZdv4zGQWYoFasgrGhRbup8yCHdnB9mXfPbDauMEo3R";
        // const trx = await getConfirmedTransaction(signature);
        // console.log(trx);

        setAccountWithDetails(details);
        setTotalBalance(Number(balanceUSD));
        setAccountReady(true);
      }
      prepareAccount();
    }, [account])
  );

  const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

  const transition = {
    opacity: {
      duration: 300,
    },
  };

  const colorMode = "light";

  if (!accountReady) return <Text>Loading</Text>;
  // return (
  //   <MotiView
  //     transition={{
  //       type: "timing",
  //     }}
  //     style={[styles.container, styles.padded]}
  //     animate={{ backgroundColor: "#ffffff" }}
  //   >
  //     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  //       <View style={{ width: 200 }}>
  //         <Skeleton
  //           transition={transition}
  //           colorMode={colorMode}
  //           radius="round"
  //           height={50}
  //           width={50}
  //         />
  //         <Spacer height={8} />
  //         <Skeleton
  //           transition={transition}
  //           colorMode={colorMode}
  //           width={150}
  //         />
  //         <Spacer height={8} />
  //         <Skeleton
  //           transition={transition}
  //           colorMode={colorMode}
  //           width={150}
  //         />
  //       </View>
  //       <View>
  //         <Skeleton
  //           transition={transition}
  //           colorMode={colorMode}
  //           // radius="round"
  //           height={100}
  //           width={100}
  //         />
  //       </View>
  //     </View>
  //   </MotiView>
  // );

  return (
    <Portal>
      <Container>
        {/*
        <Header>
          <TotalBalance balance={{ usd: `$${totalBalance.toFixed(2)}` }} />
          <IconButton icon="cog" />
        </Header>
           */}
        <BackButton goBack={() => navigation.goBack()} />
        <Account
          key={accountWithDetails.index}
          color={accountWithDetails.color}
          account={{
            label: accountWithDetails.label,
            balance: {
              usd: `$${accountWithDetails.balance.usd}`,
              sol: `${accountWithDetails.balance.sol} SOL`,
            },
            address: accountWithDetails.address,
          }}
          fullWidth
        />
        <List>
          {transactions
            // .filter((trx, index) => index === 0)
            .map((trx) => {
              console.log(trx.meta.preBalances);
              console.log(trx.meta.postBalances);
              const amount = trx.meta.preBalances[0] - trx.meta.postBalances[0];
              return (
                <ListItem
                  icon="airplane"
                  iconColor="blue"
                  title="Fly tickets"
                  subtitle="6 Oct, 11:12 AM"
                  amount={amount / LAMPORTS_PER_SOL}
                />
              );
            })}

          {/*
          <ListItem
            icon="airplane"
            iconColor="blue"
            title="Fly tickets"
            subtitle="6 Oct, 11:12 AM"
            amount="-$495.00"
          />
          <ListItem
            icon="coffee"
            iconColor="brown"
            title="Coffee"
            subtitle="6 Oct, 11:12 AM"
            amount="-$2.90"
          />
          <ListItem
            icon="plus-thick"
            iconColor="green"
            title="Pharmacy"
            subtitle="6 Oct, 11:12 AM"
            amount="-$10.90"
          />
             */}
        </List>
      </Container>
      <ActionButtons>
        <Button
          mode="contained"
          color={accountWithDetails.color}
          onPress={() => setVisible(true)}
          size={75}
        >
          Send
        </Button>
        <Button mode="outlined" color={accountWithDetails.color} size={20}>
          <IconButton
            icon="dots-horizontal"
            onPress={() => console.log("Pressed")}
          />
        </Button>
      </ActionButtons>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <TextInput
            value={toAddress}
            placeholder="Address to send SOL"
            onChangeText={(text) => setToAddress(text)}
          />
          <TextInput value={amount} onChangeText={(text) => setAmount(text)} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="text" onPress={() => sendTransaction()}>
            Send
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  padded: {
    padding: 16,
  },
});

export default memo(AccountScreen);
