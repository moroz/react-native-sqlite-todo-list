/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import useDbConnection from "./lib/useDbConnection";
import DBContext from "./lib/DBContext";
import NewTodoForm from "./components/NewTodoForm";
import useTodos from "./lib/useTodos";
import TodoList from "./components/TodoList";
import { dropTable } from "./lib/db-service";

const App = () => {
  const db = useDbConnection();
  const { todos, addTodo } = useTodos(db);

  const isDarkMode = useColorScheme() === "dark";

  const onDropDatabase = useCallback(async () => {
    if (!db) return;

    await dropTable(db);
  }, [db]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <DBContext.Provider value={db}>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <View style={styles.container}>
          <NewTodoForm onAdd={addTodo} />
          <TodoList todos={todos} />
          <TouchableOpacity onPress={onDropDatabase} style={styles.dropButton}>
            <Text>Drop table</Text>
          </TouchableOpacity>
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
  dropButton: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "red",
    margin: 16,
    padding: 10
  }
});

export default App;
