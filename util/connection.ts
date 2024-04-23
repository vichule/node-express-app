import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()


    const myPool = mysql.createPool({
        host: process.env.HOSTNAME,
        port: Number(process.env.PORT),
        user: process.env.USER,
        database: process.env.DBNAME,
        password: process.env.PASSWRD,
        waitForConnections: true,
        enableKeepAlive: true
    })


export const connect = async () =>{
    return await myPool.getConnection()
}

export const disconnect = (conn: mysql.PoolConnection) =>{
    myPool.releaseConnection(conn)
}