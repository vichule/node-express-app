import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()


    const myPool = mysql.createPool({
        host: process.env.HOSTNAME,
        user: process.env.USERNAME,
        database: process.env.DBNAME,
        password: process.env.PASSWRD,
        waitForConnections: true,
        enableKeepAlive: true
    })


export const connect = async () =>{
    return await myPool.getConnection()
}

export const disconnect = async (conn: mysql.PoolConnection) =>{
    await myPool.releaseConnection(conn)
}