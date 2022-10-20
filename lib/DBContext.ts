import { createContext, useContext } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";

const DBContext = createContext<SQLiteDatabase | null>(null);

export const useDB = () => {
  return useContext(DBContext) as SQLiteDatabase;
};

export default DBContext;
