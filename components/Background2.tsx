import React, { memo } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { useTheme } from "react-native-paper";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { Navigation } from "../types";

type Props = {
  navigation?: Navigation;
  children: React.ReactNode;
  position?: string;
  noMenu?: boolean;
  skipHeader?: boolean;
};

const Background2 = ({
  navigation,
  children,
  position,
  noMenu,
  skipHeader,
}: Props) => {
  const { colors } = useTheme();

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <ImageBackground
      source={require("../assets/images/background2.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={[
          styles.container,
          position === "bottom" ? styles.bottom : undefined,
          skipHeader ? styles.skipHeader : undefined,
        ]}
        keyboardVerticalOffset={200}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
      {!noMenu && (
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? "close" : "plus"}
              fabStyle={{ backgroundColor: colors.primary }}
              actions={[
                {
                  icon: "arrow-collapse-down",
                  label: "Receive",
                  onPress: () => navigation.navigate("Receive"),
                },
                {
                  icon: "arrow-expand-up",
                  label: "Send",
                  onPress: () => navigation.navigate("Send"),
                },
                {
                  icon: "cached",
                  label: "Swap",
                  onPress: () => console.log("Pressed notifications"),
                },
                {
                  icon: "cog",
                  label: "Settings",
                  onPress: () => navigation.navigate("Settings"),
                  small: true,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  skipHeader: { paddingTop: 300 },

  bottom: {
    justifyContent: "flex-end",
  },
});

export default memo(Background2);
