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
    value TEXT NOT NULL
  );`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    const raw = await db.executeSql(`select rowid id, value from ${tableName}`);
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
  const insertQuery =
    `insert or replace into ${tableName} (rowid, value) values ` +
    todoItems.map((i) => `(${i.id}, '${i.value}')`).join(",");

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `delete from ${tableName} where rowid = ${id}`;
  return db.executeSql(deleteQuery);
};

export const dropTable = async (db: SQLiteDatabase) => {
  return db.executeSql(`drop table ${tableName}`);
};

export const addTodoItem = async (db: SQLiteDatabase, value: string) => {
  const insertQuery = `insert into ${tableName} (value) values ('${value}')`;

  return db.executeSql(insertQuery);
};
