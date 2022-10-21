import React, { useCallback } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules
} from "react-native";

interface Props {
  text: string;
}

const ShareButton: React.FC<Props> = ({ text }) => {
  const onPress = useCallback(() => {
    NativeModules.RNShare.open({ message: text });
  }, [text]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Share</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white"
  },
  button: {
    backgroundColor: "salmon"
  }
});

export default ShareButton;
