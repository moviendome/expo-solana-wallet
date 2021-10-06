import React, { memo, useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Navigation } from "../types";

import { Text } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { TextInput } from "../components";

import { useStoreActions, useStoreState } from "../hooks/storeHooks";

import {
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
} from "../components";

import { accountFromSeed, maskedAddress } from "../utils";

import { getBalance, getSolanaPrice, requestAirDrop } from "../api";

type Props = {
  navigation: Navigation;
};

const DashScreen = ({ navigation }: Props) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const wallet = useStoreState((state) => state.wallet);
  const accounts = useStoreState((state) => state.accounts);

  const [totalBalance, setTotalBalance] = useState(0);

  const [accountsWithDetails, setAccountsWithDetails] = useState([]);
  const [accountsReady, setAccountsReady] = useState(false);

  const [accountLabel, setAccountLabel] = useState("");
  const addAccount = useStoreActions((actions) => actions.addAccount);

  const _addAccount = async () => {
    addAccount({
      label: accountLabel,
      derivationPath: "bip44Change",
    });
    hideDialog();
  };

  const address = (account) => {
    return accountFromSeed(
      wallet.seed,
      account.index,
      account.derivationPath
    ).publicKey.toString();
  };

  useFocusEffect(
    useCallback(() => {
      async function prepareAccounts() {
        const solanaPrice = await getSolanaPrice();

        let total = 0;

        // await requestAirDrop(address(accounts[0]));

        let accs = accounts.map(async (account) => {
          const balanceSOL = await getBalance(address(account));
          const balanceUSD = (balanceSOL * solanaPrice).toFixed(2);

          total += Number(balanceUSD);

          console.log(address(account));
          return {
            ...account,
            balance: { usd: balanceUSD, sol: balanceSOL },
            address: maskedAddress(address(account)),
          };
        });
        accs = await Promise.all(accs);

        setAccountsWithDetails(accs);
        setTotalBalance(total);
        setAccountsReady(true);
      }
      prepareAccounts();
    }, [accounts])
  );

  if (!accountsReady) return <Text>Loading</Text>;

  return (
    <Portal>
      <Container>
        <Header>
          <TotalBalance balance={{ usd: `$${totalBalance.toFixed(2)}` }} />
          <IconButton icon="cog" />
        </Header>
        <Slider>
          <AccountNew onPress={showDialog} />
          {accountsWithDetails.map((account) => (
            <Account
              key={account.index}
              color={account.color}
              account={{
                label: account.label,
                balance: {
                  usd: `$${account.balance.usd}`,
                  sol: `${account.balance.sol} SOL`,
                },
                address: account.address,
              }}
              isLast={accounts.length === account.index + 1}
              onPress={() =>
                navigation.navigate("Account", { id: account.index })
              }
            />
          ))}
        </Slider>

        {/*
        <StatusBox>
          <StatusItem
            icon="arrow-down"
            iconColor="red"
            label="Spendings"
            amount="$26,020"
          />
          <StatusItem
            icon="arrow-up"
            iconColor="green"
            label="Incomes"
            amount="$68,199"
          />
        </StatusBox>
        */}
        <List>
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
        </List>

        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <TextInput
              value={accountLabel}
              placeholder="Label for the new account"
              onChangeText={(text) => setAccountLabel(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={_addAccount}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Container>
    </Portal>
  );
};

export default memo(DashScreen);
