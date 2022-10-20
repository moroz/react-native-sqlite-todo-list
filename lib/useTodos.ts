import { ToDoItem } from "@models";
import { useCallback, useEffect, useState } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { addTodoItem, getTodoItems } from "./db-service";
import { seedData } from "./initialData";

export default function (db: SQLiteDatabase | null) {
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  const loadDataCallback = useCallback(async () => {
    console.log(db);
    if (!db) return;
    try {
      const data = await seedData(db);
      setTodos(data);
    } catch (e) {
      console.error(e);
    }
  }, [db]);

  const refetch = useCallback(async () => {
    if (!db) return;
    const data = await getTodoItems(db);
    setTodos(data);
  }, [setTodos, db]);

  const addTodo = useCallback(
    async (value: string) => {
      if (!value.trim() || !db) return;

      const result = await addTodoItem(db, value);
      console.log(result);
      refetch();
    },
    [refetch, db]
  );

  useEffect(() => {
    loadDataCallback();
  }, [db]);

  return {
    todos,
    refetch,
    addTodo
  };
}
