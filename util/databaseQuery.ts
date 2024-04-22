import mysql from 'mysql2/promise'

export const createTableQuery = async (connection: mysql.PoolConnection, name: string, fields: string[]) =>{
    const query = await connection.execute(
        `CREATE TABLE IF NOT EXISTS ${name}`
      );
}