import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NumberKeyboard = ({ number, onPress, pin }) => (
  <View style={styles.container}>
    <View style={styles.pinContainer}>
      <View
        style={[
          styles.pinIndicator,
          pin.length > 0 ? styles.pinIndicatorActive : undefined,
        ]}
      ></View>
      <View
        style={[
          styles.pinIndicator,
          pin.length > 1 ? styles.pinIndicatorActive : undefined,
        ]}
      ></View>
      <View
        style={[
          styles.pinIndicator,
          pin.length > 2 ? styles.pinIndicatorActive : undefined,
        ]}
      ></View>
      <View
        style={[
          styles.pinIndicator,
          pin.length > 3 ? styles.pinIndicatorActive : undefined,
        ]}
      ></View>
    </View>
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onPress(1)} style={styles.button}>
        <Text style={styles.text}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(2)} style={styles.button}>
        <Text style={styles.text}>2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(3)} style={styles.button}>
        <Text style={styles.text}>3</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onPress(4)} style={styles.button}>
        <Text style={styles.text}>4</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(5)} style={styles.button}>
        <Text style={styles.text}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(6)} style={styles.button}>
        <Text style={styles.text}>6</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onPress(7)} style={styles.button}>
        <Text style={styles.text}>7</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(8)} style={styles.button}>
        <Text style={styles.text}>8</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(9)} style={styles.button}>
        <Text style={styles.text}>9</Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.row, styles.rowLast]}>
      <TouchableOpacity onPress={() => onPress(0)} style={styles.button}>
        <Text style={styles.text}>0</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default NumberKeyboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  pinContainer: {
    flexDirection: "row",
    width: 150,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  pinIndicator: {
    borderWidth: 2,
    borderColor: "#ffffff",
    width: 20,
    height: 20,
    // backgroundColor: "#fff",
    borderRadius: 10,
  },
  pinIndicatorActive: {
    backgroundColor: "#fff",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rowLast: {
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  text: {
    color: "#000000",
    fontSize: 20,
  },
});
