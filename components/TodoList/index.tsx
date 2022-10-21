import { ToDoItem } from "@models";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import TodoItemRenderer from "../TodoItemRenderer";

interface Props {
  todos: ToDoItem[];
}

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={todos}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={TodoItemRenderer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  separator: {
    height: 2,
    width: "100%"
  }
});

export default TodoList;
