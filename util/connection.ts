import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()


    const myPool = mysql.createPool({
        host: process.env.SQL_HOSTNAME,
        port: Number(process.env.SQL_PORT),
        user: process.env.SQL_USER,
        database: process.env.SQL_DBNAME,
        password: process.env.SQL_PASSWRD,
        waitForConnections: true,
        enableKeepAlive: true
    })


export const connect = async () =>{
    // try {
        
    // } catch (error) {
    //     console.log(error)
    // }
    return await myPool.getConnection()
}

export const disconnect = (conn: mysql.PoolConnection) =>{
    myPool.releaseConnection(conn)
}