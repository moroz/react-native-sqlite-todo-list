import {
  enablePromise,
  openDatabase,
  SQLiteDatabase
} from "react-native-sqlite-storage";
import { ToDoItem } from "@models";

enablePromise(true);

const tableName = "todos";

export const getDBConnection = () => {
  return openDatabase({ name: "todo-data.db", location: "default" });
};

/*
 * Create a DB table if it does not exist.
 */
export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INTEGER PRIMARY KEY,
    value TEXT NOT NULL
  );`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    const raw = await db.executeSql(`select id, value from ${tableName}`);
    raw.forEach((result) => {
      for (let i = 0; i < result.rows.length; i++) {
        todoItems.push(result.rows.item(i));
      }
    });
    return todoItems;
  } catch (e) {
    console.error(e);
    throw Error("Failed to get todo items");
  }
};

export const saveTodoItems = (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
  const params = todoItems.map((_, i) => `($${i + 1})`).join(",");
  const vars = todoItems.map((item) => item.value);

  const insertQuery = `insert into ${tableName} (value) values ${params}`;

  return db.executeSql(insertQuery, vars);
};

export const deleteTodoItem = (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `delete from ${tableName} where id = $1`;
  return db.executeSql(deleteQuery, [id]);
};

export const dropTable = async (db: SQLiteDatabase) => {
  return db.executeSql(`drop table ${tableName}`);
};

export const addTodoItem = async (
  db: SQLiteDatabase,
  value: string
): Promise<ToDoItem> => {
  const insertQuery = `insert into ${tableName} (value) values ($1)`;

  const result = await db.executeSql(insertQuery, [value]);

  return { id: result[0].insertId, value };
};
