import { useCallback, useEffect, useRef, useState } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { createTable, getDBConnection } from "./db-service";

const useDbConnection = () => {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  const startupCallback = useCallback(async () => {
    const connection = await getDBConnection();
    setDb(connection);
    await createTable(connection);
  }, []);

  useEffect(() => {
    startupCallback();
  }, []);

  return db;
};

export default useDbConnection;
