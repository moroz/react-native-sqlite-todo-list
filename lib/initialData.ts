import { ToDoItem } from "@models";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { getTodoItems, saveTodoItems } from "./db-service";

const initialData: ToDoItem[] = [{ id: 0, value: "go to the shop" }];

export default initialData;

export const seedData = async (db: SQLiteDatabase) => {
  const storedTodoItems = await getTodoItems(db);
  if (storedTodoItems.length) {
    return storedTodoItems;
  } else {
    await saveTodoItems(db, initialData);
    return initialData;
  }
};
