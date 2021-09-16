import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Background3 as Background, BackButton, Title } from "../components";
import { Avatar, Card } from "react-native-paper";
import { Navigation } from "../types";

import { useStoreState } from "../hooks/storeHooks";

import QRCode from "react-native-qrcode-svg";

import { maskedAddress } from "../utils";

type Props = {
  navigation: Navigation;
};

const ReceiveScreen = ({ navigation }: Props) => {
  const wallet = useStoreState((state) => state.wallet);

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Dashboard")} />
      <View style={styles.container}>
        <Title>Wallet Address</Title>
        <Card style={styles.card} onPress={() => console.log("copy")}>
          <Card.Title
            title={maskedAddress(wallet.account)}
            left={(props) => <Avatar.Icon {...props} icon="content-copy" />}
          />
        </Card>
      </View>

      <View style={styles.container}>
        <Title>QR Code</Title>
        <View style={styles.qr}>
          <QRCode value={wallet?.account} size={150} />
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
