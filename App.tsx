/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ListView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  useColorScheme,
  View
} from "react-native";
import { SQLiteDatabase } from "react-native-sqlite-storage";

import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  createTable,
  getDBConnection,
  getTodoItems,
  saveTodoItems
} from "./lib/db-service";
import { ToDoItem } from "./models/todos";

const App = () => {
  const db = useRef<SQLiteDatabase | null>(null);
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [{ id: 0, value: "go to the shop" }];
      db.current = await getDBConnection();
      await createTable(db.current);
      const storedTodoItems = await getTodoItems(db.current);
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      } else {
        await saveTodoItems(db.current, initTodos);
        setTodos(initTodos);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, []);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            value={newTodo}
            style={styles.input}
            onChangeText={setNewTodo}
          />
        </View>
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.value}</Text>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
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
  input: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 2,
    margin: 16
  }
});

export default App;
