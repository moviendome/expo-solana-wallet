import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { useStoreState } from "../hooks/storeHooks";

import {
  DashScreen,
  AccountScreen,
  OnboardingScreen,
  SetPinScreen,
  DashboardScreen,
  ReceiveScreen,
  SendScreen,
  SettingsScreen,
  BackupScreen,
  QRScannerScreen,
} from "../screens";

export default function Onboarding() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const hasWallet = useStoreState((state) => state.hasWallet);

  if (hasWallet) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dash"
          component={DashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Set Pin"
          component={SetPinScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Dashboard"
  //         component={DashboardScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Receive"
  //         component={ReceiveScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Send"
  //         component={SendScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Settings"
  //         component={SettingsScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Backup"
  //         component={BackupScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="QR"
  //         component={QRScannerScreen}
  //         options={{ headerShown: false }}
  //       />
  //     </Stack.Navigator>
  //   );
  // } else {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Dash"
  //         component={DashScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Onboarding"
  //         component={OnboardingScreen}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Set Pin"
  //         component={SetPinScreen}
  //         options={{ headerShown: false }}
  //       />
  //     </Stack.Navigator>
  //   );
  // }
}
