import { ToDoItem } from "@models";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Props {
  todos: ToDoItem[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  item: {
    backgroundColor: "white",
    height: 40,
    lineHeight: 40,
    paddingHorizontal: 16
  }
});

export default TodoList;
