import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ToDoItem } from "@models";
import ShareButton from "../ShareButton";

interface Props {
  item: ToDoItem;
}

const TodoItemRenderer: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text>{item.value}</Text>
      <ShareButton text={item.value} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "salmon",
    height: 40,
    lineHeight: 40,
    paddingHorizontal: 16
  }
});

export default TodoItemRenderer;
