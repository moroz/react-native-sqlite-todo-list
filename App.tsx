/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import useDbConnection from "./lib/useDbConnection";
import DBContext from "./lib/DBContext";
import NewTodoForm from "./components/NewTodoForm";
import useTodos from "./lib/useTodos";
import TodoList from "./components/TodoList";

const App = () => {
  const db = useDbConnection();
  const { todos, addTodo } = useTodos(db);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <DBContext.Provider value={db}>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <View style={styles.container}>
          <NewTodoForm onAdd={addTodo} />
          <TodoList todos={todos} />
        </View>
      </SafeAreaView>
    </DBContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  list: {
    flex: 1,
    backgroundColor: "salmon"
  },
  form: {
    height: 80
  },
  item: {
    height: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flexDirection: "row"
  },
  input: {}
});

export default App;
