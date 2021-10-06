import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";

import QRCode from "react-native-qrcode-svg";

import { maskedAddress } from "../utils";

type Props = {
  color: string;
  account: object;
  isLast?: boolean;
  onPress: void;
  fullWidth: true;
};

const Account = ({ color, account, isLast, onPress, fullWidth }: Props) => {
  useDeviceContext(tw);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={fullWidth ? styles.boxFull : null}
    >
      <View
        style={[
          styles.container,
          isLast ? styles.last : null,
          { backgroundColor: color },
          !fullWidth ? styles.ml : null,
        ]}
      >
        <View style={styles.left}>
          <View style={styles.header}>
            <Image
              source={require("../assets/solana.png")}
              style={{ width: 40, height: 40 }}
            />
            <View style={styles.headerContent}>
              <Text style={styles.label}>{account.label}</Text>
              <Text style={styles.address}>
                {maskedAddress(account.address)}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.balanceUSD}>{account.balance.usd}</Text>
            <Text style={styles.balanceSOL}>{account.balance.sol}</Text>
          </View>
        </View>
        {fullWidth && (
          <View style={styles.right}>
            <View style={styles.qr}>
              <QRCode value={account.address} size={100} />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxFull: {
    ...tw`w-full p-4`,
  },
  container: {
    ...tw`h-60 rounded-lg justify-between flex-row`,
  },
  ml: {
    ...tw`ml-4`,
  },
  left: {
    ...tw`p-4 justify-between`,
  },
  right: {
    ...tw`p-4`,
  },
  last: {
    ...tw`mr-4`,
  },
  header: {
    ...tw`w-full flex-row`,
  },
  headerContent: {
    ...tw`ml-4`,
  },
  label: {
    ...tw`text-white font-bold`,
  },
  address: {
    ...tw`text-white`,
  },
  balanceLabel: {
    ...tw`text-white`,
  },
  balanceUSD: {
    ...tw`text-2xl font-extrabold text-white`,
  },
  balanceSOL: {
    ...tw`text-lg font-bold text-white`,
  },
  qr: {
    ...tw`p-2 bg-white`,
  },
});

export default Account;
