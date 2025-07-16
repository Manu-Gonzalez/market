import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config()

interface Credenciales {
    host: string | undefined ,
    user: string | undefined,
    password: string | undefined,
    database: string | undefined
};

const credenciales : Credenciales = {
    host: process.env.HOST ,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

const db = mysql.createPool(credenciales);

export default db.promise()
