import { Connect, Query } from "./mysql.util";

const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const connection = await Connect();
    const result = await Query(connection, query, params);

    connection.end();

    return result;
  } catch (error: any) {
    console.error("Database query error: ", error.message, error);
    throw error;
  }
};

export default executeQuery;
